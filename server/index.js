/**
 * Created by pioner on 18.07.15.
 */
var fs = require('fs'),
    path = require('path'),
    jsonfile = require('jsonfile'),
    util = require('util'),
    stringify = require('json-stringify-safe');


var structureData,
    outputData;


var structureFilename = '../structure.json',
    outputFilename = '../data.json';

function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {};
        info.path = filename;
        info.name = path.basename(filename);


    if (stats.isDirectory()) {
        info.type = "folder";
        info.children = fs.readdirSync(filename).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        info.type = "file";
        var regexp = /[/.-]min[/.-]/;

        regexp.test(filename)? info.state = "Minify" : info.state = "Develop";
    }

    return info;
}



outputData = dirTree("../source");

structureData = JSON.parse(fs.readFileSync(structureFilename,'utf8'));

createDataToRender();


//КАК ОНО ВООБЩЕ РАБОТАЕТ???? Плохо читаемый текст!!! Переработать
function createDataToRender(){
    for(var i in structureData){
        var childrenNames = structureData[i].childrenNames;
        for(var e=0; e<childrenNames.length; e++){
            var name = getSrcByName(childrenNames[e]);
            if(name){
                structureData[i].children.push(name);
            }
        }
    }
}

function getSrcByName(childrenName){
    var data = outputData.children;
    for(var k=0;  k<data.length; k++){
        if(childrenName == data[k].name){
            return data[k];
        }
    }
}

//console.log(structureData);


fs.writeFile(outputFilename, stringify(structureData, null, 4), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("JSON saved to " + outputFilename);
    }
});

