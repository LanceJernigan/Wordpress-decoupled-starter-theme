module.exports = (gulp, pkgs, cfg) => {
    return () => {
        gulp.src(`${cfg.dir.src}/js/**/*.js`)
            .pipe(pkgs.eslint({
                configFile: `${cfg.dir.root}/build/.eslintrc`,
            }))
            .pipe(pkgs.eslint.format())
    };
};