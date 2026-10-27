const app = document.getElementById("reviewApp");
let activeTab = "mistakes";
let mistakeFilter = "open";
let englishFilter = "open";

function esc(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function fmt(time) {
  return time ? new Date(time).toLocaleDateString("zh-CN") : "";
}

function render() {
  const mistakes = ReviewStore.mistakes();
  const english = ReviewStore.english();
  const openMistakes = mistakes.filter((item) => !item.mastered).length;
  const openEnglish = english.filter((item) => !item.mastered).length;
  app.innerHTML = `
    <section class="review-stats">
      <article><b>${openMistakes}</b><span>待重做错题</span><small>${mistakes.length} 道累计</small></article>
      <article><b>${openEnglish}</b><span>待记英语</span><small>${english.length} 条累计</small></article>
      <article><b>${mistakes.filter((item) => item.mastered).length + english.filter((item) => item.mastered).length}</b><span>已掌握</span><small>随时可以恢复</small></article>
    </section>
    <div class="review-tabs" role="tablist">
      <button class="${activeTab === "mistakes" ? "on" : ""}" data-tab="mistakes">错题本 <span>${openMistakes}</span></button>
      <button class="${activeTab === "english" ? "on" : ""}" data-tab="english">英语本 <span>${openEnglish}</span></button>
    </div>
    ${activeTab === "mistakes" ? renderMistakes(mistakes) : renderEnglish(english)}`;
  bind();
}

function renderMistakes(items) {
  const shown = items.filter((item) => mistakeFilter === "all" || (mistakeFilter === "mastered" ? item.mastered : !item.mastered));
  const cards = shown.length ? shown.map((item) => `
    <article class="review-card ${item.mastered ? "mastered" : ""}">
      <div class="review-card-head"><div><span class="review-source">${esc(item.source)}</span><span class="review-topic">${esc(item.topic)}</span></div><small>错过 ${item.times || 1} 次 · ${fmt(item.lastSeen)}</small></div>
      <h2>${esc(item.stem)}</h2>
      ${item.code ? `<pre>${esc(item.code)}</pre>` : ""}
      <div class="answer-compare"><p><b>你的答案</b>${esc(item.attempt || "未记录")}</p><p><b>正确答案</b>${esc(item.correct || "查看原卷解析")}</p></div>
      ${item.explain ? `<p class="review-explain">${esc(item.explain)}</p>` : ""}
      <div class="review-actions"><a href="${esc(item.href || "index.html")}">重新练习</a><button data-action="toggle-mistake" data-id="${esc(item.id)}">${item.mastered ? "恢复到待重做" : "标记已掌握"}</button><button class="danger" data-action="remove-mistake" data-id="${esc(item.id)}">删除</button></div>
    </article>`).join("") : `<section class="review-empty"><b>这里暂时是空的</b><p>提交分类练习，或在原卷里把题目标为“部分/错”，题目会自动出现在这里。</p><a href="index.html">去刷题</a></section>`;
  return `<section class="review-toolbar"><div><h2>错题只保留真正需要重做的内容</h2><p>答对后标记掌握，列表会自动移到历史记录。</p></div><select id="mistakeFilter"><option value="open" ${mistakeFilter === "open" ? "selected" : ""}>待重做</option><option value="mastered" ${mistakeFilter === "mastered" ? "selected" : ""}>已掌握</option><option value="all" ${mistakeFilter === "all" ? "selected" : ""}>全部</option></select></section><section class="review-list">${cards}</section>`;
}

function renderEnglish(items) {
  const shown = items.filter((item) => englishFilter === "all" || (englishFilter === "mastered" ? item.mastered : !item.mastered));
  const cards = shown.length ? shown.map((item) => `
    <article class="english-card ${item.mastered ? "mastered" : ""}">
      <div><span class="review-source">${esc({word:"单词",phrase:"词组",sentence:"句子"}[item.kind] || "英语")}</span><span class="reason-tag">${esc({spelling:"拼写错误",forget:"记不住",both:"拼写＋记忆"}[item.reason] || "记不住")}</span></div>
      <h2>${esc(item.text)}</h2><p class="meaning">${esc(item.meaning || "还没写中文提示")}</p>${item.note ? `<p class="review-explain">${esc(item.note)}</p>` : ""}
      <small>记录 ${item.times || 1} 次 · ${fmt(item.lastSeen)}</small>
      <div class="review-actions"><button data-action="spell" data-id="${esc(item.id)}">默写检查</button><button data-action="toggle-english" data-id="${esc(item.id)}">${item.mastered ? "恢复复习" : "标记会了"}</button><button class="danger" data-action="remove-english" data-id="${esc(item.id)}">删除</button></div>
      <div class="spell-box" data-spell-box="${esc(item.id)}" hidden><input type="text" placeholder="遮住上面的英文，在这里默写" /><button data-action="check-spell" data-id="${esc(item.id)}">检查</button><p></p></div>
    </article>`).join("") : `<section class="review-empty"><b>英语本还是空的</b><p>在下方手动添加，或在练习题里选中英文后点击“加入英语本”。</p></section>`;
  return `
    <section class="english-entry"><div><p class="kicker">QUICK CAPTURE</p><h2>记下一条不会的英语</h2><p>不必整理得很完美，先收集，之后再默写。</p></div><form id="englishForm"><textarea name="text" rows="2" placeholder="English word / phrase / sentence" required></textarea><input name="meaning" placeholder="中文意思或提示（可选）" /><div class="form-row"><select name="kind"><option value="word">单词</option><option value="phrase">词组</option><option value="sentence">句子</option></select><select name="reason"><option value="spelling">总是拼错</option><option value="forget">记不住意思</option><option value="both">拼写和意思都不稳</option></select></div><input name="note" placeholder="自己的记忆方法或例句（可选）" /><button type="submit">加入英语本</button></form></section>
    <section class="review-toolbar"><div><h2>英语复习清单</h2><p>用“默写检查”快速验证，不要只盯着答案看。</p></div><select id="englishFilter"><option value="open" ${englishFilter === "open" ? "selected" : ""}>待复习</option><option value="mastered" ${englishFilter === "mastered" ? "selected" : ""}>已掌握</option><option value="all" ${englishFilter === "all" ? "selected" : ""}>全部</option></select></section><section class="english-list">${cards}</section>`;
}

function bind() {
  app.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => { activeTab = button.dataset.tab; render(); }));
  document.getElementById("mistakeFilter")?.addEventListener("change", (event) => { mistakeFilter = event.target.value; render(); });
  document.getElementById("englishFilter")?.addEventListener("change", (event) => { englishFilter = event.target.value; render(); });
  document.getElementById("englishForm")?.addEventListener("submit", (event) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    ReviewStore.addEnglish({ text:data.get("text"), meaning:data.get("meaning"), kind:data.get("kind"), reason:data.get("reason"), note:data.get("note") }); render();
  });
  app.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => act(button)));
}

