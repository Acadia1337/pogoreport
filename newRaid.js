//출석부
//작은분수 1명 참석할게


/*
어느 부분까지 할까

출석부 생성 -> 키워드

3시 30분 작은분수 출석부 생성

생성자,3,30,작은분수,하입-미스틱,하입-발러,캐논-발러,캐논-발러,렌토-그외

체육관 리스트에서 긁어오는건 나쁘지는 않은 아아디어 같긴 한데...

받을때

"나 1계정 갈게~"
"나 참석할게~" -> 팀이 없으므로 기타

"나 발러 1계정 참석할게~"

3:30 작은분수 기라티나 출석부
1. 하입 [미]
2. 하입 [발]
3. 캐논 [발]
4. 캐논 [발]
5. 렌토

//출석부 이름 변경 되어야함 -> 7:00 711 4성 아무거나 -> 7:00 마기라스
//출석부 시간 변경 가능해야함 -> 도리야 작은분수 팟 8시 30분으로 변경

3시 30분 작은분수 발러3 미스틱2 인스3 출석부 생성

*/

//var roster = null;
var roster = '하입,2,45,군인공제 기라티나,하입 [🔥]\n캐논,2,30,작은분수 기라티나,캐논 [🔥],캐논 [🔥],캐논 [🔥],캐논 [⚡],캐논 [⚡],캐논 [⚡]\n파이리,3,00,타팰 사과 뮤츠,파이리 [🔥],하입 [🔥],하입 [🔥]';

function createRoster(sender, rosterMSG){
    if (sender.includes('/')){
        sender = sender.split('/')[0];
    }
    if (sender.includes(' ')){
        sender = sender.split(' ')[0];
    }
    var mysticNum=0; var valorNum=0; var instiNum=0; var etcNum=0;
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
        accounts = sender + ''
    }
    var initialRoster = sender + ',' + startHR + "," + startMIN + "," + raidContent + accounts;
    if (roster == null){
        roster = initialRoster;
    } else {
        roster = roster + '\n' + initialRoster;
    }
    
    
    var divideRoster = initialRoster.split(',');
    printOutRoster = divideRoster[1] + ':' + divideRoster[2] + ' ' + divideRoster[3] + '\n';
    var mysticRoster = '';
    var valorRoster = '';
    var instinctRoster = '';
    var etcRoster = '';

    for (var i = 4; i < divideRoster.length; i++){
        if (divideRoster[i].includes('❄')){
            mysticRoster = mysticRoster + ',' + divideRoster[i];
        } else if (divideRoster[i].includes('🔥')){
            valorRoster = valorRoster + ',' + divideRoster[i];
        } else if (divideRoster[i].includes('⚡')){
            instinctRoster = instinctRoster + ',' + divideRoster[i];
        } else {
            etcRoster = etcRoster + ',' + divideRoster[i];
        }
        //printOutRoster = printOutRoster + (i-2) + '. ' + divideRoster[i] + '\n';
    }

    var allTeamRoster = mysticRoster + valorRoster + instinctRoster + etcRoster;
    if (allTeamRoster[0]==','){
        allTeamRoster = allTeamRoster.slice(1);
    }

    allTeamRoster = allTeamRoster.split(',');

    for (var i = 0; i < allTeamRoster.length; i++){
        printOutRoster = printOutRoster + (i+1) + '. ' + allTeamRoster[i] + '\n';
    }

    return printOutRoster;
}

function changeRosterTime(sender, rosterMSG){
    //도리야 작은분수 팟 8시 30분으로 시간변경
    //도리야 작은분수 팟 시간변경 8시 30분
    //도리야 작은분수 팟 시간변경: 8시 30분
    if (sender.includes('/')){
        sender = sender.split('/')[0];
    }
    if (sender.includes(' ')){
        sender = sender.split(' ')[0];
    }
    rosterMSG = rosterMSG.replace('시간 변경','');
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
    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(raidContent) && divideRoster[i].split(',')[0] == sender){
            var timeChangedRoster = divideRoster[i].split(',');
            timeChangedRoster[1] = startHR;
            timeChangedRoster[2] = startMIN;
            timeChangedRoster = timeChangedRoster.join(',')
            divideRoster.splice(i,1,timeChangedRoster);

            roster = divideRoster.join('\n')
            return readRoster(raidContent);
        }
    }
    return "변경 안됐는데"
}

