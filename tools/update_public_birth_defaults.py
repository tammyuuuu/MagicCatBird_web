from pathlib import Path
import json,re
b=next(x for x in json.loads(Path('china_places.json').read_text(encoding='utf-8')) if x['path']=='北京市')
for f in ['western_web.html','vedic_web.html']:
 s=Path(f).read_text(encoding='utf-8-sig')
 for old,new in [('1999-07-07','2000-01-01'),('06:30:00','12:00:00'),('黑龙江省 绥化市','北京市'),('Suihua, Heilongjiang, China','北京市')]:s=s.replace(old,new)
 s=re.sub(r'value="46\.637"','value="'+str(b['lat'])+'"',s)
 s=re.sub(r'value="126\.980?"','value="'+str(b['lng'])+'"',s)
 Path(f).write_text(s,encoding='utf-8')
p=Path('src/western/westernApp.js');s=p.read_text(encoding='utf-8-sig');s=re.sub(r"try\{const input=JSON.parse\(localStorage.getItem\('magiccat_western_input'\).*?catch\{\}","// Each visit starts from the public demonstration defaults in the form.",s);p.write_text(s,encoding='utf-8')
p=Path('tools/verify_western.py');s=p.read_text(encoding='utf-8-sig').replace("date='1999-07-07',time='06:30:00'","date='2000-01-01',time='12:00:00'").replace('latitude=46.637,longitude=126.98',f"latitude={b['lat']},longitude={b['lng']}");p.write_text(s,encoding='utf-8')
