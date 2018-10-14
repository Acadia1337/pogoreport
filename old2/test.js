var msg = "구구 감자감자 오토케 명언등록"

if (msg.includes('명언등록') || msg.includes('명언 등록')){
    msg = msg.replace('명언등록',''); msg = msg.replace('명언 등록',''); msg = msg.trim();
    msg = msg.split(" ");
    var quoteName = msg[0]; var quoteQuote = "";
    for (var i=1; i < msg.length; i++ ) {
        quoteQuote = quoteQuote + " " + msg[i];
    }
    quoteQuote = quoteQuote.trim();
}

console.log(quoteName);
console.log(quoteQuote);

