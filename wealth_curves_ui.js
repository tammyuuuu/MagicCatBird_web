(()=>{
 const colors=['var(--curve-income, #a690d1)','var(--curve-shared, #64a9ad)','var(--curve-pressure, #ce8c86)'];
 const money=n=>`${n<0?'−':''}¥${Math.round(Math.abs(n)).toLocaleString('zh-CN')}`;
 function graph(title,labels,series,amount=false){
  const values=series.flatMap(s=>s.values),lo=Math.min(0,...values),hi=Math.max(1,...values),x=i=>75+i*850/Math.max(1,labels.length-1),y=v=>280-(v-lo)*235/(hi-lo);
  let svg=`<svg viewBox="0 0 960 340" role="img" aria-label="${title}"><title>${title}</title>`;
  for(let i=0;i<=4;i++){const value=lo+(hi-lo)*i/4;svg+=`<path d="M75 ${y(value)}H925" stroke="var(--line)"/><text x="65" y="${y(value)+4}" text-anchor="end" fill="var(--muted)" font-size="12">${amount?money(value):Math.round(value)}</text>`;}
  if(lo<0)svg+=`<path d="M75 ${y(0)}H925" stroke="var(--body)" stroke-dasharray="4 4"/>`;
  labels.forEach((label,i)=>{if(i===0||i===labels.length-1||i%Math.max(1,Math.round(labels.length/10))===0)svg+=`<text x="${x(i)}" y="310" text-anchor="middle" fill="var(--muted)" font-size="12">${label}</text>`;});
  series.forEach((s,k)=>{svg+=`<polyline points="${s.values.map((v,i)=>`${x(i)},${y(v)}`).join(' ')}" fill="none" stroke="${colors[k]}" stroke-width="2.5"/>`;s.values.forEach((v,i)=>svg+=`<circle cx="${x(i)}" cy="${y(v)}" r="3" fill="${colors[k]}"><title>${labels[i]} · ${s.name}：${amount?money(v):v.toFixed(1)}</title></circle>`);});
  return svg+'</svg><div class="curve-legend">'+series.map((s,i)=>`<span style="color:${colors[i]}">● ${s.name}</span>`).join('')+'</div>';
 }
 function init(){
  if(document.body.dataset.librarySystem!=='western')return;
  const host=document.querySelector('.library-transit-form')?.closest('section');if(!host)return;
  const astro=document.createElement('section');astro.className='western-reading wealth-curves';astro.innerHTML='<h2>十年行运 · 生活主题曲线</h2><p class="note">看什么时候更值得留意工作收入、共同财务或额外责任。曲线高代表相关配置更集中，不代表钱更多；压力高也不等于负债。三条线需要一起看。</p><form class="finance-scan-form"><label>从哪一天开始<input type="date" required></label><button type="submit" class="quiet-btn">生成十年主题曲线</button></form><p role="status" class="note"></p><div class="curve-result"></div>';
  host.append(astro);const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());astro.querySelector('input').value=today;
  astro.querySelector('form').onsubmit=async e=>{e.preventDefault();const button=astro.querySelector('button'),status=astro.querySelector('[role=status]'),output=astro.querySelector('.curve-result');button.disabled=true;output.replaceChildren();try{
   const api=window.magiccatAstrology,input=window.magiccatTransitInput?window.magiccatTransitInput():api.getInput(),result=await api.scanFinanceWindows(input,astro.querySelector('input').value,{years:10,onProgress:p=>status.textContent=`本地计算 ${p}%`});
   if(JSON.stringify(window.magiccatTransitInput?window.magiccatTransitInput():api.getInput())!==JSON.stringify(input))throw new Error('本命档案已切换，请重新生成曲线。');status.textContent=`本命 ${input.date} ${input.time} · ${input.place}；${result.start} 至 ${result.end}。主题活跃度0—100为本次扫描内的相对值，不是概率或金额。`;
   output.innerHTML=graph('十年行运主题活跃度',result.monthly.map(r=>r.month),[['income','工作与收入'],['shared','与别人共同的钱'],['pressure','压力与调整']].map(([key,name])=>({name,values:result.monthly.map(r=>r[key])})))+'<p class="note">按每日命中的不同相位及接近程度汇总为月均值，再将本次最高值设为100。同一配置可关联多个主题，不应把三条线相加。技术依据沿用财务窗口扫描规则。</p>';
   const label=document.createElement('label');label.textContent='选一个月份看白话说明';const select=document.createElement('select');result.monthly.forEach(r=>{const option=document.createElement('option');option.value=r.month;option.textContent=r.month;select.append(option);});label.append(select);const detail=document.createElement('div');detail.className='curve-month-detail';output.append(label,detail);
   select.onchange=()=>{const row=result.monthly.find(r=>r.month===select.value);const hits=result.windows.filter(w=>w.start.slice(0,7)<=row.month&&w.end.slice(0,7)>=row.month);detail.replaceChildren();const p=document.createElement('p');p.textContent=`${row.month}：工作与收入 ${row.income.toFixed(0)}，共同财务 ${row.shared.toFixed(0)}，压力与调整 ${row.pressure.toFixed(0)}。`;
    const text=document.createElement('p');text.textContent=hits.length?'这个月可以结合实际留意：'+[hits.some(w=>w.category==='income')?'工作机会、报酬沟通或长期职业安排':null,hits.some(w=>w.category==='shared')?'合作分账、家庭共同支出或共同责任':null,hits.some(w=>w.category==='pressure')?'额外成本、承诺变化或工作节奏调整':null].filter(Boolean).join('；')+'。这些是观察主题，不表示事情必然发生。':'这个月没有命中这组扫描规则，不能据此判断财运差。';const more=document.createElement('details');more.className='reading-more';const summary=document.createElement('summary');summary.textContent='展开本月配置依据';more.append(summary);for(const hit of hits){const line=document.createElement('p');line.textContent=`${hit.title}：${hit.start} 至 ${hit.end}`;more.append(line);}detail.append(p,text,more);};select.onchange();
  }catch(error){status.textContent=error.message;}finally{button.disabled=false;}};
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();


