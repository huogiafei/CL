const gulp = require('gulp'),
    /*config*/
    config = require('./config.json');

/*develop*/
bs = require('browser-sync').create('cl'),
    middleware = require('middleware'),
    compress = require('compression'),
    pump = require('pump'),
    rm = require('gulp-rm'),
    runSequence = require('run-sequence'),

    sftp = require('gulp-sftp'),
    image = require('gulp-image'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'),
    rev = require('gulp-rev'),
    sourcemaps = require('gulp-sourcemaps'),
    revCollector = require('gulp-rev-collector'),
    htmlReplace = require('gulp-html-replace'),
    uglify = require('gulp-uglify');

/**
 * DEVELOP
 */
gulp.task('bs', function () {
    let files = [
        '**/*.html',
        '**/*.css',
        '**/*.js'
    ];
    bs.init(files, {
        server: {
            baseDir: "./",
            middleware: [compress()]
        }
    });
});

/**
 * IMAGE
 */
/* image compress */
gulp.task('img-min', () =>
    gulp.src('img/src/**/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            svgo: true,
            mozjpeg: true,
            concurrent: 10
        }))
        .pipe(gulp.dest('img/min'))
)

/* upload */
gulp.task('img-upload', ['img-min'], () =>
    gulp.src('img/min/**/*')
        .pipe(sftp({
            host: config.sftp.host,
            user: config.sftp.user,
            pass: config.sftp.pass,
            port: config.sftp.port,
            remotePath: config.sftp.imgPath,
        }))
);

/**
 * CSS
 */
/* css folder clean */
gulp.task('css-rm', () =>
    gulp.src('build/css/**/*', {read: false})
        .pipe(rm())
)

/* minify css */
gulp.task('css-min', ['css-rm'], () =>
    gulp.src(config.css.main)
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('build/css/'))
        .pipe(rev.manifest('manifest.json', {
            base: './',
            merge: true
        }))
        .pipe(gulp.dest('./'))
)

/**
 * JS
 */
gulp.task('js-rm', () =>
    gulp.src('build/js/**/*', {read: false})
        .pipe(rm())
)

/*js minify*/
gulp.task('js-min-common', () =>
    gulp.src(config.js.common)
        .pipe(uglify({
            mangle: true,
            compress: true,
        }))
        .pipe(concat('common.js'))
        .pipe(rev())
        .pipe(gulp.dest('build/js'))
        .pipe(rev.manifest('manifest.json', {
            base: './',
            merge: true
        }))
        .pipe(gulp.dest('./'))
)

gulp.task('js-min-vendor', () =>
    gulp.src(config.js.vendor)
        .pipe(uglify({
            mangle: true,
            compress: {
                drop_console:true,
                drop_debugger:true
            }
        }))
        .pipe(concat('vendor.js'))
        .pipe(rev())
        .pipe(gulp.dest('build/js'))
        .pipe(rev.manifest('manifest.json', {
            base: './',
            merge: true
        }))
        .pipe(gulp.dest('./'))
)

gulp.task('js-min', function (done) {
    runSequence(
        ['js-rm'],
        ['js-min-common'],
        ['js-min-vendor'],
        done);
});


gulp.task('rev', () =>
    gulp.src(['manifest.json',
        "view/login.html", "index.html"])
        .pipe(htmlReplace({
            'css': '../css/main.css',
            'common': '../js/common.js',
            'vendor': '../js/vendor.js',
            'dev': ''
        }))
        .pipe(revCollector({}))
        .pipe(gulp.dest('build/html'))
)


/**
 * BUILD
 */
gulp.task('build', function (done) {
    /*runSequence(
     ['revFont', 'revImg'],
     ['lintJs'],
     ['revCollectorCss'],
     ['miniCss', 'miniJs'],
     ['miniHtml', 'delRevCss'],
     done);*/
});


