const app = document.getElementById("reviewApp");
let activeTab = "mistakes";
let mistakeFilter = "open";
let englishFilter = "open";
let definitionFilter = "open";
let englishSession = null;
let mistakeSession = null;
let definitionSession = null;
let definitionRepairRunning = false;
const reviewQaMode = new URLSearchParams(location.search).get("qa") === "1";

function esc(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function fmt(time) { return time ? new Date(time).toLocaleDateString("zh-CN") : ""; }
function normalize(value) { return String(value || "").trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ").replace(/[.!?]+$/, ""); }
function normalizeOutput(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trim().replace(/\s*([\[\]{}(),:;])\s*/g, "$1").replace(/\s+/g, " "))
    .join("\n")
    .trim()
    .toLowerCase();
}
function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function render() {
  const mistakes = ReviewStore.mistakes();
  const english = ReviewStore.english();
  const definitions = ReviewStore.definitions();
  const openMistakes = mistakes.filter((item) => !item.mastered).length;
  const openEnglish = english.filter((item) => !item.mastered).length;
  const dueEnglish = english.filter((item) => !item.nextReview || item.nextReview <= Date.now()).length;
  app.innerHTML = `
    <section class="review-stats">
      <article><b>${openMistakes}</b><span>待重做错题</span><small>${mistakes.length} 道累计</small></article>
      <article><b>${dueEnglish}</b><span>今日到期英语</span><small>${english.length} 条词库</small></article>
      <article><b>${definitions.filter((item) => !item.mastered).length}</b><span>待复习概念</span><small>${definitions.length} 条定义卡</small></article>
    </section>
    <div class="review-tabs" role="tablist">
      <button class="${activeTab === "mistakes" ? "on" : ""}" data-tab="mistakes">错题本 <span>${openMistakes}</span></button>
      <button class="${activeTab === "english" ? "on" : ""}" data-tab="english">英语复习 <span>${dueEnglish}</span></button>
      <button class="${activeTab === "definitions" ? "on" : ""}" data-tab="definitions">概念定义 <span>${definitions.filter((item) => !item.mastered).length}</span></button>
    </div>
    ${activeTab === "mistakes" ? renderMistakes(mistakes) : activeTab === "english" ? renderEnglish(english) : renderDefinitions(definitions)}`;
  bind();
}

const conceptGlossary = {
  algorithm: "一种解决问题的、步骤明确且有限的计算方法。",
  function: "把输入映射为输出的可复用代码单元；相同输入通常得到相同输出。",
  array: "按顺序保存多个元素的数据结构，通常要求元素类型相同。",
  tuple: "按顺序保存多个元素的不可变数据结构。",
  dictionary: "用 key-value（键值对）保存数据，适合按键快速查找。",
  set: "只保存不重复元素的集合，适合做成员判断和集合运算。",
  numpy: "Python 中用于高效数值计算和多维数组运算的库。",
  pandas: "Python 中用于表格数据读取、清洗、分析和处理的库。",
  dataframe: "Pandas 中类似电子表格的二维、带行列标签的数据结构。",
  series: "Pandas 中带标签的一维数据结构。",
  broadcasting: "NumPy 在形状兼容时，自动扩展较小数组以完成逐元素运算的规则。",
  "supervised learning": "使用带标签的训练数据，让模型学习输入与正确输出之间关系的方法。",
  "unsupervised learning": "使用没有人工标签的数据，寻找数据内部结构或模式的方法。",
  "reinforcement learning": "智能体通过与环境交互，根据奖励和惩罚学习行动策略的方法。",
  classification: "把样本分配到有限个离散类别中的预测任务。",
  regression: "预测连续数值的机器学习任务。",
  clustering: "在没有标签时，按照样本相似性自动分组的方法。",
  "decision tree": "通过一系列条件判断逐层划分数据，最后得到预测结果的模型。",
  "random forest": "组合多棵决策树并汇总它们结果的集成学习模型。",
  "support vector machine": "寻找能够最大化类别间隔的决策边界的监督学习模型。",
  "naive bayes": "基于 Bayes 定理并假设特征条件独立的概率分类模型。",
  precision: "预测为正类的样本中，真正属于正类的比例。",
  recall: "所有真正的正类样本中，被模型成功找出的比例。",
  "f1 score": "Precision 与 Recall 的调和平均值，用于综合衡量分类效果。",
  "confusion matrix": "按真实类别和预测类别统计分类结果的表格。",
  "expert system": "把领域知识和推理规则编码进程序，用来模拟专家决策的系统。",
  "forward chaining": "从已知事实出发，逐步应用规则推出新事实的推理方式。",
  "backward chaining": "从目标结论出发，反向寻找能够支持它的事实和规则的推理方式。",
  "heuristic function": "用经验或近似方法估计状态价值、帮助快速搜索的函数。",
  "association rule": "描述数据中项目共同出现关系的规则，常写成 X ⇒ Y。",
  apriori: "通过逐层扩展频繁项集来挖掘关联规则的算法。",
  "k-means": "通过反复分配样本并更新中心，把数据划分为 K 个簇的算法。"
};

function hasChinese(value) { return /[\u3400-\u9fff]/.test(String(value || "")); }

function autoChineseDefinition(term, definition) {
  const key = normalize(term);
  if (conceptGlossary[key]) return conceptGlossary[key];
  return "正在生成中文解释…";
}

async function translateDefinitionToChinese(term, definition) {
  const glossary = conceptGlossary[normalize(term)];
  if (glossary) return glossary;
  const source = String(definition || "").trim();
  if (!source) throw new Error("请填写 English definition");
  const url = `https://api.mymemory.translated.net/get?langpair=en|zh-CN&q=${encodeURIComponent(source)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`translation ${response.status}`);
  const data = await response.json();
  const translated = String(data?.responseData?.translatedText || "").trim();
  if (!translated || normalize(translated) === normalize(source) || !hasChinese(translated)) {
    throw new Error("translation did not return Chinese");
  }
  return translated;
}

async function repairDefinitionTranslations() {
  if (definitionRepairRunning) return;
  const items = ReviewStore.definitions();
  const pending = items.filter((item) => item.definition && (!hasChinese(item.chineseDefinition) || normalize(item.chineseDefinition) === normalize(item.definition)));
  if (!pending.length) return;
  definitionRepairRunning = true;
  let changed = false;
  for (const item of pending) {
    try {
      const chinese = await translateDefinitionToChinese(item.term, item.definition);
      changed = ReviewStore.updateDefinitionChinese(item.id, chinese) || changed;
    } catch (_) {
      // Never label the original English definition as a Chinese translation.
    }
  }
  definitionRepairRunning = false;
  if (changed) render();
}

function renderMistakes(items) {
  const shown = items.filter((item) => mistakeFilter === "all" || (mistakeFilter === "mastered" ? item.mastered : !item.mastered));
  const cards = shown.length ? shown.map((item) => {
    const sourceHref = item.setId ? `index.html?set=${encodeURIComponent(item.setId)}#${encodeURIComponent(item.questionId || "")}` : item.href || "index.html";
    const linkedQuestion = findMistakeQuestion(item);
    const figure = item.figure || linkedQuestion?.figure || linkedQuestion?.reference || "";
    return `
    <article class="review-card ${item.mastered ? "mastered" : ""}">
      <div class="review-card-head"><div><span class="review-source">${esc(item.source)}</span><span class="review-topic">${esc(item.topic)}</span></div><small>错过 ${item.times || 1} 次 · ${fmt(item.lastSeen)}</small></div>
      <h2>${esc(item.stem)}</h2>${item.code ? `<pre>${esc(item.code)}</pre>` : ""}${figure ? `<div class="review-figure">${figure}</div>` : ""}
      <div class="answer-compare"><p><b>你的答案</b>${esc(item.attempt || "未记录")}</p><p><b>正确答案</b>${esc(item.correct || "查看原卷解析")}</p></div>
      ${item.explain ? `<p class="review-explain">${esc(item.explain)}</p>` : ""}
      <div class="review-actions"><button class="retry-primary" data-action="retry-mistake" data-id="${esc(item.id)}">重做这题</button><a href="${esc(sourceHref)}">打开原练习</a><button data-action="toggle-mistake" data-id="${esc(item.id)}">${item.mastered ? "恢复到待重做" : "标记已掌握"}</button><button class="danger" data-action="remove-mistake" data-id="${esc(item.id)}">删除</button></div>
    </article>`;
  }).join("") : `<section class="review-empty"><b>这里暂时是空的</b><p>提交分类练习，或在原卷里把题目标为“部分/错”，题目会自动出现在这里。</p><a href="index.html">去刷题</a></section>`;
  const openShown = shown.filter((item) => !item.mastered).length;
  return `${renderMistakeSession(items)}<section class="review-toolbar"><div><h2>错题只保留真正需要重做的内容</h2><p>可以单题重做，也可以把当前待重做题目连续刷一遍。</p></div><div class="review-toolbar-actions"><button data-action="start-mistakes" ${openShown ? "" : "disabled"}>批量重刷 ${openShown ? `(${openShown})` : ""}</button><select id="mistakeFilter"><option value="open" ${mistakeFilter === "open" ? "selected" : ""}>待重做</option><option value="mastered" ${mistakeFilter === "mastered" ? "selected" : ""}>已掌握</option><option value="all" ${mistakeFilter === "all" ? "selected" : ""}>全部</option></select></div></section><section class="review-list">${cards}</section>`;
}

