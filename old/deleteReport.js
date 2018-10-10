
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