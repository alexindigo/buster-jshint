# buster-jshint [![Build Status](https://travis-ci.org/alexindigo/buster-jshint.svg)](https://travis-ci.org/alexindigo/buster-jshint)

Simplified version of `buster-lint` extension for [buster.js](http://busterjs.org)
to make linting with jshint your JavaScript part of the test run,
without extra stuff like watcher, plus gives you extra control on jshint options.

Does not bundle jshint, relies on npm dependency.

## Installation

Get it from npm:

    npm install buster-jshint

Then add it to your `buster.js` config file:

    config["My tests"] = {
      extensions: [ require("buster-jshint") ]
    };

## Configuration

You'll probably want to change some options. All examples here show the default
values, so while they are rather meaningless as actual configuration, they are
illustrative.

### Excluding files

To avoid linting dependencies or other nasty legacy bits, you can match
the filename either by string or regexp.

    config["My tests"] = {
      extensions: [ require("buster-jshint") ],
      "buster-jshint": {
        excludes: [ "jquery", "raphael" ] // default is [ ]
      }
    };

### Changing the rules

For jshint:

    config["My tests"] = {
      extensions: [ require("buster-jshint") ],
      "buster-jshint": {
        options: {
          // jshint options
        }
      }
    };
