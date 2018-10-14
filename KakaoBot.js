//원작자 Dark Tornado님 - https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/%EC%95%84%EC%9D%B4%EC%B9%B4.js
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath(); //내장메모리 최상위 경로

/*상수 (객체) 선언*/
const DoriDB = {}; const preChat = {}; const lastSender = {}; const botOn = {}; const basicDB = "basic";
var currentTime = new Date(); var currentHour = currentTime.getHours(); var currentMinute = currentTime.getMinutes();

/*Pokemon 객체*/
/*
Pokemon.getDustData = function() { //전국 미세먼지 정보 가져오는 함수
    try {
        var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?query=미세먼지");
        data = data.split("미세먼지</strong>")[1].split("예측영상")[0].replace(/(<([^>]+)>)/g, "");
        data = data.split("단위")[0].trim().split("   ");
        for (var n = 0; n < data.length; n++) {
            var cc = data[n].trim().split(" ");
            data[n] = cc[0] + " : " + Utils.dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)";
        }
        var data2 = data.shift();
        data.sort();
        data.unshift(data2);
        return data.join("\n");
    } catch (e) {
        Log.debug("미세먼지 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "미세먼지 정보 불러오기 실패\n오류: " + e;
    }
};
Pokemon.dustLevel = function(value) {
    if (value <= 30) return "좋음";
    if (value <= 80) return "보통";
    if (value <= 150) return "나쁨";
    return "매우나쁨";
};
Pokemon.getTextFromWeb = function(url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        return str.toString();
    } catch (e) {
        Log.debug(e);
    }
};
*/

/*DoriDB 객체*/
DoriDB.createDir = function() { //배운 채팅들이 저장될 폴더를 만드는 함수
    var folder = new java.io.File(sdcard + "/Dori/"); //File 인스턴스 생성
    folder.mkdirs(); //폴더 생성
};
DoriDB.saveData = function(name, msg) { //파일에 내용을 저장하는 함수
    try {
        var file = new java.io.File(sdcard + "/Dori/" + name + ".txt");
        var fos = new java.io.FileOutputStream(file);
        var str = new java.lang.String(msg);
        fos.write(str.getBytes());
        fos.close();
    } catch (e) {
        Log.debug(e + ", " + e.lineNumber);
    }
};
DoriDB.readData = function(name) { //파일에 저장된 내용을 불러오는 함수
    try {
        var file = new java.io.File(sdcard + "/Dori/" + name + ".txt");
        if (!file.exists()) return null;
        var fis = new java.io.FileInputStream(file);
        var isr = new java.io.InputStreamReader(fis);
        var br = new java.io.BufferedReader(isr);
        var str = br.readLine();
        var line = "";
        while ((line = br.readLine()) != null) {
            str += "\n" + line;
        }
        fis.close();
        isr.close();
        br.close();
        return str;
    } catch (e) {
        Log.debug(e + ", " + e.lineNumber);
    }
};

/*Utils 객체 확장*/
Utils.getDustData = function() { //전국 미세먼지 정보 가져오는 함수
    try {
        //var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?query=미세먼지");
        var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?query=서울%20미세먼지");
        data = data.split("미세먼지</strong>")[1].split("예측영상")[0].replace(/(<([^>]+)>)/g, "");
        data = data.split("단위")[0].trim().split("   ");
        for (var n = 0; n < data.length; n++) {
            var cc = data[n].trim().split(" ");
            data[n] = cc[0] + " : " + Utils.dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)";
        }
        var data2 = data.shift();
        data.sort();
        data.unshift(data2);
        return data.join("\n");
    } catch (e) {
        Log.debug("미세먼지 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "미세먼지 정보 불러오기 실패\n오류: " + e;
    }
};
Utils.dustLevel = function(value) {
    if (value <= 30) return "좋음";
    if (value <= 80) return "보통";
    if (value <= 150) return "나쁨";
    return "매우나쁨";
};
Utils.getTextFromWeb = function(url) {
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        return str.toString();
    } catch (e) {
        Log.debug(e);
    }
};

DoriDB.createDir(); //폴더 생성

