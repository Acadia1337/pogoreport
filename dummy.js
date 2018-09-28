var currentTime = new Date();
var currentHour = currentTime.getHours();
var currentMinute = currentTime.getMinutes();

var report = "도곡방 레이드 제보";
var reportDefault = "도곡방 레이드 제보";

var msgDetermine = '';
var msgCall = '';
var verifyReport = 0;
var randDict;

var researchReport = "도곡방 리서치 목록";
var reserachReportDefault = "도곡방 리서치 목록";

var ttikku = {
    1 : '띠꾸혀엉',
    2 : '띠꾸혀어엉',
    3 : '띠꾸혀어어엉',
    4 : '띠꾸혀어어어엉',
    5 : '띠꾸혀어어어어엉',
    6 : '띠꾸혀어어어어어엉',
    7 : '띠꾸혀엉...',
    8 : '띠꾸혀어엉...',
    9 : '노래도잘하는띠꾸혀엉',
    10 : '띠꾸띠꾸씰',
    11 : '원숭이띠꾸혀엉',
    12 : '띠꾸혀어어어어어어어어어어어어어어어어어어엉',
    13 : '딥-띠꾸',
    14 : '빛-띠꾸',
    15 : '띠꾸혀어엉이구나',
    16 : '띠꾸혀어어엉!!',
    17 : '원로띠꾸혀엉',
    18 : '뉴발신는띠꾸혀어엉',
    19 : '띠꾸혀어엉',
    20 : '어디에나있는띠끄혀어엉...',
    21 : '부기띠끄',
    22 : '띠끄혀어엉',
    23 : '부띠끄',
    24 : '티꾸혀어엉',
    25 : '티꾸',
    26 : '티꾸혀어엉의',
    27 : '티꾸티꾸씰ㅋㅋㅋㅋㅋㅋㅋ',
    28 : '티꾸라파닭',
    29 : '티꾸닭',
    30 : '티꾸혀엉',
    31 : '티꾸다',
    32 : '띠꾸혀어어어어어엉',
    33 : '띠꾸혀어어엉',
    34 : '띠꾸혀어어어어어엉',
    35 : '띠꾸혀어어엉',
    36 : '띠꾸형!',
    37 : '미스티꾸',
    38 : '미스티꾸혀엉',
    39 : '하입님.',
    40 : '띠꾸혀어어어어어엉',
    41 : '응띠꾸혀엉',
    42 : '띠꾸르손',
    43 : '내가 이구역의 티꾸형이다!',
    44 : '골목대장 띠꾸혀어엉',
    45 : '띠꾸혀엉월드 한티꾸혀엉역점'
};

var manual = {
    '레이드' : '포고봇 레이드 관련 설명\n제보 포맷: "12:30 사과 제보" or "사과 12시30분 제보" 등 시간과 장소(체육관명)과 제보 이 3가지가 충족이 되면 반응해요!\n만약 제보가 잘못되었다면, "사과 오보", "사과 삭제해줘" 등으로 말하시면 바로 지울게요!\n제가 알아서 시간이 지난 레이드는 지우지만, 만약 안지워졌다면 "사과 만료" 나 "사과 끝났어" 등으로 말해주세요! 제보 현황은 언제든지 "현황"을 치시면 알 수 있어요!',
    '정보' : '"도리야 가이오가 백개체" 등 도리야를 붙여서 불러주세요! 파이어 이벤트나, 다가오는 커뮤니티데이, 마기라스 레이드 성공기준, 둥지 정보, 지역락 포켓몬, 미스틱 평가 대사 등 이것저것 알려드릴게요! 제가 만약 모르는 정보라면 기억 해두었다가 알아올게요!',
    '명령어' : '레이드: __시__분 (체육관명) 제보\n레이드 삭제: (체육관명) 삭제\n그 외: 도리야 + 명령어 (백개체, 둥지, 이벤트, 커뮤니티데이, 지역락, 이브이, 진화도구, 경험치, 팀 평가, 도곡방 트레이너 코드)'
};

var goodByeDict = {
    1: "안녕히주무세요~!!😆😆😆",
    2: "좋은 밤 되세요!😆",
    3: "좋은 꿈 꾸시길 바랄게요!!😴😴😴",
    4: "주무세요! 내일 일어나자마자 이로치가 잡히길 바랄게요😊😊😊",
    5: "네😊😊오늘도 수고하셨어요! 내일은 더 높은 개체치의 포켓몬이 기다릴거에요!",
    6: "앗! 오늘 선물은 다 여셨나요? 안여셨으면 열고 주무세요!😦😦",
    7: "오늘 리서치는 다 끝내신건가요?? 한번 확인해보시는건 어때요??😊"
}

var goodMorningDict = {
    1: "좋은 아침이에요 😆😆😆",
    2: "굿모닝 😆",
    3: "아침에 일어나서 양재천을 바라보았는데, 미뇽이 보인것 같았어요. 😊",
    4: "잘 주무셨나요? 전 잘 잤답니다. 배터리도 100%에요! 😎😎😎",
    5: "좋은 아침!! 오늘도 화이팅이에요~ 😊",
    6: "굿모닝!! 모닝 제보는 생명!! 제보 부탁드려요ㅎㅎ",
    7: "네!! 트레이너님도 오늘 고개체와 이로치가 함께하는 하루가 되시길 빌어요! 😆😆😆"
}

var lunchMenu = {
    1: "오늘은 뜨뜻한 국물이 땡기니까, 치킨",
    2: "으음..역시 치킨이겠죠?",
    3: "매봉역에 되게 맛있는 버거집이 있다고 하던데, 치킨은 어떠세요?",
    4: "치킨",
    5: "날씨가 슬슬 쌀쌀해지네요! 춥지말라구 치킨!",
    6: "제가 제일 좋아하는 음식은 부리또에요! 그러니까 오늘은 트레이너님도 치킨 드시는건 어때요?",
    7: "CHICKEN",
    8: "대치역에 맥도날드가 사라지고, BBQ가 생겼더라구요! 그러니까 치킨!",
    9: "아무래도 치킨이 제일 좋겠죠?",
    10: "치킨!!!!치킨!!!! 치킨 외에 생각할게 더 있나요?",
    11: "포이동쪽에 램플러스 양꼬치를 먹어봤는데, 그저 그랬어요. 그거라도 드시는건?",
    12: "절 만드신 분은 가장 좋아하는 음식이 부리또래요. 강남역 6번출구에 쿠차라는 어떠세요?",
    13: "참치김밥 어때요..? 입에 넣자마자 깻잎향이 가득~",
    14: "저기압일땐 고기앞으로 가라",
    15: "하남돼지집 특별 한판 콜?",
    16: "개인적으로 강남구 1티어 버거 풍류랑을 추천합니다",
    17: "희래닭갈비라구 양재동에 있는건데, 수요미식회에도 나온거에요! 가격대비 양은 적지만 맛은 굳bb 추천해요!",
    18: "아카데미 스위트 지하 1층에 있는 자연별곡 어때요?!...아...맞다 망했지",
    19: "간편한 일본 가정식 어때요? 강남역에 오후정 본점 추천해요!",
    20: "가끔은 동남아 음식도 좋은 것 같아요! 매봉역 포브라더스 굳굳bb",
    21: "(물론 풍류랑이 최고지만) 양재역에 제레미 버거도 나쁘지 않더라구요! 그거라도?",
    22: "김밥 천국",
    23: "KFC 징거더블다운맥스 세트",
    24: "굳이..저한테까지 추천을 받으셔야한다면 롯데리아 모짜렐라 인더버거 더블 추천드려요! 롯데리아에서 다른건 그닥...",
    25: "매봉역에 평양면옥 어때요? 깔끔한 국물~ 따뜻한 온면도 있어요!",
    26: "반트에 있는 그안의 카페산테가 상당히 맛있더라구요! 분위기도 있게 콜?😎",
    27: "몸도 으슬으슬한데 김영모빵집 위에 국시집가서 국밥 한그릇 캬~",
    28: "쿠이송82가서 삼겹살을 먹었는데, 맛있더라구요! 추천추천!😊",
    29: "예전에 콜라겐 팩토리 가서 수육인가 뭔가를 먹었는데 별로였어요...그러니까 치킨 어때요?",
    30: "음 갑자기 청양고추 송송 넣은 바지락 칼국수가 땡기네요. 칼국수!",
    31: "두유노 김치? 스팸과 함께 김치를 싸서 드셔보세요",
    32: "가로수길에 있던 제가 엄청 좋아하던 그릴5타코 라는 음식점이 결국 철수를 했는데요, 그 음식점을 기리면서 부리또는 어떨까요?",
    33: "요즘 대기업들이 하는 분짜어때요?? 분짜라붐도 좋구 에머이도 좋구~",
    34: "청담에 에크미 키친이라구 남부쪽 미국음식 하는곳이 있는데! 괜찮더라구요! 패스트푸드가 아닌 미국음식 어떤가요??",
    35: "간장게장 간자아아아앙게장 간장게장 간장게장 간장게장 어때요~?",
    36: "영양센터 대치점은 제가 초등학교때부터 많이 갔던 곳인데! 하나도 안바뀌어서 놀랐어요!! 물론 가격은 많이 바뀌었지만....오늘은 삼계탕 어떠세요!?😊",
    37: "평.양.냉.면 1티어 우.래.옥",
    38: "한번정도는 백종원의 푸드트럭 가보시는 것 어떤가요?? 강남역에 핫도그 아저씨 아직도 있어요!",
    39: "고기 주는 냉면집이라는데, 그렇게 고기를 많이 주진 않더라구요. 그래도 오늘은 육쌈냉면 어떠세요?",
    40: "아ㅡ치킨먹고싶다",
    41: "국물이 깔끔한 돈코츠라멘 어떠세요? 마음까지 따뜻해질거에요.😊",
    42: "짭조름한고 매콤한 마라탕! 저번에 먹고 물 2리터 마셨어요! 으악",
    43: "밥은 대충 드시고, 꾸덕꾸덕한 치즈케이크 드시러 가는건 어때요!? 꾸덕꾸덕😆😆😆",
    44: "원스타라고 햄버거집 가봤는데, 별로에요 맥날급임.😑 그래도 인테리어 때문에 한번쯤 가볼만해요.",
    45: "완전 진짜 바베큐 어때요?! 바베쿡스나 빕스 레츠꼬꼬꼬",
    46: "절 개발하신 분은 어릴때 이촌동에서 살았었어요! 이촌동에 일식집 미타니야가 있었는데, 도곡 왔는데 또 있지 뭐에요~ 나베를 자주 먹었었는데!! 오늘은 얼큰~한 나베 어때요??",
    47: "진.대.감. 차.돌.삼.합 (홍어 없음)",
    48: "몇년전에 수요미식회 극초반에 나왔던 대치 정육식당 어때요? 정육점에서 아주 아주 질 좋은 고기를 대충 어슷썰어서 먹는데 아주 신기한 경험이였어요😊",
    49: "냄새가 나는 분들은 조금 힘들수도 있지만, 아주 깔끔한 순댓국 어때요?? 밥 말아서 뚝딱!😆",
    50: "꾸덕한 치즈으으가 많이 들어간 시카고 피자!!! 아니면 피자헛 팬 치즈 피자에 치즈토핑 추가! 그것도 아니면 코스트코에서 치즈피자 한판! 피자피자 피자먹어요!"
}

