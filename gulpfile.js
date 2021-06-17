const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cssmin = require('gulp-clean-css');
const jsmin = require('gulp-terser');
const imgmin = require('gulp-imagemin');

// ====================
//html
// ====================
function copyhtml(cb) {
  gulp.src('./src/index.html').pipe(gulp.dest('./public'));
  cb();
}
exports.copyhtml = copyhtml;
// ====================
//sass
// ====================
function compilesass() {
  return gulp
    .src('./src/sass/*.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(prefix('last 5 version'))
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css', { sourcemaps: '.' }));
}
exports.compilesass = compilesass;

// ====================
// js
// ====================
function minifyjs() {
  return gulp
    .src('./src/js/*.js', { sourcemaps: true })
    .pipe(jsmin())
    .pipe(gulp.dest('./public/js', { sourcemaps: '.' }));
}
exports.minifyjs = minifyjs;

// ====================
// image
// ====================

function optimizeimg() {
  return gulp
    .src('./src/images/*.{png,jpg}')
    .pipe(
      imgmin([
        imgmin.mozjpeg({ quality: 75, progressive: true }),
        imgmin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(gulp.dest('./public/images'));
}
exports.optimizeimg = optimizeimg;

// ====================
// run
// ====================
exports.run = gulp.series(copyhtml, compilesass, minifyjs, optimizeimg);
// ====================
// watch
// ====================

function watchTask() {
  gulp.watch('./src/*.html', copyhtml);
  gulp.watch('./src/sass/*.scss', compilesass);
  gulp.watch('./src/js/*.js', minifyjs);
  gulp.watch('./src/images/*.{png,jpg}', optimizeimg);
}
exports.watchTask = watchTask;

// ====================
// default
// ====================

exports.default = gulp.series(
  copyhtml,
  compilesass,
  minifyjs,
  optimizeimg,
  watchTask
);
