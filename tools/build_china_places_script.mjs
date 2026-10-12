import fs from 'node:fs';
const rows=JSON.parse(fs.readFileSync('china_places.json','utf8'));
fs.writeFileSync('china_places.js','/* Generated from china_places.json; see china_places_README.md. */\nwindow.CHINA_BIRTHPLACES='+JSON.stringify(rows)+';\n');
