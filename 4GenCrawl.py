import requests
from bs4 import BeautifulSoup
f = open("pokemonInfo.txt", 'w')
second = open("pokedexNumbers.txt", 'w')

def crawl_pokemonInfo(number):
    req = requests.get("https://pokemon.gameinfo.io/ko/pokemon/" + str(number)) #connection
    html =  req.text
    soup = BeautifulSoup(html, 'html.parser')

    pokemonName = (str(soup.select('h1.mobile-only.mobile-title')).split('>'))[1].split('(Pok')[0].strip()
    
    if '-' in pokemonName:
        pokemonName = str(pokemonName.split('-')[0]).strip()
    
    pokedexNumber = (str(soup.select('div.togglable > p > a.button')).split('-')[0]).split('/')[-1]
    type1 = soup.select('div.large-type')
    type2 = 'NONE'
    if "subtype" in str(type1):
        type2 = (str(type1).split('">')[3]).split('</')[0]
    type1 = (str(type1).split('">')[2]).split('</')[0]
    
    if type1 == "Normal":
        type1 = "노말"
    elif type1 == "Fighting":
        type1 = "격투"
    elif type1 == "Flying":
        type1 = "비행"
    elif type1 == "Poison":
        type1 = "독"
    elif type1 == "Ground":
        type1 = "땅"
    elif type1 == "Rock":
        type1 = "바위"
    elif type1 == "Bug":
        type1 = "벌레"
    elif type1 == "Ghost":
        type1 = "고스트"
    elif type1 == "Steel":
        type1 = "강철"
    elif type1 == "Fire":
        type1 = "불꽃"
    elif type1 == "Water":
        type1 = "물"
    elif type1 == "Grass":
        type1 = "풀"
    elif type1 == "Electric":
        type1 = "전기"
    elif type1 == "Psychic":
        type1 = "에스퍼"
    elif type1 == "Ice":
        type1 = "얼음"
    elif type1 == "Dragon":
        type1 = "드래곤"
    elif type1 == "Dark":
        type1 = "악"
    elif type1 == "Fairy":
        type1 = "페어리"
    
    
    if type2 == "Normal":
        type2 = "노말"
    elif type2 == "Fighting":
        type2 = "격투"
    elif type2 == "Flying":
        type2 = "비행"
    elif type2 == "Poison":
        type2 = "독"
    elif type2 == "Ground":
        type2 = "땅"
    elif type2 == "Rock":
        type2 = "바위"
    elif type2 == "Bug":
        type2 = "벌레"
    elif type2 == "Ghost":
        type2 = "고스트"
    elif type2 == "Steel":
        type2 = "강철"
    elif type2 == "Fire":
        type2 = "불꽃"
    elif type2 == "Water":
        type2 = "물"
    elif type2 == "Grass":
        type2 = "풀"
    elif type2 == "Electric":
        type2 = "전기"
    elif type2 == "Psychic":
        type2 = "에스퍼"
    elif type2 == "Ice":
        type2 = "얼음"
    elif type2 == "Dragon":
        type2 = "드래곤"
    elif type2 == "Dark":
        type2 = "악"
    elif type2 == "Fairy":
        type2 = "페어리"
    
    
    
    bigTable = soup.select('table.table-stats > tr > td')
    statTable = str(bigTable).split('<td>')
    skills = soup.select('table.moveset > tr > td > a')
    dps = soup.select('table.moveset > tr > td')
    rank = str(soup.select('div.rank')).split('</em>')[0].split('<em>')[1]

    attack = statTable[1].split('<')[0]
    defense = statTable[3].split('<')[0]
    stamina = statTable[5].split('<')[0]

    lv15 = (statTable[6].split('<')[0]).strip()
    lv20 = (statTable[7].split('<')[0]).strip()
    lv25 = (statTable[10].split('<')[0]).strip()
    lv30 = (statTable[8].split('<')[0]).strip()
    lv35 = (statTable[11].split('<')[0]).strip()
    lv40 = (statTable[9].split('<')[0]).strip()
    
    lv15 = lv15.replace(',','')
    lv20 = lv20.replace(',','')
    lv25 = lv25.replace(',','')
    lv30 = lv30.replace(',','')
    lv35 = lv35.replace(',','')
    lv40 = lv40.replace(',','')

    catchRate = (statTable[16].split('<')[0]).strip()
    escapeRate = (statTable[18].split('<')[0]).strip()
    walkDistance = (statTable[20].split('<')[0]).strip()

    attack_FAST = str(skills).split('</a>')[0].split('>')[1]
    attack_FAST_DPS = str(dps).split('<td>')[2].split('<sub')[0].strip()
    attack_CHARGE = str(skills).split('</a>')[1].split('>')[1]
    attack_CHARGE_DPS = str(dps).split('<td>')[4].split('<sub')[0].strip()
    
    defense_FAST = str(skills).split('</a>')[2].split('>')[1]
    defense_FAST_DPS = str(dps).split('<td>')[6].split('<sub')[0].strip()
    defense_CHARGE = str(skills).split('</a>')[3].split('>')[1]
    defense_CHARGE_DPS = str(dps).split('<td>')[8].split('<sub')[0].strip()
    
    #return rank
    print (pokedexNumber)
    second.write(pokemonName + ',')
    #pokedexNumber pokemonName type1 type2 attack defense stamina rank lv15 lv20 lv25 lv30 lv35 lv40 walkDistance catchRate escapeRate attack_FAST attack_FAST_DPS attack_CHARGE attack_CHARGE_DPS defense_FAST defense_FAST_DPS defense_CHARGE defense_CHARGE_DPS
    f.write('\n' + 
            pokedexNumber + ',' + 
            pokemonName + ',' + 
            type1 + ',' + 
            type2 + ',' + 
            attack + ',' + 
            defense + ',' + 
            stamina + ',' + 
            rank + ',' + 
            lv15 + ',' + 
            lv20 + ',' + 
            lv25 + ',' + 
            lv30 + ',' + 
            lv35 + ',' + 
            lv40 + ',' + 
            walkDistance + ',' + 
            catchRate + ',' + 
            escapeRate + ',' + 
            attack_FAST + ',' + 
            attack_FAST_DPS + ',' + 
            attack_CHARGE + ',' + 
            attack_CHARGE_DPS + ',' + 
            defense_FAST + ',' + 
            defense_FAST_DPS + ',' + 
            defense_CHARGE + ',' + 
            defense_CHARGE_DPS)
    


