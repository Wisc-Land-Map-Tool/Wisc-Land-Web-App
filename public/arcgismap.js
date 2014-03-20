var map, dialog;
      require([
        "esri/map", "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol","esri/arcgis/utils", 
        "esri/renderers/SimpleRenderer", "esri/graphic", "esri/lang",
        "dojo/_base/Color", "dojo/number", "dojo/dom-style", 
        "dijit/TooltipDialog", "dijit/popup", "dojo/domReady!"
      ], function(
        Map, FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol, arcgisUtils,
        SimpleRenderer, Graphic, esriLang,
        Color, number, domStyle, 
        TooltipDialog, dijitPopup
      ) {
         
  var webmapId="ebe782cf918c45a19175475bc176f08c";
        arcgisUtils.createMap(webmapId, "mapDiv").then(function (response) {
          map = response.map;   
 
        var surveySites = map.getLayer(map.graphicsLayerIds[0]);
  console.log(surveySites.graphics)
        var symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, 
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, 
            new Color([255,255,255,0.35]), 
            1
          ),
          new Color([125,125,125,0.35])
        );
        surveySites.setRenderer(new SimpleRenderer(symbol));
        map.addLayer(surveySites);
    
        map.infoWindow.resize(245,125);
        
        dialog = new TooltipDialog({
          id: "tooltipDialog",
          style: "position: absolute; width: 250px; font: normal normal normal 10pt Helvetica;z-index:100"
        });
        dialog.startup();

        //Load tasks from server

        
            $.ajax({
    url: "http://localhost:3000/users/1/assignments",
    type: "POST",
    data: JSON.stringify({user: {id: 1}}),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    contentType: "application/json",
    success: function(data){
      for(var i=0;i<data.length;i++){
        assigned[data[i].location_id]=1;
      }         
    },
    
    error: function(error) {
      console.log(error.responseText)
  }
    
    });

        var notAssignedSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 3), 
          new Color([125,125,125,0.35]));

        var assignedSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, new Color([255,255,0]), 3), 
          new Color([125,125,125,0.35]));
        
        var completedSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, new Color([0,255,0]), 3), 
          new Color([125,125,125,0.35]));
         var revisitSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, new Color([200,200,200]), 3), 
          new Color([125,125,125,0.35]));
        
  map.on("update-end",function(){
            map.graphics.clear();
          var currentSurveySites = map.getLayer(map.graphicsLayerIds[0]);
    for(var i=0;i<currentSurveySites.graphics.length;i++){
      if (assigned[currentSurveySites.graphics[i].attributes.FID]==1){
                var highlightGraphic = new Graphic(currentSurveySites.graphics[i].geometry,assignedSymbol);
      }else if (assigned[currentSurveySites.graphics[i].attributes.FID]==2){
                var highlightGraphic = new Graphic(currentSurveySites.graphics[i].geometry,completedSymbol);
      }else if (assigned[currentSurveySites.graphics[i].attributes.FID]==3){
                var highlightGraphic = new Graphic(currentSurveySites.graphics[i].geometry,revisitSymbol);
      }else {
                var highlightGraphic = new Graphic(currentSurveySites.graphics[i].geometry,notAssignedSymbol);
      }
      map.graphics.add(highlightGraphic);
    }
  });
        //close the dialog when the mouse leaves the highlight graphic
        map.on("load", function(){
          map.graphics.enableMouseEvents();
          map.graphics.on("mouse-out", closeDialog);
          
        });
                
        //listen for when the onMouseOver event fires on the countiesGraphicsLayer
        //when fired, create a new graphic with the geometry from the event.graphic and add it to the maps graphics layer
        // surveySites.on("mouse-over", function(evt){
        //   var t = "<b>${NAME}</b><hr>Description"
  
        //   var content = esriLang.substitute(evt.graphic.attributes,t);
        //   var highlightGraphic = new Graphic(evt.graphic.geometry,highlightSymbol);
        //   map.graphics.add(highlightGraphic);
          
        //   dialog.setContent(content);

        //   domStyle.set(dialog.domNode, "opacity", 0.85);
        //   dijitPopup.open({
        //     popup: dialog, 
        //     x: evt.pageX,
        //     y: evt.pageY
        //   });
        // });
    
        function closeDialog() {
          map.graphics.clear();
          dijitPopup.close(dialog);
        }
  }); 
      });