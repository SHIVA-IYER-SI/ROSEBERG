
const APP=window.ROSEBERG_GRID_MAP;
const FAM=window.SECTOR_FAMILY||{};
const SEV=window.CHK_SEV_LITE||{};
const CAPS=window.CHAIN_CAPTIONS||{};
const CHAIN=["01","02","03","04","05","06","07","08","09","10","11","12","13","14"];
const FAM_LABEL={materials:'MATERIALS & EQUIPMENT',silicon:'SILICON',infra:'INFRASTRUCTURE',software:'SOFTWARE & MODELS',economy:'REAL ECONOMY',overlay:'SYSTEM OVERLAY'};
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function nodeHref(code){const page=window.ROSEBERG_NODE_PAGE||'node.html';return page+'?id='+encodeURIComponent(code);}
function rect(id){return APP.positions[id];}
function center(r){return{x:r.x+r.w/2,y:r.y+r.h/2};}
// ===== chain connectors: orthogonal ladder routing through gutters =====
const ROUTE_KIND={"01>02":"h","02>03":"h","03>04":"v","04>05":"h","05>06":"h","06>07":"v","07>08":"h","08>09":"h","09>10":"v","10>11":"h","11>12":"h","12>13":"v","13>14":"h"};
const ROUTE_XOFF={};
function overlapMid(a0,a1,b0,b1){const lo=Math.max(a0,b0),hi=Math.min(a1,b1);return (lo+hi)/2;}
function chainGeom(aId,bId){
  const ra=rect(aId),rb=rect(bId),key=aId+'>'+bId,kind=ROUTE_KIND[key]||'z';
  if(kind==='h'){
    const y=overlapMid(ra.y,ra.y+ra.h,rb.y,rb.y+rb.h);
    const sx=rb.x>ra.x?ra.x+ra.w:ra.x, ex=rb.x>ra.x?rb.x:rb.x+rb.w;
    return{d:`M ${sx} ${y} L ${ex} ${y}`,lx:(sx+ex)/2,ly:y,kind};
  }
  if(kind==='v'){
    let x=overlapMid(ra.x,ra.x+ra.w,rb.x,rb.x+rb.w)+(ROUTE_XOFF[key]||0);
    const sy=rb.y>ra.y?ra.y+ra.h:ra.y, ey=rb.y>ra.y?rb.y:rb.y+rb.h;
    return{d:`M ${x} ${sy} L ${x} ${ey}`,lx:x,ly:(sy+ey)/2,kind};
  }
  // z: exit vertical into the empty channel between rows, run horizontal, enter vertical
  const below=rb.y>ra.y;
  const sx=ra.x+ra.w/2+(ROUTE_XOFF[key]||0), ex=rb.x+rb.w/2;
  const sy=below?ra.y+ra.h:ra.y, ey=below?rb.y:rb.y+rb.h;
  const cy=(sy+ey)/2;
  return{d:`M ${sx} ${sy} V ${cy} H ${ex} V ${ey}`,lx:(sx+ex)/2,ly:cy,kind};
}
function chainSvg(){
  return CHAIN.slice(0,-1).map((id,i)=>{
    const g=chainGeom(id,CHAIN[i+1]);
    return`<path class="chain-halo" d="${g.d}"></path><path class="chain-link" d="${g.d}" marker-end="url(#chainarrow)"></path>`;
  }).join('');
}
function chainChips(){
  return CHAIN.slice(0,-1).map((id,i)=>{
    const to=CHAIN[i+1],g=chainGeom(id,to),cap=CAPS[id+'>'+to]||'';
    if(g.kind==='v'){ // full caption beside the vertical drop
      return`<div class="chain-cap chain-cap-side" style="left:${g.lx+22}px;top:${g.ly}px"><div class="chain-cap-route">${id} &#8594; ${to}</div><div class="chain-cap-text">${esc(cap)}</div></div>`;
    }
    // tight gutters: compact pill on the line, caption on hover
    return`<div class="chain-pill" style="left:${g.lx}px;top:${g.ly}px" title="${esc(cap)}">${id} &#8594; ${to}</div>`;
  }).join('');
}
function cardRect(secId,idx){
  const p=rect(secId),cols=APP.colsMap[secId],L=APP.layout;
  const col=idx%cols,row=Math.floor(idx/cols);
  return{x:p.x+L.padX+col*(L.cardW+L.colGap),y:p.y+L.headH+L.padTop+row*(L.cardH+L.rowGap),w:L.cardW,h:L.cardH};
}
function nodeFlowSvg(){
  let out='';
  APP.phases.forEach(ph=>{
    const cols=APP.colsMap[ph.id];
    for(let i=0;i<ph.nodes.length-1;i++){
      const a=cardRect(ph.id,i),b=cardRect(ph.id,i+1);
      let d;
      if(Math.floor(i/cols)===Math.floor((i+1)/cols)){
        d=`M ${a.x+a.w} ${a.y+a.h/2} L ${b.x} ${b.y+b.h/2}`;
      }else{
        const my=a.y+a.h+((APP.layout.rowGap)/2);
        d=`M ${a.x+a.w/2} ${a.y+a.h} V ${my} H ${b.x+b.w/2} V ${b.y}`;
      }
      out+=`<path class="node-flow" d="${d}" marker-end="url(#flowarrow)"></path>`;
    }
  });
  return out;
}
// ===== cards =====

