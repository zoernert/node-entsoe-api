require("./entsoe-api.js");
var entsoeApi = new ENTSOEapi("YOUR-ENTSOE-WEB-API-KEY");


periodstart=new Date();
periodstart.setDate(periodstart.getDate()-4);

periodend=new Date();

var defaults= {
	outBiddingZone_Domain:'10YCZ-CEPS-----N',
	biddingZone_Domain:'10Y1001A1001A63L',
	in_Domain:'10YCZ-CEPS-----N',
	out_Domain:'10YSK-SEPS-----K',
	periodStart:ENTSOEapi.buildPeriod(periodstart)
}
var query = new ENTSOEapi.query(defaults);

//console.log(query.yearAheadTotalLoadForecast());


entsoeApi.getData(query.actualGenerationPerType(),function(data) {
	//console.log(".");
	var ret=ENTSOEapi.parseData(data);
	console.log(JSON.parse(ret));
	});
/*
entsoeApi.getData(query.monthAheadTotalLoadForecast(),function(data) {
	console.log(data.toString());
	console.log(ENTSOEapi.parseData(data));

});
*/
/*
entsoeApi.getData({
	documentType:'A65',
	processType:'A16',
	outBiddingZone_Domain:'10YCZ-CEPS-----N',
	periodStart:ENTSOEapi.buildPeriod(periodstart),
	periodEnd:ENTSOEapi.buildPeriod(periodend)
},function(data) {
	//console.log(".");
	console.log(ENTSOEapi.parseData(data));

});
*/