var goodJob = {
    1 : "헤헤, 감사해요. 더 노력할게요 😊😊😊",
    2 : "별 말씀을요~! 이게 제 일인걸요!!😆😆😆",
    3 : "ㅎㅎㅎ감사합니다. 도움이 되어 기쁘네요! 😊",
    4 : "넵ㅎㅎㅎ트레이너님도 고생많으셨어요!😆😆😆",
    5 : "언제든지 불러만주세요 😎"
}

var quoteFind = {
    "구구" : {
        key1 : 'ㅋㅋㅋ 이번학기 끗나고 자퇴할거에여!! - 구구',
        key2 : '구↗우↘ 비둘기야 먹자구구구구구(딱딱딱딱딱) 구우 구구구구구(딱딱딱) 구우우구우우구↗우우우우우↘(딱딱딱)마시쩡? 마시쩡!오.↗구구구구(딱딱딱딱) 구우우우우우 (헣헠) 구우우우↗우우우국물처머겅 (구우우↗으핳하핳하핳핳핳핳핳핳하하하핳핳)야!!! 구웃? 구↗구구구구구구구구구구 (으하하하핳)(어어얽!)(으헤하하핳하핳핳)(엇!) 구구구구구구(으하하핳하핳하하핳)',
        key3 : '치킨 쏩니다. 줄서세요 - 구구',
        key4 : '엑셀 한번 맞춰보시지? ;-) - 구구',
        key5 : '구구와 저는 일심동체란 말입니닷. - 피죤투',
        key6 : '피존투로 참여해야징 - 구구',
        key7 : '구구가 파이리를 공격하는 짤을 암만뒤졌으나 없으므로 조만간 합성할겁니다.. - 구구',
        key8 : '비둘기의 은총이 함께하시길...☆ - 구구',
        key9 : '피존투로 참여해야징 - 구구',
        key10 : '구구효과 라고하죠\n구구의 분노에 찬 날갯짓 한번이 지구에 재앙을 가져오는..'
    },
    "렌토" : {
        key1 : '호구....ㄹ - 렌토',
        key2 : 'ㅋㅋ그래도 다들 포고하시는 순간만큼은 행복하셨으면 해요~ - 빛 렌 토',
        key3 : '포고는 계정빨이다 - 렌토',
        key4 : '속토대장정 - 렌토',
        key5 : '술내이니용 - 왕왕취렌',
        key6 : '술 드실래요? - 취렌',
        key7 : '어니부기를 패보겠습니당!어니부기 -((◕ˇ﹏ˇ◕  - ))으으으으읏!얍! (╯°□°)╯︵ - 렌토',
        key8 : '캐논님!! - 렌토',
        key9 : '퍽 - 렌토',
        key10 : '취하셨군요... - 안취한 렌토'
    },
    "캐논" : {
        key1 : '네 제가 그런 헤비유저입니다! - 캐논 (만렙)',
        key2 : '어차피 오래 할 게임 현질은 제일 큰 단위로 하자. 빚은 미래의 내가 갚아줄 것이다. - 캐논',
        key3 : '술토 - 술논',
        key4 : '요새는 부캐도 본캐와 똑같이 현질합니다 - 캐논',
        key5 : '(아이폰6s를 자랑하며)네 사실 포고하려고 샀읍니다 - 캐논',
        key6 : '엌ㅋㅋㅋㅋ - 캐논, 뼈 맞으며',
        key7 : '저는아무것도아닌유저인데.. - 캐논 (만렙, 부캐도 곧 만렙)  ',
        key8 : 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ예??????? - 캐논, 팩트를 맞으며',
        key9 : '부캐는 022고.. 본캐는 정확히는 020입니다 - 캐논',
        key10 : '아 저 치코리타 cp표는 진짜 안만들겁니다 아무도 안보실듯... - 캐논, 엑셀 시트를 켜며',
        key11 : '소주빼면 다뺀거져모 - 캐논',
        key12 : '으르릉...으르릉컹컹왈왈쾅 - 캐논',
        key13 : '여기는 음해와 왜곡으로 승부하는 고대방입니다 - 캐논',
        key14 : '저는 포켓몬 master가 될거에요!! - 캐논'
    },
    "부기" : {
        key1 : '얼른 따라잡겠습니다! - 부기 (남들보다 2주 일찍 개강)',
        key2 : '저도 패겠습니다ㅎㅎ - 부기',
        key3 : '부기 투나잇! - 부기',
        key4 : '취하지 않았습니다! - 새벽부기',
        key5 : '놀토...그런게 있었다고만 알고 있어요~ ^~^ - 부기 (놀토세대)',
        key6 : '렌토님! - 부기',
        key7 : '띠꾸혀어어어엉 - 부기',
        key8 : '렌토계정은 빛-계정이다. - 부기',
        key9 : '포고는 끈기다 - 부기',
        key10 : '렌토잡는 부기! - 폭행부기'
    },
    "이리" : {
        key1 : '캐논뼈 - 이리',
        key2 : '캐뼈 - 이리',
        key4 : '좋은 단백질은 내가 섭취한 단백질뿐이다 - 파이리 (어깨깡패)',
        key5 : '파비장 - 이리',
        key6 : '정보) 캐논>>>>시코>이리>렌토>속초=피츄',
        key7 : '저 같이 착한 사람한테 어떻게 그런 부탁을 하십니까??? - 이리',
        key9 : '도대체 뭔 짓을 해야 씨쁠을 받지? - 이리'
    },
    "호굴" : {
        key1 : '(신나)',
        key2 : '(하하)',
        key3 : '(우와)',
        key4 : '(심각)',
        key5 : '(흑흑)',
        key6 : '내적 친밀감',
        key7 : '(이모티콘)',
        key8 : '(신나)',
        key9 : '(신나)',
        key10 : '(신나)'
    },
    "하입" : {
        key1 : "후...다 때려치고 연애나 하고 싶다",
        key2 : "이 봇은 인공지능이 아닌 내가 다 노가다로 때려박는 멍청이 심심이다",
        key3 : "아 출근하기 싫다",
        key4 : "퇴근하고 싶다 - 하입 (출근 30분 전)",
        key5 : "개인적으로 햄버거는 매봉역 풍류랑이 제일 맛있다고 생각합니다",
        key6 : "이스터 에그 넣어놨는데 아무도 못 찾을듯. 힌트는 없음",
        key7 : "나이언틱은 서울포켓몬맵을 되살려라. 되살려라",
        key8 : "꿈은 없구요, 놀고 싶습니다 - 박명수",
        key9 : "나만 이로치 없어..",
        key10 : "무슨 부귀영화를 누리자고 이걸 만들고있지 후"
    },
    "몬" :  {
        key1 : "덕분에 레이드 잘 했어요 - mon12",
        key2 : "으아아아아아 아빠 나 물짱이!!!! 으아아아아!!! -mon12",
        key3 : "오오..! (레바 이모티콘)",
        key4 : "엄지척 (레바 이모티콘)",
        key5 : "(남이 선물 막 열다 울프되어버렸다는 말을 듣고) 괜찮습니다 허허 저는 원래 알 안키는 걸요. 오히려 님이 알을 못켜신것 같아 안타깝네요 - 몬 (생불)"
    },
    "속초" : {
        key1 : "성공해서 신촌 땅을 전부 제가 사겠습니다 - 속초"
    },
    "가이오가고" : {
        key1 : "죄송합니다 수람시는 중이라 - 가이오가고",
        key2 : "월요일에 수람시는 내가 인싸다 이 아싸들아 - 가이오가고",
        key3 : "내가 해피가 없지!! 소주가 없냐!! - 취이오가고"
    },
    "피츄" : {
        key1 : "진정한 인싸 - 피츄"
    },
    "파비" : {
        key1 : "제가 '그' 파비코리입니다 뽑아주세요 - 파비",
        key2 : "띠꾸혀어엉",
        key3 : "파그네"
    },
    "에쇼" : {
        key1 : "에쇼했다 - 에쇼(파괴왕)",
        key2 : "엌 - 에쇼"
    },
    "복귀" : {
        key1 : ""
    },
    "감자" : {
        key1 : ""
    },
    "디그다" : {
        key1 : ""
    },
    "해송" : {
        key1 : ""
    },
    "멍내" : {
        key1 : ""
    },
    "보만다" : {
        key1 : ""
    },
    "소닉" : {
        key1 : ""
    },
    "시코님" : {
        key1 : ""
    },
    "아스" : {
        key1 : ""
    },
    "애러드" :{
        key1 : ""
    },
    "윤재당" : {
        key1 : ""
    },
    "집둥" : {
        key1 : ""
    },
    "카론" : {
        key1 : "집에가고싶ㅠ론",
        key2 : "빛-론",
        key3 : "갓-론",
        key4 : "흑염-론",
    },
    "파도타기" : {
        key1 : ""
    },
    "퍄" : {
        key1 : ""
    },
    "퍄퍄" : {
        key1 : ""
    }
}

