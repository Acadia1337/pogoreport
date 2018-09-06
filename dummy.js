var currentTime = new Date();
var currentHour = currentTime.getHours();
var currentMinute = currentTime.getMinutes();

var report = "도곡방 레이드 제보";
var reportDefault = "도곡방 레이드 제보";

var msgDetermine = '';
var msgCall = '';
var verifyReport = 0;

var quoteFind = {
    "구구" : {
        1 : 'ㅋㅋㅋ 이번학기 끗나고 자퇴할거에여!! - 구구',
        2 : '구↗우↘ 비둘기야 먹자구구구구구(딱딱딱딱딱) 구우 구구구구구(딱딱딱) 구우우구우우구↗우우우우우↘(딱딱딱)마시쩡? 마시쩡!오.↗구구구구(딱딱딱딱) 구우우우우우 (헣헠) 구우우우↗우우우국물처머겅 (구우우↗으핳하핳하핳핳핳핳핳핳하하하핳핳)야!!! 구웃? 구↗구구구구구구구구구구 (으하하하핳)(어어얽!)(으헤하하핳하핳핳)(엇!) 구구구구구구(으하하핳하핳하하핳)',
        3 : '치킨 쏩니다. 줄서세요 - 구구',
        4 : '엑셀 한번 맞춰보시지? ;-) - 구구',
        5 : '구구와 저는 일심동체란 말입니닷. - 피죤투',
        6 : '피존투로 참여해야징 - 구구',
        7 : '구구가 파이리를 공격하는 짤을 암만뒤졌으나 없으므로 조만간 합성할겁니다.. - 구구',
        8 : '비둘기의 은총이 함께하시길...☆ - 구구',
        9 : '피존투로 참여해야징 - 구구',
        10 : '구구효과 라고하죠\n구구의 분노에 찬 날갯짓 한번이 지구에 재앙을 가져오는..'
    },
    "렌토" : {
        1 : '호구....ㄹ - 렌토',
        2 : 'ㅋㅋ그래도 다들 포고하시는 순간만큼은 행복하셨으면 해요~ - 빛 렌 토',
        3 : '포고는 계정빨이다 - 렌토',
        4 : '속토대장정 - 렌토',
        5 : '술내이니용 - 왕왕취렌',
        6 : '술 드실래요? - 취렌',
        7 : '어니부기를 패보겠습니당!어니부기 -((◕ˇ﹏ˇ◕  - ))으으으으읏!얍! (╯°□°)╯︵ - 렌토',
        8 : '캐논님!! - 렌토',
        9 : '퍽 - 렌토',
        10 : '취하셨군요... - 안취한 렌토'
    },
    "캐논" : {
        1 : '네 제가 그런 헤비유저입니다! - 캐논 (만렙)',
        2 : '어차피 오래 할 게임 현질은 제일 큰 단위로 하자. 빚은 미래의 내가 갚아줄 것이다. - 캐논',
        3 : '술토 - 술논',
        4 : '요새는 부캐도 본캐와 똑같이 현질합니다 - 캐논',
        5 : '(아이폰6s를 자랑하며)네 사실 포고하려고 샀읍니다 - 캐논',
        6 : '엌ㅋㅋㅋㅋ - 캐논, 뼈 맞으며',
        7 : '저는아무것도아닌유저인데.. - 캐논 (만렙, 부캐도 곧 만렙)  ',
        8 : 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ예??????? - 캐논, 팩트를 맞으며',
        9 : '부캐는 022고.. 본캐는 정확히는 020입니다 - 캐논',
        10 : '아 저 치코리타 cp표는 진짜 안만들겁니다 아무도 안보실듯... - 캐논, 엑셀 시트를 켜며'
    },
    "부기" : {
        1 : '얼른 따라잡겠습니다! - 부기 (남들보다 2주 일찍 개강)',
        2 : '저도 패겠습니다ㅎㅎ - 부기',
        3 : '부기 투나잇! - 부기',
        4 : '취하지 않았습니다! - 새벽부기',
        5 : '놀토...그런게 있었다고만 알고 있어요~ ^~^ - 부기 (놀토세대)',
        6 : '렌토님! - 부기',
        7 : '띠꾸혀어어어엉 - 부기',
        8 : '렌토계정은 빛-계정이다. - 부기',
        9 : '포고는 끈기다 - 부기',
        10 : '렌토잡는 부기! - 폭행부기'
    }
};
var nestDict = "<9.6~9.19 둥지 정보>\n\n가산디지털단지 디폴리스 : 암나이트(소)\n국과수사거리 오솔길공원 : 쥬쥬\n난지천공원 : 잉어킹\n난지한강공원 : 네이티\n당산공원 : 나옹\n도림천공원 : 피카츄\n망원한강공원 : 블루\n문래공원 : 블루(소)\n보라매공원 : 갈모매\n상암가온공원 : 고라파덕(소)\n서서울호수공원 : 해골몽\n석촌호수 : 코일\n신도림푸르지오공원 : 왕자리(소)\n양재시민의숲 : 마그마\n양재 근린공원(언남고) : 꼬부기\n양재 더케이호텔 옆 공원 : 소곤룡\n양재 앨리스파크 : 볼비트\n양재 영동 2~3교 사이 : 블루\n어린이대공원 : 코코파스\n여의도공원 : 나옹\n여의도한강공원 : 파이리\n영등포공원 : 가재군\n올림픽공원 : 콘치\n올림픽공원 체조경기장 : 꼬부기\n우이솔밭근린공원 : 알통몬\n월드컵경기장 : 나옹\n일산호수공원: 슬리프\n평화의공원 : 쥬쥬\n푸른수목원: 푸린\n효창공원 : 깨비참";