function act(button) {
  const id = button.dataset.id;
  if (button.dataset.action === "toggle-mistake") { const item = ReviewStore.mistakes().find((x) => x.id === id); ReviewStore.setMistakeMastered(id, !item.mastered); render(); }
  if (button.dataset.action === "remove-mistake") { ReviewStore.removeMistake(id); render(); }
  if (button.dataset.action === "toggle-english") { const item = ReviewStore.english().find((x) => x.id === id); ReviewStore.setEnglishMastered(id, !item.mastered); render(); }
  if (button.dataset.action === "remove-english") { ReviewStore.removeEnglish(id); render(); }
  if (button.dataset.action === "spell") { const box = app.querySelector(`[data-spell-box="${CSS.escape(id)}"]`); box.hidden = !box.hidden; if (!box.hidden) box.querySelector("input").focus(); }
  if (button.dataset.action === "check-spell") {
    const item = ReviewStore.english().find((x) => x.id === id); const box = button.closest(".spell-box");
    const normal = (value) => String(value).trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ");
    const ok = normal(box.querySelector("input").value) === normal(item.text);
    box.querySelector("p").textContent = ok ? "✓ 拼写正确，可以标记会了。" : `还不对。正确写法：${item.text}`;
    box.classList.toggle("ok", ok); box.classList.toggle("bad", !ok);
  }
}

render();
