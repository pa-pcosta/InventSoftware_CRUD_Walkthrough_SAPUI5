/*!
 * OpenUI5
 * (c) Copyright 2009-2023 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/SyncPromise"],function(i){"use strict";function e(i,e,o,t,n,r){if(!e){throw new Error("Missing owner")}if(t&&!o){throw new Error("A modifying group lock has to be locked")}this.fnCancel=r;this.bCanceled=false;this.sGroupId=i;this.bLocked=!!o;this.bModifying=!!t;this.oOwner=e;this.oPromise=null;this.iSerialNumber=n===undefined?Infinity:n}e.prototype.cancel=function(){if(!this.bCanceled){this.bCanceled=true;if(this.fnCancel){this.fnCancel()}this.unlock(true)}};e.prototype.getGroupId=function(){return this.sGroupId};e.prototype.getOwner=function(){return this.oOwner};e.prototype.getSerialNumber=function(){return this.iSerialNumber};e.prototype.getUnlockedCopy=function(){return new e(this.sGroupId,this.oOwner,false,false,this.iSerialNumber)};e.prototype.isCanceled=function(){return this.bCanceled};e.prototype.isLocked=function(){return this.bLocked};e.prototype.isModifying=function(){return this.bModifying};e.prototype.toString=function(){return"sap.ui.model.odata.v4.lib._GroupLock(group="+this.sGroupId+", owner="+this.oOwner+(this.isLocked()?", locked":"")+(this.isModifying()?", modifying":"")+(this.iSerialNumber!==Infinity?", serialNumber="+this.iSerialNumber:"")+")"};e.prototype.unlock=function(i){if(this.bLocked===undefined&&!i){throw new Error("GroupLock unlocked twice")}this.bLocked=undefined;if(this.oPromise){this.oPromise.$resolve()}};e.prototype.waitFor=function(e){var o;if(this.bLocked&&this.sGroupId===e){if(!this.oPromise){this.oPromise=new i(function(i){o=i});this.oPromise.$resolve=o}return this.oPromise}};e.$cached=new e("$cached","sap.ui.model.odata.v4.lib._GroupLock");e.$cached.unlock=function(){};return e},false);
//# sourceMappingURL=_GroupLock.js.map