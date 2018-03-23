module.exports = (gulp, pkgs, cfg) => {
    return () => {
        gulp.src(`${cfg.dir.src}/styles/*.scss`)
            .pipe(pkgs.gulpif(
                cfg.fns.envCheck('prod', false),
                pkgs.sourcemaps.init()
            ))
            .pipe(pkgs.sassGlob())
            .pipe(pkgs.sass({
                importer: pkgs.sassImport(),
            }).on('error', pkgs.sass.logError))
            .pipe(pkgs.autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
            .pipe(pkgs.gulpif(
                cfg.fns.envCheck('prod', false),
                pkgs.sourcemaps.write()
            ))
            .pipe(pkgs.gulpif(
                cfg.fns.envCheck('prod'),
                pkgs.rename({
                    suffix: '.min',
                })
            ))
            .pipe(pkgs.gulpif(
                cfg.fns.envCheck('prod'),
                pkgs.cleanCSS() // Default Internet Explorer 10+
            ))
            .pipe(gulp.dest(`${cfg.dir.dist}/styles/`))
            .pipe(pkgs.gulpif(
                cfg.fns.envCheck('watch'),
                pkgs.bs.stream()
            ))
    };
};