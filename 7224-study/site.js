const pageNames = {
  home: "Beginner Outline / 小白提纲",
  notes: "Full Course Notes / 完整讲义",
  plan: "Audio-reviewed sprint / 录音复盘冲刺",
  practice: "English Question Bank / 英文题库",
  special: "Discussion & Assignments / 讨论作业",
  playbook: "Exam Playbook / 应试手册"
};
let currentFilter = "all";

const interactionStyle = document.createElement("style");
interactionStyle.textContent = ".answer-label{display:block;color:#475569;font-weight:750;font-size:13px;margin:12px 0 5px}.answer-box{display:block;width:100%;min-height:92px;resize:vertical;border:1px solid #cbd5e1;border-radius:10px;padding:10px 12px;font:14px/1.6 system-ui,-apple-system,Segoe UI,sans-serif;margin-bottom:9px}.answer-box:focus{outline:2px solid #93c5fd;border-color:#2563eb}.self-check{display:none;margin:8px 0;padding:9px 11px;border-radius:8px;font-size:13px}.self-check.good,.self-check.warn{display:block}.self-check.good{background:#ecfdf5;color:#047857}.self-check.warn{background:#fff7ed;color:#c2410c}.source-open,.assignment-open{margin:5px 4px 5px 0}.source-reader{margin-top:16px}.source-doc{max-height:760px;overflow:auto}.source-doc details{background:#fff}.source-doc p{margin:8px 0}";
document.head.appendChild(interactionStyle);

function go(id) {
  document.querySelectorAll(".page").forEach(x => x.classList.remove("show"));
  document.getElementById(id).classList.add("show");
  document.querySelectorAll(".nav button").forEach(x => x.classList.toggle("active", x.dataset.page === id));
  document.getElementById("crumb").textContent = pageNames[id];
  window.scrollTo(0, 0);
  if (id === "notes" && !window.notesLoaded) loadNotes();
  if (id === "special") renderDiscussionList();
  if (id === "plan") renderAudioSprint();
}

document.querySelectorAll("[data-page]").forEach(b => b.addEventListener("click", () => go(b.dataset.page)));
document.querySelectorAll("[data-goto]").forEach(b => b.addEventListener("click", () => go(b.dataset.goto)));
document.querySelectorAll("[data-filter-jump]").forEach(b => b.addEventListener("click", () => {
  go("practice");
  filterQuestions(b.dataset.filterJump);
}));

const filterDefs = [
  ["all","All"],["day1","Day 1"],["day2","Day 2"],["day3","Day 3"],
  ["ch1","Ch 1"],["ch2","Ch 2"],["ch3","Ch 3"],["ch4","Ch 4"],
  ["discussion","Discussion"],["assignment","Assignments"],
  ["calc","Numerical"],["concept","Conceptual"],["transfer","Transfer"],["Hard","Hard"]
];

document.getElementById("filters").innerHTML = filterDefs.map((f,i) =>
  '<button data-filter="' + f[0] + '" class="' + (i === 0 ? "active" : "") + '">' + f[1] + '</button>'
).join("");
document.getElementById("filters").addEventListener("click", e => {
  if (e.target.dataset.filter) filterQuestions(e.target.dataset.filter, e.target);
});
document.getElementById("qSearch").addEventListener("input", e => renderQuestions(currentFilter, e.target.value));

function questionTags(q) {
  const style = q.t === "calc" ? "hot" : (q.t === "transfer" || q.t === "essay" ? "purple" : "");
  return '<span class="tag ' + style + '">' + q.c.toUpperCase() + '</span>' +
    '<span class="tag">' + q.t + '</span><span class="tag">' + q.lv + '</span>';
}

