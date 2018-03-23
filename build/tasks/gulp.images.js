module.exports = (gulp, pkgs, cfg) => {
    return () => {
        gulp.src(`${cfg.dir.src}/images/**/*`)
            .pipe(pkgs.imagemin())
            .pipe(gulp.dest(`${cfg.dir.dist}/images/`))
    };
};