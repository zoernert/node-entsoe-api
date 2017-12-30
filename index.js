require("./entsoe-api.js");
var entsoeApi = new ENTSOEapi("---YOUR WEB API KEY HERE ---");


periodstart=new Date();
periodstart.setDate(periodstart.getDate());

periodend=new Date();
periodend.setDate(periodstart.getDate()+2);

var defaults= {
	outBiddingZone_Domain:'10Y1001A1001A83F',
	biddingZone_Domain:'10Y1001A1001A83F',
	in_Domain:'10Y1001A1001A83F',
	out_Domain:'10Y1001A1001A83F',
	periodStart:ENTSOEapi.buildPeriod(periodstart),
	periodEnd:ENTSOEapi.buildPeriod(periodend)
}
// 10Y1001A1001A83F

var query = new ENTSOEapi.query(defaults);

//console.log(query.yearAheadTotalLoadForecast());

// Total Load Forecast

/*
entsoeApi.getData(query.dayAheadTotalLoadForecast(),function(data) {
	//console.log(".");
	var ret=ENTSOEapi.parseData(data);
	//console.log(JSON.parse(ret).GL_MarketDocument.TimeSeries[1].Period);
	console.log("Start Time",new Date(JSON.parse(ret).GL_MarketDocument.TimeSeries[1].Period.timeInterval.start).toLocaleString());
	console.log("End Time",new Date(JSON.parse(ret).GL_MarketDocument.TimeSeries[1].Period.timeInterval.end).toLocaleString());
	console.log(JSON.parse(ret).GL_MarketDocument.TimeSeries[1].Period);
});
*/
entsoeApi.getData(query.dayAheadGenerationForecastWindAndSolar(),function(data) {	
	var ret=ENTSOEapi.parseData(data);	
	//console.log(JSON.parse(ret).GL_MarketDocument.TimeSeries[1].Period);
	console.log(JSON.parse(ret).GL_MarketDocument.TimeSeries.Period);
});
/*
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
