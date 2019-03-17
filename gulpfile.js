const gulp = require('gulp'),
    del = require('del'),
    gulpSequence = require('gulp-sequence'),
    imageResize = require('gulp-image-resize'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant'),
    imageminZopfli = require('imagemin-zopfli'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    merge2 = require("merge2"),
    sourceImages = 'images/*.+(png|jpg|jpeg|gif)',
    destImages = 'resized/',
    optimizedImages = 'optimized/',
    transforms = [
        {
            dist: destImages + "img-512/",
            params: {
                width: 512,
                height: 512,
                crop: false,
                upscale: false
            }
        },
        {
            dist: destImages + "img-1440/",
            params: {
                width: 1440,
                height: 1440,
                crop: false,
                upscale: false
            }
        }
    ];

    gulp.task('resize', () => {
        console.log('deleting images');
        del(destImages, optimizedImages);
        console.log('Resizing and Optimizing images');
        const streams = [];
        // loop through transforms and add to streams array
        transforms.map((transform) => {
      
          // create a stream for each transform
          streams.push(
            gulp.src(sourceImages)
                .pipe(imageResize({
                    width: transform.params.width,
                    height: transform.params.height,
                    crop: transform.params.crop,
                    upscale : transform.params.upscale
                }))
                .pipe(imagemin([
                    imageminPngquant({
                        speed: 1,
                        quality: [1,1] //lossy settings
                    }),
                    imageminZopfli({
                        more: true
                        // iterations: 50 // very slow but more effective
                    }),
                    imagemin.svgo({
                        plugins: [{
                            removeViewBox: false
                        }]
                    }),            
                    //jpg lossless
                    imagemin.jpegtran({
                        progressive: true
                    }),
                    //jpg very light lossy, use vs jpegtran
                    imageminMozjpeg({
                        quality: 80
                    })
                ],{verbose: true}))
                .pipe(rename(function (path) {
                    path.basename += ("-" + transform.params.width + "x" + transform.params.height);
                }))
                .pipe(gulp.dest(transform.dist))
          );
      
        });
        // merge streams
        return merge2(streams);
    });


    