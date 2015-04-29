"use strict";

var chai = require("chai");
var expect = chai.expect;

var pkg = require("./../../package.json");
var dirs = pkg.projectConfig.dirs;

describe("main", function() {
    var getElementsByTagNameStub, htmlEl, h1El;

    before(function() {
        htmlEl = {className: ""};
        h1El = {
            style: {
                backgroundColor: ""
            }
        };
        getElementsByTagNameStub = function(tag) {
            if ("html" === tag) {
                return [htmlEl];
            } else if ("h1" === tag) {
                return [h1El];
            }
        };
        global.document = {
            getElementsByTagName: getElementsByTagNameStub
        };

        require("../../" + dirs.src + "/assets/js/main");
    });

    it("should set the html element classname to js", function() {
        expect(htmlEl.className).to.equal("js");
    });

    it("should set the h1 background colour to lightblue", function() {
        expect(h1El.style.backgroundColor).to.equal("lightblue");
    });

});
