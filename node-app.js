
const APP = window.ROSEBERG_DETAIL_APP;
function esc(s){return String(s??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function srcLookup(id){return APP.sources[id]||APP.sources[String(id||'').toLowerCase()];}
function sourceLink(id){const s=srcLookup(id);return s?`<a href="${s.url}" target="_blank" rel="noopener">[${s.id}]</a>`:`[${esc(id)}]`;}
function sourceCards(ids){const rows=(ids||[]).map(id=>{const s=srcLookup(id);if(!s)return '';return `<a class="source-card" href="${s.url}" target="_blank" rel="noopener"><div class="source-id">${s.id}</div><div><div class="source-title">${esc(s.title)}</div><div class="source-note">${esc(s.note)}</div></div><div class="source-domain">${esc(s.domain)} ↗</div></a>`;}).join('');const count=(ids||[]).length;return `<details class="collapse-panel sources-collapse"><summary><span><span class="collapse-kicker">EVIDENCE LIBRARY</span><strong>Sources and evidence</strong></span><span class="collapse-meta">${count} ${count===1?'SOURCE':'SOURCES'} <span class="collapse-chevron">⌄</span></span></summary><div class="collapse-body"><p class="collapse-intro">Open the evidence library to review the official publications, company disclosures and external market references used in this node.</p><div class="source-list">${rows}</div></div></details>`;}
function cards(rows){return (rows||[]).map(([h,p])=>`<article class="card"><h3>${h}</h3><p>${p}</p></article>`).join('');}
function listCard(title,items,cls=''){return `<article class="card ${cls}"><h3>${title}</h3><ul>${(items||[]).map(i=>`<li>${i}</li>`).join('')}</ul></article>`;}
function rowList(rows){return `<div class="list-rows">${(rows||[]).map(([a,b])=>`<div class="list-row"><div class="row-label">${a}</div><div class="row-text">${b}</div></div>`).join('')}</div>`;}
function table(headers,rows,cls=''){return `<div class="table-wrap ${cls}"><table class="data-table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function nodeColor(){return '#176fae';}function mapHref(code){const page=window.ROSEBERG_MAP_PAGE||'index.html';return page+(code?'?node='+encodeURIComponent(code):'');}function selfNodeHref(code){const page=window.ROSEBERG_SELF_PAGE||'node.html';return page+'?id='+encodeURIComponent(code);}
function header(){return `<header class="terminal-header"><div class="brand"><span class="brand-name">Kuberpath</span><span class="brand-rule"></span></div><div class="product"><span class="product-name">Roseberg AI Map</span><span class="product-context">Industrial Intelligence</span></div><div class="theme-switch" role="group" aria-label="Theme">${['light','dark','system'].map(m=>`<button type="button" class="theme-btn${(localStorage.getItem('rt-theme')||'light')===m?' active':''}" data-mode="${m}" onclick="__setTheme('${m}')" title="${m[0].toUpperCase()+m.slice(1)} theme">${m==='light'?'&#9728;':m==='dark'?'&#9789;':'&#9881;'}</button>`).join('')}</div><a class="map-back-link" href="${mapHref()}">← AI VALUE CHAIN MAP</a></header>`;}
function heroFacts(code,d){const facts={
 '01.01':[
 ['Upstream raw material and process consumables','SUPPLY-CHAIN POSITION','Feeds silicon smelting through metallurgical quartz and supports specialised fused-quartz products through a separate High-Purity Quartz route.'],
 ['Indirect but foundational','ARTIFICIAL INTELLIGENCE LINKAGE','The node supports semiconductor materials and process equipment several stages before advanced chips are fabricated.'],
 ['High-Purity Quartz bottleneck: 4.5 / 5','STRUCTURAL BOTTLENECK','Premium economics depend on deposit quality, purification, repeatability and customer qualification rather than simple mine volume.'],
 ['Spruce Pine, North Carolina, United States','KEY PREMIUM GEOGRAPHY','The reviewed company evidence identifies this district as the clearest concentration point for premium High-Purity Quartz supply.']
 ],
 '01.02':[
 ['Primary thermal and chemical conversion','SUPPLY-CHAIN POSITION','Transforms quartz and carbon reductants into metallurgical-grade silicon before any later purification into electronic-grade material.'],
 ['Indirect and multi-market','ARTIFICIAL INTELLIGENCE LINKAGE','Only part of silicon-metal output ultimately enters solar or semiconductor purification chains; major volumes also serve aluminium and chemicals.'],
 ['Approximately 11-13 megawatt-hours per tonne','ELECTRICITY INTENSITY','Power cost and furnace efficiency strongly influence regional competitiveness, utilisation and operating margins.'],
 ['China: almost 80% of global silicon materials','GLOBAL SUPPLY CONCENTRATION','China-led supply materially influences world pricing, trade policy and the economics of Western furnaces.']
 ],
 '02.01':[
 ['Semiconductor wafer-start manufacturing','SUPPLY-CHAIN POSITION','Converts electronic-grade silicon into a controlled monocrystalline ingot before slicing, polishing and final wafer qualification.'],
 ['Direct enabling input','ARTIFICIAL INTELLIGENCE LINKAGE','Advanced processors, accelerators and memory systems require qualified wafers whose quality begins at crystal growth.'],
 ['Very high','QUALIFICATION INTENSITY','Customer approval depends on stable defectivity, crystal properties, diameter control, process yield and long operating history.'],
 ['300-millimetre prime wafers','STRATEGIC PRODUCT FOCUS','Large-diameter wafers are central to high-volume advanced logic and memory production, including Artificial Intelligence-related demand.']
 ]
};return (facts[code]||d.heroFacts||[[d.directness||'Industrial input','NODE ROLE',''],[d.phaseTitle||'Value chain','INDUSTRIAL LAYER',''],['Global','GEOGRAPHY',''],['Structural','MARKET CHARACTER','']]).map(([v,l,n])=>`<div class="hero-metric"><div class="hero-value">${v}</div><div class="hero-label">${l}</div><div class="hero-note">${n}</div></div>`).join('');}
function executiveInterpretation(d){return `<div class="executive-interpretation"><div class="interpretation-label">EXECUTIVE INTERPRETATION</div><p>${d.executiveNarrative||''}</p></div>`;}
function block1(d){const scoreHtml=(d.scores||[]).map(([label,score,value])=>`<div class="score-row"><div class="score-label">${label}</div><div class="score-track"><div class="score-fill" style="width:${score}%"></div></div><div class="score-value">${value}</div></div>`).join('');const evidence=(d.evidence||[]).map(([value,text,source])=>`<article class="evidence-card"><div class="evidence-value">${value}</div><div class="evidence-text">${text}</div><div class="evidence-source">${sourceLink(source)}</div></article>`).join('');return `<section id="section-snapshot" class="block"><div class="block-header"><div><div class="block-index">EXECUTIVE VIEW</div><div class="block-title">Investor Snapshot</div></div><div class="block-status">${d.phaseTitle}</div></div><div class="callout market-definition">${d.scopeNote}</div>${executiveInterpretation(d)}<div class="section"><h2 class="section-title">Node identity and relevance</h2><div class="grid2">${cards(d.basics)}${listCard('Global leaders and operators',d.operators?.global||[])}${listCard('India exposure',d.operators?.india||[])}</div></div><div class="section"><h2 class="section-title">Structural characteristics</h2><article class="card"><div class="score-list">${scoreHtml}</div></article></div><div class="section"><h2 class="section-title">Current evidence</h2><div class="evidence-grid">${evidence}</div></div><div class="section"><h2 class="section-title">Positive and adverse indicators</h2><div class="grid2">${listCard('Positive indicators',d.green||[],'flag-positive')}${listCard('Adverse indicators',d.red||[],'flag-negative')}</div></div><div class="section"><h2 class="section-title">Government policy and geopolitics</h2>${rowList(d.policies||[])}</div><div class="section"><h2 class="section-title">Operating indicators</h2><div class="grid2">${(d.kpis||[]).map(([n,w])=>`<article class="card"><h3>${n}</h3><p>${w}</p></article>`).join('')}</div></div></section>`;}
function marketMetricNotes(code,d){return ({
 '01.01':['External estimate for the specialised High-Purity Quartz market, not the much broader metallurgical-quartz market.','External growth estimate; actual realised growth depends on solar, semiconductor and fused-quartz demand.','Premium supply is concentrated because deposit quality, purification capability and customer qualification are difficult to replicate.'],
 '01.02':['External estimates for the global silicon-metal market across aluminium, chemicals, solar and semiconductor routes.','External growth estimate for the broad silicon-metal market rather than Artificial Intelligence demand alone.','China-led production capacity and pricing discipline shape global trade flows and regional furnace economics.'],
 '02.01':['External estimate for the broader semiconductor silicon-wafer market in which crystal growth is an embedded manufacturing stage.','External market-growth estimate; realised demand remains linked to logic, memory, power and industrial semiconductor cycles.','A small group of established wafer producers retains significant process know-how, customer qualification and large-diameter capability.']
})[code]||(d&&d.metricNotes)||['No standalone market value is asserted where the process is embedded inside broader markets.','Growth is described structurally and should be validated against current capacity, utilisation and customer evidence.','Concentration depends on qualification, scale, intellectual property, customer switching costs and regional capacity.'];}
function transmissionSection(d){const t=d.marketTransmission||{};const flow=(t.primaryFlow||[]).map((step,i)=>`<div class="flow-step"><div class="flow-index">${String(i+1).padStart(2,'0')}</div><div class="flow-text">${step}</div></div>${i<(t.primaryFlow||[]).length-1?'<div class="flow-arrow">→</div>':''}`).join('');const rows=(t.rows||[]).map(r=>[r.trigger,r.direct,r.downstream,r.financial,r.indicators,r.timing,`<span class="direction-label">${r.direction}</span>`]);return `<div class="section transmission-section"><div class="section-heading-row"><div><div class="section-kicker">EVENT-TO-MARKET FRAMEWORK</div><h2 class="section-title">Market Transmission</h2></div><div class="section-tag">OPERATIONS → FINANCIALS → INDICATORS</div></div><div class="callout transmission-intro">${t.intro||''}</div><div class="transmission-flow">${flow}</div>${table(['TRIGGER','DIRECT OPERATING EFFECT','DOWNSTREAM EXPOSURE','FINANCIAL TRANSMISSION','MARKET INDICATORS','EXPECTED TIMING','DIRECTION OF PRESSURE'],rows,'transmission-table')}</div>`;}
function industryEffectSection(d){const e=d.industryEffect||{};return `<div class="section industry-effect-section"><div class="section-heading-row"><div><div class="section-kicker">PLAIN-LANGUAGE INTERPRETATION</div><h2 class="section-title">How This Affects the Industry</h2></div><div class="section-tag">POSITIVE · NEGATIVE · MIXED</div></div><div class="callout industry-intro">${e.intro||''}</div><div class="effect-grid">${(e.scenarios||[]).map(s=>`<article class="effect-card effect-${s.tone}"><div class="effect-top"><span class="effect-label">${s.label}</span><span class="effect-badge">${s.tone.toUpperCase()}</span></div><h3>${s.headline}</h3><p>${s.body}</p></article>`).join('')}</div><div class="industry-note">${e.note||''}</div></div>`;}
function leadershipGradient(segments){let cursor=0;const stops=[];(segments||[]).forEach(s=>{const start=cursor;cursor+=Number(s.value||0);stops.push(`${s.color} ${start}% ${cursor}%`);});return `conic-gradient(${stops.join(',')})`;}
function quantifiedSection(d){const q=d.quantified;if(!q||!q.metrics)return '';
return `<div class="section qb-section" id="quantified"><div class="qb-head"><div><div class="section-kicker">QUANTIFIED BASELINE</div><h2 class="section-title">Key figures</h2></div><span class="qb-asof">PUBLIC REPORTING · AS OF ${q.asOf.toUpperCase()}</span></div><div class="qb-grid">${q.metrics.map(m=>`<div class="qb-stat"><strong class="qb-val">${esc(m[1])}</strong><span class="qb-label">${esc(m[0])}</span><span class="qb-basis">${esc(m[2])}</span></div>`).join('')}</div></div>`;}
function chokepointSection(d){const c=d.chokepoint;if(!c||c.length<4)return '';
const m=d.chokeMeta||{};const sev=m.sev||0;
const sevLabel=['','LOW','MODERATE','ELEVATED','SEVERE','CRITICAL'][sev]||'';
const sub=(m.subM&&m.subM[1])?(m.subM[0]<1?'<1':m.subM[0])+'-'+m.subM[1]+' months':'';
const D=window.ROSEBERG_DETAIL_APP.nodes;
const chips=(m.affects||[]).map(a=>{const t=D[a]?(D[a].shortTitle||D[a].title):'';return `<a class="chk-chip" href="node.html?id=${a}" title="${esc(t)}">${a}</a>`;}).join('');
const prec=m.precedent?`<div class="chk-precedent"><span class="chk-prec-label">DEMONSTRATED PRECEDENT</span><p>${esc(m.precedent)}</p></div>`:'';
return `<div class="section chk-section" id="chokepoint" style="--sev:${sev}"><div class="chk-head"><div><div class="section-kicker">CHOKEPOINT ASSESSMENT</div><h2 class="section-title">Critical dependency and failure propagation</h2></div><div class="chk-sev chk-sev-${sev}"><span class="chk-sev-num">${sev}<em>/5</em></span><span class="chk-sev-word">${sevLabel}</span></div></div><div class="chk-stats"><div class="chk-stat"><span class="chk-stat-label">SINGLE POINT OF FAILURE</span><strong>${esc(c[0])}</strong></div>${sub?`<div class="chk-stat"><span class="chk-stat-label">SUBSTITUTION WINDOW</span><strong>${sub}</strong></div>`:''}<div class="chk-stat"><span class="chk-stat-label">DIRECT PROPAGATION</span><strong>${(m.affects||[]).length} node${(m.affects||[]).length===1?'':'s'}</strong></div></div><div class="grid2"><article class="card chk-card"><h3>Why it binds</h3><p>${c[1]}</p></article><article class="card chk-card"><h3>Substitution reality</h3><p>${c[2]}</p><p><strong>Propagation impact:</strong> ${c[3]}</p></article></div>${prec}${chips?`<div class="chk-affects"><span class="chk-prec-label">DIRECTLY AFFECTED NODES</span><div class="chk-chiprow">${chips}</div></div>`:''}<div class="chk-simrow"><button type="button" class="chk-sim-link" onclick="__openSimBoard('${d.code}')">SIMULATE FAILURE →</button></div></div>`;}
function leadershipSection(d){const m=d.marketLeadership;if(!m){const q=d.leadershipQualitative;if(!q)return '';return `<div class="section leadership-section"><div class="section-heading-row"><div><div class="section-kicker">MARKET LEADERSHIP</div><h2 class="section-title">Market structure and concentration</h2></div><div class="section-tag">QUALITATIVE ASSESSMENT</div></div><div class="callout leadership-basis">${q}</div><div class="industry-note leadership-note">No share donut is presented for this node because reliable, comparable market-share data is not publicly available; concentration is assessed qualitatively pending further research.</div></div>`;}const rows=(m.rows||[]).map(r=>[r[0],r[1],r[2],r[3],r[4],String(r[5]||'').split(', ').filter(Boolean).map(sourceLink).join(' ')]);const legend=(m.segments||[]).map(s=>`<div class="leader-legend-row"><span class="leader-swatch" style="background:${s.color}"></span><span class="leader-name">${s.name}</span><span class="leader-share">${s.display}</span></div>`).join('');return `<div class="section leadership-section"><div class="section-heading-row"><div><div class="section-kicker">${m.eyebrow}</div><h2 class="section-title">${m.title}</h2></div><div class="section-tag">SHARE BASIS · LISTING · MARKET-CAP TREATMENT</div></div><div class="callout leadership-basis"><strong>Measurement basis:</strong> ${m.basis}<br><strong>Reference date:</strong> ${m.asOf}</div><div class="leadership-grid"><div class="leadership-chart-card"><div class="donut-wrap"><div class="donut" style="background:${leadershipGradient(m.segments)}"><div class="donut-center"><span>${m.centerTop}</span><strong>${m.centerValue}</strong><small>${m.centerBottom}</small></div></div></div><div class="leader-legend">${legend}</div></div><div class="leadership-table-wrap">${table(['LEADER / GROUP','SHARE','SHARE BASIS','LISTING / OWNERSHIP','MARKET-CAP TREATMENT','EVIDENCE'],rows,'leadership-table')}</div></div><div class="industry-note leadership-note">${m.note}</div></div>`;}

function block2(d){const i=d.institutional||{};const companyRows=(d.companies||[]).map(r=>[r[0],r[1],r[2],r[3],r[4],String(r[5]||'').split(', ').filter(Boolean).map(sourceLink).join(' ')]);const historyRows=(i.history||[]).map(([a,b,c])=>[a,b,sourceLink(c)]);const mn=marketMetricNotes(d.code,d);return `<section id="section-analysis" class="block"><div class="block-header"><div><div class="block-index">INDUSTRY ANALYSIS</div><div class="block-title">Institutional Analysis</div></div><div class="block-status">MARKET · OPERATIONS · POLICY</div></div><div class="section"><h2 class="section-title">Industrial mechanics and transformation</h2><div class="grid2">${cards([['Plain-language mechanics',d.overview?.analogy||''],['Industrial transformation',d.overview?.transformation||''],['Industry economics',d.overview?.economics||''],['Dependencies and downstream links',d.overview?.dependencies||'']])}</div></div><div class="section"><h2 class="section-title">Market size, growth and demand outlook</h2><div class="grid3"><article class="metric-card" style="--metric:var(--blue)"><div class="metric-value">${d.marketIntelligence.marketSize}</div><div class="metric-label">GLOBAL MARKET REFERENCE</div><div class="metric-note">${d.marketIntelligence.marketYear}</div><div class="metric-explanation">${mn[0]}</div></article><article class="metric-card" style="--metric:var(--green)"><div class="metric-value">${d.marketIntelligence.growth}</div><div class="metric-label">GROWTH REFERENCE</div><div class="metric-note">${d.marketIntelligence.growthPeriod}</div><div class="metric-explanation">${mn[1]}</div></article><article class="metric-card" style="--metric:var(--amber)"><div class="metric-value">${d.marketIntelligence.concentration}</div><div class="metric-label">COMPETITIVE STRUCTURE</div><div class="metric-note">Node-level assessment</div><div class="metric-explanation">${mn[2]}</div></article></div><div class="callout" style="margin-top:14px"><strong>Market-measure boundary:</strong> ${d.marketIntelligence.marketBoundary}</div><div class="grid2" style="margin-top:14px">${listCard('Demand outlook',i.demandOutlook||[])}${listCard('Recent developments',d.marketIntelligence.recent||[])}</div></div>${transmissionSection(d)}${industryEffectSection(d)}${quantifiedSection(d)}${leadershipSection(d)}${chokepointSection(d)}<div class="section"><h2 class="section-title">Market leaders and competitive position</h2>${table(['ENTITY / REGION','DISCLOSED POSITION','RESEARCH INTERPRETATION'],i.marketShare||[])}</div><div class="section"><h2 class="section-title">Headquarters, facilities, listing and operating footprint</h2>${table(['ENTITY','STATUS / TICKER','HEADQUARTERS','FACILITIES / OPERATIONS','CAPACITY / EXPOSURE'],i.footprint||[])}</div><div class="section"><h2 class="section-title">Capacity, utilisation and expansion pipeline</h2>${table(['ASSET / METRIC','CAPACITY / SCALE','STATUS / UTILISATION','ANALYTICAL COMMENT'],i.capacity||[])}</div><div class="section"><h2 class="section-title">Suppliers, inputs, customers and buyers</h2><div class="grid2">${listCard('Upstream suppliers and inputs',i.supplyDemand?.suppliers||[])}${listCard('Downstream customers and buyers',i.supplyDemand?.customers||[])}</div></div><div class="section"><h2 class="section-title">Trade flows, logistics routes and regional economics</h2>${rowList(i.tradeRoutes||[])}<div style="height:12px"></div>${rowList(i.regionalEconomics||[])}</div><div class="section"><h2 class="section-title">Country concentration and supply security</h2>${listCard('Supply-security assessment',i.supplySecurity||[])}</div><div class="section"><h2 class="section-title">Company exposure quality</h2>${table(['ENTITY','STATUS','NODE RELATIONSHIP','EVIDENCE QUALITY','RESEARCH NOTE','SOURCES'],companyRows)}</div><div class="section"><h2 class="section-title">Scenario analysis</h2>${table(['SCENARIO','CONDITIONS','NODE CONSEQUENCE'],i.scenarios||[])}</div><div class="section"><h2 class="section-title">Valuation and credit transmission</h2>${listCard('Neutral analytical implications',i.valuationCredit||[])}</div><div class="section"><h2 class="section-title">Conditions and invalidation</h2><div class="grid2">${listCard('Conditions supporting strategic relevance',i.conditions?.supporting||[],'flag-positive')}${listCard('Evidence that weakens the analytical case',i.conditions?.weakening||[],'flag-negative')}</div></div><div class="section"><h2 class="section-title">Evidence history</h2>${table(['DATE','DEVELOPMENT','SOURCE'],historyRows)}</div><div class="section"><h2 class="section-title">Strengths, weaknesses, opportunities and threats</h2><div class="grid4 swot-grid">${listCard('Strengths',d.swot?.strengths||[],'swot-card swot-strength')}${listCard('Weaknesses',d.swot?.weaknesses||[],'swot-card swot-weakness')}${listCard('Opportunities',d.swot?.opportunities||[],'swot-card swot-opportunity')}${listCard('Threats',d.swot?.threats||[],'swot-card swot-threat')}</div></div><div class="section compact-section">${sourceCards(d.sources||[])}</div><div class="footer-note">Roseberg AI Map presents neutral industrial, market and company-exposure analysis. Structural scores and directional labels describe operating conditions by value-chain position and are not security ratings, price targets or investment recommendations.</div></section>`;}
function block3(d){const next=d.nextSteps?.[0];if(!next)return '';const canOpen=Boolean(APP.nodes[next.code]);return `<section id="section-next" class="block"><div class="block-header"><div><div class="block-index">PROCESS CONTINUATION</div><div class="block-title">Next Step in the Value Chain</div></div><div class="block-status">${next.code}</div></div><div class="callout">The value chain continues into the following operating stage. The relationship shown here is sequential and does not imply that every unit of output follows the same downstream route.</div><div class="next-grid section"><article class="next-card ${canOpen?'has-link':'no-link'}" ${canOpen?`data-node="${next.code}"`:''}><div class="next-path">${next.path}</div><div class="next-code">${next.code}</div><div class="next-title">${next.title}</div><div class="next-why">${next.why}</div></article></div></section>`;}
function glossary(d){const count=(d.glossary||[]).length;return `<details class="glossary-panel collapse-panel"><summary><span><span class="collapse-kicker">TERMINOLOGY REFERENCE</span><strong>Full forms and technical terms</strong></span><span class="collapse-meta">${count} ${count===1?'TERM':'TERMS'} <span class="collapse-chevron">⌄</span></span></summary><div class="collapse-body"><p class="collapse-intro">Technical abbreviations are expanded when first introduced. Open this reference for recurring abbreviations and specialised process terms used across the analysis.</p><div class="glossary-grid">${(d.glossary||[]).map(([term,meaning])=>`<div class="glossary-item"><div class="glossary-term">${term}</div><div class="glossary-meaning">${meaning}</div></div>`).join('')}</div></div></details>`;}

// ===== Relations index (cross-sector edges + same-sector sequential chain) =====
function relationsIndex(){
 if(window.__RELIDX)return window.__RELIDX;
 const idx={};const add=(c)=>{idx[c]=idx[c]||{affects:[],affectedBy:[]};return idx[c];};
 (window.ROSEBERG_RELATIONS||[]).forEach(([a,b,why])=>{if(!APP.nodes[a]||!APP.nodes[b])return;add(a).affects.push({code:b,why});add(b).affectedBy.push({code:a,why});});
 Object.values(APP.nodes).forEach(n=>{const nx=n.nextSteps&&n.nextSteps[0];if(nx&&nx.code&&APP.nodes[nx.code]&&sectorOf(n.code)===sectorOf(nx.code)){add(n.code).affects.push({code:nx.code,why:'Next sequential stage inside this sector'});add(nx.code).affectedBy.push({code:n.code,why:'Previous sequential stage inside this sector'});}});
 window.__RELIDX=idx;return idx;
}
function sectorOf(code){return code.split('.')[0];}
function sectorOrder(){return ['OV','01','02','03','04','05','06','07','08','09','10','11','12','13','14'];}
function sectorTitle(id){const n=Object.values(APP.nodes).find(x=>sectorOf(x.code)===id);return n?(n.phaseTitle||id):id;}
const ECO_ACCENTS={OV:'#6550a6','01':'#2a7e53','02':'#6550a6','03':'#1a5f8f','04':'#9b6a07','05':'#1d7c8e','06':'#1a5f8f','07':'#2a7e53','08':'#1a5f8f','09':'#1a5f8f','10':'#6550a6','11':'#1d7c8e','12':'#1a5f8f','13':'#2a7e53','14':'#b34a55'};
// ===== Ecosystem replica map =====
function ecoLayout(d){
 const idx=relationsIndex();const rel=idx[d.code]||{affects:[],affectedBy:[]};
 const affects=new Map(rel.affects.map(e=>[e.code,e]));
 const affectedBy=new Map(rel.affectedBy.map(e=>[e.code,e]));
 const related=new Set([...affects.keys(),...affectedBy.keys()]);related.add(d.code);
 const bySector={};[...related].forEach(c=>{const s=sectorOf(c);(bySector[s]=bySector[s]||[]).push(c);});
 Object.values(bySector).forEach(a=>a.sort());
 const sectors=sectorOrder().filter(s=>bySector[s]);
 const L={cardW:264,cardH:196,colGap:18,rowGap:26,padX:18,padTop:14,headH:78,padBottom:18,gapX:250,gapY:220,maxRowW:2700};
 const boxes=sectors.map(s=>{
 const n=bySector[s].length;
 const cols=n<=2?n:n<=6?2:3;
 const rows=Math.ceil(n/cols);
 const w=L.padX*2+cols*L.cardW+(cols-1)*L.colGap;
 const h=L.padTop+L.headH+rows*L.cardH+(rows-1)*L.rowGap+L.padBottom;
 return{id:s,codes:bySector[s],cols,rows,w,h};
 });
 // shelf packing
 let x=40,y=40,rowH=0,worldW=0;
 boxes.forEach(b=>{
 if(x>40&&x+b.w>L.maxRowW){x=40;y+=rowH+L.gapY;rowH=0;}
 b.x=x;b.y=y;x+=b.w+L.gapX;rowH=Math.max(rowH,b.h);worldW=Math.max(worldW,b.x+b.w);
 });
 const worldH=y+rowH+40;
 // absolute node rects
 const nodeRect={};
 boxes.forEach(b=>{
 b.codes.forEach((c,i)=>{
 const col=i%b.cols,row=Math.floor(i/b.cols);
 nodeRect[c]={x:b.x+L.padX+col*(L.cardW+L.colGap),y:b.y+L.padTop+L.headH+row*(L.cardH+L.rowGap),w:L.cardW,h:L.cardH};
 });
 });
 // edges touching current node
 const edges=[];
 affects.forEach((e,c)=>edges.push({from:d.code,to:c,why:e.why}));
 affectedBy.forEach((e,c)=>edges.push({from:c,to:d.code,why:e.why}));
 return{boxes,nodeRect,edges,worldW:worldW+40,worldH,affects,affectedBy,related};
}
function ecoRoute(a,b){
 const ac={x:a.x+a.w/2,y:a.y+a.h/2},bc={x:b.x+b.w/2,y:b.y+b.h/2};
 const dx=bc.x-ac.x,dy=bc.y-ac.y;let sx,sy,ex,ey,d,lx,ly;
 if(Math.abs(dx)>=Math.abs(dy)){
 sx=dx>0?a.x+a.w:a.x;sy=ac.y;ex=dx>0?b.x:b.x+b.w;ey=bc.y;
 const mx=(sx+ex)/2;d=`M ${sx} ${sy} H ${mx} V ${ey} H ${ex}`;lx=mx;ly=(sy+ey)/2;
 }else{
 sx=ac.x;sy=dy>0?a.y+a.h:a.y;ex=bc.x;ey=dy>0?b.y:b.y+b.h;
 const my=(sy+ey)/2;d=`M ${sx} ${sy} V ${my} H ${ex} V ${ey}`;lx=(sx+ex)/2;ly=my;
 }
 return{d,lx,ly};
}
function ecoNodeCard(code,current,rect){
 const n=APP.nodes[code];const short=Object.values(window.ROSEBERG_DETAIL_APP.nodes).length?n:null;
 const title=n.shortTitle||n.title;const desc=n.subtitle||'';
 const cls=code===current?'node selected-node eco-current':'node';
 return `<a class="${cls}" href="${selfNodeHref(code)}" data-node="${code}" style="position:absolute;left:${rect.x}px;top:${rect.y}px" title="${esc(n.title)}"><div class="node-top"><div class="node-code">${esc(code)}</div></div><div class="node-title">${esc(title)}</div><div class="node-desc">${esc(desc)}</div><div class="node-open">OPEN ANALYSIS &#8594;</div></a>`;
}
function ecosystemMapSection(d){
 const lay=ecoLayout(d);
 const FAMS=window.SECTOR_FAMILY||{};const FAM_LABEL={materials:'MATERIALS & EQUIPMENT',silicon:'SILICON',infra:'INFRASTRUCTURE',software:'SOFTWARE & MODELS',economy:'REAL ECONOMY',overlay:'SYSTEM OVERLAY'};
 const sectorsHtml=lay.boxes.map(b=>{const fam=FAMS[b.id]||'silicon';return `<section class="sector fam-${fam} eco-sector-box ${b.id===sectorOf(d.code)?'eco-home':''}${b.id==='OV'?' overlay-sector':''}" style="left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px"><div class="sector-band"><div class="sector-folio">${b.id}</div><div class="sector-band-main"><div class="sector-kicker">${b.id==='OV'?'SYSTEM OVERLAY':(FAM_LABEL[fam]||'')}</div><div class="sector-title">${esc(sectorTitle(b.id))}</div></div><div class="sector-count">${b.codes.length} ${b.codes.length===1?'NODE':'NODES'}</div></div><div class="sector-accent"></div></section>`;}).join('');
 const nodesHtml=Object.entries(lay.nodeRect).map(([c,r])=>ecoNodeCard(c,d.code,r)).join('');
 const showLabels=lay.edges.length<=8;
 const linesHtml=lay.edges.map(e=>{
 const r=ecoRoute(lay.nodeRect[e.from],lay.nodeRect[e.to]);
 return `<path class="link-halo" d="${r.d}"></path><path class="link ${e.from===d.code?'main':'support'}" d="${r.d}" marker-end="url(#ecoarrow)"></path>`;
 }).join('');
 const labelsHtml=showLabels?lay.edges.map(e=>{
 const r=ecoRoute(lay.nodeRect[e.from],lay.nodeRect[e.to]);
 return `<div class="link-label" style="left:${r.lx-60}px;top:${r.ly-16}px">${esc(e.why.length>42?e.why.slice(0,40)+'…':e.why)}</div>`;
 }).join(''):'';
 return `<section id="section-ecosystem-map" class="block map-block"><div class="block-header"><div><div class="block-index">NODE MAPS</div><div class="block-title">Ecosystem Context Map</div></div><div class="block-status">${lay.related.size-1} RELATED NODES</div></div>
 <div class="callout">This view isolates the sectors and nodes with a documented relationship to ${esc(d.title)}. Outbound dependencies are drawn in solid weight; inbound flows in lighter weight. Each node links to its full institutional analysis.</div>
 <div class="section"><div class="eco-viewport" id="eco-viewport"><div class="eco-world" id="eco-world" style="width:${lay.worldW}px;height:${lay.worldH}px"><svg class="canvas-svg" viewBox="0 0 ${lay.worldW} ${lay.worldH}" aria-hidden="true"><defs><marker id="ecoarrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto"><path d="M0 0L10 5L0 10z" fill="#3d586b"></path></marker></defs>${linesHtml}</svg>${labelsHtml}${sectorsHtml}${nodesHtml}</div><div class="corner-note">DRAG TO PAN · SCROLL TO ZOOM · SELECT A NODE TO OPEN ITS ANALYSIS</div></div></div></section>`;
}
function initEcoPanZoom(root){
 const viewport=root.querySelector('#eco-viewport');const world=root.querySelector('#eco-world');if(!viewport||!world)return;
 const W=parseFloat(world.style.width),H=parseFloat(world.style.height);
 let scale=.5,x=0,y=0,min=.2,max=1.6,dragging=false,sx=0,sy=0,ox=0,oy=0;
 function apply(){world.style.transform=`translate(${x}px,${y}px) scale(${scale})`;}
 function fit(){const r=viewport.getBoundingClientRect();if(!r.width)return;const f=Math.min((r.width-16)/W,(r.height-16)/H);scale=Math.max(min,Math.min(max,f));x=(r.width-W*scale)/2;y=(r.height-H*scale)/2;apply();}
 function zoom(f,cx,cy){const r=viewport.getBoundingClientRect(),px=cx-r.left,py=cy-r.top,wx=(px-x)/scale,wy=(py-y)/scale,ns=Math.max(min,Math.min(max,scale*f));x=px-wx*ns;y=py-wy*ns;scale=ns;apply();}
 viewport.addEventListener('pointerdown',e=>{if(e.target.closest('.node'))return;dragging=true;sx=e.clientX;sy=e.clientY;ox=x;oy=y;viewport.classList.add('dragging');viewport.setPointerCapture(e.pointerId);});
 viewport.addEventListener('pointermove',e=>{if(!dragging)return;x=ox+(e.clientX-sx);y=oy+(e.clientY-sy);apply();});
 viewport.addEventListener('pointerup',e=>{dragging=false;viewport.classList.remove('dragging');try{viewport.releasePointerCapture(e.pointerId)}catch(_){}});
 viewport.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.12:.89,e.clientX,e.clientY);},{passive:false});
 fit();requestAnimationFrame(fit);
}
// ===== Supply-chain placeholder (all nodes) =====
function supplyChainSection(d){
 return `<section id="section-supply-map" class="block map-block"><div class="block-header"><div><div class="block-index">NODE MAPS</div><div class="block-title">Node Supply-Chain Map</div></div><div class="block-status">COMING SOON</div></div><div class="section"><div class="map-placeholder" style="--node-color:${nodeColor()}"><div class="map-placeholder-inner coming-soon-only"><div class="map-placeholder-kicker">NODE-SPECIFIC PROCESS VIEW</div><h3>Coming Soon</h3></div></div></div></section>`;
}
// ===== Tabs, TOC, render =====
function currentTab(){const t=new URLSearchParams(location.search).get('tab');return t==='map'?'map':'info';}
function selfNodeHrefTab(code,tab){return selfNodeHref(code)+(tab==='map'?'&tab=map':'');}
function tocFor(tab){
 if(tab==='map'){
 return `<div class="toc-label">MAPS</div><button type="button" class="toc-link active" data-scroll-target="section-ecosystem-map"><strong>ECOSYSTEM CONTEXT</strong>Documented cross-node relationships</button><button type="button" class="toc-link" data-scroll-target="section-supply-map"><strong>NODE SUPPLY CHAIN</strong>Internal process structure</button>`;
 }
 return `<div class="toc-label">INFORMATION</div><button type="button" class="toc-link active" data-scroll-target="section-snapshot"><strong>INVESTOR SNAPSHOT</strong>Strategic context and current evidence</button><button type="button" class="toc-link" data-scroll-target="section-analysis"><strong>INSTITUTIONAL ANALYSIS</strong>Market, transmission, industry effects and policy</button><button type="button" class="toc-link" data-scroll-target="section-next"><strong>PROCESS CONTINUATION</strong>Next value-chain stage</button>`;
}
function tabBar(tab){
 return `<div class="node-tabs" role="tablist"><button type="button" role="tab" class="node-tab ${tab==='info'?'active':''}" data-tab="info"><span class="node-tab-kicker">ANALYSIS</span>Information</button><button type="button" role="tab" class="node-tab ${tab==='map'?'active':''}" data-tab="map"><span class="node-tab-kicker">RELATIONSHIPS</span>Map</button></div>`;
}
function renderNode(code,tab){
 tab=tab||currentTab();
 const d=APP.nodes[code]||APP.nodes[Object.keys(APP.nodes)[0]];const color=nodeColor();const root=document.getElementById('app');
 const options=Object.values(APP.nodes).map(n=>`<option value="${n.code}" ${n.code===d.code?'selected':''}>${n.code} · ${esc(n.title)}</option>`).join('');
 const main=tab==='map'
 ?`${ecosystemMapSection(d)}${supplyChainSection(d)}`
 :`${block1(d)}${block2(d)}${block3(d)}${glossary(d)}`;
 root.innerHTML=`${header()}<main class="page"><div class="hero-nav"><a class="map-back-link" href="${mapHref(d.code)}">← RETURN TO MAP · ${d.code}</a><select class="node-selector" id="node-selector" aria-label="Select node">${options}</select></div><section class="hero" style="--node-color:${color}"><div class="hero-main"><div class="hero-code">${d.phase}</div><h1>${d.title}</h1><p class="hero-subtitle">${d.subtitle}</p><div class="hero-asof">DATA AS OF 23 JUL 2026 · COMPILED FROM PUBLIC REPORTING</div><div class="baseline-note"><strong>Evidence discipline:</strong> quantitative claims are included only where the cited sources support a comparable node-level measure. Where disclosure is inconsistent, the page states that directly rather than inventing precision.</div></div><div class="hero-side">${heroFacts(d.code,d)}</div></section>${tabBar(tab)}<div class="detail-layout" style="--node-color:${color}"><nav class="toc">${tocFor(tab)}</nav><main class="detail-main">${main}</main></div></main>`;
 const nav=(next,nextTab)=>{history.replaceState(null,'',selfNodeHrefTab(next,nextTab||tab));renderNode(next,nextTab||tab);window.scrollTo(0,0);};
 root.querySelector('#node-selector')?.addEventListener('change',e=>nav(e.target.value));
 root.querySelectorAll('.next-card.has-link[data-node]').forEach(b=>b.addEventListener('click',()=>nav(b.dataset.node)));
 root.querySelectorAll('a[data-node]').forEach(a=>{a.addEventListener('pointerdown',e=>e.stopPropagation());a.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();nav(a.dataset.node);});});
 root.querySelectorAll('.node-tab').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.tab!==tab){history.replaceState(null,'',selfNodeHrefTab(d.code,b.dataset.tab));renderNode(d.code,b.dataset.tab);window.scrollTo(0,0);}}));
 if(tab==='map')initEcoPanZoom(root);
 bindToc(root);
}

