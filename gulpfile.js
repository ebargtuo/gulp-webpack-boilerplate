"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var connect = require("gulp-connect");
var runSequence = require("run-sequence");
var mocha = require("gulp-mocha");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var karma = require("karma").server;

var pkg = require("./package.json");
var config = pkg.projectConfig;
var webpackConfig = require("./webpack.config.js");

var webpackDevServer;

//
// HELPER TASKS
//

gulp.task("clean", function(done) {
    require("del")([
        config.dirs.dist
    ], done);
});

gulp.task("copy", [
    "copy:src",
    "copy:normalize"
]);

gulp.task("copy:src", function() {
    return gulp.src(config.dirs.src + "/**.html")
               .pipe(gulp.dest(config.dirs.dist));
});

gulp.task("copy:normalize", function() {
    return gulp.src("node_modules/normalize.css/normalize.css")
               .pipe(gulp.dest(config.dirs.vendor + "/css"));
});

gulp.task("watch:src", function(done) {
    gulp.watch(config.dirs.src + "/**.html", function(event) {
        runSequence(
            "copy:src",
            "webpack-dev-server:reload"
        );
    });
    done();
});

gulp.task("test", [
    "test:unit",
    "test:integration"
]);

gulp.task("test:unit", function() {
    return gulp.src("test/unit/**/*.js", {read: false})
        // gulp-mocha needs filepaths so you can"t have any plugins before it
        .pipe(mocha());
});

gulp.task("test:integration", function(done) {
    karma.start({
        configFile: __dirname + "/karma.conf.js"
    }, done);
});

gulp.task("test:integration:watch", function(done) {
    karma.start({
        configFile: __dirname + "/karma.conf.js",
        singleRun: false
    });
    done();
});

gulp.task("test:build", function() {
    return gulp.src("test/build/**/*.js", {read: false})
        // gulp-mocha needs filepaths so you can"t have any plugins before it
        .pipe(mocha());
});

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(require("./webpack.config.js"), function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var webpackDevConfig = Object.create(webpackConfig);
    webpackDevConfig.debug = true;
    webpackDevConfig.devtool = "eval";

    var compiler = webpack(webpackConfig);

    webpackDevServer = new WebpackDevServer(compiler, webpackConfig.devServer);
    webpackDevServer.listen(5000, "0.0.0.0", function(err) {
        if (err) {
            throw new gutil.PluginError("webpack-dev-server", err);
        }
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        callback();
    });
});

gulp.task("webpack-dev-server:reload", function(done) {
    if (webpackDevServer && webpackDevServer.io) {
        webpackDevServer.io.sockets.emit("ok");
    }
    done();
});

gulp.task("connect", function() {
    connect.server({
        root: config.dirs.dist,
        port: 5000
    });
});

//
// MAIN TASKS
//

gulp.task("build", function(done) {
    runSequence(
        "clean",
        "test",
        "copy",
        "webpack",
        "test:build",
    done);
});

gulp.task("default", function(done) {
    runSequence(
        "build",
        "test:integration:watch",
        "watch:src",
        "webpack-dev-server",
    done);
});
