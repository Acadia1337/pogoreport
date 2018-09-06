var currentTime = new Date();
var currentHour = currentTime.getHours();
var currentMinute = currentTime.getMinutes();

var report = "도곡방 레이드 제보";
var reportDefault = "도곡방 레이드 제보"

var msgDetermine = ''
var msgCall = ''
var msgDetermineKor = ''
var verifyReport = 0;


function response(room, msg, sender, isGroupChat, replier, imageDB) {
    msgCall = msg;
    if (msgCall.slice(0,3)=='도리야'){
        msg = msgCall.slice(4);
        
        if(msg.includes('파이어') && msg.includes('이벤트')){
            replier.reply('9월 8일 (토요일)\n12시부터 3시까지 3시간 동안 모든 체육관의 레이드 보스가 파이어가 됩니다!')
        }

        if(msg.includes('이벤트') && !(msg.includes('파이어'))){
            replier.reply('9월 3일부터 9월 10일까지 별모래(stardust)가 3배로 주어집니다!')
        }

        if(msg.includes('커뮤니티') || msg.includes('커뮤데이')){
            replier.reply('가장 최근의 커뮤니티 데이는 9월 22일 12시부터 3시 입니다. 출현 몬스터는 치코리타 입니다.')
        }
        
        if(msg.includes('마기') && msg.includes('성공')){
            replier.reply('불대문자 아니면 2600대 괴력몬 6마리가 있는 2계정으로 클리어 가능합니다. 불대문자는 2명이 가능하긴 하나, 3명이 안정권입니다. 통상적으로 괴력 약한 계정은 4계정 이상이 필요합니다.')
        }
        
        if(msg.includes('둥지')){
            replier.reply('구의공원 쁘사이저\n구의역 1번출구 꼬마돌\n남산 깜지곰\n노들나루공원 치코리타\n노량진근린공원 이상해씨\n북서울꿈의숲 대굴레오\n석촌호수 셀러\n서울숲 니드런♂\n올림픽공원 콘치\n우이솔밭공원 알통몬\n효창공원 깨비참\n-9월 6일 기준 출처-인벤')
        }
        
        if(msg.includes('경험치') && msg.includes('알려줘')){
            replier.reply('포켓몬 포획 시 +100\nExcellent 성공 +100\nGreat 성공 +50\nNice 성공 +10\n커브볼 +10\n보너스 +100\n원샷 +50\n포켓몬 포획 실패 시 +25 ~ +125\n포켓몬 도감 등록 시 +500\n포켓몬 진화 시 +500\n2km 알 부화 시 +200\n5, 7km 알 부화 시+500\n10km 알 부화 시 +1000\n포켓스톱 터치 시 +50/+100/+250\n체육관에서 포켓몬 한 마리를 이길때마다 +100\n체육관 포켓몬에게 열매를 줄 때 + 20\n체육관 돌파 시 +150\n체육관 포토디스크 +75\n오늘의 첫 포켓스톱 +500\n오늘의 첫 포획 +500\n7일째 첫 포켓스톱 +2000\n7일째 첫 포획 +2000\n7일째 리서치 보상 +2000')
        }
        
        if(msg.includes('지역락') && msg.includes('포켓몬')){
            replier.reply('켄타로스 : 북아메리카\n마임맨 : 유럽\n캥가 : 호주\n코산호 : 적도 부근\n헤라크로스 : 중남미\n네오비트 : 북아메리카,중남미,아프리카\세비퍼 : 북아메리카,중남미,루나톤\n네오비트 : 북아메리카,중남미,아프리카\n코터스 : 인도,중동,동남아 일대\n트로피우스 : 아프리카,남유럽 일대\n시라칸: 뉴질랜드,피지')
        }
        
        if(msg.includes('명언')){
            if (msg.includes('렌토')){
                replier.reply('포고는 계정빨이다 - 렌토')
            }
            if (msg.includes('캐논')){
                replier.reply('어차피 오래 할 게임 현질은 제일 큰 단위로 하자. 빚은 미래의 내가 갚아줄 것이다. - 캐논')
            }
            if (msg.includes('부기')){
                replier.reply('부기 투나잇 - 부기')
            }
            if (msg.includes('띠꾸')){
                replier.reply('저는 띠꾸가 아니라 하입인걸요')
            }
            if (msg.includes('하입')){
                replier.reply('올해 안에는 솔로탈출 하겠죠?')
            }
            if (msg.includes('호굴')){
                replier.reply('(심각)')
            }
            if (msg.includes('구구')){
                replier.reply('구↗우↘ 비둘기야 먹자구구구구구(딱딱딱딱딱) 구우 구구구구구(딱딱딱) 구우우구우우구↗우우우우우↘(딱딱딱)마시쩡? 마시쩡!오.↗구구구구(딱딱딱딱) 구우우우우우 (헣헠) 구우우우↗우우우국물처머겅 (구우우↗으핳하핳하핳핳핳핳핳핳하하하핳핳)야!!! 구웃? 구↗구구구구구구구구구구 (으하하하핳)(어어얽!)(으헤하하핳하핳핳)(엇!) 구구구구구구(으하하핳하핳하하핳)')
            }
        }
        
        if(msg.includes('뭐하니') || msg.includes('뭐해')){
            replier.reply('트레이너분들의 말을 기다리고 있어요!')
        }

    }
    msgDetermineKor = msg;
    msgDetermine = msg;
    
    if (msgDetermine[1]==':'){
        msgDetermine = '0' + msgDetermine;
    }
    
    if (msgDetermineKor[1]=='시'){
        msgDetermineKor = '0' +msgDetermineKor;
        verifyReport = verifyReport + 1;
    }
    
    if (msgDetermineKor[2]=='시'){
        msgDetermineKor = msgDetermineKor.slice(0,2) + ':' + msgDetermineKor.slice(3);
        verifyReport = verifyReport + 1;
    }

    if (msgDetermineKor[3]==' '){
        msgDetermineKor = msgDetermineKor.slice(0,3) + msgDetermineKor.slice(4);
        verifyReport = verifyReport + 1;
    }

    if (msgDetermineKor[4]=='분'){
        msgDetermineKor = msgDetermineKor.slice(0,3) + '0' + msgDetermineKor.slice(3);
        verifyReport = verifyReport + 1;
    }
    if (msgDetermineKor[5]=='분'){
        msgDetermineKor = msgDetermineKor.slice(0,5) + msgDetermineKor.slice(6);
        verifyReport = verifyReport + 1;
    }
    
    if(msg == '테스트') {
        replier.reply('TEST');
    }

    if(msg == '제보 리셋해줘'){
        report = reportDefault;
        replier.reply("리셋되었습니다\n" + report + '\n');
    }
    
    if(msg.includes('현황')){
        currentHour = currentTime.getHours();
        currentMinute = currentTime.getMinutes();
        var currentMinuteStringCheck = currentMinute +'';
        if (currentMinuteStringCheck.length < 2){
            currentMinute = '0' + currentMinute;
        }
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
    
    if ((!isNaN(msgDetermine.slice(0,2)) && msgDetermine[2]==':') && (!isNaN(msgDetermine.slice(3,5)) && (msgDetermine.slice(-2)=='제보'))){
        if(verifyReport!==0){
            msg = msgDetermineKor;
        }
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