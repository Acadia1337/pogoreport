var msg = "구구 아아아아잉고ㅗ오오오 이게 뭐야아아아아"

msg = msg.split(" ");

var quoteName = msg[0]; 
var quoteQuote = "";
for (var i=1; i < msg.length; i++ ) {
    quoteQuote = quoteQuote + " " + msg[i];
}
quoteQuote = quoteQuote.trim();
console.log(quoteName);
console.log(quoteQuote);