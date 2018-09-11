var msg = "구구 명언 어저구 저쩌구 어쩌구 저쩌구"

if(msg.includes('명언')){
    msg = msg.replace('명언','');
    msg = msg.split(" ");
    var newDict = msg[0];
    var newQuote = msg.slice(1 + '');
    var newQuoteSentence = newQuote[0];
    
    for (var i = 1; i < newQuote.length; i++){
        newQuoteSentence = newQuoteSentence + ' ' + newQuote[i];
    }
    if (newQuoteSentence[0] == ' '){
        newQuoteSentence.replace(' ','');
    }
    if (newQuoteSentence.includes == '  '){
        newQuoteSentence = newQuoteSentence.replace('  ',' ');
    }
    if (newQuote == 'undefined'){
        newQuote.replace('undefined','');
    }
    if (newQuote.isUndefined){
        newQuote = 'it was empty';
    }
}


console.log(newQuoteSentence);
console.log(newQuote);