function standardNode(n){
  return`<a class="node" href="${nodeHref(n[0])}" data-code="${esc(n[0])}" data-title="${esc(n[1])}" data-desc="${esc(n[2])}" aria-label="Open ${esc(n[0])} ${esc(n[1])}"><div class="node-top"><div class="node-code">${esc(n[0])}</div></div><div class="node-title">${esc(n[1])}</div><div class="node-desc">${esc(n[2])}</div><div class="node-open">OPEN ANALYSIS &#8594;</div></a>`;
}
function sector(ph){
  const p=rect(ph.id),fam=FAM[ph.id]||'silicon';
  const isOV=ph.id==='OV';
  const folio=isOV?'OV':ph.id;
  const kick=isOV?'SYSTEM OVERLAY':(FAM_LABEL[fam]||'');
  const cols=APP.colsMap[ph.id];
  return`<section class="sector fam-${fam}${isOV?' overlay-sector':''}" data-sector="${ph.id}" style="left:${p.x}px;top:${p.y}px;width:${p.w}px;height:${p.h}px">
<div class="sector-band" role="button" tabindex="0" title="Zoom to sector ${folio}"><div class="sector-folio">${folio}</div><div class="sector-band-main"><div class="sector-kicker">${kick}</div><div class="sector-title">${esc(ph.title)}</div></div><div class="sector-count">${ph.nodes.length} NODES</div></div>
<div class="sector-accent"></div>
<div class="sector-body"><div class="node-grid" style="--cols:${cols}">${ph.nodes.map(standardNode).join('')}</div></div></section>`;
}
// ===== shell =====
function render(){
  document.getElementById('app').innerHTML=`<header class="app-header"><div class="brand"><div class="brand-name">Kuberpath</div><div class="brand-rule"></div></div><div class="product-name">Roseberg Terminal</div><div class="theme-switch" role="group" aria-label="Theme">${['light','dark','system'].map(m=>`<button type="button" class="theme-btn${(localStorage.getItem('rt-theme')||'light')===m?' active':''}" data-mode="${m}" onclick="__setTheme('${m}')" title="${m[0].toUpperCase()+m.slice(1)} theme">${m==='light'?'&#9728;':m==='dark'?'&#9789;':'&#9881;'}</button>`).join('')}</div></header><div class="shell"><aside class="sidebar"><div class="side-label">MAPS</div><div class="side-item side-active"><div class="side-code">AI</div><div class="side-name">AI Map</div></div><div class="side-attrib"><div class="sa-line">Research and analysis</div><div class="sa-name">Shiva Iyer</div><div class="sa-role">Independent Equity Research Analyst</div><div class="sa-rule"></div><div class="sa-note">NISM Series XV certified. Not registered with SEBI as a Research Analyst.</div><div class="sa-note">Data as of 23 July 2026. Primary sources only.</div><div class="sa-note sa-disc">Educational and informational purposes only. Not investment advice and not a recommendation to buy or sell any security. Company names appear as industry examples.</div><a class="sa-back" href="../index.html">&#8592; All maps</a></div></aside><main class="main"><div class="titlebar"><h1>AI Value Chain Map</h1></div><section class="viewport" id="viewport"><div class="world" id="world" style="width:${APP.world.w}px;height:${APP.world.h}px"><svg class="canvas-svg" viewBox="0 0 ${APP.world.w} ${APP.world.h}" aria-hidden="true"><defs><marker id="chainarrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="chain-arrowhead"></path></marker><marker id="flowarrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" class="flow-arrowhead"></path></marker></defs>${chainSvg()}${nodeFlowSvg()}</svg>${chainChips()}${APP.phases.map(sector).join('')}</div><div class="map-controls" role="group" aria-label="Map controls"><button type="button" class="ctrl-btn" id="ctrlFit" title="Fit entire map">FIT ALL</button><button type="button" class="ctrl-btn ctrl-sq" id="ctrlIn" title="Zoom in">+</button><button type="button" class="ctrl-btn ctrl-sq" id="ctrlOut" title="Zoom out">&#8722;</button></div><div class="corner-note">DRAG TO PAN &#183; SCROLL TO ZOOM &#183; SELECT A SECTOR BAND TO ZOOM &#183; SELECT A NODE FOR ITS FULL ANALYSIS</div><div id="tooltip" class="tooltip"></div></section></main></div>`;
  initTooltip();initPanZoom();initNodeLinks();highlightFromQuery();
}
function initTooltip(){
  const tooltip=document.getElementById('tooltip');const viewport=document.getElementById('viewport');
  viewport.querySelectorAll('.node').forEach(el=>{
    el.addEventListener('mouseenter',()=>{tooltip.innerHTML=`<div class="tooltip-code">${esc(el.dataset.code)}</div><div class="tooltip-title">${esc(el.dataset.title)}</div><div class="tooltip-text">${esc(el.dataset.desc)}</div>`;tooltip.classList.add('show');});
    el.addEventListener('mousemove',e=>{const vp=viewport.getBoundingClientRect(),tt=tooltip.getBoundingClientRect();let left=e.clientX-vp.left+16,top=e.clientY-vp.top+16;if(left+tt.width>vp.width-8)left=e.clientX-vp.left-tt.width-16;if(top+tt.height>vp.height-8)top=e.clientY-vp.top-tt.height-16;tooltip.style.left=left+'px';tooltip.style.top=top+'px';});
    el.addEventListener('mouseleave',()=>tooltip.classList.remove('show'));
  });
}
let __zoomApi=null;
function initPanZoom(){
  const viewport=document.getElementById('viewport');const world=document.getElementById('world');
  let scale=.1,x=0,y=0,min=.16,max=1.6,dragging=false,sx=0,sy=0,ox=0,oy=0,anim=null;
  function bounds(){const r=viewport.getBoundingClientRect(),ww=APP.world.w*scale,wh=APP.world.h*scale;return{minX:ww>r.width?r.width-ww:(r.width-ww)/2,maxX:ww>r.width?0:(r.width-ww)/2,minY:wh>r.height?r.height-wh:(r.height-wh)/2,maxY:wh>r.height?0:(r.height-wh)/2};}
  function clamp(){const b=bounds();x=Math.min(b.maxX,Math.max(b.minX,x));y=Math.min(b.maxY,Math.max(b.minY,y));}
  function apply(){clamp();world.style.transform=`translate(${x}px,${y}px) scale(${scale})`;}
  function fitAll(){const r=viewport.getBoundingClientRect(),fit=Math.min((r.width-24)/APP.world.w,(r.height-24)/APP.world.h);scale=Math.max(min,Math.min(max,fit));x=(r.width-APP.world.w*scale)/2;y=(r.height-APP.world.h*scale)/2;apply();}
  function zoom(f,cx,cy){const r=viewport.getBoundingClientRect(),px=cx!==undefined?cx-r.left:r.width/2,py=cy!==undefined?cy-r.top:r.height/2,wx=(px-x)/scale,wy=(py-y)/scale,ns=Math.max(min,Math.min(max,scale*f));x=px-wx*ns;y=py-wy*ns;scale=ns;apply();}
  function animateTo(ts,tx,ty){if(anim)cancelAnimationFrame(anim);const s0=scale,x0=x,y0=y,t0=performance.now(),dur=420;function step(t){let k=Math.min(1,(t-t0)/dur);k=1-Math.pow(1-k,3);scale=s0+(ts-s0)*k;x=x0+(tx-x0)*k;y=y0+(ty-y0)*k;apply();if(k<1)anim=requestAnimationFrame(step);}anim=requestAnimationFrame(step);}
  function zoomToSector(id){const p=APP.positions[id];if(!p)return;const r=viewport.getBoundingClientRect();const pad=70;const ts=Math.max(min,Math.min(max,Math.min((r.width-pad)/p.w,(r.height-pad)/p.h)));const tx=(r.width-p.w*ts)/2-p.x*ts;const ty=(r.height-p.h*ts)/2-p.y*ts;animateTo(ts,tx,ty);}
  viewport.addEventListener('pointerdown',e=>{if(e.target.closest('.node,.sector-band,.map-controls'))return;dragging=true;sx=e.clientX;sy=e.clientY;ox=x;oy=y;viewport.classList.add('dragging');viewport.setPointerCapture(e.pointerId);});
  viewport.addEventListener('pointermove',e=>{if(!dragging)return;x=ox+(e.clientX-sx);y=oy+(e.clientY-sy);apply();});
  viewport.addEventListener('pointerup',e=>{dragging=false;viewport.classList.remove('dragging');try{viewport.releasePointerCapture(e.pointerId)}catch(_){}});
  viewport.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.12:.89,e.clientX,e.clientY);},{passive:false});
  document.getElementById('ctrlFit').addEventListener('click',fitAll);
  document.getElementById('ctrlIn').addEventListener('click',()=>zoom(1.25));
  document.getElementById('ctrlOut').addEventListener('click',()=>zoom(.8));
  document.querySelectorAll('.sector-band').forEach(b=>{b.addEventListener('click',()=>zoomToSector(b.closest('.sector').dataset.sector));b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();zoomToSector(b.closest('.sector').dataset.sector);}});});
  window.addEventListener('resize',fitAll);fitAll();
  __zoomApi={zoomToSector,fitAll};
}
function initNodeLinks(){document.querySelectorAll('.node').forEach(el=>{el.addEventListener('pointerdown',e=>e.stopPropagation());el.addEventListener('click',e=>e.stopPropagation());});}
function highlightFromQuery(){const code=new URLSearchParams(location.search).get('node');if(!code)return;const el=[...document.querySelectorAll('.node')].find(x=>x.dataset.code===code);if(el){el.classList.add('selected-node');const sec=el.closest('.sector');if(sec&&__zoomApi)setTimeout(()=>__zoomApi.zoomToSector(sec.dataset.sector),150);}}
document.addEventListener('DOMContentLoaded',render);
