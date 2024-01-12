/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/core/ResizeHandler","sap/m/Image","./NumericContentRenderer","sap/ui/events/KeyCodes","sap/base/util/deepEqual","sap/ui/core/Configuration","sap/ui/core/Core","sap/ui/core/Lib","sap/ui/core/Theming"],function(e,t,i,o,n,r,a,s,p,c,l,u){"use strict";var h={ar:4,ar_eg:4,ar_sa:4,bg:4,ca:6,cs:4,da:4,de:8,"de-de":8,de_at:8,de_ch:8,el:4,el_cy:4,en:4,en_au:4,en_gb:4,en_hk:4,en_ie:4,en_in:4,en_nz:4,en_pg:4,en_sg:4,en_us:4,en_za:4,es:6,es_ar:4,es_bo:4,es_cl:4,es_co:4,es_mx:6,es_pe:4,es_uy:4,es_ve:4,et:4,fa:4,fi:4,fr:4,fr_be:4,fr_ca:4,fr_ch:4,fr_lu:4,he:4,hi:4,hr:4,hu:4,id:4,it:8,it_ch:8,ja:6,kk:4,ko:6,lt:4,lv:4,ms:4,nb:4,nl:4,nl_be:4,pl:4,pt:4,pt_pt:4,ro:4,ru:4,ru_ua:4,sk:4,sl:4,sr:4,sv:4,th:4,tr:4,uk:4,vi:4,zh_cn:6,zh_hk:6,zh_sg:6,zh_tw:6};var d=e.DeviationIndicator,f=e.ValueColor;var g=t.extend("sap.m.NumericContent",{metadata:{library:"sap.m",properties:{animateTextChange:{type:"boolean",group:"Behavior",defaultValue:true},formatterValue:{type:"boolean",group:"Data",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconDescription:{type:"string",group:"Accessibility",defaultValue:null},indicator:{type:"sap.m.DeviationIndicator",group:"Appearance",defaultValue:"None"},nullifyValue:{type:"boolean",group:"Behavior",defaultValue:true},scale:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Appearance",defaultValue:"Auto",deprecated:true},truncateValueTo:{type:"int",group:"Appearance"},value:{type:"string",group:"Data",defaultValue:null},valueColor:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"Neutral"},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},withMargin:{type:"boolean",group:"Appearance",defaultValue:true},state:{type:"sap.m.LoadState",group:"Behavior",defaultValue:"Loaded"},adaptiveFontSize:{type:"boolean",group:"Appearance",defaultValue:true}},events:{press:{}}},renderer:r});g.prototype.init=function(){this._rb=l.getResourceBundleFor("sap.m");this.setTooltip("{AltText}");c.ready(this._registerResizeHandler.bind(this))};g.prototype._getParentTile=function(){var e=this.getParent();while(e){if(e.isA("sap.m.GenericTile")){return e}e=e.getParent()}return null};g.prototype._getMaxDigitsData=function(){var e=null,t=p.getLanguage().toLowerCase(),i=h[t]||4;if(this.getAdaptiveFontSize()){switch(i){case 6:e="sapMNCMediumFontSize";break;case 8:e="sapMNCSmallFontSize";break;default:e="sapMNCLargeFontSize";break}}else{e="sapMNCLargeFontSize";i=4}return{fontClass:e,maxLength:i}};g.prototype._registerResizeHandler=function(){o.register(this,this.invalidate.bind(this))};g.prototype.onBeforeRendering=function(){this.$().off("mouseenter");this.$().off("mouseleave");this._iMaxLength=null};g.prototype.onAfterRendering=function(){this.$().on("mouseenter",this._addTooltip.bind(this));this.$().on("mouseleave",this._removeTooltip.bind(this));u.attachApplied(this._checkIfIconFits.bind(this))};g.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString())};g.prototype._checkIfIconFits=function(){var e=this._getParentTile();if(e&&(e.isA("sap.m.GenericTile")||e.isA("sap.m.SlideTile"))){e._setupResizeClassHandler()}var t=this.getDomRef("icon-image");if(t){var i=this.getDomRef("value-inner"),o=this.getDomRef("indicator"),n=this.getDomRef("value");var r=t?t.getBoundingClientRect().width:0,a=i?i.getBoundingClientRect().width:0,s=o?o.getBoundingClientRect().width:0,p=n.getBoundingClientRect().width;t.style.display=r+a+s>p?"none":""}};g.prototype._removeTooltip=function(){this.$().attr("title",null)};g.prototype.exit=function(){if(this._oIcon){this._oIcon.destroy()}if(this._oIndicatorIcon){this._oIndicatorIcon.destroy()}};g.prototype.getAltText=function(){var e=this.getValue();var t=this.getScale();var i;var o="";if(this.getNullifyValue()){i="0"}else{i=""}if(this.getIconDescription()){o=o.concat(this.getIconDescription());o=o.concat("\n")}if(e){o=o.concat(e+t)}else{o=o.concat(i)}if(this.getIndicator()&&this.getIndicator()!==d.None){o=o.concat("\n");o=o.concat(this._rb.getText(("NUMERICCONTENT_DEVIATION_"+this.getIndicator()).toUpperCase()))}if(this.getValueColor()!==f.None){var n=this._rb.getText(("SEMANTIC_COLOR_"+this.getValueColor()).toUpperCase());o=o.concat("\n");o=o.concat(n)}return o};g.prototype.getTooltip_AsString=function(){var e=this.getTooltip();var t=this.getAltText();if(typeof e==="string"||e instanceof String){t=e.split("{AltText}").join(t).split("((AltText))").join(t);return t}if(e){return e}else{return""}};g.prototype.setIcon=function(e){var t=!s(this.getIcon(),e);if(t){if(this._oIcon){this._oIcon.destroy();this._oIcon=undefined}if(e){this._oIcon=i.createControlByURI({id:this.getId()+"-icon-image",src:e},n)}}this._setPointerOnIcon();return this.setProperty("icon",e)};g.prototype.setIndicator=function(e){if(e!==d.None&&e){var t="sap-icon://"+e.toLowerCase();if(this._oIndicatorIcon){this._oIndicatorIcon.setSrc(t)}else{this._oIndicatorIcon=i.createControlByURI({id:this.getId()+"-icon-indicator",size:"0.875rem",src:t},n);this._oIndicatorIcon.addStyleClass("sapMNCIndIcon")}}return this.setProperty("indicator",e)};g.prototype._setPointerOnIcon=function(){if(this._oIcon&&this.hasListeners("press")){this._oIcon.addStyleClass("sapMPointer")}else if(this._oIcon&&this._oIcon.hasStyleClass("sapMPointer")){this._oIcon.removeStyleClass("sapMPointer")}};g.prototype.ontap=function(e){this.$().trigger("focus");this.firePress();e.preventDefault()};g.prototype.onkeyup=function(e){if(e.which===a.ENTER||e.which===a.SPACE){this.firePress();e.preventDefault()}};g.prototype.onkeydown=function(e){if(e.which===a.SPACE){e.preventDefault()}};g.prototype.attachEvent=function(e,i,o,n){t.prototype.attachEvent.call(this,e,i,o,n);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");this._setPointerOnIcon()}return this};g.prototype.detachEvent=function(e,i,o){t.prototype.detachEvent.call(this,e,i,o);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");this._setPointerOnIcon()}return this};g.prototype._parseFormattedValue=function(e){var t=e.replace(String.fromCharCode(8206),"").replace(String.fromCharCode(8207),"");var i=t.match(/([+-.−, \d]*)/g)||[];var o=t.match(/[^+-.−, \d]/g)||[];return{value:i.reduce(function(e,t){return e+t},"").trim(),scale:o.reduce(function(e,t){return e+t},"").trim()}};return g});
//# sourceMappingURL=NumericContent.js.map