function findMistakeQuestion(item) {
  if (!item || typeof QUIZ_SETS === "undefined") return null;
  const set = QUIZ_SETS.find((entry) => entry.id === item.setId);
  return set?.questions.find((question) => question.id === item.questionId) || null;
}

function mistakeSessionItem(items) {
  if (!mistakeSession || mistakeSession.complete) return null;
  const id = mistakeSession.queue[mistakeSession.index];
  return items.find((item) => item.id === id) || null;
}

function startMistakeReview(onlyId) {
  const items = ReviewStore.mistakes();
  const queue = onlyId ? [onlyId] : items.filter((item) => !item.mastered).map((item) => item.id);
  if (!queue.length) return;
  mistakeSession = { queue, index:0, reviewed:0, correct:0, answered:false, result:null, selected:"", selectedIndex:null, expected:"", complete:false };
  render();
  document.getElementById("mistakeStudy")?.scrollIntoView({ behavior:"smooth", block:"center" });
}

function mistakeQuestionKind(question) {
  if (question?.choices) return "choice";
  if (question?.type === "output") return "output";
  return "self";
}

function renderMistakeSession(items) {
  if (!mistakeSession) return "";
  if (mistakeSession.complete) {
    const pct = mistakeSession.reviewed ? Math.round((mistakeSession.correct / mistakeSession.reviewed) * 100) : 0;
    return `<section class="mistake-session session-complete" id="mistakeStudy"><div class="complete-mark">✓</div><p class="kicker">RETRY COMPLETE</p><h2>本轮错题重刷完成</h2><p>完成 ${mistakeSession.reviewed} 题，掌握 ${mistakeSession.correct} 题，本轮正确率 ${pct}% 。答错的题仍留在待重做列表。</p><div class="session-actions"><button data-action="start-mistakes">再刷待重做题</button><button class="secondary" data-action="close-mistake-session">返回错题本</button></div></section>`;
  }
  const item = mistakeSessionItem(items);
  if (!item) return "";
  const question = findMistakeQuestion(item);
  const kind = mistakeQuestionKind(question);
  const stem = question?.stem || item.stem;
  const code = question?.code || item.code || "";
  const progress = Math.round(((mistakeSession.index + (mistakeSession.answered ? 1 : 0)) / mistakeSession.queue.length) * 100);
  let task = "";
  if (kind === "choice") {
    task = `<div class="mistake-choice-grid">${question.choices.map((choice, index) => {
      const correct = mistakeSession.answered && index === question.answer;
      const wrong = mistakeSession.answered && mistakeSession.selectedIndex === index && index !== question.answer;
      return `<button data-action="answer-mistake-choice" data-value="${index}" class="${correct ? "correct-choice" : wrong ? "wrong-choice" : ""}" ${mistakeSession.answered ? "disabled" : ""}><span>${String.fromCharCode(65 + index)}</span>${esc(choice)}</button>`;
    }).join("")}</div>`;
  } else {
    const placeholder = kind === "output" ? "Type the exact output" : "先写下你的答案，再与参考答案对照";
    task = `<form class="mistake-answer-form" data-mistake-form><textarea name="answer" rows="${kind === "output" ? 4 : 6}" placeholder="${placeholder}" ${mistakeSession.answered ? "disabled" : ""}>${mistakeSession.answered ? esc(mistakeSession.selected) : ""}</textarea><button ${mistakeSession.answered ? "disabled" : ""}>${kind === "output" ? "提交并判题" : "提交后核对"}</button></form>`;
  }
  let feedback = "";
  if (mistakeSession.answered) {
    const status = mistakeSession.result === true ? "right" : mistakeSession.result === false ? "wrong" : "self";
    const title = mistakeSession.result === true ? "答对了，已移到已掌握" : mistakeSession.result === false ? "这次还没答对" : "请对照参考答案自评";
    const actionButtons = mistakeSession.result === null
      ? `<button data-action="self-rate-mistake" data-value="correct">基本一致，算掌握</button><button class="secondary" data-action="self-rate-mistake" data-value="wrong">仍有遗漏，继续保留</button>`
      : `<button data-action="next-mistake">${mistakeSession.index + 1 >= mistakeSession.queue.length ? "完成本轮" : "下一题"}</button>${mistakeSession.result ? "" : `<button class="secondary" data-action="retry-current-mistake">再答一次</button>`}`;
    feedback = `<div class="mistake-feedback ${status}"><b>${title}</b><div class="retry-answer-compare"><p><small>你的答案</small>${esc(mistakeSession.selected || "未填写")}</p><p><small>正确 / 参考答案</small>${esc(mistakeSession.expected || item.correct || "请打开原练习查看")}</p></div>${item.explain || question?.explain ? `<p>${esc(question?.explain || item.explain)}</p>` : ""}<div class="mistake-feedback-actions">${actionButtons}</div></div>`;
  }
  return `<section class="mistake-session" id="mistakeStudy"><div class="session-head"><button class="session-close" data-action="close-mistake-session" aria-label="退出错题重刷">×</button><div><span>错题重刷 · ${esc(item.topic || item.source || "Review")}</span><b>${mistakeSession.index + 1} / ${mistakeSession.queue.length}</b></div><div class="session-progress"><i style="width:${progress}%"></i></div></div><div class="mistake-task"><h2>${esc(stem)}</h2>${code ? `<pre>${esc(code)}</pre>` : ""}${question?.figure ? `<div class="retry-figure">${question.figure}</div>` : ""}${task}${feedback}</div></section>`;
}

