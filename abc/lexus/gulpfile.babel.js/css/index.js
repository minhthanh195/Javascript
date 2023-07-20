import { src, dest } from 'gulp';
import concatcss from 'gulp-concat-css';
import sass from 'gulp-sass';
import size from 'gulp-size';
import autoprefixer from 'gulp-autoprefixer';
import config from '../../config.json';

export const concatLibsCSS = () =>
    src(config.cssSetting.libs)
    .pipe(concatcss('libs.css'))
    .pipe(dest(config.cssSetting.dist))

export const isDeploy = () => {
    let i = process.argv.indexOf("deploy");
    return i == -1;
}

export const compileSCSS = () => 
    src([config.cssSetting.src], { sourcemaps: isDeploy })
    .pipe(sass(config.cssSetting.sassOpts))
    .pipe(autoprefixer({
      overrideBrowserslist: config.autoprefixer,
      remove: false,
      cascade: false
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(dest(config.cssSetting.dist, { sourcemaps: isDeploy }))

