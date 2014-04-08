$(function() {
  var id;
  id = 0;
  
  $(document).on("click", ".open-EditRoleDialog", function() {
    var userId;
    userId = $(this).data("id");
    id = userId;
    $(".modal-body #userId").val(userId);
    console.log("loading with ID = " + userId);
    $.ajax({
      type: "POST",
      dataType: "json",
      data: {
        id: userId
      },
      url: "http://localhost:3000/dashboard/roleCheck",
      success: function(data) {
        var i;
        console.log(data);
        $("#chkAdmin").prop("checked", false);
        $("#chkManager").prop("checked", false);
        $("#chkStaff").prop("checked", false);
        if (data.length !== 0) {
          i = 0;
          while (i < data.length) {
            if (data[i].name === "admin") {
              $("#chkAdmin").prop("checked", true);
            }
            if (data[i].name === "field_manager") {
              $("#chkManager").prop("checked", true);
            }
            if (data[i].name === "field_staff") {
              $("#chkStaff").prop("checked", true);
            }
            i++;
          }
        }
      }
    });
  });

  return $(document).on("click", "#saveRoles", function() {
    var checkedValueAdmin, checkedValueManager, checkedValueStaff;
    checkedValueAdmin = $("#chkAdmin").is(':checked');
    checkedValueManager = $("#chkManager").is(':checked');
    checkedValueStaff = $("#chkStaff").is(':checked');
    console.log("sending with id = " + id);
    console.log([checkedValueAdmin, checkedValueManager, checkedValueStaff]);
    return $.ajax({
      type: "POST",
      dataType: "json",
      data: {
        id: id,
        roles: [checkedValueAdmin, checkedValueManager, checkedValueStaff]
      },
      url: "http://localhost:3000/dashboard/roleAdd",
      success: function(data) {
        console.log(data);
        $('#ManageRoles').modal('hide');
      }
    });

  });
});


var map, dialog;
  
    require([
        "esri/map", "esri/toolbars/draw", "esri/layers/FeatureLayer","esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol","esri/arcgis/utils", 
        "esri/renderers/SimpleRenderer", "esri/symbols/PictureFillSymbol","esri/graphic", "esri/lang","esri/tasks/query",
        "dojo/_base/Color", "dojo/number", "dojo/dom-style", "esri/InfoTemplate",
        "dijit/TooltipDialog","dojo/dom","dojo/on", "dijit/popup", "dojo/domReady!"
      ], function(
        Map, Draw, FeatureLayer,SimpleMarkerSymbol,
        SimpleFillSymbol, SimpleLineSymbol, arcgisUtils,
        SimpleRenderer,PictureFillSymbol, Graphic, esriLang,Query,
        Color, number, domStyle, InfoTemplate,
        TooltipDialog, dom,on,dijitPopup
      ) {
        //ArcGIS Online Map
        var webmapId="ebe782cf918c45a19175475bc176f08c";



        var selectedUser = 1;  //User to display assignments for
        var assignedLong = {};  //Hash of assignments for selected User
        var assignedLat = {};
        var userAssigned = {};

        var user=1;           //Logged in user for Assigner ID
        var assigned = {};    //All assignments

        arcgisUtils.createMap(webmapId, "mapDiv").then(function (response) {
        map = response.map;   

        //Tasks to assign
        var tasks=[];

  

        var surveySites = map.getLayer(map.graphicsLayerIds[0]);
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
            url: "http://localhost:3000/assignments",
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

        //Load tasks from server
        $.ajax({
            url: "http://localhost:3000/users/"+selectedUser+"/assignments",
            type: "POST",
            data: JSON.stringify({user: {id: selectedUser}}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            contentType: "application/json",
            success: function(data){
              for(var i=0;i<data.length;i++){
                userAssigned[data[i].location_id]=1;
                assignedLong[data[i].location_id]=data[i].long;
                assignedLat[data[i].location_id]=data[i].lat;
              }         
            },
            error: function(error) {
              console.log(error.responseText)
          }
        });



        //Set up symbols   
        var fillSymbol = new PictureFillSymbol("mangrove.png", new SimpleLineSymbol( SimpleLineSymbol.STYLE_SOLID, new Color('#000'), 1), 42, 42);
        if (map.loaded){
           initToolbar();
        }  


        var symbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, 
          new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, 
            new Color([255,255,255,0.35]), 
            1
          ),
          new Color([125,125,125,0.35])
        );
        var marker = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
             new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
             new Color([255,0,0]), 1),
             new Color([0,255,0,0]));

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

        
          //Event handlers
          map.on("load", initToolbar);

          map.on("update-end",function(){
              clear()
          });

          map.on("zoom-end",function(evt){

            if ( (evt.zoomFactor<1) && (map.getScale()>1000000) ){
                map.graphics.clear();
                surveySites.visible=false;
            }else if(map.getScale()<1000000){
                surveySites.visible=true;
            }
          });


        //close the dialog when the mouse leaves the highlight graphic
        map.on("load", function(){
          map.graphics.enableMouseEvents();
          map.graphics.on("mouse-out", closeDialog);
          
        });
                
    
        //common functions
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
                clear()
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
              tasks.push({id: results.features[i].attributes["GTPOLYS_"], long: results.features[i]._extent.getCenter().getLongitude(), lat: results.features[i]._extent.getCenter().getLatitude()})
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

        dojo.connect(surveySites, "onClick", function(evt) {
            var graphicAttributes = evt.graphic.attributes;
            map.infoWindow.setTitle("title");
            map.infoWindow.setContent("content");
            map.infoWindow.show(evt.screenPoint,map.getInfoWindowAnchor(evt.screenPoint));
        });

        //This clears all graphics and polygons on map and redraws
        function clear(){ 
            map.graphics.clear();
            tasks=[]
            drawAll();
        }

        //Markers are for sites assigned to the user currently selected
        function drawMarkers(){
          var currentSurveySites = map.getLayer(map.graphicsLayerIds[0]);

          for(var key in userAssigned){
              //Show marker if assigned to user
              var point = new esri.geometry.Point(assignedLong[key], assignedLat[key]);
              if (userAssigned[key]==1){
                    var markerGraphic = new Graphic(point,marker)
                    map.graphics.add(markerGraphic);
              }else if (userAssigned[key]==2){
                    var markerGraphic = new Graphic(point,marker)
                    map.graphics.add(markerGraphic);
              }
          }
        }


        function drawAll(){

            var currentSurveySites = map.getLayer(map.graphicsLayerIds[0]);

            for(var i=0;i<currentSurveySites.graphics.length;i++){

              //Color Polygons based on assignment to anyone
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

              // //Show marker if assigned to user
              // if (userAssigned[currentSurveySites.graphics[i].attributes.GTPOLYS_]==1){
              //       var markerGraphic = new Graphic(currentSurveySites.graphics[i].geometry,marker)
              //       map.graphics.add(markerGraphic);
              // }else if (userAssigned[currentSurveySites.graphics[i].attributes.GTPOLYS_]==2){
              //       var markerGraphic = new Graphic(currentSurveySites.graphics[i].geometry,marker)
              //       map.graphics.add(markerGraphic);
              // }

            }
            drawMarkers();

        }


        function assignTasks(){
            //get user to assign to
            var fieldStaffSelect = document.getElementById('FieldStaffSelect');
            var options=fieldStaffSelect.options;
            var assigneeId=options[options.selectedIndex].value;
            //set up ajax call
            $.ajax({
            url: "http://localhost:3000/assignments/assignTasks",
            type: "POST",
            data: JSON.stringify({assigner: user,assignee: assigneeId,locations: tasks}),
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
