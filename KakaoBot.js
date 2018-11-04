//원작자 Dark Tornado님 - https://github.com/DarkTornado/KakaoTalkBot-Examples/blob/master/%EC%95%84%EC%9D%B4%EC%B9%B4.js
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath(); //내장메모리 최상위 경로

/*상수 (객체) 선언*/
const DoriDB = {}; const preChat = {}; const lastSender = {}; const botOn = {}; const basicDB = "basic";
var currentTime = new Date(); var currentHour = currentTime.getHours(); var currentMinute = currentTime.getMinutes(); var todayDate = (currentTime.getMonth()+1) + "월 " + currentTime.getDate() + "일";

/*DoriDB 객체*/
DoriDB.createDir = function() { //배운 채팅들이 저장될 폴더를 만드는 함수
    var folder = new java.io.File(sdcard + "/Dori/"); //File 인스턴스 생성
    folder.mkdirs(); //폴더 생성
}; DoriDB.saveData = function(name, msg) { //파일에 내용을 저장하는 함수
    try {
        var file = new java.io.File(sdcard + "/Dori/" + name + ".txt");
        var fos = new java.io.FileOutputStream(file);
        var str = new java.lang.String(msg);
        fos.write(str.getBytes());
        fos.close();
    } catch (e) {
        Log.debug(e + ", " + e.lineNumber);
    }
}; DoriDB.readData = function(name) { //파일에 저장된 내용을 불러오는 함수
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
}; Utils.getFineDustData = function() { //전국 초미세먼지 정보 가져오는 함수
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
}; Utils.getWeather = function() { //강남구 날씨 정보 가져오는 함수
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
}; Utils.getTextFromWeb = function(url) {
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

function timeSet (dbName,raidContent){
    var listToUse = DoriDB.readData(dbName);
    raidContent = raidContent.replace("제보",""); raidContent = raidContent.trim();
    var startHR; var startMIN='0'; var endHR; var endMIN; var timeDivide = raidContent.split(" ");

    for (var i = 0; i < timeDivide.length; i++){ //시작 시와 분 구하기
        if (timeDivide[i].includes('시') && timeDivide[i].includes('분')){ //11시50분
            startHR = timeDivide[i].split('시')[0]; startMIN = timeDivide[i].split('시')[1].split('분')[0];
            raidContent = raidContent.replace(timeDivide[i],"");
        } else if (timeDivide[i].includes('시')){
            startHR = timeDivide[i].split('시')[0];
            if (Number.isInteger(parseInt(timeDivide[i].split('시')[1]))){ //11시50
                startMIN = timeDivide[i].split('시')[1];
            } else if (timeDivide[i+1].includes('분') && (Number.isInteger(parseInt(timeDivide[i+1].split('분')[0].trim())))){ //11시 50분
                raidContent = raidContent.replace(timeDivide[i+1],"");
                startMIN = timeDivide[i+1].split('분')[0];
            } else { //11시
                startMIN = '0';
            }
            raidContent = raidContent.replace(timeDivide[i],"");
        } else if (timeDivide[i].includes(':')){ //11:50
            startHR = timeDivide[i].split(':')[0]; startMIN = timeDivide[i].split(':')[1];
            raidContent = raidContent.replace(timeDivide[i],"");
        }
    }
    startHR = startHR.trim();
    startMIN = startMIN.trim();
    raidContent = raidContent.trim();
    startHR = parseInt(startHR); startMIN = parseInt(startMIN);
    if (currentTime.getHours() > 10 && startHR < 10){
        startHR = startHR + 12;
    }
    if (startMIN < 15){ //끝나는 시, 분 구하기
        endHR = startHR;
        endMIN = startMIN + 45;
    } else {
        endHR = startHR + 1;
        endMIN = startMIN - 15;
    }
    if (startMIN < 10){
        startMIN = "0" + startMIN;
    }
    if (endMIN < 10){
        endMIN = "0" + endMIN;
    }
    
    var reportedTime = parseInt(endHR + '' + endMIN);
    var timeSort = listToUse.split('\n');
    var compareTime; var reportIndex = 100;
    for (var i = 1; i < timeSort.length; i++){
        compareTime = parseInt(timeSort[i].split(',')[2] + timeSort[i].split(',')[3]);
        if (reportedTime <= compareTime){ // RT가 11시, CT가 12시면
            reportIndex = i; break;
        }
    }
    if (reportIndex == 100){ // 안돌았으니 제일 늦은시간대인거임
        listToUse = listToUse + "\n" + startHR + "," + startMIN + "," + endHR + "," + endMIN + "," + raidContent;
    } else { //아니면 해당 시간에 넣기
        timeSort.splice(i,0,startHR + "," + startMIN + "," + endHR + "," + endMIN + "," + raidContent);
        listToUse = timeSort.join('\n');
    }
    return listToUse;
}

//여기 체크
function raidReportChange(dbName, changeReport){
    var currentReport = DoriDB.readData(dbName); // 현재 방의 리서치 목록
    var previousReport = changeReport.split('제보')[0].trim();
    var toBeReport = changeReport.split('변경')[1].trim(); toBeReport = toBeReport.replace(":","").trim();
    var currentReportDivide = currentReport.split('\n');
    for (var i = 1; i < currentReportDivide.length; i++){
        if (currentReportDivide[i].includes(previousReport)){
            var writeNewReport = currentReportDivide[i].split(',');
            writeNewReport[4] = toBeReport;
            writeNewReport = writeNewReport.join(',');
            currentReportDivide.splice(i,1,writeNewReport);
            
            currentReport = currentReportDivide.join('\n');
            DoriDB.saveData(dbName,currentReport);
            return printReport(dbName,DoriDB.readData(dbName));
            break;
        }
    }
    return "제보 변경 안됐는데?"
}

function deleteThisReport (dbName,toDel){
    var listToDeleteFrom = DoriDB.readData(dbName); var pickDelLine; var delList = listToDeleteFrom.split("\n");

    for (var i = 0; i < delList.length; i++){
        if (delList[i].includes(toDel)){
            delList.splice(i,1); break;
        }
    }
    listToDeleteFrom = '레이드 목록'
    for (var i = 1; i < delList.length; i++){
        listToDeleteFrom = listToDeleteFrom + '\n' + delList[i];
    }
    DoriDB.saveData(dbName, listToDeleteFrom); //제보 등록
    return listToDeleteFrom;
}

function printReport (dbName,raidList){
    var listInTwelve = raidList.split('\n');
    //listInTwelve = 3,30,4,15,작은분수
    var listForSending = "레이드 제보";
    for (var i = 1; i < listInTwelve.length; i++){
        var tempStartHR = parseInt(listInTwelve[i].split(',')[0]);
        var tempStartMIN = listInTwelve[i].split(',')[1];
        var tempEndHR = parseInt(listInTwelve[i].split(',')[2]);
        var tempEndMIN = listInTwelve[i].split(',')[3];
        
        if (tempStartMIN == '08'){
            tempStartMIN = 8;
        } else if (tempStartMIN == '09'){
            tempStartMIN = 9;
        }
        if (tempEndMIN == '08'){
            tempEndMIN = 8;
        } else if (tempEndMIN == '09'){
            tempEndMIN = 9;
        }
        
        tempStartMIN = parseInt(tempStartMIN);
        tempEndMIN = parseInt(tempEndMIN);
        
        //시간 지나면 자동 삭제 하기
        currentTime = new Date();
        if ((currentTime.getHours() > tempEndHR) || ((currentTime.getHours() == tempEndHR) && currentTime.getMinutes() > tempEndMIN)){ // 시간이 더 크거나, 시간이 같지만 분이 더 클떄
            deleteThisReport(dbName,listInTwelve[i].split(',')[4]);
        } else {
            if (tempStartHR > 12){
                tempStartHR = tempStartHR - 12;
            }
            if (tempEndHR > 12){
                tempEndHR = tempEndHR - 12;
            }
            if (tempStartMIN < 10){
                tempStartMIN = '0' + tempStartMIN;
            }
            if (tempEndMIN < 10){
                tempEndMIN = '0' + tempEndMIN;
            }
            
            listForSending = listForSending + '\n' + tempStartHR + ':' + tempStartMIN + '~' + tempEndHR + ':' + tempEndMIN + ' ' + listInTwelve[i].split(',')[4];
        }
    }
    return listForSending;
}

function raidReportReturn (dbName, newReport, delReport){
    var nonReport = 1; if (dbName.includes("eport")){nonReport = 0;}
    if (newReport != null) {
        DoriDB.saveData(dbName,timeSet(dbName,newReport));
        return printReport(dbName,DoriDB.readData(dbName));
    }
    if (delReport == "DELETE ALL"){
        if (nonReport==0){
            DoriDB.saveData(dbName, "레이드 제보"); //제보 리셋
        } else {
            DoriDB.saveData(dbName, "리서치 목록"); //제보 리셋
        }
        return "제보가 리셋되었습니다.";
    } else if(delReport != null){
       deleteThisReport(dbName,delReport);
    }
    if (nonReport == 0){
        return printReport(dbName,DoriDB.readData(dbName));
    } else {
        return DoriDB.readData(dbName);
    }
}

function researchReturn (dbName, newReport){
    var currentReport = DoriDB.readData(dbName); // 현재 방의 리서치 목록
    var researchInfo = DoriDB.readData('researchDivide'); // 리서치 찾을 사전
    var researchInput = newReport.split(' ')[newReport.split(' ').length-1] + ''; // 마지막 단어. 보통 미뇽
    var researchInput2 = newReport.split(' ')[newReport.split(' ').length-2] + ''; // 마지막에서 두번째 단어. 보통 장소
    var researchFind = researchInfo.split('\n');
    var researchPokemonName = researchFind[0].split(',');
    var researchToPut = ''; var researchTitle = '';
    var researchMission = '';
    for (var i = 0; i < 26; i++){
        if (researchFind[i].includes(researchInput)){
            researchToPut = newReport.replace(researchInput, ''); researchTitle = researchFind[i].split(',')[0] + "";
            researchMission = researchFind[i].split(',')[1] + ""; break;
        } else if(researchFind[i].includes(researchInput2)){
            researchToPut = newReport.replace(researchInput2, ''); researchTitle = researchFind[i].split(',')[0] + "";
            researchMission = researchFind[i].split(',')[1] + ""; break;
        }
    } // 리서치를 사전에서 찾는 것

    var researchBreakDown = currentReport.split('\n'); // 현재 리포트를 나눠서 뽑음
    researchTitle = researchTitle.trim(); researchToPut = researchToPut.trim();
    if (currentReport.includes(researchTitle)){
        for (var i = 0; i < researchBreakDown.length; i++){
            if (researchBreakDown[i].includes(researchTitle)){
                researchBreakDown.splice(i+1,0,researchToPut);
                currentReport = "리서치 목록";
                break;
            }
        }
    } else {
        researchBreakDown = researchBreakDown.concat(['[' + researchTitle + '] ' + researchMission,researchToPut]);
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

function deleteResearch (dbName, delReport){
    delReport = delReport.replace('오보',''); delReport = delReport.replace('해줘','').trim(); delReport = delReport.replace('삭제','').trim(); delReport = delReport.replace('리서치','').trim();
    var currentReport = DoriDB.readData(dbName); // 현재 방의 리서치 목록
    var researchInList = currentReport.split('\n');
    for (var i=0;i<researchInList.length;i++){
        if (researchInList[i].includes(delReport)){
            researchInList.splice(i,1);
            currentReport = researchInList.join('\n');
            DoriDB.saveData(dbName, currentReport); //출석부 저장
            return raidReportReturn(dbName, null, null);
        }
    }
        return "리서치가 삭제 되지 않았습니다"
}

function createRoster(dbName, sender, rosterMSG){
    var mysticNum=0; var valorNum=0; var instiNum=0; var etcNum=0;
    rosterMSG = rosterMSG.replace('팟','');
    rosterMSG = rosterMSG.replace('출석부',''); rosterMSG = rosterMSG.replace('생성',''); rosterMSG = rosterMSG.trim();
    if (rosterMSG.includes("미스틱")){
        mysticNum = parseInt(rosterMSG.split('미스틱')[1].split(' ')[0]);
        rosterMSG = rosterMSG.slice(0,rosterMSG.indexOf('미스틱')) + rosterMSG.slice(rosterMSG.indexOf('미스틱')+4)    
    }
    if (rosterMSG.includes("발러")){
        valorNum = parseInt(rosterMSG.split('발러')[1].split(' ')[0]);
        rosterMSG = rosterMSG.slice(0,rosterMSG.indexOf('발러')) + rosterMSG.slice(rosterMSG.indexOf('발러')+3)    
    }
    if (rosterMSG.includes("인스")){
        instiNum = parseInt(rosterMSG.split('인스')[1].split(' ')[0]);
        rosterMSG = rosterMSG.slice(0,rosterMSG.indexOf('인스')) + rosterMSG.slice(rosterMSG.indexOf('인스')+3)    
    }
    rosterMSG = rosterMSG.trim();
    var timeDivide = rosterMSG.split(' ');
    var startHR; var startMIN; var raidContent = rosterMSG;

    for (var i = 0; i < timeDivide.length; i++){ //시작 시와 분 구하기
        if (timeDivide[i].includes('시') && timeDivide[i].includes('분')){ //11시50분
            startHR = timeDivide[i].split('시')[0]; startMIN = timeDivide[i].split('시')[1].split('분')[0];
            raidContent = raidContent.replace(timeDivide[i],"");
        } else if (timeDivide[i].includes('시')){
            startHR = timeDivide[i].split('시')[0];
            if (Number.isInteger(parseInt(timeDivide[i].split('시')[1]))){ //11시50
                startMIN = timeDivide[i].split('시')[1];
            } else if (timeDivide[i+1].includes('분') && (Number.isInteger(parseInt(timeDivide[i+1].split('분')[0].trim())))){ //11시 50분
                raidContent = raidContent.replace(timeDivide[i+1],"");
                startMIN = timeDivide[i+1].split('분')[0];
            } else { //11시
                startMIN = '0';
            }
            raidContent = raidContent.replace(timeDivide[i],"");
        } else if (timeDivide[i].includes(':')){ //11:50
            startHR = timeDivide[i].split(':')[0]; startMIN = timeDivide[i].split(':')[1];
            raidContent = raidContent.replace(timeDivide[i],"");
        }
    }    
    startHR = startHR.trim(); startMIN = startMIN.trim(); raidContent = raidContent.trim();
    if (parseInt(startMIN) < 10){
        startMIN = '0' + parseInt(startMIN);
    }
    var accounts = '';
    for (var i = 0; i < mysticNum; i++){
        accounts = accounts + ',' + sender + ' [❄]'
    }
    for (var i = 0; i < valorNum; i++){
        accounts = accounts + ',' + sender + ' [🔥]'
    }
    for (var i = 0; i < instiNum; i++){
        accounts = accounts + ',' + sender + ' [⚡]'
    }

    if (mysticNum==0 && valorNum==0 && instiNum==0){
        accounts = ',' + sender + '';
    }
    var initialRoster = sender + ',' + startHR + "," + startMIN + "," + raidContent + accounts;
    var roster = DoriDB.readData(dbName); // 출석부 목록 불러오기
    roster = roster + '\n' + initialRoster;
    DoriDB.saveData(dbName, roster); //출석부 저장

    return readRoster(dbName, raidContent + '팟');
}

function changeRosterTime(dbName, sender, rosterMSG){
    //도리야 작은분수 팟 8시 30분으로 시간변경
    //도리야 작은분수 팟 시간변경 8시 30분
    rosterMSG = rosterMSG.replace('팟',''); rosterMSG = rosterMSG.replace('시간변경',''); rosterMSG = rosterMSG.trim();
    var timeDivide = rosterMSG.split(' ');
    var startHR; var startMIN; var raidContent = rosterMSG;

    for (var i = 0; i < timeDivide.length; i++){ //시작 시와 분 구하기
        if (timeDivide[i].includes('시') && timeDivide[i].includes('분')){ //11시50분
            startHR = timeDivide[i].split('시')[0]; startMIN = timeDivide[i].split('시')[1].split('분')[0];
            raidContent = raidContent.replace(timeDivide[i],"");
        } else if (timeDivide[i].includes('시')){
            startHR = timeDivide[i].split('시')[0];
            if (Number.isInteger(parseInt(timeDivide[i].split('시')[1]))){ //11시50
                startMIN = timeDivide[i].split('시')[1];
            } else if (timeDivide[i+1].includes('분') && (Number.isInteger(parseInt(timeDivide[i+1].split('분')[0].trim())))){ //11시 50분
                raidContent = raidContent.replace(timeDivide[i+1],"");
                startMIN = timeDivide[i+1].split('분')[0];
            } else { //11시
                startMIN = '0';
            }
            raidContent = raidContent.replace(timeDivide[i],"");
        } else if (timeDivide[i].includes(':')){ //11:50
            startHR = timeDivide[i].split(':')[0]; startMIN = timeDivide[i].split(':')[1];
            raidContent = raidContent.replace(timeDivide[i],"");
        }
    }
    startHR = startHR.trim(); startMIN = startMIN.trim(); raidContent = raidContent.trim();
    var roster = DoriDB.readData(dbName); // 출석부 목록 불러오기
    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(raidContent) && divideRoster[i].includes(sender)){
            var timeChangedRoster = divideRoster[i].split(',');
            timeChangedRoster[1] = startHR;
            timeChangedRoster[2] = startMIN;
            timeChangedRoster = timeChangedRoster.join(',');
            divideRoster.splice(i,1,timeChangedRoster);

            roster = divideRoster.join('\n');
            DoriDB.saveData(dbName, roster); //출석부 저장
            return readRoster(dbName, raidContent);
        }
    }
    return sender + "님이 참가하신 팟이 맞나요???\n팟에 참가하신 분만 변경 가능해요!";
}

function changeRosterContent(dbName, sender, rosterMSG){
    //711 4성 내용변경: 711 마기라스
    rosterMSG = rosterMSG.replace('팟',''); rosterMSG = rosterMSG.replace('내용변경',''); rosterMSG = rosterMSG.trim();
    var raidContent = rosterMSG.split(':')[1].trim();
    var previousContent = rosterMSG.split(':')[0].trim();
    var roster = DoriDB.readData(dbName); // 출석부 목록 불러오기
    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(previousContent) && divideRoster[i].includes(sender)){
            var contentChangedRoster = divideRoster[i].split(',');
            contentChangedRoster[3] = raidContent;
            contentChangedRoster = contentChangedRoster.join(',');
            divideRoster.splice(i,1,contentChangedRoster);

            roster = divideRoster.join('\n');
            DoriDB.saveData(dbName, roster); //출석부 저장
            return readRoster(dbName, raidContent);
        }
    }
    return sender + "님이 참가하신 팟이 맞나요???\n팟에 참가하신 분만 변경 가능해요!";
}

