var str = '도곡방 5성 (레지락) 레이드 제보\n10:00~10:45 군인공제회관\n9:45~12:30 작은분수 \n2:30~3:15 사과';




var msg = '작은분수';


if (msg[0]==' '){
    msg = msg.slice(0,0) + msg.slice(1,);
    console.log(msg);
}


if (msg[msg.length-1]==' '){
    msg = msg.slice(0,msg.length-1);
    console.log(msg);
}


/*
var firstHalf = str.slice(0,str.indexOf(msg)-12);
var secondHalf = str.slice(str.indexOf(msg) + msg.length + 1);


console.log(firstHalf + secondHalf);
*/

var n = str.indexOf("\n",str.indexOf(msg)-15);

var firstHalf = str.slice(0,n);
var secondHalf = str.slice(str.indexOf(msg) + msg.length + 1);


console.log(firstHalf+secondHalf);
