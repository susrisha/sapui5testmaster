sap.ui.controller("com.vaspp.Test.controller.MainSplit",{

/*
MainSplit.controller.js
Created on 10/7/14
Author: Naresh Kumar
*/

onInit:function(){
},
onExit:function(){
},

goBack:function(){
	var bus = sap.ui.getCore().getEventBus();
	bus.publish("nav","back");
}

});