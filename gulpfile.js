'use strict';

var gulp = require('gulp');
var server = require('gulp-server-livereload');
var minifyCss = require('gulp-minify-css');
var gutil = require('gulp-util');

var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({ browsers: ['last 2 versions'] });

gulp.task('default', ['css', 'html']);
gulp.task('srv-default', ['default', 'serve']);

gulp.task('css', function() {
  return gulp.src('./src/css/main.less')
    .pipe(less({ plugins: [autoprefix] }))
    .pipe(minifyCss())
      .on('error', gutil.log)
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});
 
gulp.task('serve', function() {
  gulp.src('./dist')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});