function changeRosterContent(sender, rosterMSG){
    //711 4성 내용변경: 711 마기라스
    if (sender.includes('/')){
        sender = sender.split('/')[0];
    }
    if (sender.includes(' ')){
        sender = sender.split(' ')[0];
    }
    rosterMSG = rosterMSG.replace('내용 변경',''); 
    rosterMSG = rosterMSG.replace('팟',''); rosterMSG = rosterMSG.replace('내용변경',''); rosterMSG = rosterMSG.trim();
    var raidContent = rosterMSG.split(':')[1].trim();
    var previousContent = rosterMSG.split(':')[0].trim();
    
    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(previousContent) && divideRoster[i].split(',')[0] == sender){
            var contentChangedRoster = divideRoster[i].split(',');
            contentChangedRoster[3] = raidContent;
            contentChangedRoster = contentChangedRoster.join(',')
            divideRoster.splice(i,1,contentChangedRoster);

            roster = divideRoster.join('\n')
            return roster;
        }
    }
    return "변경 안됐는데"

}

function deleteRoster(sender, rosterMSG){
    // 작은분수 팟 펑
    // 작은분수 팟 펑합니다
    if (sender.includes('/')){
        sender = sender.split('/')[0];
    }
    if (sender.includes(' ')){
        sender = sender.split(' ')[0];
    }
    rosterMSG = rosterMSG.replace('합니다',''); rosterMSG = rosterMSG.replace('팟 펑','');
    var raidContent = rosterMSG.trim();

    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(raidContent) && divideRoster[i].split(',')[0] == sender){
            divideRoster.splice(i,1);
            roster = divideRoster.join('\n')
            return divideRoster[i].split(',')[3] + "팟이 취소되었습니다.";
            break;
        }
    }
    return "삭제 안됐는데"


}

function participateRoster(sender, rosterMSG){
    // 작은분수 팟 참석할게
    // 작은분수 미스틱1 인스1 참여
    if (sender.includes('/')){
        sender = sender.split('/')[0];
    }
    if (sender.includes(' ')){
        sender = sender.split(' ')[0];
    }
    var mysticNum=0; var valorNum=0; var instiNum=0; var etcNum=0;
    rosterMSG = rosterMSG.replace('할게',''); rosterMSG = rosterMSG.replace('팟','');
    rosterMSG = rosterMSG.replace('참석',''); rosterMSG = rosterMSG.replace('참여',''); rosterMSG = rosterMSG.trim();
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
        accounts = sender + ''
    }

    var divideRoster = roster.split('\n');
    var i = 0
    for (i = 0; i < divideRoster.length; i++){
        if (divideRoster[i].includes(rosterMSG)){
            var rosterToAdd = divideRoster[i] + accounts;
            divideRoster.splice(i,1,rosterToAdd);
            roster = divideRoster.join('\n')
            return readRoster(rosterMSG);
        }
    }
    return '안들어옴';
}

function readRoster(rosterMSG){
    //작은분수 팟
    rosterMSG = rosterMSG.split('팟')[0].trim();
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

function getOutFromRoster(sender, rosterMSG){
    // 작은분수 팟 빠질게
    // 작은분수 팟 빠지겠습니다
    if (sender.includes('/')){
        sender = sender.split('/')[0];
    }
    if (sender.includes(' ')){
        sender = sender.split(' ')[0];
    }
    rosterMSG = rosterMSG.split('팟')[0].trim();
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
            return readRoster(rosterMSG);
        }
    }
    return '빠질 팟이 없는데?';
}


//console.log(getOutFromRoster('하입','사과 팟 빠질게'));
//console.log(participateRoster('곰입','작은분수 팟 미스틱1 인스1 참여할게'));
//console.log(readRoster('작은분수 팟'));
//console.log(createRoster('캐논 발러 40','2:30 작은분수 기라티나 인스3 발러3 출석부 생성'));
//createRoster('캐논 발러 40','2:30 작은분수 기라티나 인스3 발러3 출석부 생성');

//console.log(roster);
/*
console.log('\n');
console.log(changeRosterContent('어어', '작은분수 내용변경: 작은분수 마기라스'));
console.log('\n');
console.log(deleteRoster('캬캬', '작은분수 팟 펑합니다'));
//console.log(roster);

*/

console.log(changeRosterTime('캐논','작은분수 시간변경: 9시 22분'));