var nestDict = "<9.20~10.04 둥지 정보>\n(관동 이벤트 종료와 함께 바뀔 수 있습니다)\n\n경복궁 : 암나이트\n낙산공원 : 둔타\n마로니에 공원 : 주벳\n보라매공원 : 투구\n서울숲 : 침바루\n올림픽공원 : 왕눈해\n응봉공원 : 브케인\n창덕궁 : 갈모매\n평화의공원 : 잉어킹\n한강시민공원(뚝섬지구) : 에레브\n훈련원공원 : 야돈\n상암월드컵 경기장 : 쥬쥬\n서서울호수공원 : 모다피\n선유도 공원 : 코코파스\n신트리공원 : 단단지\n오목공원 : 스라크\n분당중앙공원 : 해골몽";

function quoteRegister (msgWord, msgInput){
    var msgQuote = msgInput;

    var newDict = msgWord;
    var i;

    if (quoteFind[newDict].key1 === ''){
        quoteFind[newDict].key1 = msgQuote;
    } else if (quoteFind[newDict].key2 === undefined){
        quoteFind[newDict].key2 = msgQuote;
    } else if (quoteFind[newDict].key3 === undefined){
        quoteFind[newDict].key3 = msgQuote;
    } else if (quoteFind[newDict].key4 === undefined){
        quoteFind[newDict].key4 = msgQuote;
    } else if (quoteFind[newDict].key5 === undefined){
        quoteFind[newDict].key5 = msgQuote;
    } else if (quoteFind[newDict].key6 === undefined){
        quoteFind[newDict].key6 = msgQuote;
    } else if (quoteFind[newDict].key7 === undefined){
        quoteFind[newDict].key7 = msgQuote;
    } else if (quoteFind[newDict].key8 === undefined){
        quoteFind[newDict].key8 = msgQuote;
    } else if (quoteFind[newDict].key9 === undefined){
        quoteFind[newDict].key9 = msgQuote;
    } else if (quoteFind[newDict].key10 === undefined){
        quoteFind[newDict].key10 = msgQuote;
    } else if (quoteFind[newDict].key11 === undefined){
        quoteFind[newDict].key11 = msgQuote;
    } else if (quoteFind[newDict].key12 === undefined){
        quoteFind[newDict].key12 = msgQuote;
    } else if (quoteFind[newDict].key13 === undefined){
        quoteFind[newDict].key13 = msgQuote;
    } else if (quoteFind[newDict].key14 === undefined){
        quoteFind[newDict].key14 = msgQuote;
    } else if (quoteFind[newDict].key15 === undefined){
        quoteFind[newDict].key15 = msgQuote;
    } else if (quoteFind[newDict].key16 === undefined){
        quoteFind[newDict].key16 = msgQuote;
    } else if (quoteFind[newDict].key17 === undefined){
        quoteFind[newDict].key17 = msgQuote;
    } else if (quoteFind[newDict].key18 === undefined){
        quoteFind[newDict].key18 = msgQuote;
    } else if (quoteFind[newDict].key19 === undefined){
        quoteFind[newDict].key19 = msgQuote;
    } else if (quoteFind[newDict].key20 === undefined){
        quoteFind[newDict].key20 = msgQuote;
    }
}

function timeCheck (report){
    var reportSplit = report.split('\n');
    var currentMinuteFix;
    var currentHourFix;

    if (currentMinute < 10) {
        currentMinuteFix = '0' + currentMinute;
    } else{
        currentMinuteFix = currentMinute;
    }

    if (currentHour > 12){
        currentHour = currentHour-12
    }


    var endTime;
    var endHour;
    var endMinute;
    var i;
    var reportSplitDummy = reportSplit;

    for (i=1;i<reportSplit.length;i++){
        var deleteThis=0;
        if (reportSplit[i].includes(":")){
            var temporalTimeSplit = reportSplit[i].split("~")
            var temporalTimeSplit2 = temporalTimeSplit[1];
            var temporalTimeSplit3 = temporalTimeSplit2.split(" ");
            endTime = temporalTimeSplit3[0];
            var temporalTimeSplit4 = endTime.split(":");
            endHour = parseInt(temporalTimeSplit4[0]);
            endMinute = parseInt(temporalTimeSplit4[1]);
            endTime = endHour + '' + temporalTimeSplit4[1];

            if (endHour==currentHour && endMinute<currentMinute){
                deleteThis = reportSplit[i];
                reportSplitDummy.splice(reportSplitDummy.indexOf(deleteThis),1);
            } else if (endHour==1 && currentHour==12){
                deleteThis = reportSplit[i];
                //but it doesnt get deleted
            } else if (endHour==12 && currentHour==1) {//12:59 1:00
                deleteThis = reportSplit[i];
                reportSplitDummy.splice(reportSplitDummy.indexOf(deleteThis),1);
            } else if ((endHour < currentHour) && (currentHour!=12)) {
                deleteThis = reportSplit[i];
                reportSplitDummy.splice(reportSplitDummy.indexOf(deleteThis),1);
            }

        }
    }

    report = reportSplitDummy[0];

    for (i=1;i<reportSplitDummy.length;i++){
        report = report + '\n' + reportSplitDummy[i];
    }


    return (report)
}