function answerMistake(value) {
  const item = mistakeSessionItem(ReviewStore.mistakes());
  const question = findMistakeQuestion(item);
  const kind = mistakeQuestionKind(question);
  mistakeSession.answered = true;
  if (kind === "choice") {
    mistakeSession.selectedIndex = Number(value);
    mistakeSession.selected = question.choices[mistakeSession.selectedIndex];
    mistakeSession.expected = question.choices[question.answer];
    mistakeSession.result = mistakeSession.selectedIndex === question.answer;
  } else if (kind === "output") {
    mistakeSession.selected = String(value || "");
    mistakeSession.expected = question.expect;
    mistakeSession.result = normalizeOutput(value) === normalizeOutput(question.expect);
  } else {
    mistakeSession.selected = String(value || "");
    mistakeSession.expected = item.correct || question?.model || "请打开原练习查看";
    mistakeSession.result = null;
  }
  if (mistakeSession.result === true && !reviewQaMode) ReviewStore.setMistakeMastered(item.id, true);
  render();
}

function rateMistake(correct) {
  const item = mistakeSessionItem(ReviewStore.mistakes());
  mistakeSession.result = correct;
  if (correct && !reviewQaMode) ReviewStore.setMistakeMastered(item.id, true);
  render();
}

function nextMistake() {
  mistakeSession.reviewed += 1;
  if (mistakeSession.result === true) mistakeSession.correct += 1;
  mistakeSession.index += 1;
  mistakeSession.answered = false;
  mistakeSession.result = null;
  mistakeSession.selected = "";
  mistakeSession.selectedIndex = null;
  mistakeSession.expected = "";
  if (mistakeSession.index >= mistakeSession.queue.length) mistakeSession.complete = true;
  render();
  document.getElementById("mistakeStudy")?.scrollIntoView({ behavior:"smooth", block:"center" });
}

