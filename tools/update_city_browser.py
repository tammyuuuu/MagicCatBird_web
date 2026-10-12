from pathlib import Path
p=Path('china_place_picker.js');s=p.read_text(encoding='utf-8-sig')
s=s.replace(' // Preserve existing sample or restored coordinates;', ''' const browse=document.createElement('button');browse.type='button';browse.className='quiet-btn china-place-manual';browse.textContent='选择全国城市';
 const panel=document.createElement('div');panel.className='china-place-browser';panel.hidden=true;
 const province=document.createElement('select');province.setAttribute('aria-label','省份筛选');province.append(new Option('全国所有省市',''));
 for(const row of rows.filter(r=>r.level===0))province.append(new Option(row.path,row.path));
 const search=document.createElement('input');search.type='search';search.placeholder='搜索城市或区县';search.setAttribute('aria-label','搜索城市或区县');
 const choices=document.createElement('select');choices.size=7;choices.setAttribute('aria-label','全国城市列表');
 const count=document.createElement('small');count.className='china-place-note';panel.append(province,search,choices,count);place.parentElement.append(browse,panel);
 function renderChoices(){const query=search.value.trim();const matches=rows.filter(r=>(!province.value||r.path.startsWith(province.value))&&(!query||r.path.includes(query)));choices.replaceChildren(new Option('请选择出生城市或区县',''));for(const row of matches)choices.append(new Option(row.path,row.id));choices.value='';count.textContent=`共 ${matches.length} 个地点`;}
 browse.onclick=()=>{panel.hidden=!panel.hidden;if(!panel.hidden)renderChoices();};province.onchange=renderChoices;search.oninput=renderChoices;
 choices.onchange=()=>{const row=rows.find(r=>r.id===choices.value);if(!row)return;manualMode=false;manual.textContent='使用自定义坐标';place.setAttribute('list',list.id);place.value=row.path;select();panel.hidden=true;};
 // Preserve existing sample or restored coordinates;''')
p.write_text(s,encoding='utf-8')
for f in ['western_web.html','vedic_web.html']:
 p=Path(f);s=p.read_text(encoding='utf-8-sig').replace('china_place_picker.js?v=m058','china_place_picker.js?v=m064').replace('href="china_place_picker.css"','href="china_place_picker.css?v=m064"');p.write_text(s,encoding='utf-8')
