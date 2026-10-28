(function(){
const $=id=>document.getElementById(id)||document.createElement("div");
const en=()=>window.odLang==="en";
const WES=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],WEN=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const W=()=>en()?WEN:WES;
const today=new Date().getDay();
let di=(today+6)%7, tab="am";
function buildDays(){const c=$("daybtns");c.innerHTML="";W().forEach((w,i)=>{const b=document.createElement("button");b.textContent=w.slice(0,3);b.setAttribute("aria-label",w);b.onclick=()=>showDay(i);c.appendChild(b)})}
function showDay(i){di=i;const d=DAYS[i];$("dayname").textContent=W()[i]+" · "+(en()?"Day ":"Día ")+(i+1);$("dtitle").textContent=d.title;
$("dverse").textContent="“"+d.verse+"”";$("dref").textContent=d.ref;$("drefl").innerHTML="";
d.refl.forEach(p=>{const e=document.createElement("p");e.textContent=p;$("drefl").appendChild(e)});
$("dprayer").textContent=d.prayer;$("daction").textContent=d.action;
[...$("daybtns").children].forEach((b,j)=>b.setAttribute("aria-pressed",j===i));showShort()}
function showShort(){$("short").textContent=DAYS[di][tab]}
document.querySelectorAll("[role=tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.t;document.querySelectorAll("[role=tab]").forEach(x=>x.setAttribute("aria-selected",x===b));showShort()});
const h=new Date().getHours();tab=h<11?"am":h<18?"work":"night";document.querySelectorAll("[role=tab]").forEach(x=>x.setAttribute("aria-selected",x.dataset.t===tab));
buildDays();showDay(di);
function showVod(){const n=new Date(),doy=Math.floor((new Date(n.getFullYear(),n.getMonth(),n.getDate())-new Date(n.getFullYear(),0,1))/864e5),v=VDIA[doy%VDIA.length];$("hverse").textContent="“"+v.v+"”";$("href").textContent=v.r;$("vtopic").textContent=v.t;}
showVod();
// Rosario
let steps=[],si=0,curKey="";
const NOTES={es:["por la fe","por la esperanza","por la caridad"],en:["for faith","for hope","for charity"]};
function build(key){const m=MIST[key];curKey=key;steps=[];const P=(k,o)=>steps.push(Object.assign({k},o||{}));
P("cruz",{s:"i"});P("credo",{s:"i"});P("padre",{s:"i"});
for(let i=1;i<=3;i++)P("ave",{s:"i",c:i,t:3,note:i-1});P("gloria",{s:"i"});
m[1].forEach((x,j)=>{const s=j+1;P("padre",{s,j});for(let i=1;i<=10;i++)P("ave",{s,j,c:i,t:10});P("gloria",{s,j});P("fatima",{s,j})});
["salve","intenciones","angel","fin"].forEach(k=>P(k,{s:"f"}));si=0;$("rmist").textContent=m[0];showStep()}
function sLabel(s){return s==="i"?(en()?"Beginning":"Inicio"):s==="f"?(en()?"End":"Final"):(en()?"Mystery "+s+" of 5":s+"º misterio de 5")}
function showStep(){const st=steps[si],p=PR[st.k],mm=st.j!==undefined?MIST[curKey][1][st.j]:null;
$("rstep").textContent=sLabel(st.s)+" · "+(en()?"step "+(si+1)+" of "+steps.length:"paso "+(si+1)+" de "+steps.length);
$("rname").textContent=p[0]+(st.c?" "+st.c+" "+(en()?"of":"de")+" "+st.t:"")+(st.note!==undefined?" ("+NOTES[en()?"en":"es"][st.note]+")":"");
$("rmed").textContent=mm?mm[0]+". "+mm[1]:"";$("rtext").textContent=p[1];
const b=$("beads");b.innerHTML="";if(st.t){for(let i=1;i<=st.t;i++){const e=document.createElement("span");if(i<=st.c)e.className="on";b.appendChild(e)}}
$("rprev").disabled=si===0;$("rnext").textContent=si===steps.length-1?(en()?"Start over":"Empezar de nuevo"):(en()?"Next":"Siguiente");$("rbar").style.width=((si+1)/steps.length*100)+"%"}
$("rnext").onclick=()=>{si=si===steps.length-1?0:si+1;showStep()};$("rprev").onclick=()=>{if(si>0){si--;showStep()}};
const sel=$("rsel");sel.value=MDAY[today];sel.onchange=()=>build(sel.value);build(sel.value);
// language switch: re-render everything that comes from data
window.odRefresh=function(){buildDays();showDay(di);showVod();$("rmist").textContent=MIST[curKey][0];showStep()};
})();