function nextReviewText(item) {
  if (!item.nextReview || item.nextReview <= Date.now()) return "现在复习";
  const hours = Math.ceil((item.nextReview - Date.now()) / 3600000);
  return hours < 24 ? `${hours} 小时后` : `${Math.ceil(hours / 24)} 天后`;
}

function levelDots(item) {
  const level = Number(item.reviewLevel || 0);
  return `<span class="memory-level" aria-label="记忆等级 ${level} / 5">${[1,2,3,4,5].map((n) => `<i class="${n <= level ? "on" : ""}"></i>`).join("")}</span>`;
}

function renderEnglish(items) {
  const stats = ReviewStore.englishStats();
  const due = items.filter((item) => !item.nextReview || item.nextReview <= Date.now());
  const progress = Math.min(100, Math.round((stats.todayCount / stats.dailyGoal) * 100));
  const disabled = items.length ? "" : "disabled";
  const shown = items.filter((item) => englishFilter === "all" || (englishFilter === "mastered" ? item.mastered : !item.mastered));
  const cards = shown.length ? shown.map((item) => `
    <article class="english-card ${item.mastered ? "mastered" : ""}">
      <div class="english-card-meta"><div><span class="review-source">${esc({word:"单词",phrase:"词组",sentence:"句子"}[item.kind] || "英语")}</span><span class="reason-tag">${esc({spelling:"拼写错误",forget:"记不住",both:"拼写＋记忆"}[item.reason] || "记不住")}</span></div><span class="due-chip">${nextReviewText(item)}</span></div>
      <h2>${esc(item.text)}</h2><p class="meaning">${esc(item.meaning || "还没写中文提示")}</p>${item.note ? `<p class="review-explain">${esc(item.note)}</p>` : ""}
      <div class="memory-row">${levelDots(item)}<small>复习 ${item.reviewCount || 0} 次 · 连对 ${item.correctStreak || 0} 次</small></div>
      <div class="review-actions"><button data-action="quick-review" data-id="${esc(item.id)}">单独复习</button><button data-action="toggle-english" data-id="${esc(item.id)}">${item.mastered ? "恢复复习" : "直接标记会了"}</button><button class="danger" data-action="remove-english" data-id="${esc(item.id)}">删除</button></div>
    </article>`).join("") : `<section class="review-empty"><b>这个清单暂时是空的</b><p>在下方手动添加，或在练习题里选中英文后点击“加入英语本”。</p></section>`;
  return `
    <section class="english-coach">
      <div class="coach-copy"><p class="kicker">5-MINUTE REVIEW</p><h2>今天先复习 ${due.length || Math.min(items.length, 5)} 条</h2><p>系统会把答错的内容更快送回来，把熟悉的内容逐步拉开间隔。不要反复看答案，要先回忆再检查。</p></div>
      <div class="daily-ring" style="--progress:${progress * 3.6}deg"><div><b>${stats.todayCount}</b><small>/ ${stats.dailyGoal} 今日目标</small></div></div>
      <div class="coach-stats"><span><b>${stats.streak}</b> 天连续</span><span><b>${stats.xp}</b> XP</span><span><b>${due.length}</b> 条到期</span></div>
      <div class="study-modes">
        <button class="primary-mode" data-action="start-english" data-mode="smart" ${disabled}><b>开始智能复习</b><small>自动混合题型 · 约 5 分钟</small></button>
        <button data-action="start-english" data-mode="choice" ${disabled}><b>看中文选英文</b><small>快速辨认</small></button>
        <button data-action="start-english" data-mode="spelling" ${disabled}><b>拼写回忆</b><small>完整默写</small></button>
        <button data-action="start-english" data-mode="cloze" ${disabled}><b>句子填空</b><small>放回语境</small></button>
      </div>
    </section>
    ${renderEnglishSession(items)}
    <details class="english-entry" open><summary><span><b>＋ 收集新的英语</b><small>单词、词组或完整句子</small></span></summary><div class="entry-body"><div><p class="kicker">QUICK CAPTURE</p><h2>记下一条不会的英语</h2><p>先收集，再通过上面的复习模式真正记住。</p></div><form id="englishForm"><textarea name="text" rows="2" placeholder="English word / phrase / sentence" required></textarea><input name="meaning" placeholder="中文意思或提示（建议填写）" /><div class="form-row"><select name="kind"><option value="word">单词</option><option value="phrase">词组</option><option value="sentence">句子</option></select><select name="reason"><option value="spelling">总是拼错</option><option value="forget">记不住意思</option><option value="both">拼写和意思都不稳</option></select></div><input name="note" placeholder="自己的记忆方法或例句（可选）" /><button type="submit">加入英语本</button></form></div></details>
    <section class="review-toolbar"><div><h2>我的英语词库</h2><p>记忆等级越高，下一次出现得越晚；已掌握的内容仍会间隔复现。</p></div><select id="englishFilter"><option value="open" ${englishFilter === "open" ? "selected" : ""}>学习中</option><option value="mastered" ${englishFilter === "mastered" ? "selected" : ""}>已掌握</option><option value="all" ${englishFilter === "all" ? "selected" : ""}>全部</option></select></section><section class="english-list">${cards}</section>`;
}

