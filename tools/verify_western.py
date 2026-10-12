"""Generate independent Swiss Ephemeris (Moshier fallback) verification fixtures."""
import sys,json,datetime,pathlib
sys.path.insert(0,str(pathlib.Path(__file__).parent/'.validation_python'))
import swisseph as swe
cases=[dict(date='2000-01-01',time='12:00:00',offset='+08:00',latitude=39.902775,longitude=116.401144,system='placidus'),dict(date='2000-01-01',time='12:00:00',offset='+00:00',latitude=51.4779,longitude=0,system='placidus'),dict(date='1990-06-15',time='14:20:00',offset='-04:00',latitude=40.7128,longitude=-74.006,system='placidus'),dict(date='1985-12-10',time='22:10:00',offset='+11:00',latitude=-33.8688,longitude=151.2093,system='placidus')]
for c in cases:
    dt=datetime.datetime.fromisoformat(c['date']+'T'+c['time']+c['offset']).astimezone(datetime.timezone.utc)
    jd=swe.julday(dt.year,dt.month,dt.day,dt.hour+dt.minute/60+dt.second/3600)
    cusps,angles=swe.houses(jd,c['latitude'],c['longitude'],b'P')
    c['reference']=dict(asc=angles[0],mc=angles[1],cusps=cusps,planets={name:swe.calc_ut(jd,index,swe.FLG_MOSEPH|swe.FLG_SPEED)[0][0] for index,name in enumerate(['Sun','Moon','Mercury','Venus','Mars','Jupiter','Saturn','Uranus','Neptune','Pluto'])})
target=pathlib.Path('tests/western/swiss-fixtures.json')
target.parent.mkdir(parents=True,exist_ok=True)
target.write_text(json.dumps(cases,indent=2),encoding='utf-8')
print('Wrote 4 independent Swiss Ephemeris fixtures.')
