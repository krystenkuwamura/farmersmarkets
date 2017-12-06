/**
 * @author ame89
 */


function insertdate() { 
	var date = new Date(); 
	var month = date.getMonth();
	month = month + 1;
	var day = date.getDate ();
	var year = date.getFullYear ();
	var hour = date.getHours ();
	var minute = date.getMinutes ();
	var datestring = month, "-", day, "-", year, "/", hour, ":", minute;
		document.getElementById("date").innerHTML = datestring;       
}	
insertdate();
	


require(["esri/map",
        	"esri/layers/FeatureLayer",
        	"esri/tasks/query",
        	"esri/toolbars/draw",
        	"dojo/dom",
        	"dojo/on",
        	"dojo/dom-construct",
        	"dojo/domReady!"],function(Map, FeatureLayer, Query, Draw, dom, on, domConstruct){
        		let map = new Map("map",{
        			basemap: "streets",
        			autoresize: true,
        			center: [-97.911530, 29.890661],
        			zoom: 8
        		});
        		let urlString = "https://services8.arcgis.com/nlrn12w6Bsh0hi4J/arcgis/rest/services/FarmerMarkets/FeatureServer/0";
        		FarmerMarkets = new FeatureLayer(urlString, {
        			mode: FeatureLayer.MODE_ONDEMAND,
        			outFields: ["*"]
				});
				//Set handler for day change event
        		on(dom.byId("daySelect"), "change", function(evt) {
            		var dayChoice = evt.target.value;
            		if (dayChoice === 'sunday') {
                		FarmerMarkets.setDefinitionExpression("Day='Sun'");
            		} else if (dayChoice === 'monday') {
                		FarmerMarkets.setDefinitionExpression("Day='Mon'");
            		} else if (dayChoice === 'tuesday') {
                		FarmerMarkets.setDefinitionExpression("Day='Tue'");
            		} else if (dayChoice === 'wednesday') {
                		FarmerMarkets.setDefinitionExpression("Day='Wed'");
            		} else if (dayChoice === 'thursday') {
                		FarmerMarkets.setDefinitionExpression("Day='Thur'");
            		} else if (dayChoice === 'friday') {
                		FarmerMarkets.setDefinitionExpression("Day='Fri'");
            		} else if (dayChoice === 'saturday') {
                		FarmerMarkets.setDefinitionExpression("Day='Sat'");
            		} else (dayChoice === 'all') {
				FarmerMarkets.setDefinitionExpression("Day");
			}
        		});
        		map.addLayer(FarmerMarkets);
        	});
