/*Pokemon 객체*/

function dustLevel(value){
    if (value <= 30) return "좋음";
    if (value <= 80) return "보통";
    if (value <= 150) return "나쁨";
    return "매우나쁨";
}

function getTextFromWeb(url){
    try {
        var url = new java.net.URL(url);
        var con = url.openConnection();
        if (con != null) {
            con.setConnectTimeout(5000);
            con.setUseCaches(false);
            var isr = new java.io.InputStreamReader(con.getInputStream());
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            isr.close();
            br.close();
            con.disconnect();
        }
        return str.toString();
    } catch (e) {
        console.log(e);
    }
}


try {
    var data = getTextFromWeb("https://pokemon.gameinfo.io/ko/pokemon/24-arbok");
    console.log(data);
    /*
    data = data.split("미세먼지</strong>")[1].split("예측영상")[0].replace(/(<([^>]+)>)/g, "");
    data = data.split("단위")[0].trim().split("   ");
    for (var n = 0; n < data.length; n++) {
        var cc = data[n].trim().split(" ");
        data[n] = cc[0] + " : " + dustLevel(Number(cc[1])) + " (" + cc[1] + "μg/m³)";
    }
    var data2 = data.shift();
    data.sort();
    data.unshift(data2);
    console.log(data.join("\n"));
    */
} catch (e) {
    //Log.debug("미세먼지 정보 불러오기 실패\n오류: " + e + "\n위치: " + e.lineNumber);
    console.log("정보 불러오기 실패\n오류: " + e);
}


