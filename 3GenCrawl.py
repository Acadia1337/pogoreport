import requests
from bs4 import BeautifulSoup
f = open("pokemonInfo.txt", 'w')
second = open("pokedexNumbers.txt", 'w')

def crawl_pokemonInfo(number):
    req = requests.get("https://pokemon.gameinfo.io/ko/pokemon/" + str(number)) #connection
    html =  req.text
    soup = BeautifulSoup(html, 'html.parser')

    pokemonName = (str(soup.select('h1.mobile-only.mobile-title')).split('>'))[1].split('(Pok')[0].strip()
    
    pokedexNumber = (str(soup.select('div.togglable > p > a.button')).split('-')[0]).split('/')[-1]
    type1 = soup.select('div.large-type')
    type2 = 'NONE'
    if "subtype" in str(type1):
        type2 = (str(type1).split('">')[3]).split('</')[0]
    type1 = (str(type1).split('">')[2]).split('</')[0]
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
    


for count in range(1,387):
    if count != 151:
        crawl_pokemonInfo(count)

print (crawl_pokemonInfo(251));

#crawl_pokemonInfo(248)

print ("끝났다")

f.close()



