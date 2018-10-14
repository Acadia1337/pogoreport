//원작자 Dark Tornado님 - https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/%EC%95%84%EC%9D%B4%EC%B9%B4.js
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath(); //내장메모리 최상위 경로

/*상수 (객체) 선언*/
const Pokemon = {}; const DoriDB = {}; const preChat = {}; const lastSender = {}; const botOn = {}; const basicDB = "basic";
var currentTime = new Date(); var currentHour = currentTime.getHours(); var currentMinute = currentTime.getMinutes();

/*Pokemon 객체*/
Pokemon.checkWord = function(que, msg) { //적당히 비슷한 말인지 비교
    var data = msg.split(" "); //수신된 채팅의 어절들 중
    var flag = false;
    if (Math.floor(Math.random() * 2) == 0) flag = true; //50% 확률로 이미 한 개가 포함되어 있다고 가정
    for (var n = 0; n < data.length; n++) { //두 개 이상이 저장된 채팅들에 포함되어 있다면,
        if (que.indexOf(data[n]) != -1) {
            if (flag) return true; //대강 비슷하다고 판단
            else flag = true;
        }
    }
    return false; //아님 말고
};
Pokemon.getReply = function(basicDB, msg) { //수신된 채팅에 대한 적당한 답변 반환
    var data = DoriDB.readData(basicDB); //저장된 채팅들을 불러옴
    if (data != null && Math.floor(Math.random() * 20) == 0) { //저장된 채팅이 없거나, 5% 확률이 터진게 아니면, 작동 안함
        data = data.split("\n"); //냥
        var result = []; //비슷한 말들이 들어갈 배열
        for (var n = 0; n < data.length - 1; n++) { //적당하다 싶은 녀석들을
            if (Pokemon.checkWord(data[n], msg)) result.push(data[n + 1]); //배열에 추가
        }
        if (result[0] != null) return result[Math.floor(Math.random() * result.length)]; //배열이 빈게 아니라면 아무거나 하나 반환
    }
    return null; //일치하는게 없거나, 저장된 채팅이 없거나, 발동할 확률(?)이 아니면, null 반환
};
Pokemon.isValidData = function(msg) { //배울 만한 채팅인지 구분하는 함수
    if (msg.charAt(0) == "#") return; //해시태그(#으로 시작)는 학습 X.
    var noStudy = ["\n"]; //엔터가 포함된건 학습 X. 비속어 필터링 등도 여기다가 넣으면 이상한 말은 안배움
    for (var n = 0; n < noStudy.length; n++) {
        if (msg.indexOf(noStudy[n]) != -1) return false;
    }
    return true;
};

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

