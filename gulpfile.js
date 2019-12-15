const { src, dest, parallel } = require('gulp');
const watch       = require('gulp-watch');
const sass        = require('gulp-sass');
const sourcemaps  = require('gulp-sourcemaps');
const minify 			= require('gulp-minify');
const babel 			= require('gulp-babel');
const plumber 		= require('gulp-plumber');
const concat		 	= require('gulp-concat');

const basePath = './includes/';

const paths = {
	sass 	    : basePath + 'style/',
  js        : basePath + 'script/',
  img       : basePath + 'img/',
  build     : basePath + 'build/'
};

function compileSass () {
	return src(paths.sass + 'style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest(paths.build));
}

function minifyJS() {
	// return src([paths.js + 'script.js', paths.js + 'pretty-select.js'])
	return src([paths.js + 'video-loader.js'])
		.pipe(plumber())
    // Transpile the JS code using Babel's preset-env.
    .pipe(babel({
      presets: [
        ['@babel/env', {
          modules: false
        }]
      ]
    }))
		.pipe(minify({
			noSource: true,
			ext: {
		   min:'.js'
	   }
		}))
    .pipe(dest(paths.build))
}

function watchSass() {
  return compileSass()
    .pipe(watch(paths.sass + '**/*.scss', compileSass));
}

function watchJS() {
  return minifyJS()
    .pipe(watch(paths.js + 'video-loader.js', minifyJS));
}

exports.sass          = compileSass;
exports.watchSass     = watchSass;
exports.js						= minifyJS;
exports.watchJS				= watchJS;
exports.watch         = parallel(watchSass, watchJS);
exports.default       = parallel(compileSass, minifyJS);
