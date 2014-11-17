//Gulp plugin
var gulp = require("gulp"),
    util = require("gulp-util"),
    sass = require("gulp-sass"),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    log = util.log;
 
//Urls
var sassFiles = "assets/styles/**/*.scss",
    targetSassFiles = "styles",
    jsFiles = "assets/scripts/**/*.js",
    targetJSFiles = "styles";

gulp.task("sass", function(){
	log("Generate CSS files " + (new Date()).toString());
    gulp.src(sassFiles)
        .pipe(sass({ style: 'expanded' }))
		.pipe(gulp.dest(targetFiles))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(targetFiles));
});

/*gulp.task('scripts', function() {
    log("Generate JS files " + (new Date()).toString());
    gulp.src(jsFiles)
        //.pipe(concat('all.js'))
        //.pipe(gulp.dest('dist'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(targetJSFiles));
});
*/
gulp.task("watch", function(){
    log("Watching scss files for modifications");
    gulp.watch(sassFiles, ["sass"]);
    //gulp.watch(jsFiles, ["scripts"]);
});

//gulp.task("default", ["sass", "scriptsgulp"]);
gulp.task("default", ["sass"]);