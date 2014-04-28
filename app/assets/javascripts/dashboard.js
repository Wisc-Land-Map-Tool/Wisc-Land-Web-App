

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
      url: window.productsURL+ "dashboard/roleCheck",
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
  

  $(document).on("click", "#btnApproveUser", function() {
    var userId;
    userId = $(this).data("id");

    $.ajax({
    type: "POST",
    dataType: "json",
    data: {
      id: userId
    },
    url: window.productsURL+"users/approve",

    success: function(data) {
      location.reload();
      
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
      url: window.productsURL+"dashboard/roleAdd",
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
        "dojo/_base/Color", "dojo/number", "dojo/dom-style", "esri/InfoTemplate","dojo/query",
        "dijit/TooltipDialog","dojo/dom","dojo/on", "dijit/popup",  "esri/dijit/InfoWindowLite",        "dojo/dom-construct",
        "dojo/domReady!"

      ], function(
        Map, Draw, FeatureLayer,SimpleMarkerSymbol,
        SimpleFillSymbol, SimpleLineSymbol, arcgisUtils,
        SimpleRenderer,PictureFillSymbol, Graphic, esriLang,Query,
        Color, number, domStyle, InfoTemplate,query,
        TooltipDialog, dom,on,dijitPopup, InfoWindowLite,domConstruct
      ) {

        var map = new esri.Map("mapDiv", {
            basemap:    "streets",
            center: [-89.5, 44.5],
            zoom: 8
        });

        var infoWindow = new InfoWindowLite(null, domConstruct.create("div", null, null, map.root));
        infoWindow.startup();
        map.setInfoWindow(infoWindow);

        var surveySites = new FeatureLayer("https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/wiscland_gtpolys/FeatureServer/0",{
                            mode: FeatureLayer.ON_DEMAND,
                            outFields: ["*"]
        });
          
        map.addLayer(surveySites);

        map.on("click",function(evt){
            if (!evt.graphic) return;
            var query = new esri.tasks.Query();
            query.geometry=evt.graphic.geometry;
            surveySites.queryFeatures(query, function(results){
              var location=results.features[0].attributes["GTPOLYS_"];
              map.infoWindow.setTitle("Task #"+location);
              map.infoWindow.setContent(getPopupContent(assignedData[location],evt.mapPoint));
              map.infoWindow.show(evt.mapPoint);
            });
        });

          var queryTasks = new esri.tasks.Query();
          queryTasks.where="GTPOLYS_ <= 2000";
          queryTasks.returnGeometry = true;
          queryTasks.outFields = ["*"];
          surveySites.queryFeatures(queryTasks, function(results){
          })
          queryTasks.where="GTPOLYS_ >2000 AND GTPOLYS_ <= 4000";
          surveySites.queryFeatures(queryTasks, function(results){
          })
          queryTasks.where="GTPOLYS_ >4000 AND GTPOLYS_ <= 6000";
          surveySites.queryFeatures(queryTasks, function(results){
          })
          queryTasks.where="GTPOLYS_ >6000 AND GTPOLYS_ <= 8000";
          surveySites.queryFeatures(queryTasks, function(results){
          })
          queryTasks.where="GTPOLYS_ >8000 AND GTPOLYS_ <= 10000";
          surveySites.queryFeatures(queryTasks, function(results){
          })
          queryTasks.where="GTPOLYS_ >10000 AND GTPOLYS_ <= 12000";
          surveySites.queryFeatures(queryTasks, function(results){
          })

        var selectedUser=1;  //User to display assignments for
        var assignedLong = {};  //Hash of assignments for selected User
        var assignedLat = {};
        var userAssigned = {};
        var classifications ={};
        var forestNames={};
        var vegetationNames={};

        var user=window.current_user;           //Logged in user for Assigner ID
        var assigned = {};    //All assignments
        var assignedData ={};
        var usernames={};
        var tasks=[];
        var polygons=[];
        

        //Load tasks from server
        $.ajax({
            url: window.productsURL+"assignments",
            type: "POST",
            data: JSON.stringify({user: {id: 1}}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            contentType: "application/json",
            success: function(data){
              for(var i=0;i<data.length;i++){
                assigned[data[i].location_id]=data[i].Status;
                assignedData[data[i].location_id]=data[i];
              }         
            },
            
            error: function(error) {
              console.log(error.responseText)
          }
        });

        //Load users from server
        $.ajax({
            url: window.productsURL+"users",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            contentType: "application/json",
            success: function(data){
              for(var i=0;i<data.length;i++){
                usernames[data[i].id]=data[i].first_name+" "+data[i].last_name;
              }         
            },
            
            error: function(error) {
              console.log(error.responseText)
          }
        });
        //Load classifications from server
        $.ajax({
            url: window.productsURL+"classifications/index",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            contentType: "application/json",
            success: function(data){
              for(var i=0;i<data.length;i++){
                classifications[data[i].id]=data[i].class_name;
              }         
            },
            
            error: function(error) {
              console.log(error.responseText)
          }
        });

        //Load classifications from server
        $.ajax({
            url: window.productsURL+"forest_types/index",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            contentType: "application/json",
            success: function(data){
              for(var i=0;i<data.length;i++){
                forestNames[data[i].forest_id]=data[i].species_name;
              }         
            },
            
            error: function(error) {
              console.log(error.responseText)
          }
        });
        //Load classifications from server
        $.ajax({
            url: window.productsURL+"vegetations/index",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            contentType: "application/json",
            success: function(data){
              for(var i=0;i<data.length;i++){
                vegetationNames[data[i].vegetation_id]=data[i].vegetation_name;
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
            SimpleLineSymbol.STYLE_SOLID, new Color([0,0,255]), 3), 
          new Color([125,125,125,0.35]));
        
        var completedSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, new Color([0,255,0]), 3), 
          new Color([125,125,125,0.35]));
         var revisitSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, new Color([0,0,255]), 3), 
          new Color([125,125,125,0.35]));
          var selectedSymbol = new SimpleFillSymbol(
          SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID, new Color([255,255,0]), 3), 
          new Color([125,125,125,0.35]));
        
          //Event handlers
          map.on("load", initToolbar);

          map.on("update-end",function(){
              redraw()
          });
        
        query(".btn").on("click", function(evt) {
         if(!$(evt.target).data("id"))return;
          selectedUser=$(evt.target).data("id");
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
                if(selectedUser){
                    assignTasks();
                }else{
                    alert("Must select a user!")
                }
                return;
            }else if(evt.target.id === "clear"){
                tasks=[];
                polygons=[];
                redraw()
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
              var geometry=results.features[i].geometry;
              geometry=esri.geometry.webMercatorToGeographic(geometry)
              var ring=geometry.rings[0]
              var array=[]
              for (var j=0;j<ring.length;j++){
                var point=ring[j];
                array.push([point[0],point[1]])
              }
              tasks.push({id: results.features[i].attributes["GTPOLYS_"],geometry:results.features[i].geometry,polygon: JSON.stringify(array)})
            }
            redraw();
          });

        }
        var methodID=["Field Verification","Windshield Survey","Inaccessable Polygon","Photo Interpreted/Knowledge of Area"];
        var confidenceLevel=["Low","Medium","High"]
        function getFieldData(assignment,mappoint){
          $.ajax({
            url: window.productsURL+"field_datas/getFieldDataDetails",
            type: "POST",
            data: JSON.stringify({assignment_id: assignment.id}),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            contentType: "application/json",
            success: function(fielddata){
                vegetation=fielddata.vegetation
                species=fielddata.species
                fielddata=fielddata.field_data
                var assigneeId=assignment.user_id;
                var covertype1=fielddata.covertype1_id;
                var covertype2=fielddata.covertype2_id;
                var covertype3=fielddata.covertype3_id;
                content="Completed by: "+usernames[assigneeId]+"<br>";
                content+="Cover Type: "+classifications[covertype1]
                if(covertype2){
                  content+= ", "+classifications[covertype2];
                }
                if(covertype3){
                  content+= ", "+classifications[covertype3];
                }
                content+="<br>"
                if (fielddata.cover_comment.length>0){
                  content+=fielddata.cover_comment+"<br>"
                }
                if (species){
                  content+= "Species Present:<br>"
                  for(var i=0;i<species.length;i++){
                    content+=forestNames[species[i].forest_type_id] + ": " +species[i].percentage+ "% <br>"
                  }
                }
                if(fielddata.canopy_perc){
                  content+="Total Canopy: "+fielddata.canopy_perc+"% <br>"
                }
                if (fielddata.canopy_comment.length>0){
                  content+=fielddata.canopy_comment+"<br>"
                }
                if (vegetation){
                  content+= "Vegetation Present:<br>"
                  for(var i=0;i<vegetation.length;i++){
                    content+=vegetationNames[vegetation[i].vegetation_id] +"<br>"
                  }
                }

 
                if(fielddata.identification_method){
                  content+="Identification: "+methodID[fielddata.identification_method-1]+"<br>"
                }
                if(fielddata.confidence_level){
                  content+="Confidence: "+confidenceLevel[fielddata.confidence_level-1]+"<br>"
                }
                if (fielddata.general_comment.length>0){
                  content+=fielddata.general_comment+"<br>"
                }


              map.infoWindow.setTitle("Task #"+assignment.location_id);
              map.infoWindow.setContent(content);
              map.infoWindow.show(mappoint);
            },         
            error: function(error) {
              console.log(error.responseText)
          }
        });
        }

        function getPopupContent(data,mappoint){
              var status=0;
              if (data){
                status=data.Status;
              }
              var content="";
              if(status==1){
                    var assigneeId=data.user_id;
                    var assignerId=data.UserIdAssigner;
                    content="Assigned to: "+usernames[assigneeId]+"<br>Assigned by: "+usernames[assignerId];
              }else if(status==2){
                  fielddata=getFieldData(data,mappoint)                
              }else{
                    content="Not yet assigned";
              }
              return content;
        }


                //Load users into potential field staff drop down (or menu if this changes)
        function initializeFieldStaff(){
          //get drop down menu          
          var fieldStaffSelect = document.getElementById('FieldStaffSelect');
          
         }


        //This clears all graphics and polygons on map and redraws
        function redraw(){ 
            map.graphics.clear();
            drawAll();
        }

        //Markers are for sites assigned to the user currently selected
        function drawMarkers(){

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

            //Draw Location Sites
            var currentSurveySites = map.getLayer(map.graphicsLayerIds[0]);

           if (currentSurveySites.visible==true){
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
                  map.graphics.add(highlightGraphic);
                
              }
            }

            drawPolygons();
            //Draw Assignment Markers
            drawMarkers();

        }

        function drawPolygons(){
          if (tasks.length<1)return;
          for (var i=0;i<tasks.length;i++){
            var selectedGraphic = new Graphic(tasks[i].geometry,selectedSymbol);
            map.graphics.add(selectedGraphic)
          }
        }


        function assignTasks(){
            //set up ajax call
            $.ajax({
            url: window.productsURL+"assignments/assignTasks",
            type: "POST",
            data: JSON.stringify({assigner: user,assignee: selectedUser,locations: tasks}),
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