var raidBossDict = {
    "이상해씨" : "이상해씨 (도감 #1)\n타입 - 풀/독\n공격 118 / 방어 118 / 체력 90\n파트너 사탕거리 : 3km\n포획률 : 20% / 도주율 : 10% \n\nCP (순위 #286)\n\nLV15 : 420    LV20 : 560\nLV25 : 701    LV30 : 841\nLV35 : 911    LV40 : 981\n\n최고 공격 조합 : 덩굴채찍 / 파워휩\n최고 방어 조합 : 덩굴채찍 / 오물폭탄", //#1
    "이상해풀" : "이상해풀 (도감 #2)\n타입 - 풀/독\n공격 151 / 방어 151 / 체력 120\n파트너 사탕거리 : 3km\n포획률 : 10% / 도주율 : 7% \n\nCP (순위 #201)\n\nLV15 : 665    LV20 : 886\nLV25 : 1108    LV30 : 1330\nLV35 : 1441    LV40 : 1552\n\n최고 공격 조합 : 덩굴채찍 / 하드플랜트\n최고 방어 조합 : 잎날가르기 / 하드플랜트", //#2
    "이상해꽃" : "이상해꽃 (도감 #3)\n타입 - 풀/독\n공격 198 / 방어 198 / 체력 160\n파트너 사탕거리 : 3km\n포획률 : 5% / 도주율 : 5% \n\nCP (순위 #62)\n\nLV15 : 1100    LV20 : 1467\nLV25 : 1834    LV30 : 2201\nLV35 : 2385    LV40 : 2568\n\n최고 공격 조합 : 덩굴채찍 / 하드플랜트\n최고 방어 조합 : 잎날가르기 / 하드플랜트", //#3
    "파이리" : "파이리 (도감 #4)\n타입 - 불\n공격 116 / 방어 96 / 체력 78\n파트너 사탕거리 : 3km\n포획률 : 20% / 도주율 : 10% \n\nCP (순위 #315)\n\nLV15 : 356    LV20 : 475\nLV25 : 593    LV30 : 712\nLV35 : 771    LV40 : 831\n\n최고 공격 조합 : 불꽃세례 / 화염방사\n최고 방어 조합 : 불꽃세례 / 니트로차지", //#4
    "리자드" : "리자드 (도감 #5)\n타입 - 불\n공격 158 / 방어 129 / 체력 116\n파트너 사탕거리 : 3km\n포획률 : 10% / 도주율 : 7% \n\nCP (순위 #212)\n\nLV15 : 636    LV20 : 847\nLV25 : 1060    LV30 : 1272\nLV35 : 1378    LV40 : 1484\n\n최고 공격 조합 : 불꽃엄니 / 화염방사\n최고 방어 조합 : 불꽃세례 / 화염방사", //#5
    "리자몽" : "리자몽 (도감 #6)\n타입 - 불/비행\n공격 223 / 방어 176 / 체력 156\n파트너 사탕거리 : 3km\n포획률 : 5% / 도주율 : 5% \n\nCP (순위 #52)\n\nLV15 : 1151    LV20 : 1535\nLV25 : 1918    LV30 : 2302\nLV35 : 2494    LV40 : 2686\n\n최고 공격 조합 : 회오리불꽃 / 블러스트번\n최고 방어 조합 : 회오리불꽃 / 블러스트번", //#6
    "꼬부기" : "꼬부기 (도감 #7)\n타입 - 물\n공격 94 / 방어 122 / 체력 88\n파트너 사탕거리 : 3km\n포획률 : 20% / 도주율 : 10% \n\nCP (순위 #319)\n\nLV15 : 346    LV20 : 462\nLV25 : 577    LV30 : 693\nLV35 : 750    LV40 : 808\n\n최고 공격 조합 : 거품 / 아쿠아테일\n최고 방어 조합 : 거품 / 아쿠아테일", //#7
    "어니부기" : "어니부기 (도감 #8)\n타입 - 물\n공격 126 / 방어 155 / 체력 118\n파트너 사탕거리 : 3km\n포획률 : 10% / 도주율 : 7% \n\nCP (순위 #227)\n\nLV15 : 567    LV20 : 756\nLV25 : 945    LV30 : 1135\nLV35 : 1229    LV40 : 1324\n\n최고 공격 조합 : 물대포 / 하이드로펌프\n최고 방어 조합 : 물대포 / 냉동빔", //#8
    "거북왕" : "거북왕 (도감 #9)\n타입 - 물\n공격 171 / 방어 210 / 체력 158\n파트너 사탕거리 : 3 km\n포획률 : 5% / 도주율 : 5% \n\nCP (순위 #93)\n\nLV15 : 982    LV20 : 1309\nLV25 : 1637    LV30 : 1964\nLV35 : 2128    LV40 : 2291\n\n최고 공격 조합 : 물대포 / 하이드로캐논\n최고 방어 조합 : 물대포 / 하이드로캐논", //#9
    "캐터피" : "캐터피 (도감 #10)\n타입 - 벌레\n공격 55 / 방어 62 / 체력 90\n파트너 사탕거리 : 1km\n포획률 : 50% / 도주율 : 20% \n\nCP (순위 #377)\n\nLV15 : 168    LV20 : 224\nLV25 : 280    LV30 : 336\nLV35 : 365    LV40 : 393\n\n최고 공격 조합 : 벌레먹음 / 발버둥\n최고 방어 조합 : 벌레먹음 / 발버둥", //#10
    "단데기" : "단데기 (도감 #11)\n타입 - 벌레\n공격 45 / 방어 94 / 체력 100\n파트너 사탕거리 : 1km\n포획률 : 25% / 도주율 : 9% \n\nCP (순위 #374)\n\nLV15 : 179    LV20 : 239\nLV25 : 299    LV30 : 359\nLV35 : 389    LV40 : 419\n\n최고 공격 조합 : 벌레먹음 / 발버둥\n최고 방어 조합 : 벌레먹음 / 발버둥", //#11
    "버터플" : "버터플 (도감 #12)\n타입 - 벌레/비행\n공격 167 / 방어 151 / 체력 120\n파트너 사탕거리 : 1km\n포획률 : 12.5% / 도주율 : 6% \n\nCP (순위 #181)\n\nLV15 : 729    LV20 : 972\nLV25 : 1215    LV30 : 1458\nLV35 : 1580    LV40 : 1701\n\n최고 공격 조합 : 벌레의저항 / 벌레의야단법석\n최고 방어 조합 : 염동력 / 벌레의야단법석", //#12
    "뿔충이" : "뿔충이 (도감 #13)\n타입 - 벌레/독\n공격 63 / 방어 55 / 체력 80\n파트너 사탕거리 : 1km\n포획률 : 50% / 도주율 : 20% \n\nCP (순위 #376)\n\nLV15 : 170    LV20 : 227\nLV25 : 283    LV30 : 340\nLV35 : 368    LV40 : 397\n\n최고 공격 조합 : 벌레먹음 / 발버둥\n최고 방어 조합 : 벌레먹음 / 발버둥", //#13
    "딱충이" : "딱충이 (도감 #14)\n타입 - 벌레/독\n공격 46 / 방어 86 / 체력 90\n파트너 사탕거리 : 1km\n포획률 : 25% / 도주율 : 9% \n\nCP (순위 #378)\n\nLV15 : 168    LV20 : 224\nLV25 : 280    LV30 : 336\nLV35 : 364    LV40 : 392\n\n최고 공격 조합 : 벌레먹음 / 발버둥\n최고 방어 조합 : 벌레먹음 / 발버둥", //#14
    "독침붕" : "독침붕 (도감 #15)\n타입 - 벌레/독\n공격 169 / 방어 150 / 체력 130\n파트너 사탕거리 : 1km\n포획률 : 12.5% / 도주율 : 6% \n\nCP (순위 #174)\n\nLV15 : 761    LV20 : 1015\nLV25 : 1269    LV30 : 1523\nLV35 : 1650    LV40 : 1777\n\n최고 공격 조합 : 독찌르기 / 오물폭탄\n최고 방어 조합 : 엉겨붙기 / 오물폭탄", //#15
    "구구" : "구구 (도감 #16)\n타입 - 노말/비행\n공격 85 / 방어 76 / 체력 80\n파트너 사탕거리 : 1km\n포획률 : 50% / 도주율 : 20% \n\nCP (순위 #354)\n\nLV15 : 248    LV20 : 331\nLV25 : 414    LV30 : 497\nLV35 : 539    LV40 : 580\n\n최고 공격 조합 : 전광석화 / 제비반환\n최고 방어 조합 : 전광석화 / 제비반환", //#16
    "피죤" : "피죤 (도감 #17)\n타입 - 노말/비행\n공격 117 / 방어 108 / 체력 126\n파트너 사탕거리 : 1km\n포획률 : 25% / 도주율 : 9% \n\nCP (순위 #267)\n\nLV15 : 465    LV20 : 620\nLV25 : 775    LV30 : 930\nLV35 : 1008    LV40 : 1085\n\n최고 공격 조합 : 날개치기 / 제비반환\n최고 방어 조합 : 날개치기 / 제비반환", //#17
    "피죤투" : "피죤투 (도감 #18)\n타입 - 노말/비행\n공격 166 / 방어 157 / 체력 166\n파트너 사탕거리 : 1km\n포획률 : 12.5% / 도주율 : 6% \n\nCP (순위 #141)\n\nLV15 : 854    LV20 : 1139\nLV25 : 1424    LV30 : 1709\nLV35 : 1852    LV40 : 1994\n\n최고 공격 조합 : 에어슬래시 / 폭풍\n최고 방어 조합 : 에어슬래시 / 제비반환", //#18
    "꼬렛" : "꼬렛 (도감 #19)\n타입 - 노말\n공격 103 / 방어 70 / 체력 60\n파트너 사탕거리 : 1km\n포획률 : 50% / 도주율 : 20% \n\nCP (순위 #353)\n\nLV15 : 252    LV20 : 336\nLV25 : 420    LV30 : 504\nLV35 : 546    LV40 : 588\n\n최고 공격 조합 : 전광석화 / 필살앞니\n최고 방어 조합 : 전광석화 / 필살앞니", //#19
    "레트라" : "레트라 (도감 #20)\n타입 - 노말\n공격 161 / 방어 144 / 체력 110\n파트너 사탕거리 : 1km\n포획률 : 20% / 도주율 : 7% \n\nCP (순위 #202)\n\nLV15 : 664    LV20 : 885\nLV25 : 1106    LV30 : 1328\nLV35 : 1439    LV40 : 1549\n\n최고 공격 조합 : 전광석화 / 파괴광선\n최고 방어 조합 : 전광석화 / 파괴광선", //#20
    "깨비참" : "깨비참 (도감 #21)\n타입 - 노말/비행\n공격 112 / 방어 61 / 체력 80\n파트너 사탕거리 : 1km\n포획률 : 50% / 도주율 : 15% \n\nCP (순위 #342)\n\nLV15 : 288    LV20 : 385\nLV25 : 481    LV30 : 577\nLV35 : 625    LV40 : 673\n\n최고 공격 조합 : 전광석화 / 불새\n최고 방어 조합 : 쪼기 / 불새", //#21
    "깨비드릴조" : "깨비드릴조 (도감 #22)\n타입 - 노말/비행\n공격 182 / 방어 135 / 체력 130\n파트너 사탕거리 : 1km\n포획률 : 20% / 도주율 : 7% \n\nCP (순위 #170)\n\nLV15 : 777    LV20 : 1036\nLV25 : 1296    LV30 : 1555\nLV35 : 1685    LV40 : 1814\n\n최고 공격 조합 : 쪼기 / 불새\n최고 방어 조합 : 쪼기 / 불새", //#22
    "아보" : "아보 (도감 #23)\n타입 - 독\n공격 110 / 방어 102 / 체력 70\n파트너 사탕거리 : 3km\n포획률 : 50% / 도주율 : 15% \n\nCP (순위 #323)\n\nLV15 : 333    LV20 : 444\nLV25 : 556    LV30 : 667\nLV35 : 722    LV40 : 778\n\n최고 공격 조합 : 용해액 / 오물폭탄\n최고 방어 조합 : 용해액 / 오물폭탄", //#23
    "아보크" : "아보크 (도감 #24)\n타입 - 독\n공격 167 / 방어 158 / 체력 120\n파트너 사탕거리 : 3km\n포획률 : 20% / 도주율 : 7% \n\nCP (순위 #178)\n\nLV15 : 744    LV20 : 992\nLV25 : 1240    LV30 : 1489\nLV35 : 1613    LV40 : 1737\n\n최고 공격 조합 : 용해액 / 더스트슈트\n최고 방어 조합 : 용해액 / 더스트슈트", //#24
    "피카츄" : "피카츄 (도감 #25)\n타입 - 전기\n공격 112 / 방어 101 / 체력 70\n파트너 사탕거리 : 1km\n포획률 : 20% / 도주율 : 10% \n\nCP (순위 #322)\n\nLV15 : 337    LV20 : 450\nLV25 : 562    LV30 : 675\nLV35 : 731    LV40 : 787\n\n최고 공격 조합 : 전기쇼크 / 와일드볼트\n최고 방어 조합 : 전광석화 / 와일드볼트", //#25
    "라이츄" : "라이츄 (도감 #26)\n타입 - 전기\n공격 193 / 방어 165 / 체력 120\n파트너 사탕거리 : 1km\n포획률 : 10% / 도주율 : 6% \n\nCP (순위 #138)\n\nLV15 : 867    LV20 : 1157\nLV25 : 1446    LV30 : 1735\nLV35 : 1880    LV40 : 2025\n\n최고 공격 조합 : 스파크 / 와일드볼트\n최고 방어 조합 : 볼트체인지 / 와일드볼트", //#26
    "모래두지" : "모래두지 (도감 #27)\n타입 - 땅\n공격 126 / 방어 145 / 체력 100\n파트너 사탕거리 : 3km\n포획률 : 50% / 도주율 : 10% \n\nCP (순위 #245)\n\nLV15 : 512    LV20 : 682\nLV25 : 853    LV30 : 1023\nLV35 : 1109    LV40 : 1194\n\n최고 공격 조합 : 할퀴기 / 구멍파기\n최고 방어 조합 : 머드숏 / 구멍파기", //#27
    "고지" : "고지 (도감 #28)\n타입 - 땅\n공격 182 / 방어 202 / 체력 150\n파트너 사탕거리 : 3km\n포획률 : 20% / 도주율 : 6% \n\nCP (순위 #88)\n\nLV15 : 997    LV20 : 1330\nLV25 : 1663    LV30 : 1995\nLV35 : 2161    LV40 : 2328\n\n최고 공격 조합 : 메탈크로우 / 지진\n최고 방어 조합 : 메탈크로우 / 지진", //#28
    "니드런♀" : "니드런♀ (도감 #29)\n타입 - 독\n공격 86 / 방어 94 / 체력 110\n파트너 사탕거리 : 3km\n포획률 : 50% / 도주율 : 15% \n\nCP (순위 #330)\n\nLV15 : 315    LV20 : 420\nLV25 : 525    LV30 : 631\nLV35 : 683    LV40 : 736\n\n최고 공격 조합 : 독침 / 오물폭탄\n최고 방어 조합 : 독침 / 오물폭탄", //#29
    "니드리나" : "니드리나 (도감 #30)\n타입 - 독\n공격 117 / 방어 126 / 체력 140\n파트너 사탕거리 : 3km\n포획률 : 25% / 도주율 : 7% \n\nCP (순위 #241)\n\nLV15 : 522    LV20 : 696\nLV25 : 870    LV30 : 1044\nLV35 : 1131    LV40 : 1218\n\n최고 공격 조합 : 독침 / 오물폭탄\n최고 방어 조합 : 독침 / 오물폭탄", //#30
    "니드퀸" : "니드퀸 (도감 #31)\n타입 - 독/땅\n공격 180 / 방어 174 / 체력 180\n파트너 사탕거리 : 3km\n포획률 : 12.5% / 도주율 : 5% \n\nCP (순위 #87)\n\nLV15 : 1002    LV20 : 1336\nLV25 : 1670    LV30 : 2004\nLV35 : 2171    LV40 : 2338\n\n최고 공격 조합 : 독찌르기 / 지진\n최고 방어 조합 : 독찌르기 / 지진", //#31
    "니드런♂" : "니드런♂ (도감 #32)\n타입 - 독\n공격 105 / 방어 76 / 체력 92\n파트너 사탕거리 : 3km\n포획률 : 50% / 도주율 : 15% \n\nCP (순위 #329)\n\nLV15 : 316    LV20 : 422\nLV25 : 528    LV30 : 633\nLV35 : 686    LV40 : 739\n\n최고 공격 조합 : 독침 / 오물폭탄\n최고 방어 조합 : 쪼기 / 오물폭탄", //#32
    "니드리노" : "니드리노 (도감 #33)\n타입 - 독\n공격 137 / 방어 112 / 체력 122\n파트너 사탕거리 : 3km\n포획률 : 25% / 도주율 : 7% \n\nCP (순위 #237)\n\nLV15 : 536    LV20 : 715\nLV25 : 894    LV30 : 1073\nLV35 : 1162    LV40 : 1252\n\n최고 공격 조합 : 독찌르기 / 오물폭탄\n최고 방어 조합 : 독찌르기 / 오물폭탄", //#33
    "니드킹" : "니드킹 (도감 #34)\n타입 - 독/땅\n공격 204 / 방어 157 / 체력 162\n파트너 사탕거리 : 3km\n포획률 : 12.5% / 도주율 : 5% \n\nCP (순위 #82)\n\nLV15 : 1022    LV20 : 1363\nLV25 : 1704    LV30 : 2045\nLV35 : 2216    LV40 : 2386\n\n최고 공격 조합 : 독찌르기 / 지진\n최고 방어 조합 : 아이언테일 / 지진", //#34
    "삐삐" : "삐삐 (도감 #35)\n타입 - 페어리\n공격 107 / 방어 116 / 체력 140\n파트너 사탕거리 : 1km\n포획률 : 30% / 도주율 : 10% \n\nCP (순위 #268)\n\nLV15 : 465    LV20 : 620\nLV25 : 775    LV30 : 930\nLV35 : 1008    LV40 : 1085\n\n최고 공격 조합 : 막치기 / 문포스\n최고 방어 조합 : 사념의박치기 / 차밍보이스", //#35
    "픽시" : "픽시 (도감 #36)\n타입 - 페어리\n공격 178 / 방어 171 / 체력 190\n파트너 사탕거리 : 1km\n포획률 : 10% / 도주율 : 6% \n\nCP (순위 #86)\n\nLV15 : 1008    LV20 : 1344\nLV25 : 1681    LV30 : 2017\nLV35 : 2185    LV40 : 2353\n\n최고 공격 조합 : 차지빔 / 매지컬샤인\n최고 방어 조합 : 차지빔 / 매지컬샤인", //#36
    "식스테일" : "식스테일 (도감 #37)\n타입 - 불\n공격 96 / 방어 122 / 체력 76\n파트너 사탕거리 : 3km\n포획률 : 30% / 도주율 : 10% \n\nCP (순위 #324)\n\nLV15 : 331    LV20 : 442\nLV25 : 552    LV30 : 663\nLV35 : 718    LV40 : 774\n\n최고 공격 조합 : 불꽃세례 / 화염방사\n최고 방어 조합 : 불꽃세례 / 니트로차지", //#37
    "나인테일" : "나인테일 (도감 #38)\n타입 - 불\n공격 169 / 방어 204 / 체력 146\n파트너 사탕거리 : 3km\n포획률 : 10% / 도주율 : 6% \n\nCP (순위 #115)\n\nLV15 : 924    LV20 : 1233\nLV25 : 1541    LV30 : 1849\nLV35 : 2003    LV40 : 2157\n\n최고 공격 조합 : 회오리불꽃 / 오버히트\n최고 방어 조합 : 회오리불꽃 / 오버히트", //#38
    "푸린" : "푸린 (도감 #39)\n타입 - 노말/페어리\n공격 80 / 방어 44 / 체력 230\n파트너 사탕거리 : 1km\n포획률 : 50% / 도주율 : 10% \n\nCP (순위 #336)\n\nLV15 : 305    LV20 : 407\nLV25 : 509    LV30 : 611\nLV35 : 662    LV40 : 713\n\n최고 공격 조합 : 막치기 / 매지컬샤인\n최고 방어 조합 : 속여때리기 / 매지컬샤인", //#39
    "푸크린" : "푸크린 (도감 #40)\n타입 - 노말/페어리\n공격 156 / 방어 93 / 체력 280\n파트너 사탕거리 : 1km\n포획률 : 20% / 도주율 : 6% \n\nCP (순위 #157)\n\nLV15 : 817    LV20 : 1089\nLV25 : 1361    LV30 : 1634\nLV35 : 1770    LV40 : 1906\n\n최고 공격 조합 : 막치기 / 파괴광선\n최고 방어 조합 : 속여때리기 / 치근거리기", //#40
    "주뱃" : "주뱃 (도감 #41)\n타입 - 독/비행\n공격 83 / 방어 76 / 체력 80\n파트너 사탕거리 : 1km\n포획률 : 50% / 도주율 : 20% \n\nCP (순위 #355)\n\nLV15 : 243    LV20 : 325\nLV25 : 406    LV30 : 487\nLV35 : 528    LV40 : 569\n\n최고 공격 조합 : 전광석화 / 에어컷터\n최고 방어 조합 : 전광석화 / 에어컷터", //#41
    "골뱃" : "골뱃 (도감 #42)\n타입 - 독/비행\n공격 161 / 방어 153 / 체력 150\n파트너 사탕거리 : 1km\n포획률 : 20% / 도주율 : 7% \n\nCP (순위 #168)\n\nLV15 : 784    LV20 : 1045\nLV25 : 1307    LV30 : 1568\nLV35 : 1699    LV40 : 1830\n\n최고 공격 조합 : 날개치기 / 섀도볼\n최고 방어 조합 : 날개치기 / 섀도볼", //#42
    "뚜벅쵸" : "뚜벅쵸 (도감 #43)\n타입 - 풀/독\n공격 131 / 방어 116 / 체력 90\n파트너 사탕거리 : 3km\n포획률 : 60% / 도주율 : 15% \n\nCP (순위 #272)\n\nLV15 : 458    LV20 : 611\nLV25 : 763    LV30 : 916\nLV35 : 993    LV40 : 1069\n\n최고 공격 조합 : 잎날가르기 / 오물폭탄\n최고 방어 조합 : 잎날가르기 / 오물폭탄", //#43
    "뚜벅쵸" : "뚜벅쵸 (도감 #44)\n타입 - 풀/독\n공격 153 / 방어 139 / 체력 120\n파트너 사탕거리 : 3km\n포획률 : 30% / 도주율 : 7% \n\nCP (순위 #207)\n\nLV15 : 648    LV20 : 864\nLV25 : 1080    LV30 : 1296\nLV35 : 1404    LV40 : 1512\n\n최고 공격 조합 : 잎날가르기 / 오물폭탄\n최고 방어 조합 : 잎날가르기 / 오물폭탄", //#44
    "라플레시아" : "라플레시아 (도감 #44)\n타입 - 풀/독\n공격 202 / 방어 139 / 체력 120\n파트너 사탕거리 : 3km\n포획률 : 30% / 도주율 : 7% \n\nCP (순위 #85)\n\nLV15 : 648    LV20 : 864\nLV25 : 1080    LV30 : 1296\nLV35 : 1404    LV40 : 1512\n\n최고 공격 조합 : 용해액 / 솔라빔\n최고 방어 조합 : 잎날가르기 / 솔라빔", //#44


    
    
    
    
    "프리져" : "LV15 : 1257\nLV20 : 1676\nLV25 : 2095",
    "썬더" : "LV15 : 1427\nLV20 : 1902",
    "파이어" : "LV15 : 1402\nLV20 : 1870\nLV25 : 2337",
    "뮤츠" : "LV20 : 2275\nLV25 : 2844\nLV40 : 3982",
    "뮤" : "LV15 : 1324",
    
    "라이코" : "LV15 : 1435\nLV20 : 1913",
    "앤테이" : "LV15 : 1447\nLV20 : 1930",
    "스이쿤" : "LV15 : 1210\nLV20 : 1613",
    
    "칠색조" : "LV20 : 2222\nLV25 : 2778\nLV40 : 3889",
    "루기아" : "LV20 : 2056\nLV25 : 2570",
    "세레비" : "LV15 : 1324",
    
    "레지락" : "LV20 : 1764\nLV25 : 2205",
    "레지아이스" : "LV20 : 1764\nLV25 : 2205",
    "레지스틸" : "LV20 : 1292\nLV25 : 1615",
    
    "라티오스" : "LV20 : 2082\nLV25 : 2603",
    "라티아스" : "LV20 : 1929\nLV25 : 2412",
    
    "그란돈" : "LV20 : 2328\nLV25 : 2910\nLV40 : 4074",
    "가이오가" : "LV20 : 2328\nLV25 : 2910\nLV40 : 4074",
    "레쿠자" : "LV20 : 2083\nLV25 : 2604\nLV40 : 3645",
    "레쿠쟈" : "LV20 : 2083\nLV25 : 2604\nLV40 : 3645"
};


