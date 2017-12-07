/*GEO 5408 Project: Web Mapping,
Authors: Anna Essington, Krysten Kuwamura, Melanie Ratchford, Tasnuva Udita
Date: 12.10.2017
*/



var map;
require([
        "esri/map",
        "esri/dijit/BasemapGallery",
        "esri/arcgis/utils",
        "dojo/parser",
        "dijit/layout/ContentPane",
        "dijit/layout/BorderContainer",
        "dijit/layout/AccordionContainer",
        "dijit/layout/TabContainer",
        "esri/layers/FeatureLayer",
        "esri/dijit/InfoWindowLite",
        "esri/InfoTemplate",
        "esri/dijit/Attribution",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/on",
        "dojo/domReady!"
    ],
    function(
        Map,
        BasemapGallery,
        arcgisUtils,
        parser,
        FeatureLayer,
        InfoWindowLite,
        InfoTemplate,
        Attribution,
        dom,
        domConstruct,
        on
    ) {
        parser.parse();
        //Set the basemap 
        map = new Map("mapDiv", {
            basemap: "topo",
            center: [-97.911530, 29.890661],
            zoom: 8,
        });

        //Set basemap gallery
        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: true,
            map: map
        }, "basemapGalleryDiv");
        basemapGallery.startup();
        basemapGallery.on("error", function(msg) {
            console.log("basemap gallery error: ", msg);
        });

        //Importing the feature layer from the server
        var urlString = "https://services8.arcgis.com/nlrn12w6Bsh0hi4J/ArcGIS/rest/services/FarmerMarkets/FeatureServer/0";
		FarmerMarkets = new FeatureLayer(urlString, {
			infoTemplate: infoTemplate,
			outFields: ["*"]
		});

        //Adding the feature layer
        map.addLayers(FarmerMarkets);

        //Set handler for day change event
        on(dom.byId("daySelect"), "change", function(evt) {
            var dayChoice = evt.target.Day;
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
            } else (dayChoice === 'all') {
            	FarmerMarkets.setDefinitionExpression("DayNum<=7");
            }
        });
     
        //Set copyright information
        let attribution = new Attribution({
            map: map
        }, "copyright");

    }
);

