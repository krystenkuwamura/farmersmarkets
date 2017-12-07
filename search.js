/**
 * @author ame89
 */


	


require(["esri/map",
        	"esri/layers/FeatureLayer",
        	"esri/tasks/query",
        	"esri/toolbars/draw",
        	"dojo/dom",
        	"dojo/on",
        	"dojo/dom-construct",
        	"esri/dijit/Search",
        	"esri/geometry/Extent",
        	"esri/graphic",
        	"esri/symbols/SimpleMarkerSymbol",
        	"esri/geometry/screenUtils",
        	"dojo/query",
        	"dojo/_base/Color",
        	"esri/dijit/BasemapGallery",
			"esri/layers/FeatureLayer",
			"esri/InfoTemplate",
        	"dojo/domReady!"],function(Map, FeatureLayer, Query, Draw, dom, on, domConstruct, Search, Extent, Graphic, SimpleMarkerSymbol, screenUtils, query, Color, BasemapGallery, FeatureLayer, InfoTemplate,){
        		//Create a new map
        		var map = new Map("map", {
            		basemap: "topo",
            		center: [-97.911530, 29.890661],//City of San Marcos coordinates
            		zoom: 8
         			});
         		//Create search
         		var search = new Search({
            		map: map
         		}, dom.byId("search"));

         		//Create extent to limit search
         		var extent = new Extent({
            		"spatialReference": {
               		"wkid": 102100
            	},
            		"xmin": -13063280,
            		"xmax": -13033928,
            		"ymin": 4028345,
            		"ymax": 4042715
         		});

         		//Set the source's searchExtent to the extent specified above   
         		search.sources[0].searchExtent = extent;

         		//Start up the widget
         		search.startup();

         		//Set events
         		map.on("load", enableSpotlight);
         		search.on("select-result", showLocation); 
         		search.on("clear-search", removeSpotlight);
         
         	function showLocation(e) {
            	map.graphics.clear();
            	var point = e.result.feature.geometry;
            	var symbol = new SimpleMarkerSymbol().setStyle(
               		SimpleMarkerSymbol.STYLE_SQUARE).setColor(
               		new Color([255, 0, 0, 0.5])
           	 	);
            	var graphic = new Graphic(point, symbol);
            	map.graphics.add(graphic);

            	map.infoWindow.setTitle("Search Result");
            	map.infoWindow.setContent(e.result.name);
            	map.infoWindow.show(e.result.feature.geometry);
            
               var spotlight = map.on("extent-change", function () {
               var geom = screenUtils.toScreenGeometry(map.extent, map.width, map.height, e.result.extent);
               var width = geom.xmax - geom.xmin;
               var height = geom.ymin - geom.ymax;

               var max = height;
               if (width > height) {
                  max = width;
               }

               var margin = '-' + Math.floor(max / 2) + 'px 0 0 -' + Math.floor(max / 2) + 'px';

               query(".spotlight").addClass("spotlight-active").style({
                  width: max + "px",
                  height: max + "px",
                  margin: margin
               });
               spotlight.remove();
            	});
         	}

         	function enableSpotlight() {
            	var html = "<div id='spotlight'' class='spotlight'></div>";
            	domConstruct.place(html, dom.byId("map_container"), "first");
         	}

         	function removeSpotlight() {
            	query(".spotlight").removeClass("spotlight-active");
            	map.infoWindow.hide();
            	map.graphics.clear();
         	}
        		});
        	//Set ArcMapsAPI string
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