function raidReport(msgTwo) {
    currentTime = new Date();
    var splitMessage = msgTwo.split(' ');
    var dummySplit=msgTwo.split(' ');

    var msgTime = '';
    var msgTime2;
    var msgHour;
    var msgMin;
    var endHour;
    var endMin;
    var raidTime;
    var raidSentence;

    var i;

    for (i=0; i<splitMessage.length; i++){
        if (splitMessage[i].includes("제보")){
            splitMessage.splice(i,1);
        }
    }


    for (i=0; i<splitMessage.length; i++){
        if (splitMessage[i].includes("시") && (splitMessage[i].slice(-1)!='시')){
            msgTime = splitMessage[i];
            var twoCheck = 0;
            if (msgTime.slice(-1)=='분'){
                msgTime = msgTime.replace('분','');
                twoCheck++;
            }
            msgTime = msgTime.replace('시',':');
            if (twoCheck!=0){
                splitMessage.splice(i,1)
            } else if(twoCheck==0){
                splitMessage.splice(i,1);
            }
            splitMessage.push(msgTime);
        } else if (splitMessage[i].includes("시") && !(splitMessage[i].includes("분"))){
            splitMessage.push(msgTime);
            msgTime=splitMessage[i]+splitMessage[i+1];
            msgTime = msgTime.replace('시',':');
            msgTime = msgTime.replace('분','');
            splitMessage.splice(i,2);
            splitMessage.push(msgTime);
        } else if(splitMessage[i].includes(":")){
            msgTime=splitMessage[i]
            splitMessage.splice(i,1);
            splitMessage.push(msgTime);
        }
    }

    msgTime2 = splitMessage.splice(-1)[0];
    msgHour = msgTime2.slice(0,msgTime.indexOf(':'));
    msgMin = msgTime2.slice(msgTime.indexOf(':')+1,5)

    if (msgHour > 12){
        msgHour = parseInt(msgHour) - 12;
    }

    if (msgHour == 12){ // 12시
        if (msgMin > 14){ // 12시15분 ~ 59분
            endHour = 1;
            endMin = parseInt(msgMin)-15;
            if (endMin<10){
                endMin = '0' + endMin;
            }
        } else if (msgMin < 15){
            endHour = msgHour;
            endMin = parseInt(msgMin)+45;
        }
    } else {
        if (msgMin > 14){
            endHour = parseInt(msgHour) + 1;
            endMin = parseInt(msgMin)-15;
            if (endMin<10){
                endMin = '0' + endMin;
            }
        } else {
            endHour = msgHour;
            endMin = parseInt(msgMin) + 45;
        }
    }
    
    if (isNaN(endMin)){
        if(parseInt(msgMin)+45 == 53){
            endMin = 52;
        } else{
            endMin = 52;
        }
    }
    
    if (parseInt(msgMin) < 10){
        msgMin = '0' + parseInt(msgMin);
    }


    raidTime = msgHour+':'+msgMin+'~'+endHour+':'+endMin;
    raidSentence = raidTime + ' ' + splitMessage.splice(0);
    raidSentence = raidSentence.replace(',',' ');
    raidSentence = raidSentence.replace(',',' ');

    return raidSentence;
}