function timeRenew(){
    currentTime = new Date(); currentHour = currentTime.getHours(); currentMinute = currentTime.getMinutes();
}

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function raidReport(msgTwo) {
    currentTime = new Date(); var i;
    var splitMessage = msgTwo.split(' '); var dummySplit=msgTwo.split(' ');
    var msgTime = ''; var msgTime2; var msgHour; var msgMin; var endHour;
    var endMin; var raidTime; var raidSentence; var cutOutRaid; var cutCheck=0;

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
            if ((splitMessage[i+1].includes("분")) || (isInt(parseInt(splitMessage[i+1])))){
                msgTime = splitMessage[i]+splitMessage[i+1];
            } else {
                msgTime = splitMessage[i]+"0"; cutCheck=1; cutOutRaid = splitMessage[i+1];
            }
            msgTime = msgTime.replace('시',':');
            msgTime = msgTime.replace('분','');
            splitMessage.splice(i,2);
            splitMessage.push(msgTime);
        } else if(splitMessage[i].includes(":")){
            msgTime=splitMessage[i]
            if (msgTime.includes("분")){ //시간 에러나면 이 줄임
                msgTime.replace("분","");
            }
            splitMessage.splice(i,1);
            splitMessage.push(msgTime);
        }
    }

    msgTime2 = splitMessage.splice(-1)[0];
    msgHour = msgTime2.slice(0,msgTime.indexOf(':'));
    msgMin = msgTime2.slice(msgTime.indexOf(':')+1,5)

    if (!isInt(msgHour) || !isInt(msgMin)){
        return "none";
    }
    
    
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
        } else {
            endHour = msgHour;
            endMin = parseInt(msgMin) + 45;
        }
    }
    
    if (parseInt(msgMin) < 10){
        msgMin = '0' + parseInt(msgMin);
    }
    raidTime = msgHour+':'+msgMin+'~'+endHour+':'+endMin;
    raidSentence = raidTime + ' ' + splitMessage.splice(0);
    if (cutCheck!=0) {raidSentence = raidSentence + cutOutRaid;}
    raidSentence = raidSentence.replace(',',' ');
    raidSentence = raidSentence.replace(',',' ');
    return raidSentence;

    
}

function timeCheck (reportDum){
    timeRenew();
    var reportSplit = reportDum.split('\n');
    var currentMinuteFix; var currentHourFix; var endTime; var endHour; var endMinute; var i;
    var reportSplitDummy = reportSplit;
    
    if (currentMinute < 10) {currentMinuteFix = '0' + currentMinute;} else{currentMinuteFix = currentMinute;}
    if (currentHour > 12){currentHour = currentHour-12;}

    for (i=1;i<reportSplit.length;i++){
        var deleteThis=0;
        if (reportSplit[i].includes(":")){
            var temporalTimeSplit = reportSplit[i].split("~");
            var temporalTimeSplit2 = temporalTimeSplit[1];
            var temporalTimeSplit3 = temporalTimeSplit2.split(" ");
            endTime = temporalTimeSplit3[0];
            var temporalTimeSplit4 = endTime.split(":");
            endHour = parseInt(temporalTimeSplit4[0]);
            endMinute = parseInt(temporalTimeSplit4[1]);
            endTime = endHour + '' + temporalTimeSplit4[1];

            if (endHour==currentHour && endMinute<currentMinute){
                deleteThis = reportSplit[i];
                reportSplitDummy.splice(reportSplitDummy.indexOf(deleteThis),1);
            } else if (endHour==1 && currentHour==12){
                deleteThis = reportSplit[i]; //but it doesnt get deleted
            } else if (endHour==12 && currentHour==1) {//12:59 1:00
                deleteThis = reportSplit[i];
                reportSplitDummy.splice(reportSplitDummy.indexOf(deleteThis),1);
            } else if ((endHour < currentHour) && (currentHour!=12)) {
                deleteThis = reportSplit[i];
                reportSplitDummy.splice(reportSplitDummy.indexOf(deleteThis),1);
            }
        }
    }

    reportDum = reportSplitDummy[0];

    for (i=1;i<reportSplitDummy.length;i++){
        reportDum = reportDum + '\n' + reportSplitDummy[i];
    }

    return (reportDum)
}

function keyToText (textKey, dbName){
    var dbToUse = DoriDB.readData(dbName);
    if (textKey == null){
        return DoriDB.readData(dbName);
    } else {
        var keyNumber;
        var divideCategory = dbToUse.split("\n"); //첫 줄 빼기용
        var keySelect = divideCategory[0].split(",");
        if (divideCategory[0].includes(textKey)){
            keyNumber = keySelect.indexOf(textKey);
        } else {return "그런 단어는 제 사전에 없는 것 같아요!"}
        dbToUse = divideCategory[keyNumber];
        var divideTalk = dbToUse.split(","); //줄에서 쓸말을 각각 나눔
        var randTextNum = Math.floor((Math.random() * (divideTalk.length - 1)))+1;
        if (textKey == divideTalk[0]){
            return divideTalk[randTextNum]
        } else {return "something went wrong"}
    }

}

