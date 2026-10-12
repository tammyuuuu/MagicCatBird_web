import { Solar } from 'lunar-javascript';

export function splitDate(iso) { const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(iso); if(!m) throw new Error('请输入有效的公历日期'); const[,y,mo,d]=m; return {year:+y,month:+mo,day:+d,iso,digits:[...y,...mo,...d].map(Number)}; }
export const sumDigits=value=>String(Math.abs(Number(value))).split('').reduce((s,n)=>s+Number(n),0);
export function reduction(rawValue){const reductionChain=[Number(rawValue)];while(reductionChain.at(-1)>9)reductionChain.push(sumDigits(reductionChain.at(-1)));return{rawValue:Number(rawValue),reductionChain,root:reductionChain.at(-1),display:reductionChain.join('/')}}
export const concatenateRoots=(left,right)=>Number(`${left}${right}`);
export const dateForce=date=>reduction(date.digits.reduce((a,b)=>a+b,0));
export function talents(date){const counts=Array(10).fill(0);date.digits.forEach(d=>counts[d]++);return counts.flatMap((count,digit)=>count===2?[digit]:[])}
export function lessons(date,force){const source=new Set(date.digits);return[...new Set(force.reductionChain.flatMap(n=>String(n).split('').map(Number)))].filter(n=>!source.has(n))}
export const pairedReduction=(left,right)=>reduction(concatenateRoots(left,right));
export const cosmicDestiny=(yang,yin)=>pairedReduction(yang.root,yin.root);
export function habitCandidates(x,y){return[[x-1,y],[x,y-1],[x-1,y-1]].map(([left,right])=>{const boundaryCandidate=left===0||right===0;return{left,right,boundaryCandidate,visible:!boundaryCandidate,result:reduction(concatenateRoots(left,right))}})}
export const youthPersonality=(solar,lunar)=>pairedReduction(reduction(solar.day).root,reduction(lunar.day).root);
export function middlePersonality(solar,lunar){const side=d=>reduction(sumDigits(d.year)+sumDigits(d.month)).root;return pairedReduction(side(solar),side(lunar))}
export const latePersonality=(solar,lunar)=>pairedReduction(reduction(sumDigits(solar.year)).root,reduction(sumDigits(lunar.year)).root);
export function careerLove(personality){const raw=String(personality.rawValue).padStart(2,'0');return{career:Number(raw[0]),love:Number(raw[1])}}
export const fortune=(value,destinyRoot)=>reduction(value+destinyRoot);
export function fortunes(middle,late,destinyRoot){return{middleCareer:fortune(middle.career,destinyRoot),middleLove:fortune(middle.love,destinyRoot),lateCareer:fortune(late.career,destinyRoot),lateLove:fortune(late.love,destinyRoot)}}
export function solarToLunar(solar){const lunar=Solar.fromYmd(solar.year,solar.month,solar.day).getLunar(),year=lunar.getYear(),month=Math.abs(lunar.getMonth()),day=lunar.getDay();return{year,month,day,iso:`${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`,digits:[...String(year).padStart(4,'0'),...String(month).padStart(2,'0'),...String(day).padStart(2,'0')].map(Number),isLeapMonth:lunar.getMonth()<0}}
export function calculateCosmicNumerology(iso){const solar=splitDate(iso),lunar=solarToLunar(solar),yang=dateForce(solar),yin=dateForce(lunar),destiny=cosmicDestiny(yang,yin),personalities={youth:youthPersonality(solar,lunar),middle:middlePersonality(solar,lunar),late:latePersonality(solar,lunar)};const development={middle:careerLove(personalities.middle),late:careerLove(personalities.late)};return{solar,lunar,yang:{force:yang,talents:talents(solar),lessons:lessons(solar,yang),level:null,levelStatus:'unverified'},yin:{force:yin,talents:talents(lunar),lessons:lessons(lunar,yin),level:null,levelStatus:'unverified'},destiny,habits:habitCandidates(yang.root,yin.root),personalities,development,fortunes:fortunes(development.middle,development.late,destiny.root)}}
