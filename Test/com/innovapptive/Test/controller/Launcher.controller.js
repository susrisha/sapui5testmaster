sap.ui.controller("com.vaspp.Test.controller.Launcher",{

/*
Launcher.controller.js
Created on 9/30/14
Author: Naresh Kumar
*/

onInit:function(){
this.router = sap.ui.core.UIComponent.getRouterFor(this);
},
onExit:function(){
},

goBack:function(){
	var bus = sap.ui.getCore().getEventBus();
	bus.publish("nav","back");
},

onTilePress:function(oEvt){
	console.log("pressed on Tile");
	 
/* 	this.router.navTo("detail",{id:3});   */

	//sap.ui.core.routing.Router.getRouter("mainAppRoute").navTo("mainSplit",{ from: "View 1"});
	this.router.navTo("mainSplit",{});
}

});