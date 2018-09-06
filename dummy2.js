var report = "도곡방 레이드 제보\n3:18~3:43 작은분수\n4:15~5:00 사과";


var currentTime = new Date();
var currentHour = currentTime.getHours();
var currentMinute = currentTime.getMinutes();

var withoutSen = report.split('\n');




var i;
for (i = 1; i<withoutSen.length;i++){
    if(withoutSen[i][1] == ':'){
        
    }
    console.log(withoutSen[i])
}