function raidReportReturn (dbName, newReport, delReport){
    var raidInfo = DoriDB.readData(dbName);
    raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo);
    if (newReport != null) {
        DoriDB.saveData(dbName, raidInfo + "\n" + newReport); //제보 등록
    }
    raidInfo = DoriDB.readData(dbName);
    if (delReport == "DELETE ALL"){
        DoriDB.saveData(dbName, "레이드 제보"); //제보 리셋
        raidInfo = "제보가 리셋되었습니다."
    } else if(delReport != null){
        raidInfo = reportDelete(raidInfo,delReport);
        DoriDB.saveData(dbName, raidInfo); //삭제된 리스트 새로 등록
    }
    raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo);
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
    if (cmd == "/DoriDB") { // 배운 채팅 수를 확인하는 명령어
        var data = DoriDB.readData(basicDB);
        if (data == null) replier.reply("0개");
        else replier.reply(data.split("\n").length + "개");
        replier.reply(data); // 다 뽑아보자
    }
    if (cmd == "/도리") {
        replier.reply("봇 이름 : 도리\n제작자 : 도곡방/고대방 HypeTrain08\n라이선스 : GPL 3.0");
    }
    if (cmd == "/도움말") {
        replier.reply("봇 이름 : 도리\n제작자 : 도곡방/고대방 HypeTrain08\n라이선스 : GPL 3.0" + "\n\n 포켓몬고 레이드 제보의 활성화를 위해 만든 봇입니다. 명령어 목록은 '/도리 명령어'로 확인하실 수 있습니다.");
    }
    if (cmd == "/도리 명령어") {
        replier.reply("[도리 명령어 목록]" + "\n\n" +
            "/도리 - 생존 확인용 명령어(?)입니다.\n" +
            "/도움말 - 도움말 같은걸 띄웁니다.\n" +
            "/on - 해당 채팅방에서 도리를 활성화시킵니다.\n" +
            "/off - 해당 채팅방에서 도리를 비활성화시킵니다.\n" +
            "/DoriDB - 해당 채팅방에서 도리가 학습한 말들의 수를 불러옵니다.\n" +
            "/도리 명령어 - 도리의 명령어 목록을 띄웁니다.\n" +
            "/미세먼지 - 현재 전국 미세먼지 현황을 띄웁니다.\n" +
            "/주사위 - 주사위를 던집니다.\n"
            );
    }
    if (cmd == "/미세먼지") {
        replier.reply("[미세먼지 정보]\n" + Utils.getDustData());
    }
    if (cmd == "/주사위") {
        var icon = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        replier.reply(icon[Math.floor(Math.random() * 6)]);
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
    
    var chat = Pokemon.getReply(basicDB, msg); //채팅 가져와서 답장
    if (chat != null) replier.reply(chat);

    if (Pokemon.isValidData(msg)) { //학습 - 배울 만한 채팅인 경우,
        var data = DoriDB.readData(basicDB); //배운 채팅 목록을 가져옴
        if (data == null) { //이미 배운게 있다면
            DoriDB.saveData(basicDB, msg); //새로 저장
        } else { //아니면,
            DoriDB.saveData(basicDB, data + " " + msg); 
        }
    }
    lastSender[room] = sender;
    
    //이 아래부터는 기본 정보 주는 곳
    var returnText = "none"; //마지막 답장
    var useReport = "report";
    if (room.includes("고려대학교")){useReport = "korReport"}
    
    if (msg.includes("도리")){ // 도리야 _____ 명령어
        msg = msg.replace("도리야",""); msg = msg.replace("도리",""); msg = msg.trim();
        if (msg.includes("띠꾸") && Math.floor(Math.random() * 3) != 0) {
            replier.reply("띠꾸혀엉");
            if (Math.floor(Math.random() * 3) == 0) {
                java.lang.Thread.sleep(1500); //딜레이
                replier.reply("띠꾸혀어엉");
            }
        }
        if (msg.includes('잘자') || msg.includes('굿밤') || msg.includes('굿나잇') || msg.includes('좋은밤') || msg.includes('좋은 밤')){
            returnText = keyToText("GOODBYE","hello");
        } else if (msg.includes('좋은 아침') || msg.includes('굿모닝') || msg.includes('좋은아침') || msg.includes('잘잤어?')){
            returnText = keyToText("GOODMORNING","hello");
        } else if (msg.includes('잘했어') || msg.includes('최고') || msg.includes('짱') || msg.includes('수고') || msg.includes('고마')){
            returnText = keyToText("GOODJOB","hello");
        }
        
        if(msg.includes('비밀번호') || (msg.includes('비번'))){returnText = "현재 도곡방 입장 비밀번호는 2018이에요! 가끔 새로 바뀐답니다!";}
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
    //제보/삭제/만료/현황 구현 완료. 리서치해야지
    if (msg.includes("현황")){
        returnText = raidReportReturn(useReport, null, null);
    } else if (msg == "제보 리셋" || msg == "제보 리셋해줘"){
        returnText = raidReportReturn(useReport, null, "DELETE ALL");
    } else if (msg.includes('삭제') || msg.includes('오보') || msg.includes("끝났어") || msg.includes("만료")){
        msg = msg.replace('시간만료',''); msg = msg.replace('끝났어',''); msg = msg.replace('만료','');
        msg = msg.replace('삭제해줘',''); msg = msg.replace('삭제',''); msg = msg.replace('오보',''); msg = msg.trim();
        returnText = raidReportReturn(useReport,null,msg);
        replier.reply(msg + " 제보가 삭제 되었습니다.");        
    }

    if ((msg.includes("시") || msg.includes(":")) && msg.includes("제보")){        
        returnText = raidReportReturn(useReport, raidReport(msg), null);
    }
    
    if (returnText != "none"){replier.reply(returnText);} else{replier.reply("명령어 안들어옴ㅋ")}
}
