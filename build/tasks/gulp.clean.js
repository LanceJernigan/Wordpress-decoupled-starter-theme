module.exports = (gulp, pkgs, cfg) => {
    return () => {
        return Promise.all([
            pkgs.del([`${cfg.dir.dist}/**/*`], {force: true})
        ])
    }
};