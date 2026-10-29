const COURSE_7224_LESSONS = [
  {no:"01",title:"AI foundations and the course map",zh:"AI 基础与整门课地图",source:"deep learning1-1 / deep learning1-2",tag:"Chapter 1 · Discussion focus",idea:"先把 AI、机器学习、深度学习、AI agent 放进同一张地图。深度学习是一套用数据学习参数的方法。",english:"AI is the broad field; machine learning learns patterns from data; deep learning uses layered neural networks; an AI agent can plan and act toward a goal.",diagram:["Data / 数据","Model / 模型","Prediction / 预测","Action / 行动"],case:"给 agent 发送“整理邮箱”的任务：它可能读取、分类甚至删除邮件。因此要限制权限、检查结果、保留 human-in-the-loop。",do:"用 30 秒解释 AI → ML → DL 的包含关系，并写出 agent 的 goal、tool、permission、feedback。"},
  {no:"02",title:"One neuron: the smallest learning unit",zh:"单个神经元：模型如何算一次预测",source:"深度学习2",tag:"Chapter 2 · Discussion + numerical",idea:"把神经元想成“加权评分器”：重要特征权重大，bias 是整体偏移，activation 决定是否输出。",english:"A neuron computes z = Σwᵢxᵢ + b, then applies an activation y = f(z). Weights describe feature importance; bias shifts the threshold.",diagram:["x₁,x₂ / features","× w₁,w₂ / weights","Σ + b","f(z) → y"],case:"用 color、sweetness 预测 apple quality：color=0.7、sweetness=0.6 代表两项贡献不同；先算 z，再过 activation。",do:"计算题先写 z，再写 y，再代入题目指定的 loss；不要跳过 bias 或 activation。"},
  {no:"03",title:"How a network learns its weights",zh:"多层网络：从错误反推参数",source:"深度学习3",tag:"Chapter 2 · Mechanism",idea:"训练反复经历：预测 → 算误差 → 找出每个参数对误差的贡献 → 更新参数。",english:"Forward propagation produces a prediction. The loss measures error. Backpropagation uses gradients to update weights and bias in the direction that reduces loss.",diagram:["Forward: x → ŷ","Loss: ŷ vs y","Backward: ∂L/∂w","Update: w ← w − ηg"],case:"如果模型把 target=4 预测成 6，训练会根据 loss 和 gradient 调整 w、b；learning rate 太大可能越过最低点，太小则学得慢。",do:"用方向检查答案：梯度告诉你 loss 增长方向，更新式前面的减号要让 loss 下降。"},
  {no:"04",title:"From one neuron to a useful network",zh:"从一个神经元到多层网络",source:"深度学习4",tag:"Chapter 3 · Case study + numerical",idea:"多个神经元可以学不同特征；hidden layer 重新组合输入，非线性 activation 让模型能画出弯曲的决策边界。",english:"A multilayer network composes simple transformations. Scaling keeps features comparable; hidden units learn intermediate representations; softmax turns scores into class probabilities.",diagram:["Raw features","Hidden features","Class scores","Softmax probabilities"],case:"苹果分类：颜色和甜度量纲不同，先 scaling；多个 hidden neurons 学不同组合；最后用 softmax 比较 apple/orange/other。",do:"看到 softmax 先检查概率是否加总为 1；看到 scaling 先确认定义。"},
  {no:"05",title:"Sequence data: order changes meaning",zh:"序列数据：顺序本身就是信息",source:"深度学习5",tag:"Chapter 4 · Sequence models",idea:"句子、时间序列、语音必须按顺序读；词相同但顺序不同，意义也可能不同。",english:"A sequence is ordered data. N-gram uses a fixed window; RNN carries a hidden state from earlier steps; training through time can suffer from vanishing or exploding gradients.",diagram:["x₁ → h₁","x₂ → h₂","x₃ → h₃","… → output"],case:"机器翻译中，前面的 subject 影响后面的 pronoun。RNN 把过去压进 hidden state，但长距离信息可能逐渐消失。",do:"先指出 order matters，再比较 n-gram 固定窗口与 RNN hidden state 的优缺点。"},
  {no:"06",title:"Gates, attention and Transformer",zh:"门控、注意力与 Transformer",source:"深度学习5",tag:"Chapter 4 · Discussion focus",idea:"LSTM/GRU 用 gate 决定记住什么、忘掉什么；attention 直接选择当前最相关的信息。",english:"LSTM and GRU control information flow with gates. Attention assigns larger weights to relevant tokens. Transformer uses self-attention and positional information, enabling parallel training.",diagram:["Tokens","Q: question","K: relevance","V: information","Weighted output"],case:"“The cat sat because it was tired”中，attention 应把 it 与 cat 联系起来；Q、K 决定关注谁，V 提供被取出的信息。",do:"区分 Q 是我在找什么，K 是 token 的标签，V 是拿走的信息；说明 positional encoding 为什么需要。"}
];

