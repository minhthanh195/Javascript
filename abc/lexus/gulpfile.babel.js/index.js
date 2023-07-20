'use strict';
import { series, parallel } from 'gulp';
import { cloneRoot, cloneFontFolder, cloneJS } from './clone';
import { setting } from './project';
import { swipeDist } from './swipe';
import { minifyJS } from './js';
import { spriteSvg, generateImages, generateSprite, spriteSvgMove, delSvg } from './images';
import { concatLibsCSS, compileSCSS } from './css';
import { setHTML, generateHTML } from './html';
import { watchingResources, launchServer } from './server';
import { sourceDeploy } from './deploy';

exports.cloneRoot = cloneRoot;
exports.setting   = setting;
exports.build     = series(swipeDist, parallel(cloneRoot, cloneFontFolder, cloneJS, spriteSvg, generateSprite, generateImages, concatLibsCSS, setHTML), spriteSvgMove, delSvg, generateHTML, minifyJS, compileSCSS);

// Default
exports.default = series(exports.build, watchingResources, launchServer);

// Deploy
exports.deploy = series(exports.build, sourceDeploy);