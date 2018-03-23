/**
 * @link https://css-tricks.com/svg-symbol-good-choice-icons/
 */

const path = require('path');

module.exports = (gulp, pkgs, cfg) => {

    // Path to our custom Font Awesome 5 Pro package.
    const fontAwesomeDir = `${cfg.dir.src}/font-awesome-5`;
    // Path to the Raw SVG's from Font Awesome 5 Pro.
    const fontAwesomeDirRawSVG = path.join(fontAwesomeDir, '/advanced-options/raw-svg');
    // Get list of Font Awesome Icons we want to use in our sprites sheet.
    const fontAwesomeSVGs = cfg.svgSprite.fontAwesomeRawSVGs.map(item => {
        let icon = path.resolve(`${fontAwesomeDirRawSVG}/${item}.svg`);
        if (!icon) {
            return null
        }
        return icon;
    });

    // Get all custom SVG's we've added to our source svg folder in the theme.
    const svgThemePaths = pkgs.globule.find(`${cfg.dir.src}/svg/**/*.svg`);

    // Concatenate lists of SVG we're going to gather up for processing.
    const svgFiles = [].concat.apply(fontAwesomeSVGs, svgThemePaths);

    const svgSymbolOptions = {
        id: 'symbol-%f',
        templates: ['default-svg'],
        // warn: false,
        fill: '',
        svgAttrs: {
            'class': 'svg-icon-lib',
            'aria-hidden': 'true',
            'style': 'position:absolute;width:0;height:0;overflow:hidden;',
            'data-enabled': 'true',
        },
    };

    return () => {
        gulp.src(svgFiles)
            .pipe(pkgs.svgMin({
                plugins: [
                    /**
                     * SVGO Plugins
                     * @link https://github.com/svg/svgo#what-it-can-do
                     */
                    {removeViewBox: false},
                    {removeUselessStrokeAndFill: true},
                    {removeAttrs: {attrs: '(fill-rule|fill)'}}
                ],
            }))
            .pipe(pkgs.svgSymbols(svgSymbolOptions))
            .pipe(pkgs.rename({
                basename: 'sprites',
            }))
            .pipe(gulp.dest(`${cfg.dir.dist}/svg/`));
        gulp.src(svgFiles)
            .pipe(pkgs.svgMin())
            .pipe(gulp.dest(`${cfg.dir.dist}/svg/`))
    };
};