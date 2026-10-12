import('./src/vedic/ui/vedicVerifyApp.js').catch(error=>{
  const target=document.getElementById('error');
  if(target)target.textContent=`Module startup failed: ${error.message||error}`;
  console.error(error);
});
