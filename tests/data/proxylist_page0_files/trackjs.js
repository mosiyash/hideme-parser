PostAssoc=function(){};PostAffAction=function(actionCode){if(actionCode==undefined){actionCode='';}
this.ac=actionCode;};PostAffAction.prototype.quote=function(string){var escapable=/[\\\"\/\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\','/':'\\/'};escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';};PostAffAction.prototype.toString=function(){var output='';for(var property in this){var value=this[property];if(typeof value=='string'){output+='"'+property+'":'+this.quote(value)+',';}}
return'{'+output.substring(0,output.length-1)+'}';}
PostAffAction.prototype._correctString=function(value,regexp){if(typeof(value)=='undefined'){return null;}
var strValue=new String(value);strValue=strValue.replace(/,/g,".");strValue=this._removeDotButFirst(strValue);var a=new RegExp('['+regexp+']','gi');strValue=strValue.replace(a,"");strValue=strValue.replace(/^[0]+/g,"");return strValue;};PostAffAction.prototype._correctCurrency=function(valueIn){var value=this._correctString(valueIn,'^0-9\.\-');if(value.indexOf('-')==0){return'-'+this._correctString(value.substring(1),'^0-9\.');}
return this._correctString(value,'^0-9\.');};PostAffAction.prototype._removeDotButFirst=function(source){pos=source.indexOf('.');return source.substring(0,pos+1)+source.substring(pos+1).replace(/\./gi,'');}
PostAffAction.prototype._correctCommission=function(value){if(value=='0'){return value;}
value=this._correctString(value,'^\-0-9\.\%');if(value==null){return null;}
if(value.indexOf('%')==0){return'%'+this._correctCurrency(value.substring(1));}
if(value.charAt(value.length-1)=='%'){return this._correctCurrency(value.substring(0,value.length-1))+'%';}
return this._correctCurrency(value);};PostAffAction.prototype._correctText=function(value){if(typeof value=='undefined'){return null;}
var s=new String(value);return s.toString();};PostAffAction.prototype.setTotalCost=function(value){this.t=this._correctCurrency(value);};PostAffAction.prototype.setCoupon=function(value){this.cp=this._correctText(value);};PostAffAction.prototype.setFixedCost=function(value){this.f=this._correctCommission(value);};PostAffAction.prototype.setOrderID=function(value){this.o=this._correctText(value);};PostAffAction.prototype.setProductID=function(value){this.p=this._correctText(value);};PostAffAction.prototype.setAffiliateID=function(value){this.a=this._correctText(value);};PostAffAction.prototype.setBannerID=function(value){this.b=this._correctText(value);};PostAffAction.prototype.setCampaignID=function(value){this.c=this._correctText(value);};PostAffAction.prototype.setChannelID=function(value){this.ch=this._correctText(value);};PostAffAction.prototype.setCurrency=function(value){this.cr=this._correctText(value);};PostAffAction.prototype.doNotDeleteCookies=function(){this.dndc='Y';};PostAffAction.prototype.setCustomCommission=function(value){var valueArray=value.split(";");this.cc="";for(var i=0;i<valueArray.length;i++){this.cc+=this._correctCommission(valueArray[i]);if((i+1)<valueArray.length){this.cc+=";";}}};PostAffAction.prototype.setCustomCommissionNextTiersFromCampaign=function(value){this.ccfc=value;};PostAffAction.prototype.setStatus=function(value){this.s=value;};PostAffAction.prototype.setData1=function(value){this.d1=this._correctText(value);};PostAffAction.prototype.setData2=function(value){this.d2=this._correctText(value);};PostAffAction.prototype.setData3=function(value){this.d3=this._correctText(value);};PostAffAction.prototype.setData4=function(value){this.d4=this._correctText(value);};PostAffAction.prototype.setData5=function(value){this.d5=this._correctText(value);};PostAffAction.prototype.setTimeStamp=function(value){this.ts=this._correctText(value);};PostAffAttributeWriter=function(idIn,attributeNameIn,urlParamNameIn,separatorIn){var id=idIn;var attributeName=attributeNameIn;var urlParamName=urlParamNameIn;var separator=getSeparator(separatorIn);var value;if(typeof urlParamName=='string'&&urlParamName!=''){value=new PostUrlReplacer(urlParamName,separator,true);}else{value=new PostValueReplacer(separator);}
function getSeparator(separatorIn){if(separatorIn==undefined||separatorIn==''){return null;}
return separatorIn;}
this.getElementsById=function(elementId){var nodes=new Array();var tmpNode=document.getElementById(elementId);while(tmpNode){nodes.push(tmpNode);tmpNode.id="";tmpNode=document.getElementById(elementId);for(var x=0;x<nodes.length;x++){if(nodes[x]==tmpNode){tmpNode=false;}}}
for(var x=0;x<nodes.length;x++){nodes[x].id=elementId;}
return nodes;};this.getElementsByClassName=function(className){var nodes=document.getElementsByClassName(className);return nodes;};this.writeAttribute=function(valueIn){if(valueIn==null||valueIn==''){return;}
var elements=this.getElementsById(id);if(elements.length==0){elements=this.getElementsByClassName(id);}
for(var i=0;i<elements.length;i++){switch(attributeName){case'href':elements[i].href=value.replace(elements[i].href,valueIn);break;case'value':elements[i].value=value.replace(elements[i].value,valueIn);break;case'action':elements[i].action=value.replace(elements[i].action,valueIn);break;default:elements[i].setAttribute(attributeName,value.replace(elements[i].getAttribute(attributeName),valueIn));break;}}};};PostUrlReplacer=function(urlParameterNameIn,separatorIn,notEncodeURI){var storedBefore=false;var parameterName=urlParameterNameIn;var separator=separatorIn;var notEncodeURI=notEncodeURI;this.replace=function(oldValue,newValue){var url=PostAffParams.parse(oldValue);oldParamValue=url.getParamValue(parameterName);if(separator==null){if(oldParamValue!=newValue){url.addParam(parameterName,newValue);}
storedBefore=true;return url.toString(notEncodeURI);}
if(oldParamValue==undefined){oldParamValue='';}
if(storedBefore){if(oldParamValue.indexOf(separator)!=-1){oldParamValue=oldParamValue.substring(0,oldParamValue.lastIndexOf(separator));}else{oldParamValue='';}}
var newParamValue=newValue;if(oldParamValue!=''){newParamValue=oldParamValue+separator+newValue;}
if(newValue==''||newValue==undefined){newParamValue=oldParamValue;}
url.addParam(parameterName,newParamValue);storedBefore=true;return url.toString();}};PostValueReplacer=function(separatorIn){var storedBefore=false;var separator=separatorIn;this.replace=function(oldValue,newValue){if(separator==null||oldValue==''){storedBefore=true;return newValue;}
if(storedBefore){oldValue=oldValue.substring(0,oldValue.lastIndexOf(separator));}
storedBefore=true;if(newValue==''||newValue==undefined){return oldValue;}
if(oldValue==''||oldValue==undefined){return newValue;}
return oldValue+separator+newValue;}};PostAffCookieManager=function(){var flash=null,flashVersion=null,_domain=null;var visitorCookie=new PostAffCookie('PAPVisitorId');var _doNotUseFlashCookie=false;var oldCookies=new PostAssoc();addOldCookie(new PostAffCookie('PAPCookie_Sale'));addOldCookie(new PostAffCookie('PAPCookie_FirstClick'));addOldCookie(new PostAffCookie('PAPCookie_LastClick'));function addOldCookie(cookie){oldCookies[cookie.name]=cookie;}
this.setDoNotUseFlashCookie=function(value){this._doNotUseFlashCookie=value;}
this.setCookieDomain=function(domain){this._domain=domain;}
function loadOldHttpCookies(){for(var name in oldCookies){try{oldCookies[name].load();}catch(err){}}}
function getFlashVersion(){var version="",n=navigator;if(n.plugins&&n.plugins.length){for(var i=0;i<n.plugins.length;i++){if(n.plugins[i].name.indexOf('Shockwave Flash')!=-1){version=n.plugins[i].description.split('Shockwave Flash ')[1];break;}}}else if(window.ActiveXObject){for(var j=10;j>=4;j--){try{var result=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."
+j+"');");if(result){version=j+'.0';break;}}catch(e){}}}
return version;}
this.isFlashActive=function(){if(this._doNotUseFlashCookie){return false;}
if(!PostAffTracker.isCustomFlashUrl()&&window.location.hostname!=PostAffTracker.getScriptDomain()){return false;}
if(flashVersion==null){flashVersion=getFlashVersion();}
return!(flashVersion==""||flashVersion.localeCompare("19")<0);}
this.callFlash=function(params){this.removeFlashElement();this.insertFlashElement(params);}
this.deleteOldCookies=function(){for(var name in oldCookies){try{oldCookies[name].deleteCookie();}catch(err){}}}
this.readAllFlashCookies=function(){var cookies=new Array(visitorCookie.name);var count=1;for(var id in oldCookies){cookies[count]=oldCookies[id].name;count++;}
this.readFlashCookies(cookies);}
this.loadHttpCookies=function(){loadOldHttpCookies();visitorCookie.load();}
this.loadRestoreHtmlStorageCookies=function(){if(!window.localStorage){return;}
if(localStorage.getItem('PAPVisitorId')!=null&&localStorage.getItem('PAPVisitorId')!='null'){if(visitorCookie.value==null){visitorCookie.value=localStorage.getItem('PAPVisitorId');visitorCookie.trackingMethod='S';}}else{if(visitorCookie.value!=null){localStorage.setItem('PAPVisitorId',visitorCookie.value);}}}
this.removeFlashElement=function(){if(flash!=null){try{flash.parentNode.removeChild(flash);flash=null;}catch(e){}}};this.insertFlashElement=function(params){if(!this.isFlashActive()){return;}
var paramsString=params.toString();paramsString=paramsString.replace(/&/g,"&amp;");var id='papswf';var obj='<object'+((window.ActiveXObject)?' id="'+id+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="'+PostAffTracker.getFlashUrl()+paramsString+'"':'');obj+=' width="1px" height="1px">';obj+='<param name="movie" value="'+PostAffTracker.getFlashUrl()+paramsString+'" />';obj+='<param name="AllowScriptAccess" value="always" />';obj+='<embed src="'+PostAffTracker.getFlashUrl()+paramsString+'" type="application/x-shockwave-flash" width="1px" height="1px" AllowScriptAccess="always"></embed>';obj+='</object>';flash=document.createElement("div");flash.setAttribute('style','position:absolute;bottom:0px;left:0px;');flash.innerHTML=obj;var scriptElement=document.getElementById(PostAffTracker.getIntegrationElementId());scriptElement.parentNode.insertBefore(flash,scriptElement.nextSibling);}
this.saveVisitorToHttpCookie=function(visitorId){PostAffCookie.setHttpCookie(visitorCookie.name,visitorId,null,this._domain);};this.writeVisitorIdToHTMLStorage=function(visitorId){if(window.localStorage){localStorage.setItem('PAPVisitorId',visitorId);}};this.getOldCookiesSerialized=function(){var params="";for(var name in oldCookies){if(oldCookies[name].value!=''&&oldCookies[name].value!=null){params+="||"+oldCookies[name].name+"="+oldCookies[name].value;}}
return params;};this.readFlashCookies=function(cookies){var params=new PostAffParams(this.getSwfFileName());params.addParam('a','r');for(var i=0;i<cookies.length;i++){params.addParam('n'+i,cookies[i]);}
this.callFlash(params);};this.deleteFlashCookies=function(cookies){var params=new PostAffParams(this.getSwfFileName());params.addParam('a','r');for(var id in cookies){params.addParam('n'+id,cookies[id]);params.addParam('d'+id,'1');}
this.callFlash(params);};this.writeFlashCookies=function(cookies){var params=new PostAffParams(this.getSwfFileName());params.addParam('a','w');for(var i=0;i<cookies.length;i++){params.addParam('n'+i,cookies[i].name);params.addParam('v'+i,cookies[i].value);if(cookies[i].getOverwrite()=='1'){params.addParam('ne'+i,cookies[i].getOverwrite());}}
this.callFlash(params);};this.getSwfFileName=function(){if(PostAffTracker.isCustomFlashUrl()){var flashUrl=PostAffTracker.getFullFlashUrl();if(flashUrl.substr(flashUrl.length-4)=='.swf'){return flashUrl.substr(flashUrl.lastIndexOf('/')+1);}}
if(PostAffTracker.isScriptNameHashed()){return PostAffTracker.getScriptName()+'.swf';}
return'pap.swf';}
this.getFlashCookies=function(cookies){var cookiesArray=new PostAssoc();var cookie;var flashCookies=cookies.split('_,_');for(var i=0;i<flashCookies.length;i++){var pos=flashCookies[i].indexOf('=');if(pos<0||flashCookies[i].length==pos+1){continue;}
cookie=new PostAffCookie(flashCookies[i].substr(0,pos));cookie.value=flashCookies[i].substr(pos+1);cookiesArray[cookie.name]=cookie;}
return cookiesArray;};this.parseFlashCookies=function(cookies){this.processFlashCookies(this.getFlashCookies(cookies));};this.getVisitorCookie=function(){return visitorCookie;};this.processFlashCookie=function(cookie){if(typeof oldCookies[cookie.name]=='object'){oldCookies[cookie.name].value=cookie.value;return;}
if(cookie.name==visitorCookie.name){if(null==visitorCookie.value||''==visitorCookie.value){visitorId=visitorCookie.value=cookie.value;visitorCookie.trackingMethod='F';}}};this.getVisitorId=function(){return this.getVisitorCookie().value;}
this.getVisitorIdOrSaleCookieValue=function(){if(this.getVisitorCookie().value!=null){return this.getVisitorCookie().value;}
return oldCookies['PAPCookie_Sale'].value;}
this.writeVisitorIdToFlash=function(){var cookies=new Array();cookies[0]=visitorCookie;this.writeFlashCookies(cookies);}
this.setVisitorId=function(visitorId){visitorCookie.value=visitorId;visitorCookie.trackingMethod='';this.saveVisitorToHttpCookie(visitorId);this.writeVisitorIdToFlash();this.writeVisitorIdToHTMLStorage(visitorId);};};PostAffCookieManager.prototype.processFlashCookies=function(cookies){for(var name in cookies){this.processFlashCookie(cookies[name]);}
if(typeof cookies[this.getVisitorCookie().name]!='object'&&this.getVisitorCookie().value!=null){this.writeVisitorIdToFlash();}};PostAffParams=function(scriptName){var params=new PostAssoc();this.script=scriptName;this.addParam=function(name,value,isDuplicateNames){if(name=='#'){this.addAnchorParam('',value);return;}
if(name.charAt(0)=='#'){this.addAnchorParam(name.substring(1),value);return;}
if(typeof(params[name])=='undefined'||isDuplicateNames!=true){params[name]=[];}
params[name].push(value);};this.getParamValue=function(name){if(params[name]instanceof Array){return params[name][0];}
return params[name];}
this.addAnchorParam=function(name,value){if(name!=''){name+='=';}
if(this.script.indexOf('#')!=-1){this.script=this.script+'&'+name+value;}else{this.script=this.script+'#'+name+value;}};this.encodeParams=function(notEncodeURI){var uri='?';for(var name in params){for(var i=0;i<params[name].length;i++){if(notEncodeURI==null||notEncodeURI==false){var paramValue=encodeURIComponent(params[name][i]);}else{var paramValue=params[name][i];}
uri+=name+"="+paramValue+"&";}}
return uri.substr(0,uri.length-1);};this.toString=function(notEncodeURI){return this.script+this.encodeParams(notEncodeURI);};};PostAffParams.parse=function(url){var parseParam;var parts=url.split('?');var params=new PostAffParams(parts[0]);if(parts.length>1){parameters=parts[1].split('&');for(var i=0;i<parameters.length;i++){parseParam=parameters[i].split('=');params.addParam(parseParam[0],parseParam[1],true);}}
return params;}
PostAffParams.replaceHttpInText=function(text){text=text.replace("http://","H_");text=text.replace("https://","S_");return text;};PostAffParams.getReferrer=function(){var referrerParam=PostAffParams.parse(document.location.search).getParamValue("refx2s6d");if(referrerParam!=null&&referrerParam!=""){return referrerParam;}else if(document.location.href.split("refx2s6d=")[1]){return document.location.href.split("refx2s6d=")[1];}
return document.referrer;};PostAffCookie=function(name){this.name=name;this.value=null;this.trackingMethod='';var dontOverwrite='1';this.load=function(){this.value=PostAffCookie.getHttpCookie(this.name);if(this.value!=null){this.trackingMethod='1';}};this.setOverwrite=function(){dontOverwrite='0';}
this.getOverwrite=function(){return dontOverwrite;}
this.deleteCookie=function(){PostAffCookie.deleteHttpCookie(this.name,this._domain);};};PostAffCookie.getHttpCookie=function(name){var value=document.cookie.match('(^|;) ?'+name+'=([^;]*)(;|$)');if(value&&value[2]!=''){return decodeURIComponent(value[2]);}
return null;};PostAffCookie.setHttpCookie=function(name,value,expired,domain){if(expired==null){var theDate=new Date();var expired=new Date(theDate.getTime()+31536000000*10);}
if(domain==null){domain='';}else{domain=';domain='+domain;}
document.cookie=name+'='+encodeURIComponent(value)+';expires='+expired.toGMTString()+domain+';path=/';};PostAffCookie.deleteHttpCookie=function(name,domain){expired=new Date(0);PostAffCookie.setHttpCookie(name,'',expired,domain);};PostAffRequest=function(cookieManager){this.cookieManager=cookieManager;this.sendCalled=false;this.send=function(){this.sendCalled=true;this.loadHttpCookies();this.loadRestoreHtmlStorageCookies();if(this.cookieManager.isFlashActive()){var self=this;PostAffTracker.pendingCallbacksFlashCookies.push(function(){self.callTrackScript();});this.cookieManager.readAllFlashCookies();setTimeout(function(){PostAffTracker.onFlashCookiesReceived();},2000);return;}
this.callTrackScript();};};PostAffRequest.prototype.accountId;PostAffRequest.prototype.setAccountId=function(accountIdIn){this.accountId=accountIdIn;}
PostAffRequest.prototype.loadHttpCookies=function(){this.cookieManager.loadHttpCookies();}
PostAffRequest.prototype.loadRestoreHtmlStorageCookies=function(){this.cookieManager.loadRestoreHtmlStorageCookies();}
PostAffRequest.prototype.getTrackingParams=function(){alert("getTrackingParams parent");}
PostAffRequest.prototype.fillTrackingParams=function(){var params=this.getTrackingParams();var visitorId=this.cookieManager.getVisitorId();if(visitorId!=null&&visitorId!='null'){params.addParam('visitorId',visitorId);}
if(this.accountId!=null&&this.accountId!='null'&&this.accountId!=''){params.addParam('accountId',this.accountId);}
if(typeof AffiliateID=='string'){params.addParam('userId',AffiliateID);}else if(PostAffTrackingRequest.getGetParams().getParamValue(PostAffTracker.getParamNameUserId())!=undefined){params.addParam('userId',PostAffTrackingRequest.getGetParams().getParamValue(PostAffTracker.getParamNameUserId()));}else if(PostAffTrackingRequest.getAnchorParams()!=""){var anchorParams=PostAffParams.parse("?"+PostAffTrackingRequest.getAnchorParams());if(anchorParams.getParamValue(PostAffTracker.getParamNameUserId())!=undefined){params.addParam('userId',anchorParams.getParamValue(PostAffTracker.getParamNameUserId()));}else if(PostAffTrackingRequest.getAnchorParams().indexOf("=")==-1){params.addParam('userId',PostAffTrackingRequest.getAnchorParams());}}
return params;}
PostAffRequest.prototype.callTrackScript=function(){var params=this.fillTrackingParams();var trackingScriptElement=document.createElement('script');trackingScriptElement.type='text/javascript';trackingScriptElement.src=PostAffTracker.getRequestUrl()+params.toString();scriptElement=document.getElementById(PostAffTracker.getIntegrationElementId());scriptElement.parentNode.insertBefore(trackingScriptElement,scriptElement.nextSibling);};PostAffInfo=function(cookieManager){this.cookieManager=cookieManager;var affiliateId,campaignId,accountId,overwriteCookies,lastClickAffiliateId;var received=false;var pendingCallbacks=new Array();this.onResponseReceived=function(){received=true;for(var i=0;i<pendingCallbacks.length;i++){pendingCallbacks[i]();}
pendingCallbacks=new Array();}
this.call=function(callback){if(received){callback();return;}
pendingCallbacks[pendingCallbacks.length]=callback;if(!this.sendCalled){this.send();}}
this.setAccountId=function(accountIdIn){this.accountId=accountIdIn;}
this.setAffiliateInfo=function(affiliateIdIn,campaignIdIn,overwriteCookiesIn){affiliateId=affiliateIdIn;campaignId=campaignIdIn;overwriteCookies=overwriteCookiesIn;this.onResponseReceived();}
this.setLastClickAffiliateId=function(affiliateIdIn){lastClickAffiliateId=affiliateIdIn;}
this.getAffiliateId=function(){if(overwriteCookies=='Y'&&lastClickAffiliateId!=undefined&&lastClickAffiliateId!=''){return lastClickAffiliateId;}
if(affiliateId==''&&lastClickAffiliateId!=undefined&&lastClickAffiliateId!=''){return lastClickAffiliateId;}
return affiliateId;}
this.getCampaignId=function(){return campaignId;}};PostAffInfo.prototype=new PostAffRequest;PostAffInfo.prototype.constructor=PostAffInfo;PostAffInfo.prototype.getTrackingParams=function(){return new PostAffParams("get_affinfo.php");}
PostAffInfo.prototype.fillTrackingParams=function(){return PostAffRequest.prototype.fillTrackingParams.call(this);}
PostAffInfo.prototype.callTrackScript=function(){visitorId=this.cookieManager.getVisitorId();if(visitorId==undefined||visitorId==''){return;}
PostAffRequest.prototype.callTrackScript.call(this);}
PostAffTrackingRequest=function(cookieManager,actions,accountId,skipIframeCheck){this.cookieManager=cookieManager;this.actions=actions;this.accountId=accountId;this.skipIframeCheck=skipIframeCheck;};PostAffTrackingRequest.prototype=new PostAffRequest;PostAffTrackingRequest.prototype.constructor=PostAffTrackingRequest;PostAffTrackingRequest.prototype.loadHttpCookies=function(){this.cookieManager.loadHttpCookies();this.cookieManager.deleteOldCookies();}
PostAffTrackingRequest.prototype.getTrackingParams=function(){return new PostAffParams(PostAffTrackingRequest.getTrackFileName());}
PostAffTrackingRequest.getTrackFileName=function(){if(PostAffTracker.isScriptNameHashed()){return PostAffTrackingRequest.correctHashName(PostAffTracker.getScriptName(),'r')}
return'track.php';}
PostAffTrackingRequest.correctHashName=function(scriptName,specialCharacter){return scriptName.replace('j',specialCharacter).replace('p',specialCharacter);}
PostAffTrackingRequest.prototype.fillTrackingParams=function(){var params=PostAffRequest.prototype.fillTrackingParams.call(this);var visitorId=this.cookieManager.getVisitorId();if(visitorId!=null&&visitorId!='null'){params.addParam('tracking',this.cookieManager.getVisitorCookie().trackingMethod);}
var pathname=(window.location.pathname.charAt(0)=="/")?window.location.pathname:"/"+window.location.pathname;params.addParam('url',PostAffParams.replaceHttpInText(window.location.protocol+"//"+window.location.host+pathname));params.addParam('referrer',PostAffParams.replaceHttpInText(PostAffParams.getReferrer()));params.addParam('getParams',PostAffTrackingRequest.getGetParams().toString());params.addParam('anchor',PostAffTrackingRequest.getAnchorParams());params.addParam('isInIframe',(!this.skipIframeCheck&&window.location!=window.parent.location)?true:false);if(this.accountId!=undefined){params.addParam('accountId',this.accountId);}
if(typeof this.actions=="object"&&this.actions.length>0){var sale='';for(var i=0;i<this.actions.length;i++){sale+=this.actions[i].toString()+',';}
params.addParam('sale','['+sale.substring(0,sale.length-1)+']');}
params.addParam('cookies',this.cookieManager.getOldCookiesSerialized());return params;}
PostAffTrackingRequest.getGetParams=function(){var getParams=PostAffParams.parse(document.location.search);if(typeof AffiliateID=='string'){getParams.addParam('AffiliateID',AffiliateID);}
if(typeof BannerID=='string'){getParams.addParam('BannerID',BannerID);}
if(typeof CampaignID=='string'){getParams.addParam('CampaignID',CampaignID);}
if(typeof Channel=='string'){getParams.addParam('Channel',Channel);}
if(typeof Data1=='string'){getParams.addParam('pd1',Data1);}
if(typeof Data2=='string'){getParams.addParam('pd2',Data2);}
return getParams;}
PostAffTrackingRequest.getAnchorParams=function(){if(document.location.href.split("#")[1]){return document.location.href.split("#")[1].split("refx2s6d=")[0];}
return"";}
if(PostAffTracker==undefined){var PostAffTracker=new function(){var integrationElementId='pap_x2s6df8d';var flashUrl,flashUrlCustom,requestUrl,scriptName,scriptDomain;var isScriptNameHashed=false;this._cmanager=new PostAffCookieManager();var affInfo=new PostAffInfo(this._cmanager);var separator;var actionObjects=new Array();var accountId;var paramNameUserId="a_aid";this.executeOnResponce=new Array();this.executeOnResponceFinished=new Array();var executeAfterSetAffResponse=new Array();this.pendingCallbacksFlashCookies=new Array();this.flashCookiesReceivedExecuting=false;var skipIframeCheck=false;var waitingOnTracingRequest=false;this.afterSetAffResponseCounter=0;function computeUrl(){var url=new String(document.getElementById(integrationElementId).src);flashUrl=requestUrl=url.substr(0,url.lastIndexOf('/')+1);scriptDomain=url.substr(url.indexOf('//')+2);scriptDomain=scriptDomain.substr(0,scriptDomain.indexOf('/'));scriptName=url.substr(url.lastIndexOf('/')+1);if(scriptName.indexOf('?')>=0){scriptName=scriptName.substr(0,scriptName.indexOf('?'));}
isScriptNameHashed=(scriptName!='trackjs.js'&&scriptName!='trackjs.php'&&scriptName!='clickjs.php'&&scriptName!='salejs.php');}
computeUrl();function writeValueToAttribute(value,id,attributeName,urlParamName,separator){var writer=new PostAffAttributeWriter(id,attributeName,urlParamName,separator);writer.writeAttribute(value);}
this.getIntegrationElementId=function(){return integrationElementId;}
this.setSkipIframeCheck=function(skip){skipIframeCheck=skip;}
this.getRequestUrl=function(){return requestUrl;}
this.isCustomFlashUrl=function(){if(flashUrlCustom!=null&&flashUrlCustom!=''){return true;}
return false;}
this.getFlashUrl=function(){if(this.isCustomFlashUrl()){if(flashUrlCustom.substr(flashUrlCustom.length-4)=='.swf'){return flashUrlCustom.substr(0,flashUrlCustom.lastIndexOf('/')+1);}
return flashUrlCustom;}
return flashUrl;}
this.getFullFlashUrl=function(){return flashUrlCustom;}
this.getScriptName=function(){return scriptName;}
this.getScriptDomain=function(){return scriptDomain;}
this.isScriptNameHashed=function(){return isScriptNameHashed;}
this.setRequestUrl=function(url){requestUrl=url;}
this.setAccountId=function(value){accountId=value;};this.setParamNameUserId=function(value){paramNameUserId=value;};this.getParamNameUserId=function(){return paramNameUserId;}
this.setCookieDomain=function(domain){this._cmanager.setCookieDomain(domain);}
this.setFlashUrl=function(url){flashUrlCustom=url;}
this.disableTrackingMethod=function(type){if(type=='F'){this._cmanager.setDoNotUseFlashCookie(true);}}
this.track=function(){var request=new PostAffTrackingRequest(this._cmanager,actionObjects,accountId,skipIframeCheck);waitingOnTracingRequest=true;request.send();actionObjects=new Array();};this.register=function(){return this.track();};this.registerOnAllFinished=function(){if(waitingOnTracingRequest==true){this.executeOnResponceFinished.push(function(){PostAffTracker.track();});return;}
return this.track();};this.createAction=function(actionCode){var obj=new PostAffAction(actionCode);actionObjects[actionObjects.length]=obj;return obj;};this.createSale=function(){return this.createAction();};this.notifySale=function(){return this.writeVisitorIdToAttribute('pap_dx8vc2s5','value');};this.writeVisitorIdToAttribute=function(id,attributeName,urlParamName,separatorIn,addAccountId){if(addAccountId==undefined){addAccountId=true;}
this._cmanager.loadHttpCookies();this._cmanager.loadRestoreHtmlStorageCookies();var writer=new PostAffAttributeWriter(id,attributeName,urlParamName,this._getSeparator(separatorIn));writer.writeAttribute((addAccountId?this._getAccountId():'')
+this._cmanager.getVisitorIdOrSaleCookieValue());if(!this._cmanager.isFlashActive()){if(this._cmanager.getVisitorIdOrSaleCookieValue()==null||this._cmanager.getVisitorIdOrSaleCookieValue()=='null'){this.executeOnResponceFinished.push(function(){writer.writeAttribute((addAccountId?PostAffTracker._getAccountId():'')
+PostAffTracker._cmanager.getVisitorIdOrSaleCookieValue());});}
return;}
var self=this;PostAffTracker.pendingCallbacksFlashCookies.push(function(){writer.writeAttribute((addAccountId?self._getAccountId():'')
+self._cmanager.getVisitorIdOrSaleCookieValue());});this._cmanager.readAllFlashCookies();this.executeOnResponce.push(function(){writer.writeAttribute((addAccountId?self._getAccountId():'')
+self._cmanager.getVisitorIdOrSaleCookieValue());});};this.writeCookieToCustomField=function(id,separatorIn,urlParamName,addAccountId){if(urlParamName==undefined){urlParamName=null;}
if(addAccountId==undefined){addAccountId=true;}
this.writeVisitorIdToAttribute(id,'value',urlParamName,separatorIn,addAccountId);};this.writeCookieToLink=function(id,urlParamName,separatorIn,addAccountId){if(addAccountId==undefined){addAccountId=true;}
this.writeVisitorIdToAttribute(id,'href',urlParamName,separatorIn,addAccountId);};this.setVisitorId=function(id){this._cmanager.setVisitorId(id);this.afterSetVisitorId();};this.afterSetVisitorId=function(){for(var i=0;i<this.executeOnResponce.length;i++){this.executeOnResponce[i]();}}
this.onTrackingFinished=function(){waitingOnTracingRequest=false;while(this.executeOnResponceFinished.length>0){var executeRequest=this.executeOnResponceFinished.shift();executeRequest();}}
this.onFlashCookiesReceived=function(){if(this.flashCookiesReceivedExecuting){return;}
this.flashCookiesReceivedExecuting=true;for(var i=0;i<this.pendingCallbacksFlashCookies.length;i++){this.pendingCallbacksFlashCookies[i]();}
this.pendingCallbacksFlashCookies=new Array();this.flashCookiesReceivedExecuting=false;}
this.writeAffiliateToCustomFieldNow=function(id){affInfo.setAccountId(this._getAccountId());affInfo.call(function(){writeValueToAttribute(affInfo.getAffiliateId(),id,'value',null,separator);});};this.writeAffiliateToCustomField=function(id){if(!waitingOnTracingRequest){PostAffTracker.writeAffiliateToCustomFieldNow(id);return;}
this.executeOnResponceFinished.push(function(){PostAffTracker.writeAffiliateToCustomFieldNow(id);});};this.getAffInfo=function(){return affInfo;};this.writeCampaignToCustomFieldNow=function(id){affInfo.setAccountId(this._getAccountId());affInfo.call(function(){writeValueToAttribute(affInfo.getCampaignId(),id,'value',null,separator);});};this.writeCampaignToCustomField=function(id){if(!waitingOnTracingRequest){PostAffTracker.writeCampaignToCustomFieldNow(id);return;}
this.executeOnResponceFinished.push(function(){PostAffTracker.writeCampaignToCustomFieldNow(id);});};this.writeAffiliateToLinkNow=function(id,urlParamName,separatorIn){var localSeparator=this._getSeparator(separatorIn);affInfo.setAccountId(this._getAccountId());affInfo.call(function(){writeValueToAttribute(affInfo.getAffiliateId(),id,'href',urlParamName,localSeparator);});};this.writeAffiliateToLink=function(id,urlParamName,separatorIn){if(!waitingOnTracingRequest){PostAffTracker.writeAffiliateToLinkNow(id,urlParamName,separatorIn);return;}
this.executeOnResponceFinished.push(function(){PostAffTracker.writeAffiliateToLinkNow(id,urlParamName,separatorIn);});};this._setAffiliateInfo=function(affiliateId,campaignId,overwriteCookies){affInfo.setAffiliateInfo(affiliateId,campaignId,overwriteCookies);this.afterSetAffiliate();};this.setLastClickAffiliateId=function(affiliateId){affInfo.setLastClickAffiliateId(affiliateId);};this.afterSetAffiliate=function(){for(var i=0;i<this.afterSetAffResponseCounter;i++){try{executeAfterSetAffResponse['PostAff_'+i]();}catch(e){alert('Error during running user function after setAffInfo callback: '+e);}}}
this.addAfterSetAffiliateFunction=function(functionBody){if(functionBody instanceof Function){executeAfterSetAffResponse['PostAff_'+this.afterSetAffResponseCounter]=functionBody;this.afterSetAffResponseCounter++;}}
this._getSeparator=function(separatorIn){if(separatorIn==null||separatorIn==undefined||separatorIn==''){return separator;}
return separatorIn;};this._getAccountId=function(){if(accountId!=undefined&&accountId!=null){return accountId;}
return'';}
this._processFlashCookies=function(cookies){this._cmanager.parseFlashCookies(cookies);this.onFlashCookiesReceived();};this.setAppendValuesToField=function(separatorIn){return separator=separatorIn;};};}
function rpap(cookies){PostAffTracker._processFlashCookies(cookies);}
function setVisitor(v){PostAffTracker.setVisitorId(v);}
function setAffiliate(aid){PostAffTracker.setLastClickAffiliateId(aid);}
function trackingFinished(){PostAffTracker.onTrackingFinished();}
function setAffiliateInfo(userId,campaignId,overwriteCookies){PostAffTracker._setAffiliateInfo(userId,campaignId,overwriteCookies);}
function papTrack(){PostAffTracker.track();}