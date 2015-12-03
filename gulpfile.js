var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require("watchify"),
    reactify = require('reactify'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del');


gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  var bundle = browserify('src/scripts/main.js')
  bundle.transform(reactify) // use the reactify transform
  var stream = bundle.bundle()
  return stream
    .pipe(source('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("src/scripts/**/*.jsx", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});

gulp.task('dist', ['images', 'styles'], function(){
  del(['src', 'styles/lib', 'package.json','readme.txt','gulpfile.js']);
});