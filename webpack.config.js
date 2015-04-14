var pkg = require("./package.json");
var dirs = pkg.projectConfig.dirs;

module.exports = {
    entry: __dirname + "/" + dirs.src + "/assets/js/main.js",
    output: {
        publicPath: "/assets/js/",
        path: __dirname + "/" + dirs.dist + "/assets/js/",
        filename: "[name].js"
    },
    devServer: {
        contentBase: dirs.dist,
        publicPath: "/assets/js/",
        stats: {colors: true}
    }
};