function renderQuestions(filter, search) {
  currentFilter = filter || "all";
  const term = (search || "").toLowerCase();
  const list = EXAM_QUESTIONS.filter(q =>
    (currentFilter === "all" || q.c === currentFilter || q.d === currentFilter || q.t === currentFilter || q.lv === currentFilter) &&
    (!term || q.q.toLowerCase().includes(term) || q.a.toLowerCase().includes(term))
  );
  document.getElementById("qCount").textContent = "Showing " + list.length + " of " + EXAM_QUESTIONS.length + " questions";
  document.getElementById("questions").innerHTML = list.map(q =>
    '<article class="q"><div><span class="qid">' + q.id + '</span> ' + questionTags(q) +
    '</div><b>' + q.q + '</b><label class="answer-label">Your answer / 你的英文答案</label><textarea class="answer-box" data-qid="' + q.id + '" placeholder="Write your answer in English. Show steps for numerical questions."></textarea><div><button class="action submit-answer">Submit & check</button> <button class="action reveal">Show reference answer</button></div><div class="self-check"></div><div class="answer">' + q.a + '</div></article>'
  ).join("");
  document.querySelectorAll(".reveal").forEach(b => b.addEventListener("click", () => b.parentElement.nextElementSibling.nextElementSibling.classList.toggle("show")));
  document.querySelectorAll(".submit-answer").forEach(b => b.addEventListener("click", () => {
    const article = b.closest(".q"), box = article.querySelector(".answer-box"), feedback = article.querySelector(".self-check");
    if (!box.value.trim()) { feedback.textContent = "Write at least a definition, a mechanism, and an example before checking."; feedback.className = "self-check warn"; return; }
    localStorage.setItem("idat7224-answer-" + box.dataset.qid, box.value);
    feedback.textContent = "Saved. Now reveal the reference answer and compare: definition → mechanism → example → limitation/units.";
    feedback.className = "self-check good";
  }));
  document.querySelectorAll(".answer-box").forEach(box => { const saved = localStorage.getItem("idat7224-answer-" + box.dataset.qid); if (saved) box.value = saved; });
}

function filterQuestions(filter, button) {
  document.querySelectorAll("#filters button").forEach(x => x.classList.remove("active"));
  const target = button || document.querySelector('[data-filter="' + filter + '"]');
  if (target) target.classList.add("active");
  document.getElementById("qSearch").value = "";
  renderQuestions(filter);
}

function renderDiscussionList() {
  const list = EXAM_QUESTIONS.filter(q => q.c === "discussion");
  document.getElementById("discussionPreview").innerHTML =
    "<h2>D1-D8 checklist</h2>" + list.map(q => "<p><b>" + q.id + ".</b> " + q.q + "</p>").join("");
  const source = document.querySelector("#special .source");
  if (!source.dataset.readerReady) {
    source.dataset.readerReady = "1";
    source.innerHTML = '<h2>Readable local sources</h2><p class="muted">资料会在本网页内打开，避免浏览器直接显示 Markdown 原文造成乱码或难以阅读。</p><button class="action source-open" data-file="04-Discussion考点.md">Discussion重点 / 讨论重点</button><button class="action source-open" data-file="02-习题.md">46道习题</button><button class="action source-open" data-file="03-答案.md">完整答案</button><button class="action assignment-open">作业资料索引</button>';
    const reader = document.createElement("div"); reader.id = "sourceReader"; reader.className = "card source-reader"; reader.innerHTML = '<h2>Local source reader</h2><p class="muted">选择上面的资料后，这里会显示整理后的内容。</p>'; source.parentElement.after(reader);
    source.parentElement.addEventListener("click", async e => {
      const file = e.target.dataset.file;
      if (file) {
        const box = document.getElementById("sourceReader"); box.innerHTML = '<h2>Loading…</h2>';
        try { const res = await fetch(file); if (!res.ok) throw new Error(res.status); box.innerHTML = '<h2>' + file + '</h2><div class="doc source-doc">' + renderMarkdown(await res.text()) + '</div>'; }
        catch (_) { box.innerHTML = '<div class="call">Could not read this local source. <a href="' + file + '">Open source file</a></div>'; }
        box.scrollIntoView({behavior:"smooth",block:"start"});
      }
      if (e.target.classList.contains("assignment-open")) {
        document.getElementById("sourceReader").innerHTML = '<h2>Assignment materials / 作业资料索引</h2><p>建议优先复习下列英文作业主题，并回到题库做 A1-A6 迁移题：</p><ul><li><a target="_blank" href="../作业/IDAT7224_Assignment1_Multiple_Robotic_Arms_EN.docx">Multiple robotic arms in surgery</a></li><li><a target="_blank" href="../作业/Brainstorm Discuss Technological Improvements for Safer Smarter and Smoother Nose Picking Service-ZhouYuan.pdf">Safer, smarter and smoother robotic service</a></li><li><a target="_blank" href="../作业/IDAT7224_Feelings_Essay_EN.docx">Can a machine learn and generate feelings?</a></li><li><a target="_blank" href="../作业/IDAT7224_ReLU_Essay_EN.docx">Why ReLU is widely used</a></li><li><a target="_blank" href="../作业/IDAT7224_Survive_Essay_EN_short.docx">How to remain employable as AI changes work</a></li></ul><div class="call">作答框架：Definition → Mechanism → Course example → Limitation / risk.</div>';
        document.getElementById("sourceReader").scrollIntoView({behavior:"smooth",block:"start"});
      }
    });
  }
}

