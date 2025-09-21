const $ = (s,ctx=document)=>ctx.querySelector(s);
const $$ = (s,ctx=document)=>Array.from(ctx.querySelectorAll(s));
const CONTACT = { email: "teamgamepj@gmail.com" };

function bindModals(){
  $$("[data-open]").forEach(btn => btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-open"); const m = document.getElementById(id); if(m) m.hidden = false;
  }));
  $$("[data-close]").forEach(btn => btn.addEventListener("click", () => btn.closest(".modal").hidden = true));
  $$("[data-send]").forEach(btn => btn.addEventListener("click", () => {
    const kind = btn.getAttribute("data-send");
    const modal = btn.closest(".modal");
    const fields = $$("[data-f]", modal);
    const payload = {};
    fields.forEach(f => payload[f.getAttribute("data-f")] = f.value.trim());
    const subjects = {
      online: "TEAMGAME — Prijava za online školu",
      teren: "TEAMGAME — Prijava za učenje na terenu",
      ucitelj: "TEAMGAME — Prijava za učitelja",
      otkup: "TEAMGAME — Upit za otkup projekta",
      klubovi: "TEAMGAME — Kontakt (klubovi/savez)",
    };
    const subject = subjects[kind] || "TEAMGAME — upit";
    const body = encodeURIComponent(Object.entries(payload).map(([k,v]) => `${k.toUpperCase()}: ${v}`).join("\n"));
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  }));
}

function bindComposer(section){
  const key = section.getAttribute("data-key");
  const title = section.querySelector(".c-title");
  const media = section.querySelector(".c-media");
  const pin = section.querySelector(".c-pin");
  const btn = section.querySelector(".c-post");
  const content = section.querySelector(".c-content");
  const feedPinned = document.getElementById(`${key}-pinned`);
  const feed = document.getElementById(`${key}-regular`);
  const posts = [];

  function render(){
    feedPinned.innerHTML = ""; feed.innerHTML = "";
    posts.filter(p=>p.pinned).sort((a,b)=>b.t-a.t).forEach(p=> feedPinned.appendChild(card(p)));
    posts.filter(p=>!p.pinned).sort((a,b)=>b.t-a.t).forEach(p=> feed.appendChild(card(p)));
  }
  function card(p){
    const el = document.createElement("article");
    el.className = "card";
    el.innerHTML = `
      <div class="top">
        <div><time class="time">${new Date(p.t).toLocaleString()}</time></div>
        <div class="actions"><button data-act="del">Obriši</button></div>
      </div>
      ${p.title?`<h3>${escapeHtml(p.title)}</h3>`:""}
      <p>${escapeHtml(p.content)}</p>
      ${p.media?`<img src="${escapeAttr(p.media)}" alt="slika">`:""}
    `;
    el.querySelector('[data-act="del"]').addEventListener("click", ()=>{
      const i = posts.findIndex(x=>x.id===p.id);
      if(i>=0){ posts.splice(i,1); render(); }
    });
    return el;
  }
  btn.addEventListener("click", ()=>{
    const t = title.value.trim(); const c = content.value.trim(); const m = media.value.trim();
    if(!t && !c) return;
    posts.unshift({ id: crypto.randomUUID(), title: t||undefined, content: c, media: m||undefined, pinned: pin.checked, t: Date.now() });
    title.value=""; content.value=""; media.value=""; pin.checked=false;
    render();
  });
}

function escapeHtml(s){return s.replace(/[&<>\"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
function escapeAttr(s){return s.replace(/\"/g,"&quot;");}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  bindModals();
  document.querySelectorAll(".composer").forEach(bindComposer);
});
