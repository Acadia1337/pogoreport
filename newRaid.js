var currentTime = new Date();
var raidList = "레이드 목록\n12,20,13,05,서울교회\n13,45,14,30,작은분수\n13,50,14,35,군인공제 5성\n14,00,14,45,타팰 사과 5성\n15,30,16,15,대치711"
//11:50
//11시50분
//11시50
//11시
//11시 50분
//설마 분과 시를 둘다 가진 체육관이름은 없겠지

function timeSet (raidContent){
    raidContent = raidContent.replace("제보",""); raidContent = raidContent.trim();
    var startHR; var startMIN; var endHR; var endMIN; var timeDivide = raidContent.split(" ");

    for (var i = 0; i < timeDivide.length; i++){ //시작 시와 분 구하기
        if (timeDivide[i].includes('시') && timeDivide[i].includes('분')){ //11시50분
            startHR = timeDivide[i].split('시')[0]; startMIN = timeDivide[i].split('시')[1].split('분')[0];
            raidContent = raidContent.replace(timeDivide[i],"");
        } else if (timeDivide[i].includes('시')){
            startHR = timeDivide[i].split('시')[0];
            if (Number.isInteger(parseInt(timeDivide[i].split('시')[1]))){ //11시50
                startMIN = timeDivide[i].split('시')[1];
            } else if (timeDivide[i+1].includes('분')){ //11시 50분
                raidContent = raidContent.replace(timeDivide[i+1],"");
                startMIN = timeDivide[i+1].split('분')[0];
            } else if (!timeDivide[i+1].includes('분')){ //11시
                startMIN = 0;
            }
            raidContent = raidContent.replace(timeDivide[i],"");
        } else if (timeDivide[i].includes(':')){ //11:50
            startHR = timeDivide[i].split(':')[0]; startMIN = timeDivide[i].split(':')[1];
            raidContent = raidContent.replace(timeDivide[i],"");
        }
    }
    startHR = startHR.trim(); startMIN = startMIN.trim(); raidContent = raidContent.trim();
    startHR = parseInt(startHR); startMIN = parseInt(startMIN);
    if (currentTime.getTime() > 10 && startHR < 10){
        startHR = startHR + 12;
    }
    if (startMIN < 15){ //끝나는 시, 분 구하기
        endHR = startHR;
        endMIN = startMIN + 45;
    } else {
        endHR = startHR + 1;
        endMIN = startMIN - 15;
    }
    if (startMIN < 0){
        startMIN = "0" + startMIN;
    }
    if (endMIN < 10){
        endMIN = "0" + endMIN;
    }
    
    var reportedTime = parseInt(endHR + '' + endMIN);
    var timeSort = raidList.split('\n');
    var compareTime; var reportIndex = 100;
    for (var i = 1; i < timeSort.length; i++){
        compareTime = parseInt(timeSort[i].split(',')[2] + timeSort[i].split(',')[3]);
        if (reportedTime <= compareTime){ // RT가 11시, CT가 12시면
            reportIndex = i; break;
        }
    }
    if (reportIndex == 100){ // 안돌았으니 제일 늦은시간대인거임
        raidList = raidList + "\n" + startHR + "," + startMIN + "," + endHR + "," + endMIN + "," + raidContent;
    } else { //아니면 해당 시간에 넣기
        timeSort.splice(i,0,startHR + "," + startMIN + "," + endHR + "," + endMIN + "," + raidContent);
        raidList = timeSort.join('\n');
    }
    return printReport(raidList);
}

function deleteThisReport (toDel){
    var pickDelLine;
    var delList = raidList.split("\n");

    for (var i = 0; i < delList.length; i++){
        if (delList[i].includes(toDel)){
            delList.splice(i,1); break;
        }
    }
    raidList = '레이드 목록'
    for (var i = 1; i < delList.length; i++){
        raidList = raidList + '\n' + delList[i];
    }
    return raidList;
}

function printReport (raidList){
    var listInTwelve = raidList.split('\n');
    var listForSending = "레이드 제보";
    for (var i = 1; i < listInTwelve.length-1; i++){
        var tempStartHR = parseInt(listInTwelve[i].split(',')[0]);
        var tempStartMIN = parseInt(listInTwelve[i].split(',')[1]);
        var tempEndHR = parseInt(listInTwelve[i].split(',')[2]);
        var tempEndMIN = parseInt(listInTwelve[i].split(',')[3]);
        //시간 지나면 자동 삭제 하기
        if ((currentTime.getHours() > tempEndHR) || ((currentTime.getHours() == tempEndHR) && currentTime.getTime() > tempEndMIN)){ // 시간이 더 크거나, 시간이 같지만 분이 더 클떄
            deleteThisReport(listInTwelve[i].split(',')[4]);
        } else {
            if (tempStartHR > 12){
                tempStartHR = tempStartHR - 12;
            }
            if (tempEndHR > 12){
                tempEndHR = tempEndHR - 12;
            }
            if (tempStartMIN < 10){
                tempStartMIN = "0" + tempStartMIN;
            }
            if (tempEndMIN < 10){
                tempEndMIN = "0" + tempEndMIN;
            }
            listForSending = listForSending + '\n' + tempStartHR + ':' + tempStartMIN + '~' + tempEndHR + ':' + tempEndMIN + ' ' + listInTwelve[i].split(',')[4];
        }
    }
    return listForSending;
}



//console.log(timeSet("11시 30분 711 제보"));
//console.log(timeSet('1시 50분 가라가라 제보'));
//console.log(delReport('군인공제 삭제해줘'));
//console.log(printReport(raidList));

console.log(currentTime.getHours());