function renderAudioSprint() {
  if (!document.getElementById("audio-layout-style")) { const s = document.createElement("style"); s.id = "audio-layout-style"; s.textContent = ".sprint-guide{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:16px 0}.sprint-guide>div{background:#eff6ff;border:1px solid #bfdbfe;border-radius:13px;padding:14px}.sprint-guide b{display:block;color:#1d4ed8}.sprint-guide span{display:block;font-size:13px;margin-top:5px}.audio-alert{border-left-color:#7c3aed;background:#f5f3ff}.lesson-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:18px}.lesson-card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:18px;box-shadow:0 5px 18px #0f172a0a}.lesson-head{display:flex;gap:11px;align-items:flex-start}.lesson-head h2{font-size:19px;margin:0 0 2px}.lesson-head h3{font-size:15px;margin:0 0 7px;color:var(--muted);font-weight:650}.lesson-no{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:#172554;color:#fff;font-weight:850;font-size:17px;flex:0 0 auto}.lesson-image{width:100%;height:150px;object-fit:contain;background:#f8fafc;border:1px solid var(--line);border-radius:12px;margin:13px 0}.beginner-note{background:#fff7ed;border-left:4px solid var(--orange);padding:10px 12px;border-radius:8px}.mini-diagram{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin:13px 0}.mini-diagram span{flex:1;min-width:78px;text-align:center;background:#eef2ff;border:1px solid #c7d2fe;color:#3730a3;padding:8px 6px;border-radius:9px;font-size:12px;font-weight:750}.mini-diagram i{color:#2563eb;font-style:normal;font-weight:900}.case-box{background:#ecfdf5;border-left:4px solid var(--green);padding:10px 12px;border-radius:8px;margin:10px 0}.do-box{background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px;padding:10px 12px}.route-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.route-day h2{font-size:20px;margin-top:8px}.route-day p{min-height:74px}@media(max-width:800px){.sprint-guide,.route-grid{grid-template-columns:1fr}}"; document.head.appendChild(s); }
  const plan = document.getElementById("plan");
  if (plan.dataset.audioReady) return;
  plan.dataset.audioReady = "1";
  plan.innerHTML = '<div class="hero"><h1>Audio-reviewed sprint</h1><p>先按课堂顺序听懂，再按题型练会。每张卡都用“知识点 → 示意图 → 案例 → 迁移任务”来学习。</p></div>'
    + '<div class="call audio-alert"><b>录音复盘提示：</b>' + AUDIO_EXAM_NOTE.body + '<br><span class="muted">Audio transcripts are auto-generated. Use the official announcement for the final date.</span></div>'
    + '<div class="sprint-guide"><div><b>Step 1 · Understand</b><span>读中英解释，看图，遮住答案复述。</span></div><div><b>Step 2 · Apply</b><span>先做卡片案例，再做同类英文题。</span></div><div><b>Step 3 · Transfer</b><span>换数字、换场景，仍能写出步骤。</span></div></div>'
    + '<h2 class="section-title">按课堂顺序 / Class sequence</h2><div class="lesson-grid">'
    + AUDIO_LESSONS.map(x => '<article class="lesson-card"><div class="lesson-head"><span class="lesson-no">' + x.no + '</span><div><h2>' + x.title + '</h2><h3>' + x.zh + '</h3><span class="tag">' + x.chapters + '</span></div></div><img class="lesson-image" src="' + x.image + '" alt="' + x.zh + '"><p class="beginner-note"><b>先懂这一句 / Beginner idea:</b> ' + x.idea + '</p><p><b>English key:</b> ' + x.english + '</p><div class="mini-diagram">' + x.diagram.map((d, j) => '<span>' + d + '</span>' + (j < x.diagram.length - 1 ? '<i>→</i>' : '')).join('') + '</div><div class="case-box"><b>Case / 案例</b><br>' + x.case + '</div><p class="do-box"><b>Do now / 现在做：</b> ' + x.do + '</p><small class="muted">Reviewed from: ' + x.source + '</small></article>').join('')
    + '</div><h2 class="section-title">三天路线 / Three-day route</h2><div class="route-grid"><article class="card route-day"><span class="tag hot">DAY 1 · FOUNDATION</span><h2>先会算：Ch 1–3</h2><p>AI/ML/DL 地图 → neuron → z、activation、loss → gradient → scaling、softmax。</p><button class="action" data-filter-jump="day1">Practice Day 1 →</button></article><article class="card route-day"><span class="tag purple">DAY 2 · SEQUENCES</span><h2>再会讲：Ch 4</h2><p>sequence → n-gram → RNN/BPTT → vanishing gradient → LSTM/GRU → Q/K/V attention。</p><button class="action" data-filter-jump="day2">Practice Day 2 →</button></article><article class="card route-day"><span class="tag green">DAY 3 · EXAM MODE</span><h2>最后会做：discussion + transfer</h2><p>遮住卡片复述，完成 Discussion/Assignment 题，最后做限时混合练习并整理错因。</p><button class="action" data-filter-jump="day3">Practice Day 3 →</button></article></div>';
  plan.querySelectorAll("[data-filter-jump]").forEach(b => b.addEventListener("click", () => { go("practice"); filterQuestions(b.dataset.filterJump); }));
}

