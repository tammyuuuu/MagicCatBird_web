import csv,json
from pathlib import Path
from china_coordinate_conversion import gcj_to_wgs
csv.field_size_limit(20000000)
rows=list(csv.DictReader(open('tools/ok_geo.csv',encoding='utf-8-sig')))
result=[]
for r in rows:
 if int(r['id'])>=900000000 or r['ext_path'].startswith('国外'):continue
 xy=r['geo'].split()
 if len(xy)==2 and not r['ext_path'].startswith(('台湾','香港','澳门')): xy=gcj_to_wgs(float(xy[0]),float(xy[1]))
 result.append({'id':r['id'],'name':r['name'],'path':r['ext_path'],'level':int(r['deep']),'lng':float(xy[0]) if len(xy)==2 else None,'lat':float(xy[1]) if len(xy)==2 else None})
Path('china_places.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print(len(result),len([x for x in result if x['level']==0]))



# Fill Taiwan reference coordinates using GeoNames CC BY data; retain missing values rather than invent coordinates.
nodes=[]
for line in Path('tools/tw_geonames/TW_simplified.txt').read_text(encoding='utf-8-sig').splitlines():
 p=line.split('\t')
 if len(p)>18 and (p[6]=='P' or p[7] in ('ADM2','ADM3')): nodes.append(p)
def aliases(p): return set([p[1]]+p[3].replace('臺','台').split(','))
for r in result:
 if r['lat'] is not None:continue
 candidates=[p for p in nodes if r['name'] in aliases(p) or r['name'].rstrip('市县') in aliases(p)]
 if len(candidates)>1 and r['level']==2: continue
 if candidates:
  candidates.sort(key=lambda p:(p[7]!='ADM2' if r['level']==1 else p[7]!='ADM3',p[6]!='P'))
  p=candidates[0];r['lat']=float(p[4]);r['lng']=float(p[5]);r['coordinateSource']='GeoNames'
Path('china_places.json').write_text(json.dumps(result,ensure_ascii=False,separators=(',',':')),encoding='utf-8')
print('missing cities:',[r['path'] for r in result if r['level']==1 and r['lat'] is None])

