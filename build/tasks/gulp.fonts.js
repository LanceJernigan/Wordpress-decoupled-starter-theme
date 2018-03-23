module.exports = (gulp, pkgs, cfg) => {
    return () => {
        gulp.src(cfg.fonts)
            .pipe(pkgs.flatten())
            .pipe(gulp.dest(`${cfg.dir.dist}/fonts/`))
    };
};