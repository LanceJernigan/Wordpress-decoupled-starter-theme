module.exports = (pkgs, cfg) => {
    return () => {
        pkgs.bs.init(['*'], {
            proxy: cfg.browserSync.proxy,
            port: cfg.browserSync.port,
            root: cfg.dir.root,
            ui: false,
            online: false, // reduces start-up time
            open: {
                file: 'index.php'
            },
            notify: {
                styles: {
                    top: 'auto',
                    bottom: '0',
                    left: '0',
                    right: 'auto'
                }
            },
        });
    };
};