function deleteRoster(dbName, sender, rosterMSG){
    // 작은분수 팟 펑
    // 작은분수 팟 펑합니다
    rosterMSG = rosterMSG.replace('합니다',''); rosterMSG = rosterMSG.replace('팟 펑','');
    var raidContent = rosterMSG.trim();
    var roster = DoriDB.readData(dbName); // 출석부 목록 불러오기
    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(raidContent)){
            divideRoster.splice(i,1);
            roster = divideRoster.join('\n');
            if (roster==null){
                roster = '';
            }
            DoriDB.saveData(dbName, roster); //출석부 저장
            return raidContent + " 팟이 취소되었습니다.";
            break;
        }
    }
    return "헉 " + raidContent + " 팟 취소안됨;;";


}

function participateRoster(dbName, sender, rosterMSG){
    // 작은분수 팟 참석할게
    // 작은분수 미스틱1 인스1 참여
    var mysticNum=0; var valorNum=0; var instiNum=0; var etcNum=0;
    rosterMSG = rosterMSG.replace('할게',''); rosterMSG = rosterMSG.replace('팟','');
    rosterMSG = rosterMSG.replace('참석',''); rosterMSG = rosterMSG.replace('참여',''); rosterMSG = rosterMSG.trim();
    if (rosterMSG.includes("미스틱")){
        mysticNum = parseInt(rosterMSG.split('미스틱')[1].split(' ')[0]);
        if (!Number.isInteger(mysticNum)){
            mysticNum = 1;
        }
        rosterMSG = rosterMSG.slice(0,rosterMSG.indexOf('미스틱')) + rosterMSG.slice(rosterMSG.indexOf('미스틱')+4)    
    }
    if (rosterMSG.includes("발러")){
        valorNum = parseInt(rosterMSG.split('발러')[1].split(' ')[0]);
        if (!Number.isInteger(valorNum)){
            valorNum = 1;
        }
        rosterMSG = rosterMSG.slice(0,rosterMSG.indexOf('발러')) + rosterMSG.slice(rosterMSG.indexOf('발러')+3)    
    }
    if (rosterMSG.includes("인스")){
        instiNum = parseInt(rosterMSG.split('인스')[1].split(' ')[0]);
        if (!Number.isInteger(instiNum)){
            instiNum = 1;
        }
        rosterMSG = rosterMSG.slice(0,rosterMSG.indexOf('인스')) + rosterMSG.slice(rosterMSG.indexOf('인스')+3)    
    }
    rosterMSG = rosterMSG.trim();
    
    var accounts = '';
    for (var i = 0; i < mysticNum; i++){
        accounts = accounts + ',' + sender + ' [❄]'
    }
    for (var i = 0; i < valorNum; i++){
        accounts = accounts + ',' + sender + ' [🔥]'
    }
    for (var i = 0; i < instiNum; i++){
        accounts = accounts + ',' + sender + ' [⚡]'
    }

    if (mysticNum==0 && valorNum==0 && instiNum==0){
        accounts = ',' + sender + ''
    }
    var roster = DoriDB.readData(dbName); // 출석부 목록 불러오기
    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(rosterMSG)){
            var rosterToAdd = divideRoster[i] + accounts;
            divideRoster.splice(i,1,rosterToAdd);
            roster = divideRoster.join('\n');
            DoriDB.saveData(dbName, roster); //출석부 저장
            return readRoster(dbName, rosterMSG);
        }
    }
    return '앗 팟이 있는게 맞나요? 있다면 다시 말씀 해주시고, 없는 팟이라면 만드시는게 어떨까요?\n\n팟을 만드시려면\n몇시 몇분 어디 몇성 출석부 생성 이라고 말씀해주세요!';
}

