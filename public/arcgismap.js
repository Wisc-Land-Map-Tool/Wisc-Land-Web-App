var map, dialog;
  
    require([
        "esri/map", "esri/toolbars/draw", "esri/layers/FeatureLayer",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol","esri/arcgis/utils", 
        "esri/renderers/SimpleRenderer", "esri/symbols/PictureFillSymbol","esri/graphic", "esri/lang","esri/tasks/query",
        "dojo/_base/Color", "dojo/number", "dojo/dom-style", 
        "dijit/TooltipDialog","dojo/dom","dojo/on", "dijit/popup", "dojo/domReady!"
      ], function(
        Map, Draw, FeatureLayer,
        SimpleFillSymbol, SimpleLineSymbol, arcgisUtils,
        SimpleRenderer,PictureFillSymbol, Graphic, esriLang,Query,
        Color, number, domStyle, 
        TooltipDialog, dom,on,dijitPopup
      ) {
        
        var webmapId="ebe782cf918c45a19175475bc176f08c";
        var assigned = {};
        arcgisUtils.createMap(webmapId, "mapDiv").then(function (response) {
        map = response.map;   
        var tasks=[];

        map.on("load", initToolbar);

        var fillSymbol = new PictureFillSymbol("mangrove.png", new SimpleLineSymbol( SimpleLineSymbol.STYLE_SOLID, new Color('#000'), 1), 42, 42);
        if (map.loaded){
           initToolbar();
        }    

        var surveySites = map.getLayer(map.graphicsLayerIds[0]);
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
          //console.log('update-end')
          map.graphics.clear();
          var currentSurveySites = map.getLayer(map.graphicsLayerIds[0]);
          //console.log(currentSurveySites.visible)

          for(var i=0;i<currentSurveySites.graphics.length;i++){
              if (assigned[currentSurveySites.graphics[i].attributes.GTPOLYS_]==1){
                        var highlightGraphic = new Graphic(currentSurveySites.graphics[i].geometry,assignedSymbol);
              }else if (assigned[currentSurveySites.graphics[i].attributes.GTPOLYS_]==2){
                        var highlightGraphic = new Graphic(currentSurveySites.graphics[i].geometry,completedSymbol);
              }else if (assigned[currentSurveySites.graphics[i].attributes.GTPOLYS_]==3){
                        var highlightGraphic = new Graphic(currentSurveySites.graphics[i].geometry,revisitSymbol);
              }else {
                        var highlightGraphic = new Graphic(currentSurveySites.graphics[i].geometry,notAssignedSymbol);
              }
              if (currentSurveySites.visible==true){
                map.graphics.add(highlightGraphic);
              }
            }
          });
          map.on("zoom-end",function(evt){

            //if (evt.zoomFactor<1){
            //  console.log(evt.zoomFactor)
            //  console.log(map.getScale())
            if ( (evt.zoomFactor<1) && (map.getScale()>1000000) ){
                map.graphics.clear();
                surveySites.visible=false;
            }else{
                surveySites.visible=true;

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
    
        function initToolbar() {
          initializeFieldStaff();

          tb = new Draw(map);
          tb.on("draw-end", addGraphic);

          // event delegation so a click handler is not
          // needed for each individual button
          on(dom.byId("info"), "click", function(evt) {
            if ( evt.target.id === "info" ) {
              return;
            }else if ( evt.target.id === "assign" ) {
                assignTasks();
                return;
            }else if(evt.target.id === "clear"){
                return
            }
            var tool = evt.target.id.toLowerCase();
            map.disableMapNavigation();
            tb.activate(tool);
          });
        }
        function addGraphic(evt) {
          //deactivate the toolbar and clear existing graphics 
          tb.deactivate(); 
          map.enableMapNavigation();

          var query = new esri.tasks.Query();
          query.geometry=evt.geometry
          //query.outFields=["GTPOLYS_"]
          surveySites.queryFeatures(query, function(results){
            for (var i=0;i<results.features.length;i++){
              tasks.push(results.features[i].attributes["GTPOLYS_"])
            }
          })

          // figure out which symbol to use
          var symbol=fillSymbol
          map.graphics.add(new Graphic(evt.geometry, symbol));

        }

        function closeDialog() {
          map.graphics.clear();
          dijitPopup.close(dialog);
        }
                //Load users into potential field staff drop down (or menu if this changes)
        function initializeFieldStaff(){
          //get drop down menu          
          var fieldStaffSelect = document.getElementById('FieldStaffSelect');

          //ajax query to get users
          jQuery.getJSON('http://localhost:3000/users',function(fieldStaff){
            for (var i=0;i<fieldStaff.length;i++){
              var staffOption = document.createElement("option");
              staffOption.text = fieldStaff[i].email;
              staffOption.value = fieldStaff[i].id;
              fieldStaffSelect.appendChild(staffOption);
            }
          });
          
        }
        function assignTasks(){
            //get user to assign to
            var fieldStaffSelect = document.getElementById('FieldStaffSelect');
            var options=fieldStaffSelect.options;
            var id=options[options.selectedIndex].value;

            //set up ajax call
            $.ajax({
            url: "http://localhost:3000/assignments/assignTasks",
            type: "POST",
            data: JSON.stringify({assigner: 1,assignee: id,locationIds: tasks}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            contentType: "application/json",
            success: function(data){
              if (data.redirect){
                  window.location.href = data.redirect
              }

            },
            
            error: function(error) {
              console.log(error.responseText)
          }
        });


        }



  }); 
      });