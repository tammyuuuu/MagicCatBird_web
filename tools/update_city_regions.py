from pathlib import Path
p=Path('china_place_picker.js');s=p.read_text(encoding='utf-8-sig');start=s.index(' const browse=');end=s.index(' // Preserve existing',start)
s=s[:start]+''' const panel=document.createElement('div');panel.className='china-place-browser china-place-regions';
 const province=document.createElement('select'),city=document.createElement('select'),district=document.createElement('select');
 province.setAttribute('aria-label','省');city.setAttribute('aria-label','市');district.setAttribute('aria-label','区');
 province.append(new Option('请选择省份',''));for(const row of rows.filter(r=>r.level===0))province.append(new Option(row.path,row.id));
 panel.append(province,city,district);place.parentElement.insertBefore(panel,note);place.style.display='none';
 const descendants=(row,level)=>rows.filter(r=>r.level===level&&r.path.startsWith(row.path+' '));
 function fillDistrict(){district.replaceChildren(new Option('全市（市中心）',''));const row=rows.find(r=>r.id===city.value);if(row)for(const r of descendants(row,2))district.append(new Option(r.name,r.id));district.disabled=!row;}
 function fillCity(){city.replaceChildren(new Option('请选择城市',''));const row=rows.find(r=>r.id===province.value);if(row)for(const r of descendants(row,1))city.append(new Option(r.name,r.id));city.disabled=!row;fillDistrict();}
 function applyRegion(){const row=rows.find(r=>r.id===(district.value||city.value));if(!row){place.value='';latitude.value='';longitude.value='';place.setCustomValidity('请先选择城市。');return;}place.value=row.path;select();}
 province.onchange=()=>{fillCity();applyRegion();};city.onchange=()=>{fillDistrict();applyRegion();};district.onchange=applyRegion;
 const initial=rows.find(r=>r.level===0&&place.value.startsWith(r.path));if(initial)province.value=initial.id;fillCity();
 const initialCity=rows.find(r=>r.level===1&&place.value.startsWith(r.path));if(initialCity){city.value=initialCity.id;fillDistrict();const initialDistrict=rows.find(r=>r.level===2&&place.value===r.path);if(initialDistrict)district.value=initialDistrict.id;}else if(city.options.length===2){city.selectedIndex=1;fillDistrict();}
 manual.onclick=()=>{manualMode=!manualMode;place.setCustomValidity('');manual.textContent=manualMode?'返回省市区选择':'使用自定义坐标';panel.hidden=manualMode;place.style.display=manualMode?'':'none';if(manualMode){place.value='自定义地点';note.textContent='自定义模式：请填写地点名称和经纬度。';place.removeAttribute('list');}else{applyRegion();}};
''' +s[end:];p.write_text(s,encoding='utf-8')
for f in ['western_web.html','vedic_web.html']:
 p=Path(f);s=p.read_text(encoding='utf-8-sig').replace('m064','m064b');p.write_text(s,encoding='utf-8')
