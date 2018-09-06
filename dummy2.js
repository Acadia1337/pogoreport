var msg = '12시 27분 사과 제보'
var msgDetermineKor = ''

msgDetermineKor = msg;
if (msgDetermineKor[1]=='시'){
    msgDetermineKor = '0' +msgDetermineKor;
}

if (msgDetermineKor[2]=='시'){
    msgDetermineKor = msgDetermineKor.slice(0,2) + ':' + msgDetermineKor.slice(3);
}

if (msgDetermineKor[3]==' '){
    msgDetermineKor = msgDetermineKor.slice(0,3) + msgDetermineKor.slice(4);
}

if (msgDetermineKor[4]=='분'){
    msgDetermineKor = msgDetermineKor.slice(0,3) + '0' + msgDetermineKor.slice(3);
}
if (msgDetermineKor[5]=='분'){
    msgDetermineKor = msgDetermineKor.slice(0,5) + msgDetermineKor.slice(6);
}


msg = msgDetermineKor;
console.log(msgDetermineKor)

