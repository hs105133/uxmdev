var gulp = require("gulp"),
    config = require('./build-config.json'),
    concat = require('gulp-concat'),
    ngmin = require('gulp-ngmin'),
    uglify = require('gulp-uglify'),

    minifyHTML = require('gulp-minify-html'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    htmlreplace = require('gulp-html-replace'),
    less = require("gulp-less");

var buildPath = config.buildPath,
	lessSrc = config.lessSrc;
	

gulp.task('htmlreplace', function() {
  gulp.src('app/index.html')
    .pipe(htmlreplace({
        'css': 'css/main.min.css',
        'js': 'js/all.min.js'
    }))
    .pipe(gulp.dest(buildPath))
    .pipe(minifyHTML({quotes: true, empty:true, spare: true }))
    .pipe(gulp.dest(buildPath));

    gulp.run('html');
});

gulp.task('html', function() {
  gulp.src('app/views/**/*.html')
    .pipe(minifyHTML({quotes: true, empty:true, spare: true }))
    .pipe(gulp.dest(buildPath+"views"));
});

gulp.task('less', function () {
    gulp.src(lessSrc) // path to your file
    .pipe(less())
    .pipe(gulp.dest('app/css/'));

    gulp.run('cssmin');
});

gulp.task('lint', function() {
  gulp.src("app/scripts/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('concatjs', function() {
    gulp.src(config.jsSrc)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(buildPath+'js/'))
        .pipe(ngmin())
        .pipe(gulp.dest(buildPath+'js/'))
        .pipe(uglify())
        .pipe(gulp.dest(buildPath+'js/'));

    gulp.run('lint');
});


// gulp.task('ngmin', ["concatjs"], function () {
//     gulp.src(buildPath+'js/all.js')
//         .pipe(ngmin())
//         .pipe(gulp.dest(buildPath+'js/all-min.js'));
// });

// gulp.task('compressjs', function() {
//   gulp.src(buildPath+'js/all.js')
//     .pipe(uglify())
//     .pipe(gulp.dest(buildPath+'js/'));
// });


gulp.task('cssmin', function () {
         gulp.src('app/css/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(buildPath+'css'));
});

gulp.task("watch", function(){
	gulp.watch("app/less/**/*.less", ["less"]);
    gulp.watch(config.jsSrc, ["concatjs"]);
});

gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(config.filesToMove, { base: 'app/' })
  .pipe(gulp.dest(buildPath));
});



gulp.task("default", ["less", "concatjs", "htmlreplace", "move"]);