window.render7224Study = function () {
  const shell = document.querySelector(".study-shell");
  if (!shell) return;
  shell.classList.add("course-7224-study");
  shell.innerHTML = `<main class="study-content course-switch-content"><section class="study-hero beginner-hero"><div><p class="eyebrow">IDAT7224 · DEEP LEARNING</p><h1>从课堂录音到考试得分</h1><p>按录音课堂顺序学习：先懂人话解释，再看示意图、案例，最后做迁移练习。每张卡都对应一类可能的考试问法。</p></div><div class="big-picture"><div class="picture-step"><b>① Understand</b><span>看懂概念</span><small>中英对照</small></div><i>→</i><div class="picture-step"><b>② Apply</b><span>算案例</span><small>公式与步骤</small></div><i>→</i><div class="picture-step"><b>③ Transfer</b><span>举一反三</span><small>换数字、换场景</small></div></div></section><section class="exam-brief course-note"><div><span>6</span><b>课堂顺序</b><small>Audio-reviewed</small></div><div><span>4</span><b>章节主线</b><small>AI → NN → Sequence</small></div><div><span>2</span><b>重点题型</b><small>Concept + Numerical</small></div><div><span>∞</span><b>迁移练习</b><small>换场景仍会做</small></div><p>录音是自动转写稿；考试日期与最终范围仍以 Moodle 官方通知为准。Lecture 5 提到期中顺延一周，并将 10 月 23 日用于复习。</p></section><section class="section-block" id="class-sequence"><div class="section-title"><div><p class="eyebrow">CLASS SEQUENCE</p><h2>按课堂顺序的知识卡</h2></div><p>学习动作：先遮住英文解释复述，再做案例，最后点击 Practice 查看对应题库入口。</p></div><div class="course-card-grid">${COURSE_7224_LESSONS.map((x) => `<article class="concept-card course-lesson-card"><header><span>${x.no}</span><div><h3>${x.title}</h3><p>${x.zh}</p></div></header><em class="course-tag">${x.tag}</em><p class="plain"><b>先懂这一句 / Beginner idea:</b> ${x.idea}</p><p class="plain"><b>English key:</b> ${x.english}</p><div class="course-diagram">${x.diagram.map((d,i) => `<span>${d}</span>${i<x.diagram.length-1?'<i>→</i>':''}`).join("")}</div><div class="case"><b>Case / 案例</b><br>${x.case}</div><div class="exam-move"><b>Do now / 现在做</b>${x.do}</div><small class="course-source">Reviewed from: ${x.source}</small></article>`).join("")}</div></section><section class="section-block" id="exam"><div class="section-title"><div><p class="eyebrow">THREE-DAY ROUTE</p><h2>三天冲刺路线</h2></div></div><div class="sprint-grid"><article><span>DAY 1 · FOUNDATION</span><h3>Ch 1–3：先会算</h3><p>AI/ML/DL → neuron → z、activation、loss → gradient → scaling、softmax。</p><a href="index.html?course=7224">Practice 目前待补充 →</a></article><article><span>DAY 2 · SEQUENCES</span><h3>Ch 4：再会讲</h3><p>sequence → n-gram → RNN/BPTT → vanishing gradient → LSTM/GRU → Q/K/V attention。</p><a href="index.html?course=7224">Practice 目前待补充 →</a></article><article><span>DAY 3 · EXAM MODE</span><h3>Discussion + transfer</h3><p>遮住卡片复述，整理老师 Discussion 与作业，再用 Definition → Mechanism → Example → Limitation 作答。</p><a href="papers.html?course=7224">Papers 目前待补充 →</a></article></div></section></main>`;
  load7224Materials();
};

