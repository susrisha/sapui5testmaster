jQuery.sap.declare("com.vaspp.Test.Component");
sap.ui.core.UIComponent.extend("com.vaspp.Test.Component", {
	metadata : {
		name : "Template 1 from Vaspp",
		version : "1.0",
		includes : [],
		dependencies : {
			libs : ["sap.m", "sap.ui.layout"],
			components : []
		},
		rootView :{
			type:"JS",
			viewName : "com.vaspp.Test.view.App"
		},
		config : {
			viewType : sap.ui.core.mvc.ViewType.JS,
			resourceBundle : "i18n/messageBundle.properties",
		},
		routing : {
		
			config : { 
				viewType:"JS",
				viewPath:"com.vaspp.Test.view",
				clearTarget : false
			},
			routes : [
			           	{
			         		pattern : "",
			        	  name:"launcher",
			        	  view:"Launcher",
			        	  targetControl:"idAppControl",
						  targetAggregation:"pages",
						  },
						  {
							  pattern:"splitApp",
							  name:"mainSplit",
							  view:"MainSplit",
							  targetControl:"idAppControl",
							  targetAggregation:"pages",
							  subroutes:[{
								  pattern:"splitApp/",
								  name:"splitMaster",
								  view:"MainMaster",
								  targetControl:"mainSplitApp",
								  targetAggregation:"masterPages"
							  },
							  {
								  pattern:"splitApp/detail/{productId}",
								  name:"splitDetail",
								  view:"MainDetail",
								  targetControl:"mainSplitApp",
								  targetAggregation:"detailPages"
								  
							  }
							  ]
							  
						  }
						  
						 
						  
			          ]
		}
 
	},
	 
	
	
});

com.vaspp.Test.Component.prototype.init = function(){
	jQuery.sap.require("sap.ui.core.routing.History");
	jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
	jQuery.sap.require("com.vaspp.Test.AppRouter");
	
	sap.ui.core.UIComponent.prototype.init.apply(this);
	
	var router = this.getRouter();
	router.myNavBack = com.vaspp.Test.AppRouter.myNavBack;
	router.myNavToWithoutHash = com.vaspp.Test.AppRouter.myNavToWithoutHash;
	this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
	router.initialize();
};
	
	