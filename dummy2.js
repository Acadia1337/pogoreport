


var msg = '제보 리셋'


console.log(msg.slice(0,2));

if(msg.includes('제보') && !(msg.includes('리셋'))){
    console.log("11111")
} else {
    console.log('22222')
}



        if (msg[2]==':'){
            // startTime2 = msg.slice(0,5);
            //startTime2 = '22';
            msg = msg.slice(6,);
        } else {
            startTime2 = msg.slice(0,4);
            msg = msg.slice(5,);
        }
        
        
        report = (report + '\n' + startTime2 + '~' + endTime + ' ' + msg);