var raidBossDict = {
    
    "프리져" : "LV15 : 1257\nLV20 : 1676\nLV25 : 2095",
    "썬더" : "LV15 : 1427\nLV20 : 1902",
    "파이어" : "LV15 : 1402\nLV20 : 1870\nLV25 : 2337",
    "뮤츠" : "LV20 : 2275\nLV25 : 2844",
    "뮤" : "LV15 : 1324",
    
    "라이코" : "LV15 : 1435\nLV20 : 1913",
    "앤테이" : "LV15 : 1447\nLV20 : 1930",
    "스이쿤" : "LV15 : 1210\nLV20 : 1613",
    
    "칠색조" : "LV20 : 2222\nLV25 : 2778",
    "루기아" : "LV20 : 2056\nLV25 : 2570",
    "세레비" : "LV15 : 1324",
    
    "레지락" : "LV20 : 1764\nLV25 : 2205",
    "레지아이스" : "LV20 : 1764\nLV25 : 2205",
    "레지스틸" : "LV20 : 1292\nLV25 : 1615",
    
    "라티오스" : "LV20 : 2082\nLV25 : 2603",
    "라티아스" : "LV20 : 1929\nLV25 : 2412",
    
    "그란돈" : "LV20 : 2328\nLV25 : 2910",
    "가이오가" : "LV20 : 2328\nLV25 : 2910",
    "레쿠자" : "LV20 : 2083\nLV25 : 2604"
};

function raidReport(msgTwo) {
    currentTime = new Date();
    var splitMessage = msgTwo.split(' ');
    var dummySplit=msgTwo.split(' ');

    var msgTime = '';
    var msgTime2;
    var msgHour;
    var msgMin;
    var endHour;
    var endMin;
    var raidTime;
    var raidSentence;

    var i;

    for (i=0; i<splitMessage.length; i++){
        if (splitMessage[i].includes("제보")){
            splitMessage.splice(i,1);
        }
    }


    for (i=0; i<splitMessage.length; i++){
        if (splitMessage[i].includes("시") && (splitMessage[i].slice(-1)!='시')){
            msgTime = splitMessage[i];
            var twoCheck = 0;
            if (msgTime.slice(-1)=='분'){
                msgTime = msgTime.replace('분','');
                twoCheck++;
            }
            msgTime = msgTime.replace('시',':');
            if (twoCheck!=0){
                splitMessage.splice(i,1)
            } else if(twoCheck==0){
                splitMessage.splice(i,1);
            }
            splitMessage.push(msgTime);
        } else if (splitMessage[i].includes("시") && !(splitMessage[i].includes("분"))){
            splitMessage.push(msgTime);
            msgTime=splitMessage[i]+splitMessage[i+1];
            msgTime = msgTime.replace('시',':');
            msgTime = msgTime.replace('분','');
            splitMessage.splice(i,2);
            splitMessage.push(msgTime);
        } else if(splitMessage[i].includes(":")){
            msgTime=splitMessage[i]
            splitMessage.splice(i,1);
            splitMessage.push(msgTime);
        }
    }

    msgTime2 = splitMessage.splice(-1)[0];
    msgHour = msgTime2.slice(0,msgTime.indexOf(':'));
    msgMin = msgTime2.slice(msgTime.indexOf(':')+1,5)

    if (msgHour > 12){
        msgHour = parseInt(msgHour) - 12;
    }

    if (msgHour == 12){ // 12시
        if (msgMin > 14){ // 12시15분 ~ 59분
            endHour = 1;
            endMin = parseInt(msgMin)-15;
            if (endMin<10){
                endMin = '0' + endMin;
            }
        } else if (msgMin < 15){
            endHour = msgHour;
            endMin = parseInt(msgMin)+45;
        }
    } else {
        if (msgMin > 14){
            endHour = parseInt(msgHour) + 1;
            endMin = parseInt(msgMin)-15;
            if (endMin<10){
                endMin = '0' + endMin;
            }
        } else if (msgMin < 15){
            endHour = msgHour;
            endMin = parseInt(msgMin)+45;
        }
    }
    if (parseInt(msgMin) < 10){
        msgMin = '0' + parseInt(msgMin);
    }

    raidTime = msgHour+':'+msgMin+'~'+endHour+':'+endMin;
    raidSentence = raidTime + ' ' + splitMessage.splice(0);
    raidSentence = raidSentence.replace(',',' ');
    raidSentence = raidSentence.replace(',',' ');

    return raidSentence;
}

