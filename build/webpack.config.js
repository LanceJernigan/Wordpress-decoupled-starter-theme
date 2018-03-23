module.exports = (pkg, cfg) => {

    const foundation = `${cfg.dir.root}/node_modules/foundation-sites/js/`;
    const bootstrap = `${cfg.dir.root}/node_modules/bootstrap/js/`;

    this.config = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    // Using include to whitelist rather than blacklist
                    include: [
                        cfg.dir.src,
                        foundation,
                        bootstrap,
                    ],
                    // exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                require('./babel'),
                                'react'
                            ],
                            plugins: [
                                'transform-object-rest-spread',
                                'transform-class-properties',
                            ]
                        },
                    },
                },
            ],
        },
        externals: {
            jquery: 'jQuery'
        },
    };

    if (cfg.fns.envCheck('prod', false)) {
        this.config.devtool = 'source-map';
    }
    else {
        this.config.output = {
            filename: '[name].min.js',
        };
    }
    return this.config;

};
