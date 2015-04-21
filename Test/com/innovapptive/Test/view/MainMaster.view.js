sap.ui.jsview("com.vaspp.Test.view.MainMaster",{
/*
FileName: MainMaster.view.js

Author: Naresh Kumar
Created on: 10/7/14


*/

getControllerName:function(){
	return "com.vaspp.Test.controller.MainMaster";
},

createContent:function(oController){
 // Need to create content here. Most probably a list view with standard list item.
  var standardListItem  = new sap.m.StandardListItem({title:"Test",type:sap.m.ListType.Active});
  var standardList  = new sap.m.List({items:standardListItem,itemPress:[oController.itemPressed,oController],mode:sap.m.ListMode.SingleSelectMaster});
 
 var page = new sap.m.Page({title:"Test",content:standardList,showNavButton:true,navButtonPress:[oController.goBack,oController]});
 

 return page;

}

})

