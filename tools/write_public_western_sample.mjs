import fs from 'node:fs';
import {calculateWesternChart} from '../src/western/calculateWesternChart.js';
const b=JSON.parse(fs.readFileSync('china_places.json','utf8')).find(r=>r.path==='北京市');
const chart=calculateWesternChart({date:'2000-01-01',time:'12:00:00',place:'北京市',offset:'+08:00',latitude:b.lat,longitude:b.lng,system:'placidus',nodeType:'mean'});
fs.writeFileSync('项目管理/M-053-示例排盘.json',JSON.stringify(chart,null,2));
