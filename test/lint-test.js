var buster = require("buster-node");
var assert = buster.assert;
var refute = buster.refute;
var lint = require("../lib/lint");


buster.testCase("Lint", {
    setUp: function () {
        // add some options for good measure
        this.linter = lint.create();
    },

    "should be ok without lint": function () {
        var result = this.linter.check("var a = 123;");
        assert(result.ok);
    },

    "should not be ok with lint": function () {
        var result = this.linter.check("var a = 123");
        refute(result.ok);
    },

    "should give anonymous filename if not given": function () {
        var result = this.linter.check("var a = 123");
        assert.match(result.errors[0], {
            file: "anonymous"
        });
    },

    "should give multiple errors": function () {
        var result = this.linter.check("var a= 1\nvar b= 2", "myfile.js");
        assert.equals(result.errors.length, 2);
        assert.match(result.errors[0], {
            line: 1,
            col: 9,
            description: "Missing semicolon."
        });
        assert.match(result.errors[1], {
            line: 2,
            col: 9,
            description: "Missing semicolon."
        });
    },

    "should handle more errors than maxErrors gracefully": function () {
        var result = this.linter.check("var a= 1\nvar b= 2", "myfile.js");
        result.errors.push(null);
        this.stub(this.linter.linter, "check").returns(result);
        result = this.linter.check("var a= 1;\nvar b= 2;", "myfile.js");
        assert.equals(result.errors.length, 3);
        assert.match(result.errors[2], { description: "Good luck" });
    },

    "should use given configuration": function () {
        var linter = lint.create({
            options: { eqeqeq: true }
        });
        var result = linter.check("var a = 1, b = 2, c = a == b;");
        assert.equals(result.errors.length, 1);
        assert.match(result.errors[0], { description: "Expected '===' and instead saw '=='." });
    },

    "should not lint excluded files": function () {
        var linter = lint.create({
            excludes: [ "jquery" ]
        });
        var result = linter.check("var a = 1", "./lib/jquery.js");
        assert(result.ok);
    }
});