function sessionItem(items) {
  if (!englishSession || englishSession.complete) return null;
  const id = englishSession.queue[englishSession.index];
  return items.find((item) => item.id === id) || null;
}

function definitionSessionItem(items) {
  if (!definitionSession || definitionSession.complete) return null;
  const id = definitionSession.queue[definitionSession.index];
  return items.find((item) => item.id === id) || null;
}

function renderDefinitions(items) {
  const due = items.filter((item) => !item.nextReview || item.nextReview <= Date.now());
  const shown = items.filter((item) => definitionFilter === "all" || (definitionFilter === "mastered" ? item.mastered : !item.mastered));
  const cards = shown.length ? shown.map((item) => `
    <article class="english-card definition-card ${item.mastered ? "mastered" : ""}">
      <div class="english-card-meta"><div><span class="review-source">概念定义</span><span class="reason-tag">Bilingual card</span></div><span class="due-chip">${nextReviewText(item)}</span></div>
      <h2>${esc(item.term)}</h2>
      <div class="definition-en"><b>English definition</b>${esc(item.definition)}</div>
      <div class="definition-zh"><b>中文解释 · 自动生成</b>${esc(item.chineseDefinition || autoChineseDefinition(item.term, item.definition))}</div>
      ${item.example ? `<p class="definition-example"><b>Example</b> ${esc(item.example)}</p>` : ""}
      <div class="memory-row">${levelDots(item)}<small>复习 ${item.reviewCount || 0} 次 · 连对 ${item.correctStreak || 0} 次</small></div>
      <div class="review-actions"><button data-action="quick-definition" data-id="${esc(item.id)}">单独测试</button><button data-action="toggle-definition" data-id="${esc(item.id)}">${item.mastered ? "恢复复习" : "标记已掌握"}</button><button class="danger" data-action="remove-definition" data-id="${esc(item.id)}">删除</button></div>
    </article>`).join("") : `<section class="review-empty"><b>还没有概念定义卡</b><p>只输入英文词汇和英文定义，系统会自动生成中文解释并加入复习队列。</p></section>`;
  return `
    <section class="english-coach definition-coach">
      <div class="coach-copy"><p class="kicker">CONCEPT MEMORY</p><h2>用英文定义理解专业概念</h2><p>先看英文定义回忆术语，再根据反馈安排间隔复习。中文解释只作为理解支架，不替代英文定义。</p></div>
      <div class="coach-stats"><span><b>${due.length}</b> 条今日到期</span><span><b>${items.length}</b> 张定义卡</span><span><b>${items.filter((item) => item.mastered).length}</b> 条已掌握</span></div>
      <div class="definition-route" aria-label="概念定义复习流程"><div><b>01</b><span>Read</span><small>读 English definition</small></div><i>→</i><div><b>02</b><span>Recall</span><small>回忆 English term</small></div><i>→</i><div><b>03</b><span>Review</span><small>按熟练度复习</small></div></div>
      <button class="primary-mode" data-action="start-definitions" ${items.length ? "" : "disabled"}><b>开始概念测试</b><small>看英文定义，写出 English term</small></button>
    </section>
    ${renderDefinitionSession(items)}
    <details class="english-entry definition-entry" open><summary><span><b>＋ 添加概念定义</b><small>只填写 English term + English definition</small></span></summary><div class="entry-body"><div><p class="kicker">BILINGUAL CONCEPT CARD</p><h2>建立一张可复习的定义卡</h2><p>保存时会调用 MyMemory 免费翻译接口生成中文解释；翻译失败时不会把英文原文冒充成中文。</p></div><form id="definitionForm"><input name="term" placeholder="English term, e.g. Precision" required /><textarea name="definition" rows="4" placeholder="English definition, e.g. The proportion of predicted positives that are truly positive." required></textarea><input name="example" placeholder="Example / formula (optional)" /><button type="submit">生成中文并保存</button></form></div></details>
    <section class="review-toolbar"><div><h2>我的概念定义库</h2><p>每张卡包含术语、英文定义、自动中文解释和可重复测试。</p></div><select id="definitionFilter"><option value="open" ${definitionFilter === "open" ? "selected" : ""}>学习中</option><option value="mastered" ${definitionFilter === "mastered" ? "selected" : ""}>已掌握</option><option value="all" ${definitionFilter === "all" ? "selected" : ""}>全部</option></select></section><section class="english-list definition-list">${cards}</section>`;
}

