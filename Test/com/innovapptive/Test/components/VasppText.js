sap.m.Text.extend("com.vaspp.Text", {      // call the new Control type "my.Hello" 
                                              // and let it inherit from sap.ui.core.Control
              metadata:{                                
   properties:{
	   "color" : {type : "string", group : "", defaultValue : 'black', bindable : "bindable"}
   }
   },
    
   renderer: { 
   render : function(oRm, oText) {
	// return immediately if control is invisible
	if (!oText.getVisible()) {
		return;
	}

	// get control values
	var sWidth = oText.getWidth(),
		sText = oText.getText(true),
		sTextDir = oText.getTextDirection(),
		sTooltip = oText.getTooltip_AsString(),
		nMaxLines = oText.getMaxLines(),
		bWrapping = oText.getWrapping(),
		sTextAlign = oText.getTextAlign();

	// start writing html
	oRm.write("<span");
	oRm.writeControlData(oText);
	oRm.addClass("sapMText");

	// set classes for wrapping
	if (!bWrapping || nMaxLines == 1) {
		oRm.addClass("sapMTextNoWrap");
	} else if (bWrapping) {
		// no space text must break
		if (!/\s/.test(sText)) {
			oRm.addClass("sapMTextBreakWord");
		}
	}

	// write style and attributes
	sWidth ? oRm.addStyle("width", sWidth) : oRm.addClass("sapMTextMaxWidth");
	sTextDir && oRm.addStyle("direction", sTextDir.toLowerCase());
	sTooltip && oRm.writeAttributeEscaped("title", sTooltip);
	if (sTextAlign) {
		sTextAlign = sap.ui.core.Renderer.getTextAlign(sTextAlign, sTextDir);
		if (sTextAlign) {
			oRm.addStyle("text-align", sTextAlign);
		}
	}
	oRm.addStyle('color',oText.getColor());//oText.getColor()

	// finish writing html
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write(">");

	// handle max lines
	if (oText.hasMaxLines()) {
		this.renderMaxLines(oRm, oText);
	} else {
		this.renderText(oRm, oText);
	}

	// finalize
	oRm.write("</span>");
	}
}
     
})
// suppress invalidation of text property setter
com.vaspp.Text.prototype.setColor = function(sText) {
	this.setProperty("color", sText , true);

	// check text dom ref
	var oDomRef = this.getTextDomRef();
	if (oDomRef) {
		oDomRef.textContent = this.getText(true);
	}

	return this;
};

// returns the text value and normalize line-ending character for rendering
com.vaspp.Text.prototype.getColor = function(bNormalize) {
	var sText = this.getProperty("color");

	// handle line ending characters for renderer
	if (bNormalize) {
		return sText.replace(/\r\n/g, "\n");
	}

	return sText;
};