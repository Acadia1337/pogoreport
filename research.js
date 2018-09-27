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
            break;
        } else 