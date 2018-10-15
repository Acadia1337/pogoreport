import requests
from bs4 import BeautifulSoup
f = open("pokemonInfo.txt", 'w')
second = open("pokedexNumbers.txt", 'w')

def crawl_pokemonInfo(number):
    req = requests.get("https://pokemon.gameinfo.io/ko/pokemon/" + str(number)) #connection
    html =  req.text
    soup = BeautifulSoup(html, 'html.parser')

    pokemonName = (str(soup.select('h1.mobile-only.mobile-title')).split('>'))[1].split('(Pok')[0].strip()
    
    if '의 모습' in pokemonName:
        pokemonName = str(pokemonName.split('-')[0]).strip()
    
    pokedexNumber = (str(soup.select('div.togglable > p > a.button')).split('-')[0]).split('/')[-1]
    type1 = soup.select('div.large-type')
    type2 = 'NONE'
    if "subtype" in str(type1):
        type2 = (str(type1).split('">')[3]).split('</')[0]
    type1 = (str(type1).split('">')[2]).split('</')[0]
    bigTable = soup.select('table.table-stats > tr > td')
    statTable = str(bigTable).split('<td>')
    skills = soup.select('table.moveset > tr > td > a')

    attack = statTable[1].split('<')[0]
    defense = statTable[3].split('<')[0]
    stamina = statTable[5].split('<')[0]

    lv15 = (statTable[6].split('<')[0]).strip()
    lv20 = (statTable[7].split('<')[0]).strip()
    lv25 = (statTable[10].split('<')[0]).strip()
    lv30 = (statTable[8].split('<')[0]).strip()
    lv35 = (statTable[11].split('<')[0]).strip()
    lv40 = (statTable[9].split('<')[0]).strip()

    catchRate = (statTable[15].split('<')[0]).strip()
    escapeRate = (statTable[17].split('<')[0]).strip()
    walkDistance = (statTable[19].split('<')[0]).strip()

    attack_FAST = str(skills).split('</a>')[0].split('>')[1]
    attack_CHARGE = str(skills).split('</a>')[1].split('>')[1]
    defense_FAST = str(skills).split('</a>')[2].split('>')[1]
    defense_CHARGE = str(skills).split('</a>')[3].split('>')[1]
    
    #return pokemonName
    print (pokedexNumber)
    second.write(pokemonName + ',')
    f.write('\n' + pokemonName + ',' + pokedexNumber + ',' + type1 + ',' + type2 + ',' + attack + ',' + defense + ',' + stamina + ',' + lv15 + ',' + lv20 + ',' + lv25 + ',' + lv30 + ',' + lv35 + ',' + lv40 + ',' + catchRate + ',' + escapeRate + ',' + walkDistance + ',' + attack_FAST + ',' + attack_CHARGE + ',' + defense_FAST + ',' + defense_CHARGE)


for count in range(1,387):
    if count != 151:
        crawl_pokemonInfo(count)

#print (crawl_pokemonInfo(251));


print ("끝났다")

f.close()

