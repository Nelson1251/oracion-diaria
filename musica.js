(function(){var s=document.currentScript.src.replace(/musica\.js.*$/,""),a=new Audio(s+"audio/fondo.mp3"),V=0.17,on=localStorage.getItem("od-musica")!=="off",started=false,duck=0,tm;a.loop=true;a.preload="none";a.volume=0;
var b=document.createElement("button");b.type="button";b.style.cssText="position:fixed;right:12px;bottom:12px;z-index:50;width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.4);background:rgba(15,20,40,.45);color:#fff;font-size:18px;opacity:.75;cursor:pointer";
function lbl(){b.textContent=on?"🔊":"🔇";b.setAttribute("aria-label",on?"Silenciar música":"Activar música");}
function fade(to){clearInterval(tm);tm=setInterval(function(){var d=to-a.volume;if(Math.abs(d)<.01){a.volume=to;clearInterval(tm);if(to===0&&!on)a.pause();return}a.volume=Math.max(0,Math.min(1,a.volume+d*.15))},60)}
function target(){return on?(duck>0?0.05:V):0}
function start(){if(started||!on)return;started=true;a.play().then(function(){fade(target())}).catch(function(){started=false})}
b.onclick=function(e){e.stopPropagation();on=!on;localStorage.setItem("od-musica",on?"on":"off");lbl();if(on){if(!started)start();else{a.play();fade(target())}}else fade(0)};
["pointerdown","keydown","touchstart"].forEach(function(ev){document.addEventListener(ev,start,{once:false,passive:true})});
var tt;document.addEventListener("input",function(){duck|=2;fade(target());clearTimeout(tt);tt=setTimeout(function(){duck&=~2;fade(target())},2500)},true);
if(window.speechSynthesis){var sp=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=function(u){duck|=1;fade(target());var f=function(){if(!speechSynthesis.speaking){duck&=~1;fade(target())}};u.addEventListener("end",f);u.addEventListener("error",f);sp(u)}}
document.addEventListener("play",function(e){if(e.target!==a){duck|=4;fade(target())}},true);["pause","ended"].forEach(function(ev){document.addEventListener(ev,function(e){if(e.target!==a){duck&=~4;fade(target())}},true)});
lbl();document.addEventListener("DOMContentLoaded",function(){document.body.appendChild(b)});if(document.body)document.body.appendChild(b);})();
