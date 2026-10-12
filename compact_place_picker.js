/* One-line place field with a sequential province/city/district wheel. */
(()=>{
 function setup(panel){
  if(panel.dataset.compact)return;panel.dataset.compact='true';
  const selects=[...panel.querySelectorAll('select')];if(selects.length!==3)return;
  const root=document.createElement('div');root.className='compact-place-control';panel.before(root);
  const row=document.createElement('div');row.className='compact-place-actions';root.append(row);
  const value=document.createElement('button');value.type='button';value.className='compact-place-value';value.setAttribute('aria-expanded','false');value.setAttribute('aria-label',selects[0].getAttribute('aria-label').replace(/省$/,'')+'选择省市区');row.append(value);
  const popup=document.createElement('div');popup.className='compact-place-popup';popup.hidden=true;root.append(popup);
  const tabs=document.createElement('div');tabs.className='compact-place-steps';popup.append(tabs);
  const tabButtons=['省','市','区'].map((text,index)=>{const button=document.createElement('button');button.type='button';button.textContent=text;button.onclick=()=>step(index);tabs.append(button);return button;});
  popup.append(panel);const done=document.createElement('button');done.type='button';done.className='compact-place-done';done.textContent='完成';done.onclick=close;popup.append(done);
  let active=0;
  function refresh(){const labels=selects.map(s=>s.selectedOptions[0]?.textContent||'').filter(t=>t&&!t.startsWith('请选择')&&!t.startsWith('全市'));value.textContent=labels.length?[...new Set(labels)].join(' · ')+' ▾':'选择省 / 市 / 区 ▾';}
  function step(index){active=index;selects.forEach((select,i)=>{select.hidden=i!==index;select.size=7;});tabButtons.forEach((button,i)=>{button.setAttribute('aria-pressed',String(i===index));button.disabled=i>0&&!selects[i-1].value;});}
  function close(){popup.hidden=true;value.setAttribute('aria-expanded','false');refresh();}
  value.onclick=()=>{popup.style.width=value.getBoundingClientRect().width+'px';popup.hidden=!popup.hidden;value.setAttribute('aria-expanded',String(!popup.hidden));if(!popup.hidden)step(0);};
  selects.forEach((select,i)=>select.addEventListener('change',()=>{refresh();if(i<2)step(i+1);else close();}));
  document.addEventListener('click',e=>{if(!root.contains(e.target))close();});root.addEventListener('keydown',e=>{if(e.key==='Escape'){close();value.focus();}});
  const manual=panel.closest('.residence-picker')?.querySelector('button.quiet-btn')||root.parentElement.querySelector('.china-place-manual');
  function syncMode(){value.hidden=panel.hidden;if(manual)manual.textContent=panel.hidden?'返回省市区选择':'自定义地点';const details=root.closest('.residence-picker')?.querySelector('.residence-coordinates')||root.parentElement.querySelector('.birth-location-details');if(details)details.hidden=!panel.hidden;}
  if(manual){row.append(manual);manual.addEventListener('click',()=>{close();syncMode();});}
  window.addEventListener('magiccat-place-restored',()=>{refresh();syncMode();});syncMode();
  refresh();
 }
 document.querySelectorAll('.china-place-regions').forEach(setup);
 function setupTimes(){document.querySelectorAll('input[type="time"]').forEach(input=>{
  if(input.dataset.compactTime)return;input.dataset.compactTime='true';
  const root=document.createElement('div');root.className='compact-time-control';input.before(root);root.append(input);input.hidden=true;
  const button=document.createElement('button');button.type='button';button.className='compact-place-value';button.setAttribute('aria-label',input.closest('.library-transit-form')?'选择行运时间':'选择出生时间');button.setAttribute('aria-expanded','false');root.append(button);
  const popup=document.createElement('div');popup.className='compact-place-popup compact-time-popup';popup.hidden=true;root.append(popup);
  const columns=document.createElement('div');columns.className='compact-time-columns';popup.append(columns);
  const parts=['时','分','秒'].map((name,i)=>{const select=document.createElement('select');select.size=7;select.setAttribute('aria-label',name);for(let n=0;n<(i===0?24:60);n++){const option=document.createElement('option');option.value=option.textContent=String(n).padStart(2,'0');select.append(option);}columns.append(select);select.onchange=()=>{input.value=parts.map(s=>s.value).join(':');input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));refresh();};return select;});
  function refresh(){const values=(input.value||'12:00:00').split(':');parts.forEach((s,i)=>s.value=values[i]||'00');button.textContent=parts.map(s=>s.value).join(' : ')+' ▾';}
  function close(){popup.hidden=true;button.setAttribute('aria-expanded','false');}
  button.onclick=()=>{refresh();popup.hidden=!popup.hidden;button.setAttribute('aria-expanded',String(!popup.hidden));};
  const done=document.createElement('button');done.type='button';done.className='compact-place-done';done.textContent='完成';done.onclick=close;popup.append(done);
  document.addEventListener('click',e=>{if(!root.contains(e.target))close();});root.addEventListener('keydown',e=>{if(e.key==='Escape'){close();button.focus();}});
  window.addEventListener('magiccat-place-restored',refresh);input.addEventListener('change',refresh);refresh();
 });}
 setupTimes();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupTimes);
})();