function startDefinitionReview(onlyId) {
  const items = ReviewStore.definitions();
  const due = items.filter((item) => !item.nextReview || item.nextReview <= Date.now());
  const source = onlyId ? items.filter((item) => item.id === onlyId) : shuffle(due.length ? due : items).slice(0, 10);
  const queue = source.map((item) => item.id);
  if (!queue.length) return;
  definitionSession = { queue, index:0, reviewed:0, correct:0, answered:false, result:false, selected:"", expected:"", complete:false };
  render(); document.getElementById("definitionStudy")?.scrollIntoView({ behavior:"smooth", block:"center" });
}

function renderDefinitionSession(items) {
  if (!definitionSession) return "";
  if (definitionSession.complete) {
    const pct = definitionSession.reviewed ? Math.round((definitionSession.correct / definitionSession.reviewed) * 100) : 0;
    return `<section class="study-session session-complete" id="definitionStudy"><div class="complete-mark">✓</div><p class="kicker">CONCEPT TEST COMPLETE</p><h2>概念测试完成</h2><p>完成 ${definitionSession.reviewed} 张卡，首次答对 ${definitionSession.correct} 张，正确率 ${pct}% 。</p><div class="session-actions"><button data-action="start-definitions">再来一轮</button><button class="secondary" data-action="close-definition-session">返回概念定义</button></div></section>`;
  }
  const item = definitionSessionItem(items); if (!item) return "";
  const progress = Math.round(((definitionSession.index + (definitionSession.answered ? 1 : 0)) / definitionSession.queue.length) * 100);
  const task = `<p class="study-prompt">Read the English definition and recall the term</p><div class="definition-test-prompt">${esc(item.definition)}</div><form class="recall-form" data-definition-form><input name="answer" value="${definitionSession.answered ? esc(definitionSession.selected) : ""}" autocomplete="off" spellcheck="false" placeholder="Type the English term" ${definitionSession.answered ? "disabled" : ""} /><button ${definitionSession.answered ? "disabled" : ""}>Check</button></form>`;
  const feedback = definitionSession.answered ? `<div class="study-feedback ${definitionSession.result ? "right" : "wrong"}"><b>${definitionSession.result ? "答对了" : "先记住这个术语"}</b><p><strong>${esc(item.term)}</strong></p><p class="definition-zh-inline">${esc(item.chineseDefinition || autoChineseDefinition(item.term, item.definition))}</p><div><button data-action="rate-definition" data-quality="again">Again</button><button data-action="rate-definition" data-quality="hard">Hard</button><button data-action="rate-definition" data-quality="good">Good</button></div></div>` : "";
  return `<section class="study-session" id="definitionStudy"><div class="session-head"><button class="session-close" data-action="close-definition-session" aria-label="退出概念测试">×</button><div><span>概念定义测试</span><b>${definitionSession.index + 1} / ${definitionSession.queue.length}</b></div><div class="session-progress"><i style="width:${progress}%"></i></div></div><div class="study-task">${task}${feedback}</div></section>`;
}

function answerDefinition(value) {
  const item = definitionSessionItem(ReviewStore.definitions());
  if (!item) return;
  definitionSession.answered = true; definitionSession.selected = String(value || ""); definitionSession.expected = item.term; definitionSession.result = normalize(value) === normalize(item.term); render();
}

function rateDefinition(quality) {
  const id = definitionSession.queue[definitionSession.index];
  ReviewStore.recordDefinitionReview(id, quality);
  definitionSession.reviewed += 1; if (definitionSession.result) definitionSession.correct += 1;
  definitionSession.index += 1; definitionSession.answered = false; definitionSession.result = false; definitionSession.selected = ""; definitionSession.expected = "";
  if (definitionSession.index >= definitionSession.queue.length) definitionSession.complete = true;
  render(); document.getElementById("definitionStudy")?.scrollIntoView({ behavior:"smooth", block:"center" });
}