function readRoster(dbName,rosterMSG){
    //작은분수 팟
    rosterMSG = rosterMSG.split('팟')[0].trim();
    var roster = DoriDB.readData(dbName); // 출석부 목록 불러오기
    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(rosterMSG)){
            var rosterToUse = divideRoster[i].split(',');
            var printOutRoster = rosterToUse[1] + ':' + rosterToUse[2] + ' ' + rosterToUse[3] + '\n';
            var mysticRoster = '';
            var valorRoster = '';
            var instinctRoster = '';
            var etcRoster = '';

            for (var j = 4; j < rosterToUse.length; j++){
                if (rosterToUse[j].includes('❄')){
                    mysticRoster = mysticRoster + ',' + rosterToUse[j];
                } else if (rosterToUse[j].includes('🔥')){
                    valorRoster = valorRoster + ',' + rosterToUse[j];
                } else if (rosterToUse[j].includes('⚡')){
                    instinctRoster = instinctRoster + ',' + rosterToUse[j];
                } else {
                    etcRoster = etcRoster + ',' + rosterToUse[j];
                }
                //printOutRoster = printOutRoster + (i-2) + '. ' + divideRoster[i] + '\n';
            }

            var allTeamRoster = mysticRoster + valorRoster + instinctRoster + etcRoster;
            if (allTeamRoster[0]==','){
                allTeamRoster = allTeamRoster.slice(1);
            }

            allTeamRoster = allTeamRoster.split(',');

            for (var j = 0; j < allTeamRoster.length; j++){
                printOutRoster = printOutRoster + (j+1) + '. ' + allTeamRoster[j] + '\n';
            }

            return printOutRoster;

        }
    }
    
    
    return "그런 팟은 없다"
}

