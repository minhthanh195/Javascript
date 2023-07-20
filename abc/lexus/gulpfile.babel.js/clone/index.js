import { src, dest } from 'gulp';
import beautify from 'gulp-jsbeautifier';
import newer from 'gulp-newer';
import config from '../../config.json';

// Clone files in root
export const cloneRoot = () =>
    src([config.dir.src + '*.*', '!src/*.html'])
    .pipe(dest(config.dir.dist))

export const cloneJS = () =>
    src(config.jsSetting.src)
    .pipe(newer(config.jsSetting.dist))
    .pipe(beautify({
      config: '.jsbeautifyrc',
      mode: 'VERIFY_AND_WRITE'
    }))
    .pipe(dest(config.jsSetting.dist))

export const cloneFontFolder = () =>
    src(config.fontsSetting.src)
    .pipe(newer(config.fontsSetting.dist))
    .pipe(dest(config.fontsSetting.dist))
