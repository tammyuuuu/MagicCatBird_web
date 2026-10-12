(() => {
  const themes = [['mystic', '星夜紫晶'], ['noir', '霜白墨羽'], ['parchment', '琥珀秘卷'], ['dopamine', '雾糖奇遇']];
  const select = document.createElement('select');
  select.id = 'libraryTheme';
  select.setAttribute('aria-label', '图书馆背景配色');
  themes.forEach(([value, label]) => select.add(new Option(label, value)));
  document.querySelector('.global-header').prepend(select);
  function apply(value, persist) {
    const theme = themes.some(([id]) => id === value) ? value : 'mystic';
    document.body.dataset.theme = theme;
    select.value = theme;
    if (persist) localStorage.setItem('magiccat_reading_theme', theme);
  }
  select.addEventListener('change', () => apply(select.value, true));
  apply(localStorage.getItem('magiccat_reading_theme'), false);
})();
