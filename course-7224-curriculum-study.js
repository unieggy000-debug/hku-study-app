/* IDAT7224: chapter → small-topic cards, mirroring the 7215 Study pattern. */
window.render7224Study = function () {
  const shell = document.querySelector('.study-shell');
  if (!shell) return;
  const chapters = window.COURSE_7224_CHAPTERS;
  const escape = (value) => String(value).replace(/[&<>\"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
  const paperLink = (id) => `papers.html?course=7224#7224-${id}`;
  document.title = 'IDAT7224 冲刺学习 · 四章知识卡';
  shell.className = 'study-shell beginner-study outline-7224';
  const sidebar = `<aside class="study-sidebar outline-sidebar" aria-label="7224 bilingual course map"><p class="side-label">IDAT7224 · COURSE MAP / 课程目录</p><a class="outline-top-link" href="#start"><span>00</span> Exam guide / 考试说明</a><a class="outline-top-link" href="#plan"><span>3D</span> Three-day plan / 三天计划</a>${chapters.map((chapter) => `<details class="outline-side-chapter" ${chapter.no==='01'?'open':''}><summary><span>${chapter.no}</span><b>${escape(chapter.en)}</b><small>${escape(chapter.title)}</small></summary><div>${chapter.topics.map((topic) => `<a href="#topic-${topic.id}"><b>${escape(topic.en)}</b><small>${escape(topic.title)}</small></a>`).join('')}</div></details>`).join('')}<a class="outline-top-link" href="#materials"><span>＋</span> Source library / 原资料</a><div class="side-action progress-panel"><strong>Progress / 章节进度</strong><div class="progress-track"><i id="studyProgress"></i></div><p id="studyProgressText">0 / 4 chapters completed</p><button id="expandAll" type="button">Expand all / 展开全部</button></div></aside>`;
  const card = (topic, index) => `<article class="concept-card outline-topic bilingual-card" id="topic-${topic.id}"><header><span>${String(index+1).padStart(2,'0')}</span><div><h3>${escape(topic.en)}</h3><p>${escape(topic.title)}</p></div></header><p class="outline-core-label">CORE KNOWLEDGE · 核心知识</p><ul class="outline-core bilingual-core">${topic.coreEn.map((sentence, i) => `<li><p lang="en">${escape(sentence)}</p><small lang="zh-CN">中文解释：${escape(topic.core[i])}</small></li>`).join('')}</ul><div class="outline-diagram bilingual-diagram" aria-label="${escape(topic.en)} diagram">${topic.diagramEn.map((step, i) => `<span><em aria-hidden="true">${escape(topic.visualIcons[i] || '•')}</em><b>${escape(step)}</b><small>${escape(topic.diagram[i])}</small></span>`).join('<i>→</i>')}</div>${topic.pptVisual ? `<figure class="ppt-focus"><a href="${escape(topic.pptVisual.src)}" target="_blank" rel="noopener"><img src="${escape(topic.pptVisual.src)}" alt="${escape(topic.pptVisual.alt)}" loading="lazy"></a><figcaption><b>HIGHLY RELEVANT PPT VISUAL / 强相关课件图</b><span>${escape(topic.pptVisual.caption)}</span><small>Click to view the full slide / 点击查看原图</small></figcaption></figure>` : ''}<div class="case bilingual-block"><b>WORKED EXAMPLE · 示例</b><p lang="en">${escape(topic.caseEn)}</p><small lang="zh-CN">中文讲解：${escape(topic.case)}</small></div><div class="exam-move bilingual-block"><b>TRANSFER METHOD · 举一反三</b><p lang="en">${escape(topic.transferEn)}</p><small lang="zh-CN">中文提示：${escape(topic.transfer)}</small></div><div class="outline-topic-bottom"><div class="outline-topic-type"><b>EXAM TYPE / 关联题型：</b><span>${escape(topic.typeEn)}</span><small>${escape(topic.type)}</small></div><div class="outline-topic-links">${topic.q.length ? `<a href="index.html?course=7224&topic=${topic.id}">Practice ${topic.q.map((n)=>`#${n}`).join(' · ')} / 练习 →</a>` : ''}${topic.paper.map((id) => `<a href="${paperLink(id)}">Teacher example ${id.toUpperCase()} / 老师例题 ↗</a>`).join('')}</div><small>Source / 课堂来源：${escape(topic.source)}. Linked questions may use different wording / 题型链接不表示原题照搬。</small></div></article>`;
  const section = (chapter) => `<section class="class-section outline-chapter" id="${chapter.id}"><details class="class-module" ${chapter.no==='01'?'open':''}><summary><span class="class-no">${chapter.no}</span><div><p>CHAPTER ${Number(chapter.no)}</p><h2>${escape(chapter.en)}</h2><small>${escape(chapter.title)} · ${escape(chapter.summary)}</small></div><b>DAY ${chapter.day}</b></summary><div class="module-body"><div class="outline-module-intro"><b>${chapter.topics.length} KNOWLEDGE CARDS / ${chapter.topics.length} 个知识点</b><br>Study in this order / 按此顺序学习：<b>English concept → 中文解释 → diagram → example → transfer → practice</b>. Full PPT slides remain in the source library at the bottom / PPT 原页集中放在底部。</div>${chapter.topics.map(card).join('')}<label class="module-done"><input type="checkbox" data-module="${chapter.id}"> I can explain this chapter in English and solve its questions / 我能用英文术语解释本章并完成对应题</label></div></details></section>`;
  shell.innerHTML = `${sidebar}<main class="study-content outline-main"><section class="study-hero beginner-hero" id="start"><div><p class="eyebrow">IDAT7224 · CHAPTER-FIRST STUDY</p><h1>按章节学知识，<br>按题型验证会不会</h1><p>这页改成与 7215 一致的<b>二级结构</b>：四章目录 → 每个小知识点一张卡。八类老师例题不是目录本身，而是放在相关知识卡里的练习入口。</p><div class="hero-actions"><a class="primary-link" href="#plan">按三天计划开始</a><a class="secondary-link" href="#ch1">直接看第 1 章</a></div></div><div class="big-picture"><div class="picture-step"><b>01</b><span>AI 与学习方式</span><small>先会判断任务</small></div><i>→</i><div class="picture-step"><b>02–03</b><span>神经网络与案例</span><small>再会手算步骤</small></div><i>→</i><div class="picture-step"><b>04</b><span>序列和拓扑</span><small>最后会画图比较</small></div></div></section><section class="exam-brief"><div><span>4 章</span><b>课堂主线</b><small>Ch1–4</small></div><div><span>28</span><b>知识卡</b><small>一张只讲一小点</small></div><div><span>46</span><b>课堂习题</b><small>已移到 Practice</small></div><div><span>8 类</span><b>老师示范题</b><small>仍在 Papers</small></div><p>期中复习录音说覆盖第 1–4 章、到网络拓扑；约 60 分钟、4–5 道大题。此处涵盖现有课堂内容，<b>不代表每张卡都会考</b>。老师 10 月 23 日说“下周五”，日期推算为 10 月 30 日；正式安排以 Moodle 为准。</p></section><section class="section-block" id="plan"><div class="section-title"><div><p class="eyebrow">THREE-DAY ROUTE</p><h2>每天学哪章、刷哪些题</h2></div><p>每学完一张卡，就点击卡片里的“练习 #”独立作答；当天最后再做整组。</p></div><div class="sprint-grid"><article><span>DAY 1 · 建概念</span><h3>第 1 章 + 第 2 章</h3><ol><li>先学 AI、标签/奖励、训练与推理，再学神经元、激活、损失和反传。</li><li>刷课堂题 #1–14、#40–43：定义、比较、配对和基础加权和。</li><li>做老师例题 #1–3，要求能画学习范式树并写理由。</li></ol><div class="sprint-actions"><a href="#ch1">开始学习 →</a><a class="practice-entry" href="index.html?course=7224&day=1">练 Day 1（18 题）</a></div></article><article><span>DAY 2 · 会手算</span><h3>第 3 章 + 回练第 2 章计算</h3><ol><li>学水果加权和、Softmax、缩放、隐藏层、交叉熵和 RBF。</li><li>刷课堂题 #15–28、#44；白纸重算老师例题 #4–6。</li><li>每题先抄题面 activation、loss、update rule，最后再代数。</li></ol><div class="sprint-actions"><a href="#ch3">开始学习 →</a><a class="practice-entry" href="index.html?course=7224&day=2">练 Day 2（15 题）</a></div></article><article><span>DAY 3 · 会画会比</span><h3>第 4 章 + 模拟</h3><ol><li>学序列、N-gram、RNN/BPTT、LSTM/GRU、分词与注意力。</li><li>刷课堂题 #29–39、#45–46；做老师例题 #7–8。</li><li>按 60 分钟模拟一次，检查图的标签和论证理由。</li></ol><div class="sprint-actions"><a href="#ch4">开始学习 →</a><a class="practice-entry" href="index.html?course=7224&day=3">练 Day 3（13 题）</a></div></article></div><div class="study-method"><b>每张卡只做四件事</b><span>① 人话复述核心</span><span>② 看图讲关系</span><span>③ 自己重算案例</span><span>④ 点击题号换题做</span></div></section>${chapters.map(section).join('')}<section class="section-block outline-materials" id="materials"><div class="section-title"><div><p class="eyebrow">OPTIONAL SOURCE LIBRARY</p><h2>完整 PPT 与 Discussion · 额外章节</h2></div><p>这里保留课堂原资料供查图和核对；不影响上面的知识卡学习路径。46 道课堂习题与答案已经移至 Practice 作答界面。</p></div><div class="outline-material-tabs"><button type="button" data-source="01-复习资料.md" class="on">四章 PPT 逐页资料</button><button type="button" data-source="04-Discussion考点.md">Discussion 原资料</button></div><div class="outline-material-viewer" id="outlineMaterialViewer"><p>点上方按钮加载原资料（图片按需加载）。</p></div></section></main>`;
  shell.querySelector('.study-hero h1').innerHTML='Learn by chapter.<br>Prove it with questions.<small>按章节学习，用题型验证掌握程度</small>';
  shell.querySelector('.study-hero h1 + p').innerHTML='Four chapters → one card per knowledge point → linked practice. <small>四章二级结构：每个小知识点一张卡，并直接关联练习。</small>';
  shell.querySelector('.study-hero .primary-link').textContent='Start the 3-day plan / 开始三天计划';
  shell.querySelector('.study-hero .secondary-link').textContent='Open Chapter 1 / 进入第一章';
  shell.querySelector('#plan .section-title h2').textContent='What to learn and practise each day / 每天学什么、练什么';
  shell.querySelector('#plan .section-title>p').textContent='Finish one bilingual card, answer its linked question, then complete the daily set. / 学完一张双语卡，立即做关联题，最后完成当天整组。';
  const dayCards = shell.querySelectorAll('#plan .sprint-grid article');
  const dayCopy = [
    ['DAY 1 · BUILD CONCEPTS / 建概念','Chapters 1–2 / 第 1–2 章',['Learn AI, labels and rewards, training and inference, then neurons, activations, loss and backpropagation. / 学习 AI、学习反馈、训练推理及神经网络基础。','Practice #1–14 and #40–43: definitions, comparisons, matching and weighted sums. / 刷定义、比较、配对和加权和。','Complete teacher examples E1–E3 and explain every choice in English terms. / 完成老师例题并用英文术语说明理由。']],
    ['DAY 2 · CALCULATE / 会手算','Chapter 3 + Chapter 2 calculations / 第 3 章及第 2 章计算',['Learn weighted scores, Softmax, scaling, hidden layers, cross-entropy and RBF. / 学习水果案例与分类计算。','Practice #15–28 and #44; recalculate teacher examples E4–E6. / 刷计算题并重算老师例题。','Copy the activation, loss and update rule before substituting values. / 先确认激活、损失与更新公式再代数。']],
    ['DAY 3 · DRAW AND COMPARE / 会画会比','Chapter 4 + mock exam / 第 4 章及模拟',['Learn sequences, N-gram, RNN/BPTT, LSTM/GRU, tokenization and attention. / 学习序列模型、门控与注意力。','Practice #29–39 and #45–46; complete teacher examples E7–E8. / 刷序列题及老师例题。','Run a 60-minute mock and check every diagram label and justification. / 进行 60 分钟模拟并检查图示标签与论证。']]
  ];
  dayCards.forEach((article,i)=>{const copy=dayCopy[i];article.querySelector(':scope>span').textContent=copy[0];article.querySelector('h3').textContent=copy[1];article.querySelectorAll('li').forEach((li,j)=>li.textContent=copy[2][j]);});
  dayCards.forEach((article)=>{const links=article.querySelectorAll('.sprint-actions a');links[0].textContent='Start learning / 开始学习 →';links[1].textContent=links[1].textContent.replace('练 Day','Practice Day').replace('题',' questions / 题');});
  shell.querySelector('.study-method').innerHTML='<b>FOUR ACTIONS PER CARD / 每张卡四步</b><span>① Explain the concept / 复述核心</span><span>② Read the diagram / 看图讲关系</span><span>③ Recalculate the example / 重算案例</span><span>④ Solve a variation / 做同型题</span>';
  const pictureSteps=shell.querySelectorAll('.big-picture .picture-step');
  [['AI and learning modes','判断学习任务'],['Neural networks and cases','掌握手算步骤'],['Sequences and topologies','会画图与比较']].forEach((copy,i)=>{pictureSteps[i].querySelector('span').textContent=copy[0];pictureSteps[i].querySelector('small').textContent=copy[1];});
  shell.querySelector('.outline-materials h2').textContent='Full PPT, Discussion and audio / 完整原资料';
  shell.querySelector('.outline-materials .section-title>p').textContent='Use this optional library to verify slides and classroom notes. The learning path stays in the bilingual cards above. / 此处仅供查图和核对课堂资料，学习主线以上方双语卡片为准。';
  const materialButtons=shell.querySelectorAll('.outline-material-tabs button');
  materialButtons[0].textContent='Annotated PPT · 293 slides / 四章逐页批注';materialButtons[1].textContent='Discussion notes / Discussion 原资料';
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'outline-mobile-nav';
  mobileNav.setAttribute('aria-label', 'Bilingual chapters and knowledge points');
  mobileNav.innerHTML = chapters.map((chapter) => `<a href="#${chapter.id}">CH ${Number(chapter.no)} / 第 ${Number(chapter.no)} 章</a>`).join('') + `<label>Topic / 知识点<select id="outlineMobileTopic"><option value="">Choose a topic / 选择知识点</option>${chapters.map((chapter) => `<optgroup label="CH ${Number(chapter.no)} · ${escape(chapter.en)} / ${escape(chapter.title)}">${chapter.topics.map((topic) => `<option value="topic-${topic.id}">${escape(topic.en)} / ${escape(topic.title)}</option>`).join('')}</optgroup>`).join('')}</select></label>`;
  shell.querySelector('.outline-sidebar .progress-panel').before(mobileNav);
  mobileNav.querySelector('select').addEventListener('change', (event) => { if(event.target.value) location.hash=event.target.value; });
  const key = 'idat7224-chapter-progress-v1';
  let done = {};
  try { done = JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) {}
  const boxes = [...shell.querySelectorAll('[data-module]')];
  const updateProgress = () => { const n=boxes.filter((box)=>box.checked).length; shell.querySelector('#studyProgress').style.width=`${n/4*100}%`; shell.querySelector('#studyProgressText').textContent=`${n} / 4 chapters completed / 已完成`; localStorage.setItem(key,JSON.stringify(Object.fromEntries(boxes.map((box)=>[box.dataset.module,box.checked])))); };
  boxes.forEach((box)=>{ box.checked=Boolean(done[box.dataset.module]); box.addEventListener('change',updateProgress); });
  updateProgress();
  const modules = [...shell.querySelectorAll('.outline-chapter .class-module')];
  shell.querySelector('#expandAll').addEventListener('click',(event)=>{ const open=modules.some((item)=>!item.open); modules.forEach((item)=>item.open=open); event.target.textContent=open?'Collapse all / 收起全部':'Expand all / 展开全部'; });
  const viewKey = 'idat7224-study-view-v1';
  let view = {};
  let restoring = true;
  let userInteracted = false;
  try { view = JSON.parse(localStorage.getItem(viewKey) || '{}'); } catch (_) {}
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('wheel', () => { userInteracted = true; }, { passive:true, once:true });
  window.addEventListener('touchstart', () => { userInteracted = true; }, { passive:true, once:true });
  window.addEventListener('keydown', (event) => { if (['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key)) userInteracted = true; }, { once:true });
  const jumpTo = (top) => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top:Number(top) || 0, left:0, behavior:'auto' });
    requestAnimationFrame(() => { root.style.scrollBehavior = previous; });
  };
  const moduleId = (module) => module.closest('.outline-chapter')?.id || '';
  const saveView = () => {
    if (restoring) return;
    view.scrollY = Math.max(0, Math.round(window.scrollY));
    view.openModules = modules.filter((item) => item.open).map(moduleId).filter(Boolean);
    const materialDetails = [...document.querySelectorAll('#outlineMaterialViewer details')];
    if (materialDetails.length) view.materialOpenDetails = materialDetails.map((item, index) => item.open ? index : -1).filter((index) => index >= 0);
    localStorage.setItem(viewKey, JSON.stringify(view));
  };
  const restoreView = () => {
    if (location.hash) {
      const requestedSection = decodeURIComponent(location.hash.slice(1));
      const canRestoreExact = view.section === requestedSection && Number.isFinite(Number(view.scrollY));
      openHash();
      view.section = requestedSection;
      requestAnimationFrame(() => {
        if (canRestoreExact && !userInteracted) jumpTo(view.scrollY);
        restoring = false;
        saveView();
      });
      return;
    }
    if (Array.isArray(view.openModules)) modules.forEach((item) => { item.open = view.openModules.includes(moduleId(item)); });
    requestAnimationFrame(() => {
      if (Number.isFinite(Number(view.scrollY)) && !userInteracted) jumpTo(view.scrollY);
      restoring = false;
      saveView();
    });
  };
  modules.forEach((item) => item.addEventListener('toggle', saveView));
  let scrollTick = 0;
  window.addEventListener('scroll', () => {
    if (scrollTick) return;
    scrollTick = window.setTimeout(() => { scrollTick = 0; saveView(); }, 150);
  }, { passive:true });
  window.addEventListener('pagehide', saveView);
  window.addEventListener('beforeunload', saveView);
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a');
    if (link && link.href && link.origin === location.origin) saveView();
  }, true);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveView(); });
  const oldHash = {'study-e1':'topic-ai-map','study-e2':'topic-learning-modes','study-e3':'topic-agent','study-e4':'topic-neuron','study-e5':'topic-loss-update','study-e6':'topic-backprop','study-e7':'topic-tokenization','study-e8':'topic-lstm',foundation:'ch1',calculation:'ch2',language:'ch4','course-materials':'materials'};
  const openHash = () => { const id=oldHash[decodeURIComponent(location.hash.slice(1))] || decodeURIComponent(location.hash.slice(1)); const target=document.getElementById(id); if(!target)return; target.closest('.outline-chapter')?.querySelector('.class-module')?.setAttribute('open',''); target.scrollIntoView({block:'start'}); };
  window.addEventListener('hashchange',openHash);
  window.addEventListener('hashchange', () => { view.section = decodeURIComponent(location.hash.slice(1)); saveView(); });
  const viewer = shell.querySelector('#outlineMaterialViewer');
  shell.querySelector('.outline-material-tabs').insertAdjacentHTML('beforeend','<button type="button" data-source="audio">Audio review cards / 六段录音复盘</button>');
  async function openMaterial(button, restoringMaterial = false) {
    view.materialSource = button.dataset.source;
    localStorage.setItem(viewKey, JSON.stringify(view));
    shell.querySelectorAll('[data-source]').forEach((b)=>b.classList.toggle('on',b===button));
    if(button.dataset.source==='audio'){
      viewer.innerHTML=`<div class="outline-audio-library">${COURSE_7224_LESSONS.map((lesson)=>`<details><summary>${escape(lesson.no)} · ${escape(lesson.zh)} / ${escape(lesson.title)}</summary><div><p><b>课堂来源：</b>${escape(lesson.source)}</p><p><b>核心：</b>${escape(lesson.idea)}</p><p><b>English:</b> ${escape(lesson.english)}</p><div class="outline-diagram">${lesson.diagram.map((step)=>`<span>${escape(step)}</span>`).join('<i>→</i>')}</div><p><b>案例：</b>${escape(lesson.case)}</p><p><b>自己做：</b>${escape(lesson.do)}</p></div></details>`).join('')}</div>`;
      restoreMaterialDetails();
      restorePageScroll(restoringMaterial);
      return;
    }
    viewer.innerHTML='<p>正在加载课堂原资料…</p>';
    try{const response=await fetch(`7224-study/${button.dataset.source}?v=8`,{cache:'no-store'});if(!response.ok)throw new Error(String(response.status));const coverage=button.dataset.source==='01-复习资料.md'?'<div class="slide-coverage"><b>293 / 293 PPT pages annotated</b><span>每页均含中文阅读提示；相关 Practice 与老师例题可直接跳转。</span></div>':'';viewer.innerHTML=`${coverage}<div class="material-doc">${render7224Markdown(await response.text())}</div>`;restoreMaterialDetails();if(restoringMaterial)await waitForMaterialImages();}catch(_){viewer.innerHTML='<p>加载失败，请确认本地服务仍在运行。</p>';}
    restorePageScroll(restoringMaterial);
  }
  function waitForMaterialImages() {
    // PPT pages are intentionally lazy-loaded. Waiting for all 293 images would
    // never finish while the reader is still near the top of the document.
    const images = [...viewer.querySelectorAll('img')].filter((image) => image.loading !== 'lazy' && !image.complete);
    return Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
      image.addEventListener('load', resolve, { once:true });
      image.addEventListener('error', resolve, { once:true });
    })));
  }
  function restorePageScroll(enabled) {
    if (!enabled || userInteracted || !Number.isFinite(Number(view.scrollY))) return;
    requestAnimationFrame(() => { if (!userInteracted) jumpTo(view.scrollY); });
  }
  function restoreMaterialDetails() {
    if (!Array.isArray(view.materialOpenDetails)) return;
    const details = [...viewer.querySelectorAll('details')];
    view.materialOpenDetails.forEach((index) => { if (details[index]) details[index].open = true; });
  }
  shell.querySelectorAll('[data-source]').forEach((button)=>button.addEventListener('click',()=>openMaterial(button)));
  const initialButton = [...shell.querySelectorAll('[data-source]')].find((button) => button.dataset.source === (view.materialSource || '01-复习资料.md')) || shell.querySelector('[data-source]');
  openMaterial(initialButton, true).then(() => restoreView());
};
