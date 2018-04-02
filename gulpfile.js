// .........................................................Подключения зависимостей
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var rename       = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var watch        = require('gulp-watch');
var browserSync  = require('browser-sync').create();
var image        = require('gulp-image');



// .........................................................css

gulp.task('css', function() { 
	console.log('---------- Обработка CSS');
	return gulp.src('app/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 4 versions']
        }))
        .pipe(concat("style.css")) 
        .pipe(rename("style.css"))
        .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});


// ...........................................................js

gulp.task('js', function() {
	console.log('---------- Обработка JS');
    return gulp.src('app/js/**/*.js')
        .pipe(concat("js.js")) 
        .pipe(rename("js.js"))
        .pipe(gulp.dest('dist/js/'))
});


// ...........................................................images

gulp.task('img', function() {
    console.log('---------- Обработка img');
    return  gulp.src('app/img/**/*') 
        .pipe(gulp.dest('dist/img/'))

});


// .........................................................serve

gulp.task('browser-sync', function() {
    console.log('---------- Обработка browser-sync');
   browserSync.init({
        server: {
            baseDir: './'
        },
   });
});

// .........................................................image

gulp.task('image', function () {
    console.log('---------- Обработка image');
  gulp.src('./app/img/*')
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      jpegRecompress: false,
      mozjpeg: true,
      guetzli: false,
      gifsicle: true,
      svgo: true,
      concurrent: 10,
      quiet: true // defaults to false
    }))
    .pipe(gulp.dest('./dist/img'));
});

// .........................................................watch

gulp.task('watch', ['browser-sync', 'image', 'css', 'js'], function () {
    console.log('---------- Обработка Watch');
    gulp.watch('app/css/**/*.css', ['css']); 
    gulp.watch('**/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', ['js'])
    gulp.watch("*.html").on('change', browserSync.reload);
});


// .........................................................default

gulp.task('default', ['watch']);