function response(room, msg, sender, isGroupChat, replier, imageDB) {
    msgCall = msg;
    
    if (msgCall.slice(0,3)=='도리야'){
        msg = msg.replace('도리야','도리')
    }
    msgCall = msg;

    if (msgCall.slice(0,2)=='도리'){
        msg = msgCall.slice(3);

        if(msg == '레쿠자 100% 개체가 뭐야?'){
            replier.reply('그건 렌토님한테 물어보세요')
        }
        if(msg == '칠색조 100% 개체가 뭐야?'){
            replier.reply('그건 파이리님한테 물어보세요')
        }
        if(msg == '가이오가 100% 개체가 뭐야?'){
            replier.reply('그건 캐논님한테 물어보세요')
        }
        
        if(msg.includes('백개체')){
            msg = msg.slice(0,msg.indexOf('백개체')-1)
            replier.reply(msg + ' 100% 개체 CP\n' + raidBossDict[msg])
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
        
        if(msg.includes('마기') && msg.includes('성공')){
            replier.reply('불대문자 아니면 2600대 괴력몬 6마리가 있는 2계정으로 클리어 가능합니다. 불대문자는 2명이 가능하긴 하나, 3명이 안정권입니다. 통상적으로 괴력 약한 계정은 4계정 이상이 필요합니다.')
        }
        
        if(msg.includes('둥지')){
            replier.reply(nestDict)
        }
        
        if(msg.includes('경험치') && msg.includes('알려줘')){
            replier.reply('포켓몬 포획 시 +100\nExcellent 성공 +100\nGreat 성공 +50\nNice 성공 +10\n커브볼 +10\n보너스 +100\n원샷 +50\n포켓몬 포획 실패 시 +25 ~ +125\n포켓몬 도감 등록 시 +500\n포켓몬 진화 시 +500\n2km 알 부화 시 +200\n5, 7km 알 부화 시+500\n10km 알 부화 시 +1000\n포켓스톱 터치 시 +50/+100/+250\n체육관에서 포켓몬 한 마리를 이길때마다 +100\n체육관 포켓몬에게 열매를 줄 때 + 20\n체육관 돌파 시 +150\n체육관 포토디스크 +75\n오늘의 첫 포켓스톱 +500\n오늘의 첫 포획 +500\n7일째 첫 포켓스톱 +2000\n7일째 첫 포획 +2000\n7일째 리서치 보상 +2000')
        }
        
        if(msg.includes('지역락') && msg.includes('포켓몬')){
            replier.reply('켄타로스 : 북아메리카\n마임맨 : 유럽\n캥가 : 호주\n코산호 : 적도 부근\n헤라크로스 : 중남미\n네오비트 : 북아메리카,중남미,아프리카\세비퍼 : 북아메리카,중남미,루나톤\n네오비트 : 북아메리카,중남미,아프리카\n코터스 : 인도,중동,동남아 일대\n트로피우스 : 아프리카,남유럽 일대\n시라칸: 뉴질랜드,피지')
        }
        
        if(msg.includes('이브이') && msg.includes('진화')){
            replier.reply('이브이 진화는 샤미드/부스터/쥬피썬더 세개 중 랜덤으로 이루어지며, 에브이와 블래키는 각각 10km를 걷고 파트너 지정한 상태에서 파트너 화면을 통하여 낮과 밤에 진화를 시킬 수 있습니다. \n\n또한 이브이의 이름을 변경하여 1회 확정 진화 할 수 있습니다. 명칭은 아래와 같습니다.\n샤미드 : Rainder\n부스터 : Pyro\n쥬피썬더 : Sparky\n에브이 : Sakura\n블래키 : Tamao')
        }
        
        if(msg.includes('팀') && msg.includes('평가')){
            if(msg.includes('발러')){
                replier.reply('발러 리더 칸델라의 평가 대사\n\nIV 총합\n82~100% 말할 게 없어. 아주 든든하겠어!\n67~80% 아주 강해. 자랑해도 되겠어!\n51~64% 보통의 강함이라고 생각해!\n0~49% 배틀이 적성은 아니지만 난 좋아해.\n\n가장 높은 IV\n15 최고야! 가슴이 뜨거워져!\n13~14 훌륭해! 두근거려!\n8~12 꽤 강하네. 배틀에서 활약할 것 같아!\n0~7 그럭저럭 강한거네.')
            }
            if(msg.includes('미스틱')){
                replier.reply('미스틱 리더 블랑쉬의 평가 대사\n\nIV 총합\n82~100% 경이롭고 예술적이야!\n67~80% 시선을 끄는 뭔가가 있어\n51~64% 보통 이상이야.\n0~49% 좀처럼 활약이 어려워보인다.\n\n가장 높은 IV\n15 측정할 수 없을 정도로 높아! 최고야!\n13~14 훌륭해. 놀라워.\n8~12 꽤 강하다고 말할 수 있군.\n0~7 그럭저럭이라고 말할 수 있군.')
            }
            if(msg.includes('인스')){
                replier.reply('인스팅트 리더 스파크의 평가 대사\n\nIV 총합\n82~100% 전체적으로 톱 레벨이야!\n67~80% 전체적으로 아주 강해!\n51~64% 전체적으로 보통이야.\n0~49% 전체적으로 그저 그러네.\n\n가장 높은 IV\n15 지금까지 본 것 중에서도 최고의 부류야!\n13~14 훌륭해! 정말이야!\n8~12 꽤 강한데! 내가 보증하지!\n0~7 그럭저럭, 이야!')
            }
        }
        
        if(msg.includes('진화도구')){
            replier.reply('진화도구를 사용하여 포켓몬을 진화시킬 수 있습니다.\n\n업그레이드 : 폴리곤\n왕의 징표석 : 야돈, 슈륙챙이\n태양의 돌: 냄새꼬, 해너츠\n용의 비늘 : 시드라\n금속코트 : 롱스톤,스라크')
        }
        
        if(msg.includes('명언')){
            var quoteGo = msg.split(' ');
            var i;

            for (i=0; i<quoteGo.length;i++){
                if (!(quoteGo[i].includes('명언'))){
                    msg = quoteGo[i];
                }
            }

            var ranDict = Math.floor((Math.random() * 10) + 1);
            replier.reply(quoteFind[msg][ranDict]);            
            
            
            if (msg.includes('띠꾸')){
                replier.reply('저는 띠꾸가 아니라 하입인걸요 - 하입')
            }
            if (msg.includes('하입')){
                replier.reply('올해 안에는 솔로탈출 하겠죠?')
            }
            if (msg.includes('호굴')){
                replier.reply('(심각)')
            }
            if (msg.includes('멍내니용')){
                replier.reply('캐뼈 - 이리')
            }
            if (msg.includes('파이리')){
                replier.reply('좋은 단백질은 내가 먹은 단백질뿐이다 - 이리')
            }
            if (msg.includes('식초')){
                replier.reply('제가 바로 인싸 속초입니다 - 속초')
            }

        }
        
        if(msg.includes('뭐하니') || msg.includes('뭐해')){
            replier.reply('트레이너분들의 말을 기다리고 있어요!')
        }
        
        if(msg.includes('바보') || msg.includes('멍청이')){
            replier.reply('아니에요ㅡㅡ매일매일 진화하고 있는걸요!')
        }

        if(msg.includes('이쁜짓') || msg.includes('애교')){
            replier.reply('(심각)')
        }

    }
    msgDetermine = msg.split(' ');
    
    if(msg == '테스트') {
        replier.reply('TEST');
    }

    if(msg == '제보 리셋해줘'){
        report = reportDefault;
        replier.reply("리셋되었습니다\n" + report);
    }
    
    if(msg.includes('현황')){
        currentTime = new Date();
        currentHour = currentTime.getHours();
        currentMinute = currentTime.getMinutes();
        var currentMinuteStringCheck = currentMinute +'';
        if (currentMinuteStringCheck.length < 2){
            currentMinute = '0' + currentMinute;
        }
        replier.reply(currentHour+ ':' +currentMinute+' 기준\n'+report);
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
    
    var checkLegitReport = msg.split(' ');

    var i;
    for (i=0;i<checkLegitReport.length;i++){
        if (checkLegitReport[i].includes('제보')){
            checkLegitReport.splice(checkLegitReport.indexOf(checkLegitReport[i]),1);
            if(checkLegitReport.length < 7){
                report = report + '\n' + raidReport(msg);
                replier.reply(report);
            }
        }
    }

}