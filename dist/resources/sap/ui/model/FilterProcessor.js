/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Filter","sap/base/Log"],function(e,r){"use strict";var t={};t.groupFilters=function(r){var t,n={},i=[];function a(r,t){if(r.length===1){return r[0]}if(r.length>1){return new e(r,t)}return undefined}if(!r||r.length===0){return undefined}if(r.length===1){return r[0]}e.checkFilterNone(r);r.forEach(function(e){if(e.aFilters||e.sVariable){t="__multiFilter"}else{t=e.sPath}if(!n[t]){n[t]=[]}n[t].push(e)});for(var u in n){i.push(a(n[u],u==="__multiFilter"))}return a(i,true)};t.combineFilters=function(r,n){var i,a,u,f=[];i=t.groupFilters(r);a=t.groupFilters(n);if(i===e.NONE||a===e.NONE){return e.NONE}if(i){f.push(i)}if(a){f.push(a)}if(f.length===1){u=f[0]}else if(f.length>1){u=new e(f,true)}return u};t.apply=function(e,r,t,n){var i=Array.isArray(r)?this.groupFilters(r):r,a,u=this;if(n){if(!n[true]){n[true]={};n[false]={}}}else{n={true:{},false:{}}}this._normalizeCache=n;if(!e){return[]}else if(!i){return e.slice()}a=e.filter(function(e){return u._evaluateFilter(i,e,t)});return a};t._evaluateFilter=function(e,r,t){var n,i;if(e.aFilters){return this._evaluateMultiFilter(e,r,t)}n=t(r,e.sPath);i=this.getFilterFunction(e);if(!e.fnCompare||e.bCaseSensitive!==undefined){n=this.normalizeFilterValue(n,e.bCaseSensitive)}if(n!==undefined&&i(n)){return true}return false};t._evaluateMultiFilter=function(e,r,t){var n=this,i=!!e.bAnd,a=e.aFilters,u,f,s=i;for(var l=0;l<a.length;l++){u=a[l];f=n._evaluateFilter(u,r,t);if(i){if(!f){s=false;break}}else if(f){s=true;break}}return s};t.normalizeFilterValue=function(e,r){var t;if(typeof e=="string"){if(r===undefined){r=false}if(this._normalizeCache[r].hasOwnProperty(e)){return this._normalizeCache[r][e]}t=e;if(!r){t=t.toUpperCase()}t=t.normalize("NFC");this._normalizeCache[r][e]=t;return t}if(e instanceof Date){return e.getTime()}return e};t.getFilterFunction=function(t){if(t.fnTest){return t.fnTest}var n=t.oValue1,i=t.oValue2,a=t.fnCompare||e.defaultComparator;if(!t.fnCompare||t.bCaseSensitive!==undefined){n=n?this.normalizeFilterValue(n,t.bCaseSensitive):n;i=i?this.normalizeFilterValue(i,t.bCaseSensitive):i}var u=function(e){if(e==null){return false}if(typeof e!="string"){throw new Error('Only "String" values are supported for the FilterOperator: "Contains".')}return e.indexOf(n)!=-1};var f=function(e){if(e==null){return false}if(typeof e!="string"){throw new Error('Only "String" values are supported for the FilterOperator: "StartsWith".')}return e.indexOf(n)==0};var s=function(e){if(e==null){return false}if(typeof e!="string"){throw new Error('Only "String" values are supported for the FilterOperator: "EndsWith".')}var r=e.lastIndexOf(n);if(r==-1){return false}return r==e.length-n.length};var l=function(e){return a(e,n)>=0&&a(e,i)<=0};switch(t.sOperator){case"EQ":t.fnTest=function(e){return a(e,n)===0};break;case"NE":t.fnTest=function(e){return a(e,n)!==0};break;case"LT":t.fnTest=function(e){return a(e,n)<0};break;case"LE":t.fnTest=function(e){return a(e,n)<=0};break;case"GT":t.fnTest=function(e){return a(e,n)>0};break;case"GE":t.fnTest=function(e){return a(e,n)>=0};break;case"BT":t.fnTest=l;break;case"NB":t.fnTest=function(e){return!l(e)};break;case"Contains":t.fnTest=u;break;case"NotContains":t.fnTest=function(e){return!u(e)};break;case"StartsWith":t.fnTest=f;break;case"NotStartsWith":t.fnTest=function(e){return!f(e)};break;case"EndsWith":t.fnTest=s;break;case"NotEndsWith":t.fnTest=function(e){return!s(e)};break;default:r.error('The filter operator "'+t.sOperator+'" is unknown, filter will be ignored.');t.fnTest=function(e){return true}}return t.fnTest};return t});
//# sourceMappingURL=FilterProcessor.js.map