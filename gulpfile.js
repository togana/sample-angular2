var gulp = require('gulp');
var path = require('path');
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

// CLIENT

// jsNPMDependencies, sometimes order matters here! so becareful!
var jsNPMDependencies = [
  'angular2/bundles/angular2-polyfills.js',
  'systemjs/dist/system.src.js',
  'rxjs/bundles/Rx.js',
  'angular2/bundles/angular2.dev.js',
  'angular2/bundles/router.dev.js'
]

// build index
gulp.task('build:index', function(){
  var mappedPaths = jsNPMDependencies.map(file => {return path.resolve('node_modules', file)})
  var copyJsNPMDependencies = gulp.src(mappedPaths, {base:'node_modules'})
    .pipe(gulp.dest('dist/libs'))
  var copyIndex = gulp.src('client/index.html')
    .pipe(gulp.dest('dist'))
  return [copyJsNPMDependencies, copyIndex];
});

// build
gulp.task('build', function(callback){
  runSequence(
    'build:clean',
    'build:server',
    'build:index',
    callback);
});

gulp.task('default', ['build']);
