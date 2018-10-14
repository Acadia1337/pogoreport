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
        return;
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


console.log(raidReport("재ㅑㄹㄴㅇ:ㄴㅇㄹ 제보"))