sap.ui.controller("com.vaspp.Test.controller.MainMaster",{

/*
MainMaster.controller.js
Created on 10/7/14
Author: Naresh Kumar
*/

onInit:function(){
this.router = sap.ui.core.UIComponent.getRouterFor(this);
this.router.attachRoutePatternMatched(this.onRouteMatched, this);

},

onRouteMatched:function(){
	 
	// This needs to be changed later on
	this.router.myNavToWithoutHash("com.vaspp.Test.view.MainDetail","JS",false,{productId:4});
},

onExit:function(){
},

goBack:function(){
	 this.router.myNavBack("launcher",{});
},
itemPressed:function(oEvt){
	console.log("Test tapped");
	this.router.navTo("splitDetail",{productId:3});
}

});