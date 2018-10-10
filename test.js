// server.js
/*
const myModule = require('./bring');
let val = myModule.hello(); // val is "Hello"   
console.log(val);
*/


var fso, ts,s;
fso = new ActiveXObject("Scripting.FileSystemObject");
f1 = fso.OpenTextFile("text.txt", 1);
s = ts.ReadLine();

console.log(s);