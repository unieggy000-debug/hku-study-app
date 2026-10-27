(function(){
  function initImageViewer(){
    if(document.querySelector('.image-viewer-backdrop')) return;
    const backdrop=document.createElement('div');
    backdrop.className='image-viewer-backdrop';
    backdrop.hidden=true;
    backdrop.setAttribute('aria-hidden','true');
    backdrop.innerHTML='<section class="image-viewer-dialog" role="dialog" aria-modal="true" aria-label="图片预览"><div class="image-viewer-toolbar"><strong class="image-viewer-title">图片预览 · Image preview</strong><button type="button" class="image-viewer-close" aria-label="关闭图片预览">×</button></div><div class="image-viewer-stage"><img class="image-viewer-image" alt=""></div><div class="image-viewer-caption">点击图片可放大/还原 · Click the image to zoom</div></section>';
    document.body.appendChild(backdrop);
    const dialogImage=backdrop.querySelector('.image-viewer-image');
    const title=backdrop.querySelector('.image-viewer-title');
    const closeButton=backdrop.querySelector('.image-viewer-close');
    let lastFocused=null;
    function close(){
      backdrop.hidden=true; backdrop.setAttribute('aria-hidden','true'); document.body.classList.remove('image-viewer-open');
      dialogImage.classList.remove('is-zoomed'); dialogImage.removeAttribute('src');
      if(lastFocused&&typeof lastFocused.focus==='function') lastFocused.focus();
    }
    function open(image){
      lastFocused=document.activeElement; dialogImage.src=image.currentSrc||image.src; dialogImage.alt=image.alt||'放大图片';
      title.textContent=image.alt||'图片预览 · Image preview'; dialogImage.classList.remove('is-zoomed');
      backdrop.hidden=false; backdrop.setAttribute('aria-hidden','false'); document.body.classList.add('image-viewer-open'); closeButton.focus();
    }
    document.addEventListener('click',function(event){
      const image=event.target.closest('img');
      if(!image||image.closest('.image-viewer-backdrop')||image.closest('[data-no-image-viewer]')) return;
      event.preventDefault(); event.stopPropagation(); image.dataset.imageViewer='true'; open(image);
    },true);
    closeButton.addEventListener('click',close);
    backdrop.addEventListener('click',event=>{if(event.target===backdrop||event.target.classList.contains('image-viewer-stage')) close();});
    dialogImage.addEventListener('click',()=>dialogImage.classList.toggle('is-zoomed'));
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!backdrop.hidden) close();});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initImageViewer); else initImageViewer();
})();
