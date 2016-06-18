'use strict';
const fs = require('fs');
module.exports = function (gameServer, args) {
var walkSync = function(dir, filelist) {

  if( dir[dir.length-1] != '/') dir=dir.concat('/')

  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      filelist.push(dir+file);
    }
  });
  return filelist;
};
var result = [];
var files = walkSync("./");

for (var i in files) {
if (files[i].indexOf("/node_modules/") != -1 || files[i].indexOf("/plugins/") != -1) continue;
  var file = fs.readFileSync(files[i],"utf8");
var startindex = 0;
for (;1==1;) {
 var index = file.indexOf("console.log(\"", startindex) + 12;
var ind = file.indexOf(");", index);
if (index == 11 || ind == -1) break;
startindex = ind;
var tx = file.substr(index, ind - index);
var split = tx.split("\n");
if (!split[1]) result.push(tx);
}
}
var final = "";
for (var i in result) {
  final = final + result[i] + "\n";
}
fs.writeFileSync("console.txt",final);
}