function bindToc(root){const buttons=[...root.querySelectorAll('.toc-link[data-scroll-target]')];const sections=[...root.querySelectorAll('.block')];const setActive=id=>buttons.forEach(btn=>btn.classList.toggle('active',btn.dataset.scrollTarget===id));buttons.forEach(btn=>btn.addEventListener('click',()=>{const target=root.querySelector('#'+btn.dataset.scrollTarget);if(target){setActive(btn.dataset.scrollTarget);target.scrollIntoView({behavior:'smooth',block:'start'});}}));let scheduled=false;const update=()=>{scheduled=false;let current=sections[0];sections.forEach(s=>{if(s.getBoundingClientRect().top<=112)current=s;});if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-24)current=sections[sections.length-1];setActive(current.id);};const onScroll=()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(update);};window.addEventListener('scroll',onScroll,{passive:true});update();}
function boot(){const q=new URLSearchParams(location.search);const code=q.get('id')||Object.keys(APP.nodes)[0];renderNode(code,q.get('tab')==='map'?'map':'info');}window.addEventListener('popstate',boot);document.addEventListener('DOMContentLoaded',boot);

// back-to-top
(function(){var b=document.createElement('button');b.id='backTop';b.type='button';b.setAttribute('aria-label','Back to top');b.innerHTML='<svg viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3.5 9.5 8 5l4.5 4.5\"/><path d=\"M8 5v8\" opacity=\"0\"/></svg>';b.onclick=function(){window.scrollTo({top:0,behavior:'smooth'});};document.body.appendChild(b);var t;window.addEventListener('scroll',function(){if(t)return;t=requestAnimationFrame(function(){t=null;b.classList.toggle('show',window.scrollY>420);});},{passive:true});})();

