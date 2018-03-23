const gulp = require('gulp');

const cfg = require('./config');

const path = require('path');

const pkgs = {
    // General Packages
    bs: require('browser-sync').create(),
    del: require('del'),
    flatten: require('gulp-flatten'),
    globule: require('globule'),
    plumber: require('gulp-plumber'),
    rename: require('gulp-rename'),
    sourcemaps: require('gulp-sourcemaps'),
    gulpif: require('gulp-if'),
    notify: require('gulp-notify'),
    runSequence: require('run-sequence'),
    // CSS Packages
    autoprefixer: require('gulp-autoprefixer'),
    sass: require('gulp-sass'),
    sassImport: require('node-sass-package-importer'),
    sassGlob: require('gulp-sass-glob'),
    cleanCSS: require('gulp-clean-css'),
    // JS Packages
    eslint: require('gulp-eslint'),
    uglify: require('gulp-uglify'),
    webpack: require('webpack-stream'),
    named: require('vinyl-named'), // using this to auto name files for webpack... supposedly.
    // Image Packages
    imagemin: require('gulp-imagemin'),
    svgo: require('gulp-svgo'),
    svgSymbols: require('gulp-svg-symbols'),
    svgMin: require('gulp-svgmin'),
};

cfg.dir = {
    root: path.resolve(process.env.PWD),
    src: path.join(process.env.PWD, 'src'),
    dist: path.join(process.env.PWD, 'dist'),
};

cfg.fns = {
    envCheck: require('./functions/environmentCheck'),
    errorHandler: require('./functions/errorHandler'),
    fileNameFromPath: require('./functions/fileNameFromPath')
};

const tasks = {
    styles: require('./tasks/gulp.styles'),
    scripts: require('./tasks/gulp.scripts'),
    browserSync: require('./tasks/gulp.browserSync'),
    clean: require('./tasks/gulp.clean'),
    lint: require('./tasks/gulp.lint'),
    fonts: require('./tasks/gulp.fonts'),
    images: require('./tasks/gulp.images'),
    svg: require('./tasks/gulp.svg'),
};

gulp.task('styles', tasks.styles(gulp, pkgs, cfg));
gulp.task('lint', tasks.lint(gulp, pkgs, cfg));
gulp.task('scripts', ['lint'], tasks.scripts(gulp, pkgs, cfg));
gulp.task('fonts', tasks.fonts(gulp, pkgs, cfg));
gulp.task('images', tasks.images(gulp, pkgs, cfg));
gulp.task('svg', tasks.svg(gulp, pkgs, cfg));
gulp.task('clean:dist', tasks.clean(gulp, pkgs, cfg));
gulp.task('browserSync', tasks.browserSync(pkgs, cfg));

gulp.task('watch', ['browserSync'], () => {

    /**
     *  Having to use paths better for globbing, shouldn't have to do this when gulp 4 is released
     *  Fixes gulp watching new files issue
     */
    let src = '../src';
    let root = '..';

    // Normal tasks
    gulp.watch(`${src}/styles/**/*`, ['styles']);
    gulp.watch(`${src}/scripts/**/*.js`, ['scripts', pkgs.bs.reload]);
    gulp.watch(`${src}/images/*`, ['images', pkgs.bs.reload]);
    gulp.watch(`${src}/svg/*`, ['svg', pkgs.bs.reload]);
    gulp.watch(`${src}/fonts/*`, ['fonts', pkgs.bs.reload]);
    gulp.watch(`${root}**/*.php`, pkgs.bs.reload);

    // For Nate's style of module folders
    gulp.watch(`${root}**/*.twig`, pkgs.bs.reload);
    gulp.watch(`${root}/modules/**/*.scss`, ['styles']);
    gulp.watch(`${root}/modules/**/*.js`, ['scripts', pkgs.bs.reload]);

    // Kill gulp process if we edit our gulpfile
    gulp.watch(`${cfg.dir.root}/build/**/*`).on('change', () => {
        process.exit(0)
    });
});

gulp.task('default', callback => {
    pkgs.runSequence('clean:dist', ['styles', 'scripts', 'images', 'svg', 'fonts',], callback);
});
