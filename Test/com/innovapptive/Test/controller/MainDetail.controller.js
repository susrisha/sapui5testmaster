sap.ui.controller("com.vaspp.Test.controller.MainDetail",{

/*
MainDetail.controller.js
Created on 10/7/14
Author: Naresh Kumar
*/

onInit:function(){
this.router = sap.ui.core.UIComponent.getRouterFor(this);
this.router.attachRoutePatternMatched(this.onRouteMatched, this);
},
onRouteMatched:function(route){
	 console.log("hello"+route.getParameters().arguments.productId);
	// This needs to be changed later on
	 this.getView().getContent()[0].setTitle("Product Id "+route.getParameters().arguments.productId);
},

onExit:function(){
},

goBack:function(){
	var bus = sap.ui.getCore().getEventBus();
	bus.publish("nav","back");
}

});