var newReport = '711고대이상점 찌리리공'

// 찾는다
// 리턴값은 미뇽


var currentReport = '리서치 목록\n\n[얼루기]\n711고대본점\n작은 분수\n김밥천국\n\n[미뇽]\n고고가\n얼씨구\n김밥천국 제일수서점';

var researchInfo = '얼루기,나이스 커브볼 2회\n고오스,그레이트 3회\n롱스톤,그레이트 3회 연속\n에버라스,엑셀런트 3회 연속\n찌리리공,나이스 5회'
//var researchInfo = DoriDB.readData(dbName); // 711고대본점 미뇽 or 711고대본점 물진화10회
var researchInput = newReport.split(' ')[newReport.split(' ').length-1] + '';
var researchInput2 = newReport.split(' ')[newReport.split(' ').length-2] + '';
var researchFind = researchInfo.split('\n');
var researchPokemonName = researchFind[0].split(',');
var foundIt = 0; var researchToPut = ''; var researchTitle = '';
for (var i = 0; i < 5; i++){
    if (researchFind[i].includes(researchInput)){
        researchToPut = newReport.replace(researchInput, ''); researchTitle = researchFind[i].split(',')[0] + ""; break;
    } else if(researchFind[i].includes(researchInput2)){
        researchToPut = newReport.replace(researchInput2, ''); researchTitle = researchFind[i].split(',')[0] + ""; break;
    }    
    
}

researchTitle = researchTitle.trim();

var researchBreakDown = currentReport.split('\n');

if (currentReport.includes(researchTitle)){
    for (var i = 0; i < researchBreakDown.length; i++){
        if (researchBreakDown[i].includes(researchTitle)){
            console.log("오이오이");
            console.log(researchTitle);
            researchBreakDown.splice(i+1,0,researchToPut);
            currentReport = researchBreakDown[0];
            break;
        }
    }
} else {
    researchBreakDown.splice(researchBreakDown.length,0,'[' + researchTitle + ']');
    researchBreakDown.splice(researchBreakDown.length,0,researchToPut);
}


for (var i = 1; i < researchBreakDown.length; i++){
    currentReport = currentReport + "\n" + researchBreakDown[i];
}

console.log(currentReport);


//researchToPut = 리서치 장소, researchTitle = 리서치 이름(미뇽 등)


//DoriDB.saveData(dbName, raidInfo + "\n" + newReport); //제보 등록