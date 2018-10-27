
function quoteRegister (personName, newQuote){
    var quoteInfo = DoriDB.readData("quote");
    var keyNumber; var quoteToUse;
    var divideCategory = quoteInfo.split("\n"); //첫 줄 빼기용
    var keySelect = divideCategory[0].split(",");
    if (divideCategory[0].includes(personName)){ //이미 명언에 사람이 등록되어있다면
        keyNumber = keySelect.indexOf(personName);
        divideCategory[keyNumber] = divideCategory[keyNumber] + "," + newQuote;
    } else { // 등록되어있지 않다면 새로 등록
        keySelect = keySelect + "," + personName;
        quoteInfo = quoteInfo + "\n" + personName;
        divideCategory.push(personName + "," + newQuote);
    }
    var newQuoteInfo = keySelect;
    for (var i=1; i<divideCategory.length; i++){
        newQuoteInfo = newQuoteInfo + "\n" + divideCategory[i];
    }
    newQuoteInfo = newQuoteInfo.trim();
    DoriDB.saveData("quote", newQuoteInfo);
    return personName + "님의 명언이 등록되었습니다.";
}
