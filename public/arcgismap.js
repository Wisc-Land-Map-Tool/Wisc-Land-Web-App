
      var map, tb;
      var dataPoints=[]; //all datapoints on map
      var assigned=[]; //currently selected points
      var unassigned=[]; //currently not selected points
      var polygons=[]; //polygons currently drawn on map

      require([
        "esri/map", "esri/toolbars/draw",
        "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
        "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol", 
        "esri/graphic", 
        "dojo/_base/Color", "dojo/dom", "dojo/on", "dojo/domReady!"
      ], function(
        Map, Draw,
        SimpleMarkerSymbol, SimpleLineSymbol,
        PictureFillSymbol, CartographicLineSymbol, 
        Graphic, 
        Color, dom, on
      ) {
        map = new Map("mapDiv", {
          basemap: "streets",
          center: [-89.5, 44.5],
          zoom: 7
        });
        map.on("load", initToolbar);
        map.on("load", initializePoints);


        // markerSymbol is used for point and multipoint, see http://raphaeljs.com/icons/#talkq for more examples
        var markerSymbol = new SimpleMarkerSymbol();
        markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
        markerSymbol.setColor(new Color("#00FFFF"));
         var markerSymbolAssigned = new SimpleMarkerSymbol();
        markerSymbolAssigned.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
        markerSymbolAssigned.setColor(new Color("#FFFFFF"));

        // lineSymbol used for freehand polyline, polyline and line. 
        var lineSymbol = new CartographicLineSymbol(
          CartographicLineSymbol.STYLE_SOLID,
          new Color([255,0,0]), 10, 
          CartographicLineSymbol.CAP_ROUND,
          CartographicLineSymbol.JOIN_MITER, 5
        );

        // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
        // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
        var fillSymbol = new PictureFillSymbol(
          "images/mangrove.png",
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color('#000'), 
            1
          ), 
          42, 
          42
        );

        function initToolbar() {
          tb = new Draw(map);
          tb.on("draw-end", addGraphic);
          initializeFieldStaff();

          // event delegation so a click handler is not
          // needed for each individual button
          on(dom.byId("info"), "click", function(evt) {
            if ( evt.target.id === "info" ) {
              return;
            }else if ( evt.target.id === "assign" ) {
                assignPoints();
                clearMap();
                return;
            }else if(evt.target.id === "clear"){
                clearMap();
                return
            }
            var tool = evt.target.id.toLowerCase();
            map.disableMapNavigation();
            tb.activate(tool);
          });
        }
        function clearMap(){
                map.graphics.clear()
                polygons=[];
                drawPoints();
                unassigned=dataPoints;
                assigned=[];
        }
        function assignPoints(){
            //get user to assign to
            var fieldStaffSelect = document.getElementById('FieldStaffSelect');
            var options=fieldStaffSelect.options;
            var id=options[options.selectedIndex].id;

            //set up ajax call


            //refresh map to change color of assigned points
            for (var i=0;i<assigned.length;i++){
              assigned[i][2]=1;
              unassigned.push(assigned[i]);
            }
            unassigned=[]


        }

        function addGraphic(evt) {
          //deactivate the toolbar and clear existing graphics 
          tb.deactivate(); 
          map.enableMapNavigation();
          if(evt.geometry.type=="polygon"){
            polygons.push(evt.geometry);
            var newunassigned=[];
            for (var i=0;i<unassigned.length;i++){
               var check=evt.geometry.contains(new esri.geometry.Point(unassigned[i][0],unassigned[i][1]));
              if (check){
                assigned.push(unassigned[i]);
              }else{
                newunassigned.push(unassigned[i]);
              }
            };
            unassigned=newunassigned;
          }

          // figure out which symbol to use
          var symbol=fillSymbol
          map.graphics.add(new Graphic(evt.geometry, symbol));

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

        function drawPoints(){
          for (var i=0;i<dataPoints.length;i++){
               pointAssigned=dataPoints[i][2];
               if (pointAssigned==1){
                map.graphics.add(new Graphic(new esri.geometry.Point(dataPoints[i][0],dataPoints[i][1]),markerSymbolAssigned));
              }else{
                map.graphics.add(new Graphic(new esri.geometry.Point(dataPoints[i][0],dataPoints[i][1]),markerSymbol));
              }
          };

        }
        //load all data points onto map
        function initializePoints(){

          dataPoints=[
            [-89.5,44.0,0],
            [-89.5,44.1,0],
            [-89.5,44.2,0],
            [-89.5,44.3,0],
            [-89.5,44.4,0],
            [-89.5,44.5,0],
            [-89.0,44.0,1],
            [-89.0,44.1,1],
            [-89.0,44.2,1],
            [-89.0,44.3,1],
            [-89.0,44.4,1],
            [-89.0,44.5,1],
            [-89.0,44.6,1],
            [-90.0,44.4,1],
            [-90.0,44.5,1]               
          ];
          unassigned=dataPoints;
          drawPoints();

        }
      });