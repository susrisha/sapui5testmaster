jQuery.sap.declare("com.vaspp.Test.Service");
sap.ui.core.UIComponent.extend("com.vaspp.Test.Service", {
		metadata : {
				name : "Test",
				version : "1.0",
				includes : [],
				dependencies : {
								libs : ["sap.m", "sap.ui.layout"],
								components : []
								},
				config : {
						  resourceBundle : "i18n/messageBundle.properties",
						serviceConfig : {
										name: "Test service",
										serviceUrl: "", // Relative path of the service url
										remoteHost: "", // Remote host of the service url
										mockdataDir:"com/vaspp/Test/resources/data/" // Local mock data directory
										}
						}
		},
		mockdata:false,
		
		
		init:function() {
			var mConfig = this.getMetadata().getConfig();
			var bIsMocked  = jQuery.sap.getUriParameters().get("mockdata") === 'true';
			this.mockdata=  bIsMocked; // Is running on mock data.
			var sServiceUrl = mConfig.serviceConfig.serviceUrl;
			console.log("Service url is "+sServiceUrl);
			if(this.mockdata){
				this.showMockDataMessage();
			}
		},
		
		showMockDataMessage:function(){
			sap.m.MessageToast.show("Running in demo mode with mock data.", {
				duration: 4000
			});
		},
		
		handleError:function(oEv){
		var errMsg = oEv.getParameters().message + " contact System Administrator";
			sap.m.MessageToast.show(errMsg, {
				duration: 4000
			});
		},
		/** 
			Service called to fix the proxy url if launched from local host.
		*/
		fixProxyServerUrl:function(sMetaServiceUrl){
					if (window.location.hostname == "localhost") {
					return "proxy/" + sMetaServiceUrl;
				} else {
					var url = this.remotHost; 
					//url = url.substring(0, url.indexOf("sap/bc", 0));
					return url.concat(sMetaServiceUrl);
				}
		},
		
		/**
		
			Call service method to get the data from service
			Params:
			@modelName: end model name that is stored in sap.ui.getCore().setModel();
			@jsonFileName: mock data file name for getting mock data
			@sServiceURL: relativepath from the service url 
			@replaceOld: Should the model be replaced if already existing.
			@finishMethod: Method called once the data is loaded. This method will have one parameter . parameter.getSource() gives the model.
		*/
		
		callService:function(modelName, jsonFileName, sServiceURL, replaceOld ,finishMethod){
		var replace = replaceOld|false;
		// First check for the model.
		var oModel = sap.ui.getCore().getModel(modelName);
		var forceLoad = false; // Load first time for sure.
		if(!oModel){
			oModel = new sap.ui.model.json.JSONModel();
			sap.ui.getCore().setModel(oModel,modelName);
			forceLoad = true;
		}
		 // Attach the request completions
		 var finishRequest = function(oEv){
		 		
				 oModel.detachRequestCompleted(this);
				 finishMethod(oEv);
				 
			};
		
		var reqFailed = function(oEvt){
			oModel.detachRequestFailed(this);
			this.handleError(oEvt);
		}
		oModel.attachRequestCompleted(finishRequest);
		oModel.attachRequestFailed(reqFailed);
			// Check if the model has data
		if(forceLoad == false && replaceOld == false){
			 	oModel.fireRequestCompleted(oModel);
			}
			
		 // Comes here if the model is not present or model needs to be refreshed.
		 
		 var relativePath = this.getMetadata().getConfig().serviceConfig.serviceUrl+sServiceURL;
		 var finalUrl = this.fixProxyServerUrl(relativePath)+'?$format=json'; // JSON Model at the end.
		 // Call if its not mockdata that we require.
		 console.log("final url "+finalUrl);
		 if(this.mockdata == false ){
			 oModel.loadData(finalUrl,{},true,'GET',false,false,{});
		 }
		 else{
			 var mockJSONUrl  = this.getMetadata().getConfig().serviceConfig.mockdataDir+jsonFileName+'.json';
			 oModel.loadData(mockJSONUrl);
		 }
			
		},// End of call Service.
		/*
		*	Call Create Service to send data back to server. 
			Params:
			@sServiceUrl : Relative path of the service
			@inputData: Data that is to be sent.
			@finishMethod: Call back function that will be called once done.
		*/
		callCreateService:function( sServiceUrl,inputData,finishMethod){
			 var relativePath = this.getMetadata().getConfig().serviceConfig.serviceUrl;
			 var metadataMMURL =this.fixProxyServerUrl(relativePath);
		// Create an oData Model
			var uploadModel = new sap.ui.model.odata.oDataModel(metadataMMURL, true, "dev00", "qse_099");  // Hard coded username and password. need to change.
			uploadModel.refreshSecurityToken();
			uploadModel.create(sServiceURL, oModel.getData(), null, fnSuccess, fnError);
			function fnSuccess(data, response) {
		 		var msg = "Submitted Successfully !"; // Probably more information to be handled here.
				 finishMethod(msg);
			}
			function fnError(oError) {
				 // Error handling to be written.
				 this.handleError(oError);
			}
			
		}// End of callCreatService method
		
		
});