function getOutFromRoster(dbName, sender, rosterMSG){
    // 작은분수 빠질게
    // 작은분수 빠지겠습니다
    rosterMSG = rosterMSG.split(' ')[0].trim();
    var roster = DoriDB.readData(dbName); // 출석부 목록 불러오기
    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(rosterMSG)){
            var initialRoster = divideRoster[i].split(',');
            var reWriteRoster = initialRoster[0] + ',' + initialRoster[1] + ',' + initialRoster[2] + ',' + initialRoster[3];
            for (var j = 4; j < initialRoster.length; j++){
                if (!initialRoster[j].includes(sender)){
                    reWriteRoster = reWriteRoster + ',' + initialRoster[j];
                }
            }            
            divideRoster.splice(i,1,reWriteRoster);
            roster = divideRoster.join('\n')
            DoriDB.saveData(dbName, roster); //출석부 저장
            return readRoster(dbName, rosterMSG);
        }
    }
    return '빠질 팟이 없는데?';
}

function rosterReset(dbName){ //출석부 리셋
    DoriDB.saveData(dbName, ''); return '모든 출석부가 삭제되었습니다.';
}

function vsDetermine(dbName,vsMSG){
    var vsData = DoriDB.readData(dbName); // vs데이터
    //렌토,캐논,결과값,몇회
    var vs1 = vsMSG.split('vs')[0].trim();
    var vs2 = vsMSG.split('vs')[1].trim();
    var vsDataList = vsData.split('\n');
    for (var i=0; i<vsDataList.length;i++){
        var vsDataListThatLine = vsDataList[i].split(',');       
        if ((vsDataListThatLine[0] + '' + vsDataListThatLine[1] == vs1 + '' + vs2) || (vsDataListThatLine[0] + '' + vsDataListThatLine[1] == vs2 + '' + vs1)){
            if (vsDataListThatLine[3] < 5){
                var valueChange = parseInt(vsDataListThatLine[3]) + 1;
                var valueReturn = vsDataListThatLine[2];
                vsDataListThatLine.splice(3,1,valueChange);
                vsDataListThatLine = vsDataListThatLine.join(',');
                vsDataList.splice(i,1,vsDataListThatLine);
                vsData = vsDataList.join('\n')
                DoriDB.saveData(dbName, vsData);
                return valueReturn;
            } else {
                var valueChange = 0;
                var valueReturn = vsMSG.split('vs')[Math.floor(Math.random() * 2)].trim();
                vsDataListThatLine.splice(3,1,valueChange);
                vsDataListThatLine.splice(2,1,valueReturn);
                vsDataListThatLine = vsDataListThatLine.join(',');
                vsDataList.splice(i,1,vsDataListThatLine);
                vsData = vsDataList.join('\n')
                DoriDB.saveData(dbName, vsData);
                return valueReturn;
            }
        }
    }
    var newResult = vsMSG.split('vs')[Math.floor(Math.random() * 2)].trim();
    vsData = vsData + '\n' + vs1 + ',' + vs2 + ',' + newResult + ',0';
    DoriDB.saveData(dbName, vsData); 
    return newResult;
}

