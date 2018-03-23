module.exports = (gulp, pkgs, cfg) => {

    cfg.webpack = require('../webpack.config.js');

    return () => {
        gulp.src([
            `${cfg.dir.src}/scripts/*.js`,
            `${cfg.dir.root}/modules/**/*.js`
            ])
            .pipe(pkgs.plumber({
                errorHandler: cfg.fns.onError
            }))
            .pipe(pkgs.named()) // Allows multiple files
            .pipe(pkgs.webpack(
                cfg.webpack(pkgs, cfg),
                null,
                (err, stats) => {
                    err ? console.log(err) : null;
                }
            ))
            .pipe(pkgs.gulpif(
                cfg.fns.envCheck('prod'),
                pkgs.uglify()
            ))
            .pipe(gulp.dest(`${cfg.dir.dist}/scripts/`))
    };

};