function clozeFor(item) {
  const words = String(item.text).split(/\s+/);
  if (words.length < 2) return null;
  let index = 0;
  words.forEach((word, i) => { if (word.replace(/[^A-Za-z'-]/g, "").length > words[index].replace(/[^A-Za-z'-]/g, "").length) index = i; });
  const answer = words[index].replace(/^[^A-Za-z]+|[^A-Za-z'-]+$/g, "");
  if (!answer) return null;
  const display = [...words]; display[index] = "________";
  return { display:display.join(" "), answer };
}

function effectiveMode(item, items) {
  let mode = englishSession.mode;
  if (mode === "smart") {
    if ((item.kind === "sentence" || item.kind === "phrase") && clozeFor(item)) mode = "cloze";
    else if (item.reason === "spelling" || item.reason === "both") mode = "spelling";
    else mode = englishSession.index % 2 ? "choice" : "flash";
  }
  if (mode === "cloze" && !clozeFor(item)) mode = "spelling";
  const choicePool = items.filter((entry) => entry.id !== item.id && entry.text && entry.meaning);
  if (mode === "choice" && choicePool.length < 2) mode = "flash";
  return mode;
}

function choiceOptions(item, items) {
  if (englishSession.options[item.id]) return englishSession.options[item.id];
  const others = shuffle(items.filter((entry) => entry.id !== item.id && entry.text && entry.meaning)).slice(0, 3).map((entry) => entry.text);
  const options = shuffle([item.text, ...others]);
  englishSession.options[item.id] = options;
  return options;
}

function renderEnglishSession(items) {
  if (!englishSession) return "";
  if (englishSession.complete) {
    const pct = englishSession.reviewed ? Math.round((englishSession.correct / englishSession.reviewed) * 100) : 0;
    return `<section class="study-session session-complete" id="englishStudy"><div class="complete-mark">✓</div><p class="kicker">SESSION COMPLETE</p><h2>这一轮完成了</h2><p>复习 ${englishSession.reviewed} 条，首次答对 ${englishSession.correct} 条，正确率 ${pct}% 。答错内容已经安排更早再次出现。</p><div class="session-actions"><button data-action="start-english" data-mode="smart">再来一轮</button><button class="secondary" data-action="close-session">返回词库</button></div></section>`;
  }
  const item = sessionItem(items); if (!item) return "";
  const mode = effectiveMode(item, items);
  const modeName = {flash:"闪卡回忆",choice:"中文选英文",spelling:"拼写回忆",cloze:"语境填空"}[mode];
  const progress = Math.round(((englishSession.index + (englishSession.answered ? 1 : 0)) / englishSession.queue.length) * 100);
  let task = "";
  if (mode === "flash") task = `<p class="study-prompt">先根据提示在脑中说出英文</p><h3>${esc(item.meaning || item.note || "回忆这条英语的含义和用法")}</h3>${englishSession.answered ? `<div class="revealed-answer"><b>${esc(item.text)}</b><span>${esc(item.note || item.meaning || "")}</span></div>` : `<button class="reveal-button" data-action="reveal-answer">显示答案</button>`}`;
  if (mode === "choice") task = `<p class="study-prompt">选择最符合中文提示的英文</p><h3>${esc(item.meaning || item.note || "选择正确英文")}</h3><div class="choice-grid">${choiceOptions(item, items).map((option) => `<button data-action="choose-answer" data-value="${esc(option)}" ${englishSession.answered ? "disabled" : ""} class="${englishSession.answered && normalize(option) === normalize(item.text) ? "correct-choice" : englishSession.selected === option ? "wrong-choice" : ""}">${esc(option)}</button>`).join("")}</div>`;
  if (mode === "spelling") task = `<p class="study-prompt">不要偷看词库，根据提示完整写出英文</p><h3>${esc(item.meaning || item.note || `${item.kind === "word" ? "单词" : "英语"}拼写`)}</h3><form class="recall-form" data-study-form><input name="answer" value="${englishSession.answered ? esc(englishSession.selected) : ""}" autocomplete="off" spellcheck="false" placeholder="Type the English answer" ${englishSession.answered ? "disabled" : ""} /><button ${englishSession.answered ? "disabled" : ""}>检查</button></form>`;
  if (mode === "cloze") { const cloze = clozeFor(item); task = `<p class="study-prompt">把缺少的单词填回原句</p><h3 class="cloze-sentence">${esc(cloze.display)}</h3><p class="cloze-hint">${esc(item.meaning || item.note || "根据上下文完成句子")}</p><form class="recall-form" data-study-form data-answer="${esc(cloze.answer)}"><input name="answer" value="${englishSession.answered ? esc(englishSession.selected) : ""}" autocomplete="off" spellcheck="false" placeholder="Missing word" ${englishSession.answered ? "disabled" : ""} /><button ${englishSession.answered ? "disabled" : ""}>检查</button></form>`; }
  const feedback = englishSession.answered ? `<div class="study-feedback ${englishSession.result ? "right" : "wrong"}"><b>${englishSession.result ? "答对了" : "还没记牢"}</b><p>${englishSession.result ? "选择下面的真实感受，系统会安排下次复习。" : `正确答案：${esc(englishSession.expected || item.text)}`}</p><div>${englishSession.result ? `<button data-action="rate-answer" data-quality="hard">有点吃力</button><button data-action="rate-answer" data-quality="good">答得很稳</button>` : `<button data-action="rate-answer" data-quality="again">尽快再练</button><button data-action="rate-answer" data-quality="hard">只是粗心</button>`}</div></div>` : "";
  return `<section class="study-session" id="englishStudy"><div class="session-head"><button class="session-close" data-action="close-session" aria-label="退出复习">×</button><div><span>${modeName}</span><b>${englishSession.index + 1} / ${englishSession.queue.length}</b></div><div class="session-progress"><i style="width:${progress}%"></i></div></div><div class="study-task">${task}${feedback}</div></section>`;
}

function buildQueue(items, onlyId) {
  if (onlyId) return [onlyId];
  const due = items.filter((item) => !item.nextReview || item.nextReview <= Date.now());
  const source = due.length ? due : [...items].sort((a, b) => Number(a.reviewLevel || 0) - Number(b.reviewLevel || 0));
  return shuffle(source).slice(0, 10).map((item) => item.id);
}

function startEnglish(mode, onlyId) {
  const queue = buildQueue(ReviewStore.english(), onlyId); if (!queue.length) return;
  englishSession = { mode, queue, index:0, reviewed:0, correct:0, answered:false, result:false, selected:"", expected:"", options:{}, complete:false };
  render(); document.getElementById("englishStudy")?.scrollIntoView({ behavior:"smooth", block:"center" });
}

function answerSession(value, expected) {
  englishSession.answered = true; englishSession.selected = value; englishSession.expected = expected;
  englishSession.result = normalize(value) === normalize(expected); render();
}

function rateSession(quality) {
  const id = englishSession.queue[englishSession.index]; ReviewStore.recordEnglishReview(id, quality);
  englishSession.reviewed += 1; if (englishSession.result) englishSession.correct += 1;
  englishSession.index += 1; englishSession.answered = false; englishSession.result = false; englishSession.selected = ""; englishSession.expected = "";
  if (englishSession.index >= englishSession.queue.length) englishSession.complete = true;
  render(); document.getElementById("englishStudy")?.scrollIntoView({ behavior:"smooth", block:"center" });
}

function bind() {
  app.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => { activeTab = button.dataset.tab; englishSession = null; mistakeSession = null; definitionSession = null; render(); }));
  document.getElementById("mistakeFilter")?.addEventListener("change", (event) => { mistakeFilter = event.target.value; render(); });
  document.getElementById("englishFilter")?.addEventListener("change", (event) => { englishFilter = event.target.value; render(); });
  document.getElementById("definitionFilter")?.addEventListener("change", (event) => { definitionFilter = event.target.value; render(); });
  document.getElementById("englishForm")?.addEventListener("submit", (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); ReviewStore.addEnglish({ text:data.get("text"), meaning:data.get("meaning"), kind:data.get("kind"), reason:data.get("reason"), note:data.get("note") }); render(); });
  document.getElementById("definitionForm")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const button = form.querySelector("button[type=submit]");
    const data = new FormData(form);
    const term = String(data.get("term") || "").trim();
    const definition = String(data.get("definition") || "").trim();
    if (button) { button.disabled = true; button.textContent = "正在生成中文…"; }
    try {
      const chineseDefinition = await translateDefinitionToChinese(term, definition);
      ReviewStore.addDefinition({ term, definition, chineseDefinition, example:data.get("example") });
      render();
    } catch (_) {
      window.alert("暂时无法生成中文解释，请检查网络连接后重试。英文定义不会被当作中文保存。");
      if (button) { button.disabled = false; button.textContent = "生成中文并保存"; }
    }
  });
  app.querySelector("[data-mistake-form]")?.addEventListener("submit", (event) => { event.preventDefault(); answerMistake(new FormData(event.currentTarget).get("answer")); });
  app.querySelector("[data-study-form]")?.addEventListener("submit", (event) => { event.preventDefault(); const item = sessionItem(ReviewStore.english()); const expected = event.currentTarget.dataset.answer || item.text; answerSession(new FormData(event.currentTarget).get("answer"), expected); });
  app.querySelector("[data-definition-form]")?.addEventListener("submit", (event) => { event.preventDefault(); answerDefinition(new FormData(event.currentTarget).get("answer")); });
  app.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => act(button)));
  if (englishSession && !englishSession.answered) app.querySelector("[data-study-form] input")?.focus();
}

