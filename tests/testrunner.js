// phantom.casperPath = '../bower_components/phantomcss/CasperJs';
// phantom.injectJs(phantom.casperPath + '/bin/bootstrap.js');

// var casper = require("casper").create({
//         verbose: true,
//         viewportSize: {
//             width: 1024,
//             height: 760
//         }
//     }),
var fs = require('fs');
var server = require('webserver').create();
// var phantomcss = require('phantomcss');
var port = 3128;
var host = 'http://localhost:' + port + '/';
var files = fs.list('./').filter(function(file, i) {
    return file.match(/\.html$/);
});
var i = 0;

// phantomcss.init({
//     libraryRoot: '../node_modules/phantomcss',
//     screenshotRoot: './screenshots',
//     failedComparisonsRoot: './failures',
//     fileNameGetter: function(root, filename) {
//         var name = root + fs.separator + filename;

//         if (fs.isFile(name + '.png')) {
//             return name + '.diff.png';
//         } else {
//             return name + '.png';
//         }
//     }
// });

server.listen(port, function(request, response) {
    var base = '../',
        path = request.url,
        file;

    if (path.match(/\.html$/)) {
        file = fs.read('./' + path.replace(/^\//, ''));
    } else {
        file = fs.read(base + path);
    }

    response.statusCode = 200;
    response.write(file);
    response.close();
});

function capture(file) {
    this.start(host + file).then(function() {
        phantomcss.screenshot('body', file.replace(/\.html$/, ''));
    });
}

function main() {
    if (files[i]) {
        this.echo('Capturing ' + files[i]);
        capture.call(this, files[i]);
        i++;
        this.run(main);
    } else {
        this.then(function() {
            phantomcss.compareAll();
        });

        this.run(function() {
            this.exit(phantomcss.getExitStatus());
        });
    }
}

casper.start().then(function() {
    // empty step just so casper won't abort
});

casper.run(main);