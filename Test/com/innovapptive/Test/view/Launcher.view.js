sap.ui.jsview("com.vaspp.Test.view.Launcher",{
/*
FileName: Launcher.view.js

Author: Naresh Kumar
Created on: 9/30/14


*/

getControllerName:function(){
	return "com.vaspp.Test.controller.Launcher";
},

// Create a page with single tile.
createContent:function(oController){

var singleTile = new sap.m.StandardTile({title:"Tap Here",icon:"sap-icon://sales-order-item",press:[oController.onTilePress,oController] })
var tileContainer = new sap.m.TileContainer({tiles:[singleTile]});
var aText = new sap.m.Text({text:"Hello"});

var page  = new sap.m.Page({title:"Page title",content: tileContainer,enableScrolling:false });
return page;

}

})

