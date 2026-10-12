(() => {
  const themes = [['mystic','星夜紫晶'],['noir','霜白墨羽'],['parchment','琥珀秘卷'],['dopamine','雾糖奇遇']];
  const bar = document.createElement('div');
  bar.className = 'web-theme-dots'; bar.setAttribute('role','group'); bar.setAttribute('aria-label','切换背景配色');
  themes.forEach(([theme,label]) => {
    const button = document.createElement('button'); button.type='button'; button.dataset.theme=theme;
    button.setAttribute('aria-label',label); button.title=label;
    button.onclick=()=> {
      const original = document.querySelector(`#themeSheet .ts-card[data-theme="${theme}"]`);
      if (original) original.click();
      else { document.body.dataset.theme=theme; localStorage.setItem('magiccat_reading_theme',theme); }
      sync();
    };
    bar.append(button);
  });
  document.body.append(bar);
  function sync() {
    const current=document.body.dataset.theme || 'mystic';
    bar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.theme===current)));
  }
  if (!document.querySelector('#themeSheet')) document.body.dataset.theme=localStorage.getItem('magiccat_reading_theme') || 'mystic';
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['data-theme']});
  sync();
})();