function escapeInline(s) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1">');
}

function renderMarkdown(src) {
  const lines = src.replace(/\r/g,"").split("\n");
  let out = "", paragraph = [], table = [], open = false, code = false;
  const fence = String.fromCharCode(96,96,96);
  const flush = () => {
    if (paragraph.length) { out += "<p>" + escapeInline(paragraph.join(" ")) + "</p>"; paragraph = []; }
    if (table.length) { out += '<div class="md-table">' + table.map(escapeInline).join("\n") + "</div>"; table = []; }
  };
  const close = () => { flush(); if (open) { out += "</div></details>"; open = false; } };
  for (const line of lines) {
    if (line.startsWith(fence)) { flush(); code = !code; out += code ? "<pre>" : "</pre>"; continue; }
    if (code) { out += escapeInline(line) + "\n"; continue; }
    const heading = line.match(/^(#{2,3})\s+(.+)/);
    if (heading) { close(); out += "<details><summary>" + escapeInline(heading[2]) + '</summary><div class="body">'; open = true; continue; }
    if (/^#\s+/.test(line)) { close(); out += "<h2>" + escapeInline(line.replace(/^#\s+/,"")) + "</h2>"; continue; }
    if (line.startsWith("|")) { flush(); table.push(line); continue; }
    if (!line.trim()) { flush(); continue; }
    if (/^[-*]\s+/.test(line)) { flush(); out += "<p>• " + escapeInline(line.replace(/^[-*]\s+/,"")) + "</p>"; continue; }
    if (/^!\[/.test(line)) { flush(); out += escapeInline(line); continue; }
    paragraph.push(line);
  }
  close();
  return out;
}

async function loadNotes() {
  const box = document.getElementById("fullNotes");
  try {
    const response = await fetch("01-复习资料.md");
    if (!response.ok) throw new Error(response.status);
    box.innerHTML = renderMarkdown(await response.text());
    window.notesLoaded = true;
  } catch (error) {
    box.innerHTML = '<div class="call">Could not load notes. <a href="01-复习资料.md">Open the source file.</a></div>';
  }
}

document.getElementById("noteSearch").addEventListener("input", e => {
  const term = e.target.value.toLowerCase().trim();
  document.querySelectorAll("#fullNotes details").forEach(d => {
    const hit = !term || d.textContent.toLowerCase().includes(term);
    d.style.display = hit ? "block" : "none";
    if (term && hit) d.open = true;
  });
});

renderQuestions("all");
if (document.getElementById("plan")) renderAudioSprint();
