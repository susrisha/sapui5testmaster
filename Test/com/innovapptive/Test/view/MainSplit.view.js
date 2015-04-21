sap.ui.jsview("com.vaspp.Test.view.MainSplit",{
/*
FileName: MainSplit.view.js

Author: Naresh Kumar
Created on: 10/7/14


*/

getControllerName:function(){
	return "com.vaspp.Test.controller.MainSplit";
},

createContent:function(oController){
 var splitApp = new sap.m.SplitApp("mainSplitApp",{});
 return splitApp;

}

})

