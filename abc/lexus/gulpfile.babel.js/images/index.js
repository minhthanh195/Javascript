import fs from 'fs';
import path from 'path';
import { src, dest } from 'gulp';
import cache from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import vinylBuffer from 'vinyl-buffer';
import svgSprite from 'gulp-svg-sprite';
import spritesmith from 'gulp.spritesmith-multi';
import sort from 'gulp-sort';
import merge from 'merge-stream';
import del from 'del';
import config from '../../config.json';
import "babel-polyfill";

export const generateImages = () =>
    src(config.imgSetting.src)
    .pipe(cache('generateImages'))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 80, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(dest(config.imgSetting.dist))

export const generateSprite = () => {
    var opts = {
        spritesmith: function(options, sprite, icons) {
            options.imgPath            = `../img/${options.imgName}`;
            options.cssName            = `_${sprite}.scss`;
            options.cssTemplate        = `./src/css/sprites-data/spritesmith-mixins.handlebars`
            options.cssSpritesheetName = sprite;
            options.padding            = 4;
            options.algorithm          = 'binary-tree';
            return options;
        }
    };
    var spriteData = src('./src/img/sprites/**/*.png').pipe(spritesmith(opts)).on('error', function(err) {
        console.log(err);
    });

    var imgStream = spriteData.img
      .pipe(vinylBuffer())
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 5}),
      ], {
        verbose: true
      }))
      .pipe(dest('./dist/img/'));
    var cssStream = spriteData.css.pipe(dest('./src/css/sprites-data'));

    return merge(imgStream, cssStream);
}

const getFolders = (dir) => {
  let result = [];
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  } else if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    result = fs.readdirSync(dir).filter((file) => fs.statSync(path.join(dir, file)).isDirectory());
  }
  return result;
}

export const spriteSvg = async () => {
  const folders = getFolders(`${config.dir.src}/img/sprites-svg`);

  let options = {
    spritesmith: (options) => {
      const {folder, config} = options;

      return {
        shape: {
          spacing: {
            padding: 4
          },
          id: {
            generator: function (name) {
              return path.basename(name.split(`${config.dir.src}/css/sprites-data`).join(""), '.svg');
            }
          }
        },
        mode: {
          css: {
            dest: './',
            bust: false,
            sprite: folder + '-svg.svg',
            render: {
              scss: {
                template: path.join(`${config.dir.src}/css/sprites-data`, 'sprite-svg-mixins.handlebars'),
                dest: path.posix.join(`${config.dir.src}/css`, 'sprites-data', '_' + folder + '-svg-mixins.scss')
              }
            }
          }
        },
        variables: {
          spriteName: folder,
          baseName: path.posix.relative(`${config.dir.src}/css`, path.posix.join(`${config.dir.src}/img`, folder + '-svg')),
          svgToPng: ''
        }
      }
    },
  };

  await Promise.all(
    folders.map((folder) => {
      return new Promise((resolve => {
        src(path.join(`${config.dir.src}/img/sprites-svg`, folder, '*.svg'))
          .pipe(sort())
          .pipe(svgSprite(options.spritesmith({folder, config})))
          .pipe(imagemin([
            imagemin.svgo({ // svg
              plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
              ]
            })
          ], {
            verbose: true
          }))
          .pipe(dest('./'))
          .on('end', resolve);
      }))
    })
  );
}

export const spriteSvgMove = () =>
    src("./*.svg")
    .pipe(dest(`${config.dir.dist}/img`))

export const delSvg = (done) => {
    del("./*.svg")
    done()
}

