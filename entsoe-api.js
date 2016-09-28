const https = require('https');
var AdmZip = require('adm-zip');
var xmlParser = require('xml2json');

ENTSOEapi = function(webapikey) {
		this.webkey=webapikey;		
};

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Object.defineProperty(Date.prototype, 'YYYYMMDDHHMM', {
    value: function() {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear() +
               pad2(this.getMonth() + 1) + 
               pad2(this.getDate()) +
               pad2(this.getHours()) +
               "00";
    }
});

ENTSOEapi.buildPeriod = function(date) {	
	return date.YYYYMMDDHHMM();
}


ENTSOEapi.parseData=function(databuffer) {
	var ret="";
	try {
		var zip = new AdmZip(databuffer);
		var zipEntries = zip.getEntries(); 
		ret="[";
		for(var i=0;i<zipEntries.length;i++) {
				ret+=ENTSOEapi.parseData(zipEntries[i].getData());
				ret+=",";
		}		
		ret=ret.substr(0,ret.length-1);
		ret+="]";
		
	} catch(e) {		
		ret=xmlParser.toJson(databuffer.toString());
	}	
	return ret;
}

ENTSOEapi.prototype.getData=function(options,callback) {
	var reqStr="";	
	if(this.webkey=="YOUR-ENTSOE-WEB-API-KEY") return;
	reqStr="https://transparency.entsoe.eu/api?securityToken="+this.webkey;	
	for (var k in options){
			if (options.hasOwnProperty(k)) {
					reqStr+="&"+k+"="+options[k];				 
			}
	}
	//console.log(reqStr);
	var buf = new Buffer(0);
	
	https.get(reqStr, (res) => {
			  //console.log('headers: ', res.headers);
			  res.on('data', (d) => {
				buf=Buffer.concat([buf, d]);
			  });
			  res.on('end', (d) => {				
				callback(buf);
			  });
			  
			  }).on('error', (e) => {
			  console.error(e);
	});
}

ENTSOEapi.query = function(defaults) {
		this.defaults=defaults;

}
ENTSOEapi.query.loadDefaults=function(defaults,options) {
	for (var k in options){
			if (options.hasOwnProperty(k)) {
					if(defaults[k]) {
						options[k]=defaults[k];
					}								
			}
	}
return options;
}


ENTSOEapi.query.prototype.physicalFlows = function() {
	var options= {
			documentType:"A11",
			in_Domain:"",
			out_Domain:"",		
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.installedGenerationCapacity  = function() {
	var options= {
			documentType:"A68",
			processType:"A33",
			in_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}
ENTSOEapi.query.prototype.dayAheadGeneration  = function() {
	var options= {
			documentType:"A71",
			processType:"A01",
			in_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}
ENTSOEapi.query.prototype.actualGeneration  = function() {
	var options= {
			documentType:"A73",
			processType:"A16",
			in_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}
ENTSOEapi.query.prototype.actualGenerationPerType  = function() {
	var options= {
			documentType:"A75",
			processType:"A16",
			in_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.installedGenerationCapacityPerUnit  = function() {
	var options= {
			documentType:"A71",
			processType:"A33",
			in_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.actualTotalLoad = function() {
	var options= {
			documentType:"A65",
			processType:"A16",
			outBiddingZone_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}



ENTSOEapi.query.prototype.dayAheadTotalLoadForecast = function() {
	var options= {
			documentType:"A65",
			processType:"A01",
			outBiddingZone_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.weekAheadTotalLoadForecast = function() {
	var options= {
			documentType:"A65",
			processType:"A31",
			outBiddingZone_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.monthAheadTotalLoadForecast = function() {
	var options= {
			documentType:"A65",
			processType:"A32",
			outBiddingZone_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.yearAheadTotalLoadForecast = function() {
	var options= {
			documentType:"A65",
			processType:"A33",
			outBiddingZone_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.yearAheadForecastMargin = function() {
	var options= {
			documentType:"A70",
			processType:"A33",
			outBiddingZone_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.ExpansionAndDismantlingProjects  = function() {
	var options= {
			documentType:"A90",
			businessType:"B01",
			in_Domain:"",
			out_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.Redispatch  = function() {
	var options= {
			documentType:"A63",			
			in_Domain:"",
			out_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.Countertrading  = function() {
	var options= {
			documentType:"A91",			
			in_Domain:"",
			out_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.CongestionCosts  = function() {
	var options= {
			documentType:"A91",			
			in_Domain:"",
			out_Domain:"",
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.PlannedUnavailabilityOfConsumptionUnits  = function() {
	var options= {
			documentType:"A76",	
			businessType:"A53",			
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.ForcedUnavailabilityOfConsumptionUnits  = function() {
	var options= {
			documentType:"A76",	
			businessType:"A54",			
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.PlannedUnavailabilityOfGenerationUnits  = function() {
	var options= {
			documentType:"A80",	
			businessType:"A53",			
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.ForcedUnavailabilityOfGenerationUnits  = function() {
	var options= {
			documentType:"A80",	
			businessType:"A54",			
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.PlannedUnavailabilityOfProductionUnits  = function() {
	var options= {
			documentType:"A77",	
			businessType:"A53",			
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.ForcedUnavailabilityOfProductionUnits  = function() {
	var options= {
			documentType:"A77",	
			businessType:"A54",			
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.PlannedUnavailabilityOfTransmissionUnits  = function() {
	var options= {
			documentType:"A78",	
			businessType:"A53",			
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.ForcedUnavailabilityOfTransmissionUnits  = function() {
	var options= {
			documentType:"A78",	
			businessType:"A54",			
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

ENTSOEapi.query.prototype.PlannedUnavailabilityOfOffshore  = function() {
	var options= {
			documentType:"A79",						
			biddingZone_Domain:"",	
			periodStart:ENTSOEapi.buildPeriod(new Date()),
			periodEnd:ENTSOEapi.buildPeriod(new Date())
	}
	
	return ENTSOEapi.query.loadDefaults(this.defaults,options);
}

module.exports=ENTSOEapi;	