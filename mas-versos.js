(function(){var c=document.querySelector(".more-verses");if(!c)return;var it=[].slice.call(c.querySelectorAll(".mv-item"));if(!it.length)return;var fig=c.parentNode,bq=fig.querySelector(".big-verse"),rf=bq&&bq.nextElementSibling;if(!bq)return;
var m=document.createElement("div");m.className="mv-item mv-main";fig.insertBefore(m,bq);m.appendChild(bq);if(rf&&rf.classList.contains("ref"))m.appendChild(rf);
var S=[m].concat(it),cur=0;c.classList.add("mv-js");fig.classList.add("mv-on");
var nav=document.createElement("div");nav.className="mv-nav";nav.setAttribute("role","group");nav.setAttribute("aria-label","Versículos");
function mk(t,l,f){var b=document.createElement("button");b.type="button";b.className="mv-btn";b.textContent=t;if(l)b.setAttribute("aria-label",l);b.onclick=function(e){e.stopPropagation();f()};nav.appendChild(b);return b}
var prev=mk("← Anterior","Versículo anterior",function(){go(cur-1)}),dots=S.map(function(s,i){s.id="mv"+i;var b=mk(String(i+1),"Versículo "+(i+1),function(){go(i)});b.classList.add("mv-n");b.setAttribute("aria-controls",s.id);return b}),next=mk("Siguiente →","Versículo siguiente",function(){go(cur+1)});
var lb=document.createElement("p");lb.className="mv-lbl";lb.setAttribute("aria-live","polite");
function go(i){if(i<0||i>=S.length)return;cur=i;S.forEach(function(s,k){s.classList.toggle("mv-show",k===i);s.hidden=k!==i});dots.forEach(function(b,k){b.setAttribute("aria-pressed",k===i?"true":"false")});prev.disabled=i===0;next.disabled=i===S.length-1;lb.textContent=i===0?"Versículo principal":"Versículo "+(i+1)+" de "+S.length}
fig.appendChild(lb);fig.appendChild(nav);go(0)})();
