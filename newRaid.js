//출석부
//작은분수 1명 참석할게


/*
어느 부분까지 할까

출석부 생성 -> 키워드

3시 30분 작은분수 출석부 생성

3,30,작은분수,하입-미스틱,하입-발러,캐논-발러,캐논-발러,렌토-그외

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

3시 30분 작은분수 발러3 미스틱2 인스3 출석부 생성

*/
var sender = "하입";
var rosterMSG = "3시 30분 작은분수 발러3 미스틱2 인스3 출석부 생성";
var mysticNum; var valorNum; var instiNum; var etcNum;
rosterMSG = rosterMSG.replace('출석부',''); rosterMSG = rosterMSG.replace('생성',''); rosterMSG = rosterMSG.trim();
if (rosterMSG.includes("미스틱")){
    mysticNum = parseInt(rosterMSG.split('미스틱')[1].split(' ')[0]);
}
if (rosterMSG.includes("발러")){
    valorNum = parseInt(rosterMSG.split('발러')[1].split(' ')[0]);
}
if (rosterMSG.includes("인스")){
    instiNum = parseInt(rosterMSG.split('인스')[1].split(' ')[0]);
}
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
var roster = startHR + "," + startMIN + "," + raidContent + "," + sender;

console.log(roster);