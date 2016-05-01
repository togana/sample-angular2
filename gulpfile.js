var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var del = require('del');
var concat = require('gulp-concat')
var runSequence = require('run-sequence');

// build clean
gulp.task('build:clean', function(){
    return del('dist')
});

// SERVER

// build server
gulp.task('build:server', function () {
	var tsProject = ts.createProject('server/tsconfig.json');
  var tsResult = gulp.src('server/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
	return tsResult.js
    .pipe(concat('server.js'))
    .pipe(sourcemaps.write())
  	.pipe(gulp.dest('dist'))
});

// build
gulp.task('build', function(callback){
  runSequence(
    'build:clean',
    'build:server',
    callback
  );
});

gulp.task('default', ['build']);
