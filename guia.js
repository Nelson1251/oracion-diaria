(function(){var gs=document.querySelectorAll(".guia");if(!gs.length)return;var all=[];
function f(s){s=Math.max(0,Math.floor(s));return Math.floor(s/60)+":"+("0"+s%60).slice(-2)}
Array.prototype.forEach.call(gs,function(g){var a=g.querySelector("audio"),b=g.querySelector(".guia-btn"),ic=g.querySelector(".guia-ic"),t=g.querySelector(".guia-t"),bar=g.querySelector(".guia-bar i");all.push(a);
b.onclick=function(e){e.stopPropagation();if(a.paused)a.play();else a.pause()};
a.addEventListener("play",function(){all.forEach(function(o){if(o!==a&&!o.paused)o.pause()});ic.textContent="❚❚";b.setAttribute("aria-pressed","true");g.classList.add("on")});
a.addEventListener("pause",function(){ic.textContent="▶";b.setAttribute("aria-pressed","false");g.classList.remove("on")});
a.addEventListener("ended",function(){a.currentTime=0;bar.style.width="0"});
a.addEventListener("timeupdate",function(){if(a.duration){bar.style.width=(a.currentTime/a.duration*100)+"%";t.textContent=f(a.currentTime)+" / "+f(a.duration)}});});})();
