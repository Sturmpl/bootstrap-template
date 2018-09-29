let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');

gulp.task('serve', ['sass'], function () {
    browserSync({
        server: 'src'
    });
    gulp.watch('src/*.html',  function(){
        browserSync.reload();
    });
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js',  function(){
        browserSync.reload();
    });
});
gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'Firefox > 20']
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);