/* Preserve and classify every existing lecture-notes/Discussion section under the eight exam families. */
window.render7224Classroom = async function (shell) {
  const destinations = Array.from({ length: 8 }, (_, i) => {
    const module = shell.querySelector(`#study-e${i + 1} .depth-module-body`);
    if (!module) return null;
    const section = document.createElement('section');
    section.className = 'depth-classroom';
    section.innerHTML = `<div class="depth-classroom-heading"><div><small>FULL CLASSROOM · 课堂完整内容</small><h4>这一题型关联的上课内容</h4></div><span class="depth-classroom-count">整理中…</span></div><p>原来的课堂知识卡、PPT 逐节笔记与 Discussion 没有删除。下面按知识关联归类；点开一节才加载原文与 PPT 图片。归类方便学习，<b>不表示每节都是老师保证会考的内容</b>。</p><div class="depth-classroom-items"></div>`;
    module.querySelector('.depth-module-end')?.before(section);
    return section;
  });
  const noteMap = {
    1: [1,1,2,2,3,1,3,3,1,1,3,4],
    2: [4,4,6,6,5,6,5],
    3: [4,4,5,6,5],
    4: [8,7,8,8,8,8,8,8,8]
  };
  const discussionMap = [4,6,6,4,4,5,1,3,3,8,8,8];
  const lectureMap = [1,4,6,5,8,8];
  const items = [];
  const add = (type, moduleNo, title, raw, meta = {}) => {
    if (!moduleNo || !destinations[moduleNo - 1]) throw new Error(`Unclassified 7224 section: ${title}`);
    items.push({ type, moduleNo, title, raw: raw.trim(), ...meta });
  };
  try {
    const responses = await Promise.all(['01-复习资料.md', '04-Discussion考点.md'].map((name) => fetch(`7224-study/${name}`)));
    if (responses.some((response) => !response.ok)) throw new Error('课堂资料请求失败');
    const [notes, discussion] = await Promise.all(responses.map((response) => response.text()));
    const noteBlocks = notes.replace(/\r/g, '').split(/(?=^## )/m);
    add('guide', 1, '课程说明与考核信息', noteBlocks[0]);
    let noteCount = 0;
    for (const block of noteBlocks.slice(1)) {
      const title = block.match(/^##\s+([^\n]+)/)?.[1] || '课堂补充';
      const chapter = Number(title.match(/^第\s*(\d+)\s*章/)?.[1]);
      if (!chapter) {
        const target = title.includes('计算时') ? 4 : 1;
        add('guide', target, title, block.replace(/^##[^\n]*\n?/, ''));
        continue;
      }
      const parts = block.split(/(?=^### )/m);
      add('slide', [1,4,4,8][chapter - 1], `第 ${chapter} 章 · 开篇与章节图`, parts[0].replace(/^##[^\n]*\n?/, ''), { chapter, intro: true });
      parts.slice(1).forEach((part, i) => {
        const subTitle = part.match(/^###\s+([^\n]+)/)?.[1] || `第 ${i + 1} 节`;
        const target = noteMap[chapter]?.[i];
        add('slide', target, `Ch${chapter} · ${subTitle}`, part.replace(/^###[^\n]*\n?/, ''), { chapter, subsection: i + 1, extension: chapter === 4 && i >= 6 || chapter === 3 && i === 4 });
        noteCount++;
      });
    }
    if (noteCount !== 33) throw new Error(`PPT 小节数变更：预期 33，实际 ${noteCount}。需重新核对八类归属。`);
    const discussionBlocks = discussion.replace(/\r/g, '').split(/(?=^## )/m);
    add('discussion', 6, 'Discussion 导读与两套损失的区别', discussionBlocks[0]);
    let discussionCount = 0;
    for (const block of discussionBlocks.slice(1)) {
      const title = block.match(/^##\s+([^\n]+)/)?.[1] || '课堂讨论';
      const number = Number(title.match(/^(\d+)\./)?.[1]);
      const target = number ? discussionMap[number - 1] : 3;
      add('discussion', target, `Discussion · ${title}`, block.replace(/^##[^\n]*\n?/, ''), { discussionNo: number || null, extension: number === 12 });
      if (number) discussionCount++;
    }
    if (discussionCount !== 12) throw new Error(`Discussion 小节数变更：预期 12，实际 ${discussionCount}。`);
    if (typeof COURSE_7224_LESSONS !== 'undefined') COURSE_7224_LESSONS.forEach((lesson, i) => add('audio', lectureMap[i], `录音 ${lesson.no} · ${lesson.zh}`, '', { lesson, extension: i === 5 }));
    const lectureCount = items.filter((item) => item.type === 'audio').length;
    destinations.forEach((section, index) => {
      const selected = items.filter((item) => item.moduleNo === index + 1);
      section.querySelector('.depth-classroom-count').textContent = `${selected.length} 段课堂内容`;
      const list = section.querySelector('.depth-classroom-items');
      selected.forEach((item) => {
        const details = document.createElement('details');
        details.className = 'depth-lesson';
        const source = item.type === 'slide' ? 'PPT逐节' : item.type === 'discussion' ? 'Discussion' : item.type === 'audio' ? '课堂录音卡' : '课程说明';
        details.innerHTML = `<summary><span class="depth-lesson-type">${source}</span><strong>${mdEscape(item.title)}</strong>${item.extension ? '<em>课程延伸 · 此次八题未直接覆盖</em>' : ''}<i aria-hidden="true">⌄</i></summary><div class="depth-lesson-body"><p>展开后加载课堂原文与图片…</p></div>`;
        details.addEventListener('toggle', () => {
          if (!details.open || details.dataset.loaded) return;
          const body = details.querySelector('.depth-lesson-body');
          if (item.type === 'audio') {
            const lesson = item.lesson;
            body.innerHTML = `<div class="depth-audio-card"><p class="depth-audio-source">来源：${mdEscape(lesson.source)} · ${mdEscape(lesson.tag)}</p><h5>${mdEscape(lesson.title)} / ${mdEscape(lesson.zh)}</h5><p><b>先懂这一句：</b>${mdEscape(lesson.idea)}</p><p><b>English key:</b> ${mdEscape(lesson.english)}</p><div class="depth-audio-flow">${lesson.diagram.map((step) => `<span>${mdEscape(step)}</span>`).join('<i>→</i>')}</div><p><b>课堂案例：</b>${mdEscape(lesson.case)}</p><p><b>现在做：</b>${mdEscape(lesson.do)}</p></div>`;
          } else {
            body.innerHTML = `<div class="depth-original-note">${render7224Markdown(item.raw)}</div>`;
          }
          details.dataset.loaded = '1';
        });
        list.append(details);
      });
    });
    const intro = shell.querySelector('#foundation .depth-start');
    intro?.insertAdjacentHTML('beforeend', `<p class="depth-coverage">已归类：四章 PPT 的 ${noteCount} 个知识小节、${discussionCount} 个 Discussion 主题、${lectureCount} 张录音复盘卡，另含章节开篇、课程说明与综合自测。原始完整版仍在页尾。</p>`);
  } catch (error) {
    destinations.forEach((section) => {
      section.querySelector('.depth-classroom-count').textContent = '暂未加载';
      section.querySelector('.depth-classroom-items').innerHTML = '<p>课堂归类加载失败；请先到页尾「完整原资料」查看，不会丢失原文件。</p>';
    });
    console.error('IDAT7224 classroom classification:', error);
  }
};
