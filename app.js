(function(){
const $=id=>document.getElementById(id), N=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
const today=new Date().getDay(); const W=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
let di=(today+6)%7, tab="am";
function showDay(i){di=i;const d=DAYS[i];$("dayname").textContent=W[i]+" · Día "+(i+1);$("dtitle").textContent=d.title;
$("dverse").textContent="“"+d.verse+"”";$("dref").textContent=d.ref;$("drefl").innerHTML="";
d.refl.forEach(p=>{const e=document.createElement("p");e.textContent=p;$("drefl").appendChild(e)});
$("dprayer").textContent=d.prayer;$("daction").textContent=d.action;
[...$("daybtns").children].forEach((b,j)=>b.setAttribute("aria-pressed",j===i));showShort()}
W.forEach((w,i)=>{const b=document.createElement("button");b.textContent=w.slice(0,3);b.setAttribute("aria-label",w);b.onclick=()=>showDay(i);$("daybtns").appendChild(b)});
function showShort(){$("short").textContent=DAYS[di][tab]}
document.querySelectorAll("[role=tab]").forEach(b=>b.onclick=()=>{tab=b.dataset.t;document.querySelectorAll("[role=tab]").forEach(x=>x.setAttribute("aria-selected",x===b));showShort()});
const h=new Date().getHours();tab=h<11?"am":h<18?"work":"night";document.querySelectorAll("[role=tab]").forEach(x=>x.setAttribute("aria-selected",x.dataset.t===tab));
showDay(di);
// Rosario
let steps=[],si=0;
function build(key){const m=MIST[key];steps=[];const P=(k,o)=>steps.push(Object.assign({k},o||{}));
P("cruz",{s:"Inicio"});P("credo",{s:"Inicio"});P("padre",{s:"Inicio"});
for(let i=1;i<=3;i++)P("ave",{s:"Inicio",c:i,t:3,note:["por la fe","por la esperanza","por la caridad"][i-1]});P("gloria",{s:"Inicio"});
m[1].forEach((x,j)=>{const s=(j+1)+"º misterio de "+5;P("padre",{s,m:x});for(let i=1;i<=10;i++)P("ave",{s,m:x,c:i,t:10});P("gloria",{s,m:x});P("fatima",{s,m:x})});
["salve","intenciones","angel","fin"].forEach(k=>P(k,{s:"Final"}));si=0;$("rmist").textContent=m[0];showStep()}
function showStep(){const st=steps[si],p=PR[st.k];$("rstep").textContent=st.s+" · paso "+(si+1)+" de "+steps.length;
$("rname").textContent=p[0]+(st.c?" "+st.c+" de "+st.t:"")+(st.note?" ("+st.note+")":"");
$("rmed").textContent=st.m?st.m[0]+". "+st.m[1]:"";$("rtext").textContent=p[1];
const b=$("beads");b.innerHTML="";if(st.t){for(let i=1;i<=st.t;i++){const e=document.createElement("span");if(i<=st.c)e.className="on";b.appendChild(e)}}
$("rprev").disabled=si===0;$("rnext").textContent=si===steps.length-1?"Empezar de nuevo":"Siguiente";$("rbar").style.width=((si+1)/steps.length*100)+"%"}
$("rnext").onclick=()=>{si=si===steps.length-1?0:si+1;showStep()};$("rprev").onclick=()=>{if(si>0){si--;showStep()}};
const sel=$("rsel");sel.value=MDAY[today];sel.onchange=()=>build(sel.value);build(sel.value);
})();
