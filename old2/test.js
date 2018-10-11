function bringTest(inputData1) {
    const myModule = require('./bring');
    let val = myModule.hello(); // val is "Hello"   
    return ("ohoh");
}

function response(room, msg, sender, isGroupChat, replier, imageDB) {

    if (msg=="도리야 방 정보"){
        replier.reply("Room : " + room);
        replier.reply("Sender : " + sender);
        replier.reply("isGroupChat : " + isGroupChat);
    }
    

    if (msg=='도리야' || msg=='도리' || msg=='도리!'){
        replier.reply("네! 부르셨나요?")
    }
    
    if (msg=='브링 테스트'){
        replier.reply(bringTest(1));
    }
}
