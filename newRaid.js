
var raidList = "레이드 목록\n3,45,4,30,작은분수\n3,50,4,35,군인공제 5성\n3,55,4,40,우성정문 5성"
//11:50
//11시50분
//11시50
//11시
//11시 50분
//설마 분과 시를 둘다 가진 체육관이름은 없겠지

function timeSet (raidContent){
    raidContent = raidContent.replace("제보",""); raidContent = raidContent.trim();
    var startHR; var startMIN;
    var endHR; var endMIN;
    var timeDivide = raidContent.split(" ");

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

    if (startHR > 12){ //시작시간 12시간으로
        startHR = startHR - 12;
    }
    if (startMIN < 15){ //끝나는 시, 분 구하기
        endHR = startHR;
        endMIN = startMIN + 45;
    } else {
        endHR = startHR + 1;
        endMIN = startMIN - 15;
    }
    if (endHR > 12){ //끝나는 시간이 13시면 1시로
        endHR = endHR - 12;
    }
    if (startMIN == 0){
        startMIN = "00"
    }
    if (endMIN == 0){
        endMIN = "00"
    }

    raidList = raidList + "\n" + startHR + "," + startMIN + "," + endHR + "," + endMIN + "," + raidContent;
    return raidList;
}

function delReport (toDel){
    var pickDelLine;
    toDel = toDel.replace('삭제해줘',''); toDel = toDel.replace('제거해줘',''); toDel = toDel.replace('끝났어',''); toDel = toDel.trim()
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

console.log(delReport("군인공제 삭제해줘"));