'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var gutil = require('gulp-util');

gulp.task('default', ['css', 'html']);

gulp.task('css', function() {
  return gulp.src('css/main.less')
    .pipe(less())
    .pipe(minifyCss())
      .on('error', gutil.log)
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('./dist'));
});
