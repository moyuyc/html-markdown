#!/usr/bin/env node

/**
 * Created by moyu on 2017/2/6.
 */

var argv = require('minimist')(process.argv.slice(2));

var html2mdFromString = require('./lib').html2mdFromString
var html2mdFromURL = require('./lib').html2mdFromURL
var html2mdFromPath = require('./lib').html2mdFromPath


var default_opts = {
    selector: argv.s || argv.selector,
    eval: argv.e || argv.eval,
    help: !!argv.h || !!argv.help,
    version: !!argv.v || !!argv.version
}

var options = Object.assign(default_opts, argv);
if (options.help) {
    console.log("Usage: html2md [-e html] [-s dom selector] url/path");
    console.log('');
    console.log('Options:');
    console.log('');
    console.log('  -v --version                get current version');
    console.log('  -h --help                   how to use it');
    console.log('  -e --eval      <html>       html to markdown from argument');
    console.log('  -s --selector  <selector>   valid when not --eval');
    console.log('');
    return;
}

if (options.version) {
    console.log(require('./package.json').version);
    return;
}

if (options._.length === 0 && !options.eval) {
    console.error("Usage: html2md [-e html] [-s dom selector of url] url/path");
}

if (options.eval) {
    html2mdFromString(options.eval, true);
} else {
    options._.forEach(function (path_url) {
        var urlObj = require('url').parse(path_url); // slashes
        ( urlObj.slashes ? html2mdFromURL(path_url, options.selector, false) : html2mdFromPath(path_url, options.selector, false) )
        .then(console.log)
        .catch(function (err) {
            console.error(err);
            process.exit(1);
        })
    })
}





