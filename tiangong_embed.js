/* 嵌入页自主加载主题，兼容父页无法直接访问 iframe 的本地预览。 */
(()=>{
 if(new URLSearchParams(location.search).get('embed')!=='1')return;
 const valid=['rouge','paper','jade','apricot'];
 function apply(value){document.documentElement.dataset.workshopTheme=valid.includes(value)?value:'rouge';}
 function saved(){try{return localStorage.getItem('magicbird_theme')}catch(_){return 'rouge'}}
 apply(saved());
 const link=document.createElement('link');link.rel='stylesheet';link.href='tiangong_embed.css?v=m297';link.dataset.workshopStyle='';document.head.append(link);
 window.addEventListener('message',e=>{if(e.source!==parent||e.data?.type!=='tiangong-theme')return;apply(e.data.theme)});
 window.addEventListener('storage',e=>{if(e.key==='magicbird_theme')apply(e.newValue)});
 if(parent!==window)parent.postMessage({type:'tiangong-theme-ready'},'*');
})();
