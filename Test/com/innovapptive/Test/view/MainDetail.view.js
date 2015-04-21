sap.ui.jsview("com.vaspp.Test.view.MainDetail",{
/*
FileName: MainDetail.view.js

Author: Naresh Kumar
Created on: 10/7/14


*/

getControllerName:function(){
	return "com.vaspp.Test.controller.MainDetail";
},

createContent:function(oController){
 var page = new sap.m.Page({title:"Detail Page content"});
 return page;

}

})

