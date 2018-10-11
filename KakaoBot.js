///storage/emulated/0

var store = [];

const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
const DB = {}; //파일 입/출력용 객제인데, 이름이 DB인건 기분탓

DB.createDir = function() { //배운 채팅들이 저장될 폴더를 만드는 함수
    var folder = new java.io.File(sdcard + "/Dori/"); //File 인스턴스 생성
    folder.mkdirs(); //폴더 생성
};
DB.saveData = function(name, msg) { //파일에 내용을 저장하는 함수
    try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
        var file = new java.io.File(sdcard + "/Dori/" + name + ".txt");
        var fos = new java.io.FileOutputStream(file);
        var str = new java.lang.String(msg);
        fos.write(str.getBytes());
        fos.close();
    } catch (e) {
        Log.debug(e + ", " + e.lineNumber);
    }
};
DB.readData = function(name) { //파일에 저장된 내용을 불러오는 함수
    try { //사실, 나도 어디서 긁어와서 이곳저곳에서 사용하는 거임
        var file = new java.io.File(sdcard + "/Dori/" + name + ".txt");
        if (!file.exists()) return null;
        var fis = new java.io.FileInputStream(file);
        var isr = new java.io.InputStreamReader(fis);
        var br = new java.io.BufferedReader(isr);
        var str = br.readLine();
        var line = "";
        while ((line = br.readLine()) != null) {
            str += "\n" + line;
        }
        fis.close();
        isr.close();
        br.close();
        return str;
    } catch (e) {
        Log.debug(e + ", " + e.lineNumber);
    }
};

DB.createDir();



function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    msg = msg.trim();
    if (msg == "/팝콘 on") {
        store.push(room);
        replier.reply("팝콘봇이 활성화되었습니다");
    }

    if (msg == "경로 알려줘"){
        replier.reply(sdcard);
    }
}