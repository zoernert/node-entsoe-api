ENTSOe-API for Node JS
=========

## Installation
```
  npm install entsoe-api --save
```
 
## Usage

Basic
```javascript
	require("entsoe-api");
    var entsoeApi = new ENTSOEapi("YOUR-WEB-API-KEY");
		
	// Optional: Set some basic TimeInterval as most queries need that...	
	var periodstart=new Date();
	periodstart.setDate(periodstart.getDate()-4); // 4 Days back
	var periodend=new Date();

	// Optional: Set some defaults for your query
	var defaults= {
			outBiddingZone_Domain:'10YCZ-CEPS-----N',
			biddingZone_Domain:'10Y1001A1001A63L',
			in_Domain:'10YCZ-CEPS-----N',
			out_Domain:'10YSK-SEPS-----K',
			periodStart:ENTSOEapi.buildPeriod(periodstart),
			periodEnd:ENTSOEapi.buildPeriod(periodend),
	}
	
	var query = new ENTSOEapi.query(defaults);
	
	
	// Query for Actual Generation
	entsoeApi.getData(query.actualGenerationPerType(),function(data) {	
		var ret=ENTSOEapi.parseData(data);
		console.log(JSON.parse(ret));
	});
		
``` 

The query functions are pure helpers and you might overwrite all parameters:
```javascript
	var query = new ENTSOEapi.query(defaults);
	var options=query.actualGenerationPerType();	
	options.in_Domain='10YCZ-CEPS-----N';	
``` 

## Available Queries
<table>
<tr><td>physicalFlows</td></tr>
<tr><td>installedGenerationCapacity</td></tr>
<tr><td>dayAheadGeneration</td></tr>
<tr><td>actualGeneration</td></tr>
<tr><td>actualGenerationPerType</td></tr>
<tr><td>installedGenerationCapacityPerUnit</td></tr>
<tr><td>actualTotalLoad</td></tr>
<tr><td>dayAheadTotalLoadForecast</td></tr>
<tr><td>weekAheadTotalLoadForecast</td></tr>
<tr><td>monthAheadTotalLoadForecast</td></tr>
<tr><td>yearAheadTotalLoadForecast</td></tr>
<tr><td>yearAheadForecastMargin</td></tr>
<tr><td>ExpansionAndDismantlingProjects</td></tr>
<tr><td>Redispatch</td></tr>
<tr><td>Countertrading</td></tr>
<tr><td>CongestionCosts</td></tr>
<tr><td>PlannedUnavailabilityOfConsumptionUnits</td></tr>
<tr><td>ForcedUnavailabilityOfConsumptionUnits</td></tr>
<tr><td>PlannedUnavailabilityOfGenerationUnits</td></tr>
<tr><td>ForcedUnavailabilityOfGenerationUnits</td></tr>
<tr><td>PlannedUnavailabilityOfProductionUnits</td></tr>
<tr><td>ForcedUnavailabilityOfProductionUnits</td></tr>
<tr><td>PlannedUnavailabilityOfTransmissionUnits</td></tr>
<tr><td>ForcedUnavailabilityOfTransmissionUnits</td></tr>
<tr><td>PlannedUnavailabilityOfOffshore</td></tr>
<tr><td>dayAheadGenerationForecastWindAndSolar</td></tr>
</table>

If you like to add a query type - do not hesitate to send a pull request... it is easy :)

## Useful Links

See full API spec at ENTSOe: https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html

ACER List of standard contract: https://www.acer-remit.eu/portal/document-download?documentId=z235pl461qr


## Contributing
https://blog.stromhaltig.de/ 

## Release History

* 0.0.1 Initial release
* 0.0.2 Update for STROMDAO / Stromhaltig Tarif usage

