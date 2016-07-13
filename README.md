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

## Useful Links

See full API spec at ENTSOe: https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html

ACER List of standard contract: https://www.acer-remit.eu/portal/document-download?documentId=z235pl461qr


## Contributing
https://blog.stromhaltig.de/ 

## Release History

* 0.0.1 Initial release