function reportDelete (raidInfo, delReport){
    if (raidInfo.includes(delReport)){
        var i; var reportSplit = raidInfo.split('\n');
        for (i=0;i<reportSplit.length;i++){
            if(reportSplit[i].includes(delReport)){
                reportSplit.splice(i,1)
                var j;
                raidInfo = reportSplit[0];
                for (j=1;j<reportSplit.length;j++){
                    raidInfo = raidInfo + '\n' + reportSplit[j];
                }
                raidInfo.replace('\n','')
                break;
            }
        }
    }
    return raidInfo;
}

function quoteRegister (personName, newQuote){
    var quoteInfo = DoriDB.readData("quote");
    var keyNumber; var quoteToUse;
    var divideCategory = quoteInfo.split("\n"); //첫 줄 빼기용
    var keySelect = divideCategory[0].split(",");
    if (divideCategory[0].includes(personName)){ //이미 명언에 사람이 등록되어있다면
        keyNumber = keySelect.indexOf(personName);
        divideCategory[keyNumber] = divideCategory[keyNumber] + "," + newQuote;
    } else { // 등록되어있지 않다면 새로 등록
        keySelect = keySelect + "," + personName;
        quoteInfo = quoteInfo + "\n" + personName;
        divideCategory.push(personName + "," + newQuote);
    }
    var newQuoteInfo = keySelect;
    for (var i=1; i<divideCategory.length; i++){
        newQuoteInfo = newQuoteInfo + "\n" + divideCategory[i];
    }
    newQuoteInfo = newQuoteInfo.trim();
    DoriDB.saveData("quote", newQuoteInfo);
    return personName + "님의 명언이 등록되었습니다.";
}

function raidReportReturn (dbName, newReport, delReport){
    var nonReport = 1;
    if (dbName.includes("eport")){nonReport = 0;}
    var raidInfo = DoriDB.readData(dbName);
    if (nonReport==0){
        raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo);
    }
    if (newReport != null) {
        DoriDB.saveData(dbName, raidInfo + "\n" + newReport); //제보 등록
    }
    raidInfo = DoriDB.readData(dbName);
    if (delReport == "DELETE ALL"){
        if (nonReport==0){
            DoriDB.saveData(dbName, "레이드 제보"); //제보 리셋
        } else {
            DoriDB.saveData(dbName, "리서치 목록"); //제보 리셋
        }
        raidInfo = "제보가 리셋되었습니다."
    } else if(delReport != null){
        raidInfo = reportDelete(raidInfo,delReport);
        DoriDB.saveData(dbName, raidInfo); //삭제된 리스트 새로 등록
    }
    if (nonReport==0){raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo);}
    return raidInfo;
}

function procCmd(room, cmd, sender, replier) {
    if (cmd == "/on") { //봇을 켜는 명령어는 꺼진 상태에서도 작동
        replier.reply("도리 활성화");
        botOn[room] = true;
    }
    if (botOn[room] == false) { //봇이 꺼진 경우 작동 X
        return;
    }
    if (cmd == "/off") {
        replier.reply("도리 비활성화");
        botOn[room] = false;
    }
}

