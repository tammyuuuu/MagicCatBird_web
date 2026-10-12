/* 三门首页 / 内页路由，保持原册页与制作交互。 */
(()=>{
 const themes=[['rouge','朱雀','#933d32'],['paper','白虎','#fffdf7'],['jade','玄武','#12273b'],['apricot','青龙','#729451']];
 let theme='rouge';try{theme=localStorage.getItem('magicbird_theme')||theme}catch(_){}if(!themes.some(t=>t[0]===theme))theme='rouge';document.documentElement.dataset.workshopTheme=theme;
 document.addEventListener('DOMContentLoaded',()=>{
  document.querySelector('.beam')?.remove();
  const palette=document.createElement('div');palette.className='tiangong-palette';palette.setAttribute('role','group');palette.setAttribute('aria-label','四象配色');palette.innerHTML=themes.map(([id,name,color])=>`<button type="button" data-workshop-theme="${id}" aria-label="${name}" style="background:${color}"></button>`).join('');document.body.append(palette);
  const home=document.createElement('section');home.className='tiangong-home';home.setAttribute('aria-label','三门阁藏首页');home.innerHTML='<header><p>天 工 阁</p><h1>三 门 阁 藏</h1><div>循典识材，近案试作。</div></header><div class="tiangong-entries"></div>';
  const entries=[['shushu','术数','八字排盘 · 识命观时'],['talisman','符箓','阅典识形 · 临摹习笔'],['books','典籍','翻卷阅典 · 查阅原文']];
  entries.forEach(([id,name,note],i)=>{const a=document.createElement('a');a.href='#'+id;a.className='tiangong-entry';a.innerHTML=`<span class="entry-index">${['壹','贰','叁'][i]}</span><strong>${name}</strong><span class="entry-note">${note}</span><span class="entry-open">入 阁 →</span>`;home.querySelector('.tiangong-entries').append(a);});document.body.append(home);
  const back=document.createElement('a');back.href='#home';back.className='tiangong-back';back.textContent='← 返回阁藏';document.body.append(back);
  const frame=document.querySelector('.shushu-stage iframe');
  function tintFrame(){frame?.contentWindow?.postMessage({type:'tiangong-theme',theme},'*');try{const doc=frame?.contentDocument;if(!doc?.documentElement)return;doc.documentElement.dataset.workshopTheme=theme;}catch(_){}}

  frame?.addEventListener('load',tintFrame);window.addEventListener('message',e=>{if(e.source===frame?.contentWindow&&e.data?.type==='tiangong-theme-ready')tintFrame()});
  function apply(id){theme=id;document.documentElement.dataset.workshopTheme=id;palette.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.workshopTheme===id)));tintFrame();try{localStorage.setItem('magicbird_theme',id)}catch(_){}}
  palette.addEventListener('click',e=>{const b=e.target.closest('button');if(b)apply(b.dataset.workshopTheme)});apply(theme);
  function route(){const id=location.hash.slice(1),entry=entries.find(e=>e[0]===id);document.body.dataset.workshopView=entry?id:'home';home.hidden=!!entry;back.hidden=!entry;if(entry){const button=document.querySelector(id==='shushu'?'[data-shushu-door]':`[data-cat="${id}"]`);button?.click();if(id!=='books'){document.body.classList.remove('laozi-reading','library-rail-collapsed');document.getElementById('makeBtn').style.removeProperty('display');}}else{document.getElementById('benchMask')?.classList.remove('open');}window.scrollTo(0,0);}
  document.getElementById('doors').addEventListener('click',e=>{const b=e.target.closest('.door');if(!b)return;const id=b.hasAttribute('data-shushu-door')?'shushu':b.dataset.cat;if(entries.some(a=>a[0]===id)&&location.hash!=='#'+id)location.hash=id;});
  window.addEventListener('hashchange',route);route();
 });
})();
