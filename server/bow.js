/**
 * Created by pioner on 25.07.15.
 */
var bower = require('bower');

var settings ={
    jquery:"1.8.1"
}

bower.commands
    .install(['bootstrap'], { "save-exact": true}, {
        "directory": "../new/"+"jquery"+"/"+settings.jquery,
        "ignore": [
            "src",
            "source",
            "spec",
            ".bowerrc",
            ".gitignore",
            ".jshintignore",
            ".jshintrc",
            "bower.json",
            "gruntfile.js",
            "package.json",
            "README.md"
        ],
    }
)
    .on('end', function (installed) {
        console.log(installed);
    });