msg = '사과'

if (msg[0]==' '){
    msg = msg.slice(0,0) + msg.slice(1);
}


if (msg[msg.length-1]==' '){
    msg = msg.slice(0,msg.length-1);
}

var n = str.indexOf("\n",str.indexOf(msg)-15);
var firstHalf = str.slice(0,n);
var secondHalf = str.slice(str.indexOf(msg) + msg.length + 1);

console.log(firstHalf+secondHalf);