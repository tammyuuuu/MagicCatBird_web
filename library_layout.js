(() => {
  const sidebar = document.querySelector('.tool-sidebar');
  const header = document.querySelector('.global-header');
  const nav = header?.querySelector('.top-nav');
  if (nav) {
    nav.classList.add('library-sidebar-nav');
    const currentLink = nav.querySelector('a[href="destiny_book_web.html"]');
    if (currentLink) {
      if (nav.querySelector('a[href="manifest_web.html"]')) currentLink.remove();
      else {
        currentLink.href = 'manifest_web.html';
        currentLink.textContent = '显化之境';
        currentLink.classList.remove('active');
      }
    }
    document.body.append(nav);
    header.remove();
  }
  const systems = document.createElement('nav');
  systems.className = 'library-system-switch';
  systems.setAttribute('aria-label','图书馆体系切换');
  const vedic = location.pathname.endsWith('/vedic_web.html');
  const western = location.pathname.endsWith('/western_web.html');
  systems.innerHTML = `<a href="destiny_book_web.html" ${!vedic && !western ? 'aria-current="page"' : ''}>生命灵数</a><a href="vedic_web.html" ${vedic ? 'aria-current="page"' : ''}>印度占星</a><a href="western_web.html" ${western ? 'aria-current="page"' : ''}>西洋占星</a>`;
  document.body.append(systems);
})();
