var gulp = require('gulp');
var serve = require('serve-static');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

gulp.task('start', ['browserSync', 'watch']);

gulp.task('watch', function(){
    gulp.watch('./**/*.css', browserSync.reload);
    gulp.watch('./**/*.html', browserSync.reload);
    gulp.watch('./**/*.js', browserSync.reload)
});

gulp.task('browserSync', function() {
    browserSync.init({
        open: true,
        port: 8000,
        server: {
            baseDir: './app'
        }
    })
});

gulp.task('deploy', function() {
  return gulp.src('./app/**/*')
    .pipe(ghPages());
});