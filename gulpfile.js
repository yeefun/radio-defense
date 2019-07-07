const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const gulpSequence = require('gulp-sequence');
const browserSync = require('browser-sync').create();

const parseArgs = require('minimist');
const envOptions = {
  string: 'env',
  default: {
    env: 'dev',
  },
}
const options = parseArgs(process.argv.slice(2), envOptions);



gulp.task('clean', () => {
  return gulp.src('./dist/', {
      read: false
    })
    .pipe($.clean());
});



gulp.task('pug', () => {
  return gulp.src('./src/**/*.pug')
    .pipe($.plumber())
    .pipe($.pug({
      // pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});



gulp.task('sass', () => {
  const plugins = [
    autoprefixer({
      // https://github.com/browserslist/browserslist#best-practices
      // browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
      browsers: ['last 1 version', 'not dead', '> 0.2%']
    })
  ];
  return gulp.src('./src/scss/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    // CSS 編譯完成
    .pipe($.postcss(plugins))
    .pipe($.if(options.env === 'prod', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream());
});



gulp.task('babel', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.if(options.env === 'prod', $.uglify({
      compress: {
        drop_console: true,
      },
    })))
    .pipe($.concat('index.js'))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browserSync.stream());
});



// https://www.npmjs.com/package/gulp-imagemin
// https://www.npmjs.com/package/gulp-svgmin
gulp.task('img-compress', () => {
  return gulp.src('./src/assets/**/*.svg')
    .pipe($.plumber())
    // .pipe($.if(options.env === 'prod', $.imagemin()))
    .pipe($.if(options.env === 'prod', $.svgmin()))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('img', () => {
  return gulp.src('./src/assets/**/*.{png,jpg,ico}')
    .pipe($.plumber())
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream());
});

gulp.task('audio', () => {
  return gulp.src('./src/assets/**/*.mp3')
  .pipe($.plumber())
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
});



gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
    // reloadDebounce: 800,
  });
});



// 監聽檔案變動
gulp.task('watch', () => {
  gulp.watch('./src/**/*.pug', ['pug']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['babel']);
  gulp.watch('./src/assets/**/*.svg', ['img-compress']);
  gulp.watch('./src/assets/**/*.mp3', ['audio']);
});





// 開發流程
gulp.task('default', ['pug', 'sass', 'babel', 'img', 'img-compress', 'audio', 'browser-sync', 'watch']);

// 發布流程
gulp.task('build', gulpSequence('clean', 'pug', 'sass', 'babel', 'img', 'img-compress', 'audio'));