function response(room, msg, sender, isGroupChat, replier, imageDB) {
    report = timeCheck(report);
    report = timeCheck(report);

    msgCall = msg;
    
    if (msg=="사전 죽었는지 확인 하는 것"){
        replier.reply(quoteFind);
    }
    
    if (msg=='도리야' || msg=='도리' || msg=='도리!'){
        replier.reply("네! 부르셨나요?")
    }
    
    if (msgCall.slice(0,3)=='도리야'){
        msg = msg.replace('도리야','도리')
    }
    msgCall = msg;

    if (msgCall.slice(0,2)=='도리'){
        msg = msgCall.slice(3);

        if(msg == '레쿠자 100% 개체가 뭐야?'){
            replier.reply('그건 렌토님한테 물어보세요');
        }
        if(msg == '칠색조 100% 개체가 뭐야?'){
            replier.reply('그건 파이리님한테 물어보세요');
        }
        if(msg == '가이오가 100% 개체가 뭐야?'){
            replier.reply('그건 캐논님한테 물어보세요');
        }
        
        if(msg.includes('백개체')){
            msg = msg.slice(0,msg.indexOf('백개체')-1)
            replier.reply(msg + ' 100% 개체 CP\n' + raidBossDict[msg]);
        }
        

        if ((msg.includes('이벤트')) || (msg.includes('글로벌 챌린지'))) {
            replier.reply('<이벤트 요약>\n▶9월 14일(금) ~ 9월 30일(일)\n관동지방 포켓몬 젠률 증가\n7km 알에서 파오리/캥가/마임맨/켄타로스 등장\n\n▶9월 21일(금) ~ 10월 23일(화)\n5성 레이드에 뮤츠 등장\n\n▶10월 21일(일)\n메탕 커뮤니티 데이\n\n▶10월 2일(화) ~ 10월 31일 (수)\n필드 리서치 보상으로 스이쿤이 나타납니다.\n\n▶10월 2일(화) ~ \nEX배틀에 테오키스가 출현합니다.');
        }

        if(msg.includes('커뮤니티') || msg.includes('커뮤데이')){
            replier.reply('다가오는 커뮤니티 데이는 10월 21일 12시부터 3시 입니다. 출현 몬스터는 메탕 입니다.\n커뮤니티데이 동안\n▶메탕이 평소보다 더 많이 출몰합니다.\n▶루어 지속시간이 3시간으로 늘어납니다\n▶4시까지 메타그로스로 진화시, 특별한 기술을 배웁니다.\n▶이벤트 시간 동안 알이 4배 더 빨리 부화합니다.');
        }
        
        if(msg.includes('마기') && msg.includes('성공')){
            replier.reply('불대문자 아니면 2600대 괴력몬 6마리가 있는 2계정으로 클리어 가능합니다. 불대문자는 2명이 가능하긴 하나, 3명이 안정권입니다. 통상적으로 괴력 약한 계정은 4계정 이상이 필요합니다.');
        }
        
        if(msg.includes('둥지')){
            replier.reply(nestDict);
        }
        
        if(msg.includes('스탑 신청')){
            replier.reply("40레벨을 달성한 트레이너는 한국에서 제한적으로 새로운 포켓스탑을 신청할 수 있습니다!\n원하시는 장소에 간 후 포켓몬고 화면 내에 포켓볼을 클릭, 설정에 들어가셔서 새로운 포켓스탑을 신청해보세요!");
        }
        
        if(msg.includes('아이템') && msg.includes('확률')){
            replier.reply('▶아이템 드랍 확률\n\n포켓볼 : 42.88%\n그레이트 볼 : 6.48%\n울트라 볼 : 2.19%\n상처약 : 12.1%\n좋은 상처약 : 2.15%\n고급 상처약 : 1.81%\n풀 회복약 : 1.22%\n기력의 조각 : 7.33%\n기력의 덩어리 : 1.22%\n라즈열매 : 8.06%나나열매 : 9.65%\n파인 열매 : 4.84%\n진화 아이템 : 0.06%')
        }
        
        if(msg.includes('경험치') && msg.includes('알려줘')){
            replier.reply('포켓몬 포획 시 +100\nExcellent 성공 +100\nGreat 성공 +50\nNice 성공 +10\n커브볼 +10\n보너스 +100\n원샷 +50\n포켓몬 포획 실패 시 +25 ~ +125\n포켓몬 도감 등록 시 +500\n포켓몬 진화 시 +500\n2km 알 부화 시 +200\n5, 7km 알 부화 시+500\n10km 알 부화 시 +1000\n포켓스톱 터치 시 +50/+100/+250\n체육관에서 포켓몬 한 마리를 이길때마다 +100\n체육관 포켓몬에게 열매를 줄 때 + 20\n체육관 돌파 시 +150\n체육관 포토디스크 +75\n오늘의 첫 포켓스톱 +500\n오늘의 첫 포획 +500\n7일째 첫 포켓스톱 +2000\n7일째 첫 포획 +2000\n7일째 리서치 보상 +2000');
        }
        
        if(msg.includes('지역락') && msg.includes('포켓몬')){
            replier.reply('켄타로스 : 북아메리카\n마임맨 : 유럽\n캥가 : 호주\n코산호 : 적도 부근\n헤라크로스 : 중남미\n네오비트 : 북아메리카,중남미,아프리카\세비퍼 : 북아메리카,중남미,루나톤\n네오비트 : 북아메리카,중남미,아프리카\n코터스 : 인도,중동,동남아 일대\n트로피우스 : 아프리카,남유럽 일대\n시라칸: 뉴질랜드,피지');
        }
        
        if(msg.includes('이브이') && msg.includes('진화')){
            replier.reply('이브이 진화는 샤미드/부스터/쥬피썬더 세개 중 랜덤으로 이루어지며, 에브이와 블래키는 각각 10km를 걷고 파트너 지정한 상태에서 파트너 화면을 통하여 낮과 밤에 진화를 시킬 수 있습니다. \n\n또한 이브이의 이름을 변경하여 1회 확정 진화 할 수 있습니다. 명칭은 아래와 같습니다.\n샤미드 : Rainder\n부스터 : Pyro\n쥬피썬더 : Sparky\n에브이 : Sakura\n블래키 : Tamao');
        }
        
        if(msg.includes('평가')){
            if(msg.includes('발러')){
                replier.reply('발러 리더 칸델라의 평가 대사\n\nIV 총합\n82~100% 말할 게 없어. 아주 든든하겠어!\n67~80% 아주 강해. 자랑해도 되겠어!\n51~64% 보통의 강함이라고 생각해!\n0~49% 배틀이 적성은 아니지만 난 좋아해.\n\n가장 높은 IV\n15 최고야! 가슴이 뜨거워져!\n13~14 훌륭해! 두근거려!\n8~12 꽤 강하네. 배틀에서 활약할 것 같아!\n0~7 그럭저럭 강한거네.');
            }
            if(msg.includes('미스틱')){
                replier.reply('미스틱 리더 블랑쉬의 평가 대사\n\nIV 총합\n82~100% 경이롭고 예술적이야!\n67~80% 시선을 끄는 뭔가가 있어\n51~64% 보통 이상이야.\n0~49% 좀처럼 활약이 어려워보인다.\n\n가장 높은 IV\n15 측정할 수 없을 정도로 높아! 최고야!\n13~14 훌륭해. 놀라워.\n8~12 꽤 강하다고 말할 수 있군.\n0~7 그럭저럭이라고 말할 수 있군.');
            }
            if(msg.includes('인스')){
                replier.reply('인스팅트 리더 스파크의 평가 대사\n\nIV 총합\n82~100% 전체적으로 톱 레벨이야!\n67~80% 전체적으로 아주 강해!\n51~64% 전체적으로 보통이야.\n0~49% 전체적으로 그저 그러네.\n\n가장 높은 IV\n15 지금까지 본 것 중에서도 최고의 부류야!\n13~14 훌륭해! 정말이야!\n8~12 꽤 강한데! 내가 보증하지!\n0~7 그럭저럭, 이야!');
            }
        }
        
        if(msg.includes('진화도구')){
            replier.reply('진화도구를 사용하여 포켓몬을 진화시킬 수 있습니다.\n\n업그레이드 : 폴리곤\n왕의 징표석 : 야돈, 슈륙챙이\n태양의 돌: 냄새꼬, 해너츠\n용의 비늘 : 시드라\n금속코트 : 롱스톤,스라크')
        }
        
        
        if(msg.includes('레이드') && (msg.includes('출현') || msg.includes('리스트'))){
            replier.reply('뮤츠가 나와욧...나머지는 몰라요! 최대한 빨리 알아올게요!')
        }
        
        
        if(msg.includes('명언') && (!msg.includes('등록'))){
            msg = msg.replace('명언','');
            msg = msg.split(" ");
            var newDict = msg[0];

            var ranDict = Math.floor((Math.random() * (10)));
            replier.reply(quoteFind[newDict])
        }
        
        
        if(msg.includes('사용법')){
            if (msg.includes('레이드')){
                replier.reply(manual['레이드']);
            } else if (msg.includes('정보')){
                replier.reply(manual['정보']);
            } else if (msg.includes('명령어')){
                replier.reply(manual['명령어']);
            } else {
                replier.reply("안녕하세요! 도리입니다.\n도곡방 레이드가 조금 더 쉽게 성사 될 수 있게 최선을 다할게요!\n저에게 아래처럼 말을 걸어주세요!최대한 답할 수 있도록 노력할게요!😊\n\n▶제보 관련\n제보 등록 : 사과 3시 40분 제보\n제보 삭제 : 사과 삭제\n제보 리스트 리셋 : 제보 리셋\n제보 현황 : 현황\n\n▶리서치 관련(체육관 제보와 혼동을 하지 않기위해 제보란 말보단 리서치란 말을 써주세요!)\n리서치 제보 : 대치711 럭키 리서치\n제보된 리서치 삭제 : 대치711 리서치 삭제\n\n▶그 외\n도리야 이벤트 알려줘\n도리야 진화도구는 뭐야?\n도리야 지역락 포켓몬 알려줘\n도리야 곧 오는 커뮤니티 데이가 언제야?\n도리야 점심 뭐먹지?\n도리야 오늘도 수고했어!\n도리야 미스틱 팀 평가 알려줘\n도리야 둥지\n도리야 도곡방 트레이너 코드 알려줘\n도리야 도곡방 비밀번호가 뭐야?\n\n등등...저에게 포켓몬 관련하여 더 궁금하신 부분이 있으시다면! 방장님을 갈궈주시면 제가 똑똑해질거에요!")
            }
        }
        
        if(msg.includes('도곡방') && msg.includes('이벤트')){
            replier.reply('★도곡방☆이벤트★\n모래 180921 를 달성해라!\n길었던 레지아이스/레지스틸/레지락의 5성 레이드 기간이 끝나는 것을 기념하기 위해 이벤트를 합니다!\n9월 20일에서 9월 21일로 오전 0시0분부터 1시0분까지!! 보유 모래를 180921에 맞춰서 스크린샷을 올려주시는분께 소정의 상품을 드립니다~ 많은 참여 부탁드려요!!');
        }
        
        if(msg.includes('트레이너코드') || msg.includes('트레이너 코드')){
            replier.reply("도곡방 트레이너 코드 : https://goo.gl/z7ib37");
        }
        
        if(msg.includes('띠꾸')){
            ranDict = Math.floor((Math.random() * 40) + 1);
            replier.reply(ttikku[ranDict]);
        }
        
        if(msg.includes('잘자') || msg.includes('굿밤') || msg.includes('굿나잇') || msg.includes('좋은밤') || msg.includes('좋은 밤')){
            ranDict = Math.floor((Math.random() * 7) + 1);
            replier.reply(goodByeDict[ranDict]);
        }
        
        if(msg.includes('좋은 아침') || msg.includes('굿모닝') || msg.includes('좋은아침') || msg.includes('잘잤어?')){
            ranDict = Math.floor((Math.random() * 7) + 1);
            replier.reply(goodMorningDict[ranDict]);
        }
        
        if(msg.includes('점심') || msg.includes('메뉴') || msg.includes('저녁') || msg.includes('먹을까')){
            ranDict = Math.floor((Math.random() * 50) + 1);
            replier.reply(lunchMenu[ranDict]);
        }
        
        if (msg.includes('안녕')){
            var nowHour = currentTime.getHours();
            if (nowHour > 11 && nowHour < 18){
                replier.reply("네 안녕하세요 트레이너님! 오늘도 좋은 하루 되세요😊😊😊");
            } else if (nowHour > 17 && nowHour < 20) {
                replier.reply("네 트레이너님! 좋은 저녁이에요ㅎㅎ 저녁 맛있게 드세요~!😋😋😋");
            } else if (nowHour > 19 || nowHour < 2){
                replier.reply("네 트레이너님! 좋은 밤 되세요~!!😴😴😴");
            } else if (nowHour > 1 && nowHour < 5){
                replier.reply("헉 트레이너님! 안주무세요!?!? 어서 주무세요!!😱😱😱");
            } else if (nowHour < 11){
                replier.reply("안녕하세요 트레이너님! 좋은 아침이에요😊😊😊");
            } else {
                replier.reply("안녕하세요 트레이너님!☺️")
            }
        }
        
        if(msg.includes('잘했어') || msg.includes('최고') || msg.includes('짱') || msg.includes('수고') || msg.includes('고마')){
            ranDict = Math.floor((Math.random() * 5) + 1);
            replier.reply(goodJob[ranDict]);
        }
        
        if(msg.includes('비밀번호') || (msg.includes('비번'))){
            replier.reply('현재 도곡방 입장 비밀번호는 2018이에요! 매달 새로 바뀐답니다!');
        }
        
        
        if(msg.includes('뭐하니') || msg.includes('뭐해')){
            replier.reply('트레이너분들의 말을 기다리고 있어요!');
        }
        
        if(msg.includes('바보') || msg.includes('멍청이')){
            replier.reply('아니에요ㅡㅡ매일매일 진화하고 있는걸요!');
        }

        if(msg.includes('이쁜짓') || msg.includes('애교')){
            replier.reply('(심각)');
        }
        msg = '다끝내';
    }
    msgDetermine = msg.split(' ');
    
    if(msg == '테스트') {
        replier.reply('TEST');
    }


    
    if(msg.includes('현황')){
        report = timeCheck(report);
        report = timeCheck(report);
        report = timeCheck(report);

        currentTime = new Date();
        currentHour = currentTime.getHours();
        currentMinute = currentTime.getMinutes();
        var currentMinuteStringCheck = currentMinute +'';
        if (currentMinuteStringCheck.length < 2){
            currentMinute = '0' + currentMinute;
        }
        replier.reply(currentHour+ ':' +currentMinute+' 기준\n'+report);
    }
    
    if (msg.includes('삭제') || msg.includes('오보')){
        msg = msg.replace('삭제해줘','');
        msg = msg.replace('삭제','');
        msg = msg.replace('오보','');
        if(msg[msg.length-1] == ' '){
            msg = msg.slice(0,-1);
        }

        if (report.includes(msg)){
            var reportSplit = report.split('\n')
            var i;
            for (i=0;i<reportSplit.length;i++){
                if(reportSplit[i].includes(msg)){
                    reportSplit.splice(i,1)
                    var j;
                    report = reportSplit[0];
                    for (j=1;j<reportSplit.length;j++){
                        report = report + '\n' + reportSplit[j];
                    }
                    report.replace('\n','')
                    break;
                }
            }

        } 
        replier.reply(msg + ' 제보를 삭제합니다.');
        replier.reply(report);
    }


    if (msg.includes('만료') || msg.includes('끝났어')){
        msg = msg.replace('시간만료','');
        msg = msg.replace('끝났어','');
        msg = msg.replace('만료','');
        if(msg[msg.length-1] == ' '){
            msg = msg.slice(0,-1);
        }

        if (report.includes(msg)){
            var reportSplit = report.split('\n')
            var i;
            for (i=0;i<reportSplit.length;i++){
                if(reportSplit[i].includes(msg)){
                    reportSplit.splice(i,1)
                    var j;
                    report = reportSplit[0];
                    for (j=1;j<reportSplit.length;j++){
                        report = report + '\n' + reportSplit[j];
                    }
                    break;
                    report.replace('\n','')
                }
            }

        }
        replier.reply(msg + ' 가 만료되어 사라집니다.');
        replier.reply(report);
    }

    
    var checkLegitReport = msg.split(' ');

    var i;
    for (i=0;i<checkLegitReport.length;i++){
        if (msg.includes('리서치')){
            if (msg=='리서치 목록') { 
                currentTime = new Date();
                replier.reply(currentTime.getMonth()+ '월' + currentTime.getDate()+'일 기준 도곡방 리서치\n'+ researchReport);
                break;
            } else if ((msg.includes('리셋해줘') && (msg.includes('리서치'))) || msg=='리서치 리셋'){
                researchReport = reserachReportDefault;
                replier.reply(researchReport);
                break;
            } else if ((msg.includes('스탑')) || (msg.includes('리서치'))){
                if (msg.includes('미뇽') || msg.includes('얼루기') || msg.includes('럭키') || msg.includes('에버') || msg.includes('루주라') || msg.includes('가디') || msg.includes('앱솔') || msg.includes('이브이')){
                    msg = msg.replace('스탑','');
                    msg = msg.replace('리서치','');
                    var msgResearchSlice = msg.split(' ');
                    if (msgResearchSlice.length > 1){
                        researchReport = researchReport + '\n' + msg;
                        replier.reply(researchReport); 
                    }

                }
            }
            break;
        } else if (msg.includes('리셋해줘') || msg=='제보 리셋'){
            report = reportDefault;
            replier.reply("리셋되었습니다");
            replier.reply(report + '\n현재 없음');
            break;
        } else if (checkLegitReport[i].includes('제보')){
            checkLegitReport.splice(checkLegitReport.indexOf(checkLegitReport[i]),1);
            if(checkLegitReport.length < 7){
                report = report + '\n' + raidReport(msg);
                replier.reply(report);
            }
        }
    }

}