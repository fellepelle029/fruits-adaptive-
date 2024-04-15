const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const flatten = require('gulp-flatten');

gulp.task('images', function () {
    return gulp.src('source/images/**/*.png')
        .pipe(rename(function (path) {
            path.dirname = path.dirname.replace(/^source\/images\//, '');
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('sass', function () {
    return gulp
        .src('source/stylesheets/sass/styles.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/stylesheets/css'))
});


gulp.task('minify', function () {
    return gulp
        .src('dist/stylesheets/css/styles.css')
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/stylesheets/css'));
});

gulp.task('watch', function () {
    gulp.watch('source/stylesheets/sass/*.sass', gulp.series('sass', 'minify'));
});

gulp.task('default', gulp.series('images', 'sass', 'minify'));