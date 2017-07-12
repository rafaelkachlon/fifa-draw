// Include gulp
var gulp = require('gulp');
var path = require('path');
// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var ngAnnotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var sourcemaps = require('gulp-sourcemaps');

// Browser Sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("src/**/*.scss", ['watch:sass']);
    gulp.watch("src/**/*.html", ['copy:html','watch:scipts']);
    gulp.watch("src/**/*.js", ["watch:scipts"]);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
   return  gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css','src/**/*.scss'])
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(gulp.dest('dist'));

});

gulp.task('vendors',function(){
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-ui-router/release/angular-ui-router.min.js',
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./dist'));
})

gulp.task('copy:html', function () {
     return gulp
      .src(['src/index.html','src/favicon.ico'])
      .pipe(gulp.dest('dist'));
});

gulp.task('copy:assets', function () {
    return gulp
      .src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
});
// Concatenate & Minify JS
gulp.task('scripts',['templates'], function() {
     return gulp.src(['src/**/*module.js','dist/templates.js','src/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'))
        .pipe(rename('bundle.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:scipts', ['scripts'], function(done){
    browserSync.reload();
    done();
})
gulp.task('watch:sass', ['sass'], function(done){
    browserSync.reload();
    done();
})
gulp.task('templates', function () {
  return gulp.src('src/app/**/*.html')
    .pipe(templateCache({
        root: 'src/app',
        standalone:true,
        transformUrl: function(url) {
            return url.replace(path.dirname(url), '.');
        }
    }))
    .pipe(gulp.dest('dist'));
});
// Default Task
gulp.task('default', ['lint', 'sass','scripts', 'copy:html','copy:assets','vendors','browser-sync']);