for count in range(1,494):
    if count != 151:
        crawl_pokemonInfo(count)
"""

crawl_pokemonInfo("351/normal")
crawl_pokemonInfo("351/sunny")
crawl_pokemonInfo("351/rainy")
crawl_pokemonInfo("351/snowy")

"""

#crawl_pokemonInfo(248)

print ("끝났다")

f.close()

#151,뮤,Psychic,NONE,210,210,200,25,1324,1766,2207,2649,2870,3090,20 km,10000%,0%,섀도크루,12.9,솔라빔,36.7,볼트체인지,8.7,솔라빔,36.7

'''
351,캐스퐁,Normal,NONE,139,139,140,285,636,849,1061,1273,1379,1486,5 km,30%,10%,몸통박치기,12,폭풍,40.7,병상첨병,8.3,에너지볼,23.1
351,캐스퐁,Fire,NONE,139,139,140,285,636,849,1061,1273,1379,1486,5 km,30%,10%,불꽃세례,12,불대문자,40,불꽃세례,12,솔라빔,36.7
351,캐스퐁,Water,NONE,139,139,140,285,636,849,1061,1273,1379,1486,5 km,30%,10%,물대포,12,하이드로펌프,47.3,물대포,12,하이드로펌프,47.3
351,캐스퐁,Ice,NONE,139,139,140,285,636,849,1061,1273,1379,1486,5 km,30%,10%,눈싸라기,7.2,눈보라,50.3,눈싸라기,7.2,눈보라,50.3

386,테오키스 - 노말폼,Psychic,NONE,345,115,100,80,1178,1570,1963,2356,2552,2749,20 km,6%,1%,사념의박치기,13.1,파괴광선,39.5,차지빔,7.3,파괴광선,39.5
386,테오키스 - 어택폼,Psychic,NONE,414,46,100,80,961,1282,1603,1923,2083,2244,20 km,6%,1%,사념의박치기,13.1,전자포,37.8,사념의박치기,13.1,악의파동,26.7
386,테오키스 - 디펜스폼,Psychic,NONE,144,330,100,80,847,1130,1412,1695,1836,1978,20 km,6%,1%,카운터,13.3,전자포,37.8,사념의박치기,13.1,스톤샤워,29.6
386,테오키스 - 스피드폼,Psychic,NONE,230,218,100,80,1073,1431,1789,2147,2325,2504,20 km,6%,1%,사념의박치기,13.1,전자포,37.8,차지빔,7.3,전자포,37.8

413,도롱마담 - Plant,Bug,Grass,141,180,155,244,760,1013,1267,1520,1647,1773,1 km,15%,7%,벌레먹음,12,벌레의야단법석,29.2,염동력,12.5,벌레의야단법석,29.2
413,도롱마담 - Sandy,Bug,Ground,127,175,155,244,683,910,1138,1366,1480,1593,1 km,15%,7%,벌레먹음,12,벌레의야단법석,29.2,염동력,12.5,벌레의야단법석,29.2
413,도롱마담 - Trash,Bug,Steel,141,180,155,244,760,1013,1267,1520,1647,1773,1 km,15%,7%,벌레먹음,12,벌레의야단법석,29.2,염동력,12.5,벌레의야단법석,29.2

421,체리꼬 - Overcast,Grass,NONE,170,153,172,189,877,1170,1462,1755,1901,2048,3 km,10%,7%,잎날가르기,15.6,솔라빔,44.1,기관총,8.7,솔라빔,44.1
421,체리꼬 - Sunny,Grass,NONE,170,153,172,189,877,1170,1462,1755,1901,2048,3 km,10%,7%,잎날가르기,15.6,솔라빔,44.1,기관총,8.7,솔라빔,44.1

422,깝질무 - East Sea,Water,NONE,103,105,183,339,486,649,811,973,1054,1136,5 km,50%,10%,잠재파워,10,물의파동,26.3,잠재파워,10,물의파동,26.3
422,깝질무 - West Sea,Water,NONE,103,105,183,339,486,649,811,973,1054,1136,5 km,50%,10%,잠재파워,10,물의파동,26.3,잠재파워,10,물의파동,26.3
423,트리토돈 - East Sea,Water,Ground,169,143,244,139,996,1328,1660,1992,2158,2324,5 km,20%,6%,진흙뿌리기,12.9,지진,40,진흙뿌리기,12.9,지진,40
423,트리토돈 - West Sea,Water,Ground,169,143,244,139,996,1328,1660,1992,2158,2324,5 km,20%,6%,진흙뿌리기,12.9,지진,40,진흙뿌리기,12.9,지진,40

479,로토무,Electric,Ghost,204,219,137,101,1105,1474,1842,2211,2395,2579,5 km,30%,10%,전기쇼크,10,10만볼트,38.4,전기쇼크,10,10만볼트,38.4
479,로토무 - Fan,Electric,Flying,204,219,137,101,1105,1474,1842,2211,2395,2579,5 km,30%,10%,에어슬래시,14,10만볼트,38.4,에어슬래시,14,10만볼트,38.4
479,로토무 - Frost,Electric,Ice,204,219,137,101,1105,1474,1842,2211,2395,2579,5 km,30%,10%,전기쇼크,10,10만볼트,38.4,전기쇼크,10,10만볼트,38.4
479,로토무 - Heat,Electric,Fire,204,219,137,101,1105,1474,1842,2211,2395,2579,5 km,30%,10%,전기쇼크,10,오버히트,48,전기쇼크,10,10만볼트,38.4
479,로토무 - Mow,Electric,Grass,204,219,137,101,1105,1474,1842,2211,2395,2579,5 km,30%,10%,전기쇼크,10,10만볼트,38.4,전기쇼크,10,10만볼트,38.4
479,로토무 - Wash,Electric,Water,185,159,137,101,870,1160,1451,1741,1886,2031,5 km,30%,10%,전기쇼크,10,10만볼트,38.4,전기쇼크,10,10만볼트,38.4

487,기라티나 - Altered,Ghost,Dragon,187,225,284,22,1448,1931,2414,2897,3138,3379,20 km,2%,4%,섀도크루,15.4,드래곤크루,35.3,섀도크루,15.4,원시의힘,20
487,기라티나 - Origin,Ghost,Dragon,225,187,284,22,1578,2105,2631,3157,3420,3683,20 km,2%,4%,섀도크루,15.4,드래곤크루,35.3,섀도크루,15.4,원시의힘,20

492,쉐이미 - Land,Grass,NONE,261,166,225,19,1539,2052,2566,3079,3336,3592,20 km,2%,0%,사념의박치기,10.9,솔라빔,44.1,잠재파워,10,솔라빔,44.1
492,쉐이미 - Sky,Grass,Flying,210,210,225,19,1399,1865,2332,2799,3032,3265,20 km,2%,0%,사념의박치기,10.9,솔라빔,44.1,잠재파워,10,솔라빔,44.1


'''






