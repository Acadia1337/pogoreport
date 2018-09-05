var currentTime = new Date();
var currentHour = currentTime.getHours();
var currentMinute = currentTime.getMinutes();

var report = "도곡방 5성 (레지락) 레이드 제보";
var reportDefault = "도곡방 5성(레지락) 레이드 제보"

var msgDetermine = ''

function response(room, msg, sender, isGroupChat, replier, imageDB) {
    msgDetermine = msg;
    if (msgDetermine[1]==':'){
        msgDetermine = '0' + msgDetermine;
    }

    if(msg == '테스트') {
        replier.reply('TEST');
    }

    if(msg.includes('제보') && msg.includes('리셋')){
        report = reportDefault;
        replier.reply("리셋되었습니다\n" + report);
    }
    
    if(msg.includes('현황')){
        replier.reply(currentHour+':'+currentMinute+' 기준\n'+report);
    }
    
    if(msg.includes('오보')){
        msg = msg.replace('오보','');
        if (msg[0]==' '){
            msg = msg.slice(0,0) + msg.slice(1);
        }
        if (msg[msg.length-1]==' '){
            msg = msg.slice(0,msg.length-1);
        }

        if (report.includes(msg)){
            var n = report.indexOf("\n",report.indexOf(msg)-15);
            var firstHalf = report.slice(0,n);
            var secondHalf = report.slice(report.indexOf(msg) + msg.length + 1);

            replier.reply(msg + ' 제보를 삭제합니다.')
            report = firstHalf + secondHalf;
            replier.reply(report)
        }

    }

    if(msg.includes('시간만료')){
        msg = msg.replace('시간만료','');
        if (msg[0]==' '){
            msg = msg.slice(0,0) + msg.slice(1);
        }
        if (msg[msg.length-1]==' '){
            msg = msg.slice(0,msg.length-1);
        }
        
        if (report.includes(msg)){
            var n = report.indexOf("\n",report.indexOf(msg)-15);
            var firstHalf = report.slice(0,n);
            var secondHalf = report.slice(report.indexOf(msg) + msg.length + 1);

            replier.reply(msg + ' 레이드가 시간이 만료되어 제보에서 삭제합니다.')
            report = firstHalf + secondHalf;
            replier.reply(report)
        }
    }
    
    if(msg.includes('파이어') && msg.includes('이벤트')){
        replier.reply('9월 8일 (토요일)\n12시부터 3시까지 3시간 동안 모든 체육관의 레이드 보스가 파이어가 됩니다!')
    }

    if(msg.includes('이벤트') && !(msg.includes('파이어'))){
        replier.reply('9월 3일부터 9월 10일까지 별모래(stardust)가 3배로 주어집니다!')
    }

    if(msg.includes('커뮤니티') || msg.includes('커뮤데이')){
        replier.reply('가장 최근의 커뮤니티 데이는 9월 22일 12시부터 3시 입니다. 출현 몬스터는 치코리타 입니다.')
    }
    
    if ((!isNaN(msgDetermine.slice(0,2)) && msgDetermine[2]==':') && (!isNaN(msgDetermine.slice(3,5)) && (msgDetermine.slice(-2)=='제보'))){
        
        if(msg.includes('제보')){
            msg = msg.replace('제보','');


            var inputTime = msg;
            var startTime = ''
            var startMinute = 0
            var finalMinute = ''

            if (inputTime[4]==' '){
                startTime = inputTime.slice(0,4);
                if (parseInt(startTime.substr(2,2))>14){
                    startMinute = parseInt(startTime.substr(2,2)) - 15;
                    if (startMinute < 10){
                        finalMinute = '0' + startMinute;
                    } else{
                        finalMinute = startMinute;
                    }
                    startTime = (parseInt(inputTime[0])+1) + startTime.slice(1,2) + finalMinute;

                } else {
                    startMinute = parseInt(startTime.substr(2,2)) + 45;
                    finalMinute = startMinute;
                    startTime = startTime.slice(0,2) + finalMinute;

                }
            } else if (inputTime[5]==' '){
                startTime = inputTime.slice(0,5);
                if (startTime[1]!=2){
                    if (parseInt(startTime.substr(3,2))>14){
                        startMinute = parseInt(startTime.substr(3,2)) - 15;
                        if (startMinute < 10){
                            finalMinute = '0' + startMinute;
                        } else{
                            finalMinute = startMinute;
                        }
                        startTime = '1' + (parseInt(inputTime[1])+1) + startTime.slice(2,3) + finalMinute;
                    } else {
                        startMinute = parseInt(startTime.substr(3,2)) + 45;
                        finalMinute = startMinute;
                        startTime = startTime.slice(0,3) + finalMinute;

                    }

                } else {
                    if (parseInt(startTime.substr(3,2))>14){
                        startMinute = parseInt(startTime.substr(3,2)) - 15;
                        if (startMinute < 10){
                            finalMinute = '0' + startMinute;
                        } else{
                            finalMinute = startMinute;
                        }
                        startTime = '1' + startTime.slice(2,3) + finalMinute;
                    } else {
                        startMinute = parseInt(startTime.substr(3,2)) + 45;
                        finalMinute = startMinute;
                        startTime = startTime.slice(0,3) + finalMinute;

                    }
                }


            }
            var endTime = startTime;

            var startTime2 = '22';

            if (msg[2]==':'){
                startTime2 = msg.slice(0,5);
                msg = msg.slice(6);
            } else {
                startTime2 = msg.slice(0,4);
                msg = msg.slice(5);
            }


            report = (report + '\n' + startTime2 + '~' + endTime + ' ' + msg);
            replier.reply(report);
        }

    }
}