/* ===== FAILURE SIMULATION BOARD (overlay) ===== */
(function(){
const SHORT={OV:'Demand & Capital','01':'Materials & Refining','02':'Semi Equipment & Fab','03':'Silicon & Foundry','04':'Memory & Packaging','05':'Servers & Networking','06':'DC Real Estate','07':'Power & Water','08':'Connectivity & Security','09':'Cloud & Colocation','10':'AI Software Infra','11':'Models & Governance','12':'Horizontal Apps','13':'AI Industries','14':'Pressured Task Pools'};
function adjacency(){
 const E=(window.ROSEBERG_RELATIONS||[]).slice();
 const D=window.ROSEBERG_DETAIL_APP.nodes;
 const by={};Object.keys(D).forEach(c=>{const s=c.split('.')[0];(by[s]=by[s]||[]).push(c);});
 Object.values(by).forEach(a=>{a.sort();for(let i=0;i<a.length-1;i++)E.push([a[i],a[i+1]]);});
 const adj={};E.forEach(e=>{(adj[e[0]]=adj[e[0]]||new Set()).add(e[1]);});
 return adj;
}
window.__openSimBoard=function(code){
 const D=window.ROSEBERG_DETAIL_APP.nodes;
 const origin=D[code];if(!origin)return;
 const adj=adjacency();
 const tier={};tier[code]=0;let frontier=[code];
 for(let t=1;t<=3&&frontier.length;t++){
 const next=[];
 frontier.forEach(c=>{(adj[c]?[...adj[c]]:[]).forEach(n2=>{if(!(n2 in tier)){tier[n2]=t;next.push(n2);}});});
 frontier=next;
 }
 const counts=[0,0,0,0];Object.values(tier).forEach(t=>counts[t]++);
 const sev=(origin.chokeMeta&&origin.chokeMeta.sev)||0;
 const sevLabel=['','LOW','MODERATE','ELEVATED','SEVERE','CRITICAL'][sev]||'';
 const phases=(window.ROSEBERG_GRID_MAP&&window.ROSEBERG_GRID_MAP.phases)||[];
 const order=phases.length?phases.map(p=>p.id):['OV','01','02','03','04','05','06','07','08','09','10','11','12','13','14'];
 const bySec={};Object.keys(D).forEach(c=>{const s=c.split('.')[0];(bySec[s]=bySec[s]||[]).push(c);});
 Object.values(bySec).forEach(a=>a.sort());
 const cols=order.map(sec=>{
 const chips=(bySec[sec]||[]).map(c=>{
 const t=(c in tier)?('simb-t'+tier[c]):'simb-dim';
 const nm=D[c].shortTitle||D[c].title||'';
 const badge=(c in tier)?`<span class="simb-badge">${tier[c]}</span>`:'';
 return `<a class="simb-chip ${t}" href="node.html?id=${c}" title="${nm.replace(/"/g,'&quot;')}">${badge}<span class="simb-code">${c}</span><span class="simb-name">${nm}</span><span class="simb-open">↗</span></a>`;
 }).join('');
 const secAffected=(bySec[sec]||[]).filter(c=>c in tier).length;
 return `<div class="simb-col${secAffected?'':' simb-col-clear'}"><div class="simb-colhead"><strong>${sec}</strong><span>${SHORT[sec]||''}</span></div>${chips}</div>`;
 }).join('');
 const el=document.createElement('div');
 el.id='simBoard';
 el.innerHTML=`<div class="simb-shell"><div class="simb-head"><div class="simb-title"><span class="simb-kicker">FAILURE SIMULATION</span><strong>${code} \u00b7 ${(origin.shortTitle||origin.title||'')}</strong><span class="simb-counts">DIRECT ${counts[1]} \u00b7 SECOND-ORDER ${counts[2]} \u00b7 THIRD-ORDER ${counts[3]} \u00b7 UNAFFECTED ${Object.keys(D).length-counts[0]-counts[1]-counts[2]-counts[3]}</span></div><div class="simb-sev simb-sev-${sev}"><span>${sev}<em>/5</em></span><span class="simb-sevword">${sevLabel}</span></div><div class="simb-actions"><button type="button" id="simbBack">\u2190 BACK TO NODE</button><a href="${typeof mapHref==='function'?mapHref(code):'index.html'}" id="simbMap">OPEN MAIN MAP</a></div></div><div class="simb-legend"><span class="simb-lg simb-lg0">0 · ORIGIN FAILURE</span><span class="simb-lg simb-lg1">1 · FIRST-ORDER</span><span class="simb-lg simb-lg2">2 · SECOND-ORDER</span><span class="simb-lg simb-lg3">3 · THIRD-ORDER</span><span class="simb-lg simb-lgd">UNAFFECTED</span><span class="simb-hint">SELECT ANY NODE TO OPEN ITS ANALYSIS</span></div><div class="simb-board">${cols}</div></div>`;
 document.body.appendChild(el);
 document.body.style.overflow='hidden';
 const close=()=>{el.remove();document.body.style.overflow='';document.removeEventListener('keydown',esc);};
 const esc=e=>{if(e.key==='Escape')close();};
 document.getElementById('simbBack').onclick=close;
 el.addEventListener('click',e=>{if(e.target===el)close();});
 document.addEventListener('keydown',esc);
};
})();
