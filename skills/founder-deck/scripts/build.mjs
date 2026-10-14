#!/usr/bin/env node
// founder-deck: deck.json -> single-file HTML pitch deck. Zero dependencies.
// Usage: node build.mjs deck.json [out.html] [--theme midnight|paper|sunset]
import fs from 'node:fs';
const args = process.argv.slice(2);
const ti = args.indexOf('--theme'); let themeArg = null;
if (ti >= 0) { themeArg = args[ti + 1]; args.splice(ti, 2); }
const [inp, outArg] = args;
if (!inp) { console.error('usage: build.mjs deck.json [out.html] [--theme midnight|paper|sunset]'); process.exit(1); }
const deck = JSON.parse(fs.readFileSync(inp, 'utf8'));
const THEMES = {
  midnight: { bg: '#0b1020', fg: '#eef1ff', muted: '#9aa3c7', accent: '#7c9cff', accent2: '#b38cff', card: '#151c35', font: "'Inter', system-ui, sans-serif", head: "'Inter', system-ui, sans-serif" },
  paper:    { bg: '#faf7f0', fg: '#1d1b16', muted: '#6d675a', accent: '#c2410c', accent2: '#1d4ed8', card: '#ffffff', font: "Georgia, 'Iowan Old Style', serif", head: "'Helvetica Neue', Arial, sans-serif" },
  sunset:   { bg: '#1a0f14', fg: '#fff4ec', muted: '#d7b3a4', accent: '#ff7a59', accent2: '#ffc65c', card: '#2a1820', font: "system-ui, sans-serif", head: "system-ui, sans-serif" },
};
const theme = THEMES[themeArg || deck.theme] ? (themeArg || deck.theme) : 'midnight';
const t = THEMES[theme];
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const list = a => a?.length ? `<ul>${a.map(x => `<li>${md(x)}</li>`).join('')}</ul>` : '';
const R = {
  title: s => `<div class="center"><div class="kicker">${esc(deck.company)}</div><h1>${md(s.title)}</h1>${s.subtitle ? `<p class="lead">${md(s.subtitle)}</p>` : ''}${s.meta ? `<div class="meta">${esc(s.meta)}</div>` : ''}</div>`,
  bullets: s => `<h2>${md(s.title)}</h2>${s.lead ? `<p class="lead">${md(s.lead)}</p>` : ''}${list(s.bullets)}`,
  statement: s => `<div class="center"><div class="kicker">${esc(s.kicker || '')}</div><p class="big">${md(s.text)}</p></div>`,
  metrics: s => `<h2>${md(s.title)}</h2><div class="grid">${(s.metrics || []).map(m => `<div class="card"><div class="num">${esc(m.value)}</div><div class="lbl">${md(m.label)}</div></div>`).join('')}</div>${s.note ? `<p class="note">${md(s.note)}</p>` : ''}`,
  columns: s => `<h2>${md(s.title)}</h2><div class="grid">${(s.columns || []).map(c => `<div class="card"><h3>${md(c.title)}</h3>${c.text ? `<p>${md(c.text)}</p>` : ''}${list(c.bullets)}</div>`).join('')}</div>`,
  team: s => `<h2>${md(s.title || 'Team')}</h2><div class="grid">${(s.people || []).map(p => `<div class="card"><div class="avatar">${esc((p.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2))}</div><h3>${esc(p.name)}</h3><div class="lbl">${esc(p.role)}</div><p>${md(p.bio || '')}</p></div>`).join('')}</div>`,
  ask: s => `<div class="center"><div class="kicker">The ask</div><div class="num huge">${esc(s.amount)}</div><p class="lead">${md(s.text || '')}</p>${list(s.bullets)}${s.contact ? `<div class="meta">${esc(s.contact)}</div>` : ''}</div>`,
};
const slides = deck.slides.map((s, i) => `<section class="slide s-${esc(s.type)}" data-i="${i}">${(R[s.type] || R.bullets)(s)}<footer><span>${esc(deck.company)}</span><span>${i + 1} / ${deck.slides.length}</span></footer></section>`).join('\n');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(deck.company)} — ${esc(deck.tagline || 'Pitch deck')}</title>
<style>
:root{--bg:${t.bg};--fg:${t.fg};--muted:${t.muted};--accent:${t.accent};--accent2:${t.accent2};--card:${t.card};--font:${t.font};--head:${t.head}}
*{box-sizing:border-box;margin:0}html,body{height:100%;background:#000;font-family:var(--font);color:var(--fg)}
.deck{position:fixed;inset:0;display:grid;place-items:center}
.slide{position:absolute;width:1280px;height:720px;padding:72px 88px;background:var(--bg);display:none;flex-direction:column;overflow:hidden;transform-origin:center}
.slide.active{display:flex}
.slide::before{content:"";position:absolute;width:620px;height:620px;right:-220px;top:-260px;border-radius:50%;background:radial-gradient(circle,var(--accent) 0%,transparent 65%);opacity:.18}
h1,h2,h3{font-family:var(--head);letter-spacing:-.02em}
h1{font-size:84px;line-height:1.02;margin:18px 0;background:linear-gradient(90deg,var(--fg),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent}
h2{font-size:52px;margin-bottom:28px}h3{font-size:26px;margin-bottom:10px}
.kicker{text-transform:uppercase;letter-spacing:.18em;font-size:16px;color:var(--accent);font-weight:700}
.lead{font-size:28px;color:var(--muted);line-height:1.4;max-width:980px;margin-bottom:22px}
.big{font-size:56px;line-height:1.2;font-weight:700;max-width:1050px;margin-top:16px}
.big strong,li strong,.lead strong{color:var(--accent)}
.center{margin:auto 0;display:flex;flex-direction:column;justify-content:center}
ul{list-style:none;padding:0}li{font-size:28px;line-height:1.35;margin:14px 0;padding-left:36px;position:relative}
li::before{content:"";position:absolute;left:0;top:13px;width:16px;height:16px;border-radius:4px;background:linear-gradient(135deg,var(--accent),var(--accent2))}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px}
.card{background:var(--card);border-radius:20px;padding:30px;border:1px solid color-mix(in srgb,var(--fg) 10%,transparent)}
.card p,.card li{font-size:20px;color:var(--muted);line-height:1.45}.card li{margin:8px 0;padding-left:26px}.card li::before{width:10px;height:10px;top:9px}
.num{font-size:60px;font-weight:800;font-family:var(--head);color:var(--accent)}.num.huge{font-size:120px;margin:10px 0}
.lbl{font-size:20px;color:var(--muted);margin-top:6px}.note{margin-top:26px;font-size:18px;color:var(--muted)}
.avatar{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:24px;color:var(--bg);background:linear-gradient(135deg,var(--accent),var(--accent2));margin-bottom:16px}
.meta{margin-top:26px;font-size:20px;color:var(--muted)}
footer{position:absolute;left:88px;right:88px;bottom:32px;display:flex;justify-content:space-between;font-size:15px;color:var(--muted);opacity:.8}
.bar{position:fixed;left:0;bottom:0;height:4px;background:var(--accent);transition:width .25s}
@media print{@page{size:1280px 720px;margin:0}html,body{background:var(--bg)}.deck{position:static;display:block}.slide{display:flex!important;position:relative;transform:none!important;page-break-after:always}.bar{display:none}}
</style></head><body data-theme="${theme}"><div class="deck">
${slides}
</div><div class="bar"></div>
<!-- generated by founder-deck-skill · github.com/Omrigotlieb/founder-deck-skill · made by the Guti AI team (gutiailabs.com) -->
<script>
const S=[...document.querySelectorAll('.slide')],bar=document.querySelector('.bar');let i=Math.min(+(location.hash.slice(1)||1)-1,S.length-1)||0;
function fit(){const k=Math.min(innerWidth/1280,innerHeight/720);S.forEach(s=>s.style.transform='scale('+k+')')}
function go(n){i=Math.max(0,Math.min(S.length-1,n));S.forEach((s,j)=>s.classList.toggle('active',j===i));bar.style.width=((i+1)/S.length*100)+'%';history.replaceState(null,'','#'+(i+1))}
addEventListener('keydown',e=>{if(['ArrowRight','PageDown',' ','Enter'].includes(e.key))go(i+1);if(['ArrowLeft','PageUp','Backspace'].includes(e.key))go(i-1);if(e.key==='Home')go(0);if(e.key==='End')go(S.length-1);if(e.key==='p')print()});
addEventListener('click',e=>go(e.clientX>innerWidth/3?i+1:i-1));addEventListener('resize',fit);fit();go(i);
</script></body></html>`;
const out = outArg || inp.replace(/\.json$/, '') + '.html';
fs.writeFileSync(out, html);
console.log(`wrote ${out} (${deck.slides.length} slides, theme: ${theme})`);
