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

/*build*/
const runSequence = require('run-sequence')
const clean = require('gulp-clean')
const watch = require('gulp-watch')

gulp.task('html', function() {
  gulp.src('src/**.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('js', function() {
  gulp.src('src/js/*.js')
    .pipe(gulp.dest('public'))
})

gulp.task('css', function() {
  gulp.src('src/css/*.css')
    .pipe(gulp.dest('public'))
})

gulp.task('inline', function() {
  gulp.src('public/**.html')
    .pipe(inline({
      base: 'public/',
      js: [babel, uglify],
      css: [minifyCss, autoprefixer]
    }))
    .pipe(gulp.dest('public'))
})

gulp.task('clean', function() {
  gulp.src('public/', { read: false })
    .pipe(clean())
})

gulp.task('build', function() {
  gulp.start('clean')
  setTimeout(() => {
    gulp.start(['css', 'js', 'html'])
  }, 100)
  setTimeout(() => {
    gulp.start('inline')
  }, 300)
})
