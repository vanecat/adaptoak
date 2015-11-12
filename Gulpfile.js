'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    refresh = require('gulp-livereload'),
    buffer = require('vinyl-buffer'),
    nodemon = require('gulp-nodemon');

var expressServer = require('./server');
gulp.task('serve_', function() {
  console.log('Server');
  expressServer.startServer();
});

gulp.task('serve', function () {
  nodemon({ script: 'server.js', ext: 'json js', ignore: ['public/*', 'client/*'] })
  .on('change', ['lint'])
  .on('restart', function () {
    console.log('Restarted webserver')
  });
});

// JSLint task
gulp.task('lint', function() {
  gulp.src('client/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('client/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('public/css/'));
});

// Browserify task
gulp.task('browserify', function() {
  var bundleStream = browserify({
    entries: ['./client/scripts/main.js'],
    debug: true
  })
  .bundle()
  .pipe(source('main.min.js'));
  return bundleStream.pipe(gulp.dest('./public/js'));
});

// Browserify task
gulp.task('minify', function() {
  var minifyStream = gulp.src('./public/js/main.js')
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
  .pipe(uglify({mangle: false}))
  .pipe(rename({ suffix: '.min'}))
  .pipe(sourcemaps.write('./'));
  //  // writes .map file
  return minifyStream.pipe(gulp.dest('./public/js'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('client/index.html')
  // And put it in the public folder
  .pipe(gulp.dest('public/'));

  // Any other view files from client/views
  gulp.src('client/views/**/*')
  // Will be put in the public/views folder
  .pipe(gulp.dest('public/views/'));
});

var isWatching = false;

gulp.task('watch', ['serve', 'lint'], function() {
  isWatching = true
  // Start live reload server
  refresh.listen();

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['client/scripts/*.js', 'client/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);

  // Watch our sass files
  gulp.watch(['client/styles/**/*.scss'], [
    'styles'
  ]);

  // Watch view files
  gulp.watch(['client/**/*.html'], [
    'views'
  ]);

  gulp.watch('./public/**').on('change', refresh.changed);
});

gulp.on('stop', function() {
    if (!isWatching) {
        process.nextTick(function() {
            process.exit(0);
        });
    }
});

// Dev task
gulp.task('dev', ['views', 'styles', 'lint', 'browserify', 'watch'], function() {});

// Build task
gulp.task('build', ['views', 'styles', 'lint', 'browserify'], function() {});

gulp.task('default', ['dev']);