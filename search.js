/**
 * @author ame89
 */

require([
        "esri/map",
        "esri/dijit/Search",
        "esri/geometry/Extent",
        "esri/graphic",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/screenUtils",
        "dojo/dom",
        "dojo/dom-construct",
        "dojo/query",
        "dojo/_base/Color",
        "esri/dijit/BasemapGallery",
		"esri/layers/FeatureLayer",
		"esri/InfoTemplate",
        "dojo/domReady!"
      ], function (Map, Search, Extent, Graphic, SimpleMarkerSymbol, screenUtils, dom, domConstruct, query, Color, BasemapGallery, FeatureLayer, InfoTemplate,) {
         // create a map and instance of the search widget here
         var map = new Map("map", {
            basemap: "topo",
            center: [-97.911530, 29.890661],
            zoom: 9
         });

         var search = new Search({
            map: map
         }, dom.byId("search"));
         

         //make sure to start up the widget!
         search.startup();


         var content = "<b>Address</b>: ${Address}" +
					"<br><b>Day Open</b>: ${Day}" +
					"<br><b>Time Open</b>: ${Time}" +
					"<br><b>Website</b>: ${Website}";
				var infoTemplate = new InfoTemplate("${Name}", content);

		    var urlString = "https://services8.arcgis.com/nlrn12w6Bsh0hi4J/ArcGIS/rest/services/FarmerMarkets/FeatureServer/0";
		      featureLayer = new FeatureLayer(urlString, {
			    infoTemplate: infoTemplate,
			    outFields: ["*"]
		    });

			  map.addLayers([featureLayer]);
			
		    var basemapGallery = new BasemapGallery({
			    showArcGISBasemaps: true,
			    map:map
		      },"basemapGalleryDiv");
		      basemapGallery.startup();
		      basemapGallery.on("error",function(msg){
		      console.log("basemap gallery error", msg);
		      });
      });
});
