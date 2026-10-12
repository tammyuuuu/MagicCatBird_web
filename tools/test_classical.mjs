import assert from 'node:assert/strict';
import {calculateWesternChart} from '../src/western/calculateWesternChart.js';
import {classicalConditions,classicalNarrative} from '../src/western/classicalNarrative.js';
const input={date:'2000-01-01',time:'12:00:00',offset:'+08:00',latitude:39.9,longitude:116.4,system:'alcabitius',nodeType:'mean',astrologyMode:'classical'};
const day=calculateWesternChart(input),night=calculateWesternChart({...input,time:'00:00:00'});
assert.equal(classicalConditions(day).day,true);assert.equal(classicalConditions(night).day,false);
const sample={...day,planets:day.planets.map(p=>({...p,longitude:({Sun:120,Moon:33,Mercury:165,Venus:359,Mars:280,Jupiter:95,Saturn:195})[p.name]??p.longitude}))};
const states=classicalConditions(sample).states;
assert.ok(states.Sun.dignities.includes('入庙'));assert.ok(states.Mercury.dignities.includes('入庙'));assert.ok(states.Mercury.dignities.includes('擢升'));
for(const n of ['Moon','Venus','Mars','Jupiter','Saturn'])assert.ok(states[n].dignities.includes('擢升'),n);
const solar=longitude=>classicalConditions({...day,planets:day.planets.map(p=>p.name==='Mercury'?{...p,longitude}:p.name==='Sun'?{...p,longitude:120}:p)}).states.Mercury.solar;
assert.equal(solar(120.1),'日心');assert.equal(solar(125),'灼伤');assert.equal(solar(130),'日光下');assert.equal(solar(145),null);
const fall={...sample,planets:sample.planets.map(p=>p.name==='Sun'?{...p,longitude:190}:p)};
assert.equal(classicalConditions(fall).states.Sun.fall,true);
const mutual={...sample,planets:sample.planets.map(p=>p.name==='Venus'?{...p,longitude:10}:p.name==='Mars'?{...p,longitude:40}:p),aspects:[{a:'Venus',b:'Mars',label:'六合',angle:60,orb:1}]};
assert.match(JSON.stringify(classicalNarrative(mutual)),/互容/);
for(const c of [day,night,sample,fall]){const cards=classicalNarrative(c);assert.equal(cards.length,13);assert.ok(!JSON.stringify(cards).includes('undefined'));assert.equal(new Set(cards.slice(1).map(p=>p.house)).size,12);}
console.log('Classical sect, dignities, solar conditions, mutual reception and twelve themes passed.');

const personal={...day,cusps:day.cusps.map((_,i)=>(330+i*30)%360),planets:day.planets.map(p=>p.name==='Jupiter'?{...p,longitude:15,house:2}:p.name==='Mars'?{...p,longitude:345,house:1}:p)};
const self=classicalNarrative(personal).find(c=>c.house===1);
assert.match(self.paragraphs[2],/主动尝试、争取机会/);
assert.match(self.paragraphs[2],/你自己的选择、行动和对外表现/);
assert.ok(!JSON.stringify(classicalNarrative(personal)).includes('本版三项尊贵'));
assert.ok(!JSON.stringify(classicalNarrative(personal)).includes('是否有资源、能否发挥作用'));
