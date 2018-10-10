msg = "12:30 XXXXXX REPORT";

// 12시 30분 - 정상
// 12:30 - 정상
// 12:30분 - : + 분
// 12시30 - 시 + 분X
// 12시30분 - 스페이스바

msgSplit = msg.split(' ');


for (var i = 0; i < msgSplit.length;i++){
    console.log(msgSplit[i]);
}

if (msgSplit.includes(':')){
    console(msgSplit);
}