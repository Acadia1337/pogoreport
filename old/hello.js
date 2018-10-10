var currentTime = new Date();
var currentHour = currentTime.getHours();
var currentMinute = currentTime.getMinutes();

msg = "안녕"


if (currentHour > 11 && currentHour < 18){
    console.log("네 안녕하세요 트레이너님! 오늘도 좋은 하루 되세요😊😊😊");
} else if (currentHour > 17 && currentHour < 20) {
    console.log("네 트레이너님! 좋은 저녁이에요ㅎㅎ 저녁 맛있게 드세요~!😋😋😋");
} else if (currentHour > 19 || currentHour < 2){
    console.log("네 트레이너님! 좋은 밤 되세요~!!😴😴😴");
} else if (currentHour > 1 && currentHour < 5){
    console.log("헉 트레이너님! 안주무세요!?!? 어서 주무세요!!😱😱😱");
} else if (currentHour < 11){
    console.log("안녕하세요 트레이너님! 좋은 아침이에요😊😊😊");
} else {
    console.log("안녕하세요 트레이너님!☺️")
}

