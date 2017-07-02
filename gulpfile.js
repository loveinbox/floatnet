const gulp = require('gulp')

/*html*/
const fileinclude = require('gulp-file-include')
const inline = require('gulp-inline')

/*js*/
const plumber = require('gulp-plumber')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

/*css*/
const minifyCss = require('gulp-minify-css')
const autoprefixer = require('gulp-autoprefixer')
const stylus = require('gulp-stylus')
  /*build*/
const runSequence = require('run-sequence')
const clean = require('gulp-clean')
const watch = require('gulp-watch')
const concat = require('gulp-concat')

gulp.task('html', ['clean'], function() {
  return gulp.src('src/**.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('js', ['clean'], function() {
  return gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('css', ['clean'], function() {
  return gulp.src(['src/css/base.styl', 'src/css/pc.styl', 'src/css/mob.styl'])
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('img', ['clean'], function() {
  return gulp.src('src/assets/*')
    .pipe(gulp.dest('public/assets'))
})

gulp.task('inline', ['build'], function() {
  return gulp.src('public/**.html')
    .pipe(inline({
      base: 'public',
      js: [babel({
        presets: ['es2015']
      })],
      css: [minifyCss, autoprefixer],
      ignore: ['header.js', 'base.css']
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('clean', function() {
  return gulp.src('public/', { read: false })
    .pipe(clean())
})

gulp.task('build', ['clean', 'css', 'js', 'html', 'img'])

// 开发时，使用watch监测变化并重新build
gulp.task('watch', function() {
  gulp.watch(['./src/*.html', './src/**/*.html', './src/css/*.styl', './src/js/*.js'], ['build', 'inline']);
})

gulp.task('default', ['build', 'inline'], function() {
  gulp.start('watch')
})
