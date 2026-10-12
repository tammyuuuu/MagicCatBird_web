import assert from 'node:assert/strict';
import {calculateWesternChart} from '../src/western/calculateWesternChart.js';
// Independent published worked example: RadixPro Alcabitius, Enschede 2016-11-02 21:17:30 UTC.
const input={date:'2016-11-02',time:'21:17:30',offset:'+00:00',latitude:52+13/60,longitude:6+54/60,system:'alcabitius',nodeType:'mean',astrologyMode:'classical'};
const chart=calculateWesternChart(input);
for(const [index,expected] of [[0,123.507983345667],[1,144.5296312372496],[2,166.780580354729],[9,9.62989868323],[10,50.2786344087299],[11,87.0875754927639]])assert.ok(Math.abs(chart.cusps[index]-expected)<0.01,`cusp ${index+1}: ${chart.cusps[index]}`);
assert.equal(chart.planets.length,9);
assert.ok(chart.aspects.every(a=>!['Uranus','Neptune','Pluto','NorthNode','SouthNode'].includes(a.a)&&!['Uranus','Neptune','Pluto','NorthNode','SouthNode'].includes(a.b)));
assert.equal(calculateWesternChart({...input,astrologyMode:'modern',system:'placidus'}).planets.length,12);
console.log('Alcabitius reference cusps and mode filtering passed.');
