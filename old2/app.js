//express 모듈 불러온 후 express 변수에 저장
var express = require('express');

// http 모듈 불러온 후 http 변수에 저장
var http = require('http');

// body-parser 모듈 불러온 후 bodyParser 변수에 저장
var bodyParser = require('body-parser');

// express 객체를 app 변수에 저장
var app = express();

// body-parser: 미들웨어 사용
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// http://서버주소/keyboard
app.get('/keyboard', function(req,res){
    //전달할 데이터
    var data={
        'type': 'buttons',
        'buttons': ['burrito','chipotle','salsa']
    };
    
    // JSON 형식으로 응답
    res.json(data);
});

// http://서버주소/message
app.post('/message', function(req,res){
    // 유저가 입력한 데이터
    var msg = req.body.content;
    console.log('전달받은 메시지: ' + msg);
    
    var send = {}; // 응답할 데이터
    
    switch(msg){
        case 'burrito':
            send = {
                'message': {
                    'text': 'yeaaaa burrito'
                }
            }
            break;
            
        case 'chipotle':
            send = {
                'message': {
                    'text': 'yeaaaaaaa chipotle'
                }
            }
            break;
            
        case 'salsa':
            send = {
                'message': {
                    'text': 'salsalsalsalsalsa'
                },
                keyboard: {
                    'type': 'buttons',
                    'buttons': ['test1','test2']
                }
            }
            break;
        
        default:
            send = {
                'message':{
                    'text': '알 수 없는 명령입니다.'
                }
            }
            break;
    }
    
    res.json(send); // send 변수에 저장된 데이터 전달
})

// 9090포트로 서버 실행
http.createServer(app).listen(9090, function(){
    console.log('server running');
});