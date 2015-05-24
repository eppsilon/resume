'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');

var minifyCss = require('gulp-minify-css');
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefix = new LessPluginAutoPrefix({ browsers: ['last 2 versions'] });

var minifyHtml = require('gulp-minify-html');

var livereload = require('gulp-livereload');
var server = require('gulp-webserver');

gulp.task('default', ['css', 'js', 'html']);
gulp.task('dev', ['watch']);

gulp.task('watch', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true
    }));

  gulp.src('src/css/*.less')
    .pipe(watch('src/css/*.less', function() {
      gulp.start('css');
    }, { verbose: true }));

  gulp.src('src/js/*.js')
    .pipe(watch('src/js/*.js', function() {
      gulp.start('js');
    }, { verbose: true }));

  gulp.src('src/*.html')
    .pipe(watch('src/*.html', function() {
      gulp.start('html');
    }, { verbose: true }));
});

gulp.task('css', function() {
  return gulp.src('src/css/*.less')
    .pipe(less({ plugins: [autoprefix] }))
    .on('error', gutil.log)
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
    .on('error', gutil.log)
    .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});