function act(button) {
  const id = button.dataset.id; const action = button.dataset.action;
  if (action === "retry-mistake") startMistakeReview(id);
  if (action === "start-mistakes") startMistakeReview();
  if (action === "close-mistake-session") { mistakeSession = null; render(); }
  if (action === "answer-mistake-choice") answerMistake(button.dataset.value);
  if (action === "self-rate-mistake") rateMistake(button.dataset.value === "correct");
  if (action === "next-mistake") nextMistake();
  if (action === "retry-current-mistake") { mistakeSession.answered = false; mistakeSession.result = null; mistakeSession.selected = ""; mistakeSession.selectedIndex = null; mistakeSession.expected = ""; render(); }
  if (action === "toggle-mistake") { const item = ReviewStore.mistakes().find((x) => x.id === id); ReviewStore.setMistakeMastered(id, !item.mastered); render(); }
  if (action === "remove-mistake") { ReviewStore.removeMistake(id); render(); }
  if (action === "toggle-english") { const item = ReviewStore.english().find((x) => x.id === id); ReviewStore.setEnglishMastered(id, !item.mastered); render(); }
  if (action === "remove-english") { ReviewStore.removeEnglish(id); render(); }
  if (action === "toggle-definition") { const item = ReviewStore.definitions().find((x) => x.id === id); ReviewStore.setDefinitionMastered(id, !item.mastered); render(); }
  if (action === "remove-definition") { ReviewStore.removeDefinition(id); render(); }
  if (action === "start-definitions") startDefinitionReview();
  if (action === "quick-definition") startDefinitionReview(id);
  if (action === "close-definition-session") { definitionSession = null; render(); }
  if (action === "rate-definition") rateDefinition(button.dataset.quality);
  if (action === "start-english") startEnglish(button.dataset.mode || "smart");
  if (action === "quick-review") startEnglish("smart", id);
  if (action === "close-session") { englishSession = null; render(); }
  if (action === "reveal-answer") { englishSession.answered = true; englishSession.result = true; englishSession.expected = sessionItem(ReviewStore.english()).text; render(); }
  if (action === "choose-answer") answerSession(button.dataset.value, sessionItem(ReviewStore.english()).text);
  if (action === "rate-answer") rateSession(button.dataset.quality);
}

render();
repairDefinitionTranslations();
