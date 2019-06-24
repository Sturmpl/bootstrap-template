let gulp = require('gulp');
let browserSync = require('browser-sync');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let concat = require('gulp-concat');

gulp.task('serve', ['sass'], () => {
    browserSync({
        server: 'src'
    });
    gulp.watch('src/*.html', () => {
        browserSync.reload();
    });
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', () => {
        browserSync.reload();
    });
});

gulp.task('sass', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'Firefox > 20']
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('images', () => {
    return gulp.src('src/img/**/*.{jpg,jpeg,png,gif,svg,webp}')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('build', ['css', 'images']);
gulp.task('default', ['serve']);