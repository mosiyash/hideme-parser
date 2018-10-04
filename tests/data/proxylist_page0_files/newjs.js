function g(id){return document.getElementById(id);}
function time(){return Math.floor(new Date().getTime()/1000);}
function setlang(lang){setCookie('locale',lang,new Date(((new Date()).getTime()+(86400*14*1000))).toUTCString(),"/");var url=(document.location.pathname+document.location.search).match(/(\/ru|\/en|\/es|\/ua)?(.*)/);if(lang=="ru"){document.location="/ru"+url[2];}else if(lang=="ua"){document.location="/ua"+url[2];}else if(lang=="es"){document.location="/es"+url[2];}else{document.location="/en"+url[2];}}
function setCookie(name,value,expires,path,domain,secure){document.cookie=name+"="+escape(value)+
((expires)?"; expires="+expires:"")+
((path)?"; path="+path:"")+
((domain)?"; domain="+domain:"")+
((secure)?"; secure":"");}
function getCookie(c_name){var i,x,y,ARRcookies=document.cookie.split(";");for(i=0;i<ARRcookies.length;i++){x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);}}}
function mailtest(s){return(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(s));}
function entlisten(e,c){var charCode=(e.which)?e.which:event.keyCode;if(charCode=="13"){eval(c);}}
function pset(i){for(k in prst[i]){g("cnf_"+k).checked=prst[i][k];g("frm_"+k).value=(prst[i][k])?"on":"";}
g("pr"+i).checked=true;g("cnf_pr"+i).checked=true;}
function pread(){for(k in prst[i]){g("frm_"+k).value=(g("cnf_"+k).checked)?"on":"";}
for(i in prst){var s=true;for(k in prst[i]){if(g("cnf_"+k).checked!=prst[i][k]){s=false;break;}}
g("pr"+i).checked=s;g("cnf_pr"+i).checked=s;if(s){break;}}}
function frm_pre(){g("mainform").target=(g("cnf_newwin")!=null&&g("cnf_newwin").checked)?"_blank":"_self";}
function gt(url,srv,ip){if(srv=="rand"){var srvlst=new Array();for(k in ipsl){srvlst.push(k);}
srv=srvlst[rand(srvlst.length-1)];}
var pa=g("mainform").action;var pi=g("frm_ip").value;g("url").value=url;g("mainform").action="http://"+srv;g("frm_ip").value=ip;g("mainform").target=(g("cnf_newwin")!=null&&g("cnf_newwin").checked)?"_blank":"_self";g("mainform").submit();g("mainform").action=pa;g("frm_ip").value=pi;}
function rand(min,max){if(max){return Math.floor(Math.random()*(max-min+1))+min;}else{return Math.floor(Math.random()*(min+1));}}
function cnf_ipsu(selsrv,seldst,selname){var v=g(selsrv).value;if(ipsu_cache[selsrv]!=null&&ipsu_cache[selsrv]==v){return;}
ipsu_cache[selsrv]=v;if(v!="rand"){var buf='<select name='+selname+'><option value="rand">случайный IP</option>';for(i in ipsl[v]){buf+='<option value="'+ipsl[v][i]+'">'+ipsl[v][i]+'</option>';}}else{var buf='<select name='+selname+' disabled><option value="rand">случайный IP</option>';}
g(seldst).innerHTML=buf+'</select>';}
function createRequestObject(){if(typeof XMLHttpRequest==='undefined'){XMLHttpRequest=function(){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
catch(e){}
try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
catch(e){}
try{return new ActiveXObject("Msxml2.XMLHTTP");}
catch(e){}
try{return new ActiveXObject("Microsoft.XMLHTTP");}
catch(e){}
alert("This browser does not support XMLHttpRequest.");};}
return new XMLHttpRequest();}
function split_once(d,s){var i=s.indexOf(d);return[s.slice(0,i),s.slice(i+1)];}
flag_codes="ad,ae,af,ag,ai,al,am,an,ao,ar,as,at,au,aw,ax,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bm,bn,bo,br,bs,bt,bv,bw,by,bz,ca,catalonia,cc,cd,cf,cg,ch,ci,ck,cl,cm,cn,co,cr,cs,cu,cv,cx,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,eh,england,er,es,et,europeanunion,fam,fi,fj,fk,fm,fo,fr,ga,gb,gd,ge,gf,gh,gi,gl,gm,gn,gp,gq,gr,gs,gt,gu,gw,gy,hk,hm,hn,hr,ht,hu,id,ie,il,in,io,iq,ir,is,it,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,ky,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mo,mp,mq,mr,ms,mt,mu,mv,mw,mx,my,mz,na,nc,ne,nf,ng,ni,nl,no,np,nr,nu,nz,om,pa,pe,pf,pg,ph,pk,pl,pm,pn,pr,ps,pt,pw,py,qa,re,ro,rs,ru,rw,sa,sb,sc,scotland,sd,se,sg,sh,si,sj,sk,sl,sm,sn,so,sr,st,sv,sy,sz,tc,td,tf,tg,th,tj,tk,tl,tm,tn,to,tr,tt,tv,tw,tz,ua,ug,um,us,uy,uz,va,vc,ve,vg,vi,vn,vu,wales,wf,ws,ye,yt,za,zm,zw".split(",");flag_index=new Array();for(i=0;i<flag_codes.length;i++){flag_index[flag_codes[i]]=i;}
function flag(code){return flag_index[code.toLowerCase()]*11;}
function long2ip(proper_address){var output=false;if(!isNaN(proper_address)&&(proper_address>=0||proper_address<=4294967295)){output=Math.floor(proper_address/Math.pow(256,3))+'.'+Math.floor((proper_address%Math.pow(256,3))/Math.pow(256,2))+'.'+Math.floor(((proper_address%Math.pow(256,3))%Math.pow(256,2))/Math.pow(256,1))+'.'+Math.floor((((proper_address%Math.pow(256,3))%Math.pow(256,2))%Math.pow(256,1))/Math.pow(256,0));}
return output;}
function str_repeat(input,multiplier){return new Array(multiplier+1).join(input);}
function popup(mylink,windowname,w,h){if(typeof(w)=='undefined'){w=400;}
if(typeof(h)=='undefined'){h=400;}
if(!window.focus){return true;}
var href=(typeof(mylink)=='string')?mylink:mylink.href;window.open(href,windowname,'width='+w+',height='+h+',scrollbars=yes');return false;}
function urlblink(i){g('url').style.color=(i%2==1)?"#C00":"#8D9597";if(i>0){setTimeout("urlblink("+(i-1)+")",250);}}
var ie=document.all
var ns6=document.getElementById&&!document.all
function getposOffset(what,offsettype){var totaloffset=(offsettype=="left")?what.offsetLeft:what.offsetTop;var parentEl=what.offsetParent;while(parentEl!=null){totaloffset=(offsettype=="left")?totaloffset+parentEl.offsetLeft:totaloffset+parentEl.offsetTop;parentEl=parentEl.offsetParent;}
return totaloffset;}
smt=null;function sm(obj,p){g('sbml').className="sph";if(p){g('sbm').style.left=(getposOffset(obj,"left")-getposOffset(g('panel'),"left")-35)+'px';}
g('sbm').className="sm";clearTimeout(smt);}
function smh(){smt=setTimeout("smht();",100);}
function smht(){g('sbml').className="spl";g('sbm').className="smh";}
function mshow(obj,p){g('sbml').className="mlh";if(p){g('sbm').style.left=(getposOffset(obj,"left")-getposOffset(g('menu'),"left"))+'px';}
g('sbm').className="sm";clearTimeout(smt);}
function mhide(){smt=setTimeout("_mhide();",100);}
function _mhide(){g('sbml').className="ml";g('sbm').className="smh";}
function hint(s,obj,wl,wr){hint_hide();g('hint').innerHTML='<div class=brd><div>'+s+'</div></div>';g('hint').style.display='';g('hint').style.left=(getposOffset(obj,"left")-wl-3)+'px';setTimeout("hint_pos("+getposOffset(obj,"top")+")",100);g('hint').style.width=(wl+wr)+'px';g('hint').style.backgroundPosition=wl+'px bottom';obj.onmouseout=hint_hide;}
function hint_pos(objtop){g('hint').style.top=(objtop-g('hint').offsetHeight)+'px';}
function hint_hide(){g('hint').style.left='0px';g('hint').style.top='-150px';g('hint').style.display='none';g('hint').innerHTML='';}
function getDocumentHeight(){var ch=(document.compatMode=='CSS1Compat'&&!window.opera)?document.documentElement.clientHeight:document.body.clientHeight;var dh=(document.body.scrollHeight>document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;return(dh>ch)?dh:ch;}
fadetimer=null;function fadein(){if(fadetimer!==null){clearInterval(fadetimer);}
ipf=0;fadetimer=setInterval("ipf++;if(ipf>6){clearInterval(fadetimer);fadetimer=null;}else{document.getElementById('fd').className='fade'+ipf+' '+(ipf>0?'fds':'');document.getElementById('fd').style.height=getDocumentHeight()+'px';}",25);}
function fadeout(){if(fadetimer!==null){clearInterval(fadetimer);fadetimer=null;}
ipf=7;fadetimer=setInterval("ipf--;if(ipf<0){clearInterval(fadetimer);fadetimer=null;}else{document.getElementById('fd').className='fade'+ipf+' '+(ipf>0?'fds':'');}",25);}
function ppb(){g('ppb').className='ppb1';g('ppb').style.top=(getposOffset(g('panel'),"top")-5)+'px';g('ppb').style.left=(document.documentElement.clientWidth/2-452)+'px';fadein();document.onkeydown=esclistener;}
function settings(){g('settings').className='set1';g('settings').style.left=(document.documentElement.clientWidth/2-350)+'px';fadein();document.onkeydown=esclistener;}
function favedit(){g('fvc').className='fvc1';g('fvc').style.left=(document.documentElement.clientWidth/2-350)+'px';fadein();document.onkeydown=esclistener;}
function pplogin(){g('ppm').className='ppm1';g('ppm').style.left=(document.documentElement.clientWidth/2-350)+'px';fadein();document.onkeydown=esclistener;}
function pp_ent(){g('pp_ent_btn').style.display='none';g('pp_bck_btn').style.display='';}
function pp_bck(){g('pp_bck_btn').style.display='none';g('pp_ent_btn').style.display='';}
function hds(){document.onkeydown=function(){}
if(g('settings')){g('settings').className='set0';}
if(g('ppb')){g('ppb').className='ppb0';}
if(g('fvc')){g('fvc').className='fvc0';}
if(g('ppm')){g('ppm').className='ppm0';}
if(g('popup_cont')){g('popup_cont').innerHTML='';}
if(g('popup')){g('popup').style.display='none';}
fadeout();}
function esclistener(e){var k=(e==null)?event.keyCode:e.which;if(k==27){hds();}}
fadetimer1=null;function bp(i,n){if(i==0){g('bt').innerHTML=bstr[n];g('bb').href=burl[n];}else{document.getElementById('bt').className='fade'+Math.abs(i);}}
function bset(n){for(i=0;i<4;i++){if(i==n){g('d'+i).className='ds';}else{g('d'+i).className='dn';}}
if(fadetimer1!==null){clearInterval(fadetimer1);fadetimer1=null;}
ibf=10;fadetimer1=setInterval("ibf--;if(ibf<-9){clearInterval(fadetimer1);fadetimer1=null;document.getElementById('bt').className='';}else{bp(ibf,"+n+");}",25);}
function bc(){for(i=0;i<4;i++){if(g('d'+i).className=='ds'){return i;}}}
fadetimer2=null;function jrs(id,state){if(state==0){g('jrb_'+id).style.backgroundPosition='-'+jrbl[id][1]+'px 0px';g('jrb_'+id).className="fade3";}else if(state==1){g('jrb_'+id).style.backgroundPosition='-'+jrbl[id][1]+'px -35px';g('jrb_'+id).className="fade5";}else{g('jrb_'+id).style.backgroundPosition='-'+jrbl[id][1]+'px -35px';g('jrb_'+id).className="";}}
function jrbp(i,n){if(i==0){g('jrt').innerHTML=jrbl[n][3];}else{document.getElementById('jrt').className='fade'+Math.abs(i);}}
function jrset(n){var n2=jrbl[n][0];jrs(jrbl[jrcurrent][0],0);jrs(n2,2);jrcurrent=n;if(fadetimer2!==null){clearInterval(fadetimer2);fadetimer2=null;}
ibfr=10;fadetimer2=setInterval("ibfr--;if(ibfr<-9){clearInterval(fadetimer2);fadetimer2=null;document.getElementById('jrt').className='';}else{jrbp(ibfr,"+n2+");}",25);}
function sh(e){if(g(e).style.display=='none'){g(e).style.display='';}else{g(e).style.display='none';};}
function esh(e,e1,e2){if(g(e).style.display=='none'){g(e).style.display='';eval(e1);}else{g(e).style.display='none';eval(e2);}}
function faqsh(i){esh("qd"+i,"g('qh"+i+"').style.backgroundPosition='-2px -142px';","g('qh"+i+"').style.backgroundPosition='-2px -92px';");}
function slsh(e,action,lh,hh){var c=document.getElementById(e);var h=parseInt(c.style.height);if(action==0){if(h<=lh){slsh(e,1,lh,hh);}else{slsh(e,2,lh,hh);}}else if(action==1){h+=2;c.style.height=h+"px";if(h<hh){setTimeout("slsh('"+e+"',1,"+lh+","+hh+")",10);}}else{h-=2;if(h<0){h=0;}
c.style.height=h+"px";if(h>lh){setTimeout("slsh('"+e+"',2,"+lh+","+hh+")",10);}}}
function scrollTo(id){var obj=document.getElementById(id);if(!obj){return true;}
animateScroll(getposOffset(obj,'top'),100,function(){window.location.hash=id;});return false;}
function animateScroll(to_height,speed,stop_callback){var from_height=getScrollXY()[1];if(typeof(speed)=='undefined'){speed=100;}
var delta=50;var dist=Math.abs(to_height-from_height);var timer_time=(delta*speed)/dist;_animateScrollRecursive(from_height,to_height,timer_time,delta,stop_callback);}
function _animateScrollRecursive(from_height,to_height,timer_time,delta,stop_callback){var dist=to_height-from_height;if(Math.abs(dist)<=delta){setScrollTop(to_height);if(typeof(stop_callback)!='undefined'){stop_callback();}}else{if(dist>0){var new_height=from_height+delta;}else{var new_height=from_height-delta;}
setScrollTop(new_height);setTimeout(function(){_animateScrollRecursive(new_height,to_height,timer_time,delta,stop_callback);},timer_time);}}
function setScrollTop(y){document.body.scrollTop=y;document.documentElement.scrollTop=y;}
function getScrollXY(){var scrOfX=0,scrOfY=0;if(typeof(window.pageYOffset)=='number'){scrOfY=window.pageYOffset;scrOfX=window.pageXOffset;}else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){scrOfY=document.body.scrollTop;scrOfX=document.body.scrollLeft;}else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){scrOfY=document.documentElement.scrollTop;scrOfX=document.documentElement.scrollLeft;}
return[scrOfX,scrOfY];}
function calcage(secs,num1,num2,LeadingZero){var s=((Math.floor(secs/num1))%num2).toString();if(LeadingZero&&s.length<2){s="0"+s;}
return "<b>"+s+"</b>";}
function CountBack(DisplayFormat,TargetDate,FinishMessage,LeadingZero){var dnow=new Date().valueOf()/1000;if(dnow>TargetDate){g("cntdwn").innerHTML=FinishMessage;return;}
var secs=TargetDate-(dnow.valueOf());var DisplayStr=DisplayFormat.replace(/%D%/g,calcage(secs,86400,100000,LeadingZero));DisplayStr=DisplayStr.replace(/%H%/g,calcage(secs,3600,24,LeadingZero));DisplayStr=DisplayStr.replace(/%M%/g,calcage(secs,60,60,LeadingZero));DisplayStr=DisplayStr.replace(/%S%/g,calcage(secs,1,60,LeadingZero));g("cntdwn").innerHTML=DisplayStr;}
function countdown(DisplayFormat,TargetDate,style,FinishMessage,LeadingZero){if(typeof(style)=="undefined"){style="";}
if(typeof(FinishMessage)=="undefined"){FinishMessage="";}
if(typeof(LeadingZero)=="undefined"){LeadingZero=true;}
document.write("<span id='cntdwn' style='"+style+"'></span>");var dthen=new Date(TargetDate);setInterval("CountBack('"+DisplayFormat+"', '"+(dthen.valueOf()/1000)+"', '"+FinishMessage+"', "+(LeadingZero?"true":"false")+");",1000);}
function stats_click(id,action){try{dataLayer.push({'eventCategory':id,'eventAction':action,'virtualUrl':'/funnel/'+id,'event':'UAevent'});}catch(e){}
try{yaCounter42065329.reachGoal(id+'_'+action);}catch(e){}
try{xcnt_basket_products='VPN';xcnt_basket_quantity=1;xcnttrack();}catch(e){}
return true;}
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(searchElement,fromIndex){var k;if(this==null){throw new TypeError('"this" is null or not defined');}
var O=Object(this);var len=O.length>>>0;if(len===0){return-1;}
var n=+fromIndex||0;if(Math.abs(n)===Infinity){n=0;}
if(n>=len){return-1;}
k=Math.max(n>=0?n:len-Math.abs(n),0);while(k<len){if(k in O&&O[k]===searchElement){return k;}
k++;}
return-1;};}
(function($){$(function(){$("body").delegate('.n-list-item','click',function(){$(".n-list-item").removeClass('active');$(this).addClass('active');});$('header .soc').click(function(){$(this).html('<div class="addthis_inline_share_toolbox"></div><script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-588911b5ad919416"></script> ')});var langMore=$('header .lang');var langClose;langMore.hover(function(){if(langMore.hasClass('active')){clearTimeout(langClose);}else{langMore.addClass('active');$(this).children('p').animate({width:'toggle'},500);}},function(){langClose=setTimeout(function langClose(){langMore.removeClass('active');langMore.children('p').animate({width:'toggle'},500);},3000);});$('.more-press-button').click(function(){if($(this).text()=="Показать еще"){$(this).text("Скрыть");$(".more-press-row").show("slow");}
else{$(this).text("Показать еще");$(".more-press-row").hide("slow");}});$('.more-press-button-ua').click(function(){if($(this).text()=="Показати ще"){$(this).text("Сховати");$(".more-press-row").show("slow");}
else{$(this).text("Показати ще");$(".more-press-row").hide("slow");}});$('.more-reviews-button').click(function(){if($(this).text()=="Показать еще"){$(this).text("Скрыть");$(".more-reviews-row").show("slow");}
else{$(this).text("Показать еще");$(".more-reviews-row").hide("slow");}});$('.more-reviews-button-ua').click(function(){if($(this).text()=="Показати ще"){$(this).text("Сховати");$(".more-reviews-row").show("slow");}
else{$(this).text("Показати ще");$(".more-reviews-row").hide("slow");}});$('.b2-settings').click(function(){if($(this).text()=="Настройки"){$(this).text("Закрыть");$("#anonymizer-settings").css("display","inline-block");}
else{$(this).text("Настройки");$("#anonymizer-settings").css("display","none");}});$('.b2-settings-en').click(function(){if($(this).text()=="Settings"){$(this).text("Close");$("#anonymizer-settings").css("display","inline-block");}
else{$(this).text("Settings");$("#anonymizer-settings").css("display","none");}});$('.b2-settings-es').click(function(){if($(this).text()=="Opciones"){$(this).text("Cerrar");$("#anonymizer-settings").css("display","inline-block");}
else{$(this).text("Opciones");$("#anonymizer-settings").css("display","none");}});$('.more-service-button').click(function(){if($(this).text()=="Показать еще"){$(this).text("Скрыть");$(".more-service-row").show("slow");}
else{$(this).text("Показать еще");$(".more-service-row").hide("slow");}});$('.more-service-button-en').click(function(){if($(this).text()=="Show more"){$(this).text("Hide");$(".more-service-row").show("slow");}
else{$(this).text("Show more");$(".more-service-row").hide("slow");}});$('.more-service-button-es').click(function(){if($(this).text()=="Mostrar mas"){$(this).text("Esconder");$(".more-service-row").show("slow");}
else{$(this).text("Mostrar mas");$(".more-service-row").hide("slow");}});$('.more-service-button-ua').click(function(){if($(this).text()=="Показати ще"){$(this).text("Сховати");$(".more-service-row").show("slow");}
else{$(this).text("Показати ще");$(".more-service-row").hide("slow");}});});$(function(){$('.n-vpn-connect-button').click(function(){$(".n-vpn-connect-wrapper").addClass("n-vpn-connect-hide-2");$(".n-vpn-connect-hide").addClass("n-vpn-connect-visible");});$('input[type="file"], select[name="cat"], select#speed_servers_sort, select#f_type, .popup .n-list-item select.formstyler, select.as-country-select').styler();var curr_link=window.location.href.toLowerCase().replace(/[\/]+$/,'');$('a').each(function(){if(this.href.split('#')[0].toLowerCase().replace(/[\/]+$/,'')==curr_link){$(this).addClass('current').parents('.dropdown-menu').addClass('current-parent');}});$('.select').click(function(e){$(this).toggleClass('is-active');});$("body").click(function(e){if($(e.target).closest(".pform_country").length==0){$(".pform_country .select.is-active").removeClass("is-active");}
else{$('.pform_country .allcountries__close').click(function(e){$('.pform_country .select').removeClass('is-active')});}});$('.js-main-btn').on('click',function(){$('.faq__drop').toggleClass('is-drop__open');$('.is-marker1').toggleClass('is-active');$('.is-open').toggleClass('is-close');return false;});$('.js-second-btn').on('click',function(){$('.faq__second-drop').toggleClass('is-drop__open');$('.is-marker2').toggleClass('is-active');$('.is-open__drop').toggleClass('is-close');return false;});$('.js-text-btn').on('click',function(){$('.faq__second-text').toggleClass('is-drop__open');$('.is-marker').toggleClass('is-active');return false;});$('body').delegate('.n-all-country','click',function(){var $this=$(this);var checked=$this.find('input').is(':checked');$('.choose-country').prop('checked',checked);});$('.parallax-layer').parallax({mouseport:$(".block1")});$('ul.tabs li').click(function(){$('.content-tabs-body-right')
var tab_id=$(this).attr('data-tab');$('ul.tabs li').removeClass('current');$('.tab-content').removeClass('current');$(this).addClass('current');$("#"+tab_id).addClass('current');});var waypoints=$('#context-example-offset').waypoint({handler:function(){notify('Hit midpoint of my context')},context:'#overflow-scroll-offset',offset:'50%'});$('.network__atlas').waypoint(function(){$('#vpn-map-google').attr('src','/vpn/map/');Waypoint.disableAll()},{offset:'100%'});$('.n-front-block6').waypoint(function(){$('.n-front-block6 .article .article-image').each(function(){var $this=$(this);$this.css({background:'url('+$this.attr('data-image')+') '})});},{offset:'100%'});$('.parallax-layer-2').parallax({mouseport:$(".spacecat-block")});});$(function(){$(document).ready(function(){if(/\/order\/vpn/.test(window.location.href)){$('.header-block2 .header-nav > li.dropdown-menu').addClass('nostreak');}});});$(function(){$(document).ready(function(){if(!localStorage.getItem('gdprconfirm')){$('#gdpr-block').addClass('active');}
$('#gdpr-confirm-btn').on('click',function(e){e.preventDefault();localStorage.setItem('gdprconfirm',1);$('#gdpr-block').removeClass('active');});});});$(function(){$(document).ready(function(){if(/(ru|ua|es|en)(\/faq\/)/.test(window.location.href)){if(localStorage.getItem('faqhash')){$(localStorage.getItem('faqhash')).trigger('click');setTimeout(function(){$('html, body').animate({scrollTop:$(localStorage.getItem('faqhash')).offset().top},500);$(localStorage.getItem('faqhash')).parent().parent().find('.content-accordion-body').slideDown();},500);}}
$('.acordion .item .title-accordion .text-accordion').on('click',function(e){e.preventDefault();localStorage.setItem('faqhash',window.location.hash);});if(!/(ru|ua|es|en)(\/faq\/)/.test(window.location.href)){localStorage.removeItem('faqhash');}
$('#content-section > header > div.header-block2 > div > nav > ul > li:nth-child(5) > a').on('click',function(e){localStorage.removeItem('faqhash');});});});$(document).ready(function(){$(function(){if(/show_promo/.test(location.search)){$('.popup-promo-wrap').addClass('active');}
$('.popup-promo-wrap .popup-promo .close-btn, .popup-promo-wrap .popup-promo .btn').on('click',function(e){e.preventDefault();$('.popup-promo-wrap').removeClass('active');});});});})(jQuery);var punycode=new function Punycode(){this.utf16={decode:function(input){var output=[],i=0,len=input.length,value,extra;while(i<len){value=input.charCodeAt(i++);if((value&0xF800)===0xD800){extra=input.charCodeAt(i++);if(((value&0xFC00)!==0xD800)||((extra&0xFC00)!==0xDC00)){throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");}
value=((value&0x3FF)<<10)+(extra&0x3FF)+0x10000;}
output.push(value);}
return output;}}
var initial_n=0x80;var initial_bias=72;var delimiter="\x2D";var base=36;var damp=700;var tmin=1;var tmax=26;var skew=38;var maxint=0x7FFFFFFF;function decode_digit(cp){return cp-48<10?cp-22:cp-65<26?cp-65:cp-97<26?cp-97:base;}
function encode_digit(d,flag){return d+22+75*(d<26)-((flag!=0)<<5);}
function adapt(delta,numpoints,firsttime){var k;delta=firsttime?Math.floor(delta/damp):(delta>>1);delta+=Math.floor(delta/numpoints);for(k=0;delta>(((base-tmin)*tmax)>>1);k+=base){delta=Math.floor(delta/(base-tmin));}
return Math.floor(k+(base-tmin+1)*delta/(delta+skew));}
function encode_basic(bcp,flag){bcp-=(bcp-97<26)<<5;return bcp+((!flag&&(bcp-65<26))<<5);}
this.encode=function(input,preserveCase){var n,delta,h,b,bias,j,m,q,k,t,ijv,case_flags;if(preserveCase){case_flags=this.utf16.decode(input);}
input=this.utf16.decode(input.toLowerCase());var input_length=input.length;if(preserveCase){for(j=0;j<input_length;j++){case_flags[j]=input[j]!=case_flags[j];}}
var output=[];n=initial_n;delta=0;bias=initial_bias;for(j=0;j<input_length;++j){if(input[j]<0x80){output.push(String.fromCharCode(case_flags?encode_basic(input[j],case_flags[j]):input[j]));}}
h=b=output.length;if(b>0)output.push(delimiter);while(h<input_length){for(m=maxint,j=0;j<input_length;++j){ijv=input[j];if(ijv>=n&&ijv<m)m=ijv;}
if(m-n>Math.floor((maxint-delta)/(h+1))){throw RangeError("punycode_overflow (1)");}
delta+=(m-n)*(h+1);n=m;for(j=0;j<input_length;++j){ijv=input[j];if(ijv<n){if(++delta>maxint)return Error("punycode_overflow(2)");}
if(ijv==n){for(q=delta,k=base;;k+=base){t=k<=bias?tmin:k>=bias+tmax?tmax:k-bias;if(q<t)break;output.push(String.fromCharCode(encode_digit(t+(q-t)%(base-t),0)));q=Math.floor((q-t)/(base-t));}
output.push(String.fromCharCode(encode_digit(q,preserveCase&&case_flags[j]?1:0)));bias=adapt(delta,h+1,h==b);delta=0;++h;}}
++delta,++n;}
return output.join("");}
this.toASCII=function(domain){var domain_array=domain.split(".");var out=[];for(var i=0;i<domain_array.length;++i){var s=domain_array[i];out.push(s.match(/[^A-Za-z0-9-]/)?"xn--"+punycode.encode(s):s);}
return out.join(".");}}();