function rockPaperScissor (yourPick){
    var myPick;
    var resultNum = Math.floor(Math.random() * 3);
    // 0은 이김, 1은 짐, 2는 비김
    if (resultNum == 0){ // 이긴거
        if (yourPick == '가위'){
            myPick = '제가 이겼어요!! 전 바위를 냈답니다😆'
        } else if (yourPick == '바위'){
            myPick = '제가 이겼어요!! 전 보를 냈답니다😆'
        } else if (yourPick == '보'){
            myPick = '제가 이겼어요!! 전 가위를 냈답니다😆'
        }
    } else if (resultNum == 1){ // 진거
        if (yourPick == '가위'){
            myPick = '제가 졌네요! 전 보를 냈어요😅'
        } else if (yourPick == '바위'){
            myPick = '제가 졌네요! 전 가위를 냈어요😅'
        } else if (yourPick == '보'){
            myPick = '제가 졌네요! 전 바위를 냈어요😅'
        }
    } else {
        myPick = '오옷 무승부에요!\n저도 ' + yourPick + '을 냈어요! 한판 더?😁'
    }
    return myPick;
}

function randomIVGen(){    
    return '개체값 ' + (Math.floor(Math.random() * 5)+1) + (Math.floor(Math.random() * 5)+1) + (Math.floor(Math.random() * 5)+1) + '로 찍습니다😆';
}

