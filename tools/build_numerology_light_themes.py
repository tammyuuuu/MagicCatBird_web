from pathlib import Path
import re
html=Path('destiny_book_web.html').read_text(encoding='utf-8-sig')
styles='\n'.join(re.findall(r'<style[^>]*>(.*?)</style>',html,re.S))+Path('cosmic_numerology.css').read_text(encoding='utf-8-sig')
scope='body.numerology-page:is([data-theme="noir"],[data-theme="dopamine"]) '
rules=[]
for m in re.finditer(r'([^{}]+)\{([^{}]*)\}',styles):
 selectors,body=m.groups()
 selectors=selectors.strip()
 if selectors.startswith('@'):continue
 chosen=[s.strip() for s in selectors.split(',') if s.strip() not in ('*','html','body',':root') and not s.strip().startswith('body')]
 if not chosen:continue
 overrides={}
 for prop,value in re.findall(r'([\w-]+)\s*:\s*([^;]+)',body):
  if not re.search(r'#[0-9a-fA-F]|rgba?\(',value):continue
  if prop=='color':overrides[prop]='var(--body)'
  elif prop in ('background','background-color','background-image'):overrides['background']='var(--library-surface)'
  elif prop.startswith('border') and 'radius' not in prop:overrides[(prop if prop.endswith('color') else prop+'-color')]='var(--line)'
  elif prop=='box-shadow':overrides[prop]='0 8px 28px rgba(30,30,40,.07)'
  elif prop in ('fill','stroke'):overrides[prop]='var(--gold)'
 if overrides:rules.append(','.join(scope+s for s in chosen)+' {'+';'.join(k+':'+v+'!important' for k,v in overrides.items())+';}')
extra=Path('numerology_light_themes.css').read_text(encoding='utf-8').split('/* Report templates also contain inline palette declarations. */')[-1] if Path('numerology_light_themes.css').exists() else ''
Path('numerology_light_themes.css').write_text('/* Fixed palette overrides for the numerology and relationship reports. */\n'+'\n'.join(rules)+'\n/* Report templates also contain inline palette declarations. */\n'+extra,encoding='utf-8')
print('Palette rules:',len(rules))
html=html.replace('<body data-world="west">','<body class="numerology-page" data-world="west">').replace('</head>','<link rel="stylesheet" href="numerology_light_themes.css?v=m060"></head>')
Path('destiny_book_web.html').write_text(html,encoding='utf-8')

