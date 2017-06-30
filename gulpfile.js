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
const concat = require('gulp-concat')

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
  gulp.src(['src/css/base.css', 'src/css/pc.css'])
    .pipe(concat('pc.css'))
    .pipe(gulp.dest('public'))

  gulp.src(['src/css/base.css', 'src/css/mob.css'])
    .pipe(concat('mob.css'))
    .pipe(gulp.dest('public'))
})

gulp.task('inline', function() {
  gulp.src('public/**.html')
    .pipe(inline({
      base: 'public',
      js: [babel({
        presets: ['es2015']
      })],
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
  }, 200)
})

// 开发时，使用watch监测变化并重新build
gulp.task('watch', function() {
  gulp.watch(['./src/*.html', './src/**/*.html', './src/css/*.css', './src/js/*.js'], ['build']);
})

gulp.task('default', ['build', 'watch'])
