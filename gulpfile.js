"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var rename = require("gulp-rename");
var minify = require("gulp-csso");

gulp.task('style', function(){
    gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
        autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
    server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
});
    gulp.watch("sass/**/*.scss", ['style']);
    gulp.watch("js/*.js", ['copy']).on("change", server.reload);
    gulp.watch('*.html', ['copy']);
});

gulp.task("clean", function () {
return del("build");
});

gulp.task("copy", function () {
return gulp.src([
    "fonts/*.{woff,woff2}",
    "*.html",
    "img/**",
    "js/**",
], {
    base: ".",
})
    .pipe(gulp.dest("build"))
    .pipe(server.stream())
});

// gulp.task("build", function () {
// run(
//     "clean",
//     "copy",
//     "style"
//     );
// });

gulp.task('build', ['clean', 'copy', 'style']);