function sayItToHype (from, thisMessage){
    var messageStack = DoriDB.readData('toHype'); // 하입 목록 불러오기
    DoriDB.saveData('toHype',messageStack + '\n' + from + ' : ' + thisMessage);
}

function recordDori (thisMessage){
    var doriText = DoriDB.readData('doriTextStack'); // 도리 텍스트 목록 불러오기
    DoriDB.saveData('doriTextStack',doriText + '\n' + thisMessage);
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
    recordDori(msg);
    if (msg.includes('전달') && (msg.includes('하입') || msg.includes('띠꾸'))){
        sayItToHype(sender,msg);
        replier.reply('요구사항이 수집되었습니다');
    }
    
    if (msg.includes('자살')){
        msg = ' ';
    }
    
    if (msg == "이건 테스트야"){replier.reply("테스트테스트");}
    msg = msg.trim();sender = sender.trim();room = room.trim();preChat[room] = msg;
    procCmd(room, msg, sender, replier); //명령어

    if (botOn[room] == undefined) {botOn[room] = true;} // 해당 채팅방의 on/off 여부가 결정되어있지 않으면 on으로 설정
    if (botOn[room] == false) {return;} // 봇이 꺼져있으면 응답 안함

    var noReply = [".", "사진", "동영상", "음성메시지", "카카오톡 프로필", "(이모티콘)", "카카오링크 이미지"]; // 반응 안함
    for (var n = 0; n < noReply.length; n++) {if (msg == noReply[n]) return;}
    
    if (["도리", "도리야", "도리야!", "도리야아", "Dori", "도리야?", "도리야!", "도리야??"].indexOf(msg) != -1) { //도리에 반응
        switch (Math.floor(Math.random() * 11)) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                replier.reply("네! 무슨 일이신가요?");
                break;
            case 6:
            case 7:
            case 8:
                replier.reply("네! 부르셨나요!?");
                break;
            case 9:
                replier.reply("왜?");
                break;
            case 10:
                replier.reply("?");
                break;
        }
    }
    lastSender[room] = sender;
    
    if (sender.includes('/')){
        sender = sender.split('/')[0];
    }
    if (sender.includes(' ')){
        sender = sender.split(' ')[0];
    }
    
    //이 아래부터는 기본 정보 주는 곳
    var returnText = "none"; //마지막 답장
    var useReport = "report"; var useResearch = 'research'; var useRoster = 'roster';
    if (room.includes("고려대학교")){useReport = "korReport"; useResearch = "korResearch"; useRoster = 'korRoster'}
    if (room.includes("FANY")){useReport = "korReport"; useResearch = "korResearch"; useRoster = 'rosterETC'}
    
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
        
        if (msg.includes('vs') || msg.includes('VS')){
            msg.replace('VS','vs');
            //returnText = msg.split('vs')[Math.floor(Math.random() * 2)].trim();
            returnText = vsDetermine('vsResult',msg)
            msg = 'none';
        }
        
        if (msg == "사용법" || ((msg.includes("누구야?") && msg.includes("넌") || msg.includes("자기소개")))){
            returnText = keyToText(null,"doriguide");
        } else if (msg.includes("명령어 리스트")){
            returnText = keyToText(null,"commandList");
        } else if((msg.includes("입장 인사") || msg.includes("입장인사"))){
            var tempMsg = msg.split("님")[0]; msg = 'none';
            if (room.includes('고려대')){
                returnText = tempMsg + keyToText(null,"korNewbie");
            } else {
                returnText = tempMsg + keyToText(null,"newbie");
            }
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
        } else if (msg.includes('이로치')){
            returnText = keyToText(null,'shiny');
        } else if (msg == '출석부'){
            returnText = keyToText(null,'rosterSample');
        } else if (msg == '출석부 사용법'){
            returnText = keyToText(null,'rosterManual');
        } else if (msg == '패치노트'){
            returnText = keyToText(null,'patchNote');
        } else if (msg.includes('가위바위보')) {
            msg = msg.replace('가위바위보');
            if (msg.includes('가위') || msg.includes('바위') || msg.includes('보')){
                if (msg.includes('가위')){
                    returnText = rockPaperScissor('가위')
                } else if (msg.includes('바위')){
                    returnText = rockPaperScissor('바위')
                } else if (msg.includes('보')){
                    returnText = rockPaperScissor('보')
                }
            }
        }
        
        if(msg.includes('평가')){
            if(msg.includes('발러')){returnText = keyToText(null,"valorAppraise");}
            if(msg.includes('미스틱')){returnText = keyToText(null,"mysticAppraise");}
            if(msg.includes('인스')){returnText = keyToText(null,"instinctAppraise");}
        }
        
        if (msg.includes("정보") || msg.includes("개체") && !msg.includes('랜덤')){
            msg = msg.replace('백개체','정보'); msg = msg.replace('개체','정보'); msg = msg.split('정보')[0].trim();
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
        } else if (msg.includes('랜덤 개체값') || msg.includes('랜덤개체')){
            returnText = randomIVGen();
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
        } else if (msg.includes('위로')){
            var tempMsg = msg.split(' ')[0]; tempMsg.replace('님','')
            if (tempMsg == '나' || tempMsg.includes('위로')){
                returnText = "아쉽네요ㅠㅠ " + sender + " 위로해 😢😢😢";
            } else {
                returnText = "아쉽네요ㅠㅠ " + tempMsg + " 위로해 😢😢😢";
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
    if (msg.includes('팟 현황')){
        var roster = DoriDB.readData(useRoster); // 출석부 목록 불러오기
        var dummyRoster = roster + ' ';
        if (!dummyRoster.includes(',')){
            returnText = '현재 팟이 없네요! 팟을 직접 만드시는건 어떨까요!?\n\n예시)\n4시 45분 작은분수 출석부 생성\n3시 사과 미스틱2 인스1 팟 생성';
        } else {
            var divideRoster = roster.split('\n');
            var i = 0
            for (i = 0; i < divideRoster.length; i++){
                if (divideRoster[i].split(',')[3] != undefined){
                    replier.reply(readRoster(useRoster, divideRoster[i].split(',')[3] + ' 팟'));
                }
            }
            returnText = 'none';
        }

        msg = msg.replace('현황','');
    } else if (msg == '출석부 리셋' || msg == '팟 리셋'){
        returnText = rosterReset(useRoster);
    } else if (msg.includes('출석부 생성') || msg.includes('팟 생성')){ //출석부 (테스트X)
        returnText = createRoster(useRoster, sender, msg);
    } else if (msg.includes('시간변경:') || msg.includes('시간 변경:')){
        returnText = changeRosterTime(useRoster, sender, msg);
    } else if (msg.includes('내용변경:') || msg.includes('내용 변경:')){
        returnText = changeRosterContent(useRoster, sender, msg);
    } else if (msg.includes('인원변경:') || msg.includes('인원 변경:')){
        //711 인원변경: 미스틱1 발러1
        getOutFromRoster(useRoster,sender, msg.split('인원')[0].trim());
        msg = msg.replace('인원','').trim(); msg = msg.replace('변경:','').trim();
        returnText = participateRoster(useRoster, sender, msg);
    } else if (msg.includes('참여') || msg.includes('참석')){
        returnText = participateRoster(useRoster, sender, msg);
    } else if (msg.includes('팟 펑')){
        returnText = deleteRoster(useRoster,sender, msg);
    } else if (msg.includes('빠질게') || msg.includes('빠지겠습니다')){
        returnText = getOutFromRoster(useRoster, sender, msg);
    }
    
    //제보/삭제/만료/현황 구현 완료. 리서치 구현 나름 함 (테스트 X)
    if (msg.includes("현황") && !msg.includes("리서치")){
        returnText = raidReportReturn(useReport, null, null);
    } else if(msg.includes("리서치 목록") || (msg.includes('리서치') && msg.includes('현황'))){
        returnText = raidReportReturn(useResearch, null, null);
        msg = "끝났어!";
    } else if (msg == "제보 리셋" || msg == "제보 리셋해줘"){
        returnText = raidReportReturn(useReport, null, "DELETE ALL");
    } else if (msg.includes("제보 변경:") || msg.includes("제보변경:")){
        returnText = raidReportChange(useReport,msg,null);
        msg = msg.replace("제보","")
    } else if (msg =="리서치 리셋" || msg == "리서치 리셋해줘"){
        returnText = raidReportReturn(useResearch, null, "DELETE ALL");
    } else if ((msg.includes('삭제해줘') || msg.includes('삭제 해줘') || msg.includes('오보') || msg.includes("끝났어") || msg.includes("만료")) && !msg.includes("리서치")){
        msg = msg.replace('시간만료',''); msg = msg.replace('끝났어',''); msg = msg.replace('만료','');
        msg = msg.replace('삭제해줘',''); msg = msg.replace('오보',''); msg = msg.trim();
        returnText = raidReportReturn(useReport,null,msg);
        replier.reply(msg + " 제보가 삭제 되었습니다.");        
    } else if (msg.includes('리서치') && (msg.includes('삭제해줘')) || msg.includes('오보') || msg.includes('삭제 해줘')){
        returnText = deleteResearch(useResearch,msg);
    }
    if ((msg.includes("시") || msg.includes(":")) && msg.includes("제보") && !msg.includes("리서치")){        
        returnText = raidReportReturn(useReport, msg, null);
    } else if (msg.includes("리서치") && msg.includes("제보")){
        msg = msg.replace("제보", ""); msg = msg.replace("리서치",""); msg = msg.trim();
        returnText = researchReturn(useResearch, msg);
    }
    
    if ((msg == '전부 리셋')){
        returnText = raidReportReturn(useReport, null, "DELETE ALL");
        returnText = raidReportReturn(useResearch, null, "DELETE ALL");
        returnText = rosterReset(useRoster);
        returnText = '리서치 목록, 제보, 출석부가 전부 리셋되었습니다.';
    }
    
    ///////////////////// 상관 없는 것
    

    
    
    if (returnText != "none"){replier.reply(returnText);}
}
