var gulp = require('gulp');
var sass = require('gulp-sass');
var phantomcss = require('gulp-phantomcss');

gulp.task('compile', function() {
    return gulp.src('tests/scss/*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('tests/css'));
});

gulp.task('test', ['compile'], function() {
    return gulp.src('tests/testrunner.js')
        .pipe(phantomcss({
            screenshotRoot: './tests/screenshots',
            comparisonRootResult: './tests/results',
            breakOnError: true,
            logLevel: 'debug'
        }));
});