function mdEscape(text) {
  return String(text).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function mdAttr(text) {
  return mdEscape(text).replace(/"/g,"&quot;");
}

function mdInline(text) {
  let out = mdEscape(text);
  out = out.replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>");
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, path) => {
    const normalized = path.replaceAll("\\\\","/").replace(/^\.?\//,"");
    if (/^slides\/ch\d{2}\/p\d{3}\.jpg$/i.test(normalized) && window.render7224SlideAnnotation) return window.render7224SlideAnnotation(normalized, alt);
    return `<img loading="lazy" src="7224-study/${mdAttr(normalized)}" alt="${mdAttr(alt)}">`;
  });
  return out;
}

function renderAIEvolutionTimeline() {
  const stages = [
    ["01","The Early Vision","早期愿景","1950s–1970s","Turing Test","1956 Dartmouth Conference"],
    ["02","The Rise of Expert Systems","专家系统兴起","1980s","Expert knowledge","模仿人类专家进行判断"],
    ["03","The Machine Learning Era","机器学习时代","1990s–2010s","Data-driven learning","从手写规则转向从数据学习"],
    ["04","The Deep Learning Revolution","深度学习革命","2012s–2025s","Neural networks","多层网络推动视觉、语言等突破"],
    ["05","The Future of AI","人工智能未来","2026–Present","Generative · Ethical · AGI","生成式AI、伦理AI与通用人工智能愿景"]
  ];
  return `<section class="ai-evolution-visual" aria-label="AI evolution timeline"><div class="ai-definition-card"><span>AI ≠ 只会“制造智能机器”</span><h4>Artificial Intelligence / 人工智能</h4><p>AI 是结合计算机科学、数学、认知科学与工程应用的交叉学科。Machine Learning 从数据学习规律，Deep Learning 使用多层神经网络形成更复杂的表示。</p><div><b>AI</b><i>包含</i><b>Machine Learning</b><i>包含</i><b>Deep Learning</b></div></div><div class="ai-timeline-head"><div><small>CH 1 · SLIDE 9</small><h4>Evolution of AI / 人工智能演进</h4></div><p>从“机器能否思考”到数据驱动、深度学习，再走向生成式与负责任的 AI。</p></div><div class="ai-timeline-track">${stages.map(([no,en,zh,time,key,desc],index)=>`<article style="--step:${index}"><span class="ai-stage-no">${no}</span><time>${time}</time><h5>${en}</h5><strong>${zh}</strong><em>${key}</em><p>${desc}</p></article>`).join('<i class="ai-timeline-arrow">→</i>')}</div></section>`;
}

function render7224Markdown(source) {
  const lines = source.replace(/\r/g,"").split("\n");
  let html = "", paragraph = [], list = [], table = [], open = false;
  const renderTable = (rows) => {
    const cells = rows.map((row) => row.replace(/^\s*\|\s?|\s*\|\s*$/g, "").split("|").map((cell) => cell.trim()));
    if (!cells.length) return "";
    const header = cells[0];
    const body = cells.slice(1).filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell)));
    const comparison = header.includes("函数") && header.includes("公式与范围");
    const colgroup = comparison ? '<colgroup><col class="function-col"><col class="usage-col"><col class="formula-col"><col class="pros-col"><col class="cons-col"></colgroup>' : "";
    return `<div class="material-table-wrap${comparison ? " comparison-table-wrap" : ""}" role="region" aria-label="${mdAttr(header.join("、"))}" tabindex="0"><table class="material-table${comparison ? " material-table-comparison" : ""}">${colgroup}<thead><tr>${header.map((cell) => `<th scope="col">${mdInline(cell)}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${header.map((_, index) => `<td>${mdInline(row[index] || "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  };
  const flushText = () => {
    if (paragraph.length) { html += `<p>${mdInline(paragraph.join(" "))}</p>`; paragraph = []; }
    if (list.length) { html += `<ul>${list.map((x) => `<li>${mdInline(x)}</li>`).join("")}</ul>`; list = []; }
  };
  const flushTable = () => {
    if (table.length) { html += renderTable(table); table = []; }
  };
  const flush = () => { flushText(); flushTable(); };
  const close = () => { flush(); if (open) { html += "</div></details>"; open = false; } };
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)/), h3 = line.match(/^###\s+(.+)/), h1 = line.match(/^#\s+(.+)/);
    if (line.trim() === "[[AI_EVOLUTION_TIMELINE]]") { flush(); html += renderAIEvolutionTimeline(); continue; }
    if (h2) { close(); html += `<details class="material-section"><summary>${mdInline(h2[1])}</summary><div class="material-body">`; open = true; continue; }
    if (h3) { flush(); html += `<h3>${mdInline(h3[1])}</h3>`; continue; }
    if (h1) { close(); html += `<h2>${mdInline(h1[1])}</h2>`; continue; }
    if (/^\s*---\s*$/.test(line)) { flush(); html += "<hr>"; continue; }
    if (line.trim().startsWith("|")) { flushText(); table.push(line); continue; }
    if (/^\s*[-*]\s+/.test(line)) { flush(); list.push(line.replace(/^\s*[-*]\s+/,"")); continue; }
    if (/^!\[[^\]]*\]\([^)]+\)\s*$/.test(line)) { flush(); html += mdInline(line); continue; }
    if (!line.trim()) { flush(); continue; }
    paragraph.push(line);
  }
  close();
  return html;
}

async function load7224Materials() {
  const shell = document.querySelector(".course-7224-study");
  if (!shell || document.getElementById("course-materials")) return;
  const section = document.createElement("section");
  section.className = "section-block course-materials";
  section.id = "course-materials";
  section.innerHTML = `<div class="section-title"><div><p class="eyebrow">COMPLETE MATERIAL LIBRARY</p><h2>完整资料、Discussion 与答案</h2></div><p>这部分是从 7224 原复习应用迁移的完整资料，不只保留摘要。章节默认收起，按需展开即可。</p></div><div class="material-tabs">${[["01-复习资料.md","完整四章资料 / Full notes"],["04-Discussion考点.md","Discussion重点"],["02-习题.md","46道习题"],["03-答案.md","完整答案"]].map(([file,label],i)=>`<button type="button" class="material-tab${i===0?" on":""}" data-material="${file}">${label}</button>`).join("")}</div><div id="materialViewer" class="material-viewer"><p>Loading complete course material…</p></div>`;
  (shell.querySelector("#exam") || shell.querySelector("#pitfalls"))?.after(section);
  const viewer = section.querySelector("#materialViewer");
  async function openMaterial(file, button) {
    section.querySelectorAll(".material-tab").forEach((x) => x.classList.toggle("on", x === button));
    viewer.innerHTML = `<p>Loading ${file}…</p>`;
    try {
      const response = await fetch(`7224-study/${file}?v=8`, { cache: "no-store" });
      if (!response.ok) throw new Error(response.status);
      viewer.innerHTML = `<div class="material-meta"><b>${file}</b><span>已迁移原始资料 · 图片支持懒加载</span></div><div class="material-doc">${render7224Markdown(await response.text())}</div>`;
    } catch (error) {
      viewer.innerHTML = `<div class="exam-move">资料加载失败：${file}。请确认本地服务器已重新加载 7215 应用目录。</div>`;
    }
  }
  section.querySelectorAll(".material-tab").forEach((button) => button.addEventListener("click", () => openMaterial(button.dataset.material, button)));
  openMaterial("01-复习资料.md", section.querySelector(".material-tab"));
}
