"use strict";

var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var pkg = require("./../package.json");
var dirs = pkg.projectConfig.dirs;

describe("main", function() {
    var domStub, htmlEl, h1El;

    before(function() {
        htmlEl = {className: ""};
        h1El = {
            style: {
                backgroundColor: ""
            }
        };
        domStub = sinon.stub();
        domStub.withArgs("html").returns([htmlEl]);
        domStub.withArgs("h1").returns([h1El]);
        global.document = {
            getElementsByTagName: domStub
        };

        require("../" + dirs.src + "/assets/js/main");
    });

    it("should set the html element classname to js", function() {
        expect(domStub).to.have.been.calledWith("html");
        expect(htmlEl.className).to.equal("js");
    });

    it("should set the h1 background colour to lightblue", function() {
        expect(domStub).to.have.been.calledWith("h1");
        expect(h1El.style.backgroundColor).to.equal("lightblue");
    });

});
