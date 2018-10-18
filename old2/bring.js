var bossList = "테오키스,뮤츠,마기라스,보스로라,앱솔,알로라 텅구리,괴려몬,덩쿠리,폴리곤,메꾸리,알로라 라이츄,내루미,포푸니,킬리아,입치트,알로라 나시,비버니,귀뚤뚜기,꼬링크,이어롤\n테오키스,EX\n뮤츠,5\n마기라스,4\n보스로라,4\n앱솔,4\n알로라 텅구리,4\n괴려몬,3\n덩쿠리,3\n폴리곤,3\n메꾸리,3\n알로라 라이츄,3\n내루미,2\n포푸니,2\n킬리아,2\n입치트,2\n알로라 나시,2\n비버니,1\n귀뚤뚜기,1\n꼬링크,1\n이어롤,1"
var currentBoss = "오오오오"
var partyRaid = ""

var sender = "하입";
var msg = "12시 50분 민광 뮤츠 출석부" //12:50 민광 뮤츠 출석부

// 12:50 민광 뮤츠
// 몹: 뮤츠 / 현재 5계정
// 1.2. 캐논
// 3. 앱솔
// 4.5. 렌토

var bossList2 = bossList.split('\n')[0].split(',');

msg = msg.replace("출석부","");

for (var i = 0;i < bossList2.length;i++){
    if (msg.includes(bossList2[i])) {
        partyRaid = bossList2[i];
    }
}

console.log(partyRaid);