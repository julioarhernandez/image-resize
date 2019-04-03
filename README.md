# image-resize
Resize png, jpg or gif images

## Install

```bash
npm install
```

> Resizing images made easy - thanks to [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/).


### Requirements - GraphicsMagick or ImageMagick
Make sure GraphicsMagick or ImageMagick is installed on your system and properly set up in your `PATH`.

Ubuntu:

```shell
apt-get install imagemagick
apt-get install graphicsmagick
```

Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
brew install imagemagick
brew install graphicsmagick
```

Windows & others:

[http://www.imagemagick.org/script/binary-releases.php](http://www.imagemagick.org/script/binary-releases.php)

Confirm that ImageMagick is properly set up by executing `convert -help` in a terminal.

## Basic Usage

Copy images into images folder

```javascript
gulp resize
```
