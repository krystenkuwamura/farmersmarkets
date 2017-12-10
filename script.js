/**
 * @author ame89
 */
require(["esri/map",
			"esri/dijit/BasemapGallery",
			"esri/dijit/Search",
			"esri/request",
			"esri/dijit/PopupTemplate",
			"esri/dijit/analysis/ConnectOriginsToDestinations",
			"esri/dijit/editing/Editor",
        	"esri/layers/FeatureLayer",
        	"esri/arcgis/utils",
        	"esri/urlUtils",
        	"esri/tasks/query",
        	"esri/toolbars/draw",
        	"esri/dijit/Attribution",
        	"esri/InfoTemplate",
        	"esri/dijit/InfoWindowLite",
        	"esri/InfoTemplate",
        	"dojo/ready",
        	"dojo/_base/array",
        	"dojo/dom",
        	"dojo/on",
        	"dojo/dom-construct",
        	"dojo/domReady!"],function(Map, BasemapGallery, Search, esriRequest, PopupTemplate, ConnectOriginsToDestinations, Editor, FeatureLayer, arcgisUtils, urlUtils, Query, Draw, Attribution, InfoTemplate, InfoWindowLite, InfoTemplate, ready, arrayUtils, dom, on, domConstruct){
        		var map = new Map("map",{
        			basemap: "streets",
        			autoresize: true,
        			center: [-97.911530, 29.890661],
        			zoom: 8
        		});
        		
        		window.alert("sign in using Username: farmersmarkets and Pasword: eatlocal1");
        		
        		
        		//Set basemap gallery
		        var basemapGallery = new BasemapGallery({
		            showArcGISBasemaps: true,
		            map: map
		        }, "basemapGalleryDiv");
		        basemapGallery.startup();
		        basemapGallery.on("error", function(msg) {
		            console.log("basemap gallery error: ", msg);
		        });
		        
		        //Set search widget (Geocoding)
		        var search = new Search({
		            map: map
		         }, dom.byId("search"));
		         //Start up the search widget
		         search.startup();
		
		         //Set infoTemplate for the farmer's market layer
		         var content = "<b>Address</b>: ${Address}" +
							"<br><b>Day Open</b>: ${Day}" +
							"<br><b>Time Open</b>: ${Time}" +
							"<br><b>Website</b>: ${Website}";
				 var fminfoTemplate = new InfoTemplate("${Name}", content);
        		
        		var originLayer = new FeatureLayer("https://services8.arcgis.com/lcCbRZlhR10y9rxg/arcgis/rest/services/origin/FeatureServer/0", {
		          mode: FeatureLayer.MODE_ONDEMAND,
		          outFields: ["*"]
		        });
		        
		        var destinationLayer = new FeatureLayer("https://services8.arcgis.com/lcCbRZlhR10y9rxg/arcgis/rest/services/destination/FeatureServer/0", {
		          mode: FeatureLayer.MODE_ONDEMAND,
		          outFields: ["*"]
		        });
        		
        		let urlString = "https://services8.arcgis.com/nlrn12w6Bsh0hi4J/arcgis/rest/services/FarmerMarkets/FeatureServer/0";
        		var FarmerMarkets = new FeatureLayer(urlString, {
        			mode: FeatureLayer.MODE_ONDEMAND,
        			infoTemplate: fminfoTemplate,
        			outFields: ["*"]
				});
		        
		        map.addLayers([originLayer, destinationLayer, FarmerMarkets]);
		        map.on("layers-add-result", initEditing);
				map.on("layers-add-result", initializeTool);
		        map.infoWindow.resize(400, 300);
		        
		        //Define Editing function
		        function initEditing (event) {
		          //Get feature layer information
		          var featureLayerInfos = arrayUtils.map(event.layers, function (layer) {
		            return {
		              "featureLayer": layer.layer
		            };
		          });
				  //Define map to use and use featureLayerInfos to define feature layers
		          var settings = {
		            map: map,
		            layerInfos: featureLayerInfos
		          };
		          //Use settings to define parameters and use in new Editor
		          var params = {
		            settings: settings
		          };
		          var editorWidget = new Editor(params, 'editorDiv');
		          editorWidget.startup(); 
		
		        }
				
				function initializeTool() {
          			var params = {};
          			params.portalUrl = "https://www.arcgis.com";
          			params.originsLayers = [ originLayer ];
          			params.featureLayers = [ destinationLayer ];
          			params.map = map;
          			params.distanceDefaultUnits = "Miles";
          			params.returnFeatureCollection = true;
          			var analysisTool = new ConnectOriginsToDestinations(params, "toolPane");
          			analysisTool.startup();
          			analysisTool.on("job-result", function(result) {
            			var resultLayer = new FeatureLayer(result.value.url || result.value, {
              			outFields: ['*'],
              			infoTemplate: new InfoTemplate()
            			});
            			map.addLayer(resultLayer);
          			});
				}
						
				//Set handler for day change event
        		on(dom.byId("daySelect"), "change", function(evt) {
            		var dayChoice = evt.target.value;
            		if (dayChoice === 'sunday') {
                		FarmerMarkets.setDefinitionExpression("DayNum=1");
		            } else if (dayChoice === 'monday') {
		                FarmerMarkets.setDefinitionExpression("DayNum=2");
		            } else if (dayChoice === 'tuesday') {
		                FarmerMarkets.setDefinitionExpression("DayNum=3");
		            } else if (dayChoice === 'wednesday') {
		                FarmerMarkets.setDefinitionExpression("DayNum=4");
		            } else if (dayChoice === 'thursday') {
		                FarmerMarkets.setDefinitionExpression("DayNum=5");
		            } else if (dayChoice === 'friday') {
		                FarmerMarkets.setDefinitionExpression("DayNum=6");
		            } else if (dayChoice === 'saturday') {
		                FarmerMarkets.setDefinitionExpression("DayNum=7");
		            } else if (dayChoice === 'all') {
		            	FarmerMarkets.setDefinitionExpression("DayNum<=7");
		            }
		        });
		        
        		
        		//Set copyright information
		        let attribution = new Attribution({
		            map: map
		        }, "copyright");
        	});