function response(room, msg, sender, isGroupChat, replier) {
    if (msg == "이건 테스트야"){replier.reply("테스트테스트");}
    msg = msg.trim();sender = sender.trim();room = room.trim();preChat[room] = msg;
    procCmd(room, msg, sender, replier); //명령어

    if (botOn[room] == undefined) {botOn[room] = true;} // 해당 채팅방의 on/off 여부가 결정되어있지 않으면 on으로 설정
    if (botOn[room] == false) {return;} // 봇이 꺼져있으면 응답 안함

    var noReply = [".", "사진", "동영상", "음성메시지", "카카오톡 프로필", "(이모티콘)", "카카오링크 이미지"]; // 반응 안함
    for (var n = 0; n < noReply.length; n++) {if (msg == noReply[n]) return;}
    
    if (["도리", "도리야", "도리야!", "도리야아", "Dori"].indexOf(msg) != -1) { //도리에 반응
        switch (Math.floor(Math.random() * 7)) {
            case 0:
            case 1:
            case 2:
                replier.reply("네! 무슨 일이신가요?");
                break;
            case 3:
            case 4:
            case 5:
                replier.reply("네! 부르셨나요!?");
                break;
            case 6:
                replier.reply("왜?");
                break;
        }
    }
    lastSender[room] = sender;
    
    //이 아래부터는 기본 정보 주는 곳
    var returnText = "none"; //마지막 답장
    var useReport = "report"; var useResearch = 'research';
    if (room.includes("고려대학교")){useReport = "korReport"; useResearch = "korResearch"}
    
    if (msg.includes("도리")){ // 도리야 _____ 명령어
        msg = msg.replace("도리야",""); msg = msg.replace("도리",""); msg = msg.trim(); //문장에서 도리 제거
        if (msg.includes("띠꾸") && Math.floor(Math.random() * 3) != 0) {
            replier.reply("띠꾸혀엉");
            if (Math.floor(Math.random() * 3) == 0) {
                java.lang.Thread.sleep(1500); //딜레이
                replier.reply("띠꾸혀어엉");
            }
        }
        
        if (msg == "사용법"){
            returnText = keyToText(null,"doriguide");
        } else if (msg.includes("둥지")){
            returnText = keyToText(null,"nest")
        } else if ((msg.includes('이벤트')) || (msg.includes('글로벌 챌린지'))) {
            returnText = keyToText(null,"event");
        } else if(msg.includes('커뮤니티') || msg.includes('커뮤데이')){
            returnText = keyToText(null,"community");
        } else if(msg.includes('성공') && msg.includes('조건')){
            msg = msg.replace('성공'); msg = msg.replace('조건'); msg = msg.trim();
            returnText = keyToText(msg,"raidGuide");
        } else if(msg.includes('아이템') && msg.includes('확률')){
            returnText = keyToText(null,"item");
        } else if(msg.includes('경험치') && msg.includes('알려줘')){
            returnText = keyToText(null,"experience");
        } else if(msg.includes('지역락') && msg.includes('포켓몬')){
            returnText = keyToText(null,"regionLock");
        }
        
        if(msg.includes('평가')){
            if(msg.includes('발러')){
                returnText = keyToText(null,"valorAppraise");
            }
            if(msg.includes('미스틱')){
               returnText = keyToText(null,"mysticAppraise");
            }
            if(msg.includes('인스')){
                returnText = keyToText(null,"instinctAppraise");
            }
        }
        if (msg.includes("미세먼지")) {
            returnText = "[미세먼지 정보]\n" + Utils.getDustData();
        }
        if (msg.includes("주사위")) {
            var icon = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
            returnText = icon[Math.floor(Math.random() * 6)];
        }

        
        if (msg.includes('잘자') || msg.includes('굿밤') || msg.includes('굿나잇') || msg.includes('좋은밤') || msg.includes('좋은 밤')){
            returnText = keyToText("GOODBYE","hello");
        } else if (msg.includes('좋은 아침') || msg.includes('굿모닝') || msg.includes('좋은아침') || msg.includes('잘잤어?')){
            returnText = keyToText("GOODMORNING","hello");
        } else if (msg.includes('잘했어') || msg.includes('최고') || msg.includes('짱') || msg.includes('수고') || msg.includes('고마')){
            returnText = keyToText("GOODJOB","hello");
        }
        
        if (msg.includes('아침')){returnText = keyToText("BREAKFAST","food");
        } else if (msg.includes('점심')){returnText = keyToText("LUNCH","food");
        } else if (msg.includes('저녁')){returnText = keyToText("DINNER","food");
        } else if (msg.includes('간식')){returnText = keyToText("SNACK","food");
        } else if (msg.includes('야식')){returnText = keyToText("LATENIGHT","food");
        } else if (msg.includes('술') || msg.includes('안주')){returnText = keyToText("ALCOHOL","food");
        } else if (msg.includes('밥')){returnText = keyToText("FOOD","food");
        } 
        
        if (msg.includes('명언등록') || msg.includes('명언 등록')){
            msg = msg.replace('명언등록',''); msg = msg.replace('명언 등록',''); msg = msg.trim();
            msg = msg.split(" ");
            var quoteName = msg[0]; var quoteQuote = "";
            for (var i=1; i < msg.length; i++ ) {
                quoteQuote = quoteQuote + " " + msg[i];
            }
            quoteQuote = quoteQuote.trim();
            returnText = quoteRegister(quoteName, quoteQuote);
            msg = "none";
        } else if (msg.includes('명언')){
            msg = msg.replace('명언',''); msg = msg.trim();
            returnText = keyToText(msg,"quote");
        }
        
        if((msg.includes('비밀번호') || (msg.includes('비번'))) && room.includes("도곡")){returnText = "현재 도곡방 입장 비밀번호는 2018이에요! 가끔 새로 바뀐답니다!";} else if(room.includes("고려대학교")){
            returnText = "방 번호는 그렇게 쉽게 알려줄 수 없지 후후";
        }
        if (msg.includes("트레이너") && msg.includes("코드")){
            if (room.includes("도곡")){
                returnText = "도곡방 트레이너코드 : https://goo.gl/z7ib37\n\n친구 필요하시면 방장님꺼 등록하세요!!\n하입 부캐 : 0293 2668 5480\n하입 부부캐 : 1255 9840 5201";
            } else if (room.includes("고려대")){returnText = "고대방 트레이너코드 : https://goo.gl/dHSwSW";}
        }
        if(msg.includes('뭐하니') || msg.includes('뭐해')){returnText = '트레이너분들의 말을 기다리고 있어요!';}
        if(msg.includes('바보') || msg.includes('멍청이')){returnText = '아니에요ㅡㅡ매일매일 진화하고 있는걸요!';}
        if(msg.includes('이쁜짓') || msg.includes('애교')){returnText = '(심각)';}
        if(msg.includes('안녕')){
            var nowHour = currentTime.getHours();
            if (nowHour > 11 && nowHour < 18){
                returnText = "네 안녕하세요 트레이너님! 오늘도 좋은 하루 되세요😊😊😊";
            } else if (nowHour > 17 && nowHour < 20) {
                returnText = "네 트레이너님! 좋은 저녁이에요ㅎㅎ 저녁 맛있게 드세요~!😋😋😋";
            } else if (nowHour > 19 || nowHour < 2){
                returnText = "네 트레이너님! 좋은 밤 되세요~!!😴😴😴";
            } else if (nowHour > 1 && nowHour < 5){
                returnText = "헉 트레이너님! 안주무세요!?!? 어서 주무세요!!😱😱😱";
            } else if (nowHour < 11){
                returnText = "안녕하세요 트레이너님! 좋은 아침이에요😊😊😊";
            } else {
                returnText = "안녕하세요 트레이너님!☺️";
            }
        }

    } else {
        msg = msg.replace("도리야",""); msg = msg.replace("도리",""); msg = msg.trim()
    }
    //제보/삭제/만료/현황 구현 완료. 리서치 구현 나름 함 (테스트 X)
    if (msg.includes("현황")){
        returnText = raidReportReturn(useReport, null, null);
    } else if(msg.includes("리서치 목록")){
        returnText = raidReportReturn(useResearch, null, null);
        msg = "끝났어!";
    } else if (msg == "제보 리셋" || msg == "제보 리셋해줘"){
        returnText = raidReportReturn(useReport, null, "DELETE ALL");
    } else if (msg =="리서치 리셋" || msg == "리서치 리셋해줘"){
        returnText = raidReportReturn(useResearch, null, "DELETE ALL");
    } else if ((msg.includes('삭제') || msg.includes('오보') || msg.includes("끝났어") || msg.includes("만료")) && !msg.includes("리서치")){
        msg = msg.replace('시간만료',''); msg = msg.replace('끝났어',''); msg = msg.replace('만료','');
        msg = msg.replace('삭제해줘',''); msg = msg.replace('삭제',''); msg = msg.replace('오보',''); msg = msg.trim();
        returnText = raidReportReturn(useReport,null,msg);
        replier.reply(msg + " 제보가 삭제 되었습니다.");        
    } else if ((msg.includes("리서치") && (msg.includes("삭제") || msg.includes("제거")))){
        msg = msg.replace('끝났어',''); msg = msg.replace('삭제해줘',''); msg = msg.replace('삭제','');
        msg = msg.replace('오보',''); msg = msg.trim();
        returnText = raidReportReturn(useResearch,null,msg);
    }

    if ((msg.includes("시") || msg.includes(":")) && msg.includes("제보") && !msg.includes("리서치")){        
        returnText = raidReportReturn(useReport, raidReport(msg), null);
    } else if (msg.includes("리서치") && msg.includes("제보")){
        msg = msg.replace("제보", ""); msg = msg.replace("리서치",""); msg = msg.trim();
        returnText = raidReportReturn(useResearch, msg, null);
    }
    
    if (returnText != "none"){replier.reply(returnText);}
}
