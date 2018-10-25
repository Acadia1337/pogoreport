//원작자 Dark Tornado님 - https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/%EC%95%84%EC%9D%B4%EC%B9%B4.js
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath(); //내장메모리 최상위 경로

/*상수 (객체) 선언*/
const DoriDB = {}; const preChat = {}; const lastSender = {}; const botOn = {}; const basicDB = "basic";
var currentTime = new Date(); var currentHour = currentTime.getHours(); var currentMinute = currentTime.getMinutes(); var todayDate = (currentTime.getMonth()+1) + "월 " + currentTime.getDate() + "일";

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
        //https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=blQ3&query=%EC%84%9C%EC%9A%B8%20%EC%B4%88%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80
        //var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?query=미세먼지");
        var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=blQ3&query=%EC%84%9C%EC%9A%B8%20%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80");
        data = data.split("미세먼지</strong>")[1].split("예측영상")[0].replace(/(<([^>]+)>)/g, "");
        data = data.split("단위")[0].trim().split("   ");
        var returnDust = "";
        for (var n = 0; n < data.length; n++) {
            var cc = data[n].trim().split(" ");
            //종로 강남 서초 성북 송파 영등포 용산 동대문
            if (cc[0].includes("종로") || cc[0].includes("강남") || cc[0].includes("서초") || cc[0].includes("성북") || cc[0].includes("송파") || cc[0].includes("영등포") || cc[0].includes("용산") || cc[0].includes("동대문")){
                data[n] = cc[0] + " : " + Utils.dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)";
                returnDust = returnDust + cc[0] + " : " + Utils.dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)\n";
            } else {
                data[n] = ''
            }
        }
        var data2 = data.shift();
        data.sort();
        data.unshift(data2);
        //return data.join("\n");
        return returnDust;
    } catch (e) {
        Log.debug("미세먼지 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "미세먼지 정보 불러오기 실패\n오류: " + e;
    }
};
Utils.getFineDustData = function() { //전국 초미세먼지 정보 가져오는 함수
    try {
        //var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?query=미세먼지");
        var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?where=m&sm=mtb_etc&mra=blQ3&query=%EC%84%9C%EC%9A%B8%20%EC%B4%88%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80");
        data = data.split("초미세먼지</strong>")[1].split("예측영상")[0].replace(/(<([^>]+)>)/g, "");
        data = data.split("단위")[0].trim().split("   ");
        var returnDust = "";
        for (var n = 0; n < data.length; n++) {
            var cc = data[n].trim().split(" ");
            if (cc[0].includes("종로") || cc[0].includes("강남") || cc[0].includes("서초") || cc[0].includes("성북") || cc[0].includes("송파") || cc[0].includes("영등포") || cc[0].includes("용산") || cc[0].includes("동대문")){
                data[n] = cc[0] + " : " + Utils.dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)";
                returnDust = returnDust + cc[0] + " : " + Utils.dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)\n";
            } else {
                data[n] = ''
            }
        }
        var data2 = data.shift();
        data.sort();
        data.unshift(data2);
        //return data.join("\n");
        return returnDust;
    } catch (e) {
        Log.debug("초미세먼지 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "초미세먼지 정보 불러오기 실패\n오류: " + e;
    }
};
Utils.getWeather = function() { //강남구 날씨 정보 가져오는 함수
    try {
        var data = Utils.getTextFromWeb("https://m.search.naver.com/search.naver?query=%EA%B0%95%EB%82%A8%EA%B5%AC+%EB%82%A0%EC%94%A8&sm=mtb_hty.top&where=m&oquery=%EC%84%9C%EC%9A%B8+%EB%82%A0%EC%94%A8&tqi=T8f2wdpVupossZ16ktRssssssCo-130430");
        var temperature = data.split('현재온도</span><em class="figure degree_code">')[1].split('</em></strong> <span class="chill_temp"><span>')[0];
        var feelsLike = data.split('체감온도</span><em class="figure degree_code">')[1].split('</em></span> </div> </div> ')[0];
        var weatherInSentence = data.split('<div class="wt_summary"> <p>')[1].split('</p> <a href="')[0];
        if (weatherInSentence.includes("같아요")){
            var weatherInSentence2 = ""
        } else {
            weatherInSentence = weatherInSentence.split('<em class="fi')[0];
            var weatherInSentence2 = data.split('어제보다<em class="figure degree_code">')[1].split('</p> <a href="?">')[0].replace("</em>", "도 ");    
            weatherInSentence2 = weatherInSentence2.split('<')[0];
        }
        
        var tomorrow = data.split('주간날씨')[1];
        

        return "현재 온도는 " + temperature + "도,\n체감 온도는 " + feelsLike + "도 에요!\n전반적으로 " + weatherInSentence + " " + weatherInSentence2 + "!";
    } catch (e) {
        Log.debug("날씨 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
        return "날씨 정보 불러오기 실패\n오류: " + e;
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
    var currentMinuteFix; var endTime; var endHour; var endMinute; var i;
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
            } else if ((endHour == 11) && (currentHour==12)){
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

function pokemonInfoReturn (pokemon){
    var dbToUse = DoriDB.readData("pokemonINFO");
    var keyNumber;
    var divideCategory = dbToUse.split("\n"); //첫 줄 빼기용
    var keySelect = divideCategory[0].split(",");
    if (divideCategory[0].includes(pokemon)){
        keyNumber = keySelect.indexOf(pokemon);
    } else {return pokemon + "에 대한 정보는 모르는 것 같아요ㅠㅠ";}
    
    dbToUse = divideCategory[keyNumber];
    var dividePokemonInfo = dbToUse.split(","); //줄에서 쓸말을 각각 나눔
//여기 아래부터 지정 시작
//pokedexNumber pokemonName type1 type2 attack defense stamina rank lv15 lv20 lv25 lv30 lv35 lv40 walkDistance catchRate escapeRate attack_FAST attack_CHARGE defense_FAST defense_CHARGE
    var pokedexNumber = dividePokemonInfo[0]; var pokemonName = dividePokemonInfo[1];
    var type1 = dividePokemonInfo[2]; var type2 = dividePokemonInfo[3];
    var attack = dividePokemonInfo[4]; var defense = dividePokemonInfo[5];
    var stamina = dividePokemonInfo[6];
    var rank = dividePokemonInfo[7];
    var lv15 = dividePokemonInfo[8]; var lv20 = dividePokemonInfo[9];
    var lv25 = dividePokemonInfo[10]; var lv30 = dividePokemonInfo[11];
    var lv35 = dividePokemonInfo[12]; var lv40 = dividePokemonInfo[13];
    var walkDistance = dividePokemonInfo[14]; var catchRate = dividePokemonInfo[15];
    var escapeRate = dividePokemonInfo[16]; 
    var attack_FAST = dividePokemonInfo[17]; var attack_FAST_DPS = dividePokemonInfo[18];
    var attack_CHARGE = dividePokemonInfo[19]; var attack_CHARGE_DPS = dividePokemonInfo[20];
    var defense_FAST = dividePokemonInfo[21]; var defense_FAST_DPS = dividePokemonInfo[22];
    var defense_CHARGE = dividePokemonInfo[23]; var defense_CHARGE_DPS = dividePokemonInfo[24];
    
    if (type2 != 'NONE'){
        type1 = type1 + '/' + type2;
    }

    if (pokemonName.split('[')[0] == pokemon){
        return pokemonName + " (도감 #" + pokedexNumber + 
            ")\n타입 - " + type1 + 
            "\n공격 " + attack + " / 방어 " + defense + " / 체력 " + stamina + 
            "\n파트너 사탕거리 : " + walkDistance + 
            "\n포획률 : " + catchRate + " / 도주율 : " + escapeRate + 
            "\n\nCP (순위 #" + rank + 
            ")\nLV15 : " + lv15 + "    LV20 : " + lv20 + 
            "\nLV25 : " + lv25 + "    LV30 : " + lv30 + 
            "\nLV35 : " + lv35 + "    LV40 : " + lv40 + 
            "\n\n최고 스킬 조합(DPS):\n공격: " + 
            attack_FAST + "(" + attack_FAST_DPS + ") / " + attack_CHARGE + "(" + attack_CHARGE_DPS + 
            ")\n방어: " + defense_FAST + "(" + defense_FAST_DPS + ") / " + defense_CHARGE + "(" + defense_CHARGE_DPS + ")";
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
            timeRenew();
            DoriDB.saveData(dbName, todayDate + " 리서치 목록"); //제보 리셋
        }
        return raidInfo = "제보가 리셋되었습니다."
    } else if(delReport != null){
        raidInfo = reportDelete(raidInfo,delReport);
        DoriDB.saveData(dbName, raidInfo); //삭제된 리스트 새로 등록
    }
    if (nonReport==0){raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo); raidInfo = timeCheck(raidInfo);}
    return raidInfo;
}

function researchReturn (dbName, newReport){
    var currentReport = DoriDB.readData(dbName); // 현재 방의 리서치 목록
    var researchInfo = DoriDB.readData('researchDivide'); // 리서치 찾을 사전
    var researchInput = newReport.split(' ')[newReport.split(' ').length-1] + ''; // 마지막 단어. 보통 미뇽
    var researchInput2 = newReport.split(' ')[newReport.split(' ').length-2] + ''; // 마지막에서 두번째 단어. 보통 장소
    var researchFind = researchInfo.split('\n');
    var researchPokemonName = researchFind[0].split(',');
    var researchToPut = ''; var researchTitle = '';
    for (var i = 0; i < 24; i++){
        if (researchFind[i].includes(researchInput)){
            researchToPut = newReport.replace(researchInput, ''); researchTitle = researchFind[i].split(',')[0] + ""; break;
        } else if(researchFind[i].includes(researchInput2)){
            researchToPut = newReport.replace(researchInput2, ''); researchTitle = researchFind[i].split(',')[0] + ""; break;
        }
    } // 리서치를 사전에서 찾는 것

    var researchBreakDown = currentReport.split('\n'); // 현재 리포트를 나눠서 뽑음
    researchTitle = researchTitle.trim(); researchToPut = researchToPut.trim();
    if (currentReport.includes(researchTitle)){
        for (var i = 0; i < researchBreakDown.length; i++){
            if (researchBreakDown[i].includes(researchTitle)){
                researchBreakDown.splice(i+1,0,researchToPut);
                currentReport = todayDate + ' 리서치 목록';
                break;
            }
        }
    } else {
        researchBreakDown = researchBreakDown.concat(['[' + researchTitle + ']',researchToPut]);
        currentReport = todayDate + ' 리서치 목록';
    }
    // 리서치 끼워넣기
    for (var i = 1; i < researchBreakDown.length; i++){
        if (researchBreakDown[i].includes('[') && i > 2 && researchBreakDown[i-1]!=''){
            currentReport = currentReport + "\n\n" + researchBreakDown[i];
        } else {
            currentReport = currentReport + "\n" + researchBreakDown[i];
        }
        
    } // 리서치 저장 할 준비

    DoriDB.saveData(dbName, currentReport); //리서치 저장
    return currentReport;
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
    
    if (["도리", "도리야", "도리야!", "도리야아", "Dori", "도리야?", "도리야!", "도리야??"].indexOf(msg) != -1) { //도리에 반응
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
    
    if (msg.includes("퍄퍄드립") || msg.includes("퍄퍄 드립") || msg.includes("퍄퍄합") || msg.includes("퍄퍄!")){
        replier.reply(msg);
    } else if (msg.includes("고ㅑ고ㅑ") || msg.includes("고ㅑ고ㅑ")){
        replier.reply(msg);
    } else if (msg.includes("가즈아")){
        replier.reply("가즈아ㅏㅏㅏㅏ");
    }
    
    if (msg.includes("도리")){ // 도리야 _____ 명령어
        if((msg == "도리야 팽도리 정보") || msg == "도리야 팽도리 개체" || msg == "도리 팽도리 개체" || msg == "도리 팽도리 정보"){
            msg = "팽도리 정보"
        } else {
            msg = msg.replace("도리야?",""); msg = msg.replace("도리야",""); msg = msg.replace("도리",""); //문장에서 도리 제거
        }
        msg = msg.trim(); 
        
        if (msg.includes("띠꾸") && Math.floor(Math.random() * 3) != 0) {
            replier.reply("띠꾸혀엉");
            if (Math.floor(Math.random() * 3) == 0) {
                java.lang.Thread.sleep(1500); //딜레이
                replier.reply("띠꾸혀어엉");
            }
        }
        
        if (msg == "사용법" || ((msg.includes("누구야?") && msg.includes("넌") || msg.includes("자기소개")))){
            returnText = keyToText(null,"doriguide");
        } else if(msg.includes("뉴비 가이드") && room.includes('고려대')){
            returnText = keyToText(null,"newbie");
        } else if (msg.includes("둥지")){
            returnText = keyToText(null,"nest")
        } else if (((msg.includes('이벤트')) || (msg.includes('글로벌 챌린지'))) && !msg.includes('할로윈')) {
            returnText = keyToText(null,"event");
        } else if (msg.includes('할로윈') && msg.includes('이벤트')){
            returnText = keyToText(null,"halloween");
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
        } else if (msg.includes('날씨') && ((msg.includes('버프')) || msg.includes('포켓몬') || msg.includes('타입'))){
            msg = msg.replace('날씨', '')
            returnText = keyToText(null,"weatherBuff");
        } else if(msg.includes('가이드') && room.includes('고려대')){
            returnText = "고려대학교 지역 레이드 가이드:\nhttps://goo.gl/PKrEX8"
        } else if (msg == "나가" || msg == "꺼져"){
            returnText = "더 잘할게요...ㅠㅠ내쫓지 말아주세요ㅠㅠ";
        } else if ((msg.includes('보스') || msg.includes('레이드')) && (msg.includes('목록') || msg.includes('리스트'))){
            returnText = keyToText(null,"raidBossList2");
        } else if (msg.includes("메탕") && (msg.includes('CP') || msg.includes('씨피') || msg.includes('cp') || msg.includes('시피'))){
            returnText = keyToText(null,'metang');
        } else if (msg.includes('화강돌') && msg.includes('리서치')){
            returnText = keyToText(null,'spiritombResearch'); msg = '화강돌';
        } else if (msg.includes('출석부')){
            returnText = keyToText(null,'roster');
        }
        
        if(msg.includes('평가')){
            if(msg.includes('발러')){returnText = keyToText(null,"valorAppraise");}
            if(msg.includes('미스틱')){returnText = keyToText(null,"mysticAppraise");}
            if(msg.includes('인스')){returnText = keyToText(null,"instinctAppraise");}
        }
        
        if (msg.includes("정보") || msg.includes("개체")){
            msg = msg.replace("정보",""); msg = msg.replace("백개체",""); msg = msg.replace("개체",""); msg = msg.trim();
            returnText = pokemonInfoReturn(msg);
        }
        if (msg.includes("날씨")){
            returnText = "[" + todayDate + " 날씨 정보]\n" + Utils.getWeather() + "\n트레이너분들 건강하세요~!";
        } else if (msg.includes("초미세먼지")) {
            returnText = "[" + todayDate + " 초미세먼지 정보]\n\n" + Utils.getFineDustData() + "\n트레이너분들 건강하세요~!";
        } else if (msg.includes("미세먼지")) {
            returnText = "[" + todayDate + " 미세먼지 정보]\n\n" + Utils.getDustData() + "\n트레이너분들 건강하세요~!";
        }
        if (msg.includes("주사위")) {
            var icon = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
            returnText = icon[Math.floor(Math.random() * 6)];
        }

        if ((msg.includes('한테') || msg.includes('께')) && msg.includes('인사')){
            msg = msg.replace("께","한테"); msg = msg.replace('님',''); msg = msg.split('한테')[0]; msg = msg.trim();
            if (msg.includes(' ')){
                msg = msg.split(' '); msg = msg[msg.length - 1];
            }   
            returnText = "안녕하세요 " + msg + "님! 반가워요!!😆😆😆";
        } else if (msg.includes('칭찬')){
            var tempMsg = msg.split(' ')[0]; tempMsg.replace('님','')
            if (tempMsg == '나' || tempMsg.includes('칭찬')){
                returnText = "정말 잘하셨어요!! " + sender + " 칭찬해 😉😉😉";
            } else {
                returnText = "정말 잘하셨어요!! " + tempMsg + " 칭찬해 😉😉😉";
            }
        }
        if (msg.includes('잘자') || msg.includes('굿밤') || msg.includes('굿나잇') || msg.includes('좋은밤') || msg.includes('좋은 밤')){
            if (sender.includes("/")){sender = sender.split('/')[0];}
            returnText = sender + "님 " + keyToText("GOODBYE","hello");
        } else if (msg.includes('좋은 아침') || msg.includes('굿모닝') || msg.includes('좋은아침') || msg.includes('잘잤어?')){
            returnText = sender + "님 " + keyToText("GOODMORNING","hello");
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
        
        /*
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
        } else if (msg.includes('에쇼하우스') && msg.includes('메뉴') && msg.includes('추가')){
            msg = msg.replace('에쇼하우스',''); msg = msg.replace('메뉴',''); msg = msg.replace('추가','');
            msg = msg.trim(); msg = msg.split(" ");
            returnText = quoteRegister("에쇼하우스", msg);
            msg = "none";
            if (returnText.includes("에쇼하우스")){
                returnText = "메뉴가 추가 되었습니다.";
            }
        } else if (msg.includes('에쇼') && msg.includes('하우스') && msg.includes('메뉴')){
            returnText = keyToText("에쇼하우스","quote");
        } // else if XXXXX 정보 -> 사람 한마디 */
        if (msg.includes('명언')){
            returnText = '명언은 잠시 오류가 나서 중지되었어요!'
        }
        
        if(msg.includes('비밀번호') || (msg.includes('비번'))){
            if(room.includes("고려대학교")){
                returnText = "연대는 1885, 우리는!";
            } else if (room.includes('도곡')) {
                returnText = "현재 도곡방 입장 비밀번호는 2018이에요! 가끔 새로 바뀐답니다!";
            }
        }
        if (msg.includes("트레이너") && (msg.includes("코드") || msg.includes("목록"))){
            if (room.includes("도곡")){
                returnText = "도곡방 트레이너코드 : https://goo.gl/z7ib37\n\n친구 필요하시면 방장님꺼 등록하세요!!\n하입 부캐 : 0293 2668 5480\n하입 부부캐 : 1255 9840 5201";
            } else if (room.includes("고려대")){returnText = "고대방 트레이너코드 : https://goo.gl/dHSwSW";}
        }
        if(msg.includes('뭐하니') || msg.includes('뭐해')){returnText = '트레이너분들의 말을 기다리고 있어요!';}
        if(msg.includes('바보') || msg.includes('멍청이')){returnText = '아니에요ㅡㅡ매일매일 진화하고 있는걸요!';}
        if(msg.includes('이쁜짓') || msg.includes('애교')){returnText = '(심각)';}
        if(msg.includes('안녕')){
            if (sender.includes("/")){sender = sender.split('/')[0];}
            var nowHour = new Date().getHours();
            if (nowHour > 11 && nowHour < 18){
                returnText = "네 안녕하세요 " + sender + "님! 오늘도 좋은 하루 되세요😊😊😊";
            } else if (nowHour > 17 && nowHour < 20) {
                returnText = "네 트레이너님! 좋은 저녁이에요ㅎㅎ 저녁 맛있게 드세요~!😋😋😋";
            } else if (nowHour > 19 || nowHour < 2){
                returnText = "네 " + sender + "님! 좋은 밤 되세요~!!😴😴😴";
            } else if (nowHour > 1 && nowHour < 5){
                returnText = "헉 " + sender + "님! 안주무세요!?!? 어서 주무세요!!😱😱😱";
            } else if (nowHour < 11){
                returnText = "안녕하세요 " + sender + "님! 좋은 아침이에요😊😊😊";
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
    } else if ((msg.includes('삭제해줘') || msg.includes('삭제 해줘') || msg.includes('오보') || msg.includes("끝났어") || msg.includes("만료")) && !msg.includes("리서치")){
        msg = msg.replace('시간만료',''); msg = msg.replace('끝났어',''); msg = msg.replace('만료','');
        msg = msg.replace('삭제해줘',''); msg = msg.replace('오보',''); msg = msg.trim();
        returnText = raidReportReturn(useReport,null,msg);
        replier.reply(msg + " 제보가 삭제 되었습니다.");        
    } else if ((msg.includes("리서치") && (msg.includes("삭제해줘") || msg.includes("제거")))){
        msg = msg.replace('끝났어',''); msg = msg.replace('삭제해줘',''); msg = msg.replace('삭제 해줘','');
        msg = msg.replace('오보',''); msg = msg.trim();
        returnText = raidReportReturn(useResearch,null,msg);
    }

    if ((msg.includes("시") || msg.includes(":")) && msg.includes("제보") && !msg.includes("리서치")){        
        returnText = raidReportReturn(useReport, raidReport(msg), null);
    } else if (msg.includes("리서치") && msg.includes("제보")){
        msg = msg.replace("제보", ""); msg = msg.replace("리서치",""); msg = msg.trim();
        returnText = researchReturn(useResearch, msg);
    }
    
    if (returnText != "none"){replier.reply(returnText);}
}
