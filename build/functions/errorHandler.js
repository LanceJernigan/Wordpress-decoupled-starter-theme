const fileNameFromPath = require('./fileNameFromPath');

module.exports = (plugins, err) => {

    return ((err) => {
            let errorMessage = `${fileNameFromPath(err.fileName)} line: ${err.loc.line} column ${err.loc.column}`;
            plugins.notify.onError({
                title: "Gulp Error",
                message: `Error: ${errorMessage}`,
                sound: "Bottle"
            })(err);
            console.log(err.codeFrame);
        }
    )(err);

};