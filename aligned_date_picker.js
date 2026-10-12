/* Date panel aligned to its field; original date input remains the data source. */
(()=>{
 document.querySelectorAll('input[type="date"]').forEach(input=>{
  const root=document.createElement('div');root.className='compact-date-control';input.before(root);root.append(input);input.hidden=true;
  const trigger=document.createElement('button');trigger.type='button';trigger.className='compact-place-value';trigger.setAttribute('aria-label','选择'+(input.id.toLowerCase().includes('transit')?'行运日期':'出生日期'));trigger.setAttribute('aria-expanded','false');root.append(trigger);
  const popup=document.createElement('div');popup.className='compact-place-popup compact-date-popup';popup.hidden=true;root.append(popup);
  let year,month;const head=document.createElement('div');head.className='date-panel-head';
  const prev=document.createElement('button'),next=document.createElement('button'),yearBox=document.createElement('input'),monthBox=document.createElement('select');prev.type=next.type='button';prev.textContent='‹';next.textContent='›';prev.setAttribute('aria-label','上个月');next.setAttribute('aria-label','下个月');yearBox.type='number';yearBox.min='1';yearBox.max='9999';yearBox.setAttribute('aria-label','年份');monthBox.setAttribute('aria-label','月份');for(let n=1;n<=12;n++)monthBox.append(new Option(n+'月',n));head.append(prev,yearBox,monthBox,next);popup.append(head);
  const grid=document.createElement('div');grid.className='date-panel-grid';popup.append(grid);
  const foot=document.createElement('div');foot.className='date-panel-foot';popup.append(foot);
  const today=document.createElement('button'),clear=document.createElement('button');today.type=clear.type='button';today.textContent='今天';clear.textContent='清除';foot.append(clear,today);
  const pad=n=>String(n).padStart(2,'0');
  function refresh(){trigger.textContent=(input.value||'选择日期').replaceAll('-',' / ')+' ▾';}
  function close(){popup.hidden=true;trigger.setAttribute('aria-expanded','false');}
  function choose(value){input.value=value;input.dispatchEvent(new Event('input',{bubbles:true}));input.dispatchEvent(new Event('change',{bubbles:true}));refresh();close();}
  function render(){yearBox.value=year;monthBox.value=month+1;grid.replaceChildren();for(const text of ['一','二','三','四','五','六','日']){const label=document.createElement('span');label.textContent=text;grid.append(label);}const offset=(new Date(year,month,1).getDay()+6)%7,days=new Date(year,month+1,0).getDate();for(let i=0;i<offset;i++)grid.append(document.createElement('span'));for(let day=1;day<=days;day++){const button=document.createElement('button');button.type='button';button.textContent=day;const value=String(year).padStart(4,'0')+'-'+pad(month+1)+'-'+pad(day);button.setAttribute('aria-label',value);button.setAttribute('aria-pressed',String(value===input.value));button.onclick=()=>choose(value);grid.append(button);}}
  function shift(delta){const date=new Date(year,month+delta,1);year=date.getFullYear();month=date.getMonth();render();}
  prev.onclick=()=>shift(-1);next.onclick=()=>shift(1);yearBox.onchange=()=>{year=Math.max(1,Math.min(9999,Number(yearBox.value)||2000));render();};monthBox.onchange=()=>{month=Number(monthBox.value)-1;render();};
  today.onclick=()=>{const d=new Date();choose(d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()));};clear.onclick=()=>choose('');
  trigger.onclick=()=>{const parts=(input.value||'2000-01-01').split('-');year=Number(parts[0]);month=Number(parts[1])-1;render();popup.hidden=!popup.hidden;trigger.setAttribute('aria-expanded',String(!popup.hidden));};
  document.addEventListener('click',e=>{if(!root.contains(e.target))close();});root.addEventListener('keydown',e=>{if(e.key==='Escape'){close();trigger.focus();}});input.addEventListener('change',refresh);window.addEventListener('magiccat-place-restored',refresh);refresh();
 });
})();
