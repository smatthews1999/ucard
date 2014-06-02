// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var coffee = require('gulp-coffee');
var jade = require('gulp-jade');
var gutil = require('gulp-util');


gulp.task('coffee', function() {
  gulp.src('./js/*.coffee')
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('./js/'))
});


// Lint Task
gulp.task('lint', function() {
    return gulp.src('./js/site.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('tpl/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./tpl/'))

});
gulp.task('index', function() {
  var YOUR_LOCALS = {};

  gulp.src('index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('.'))

});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./js/site.coffee', ['coffee']);
    gulp.watch('./js/site.js', ['lint']);
    gulp.watch('./tpl/*.jade', ['jade']);
    gulp.watch('index.jade', ['index']);
});

// Default Task
gulp.task('default', ['lint', 'coffee', 'jade','index','watch']);
