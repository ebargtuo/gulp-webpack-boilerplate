"use strict";

var expect = require("chai").expect;

describe("main", function() {
    before(function() {
        var bodyEl = document.getElementsByTagName("body")[0];
        var mainFixture = "<h1></h1>";
        bodyEl.innerHTML = mainFixture;
        require("../src/assets/js/main");
    });

    it("should set the html element classname to js", function() {
        var htmlEl = document.getElementsByTagName("html")[0];
        expect(htmlEl.className).to.equal("js");
    });

    it("should set the h1 background colour to lightblue", function() {
        var h1El = document.getElementsByTagName("h1")[0];
        expect(h1El.style.backgroundColor).to.equal("rgb(173, 216, 230)");
    });
});
