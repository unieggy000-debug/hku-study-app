/* 46 English, open-response classroom exercises with chapter/day/topic filters. */
window.render7224Practice = function () {
  const app = document.getElementById('app');
  const questions = window.COURSE_7224_QUESTIONS;
  const topics = window.COURSE_7224_TOPICS;
  const chapters = window.COURSE_7224_CHAPTERS;
  const topicByQuestion = new Map(topics.flatMap((topic) => topic.q.map((number) => [number, topic])));
  const topicOf = (question) => topicByQuestion.get(question.n) || topics.find((topic) => topic.id === question.topic);
  const dayOf = (question) => topicOf(question)?.day || (question.n <= 14 || (question.n >= 40 && question.n <= 43) ? 1 : question.n <= 28 || question.n === 44 ? 2 : 3);
  const escape = (value) => String(value).replace(/[&<>\"]/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
  const storageKey = 'idat7224-classroom-practice-v1';
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storageKey) || '{}'); } catch (_) {}
  const params = new URLSearchParams(location.search);
  let filter = {day:params.get('day')||'all',chapter:params.get('chapter')||'all',topic:params.get('topic')||'all',type:params.get('type')||'all',search:''};
  let selected = Number(params.get('q')) || 0;
  const persist = () => localStorage.setItem(storageKey,JSON.stringify(saved));
  const filtered = () => questions.filter((question) => { const topic=topicOf(question); return (!topic ? false : (filter.day==='all'||String(dayOf(question))===filter.day) && (filter.chapter==='all'||topic.chapter===filter.chapter) && (filter.topic==='all'||topic.id===filter.topic) && (filter.type==='all'||question.type===filter.type) && (!filter.search || `${question.n} ${question.p} ${topic.en} ${question.type}`.toLowerCase().includes(filter.search.toLowerCase()))); });
  const replaceUrl = () => {const url=new URL(location.href); for(const key of ['day','chapter','topic','type','q'])url.searchParams.delete(key); if(filter.day!=='all')url.searchParams.set('day',filter.day);if(filter.chapter!=='all')url.searchParams.set('chapter',filter.chapter);if(filter.topic!=='all')url.searchParams.set('topic',filter.topic);if(filter.type!=='all')url.searchParams.set('type',filter.type);if(selected)url.searchParams.set('q',String(selected));history.replaceState(null,'',url);};
  const countProgress = () => questions.filter((question)=>saved[question.n]?.status==='mastered').length;
  document.title='IDAT7224 · Classroom Practice';
  document.querySelector('.top .kicker').textContent='IDAT7224 · ENGLISH WORKBOOK';
  document.querySelector('.top h1').textContent=`Practice · ${questions.length} exam questions`;
  document.querySelector('.top .scope').textContent='Three exam formats: short answer, calculation, and multiple choice. Questions and model answers are in English; every solution includes a Chinese explanation.';
  function render() {
    const pool=filtered();
    if (!pool.some((question)=>question.n===selected)) selected=pool[0]?.n||0;
    replaceUrl();
    const question=pool.find((item)=>item.n===selected);
    const topic=question&&topicOf(question);
    const currentIndex=pool.findIndex((item)=>item.n===selected);
    const nav=pool.map((item)=>{const t=topicOf(item);const status=saved[item.n]?.status;return `<button type="button" data-q="${item.n}" class="${item.n===selected?'on':''} ${status==='mastered'?'mastered':''}"><b>#${item.n}</b><span>${escape(item.type)}<br>${escape(t.en)}</span>${status==='mastered'?'<em>✓</em>':''}</button>`;}).join('');
    const options=question?.options?.map((option,index)=>`<label class="practice7224-option"><input type="radio" name="p7224Choice" value="${index}" ${Number(saved[question.n]?.choice)===index?'checked':''}><span><b>${String.fromCharCode(65+index)}.</b> ${escape(option)}</span></label>`).join('')||'';
    app.innerHTML=`<section class="practice7224-hero"><div><p class="eyebrow">STUDY → PRACTICE → PAPERS</p><h2>Three exam formats · 62 questions</h2><p>Short answer, calculation and multiple choice cover the four lecture chapters. Questions and model answers stay in English; every solution includes a Chinese explanation.</p></div><div><strong>${countProgress()} / ${questions.length}</strong><span>marked mastered</span><a href="study-plan.html?course=7224#plan">Open Study plan →</a></div></section><section class="practice7224-filter" aria-label="Practice filters"><label>Day<select id="p7224Day"><option value="all">All days</option><option value="1">Day 1 · foundations</option><option value="2">Day 2 · calculations</option><option value="3">Day 3 · sequences</option></select></label><label>Question type<select id="p7224Type"><option value="all">All types</option><option value="Short answer">Short answer · 简答</option><option value="Calculation">Calculation · 计算</option><option value="Multiple choice">Multiple choice · 单选</option></select></label><label>Chapter<select id="p7224Chapter"><option value="all">All chapters</option>${chapters.map((chapter)=>`<option value="${chapter.id}">Chapter ${Number(chapter.no)} · ${escape(chapter.en)}</option>`).join('')}</select></label><label>Small topic<select id="p7224Topic"><option value="all">All topics</option>${topics.map((topic)=>`<option value="${topic.id}">${escape(topic.en)}</option>`).join('')}</select></label><label>Search<input id="p7224Search" type="search" placeholder="Keyword or question #" value="${escape(filter.search)}"></label></section><div class="practice7224-layout"><aside class="practice7224-list"><div><b>${pool.length} questions in this view</b><small>Choose any question</small></div>${nav||'<p>No questions match these filters.</p>'}</aside><section class="practice7224-stage">${question?`<div class="practice7224-meta"><span>Question #${question.n} · Day ${dayOf(question)}</span><span class="practice7224-type">${escape(question.type)}</span><span>${escape(chapters.find((chapter)=>chapter.id===topic.chapter)?.en||'Chapter')} / ${escape(topic.en)}</span></div><h2>${escape(topic.en)}</h2><p class="practice7224-prompt">${escape(question.p)}</p>${options?`<div class="practice7224-options"><h3>Select one answer / 选择一个答案</h3>${options}</div>`:''}<div class="practice7224-tools"><a href="study-plan.html?course=7224#topic-${topic.id}">Review this knowledge card ↗</a><a href="papers.html?course=7224">Teacher review exercises ↗</a></div><label class="practice7224-answer-label" for="p7224Answer">Your answer in English</label><textarea id="p7224Answer" rows="9" placeholder="Write the steps and explanation before opening the answer. Saved automatically.">${escape(saved[question.n]?.text||'')}</textarea><p class="practice7224-autosave">Draft saved in this browser. Show reasoning, not only the final number.</p><details class="practice7224-solution"><summary>Check model answer · 标准答案与中文解析</summary><div><h4>Model answer / 标准答案</h4><p>${escape(question.a)}</p><h4>Chinese explanation / 中文解析</h4><p>${escape(question.explain||'先写定义，再写步骤，最后检查结果和限制条件。')}</p><small>Try first, then compare your reasoning with the model answer.</small></div></details><div class="practice7224-self"><span>Self-check</span><button type="button" data-rate="mastered" class="${saved[question.n]?.status==='mastered'?'on':''}">I can solve a variation</button><button type="button" data-rate="review" class="${saved[question.n]?.status==='review'?'on':''}">Review again</button></div><div class="practice7224-prevnext"><button type="button" data-move="-1" ${currentIndex<=0?'disabled':''}>← Previous</button><span>${currentIndex+1} / ${pool.length}</span><button type="button" data-move="1" ${currentIndex>=pool.length-1?'disabled':''}>Next →</button></div>`:'<div class="practice7224-empty"><h2>No matching questions</h2><p>Clear one filter or search term to continue.</p></div>'}</section></div>`;
    app.querySelector('#p7224Day').value=filter.day;
    app.querySelector('#p7224Type').value=filter.type;
    app.querySelector('#p7224Chapter').value=filter.chapter;
    app.querySelector('#p7224Topic').value=filter.topic;
    [['#p7224Day','day'],['#p7224Type','type'],['#p7224Chapter','chapter'],['#p7224Topic','topic']].forEach(([selector,key])=>app.querySelector(selector).addEventListener('change',(event)=>{filter[key]=event.target.value;render();}));
    const search=app.querySelector('#p7224Search');
    search.addEventListener('input',(event)=>{filter.search=event.target.value;const position=search.selectionStart;render();const next=app.querySelector('#p7224Search');next.focus();next.setSelectionRange(position,position);});
    app.querySelectorAll('[data-q]').forEach((button)=>button.addEventListener('click',()=>{selected=Number(button.dataset.q);render();}));
    app.querySelector('#p7224Answer')?.addEventListener('input',(event)=>{saved[question.n]={...saved[question.n],text:event.target.value};persist();});
    app.querySelectorAll('input[name="p7224Choice"]').forEach((input)=>input.addEventListener('change',(event)=>{saved[question.n]={...saved[question.n],choice:Number(event.target.value)};persist();}));
    app.querySelectorAll('[data-rate]').forEach((button)=>button.addEventListener('click',()=>{saved[question.n]={...saved[question.n],status:button.dataset.rate};persist();render();}));
    app.querySelectorAll('[data-move]').forEach((button)=>button.addEventListener('click',()=>{selected=pool[currentIndex+Number(button.dataset.move)].n;render();app.querySelector('.practice7224-stage').scrollIntoView({block:'start'});}));
  }
  render();
};
