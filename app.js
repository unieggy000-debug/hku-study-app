const storeKey = "idat7215-midterm-quiz-v2";
const runtimeParams = new URLSearchParams(location.search);
const qaMode = runtimeParams.get("qa") === "1";
const cache = new Map();
const gloss = {
  compiler: "编译器。运行前把整个源程序译成机器码。",
  interpreter: "解释器。执行时一行一行翻译。",
  compilation: "编译。把源程序整个翻译成机器码。",
  source: "源程序。程序员写下的代码。",
  object: "目标程序。编译器的输出，扩展名通常是 .obj。",
  executable: "可执行程序。链接之后能直接运行的文件，通常是 .exe。",
  linker: "链接器。把各模块和库接到一起。",
  library: "库。现成的代码集合，程序可以调用它。",
  libraries: "库，library 的复数。",
  syntax: "语法。代码写法是否符合语言规则。",
  "syntax error": "语法错误。文法写错，程序还没真正跑起来就失败。",
  logical: "逻辑上的。程序能跑完，但结果不对。",
  "logical error": "逻辑错误。能运行结束，但结果是错的。",
  "run-time": "运行时。程序正在执行的那段时间。",
  "run-time error": "运行时错误。跑起来才崩溃，例如除以零。",
  runtime: "运行时。",
  mutable: "可变的。创建之后还能改内容。",
  immutable: "不可变的。创建之后不能改内容。",
  ordered: "有序的。元素有固定先后位置。",
  unordered: "无序的。不保证元素的位置顺序。",
  tuple: "元组。有序、不可变，用圆括号写。",
  list: "列表。有序、可变，用方括号写。",
  set: "集合。元素不重复，无序，可变。",
  dictionary: "字典。用键取出对应的值。",
  slice: "切片。按起点、终点、步长取出一段。",
  slicing: "切片操作。起点包含，终点不包含。",
  index: "下标，索引。从 0 开始数位置。",
  indexing: "用下标取元素。",
  keyword: "关键字参数。调用时写出参数名，例如 a=5。",
  positional: "位置参数。按定义顺序传值，不写参数名。",
  argument: "参数，传给函数的值。",
  append: "在列表末尾加一个元素。加进去的列表不会被拆开。",
  extend: "把另一个列表里的元素逐个接上来。",
  division: "除法。",
  float: "浮点数，带小数的数。",
  remainder: "余数。% 算出来的那个数。",
  axis: "轴。二维数组里 axis 0 是顺着行往下，axis 1 是顺着列往右。",
  reshape: "改变数组的形状，元素个数不变。",
  broadcasting: "广播。把形状不同的数组拉伸后再逐个运算。",
  "fancy indexing": "花式索引。用一组下标一次取出多个不连续的元素。",
  concatenate: "按已有维度拼接，拼完维度数不变。",
  stack: "堆叠。拼完会多出一个新维度。",
  label: "标签。Pandas 里你自己起的行名或列名。",
  precision: "精确率。预测成正类的里面，有多少真的是正类。TP / (TP + FP)。",
  recall: "召回率。真正的正类里面，找出了多少。TP / (TP + FN)。",
  accuracy: "准确率。全部预测里对了多少。(TP + TN) / 全部。",
  overfitting: "过拟合。模型记住了训练数据的偏差，而不是真正的规律。",
  imbalanced: "不平衡的。某一类样本比另一类多很多。",
  "training set": "训练集。用来让模型学习的数据。",
  "test set": "测试集。用来检查模型准确率的数据，不参与训练。",
  validation: "验证。用来估计模型效果、再调整训练的那一份数据。",
  "cross-validation": "交叉验证。轮流把不同的一份数据留出来做验证。",
  supervised: "有监督的。训练数据带有标签。",
  unsupervised: "无监督的。训练数据没有标签。",
  reinforcement: "强化学习。靠行动后的反馈改进策略。",
  heuristic: "启发式。对「离目标还剩多远」的估计。",
  "breadth-first": "广度优先。一层走完再走下一层。",
  "depth-first": "深度优先。先沿着一条分支走到底。",
  "depth-limited": "深度限制。深度优先，但超过设定深度就不再往下。",
  "iterative deepening": "迭代加深。深度上限一轮比一轮大。",
  chaining: "链式推理。把一条条 IF-THEN 规则连起来。",
  "forward chaining": "正向链。从已知数据推向结论。",
  "backward chaining": "反向链。从想证明的结论往回找条件。",
  "expert system": "专家系统。用规则模仿专家做判断的程序。",
  shallow: "浅层的。这里指缺少因果知识。",
  causal: "因果的。关于原因和结果的。",
  endpoint: "终点。区间里最后那个数。",
  scalar: "标量。单独一个数，不是数组。",
  module: "模块。程序被拆开的一块。",
  reference: "引用。一处代码指向另一处代码或库。",
  duplicate: "重复的元素。",
  unique: "唯一的，不重复的。",
  membership: "成员关系。某个元素在不在这个集合里。",
  submit: "交卷。",
  lecture: "课件里的一讲。",
  final: "期末考试。",
  array: "数组。同一类型元素排成的表，可有多个维度。",
  dimension: "维度。数组有几层。",
  element: "元素。数组或列表里的一项。",
  column: "列。",
  row: "行。",
  goal: "目标状态。搜索要到达的状态。",
  node: "节点。搜索树或图上的一个状态。",
  expand: "扩展。把一个节点的下一步全部生成出来。",
  path: "路径。从起点走到当前节点的那一串。",
  cost: "代价。走这条路花掉的数值。",
  solution: "解。到达目标的一条路径。",
  rule: "规则。专家系统里的 IF-THEN。",
  conclusion: "结论。推理最后得到的结果。",
  condition: "条件。IF 后面的那一部分。",
  "data-driven": "数据驱动。从已有数据出发往结论推。",
  classifier: "分类器。把样本判成某一类的模型。",
  labeled: "带标签的。每个样本已经标明属于哪一类。",
  regression: "回归。预测一个数值，而不是一个类别。",
  logistic: "逻辑回归。用来做二分类的一种模型。",
  anaconda: "Anaconda。课程用来安装 Python 和 Jupyter 的发行版。",
  jupyter: "Jupyter。在浏览器里逐格运行 Python 的笔记本。",
  seaborn: "统计图库。作业里写成 import seaborn as sns。",
  pandas: "表格库。DataFrame 和 Series 都来自它。",
  numpy: "数值数组库。课件里写成 import numpy as np。",
  scipy: "科学计算库，建在 NumPy 上。积分、傅里叶、线性代数都在它的子包里。",
  matplotlib: "二维画图库。作业里写成 import matplotlib.pyplot as plt。",
  dropna: "删掉含有缺失值的行。",
  isnull: "标出哪些格子是缺失值。",
  nunique: "不重复值的个数。",
  histogram: "直方图。用竖条显示一组数的分布。",
  scatter: "散点图。看两个变量之间的关系。",
  sigmoid: "S 形曲线。逻辑回归用它把结果压到 0 和 1 之间。",
  hyperplane: "超平面。SVM 用来分开两类的那条分界。",
  kernel: "核函数。SVM 用它把分不开的数据变到更高维。",
  admissible: "可采纳的。启发式估计不得超过真实剩余代价。",
  manhattan: "曼哈顿距离。横走加竖走，8 数码里的 h2。",
  "f1": "F1。精确率和召回率的调和平均：2PR/(P+R)。",
  bayes: "贝叶斯。用先验和似然来算后验。",
  "k-fold": "K 折。把数据分成 K 份，轮流留一份做验证。",
  argsort: "返回排好序后各元素原来的下标，不返回排好的值。",
  subplot: "子图。一张图里放好几幅小图。",
  quad: "一元数值积分。在 scipy.integrate 里。",
  fourier: "傅里叶。把函数写成一组频率分量之和。",
  interpolation: "插值。在已知点之间补出新的点。",
  series: "Series。Pandas 的一列，带有行标签。",
  dataframe: "DataFrame。Pandas 的二维表，每一列都有名字。",
  head: "看表的开头几行。",
  tail: "看表的最后几行。",
  "random forest": "随机森林。很多棵决策树合在一起做预测。",
  "decision tree": "决策树。按条件一层层往下走到一个决定。",
  knn: "K 近邻。用最近的 K 个已知样本来给新样本分类。",
  svm: "支持向量机。用超平面把类别分开。",
  pyke: "Python Knowledge Engine。课件用来写专家系统的库。",
  mycin: "MYCIN。1970 年代斯坦福的医学专家系统，用 IF-THEN 和置信度。"
};

function loadStore() {
  try {
    const data = JSON.parse(localStorage.getItem(storeKey)) || {};
    const day2FixKey = "idat7215-day2-tf-scoring-fix-v1";
    if (!localStorage.getItem(day2FixKey)) {
      delete data.day2;
      localStorage.setItem(storeKey, JSON.stringify(data));
      localStorage.setItem(day2FixKey, "1");
    }
    return data;
  } catch (e) {
    return {};
  }
}

function saveStore(data) {
  if (qaMode) return;
  localStorage.setItem(storeKey, JSON.stringify(data));
}

function findSet(id) {
  return (window.CourseSwitch?.current() === "7224" ? [] : QUIZ_SETS).find((s) => s.id === id);
}

function renderHome() {
  const store = loadStore();
  const activeSets = window.CourseSwitch?.current() === "7224" ? [] : QUIZ_SETS;
  if (!activeSets.length) {
    window.render7224Practice?.();
    return;
  }
  const cards = activeSets.map((set) => {
    const done = store[set.id];
    const status = done
      ? `Last score ${done.score} / ${done.total}`
      : `${set.questions.length} questions, not started`;
    const lane = set.id === "day1" ? "Day 1 · 冲刺计划" : set.id === "day2" ? "Day 2 · 冲刺计划" : set.id === "day3" ? "Day 3 · 冲刺计划" : set.id === "memory" ? "Memory Game · All Classes" : set.id === "choice" ? "Day 1–3 · 选择题" : set.id === "truefalse" ? "Day 1–3 · 判断题" : set.id === "short" ? "Day 1 · 必背简答" : "Day 1–2 · 代码输出简答";
    return `
      <article class="card practice-card" data-set="${set.id}">
        <p class="when">${escapeHtml(set.when)}</p>
        <p class="route">${lane}</p>
        <h2>${escapeHtml(set.title)}</h2>
        <p class="blurb">${escapeHtml(set.blurb)}</p>
        <p class="meta">${escapeHtml(status)}</p>
      </article>`;
  }).join("");
  document.getElementById("app").innerHTML = `
    <section class="dashboard-hero">
      <div><p class="eyebrow">STUDY → PRACTICE → PAPERS</p><h2>按考试题型分开练，再集中做原卷</h2><p>先用记忆挑战把算法和公式“叫得出来”，再用选择、判断和代码输出对齐原卷。</p></div>
      <div class="flow" aria-label="学习流程"><span>看知识</span><b>→</b><span>做案例</span><b>→</b><span>刷同型题</span><b>→</b><span>限时原卷</span></div>
    </section>
    <section class="mini-map"><article><b>1</b><span>记忆挑战 Memory<br><small>配对算法与公式快答</small></span></article><article><b>2</b><span>选择题 MCQ<br><small>识别定义与方法</small></span></article><article><b>3</b><span>判断题 True / False<br><small>抓关键词与反例</small></span></article><article><b>4</b><span>代码 / 简答<br><small>逐行追踪与核心对比</small></span></article></section>
    <section class="practice-toolbar"><div><h2>按题型刷题</h2><p class="blurb">建议顺序：记忆挑战热身 → 选择定位盲点 → 判断纠正易混点 → 代码输出 / 简答。</p></div><div class="mode-links"><a href="study-plan.html">先看知识卡与案例</a><a href="papers.html">进入分套原卷模式</a></div></section>
    <section class="cards">${cards}</section>`;
  document.querySelectorAll(".card").forEach((el) => {
    el.addEventListener("click", () => {
      if (window.getSelection().toString().trim()) return;
      renderQuiz(el.dataset.set);
    });
  });
}

function questionFields(q) {
  const kind = q.type || "choice";
  const code = q.code ? `<pre>${escapeHtml(q.code)}</pre>` : "";
  if (kind === "short") {
    return `<textarea class="answer" rows="7" placeholder="Write your answer in English"></textarea>`;
  }
  if (kind === "output") {
    return `${code}<textarea class="answer" rows="3" placeholder="Write only what is printed"></textarea>`;
  }
  if (kind === "draw") {
    return `<canvas class="pad" width="640" height="280"></canvas><button type="button" class="ghost clear-pad">Clear drawing</button>`;
  }
  const originalChoices = (q.choices || []).map((text, idx) => ({ text, idx }));
  const offset = q.id.startsWith("mc") && originalChoices.length
    ? Number(q.id.replace(/\D/g, "")) % originalChoices.length
    : 0;
  const orderedChoices = originalChoices.slice(offset).concat(originalChoices.slice(0, offset));
  const choices = orderedChoices.map(({ text, idx }) => `
      <label class="choice">
        <input type="radio" name="${q.id}" value="${idx}" />
        ${escapeHtml(text)}
      </label>`).join("");
  return `${code}${choices}`;
}

function attachPads(root) {
  root.querySelectorAll("canvas.pad").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1c1915";
    let drawing = false;
    const point = (event) => {
      const rect = canvas.getBoundingClientRect();
      return [
        (event.clientX - rect.left) * (canvas.width / rect.width),
        (event.clientY - rect.top) * (canvas.height / rect.height)
      ];
    };
    canvas.addEventListener("pointerdown", (event) => {
      drawing = true;
      canvas.setPointerCapture(event.pointerId);
      const [x, y] = point(event);
      ctx.beginPath();
      ctx.moveTo(x, y);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (!drawing) return;
      const [x, y] = point(event);
      ctx.lineTo(x, y);
      ctx.stroke();
    });
    canvas.addEventListener("pointerup", () => {
      drawing = false;
    });
    canvas.parentElement.querySelector(".clear-pad").addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  });
}

function renderQuiz(setId) {
  const set = findSet(setId);
  const blocks = set.questions.map((q, i) => `
      <article class="q" id="${q.id}">
        <p class="topic">Question ${i + 1} · ${escapeHtml(q.topic)}</p>
        <p class="stem">${escapeHtml(q.stem)}</p>
        ${q.figure ? `<div class="reference">${q.figure}</div>` : ""}
        ${questionFields(q)}
      </article>`).join("");
  document.getElementById("app").innerHTML = `
    <div class="bar">
      <button class="ghost" id="back" type="button">Back</button>
      <span>${set.questions.length} questions</span>
    </div>
    <h2>${escapeHtml(set.title)}</h2>
    <p class="blurb">${escapeHtml(set.blurb)}</p>
    ${blocks}
    <div class="actions">
      <button id="submit" type="button">Submit</button>
    </div>`;
  attachPads(document.getElementById("app"));
  document.getElementById("back").addEventListener("click", renderHome);
  document.getElementById("submit").addEventListener("click", () => grade(setId));
}

function normalizeOutput(text) {
  return String(text ?? "")
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

function grade(setId) {
  const submit = document.getElementById("submit");
  if (submit.dataset.done === "1") return;
  submit.dataset.done = "1";
  submit.disabled = true;
  submit.textContent = "Answers submitted";
  const set = findSet(setId);
  const marks = {};
  const attempts = {};
  const confirmed = {};
  const isSelfMarked = (q) => q.type === "short" || q.type === "draw";
  function syncQuestion(q) {
    if (!attempts[q.id] || marks[q.id] === null || (isSelfMarked(q) && !confirmed[q.id])) return;
    if (qaMode) return;
    const mistakeId = `practice-${setId}-${q.id}`;
    if (marks[q.id] < 1) {
      const correct = q.type === "output" ? q.expect : q.type === "short" || q.type === "draw" ? q.model : q.choices[q.answer];
      ReviewStore.upsertMistake({
        id:mistakeId, source:`分类练习 · ${set.title}`, setId, questionId:q.id,
        topic:q.topic, stem:q.stem, code:q.code || "", figure:q.figure || q.reference || "", attempt:attempts[q.id],
        correct, explain:q.explain || "", href:"index.html"
      });
    } else {
      ReviewStore.setMistakeMastered(mistakeId, true);
    }
  }
  set.questions.forEach((q, i) => {
    const kind = q.type || "choice";
    const box = document.getElementById(q.id);
    if (kind === "choice" || kind === "tf") {
      const picked = document.querySelector(`input[name="${q.id}"]:checked`);
      const chosen = picked ? Number(picked.value) : -1;
      attempts[q.id] = chosen >= 0 ? q.choices[chosen] : "";
      box.querySelectorAll(".choice").forEach((label) => {
        const input = label.querySelector("input");
        const optionIndex = Number(input.value);
        input.disabled = true;
        label.classList.remove("right", "bad");
        if (optionIndex === q.answer) label.classList.add("right");
        if (optionIndex === chosen && chosen !== q.answer) label.classList.add("bad");
      });
      marks[q.id] = chosen === q.answer ? 1 : 0;
      const verdict = document.createElement("p");
      verdict.className = `answer-verdict ${marks[q.id] ? "correct" : "incorrect"}`;
      verdict.textContent = marks[q.id]
        ? "✓ Correct · 回答正确"
        : chosen < 0
          ? `— Not answered · 正确答案：${q.choices[q.answer]}`
          : `✕ Incorrect · 正确答案：${q.choices[q.answer]}`;
      box.appendChild(verdict);
    } else if (kind === "output") {
      const typed = box.querySelector("textarea").value;
      attempts[q.id] = typed.trim();
      const ok = normalizeOutput(typed) === normalizeOutput(q.expect);
      marks[q.id] = ok ? 1 : 0;
      q._outputOk = ok;
    } else if (kind === "short") {
      attempts[q.id] = box.querySelector("textarea").value.trim();
      marks[q.id] = null;
    } else {
      attempts[q.id] = box.querySelector("textarea")?.value.trim() || "图示作答";
      marks[q.id] = null;
    }
    if (!box.querySelector(".explain")) {
      if (q.model) {
        const model = document.createElement("p");
        model.className = "explain";
        model.textContent = `Model answer:\n${q.model}`;
        box.appendChild(model);
      }
      if (q.reference) {
        const figure = document.createElement("div");
        figure.className = "reference";
        figure.innerHTML = q.reference;
        box.appendChild(figure);
      }
      if (kind === "output") {
        const verdict = document.createElement("p");
        verdict.className = "explain";
        verdict.textContent = q._outputOk ? "Your output matches." : "Your output does not match.";
        box.appendChild(verdict);
        const expected = document.createElement("p");
        expected.className = "explain";
        expected.textContent = `Expected output: ${q.expect}`;
        box.appendChild(expected);
      }
      const note = document.createElement("p");
      note.className = "explain";
      note.textContent = q.explain;
      box.appendChild(note);
      if (kind === "short" || kind === "draw") {
        const mark = document.createElement("div");
        mark.className = "mark self-mark";
        mark.innerHTML = `<span>After you compare:</span>
          <button class="self-choice" type="button" data-mark="1">Matches</button>
          <button class="self-choice" type="button" data-mark="0.5">Partial</button>
          <button class="self-choice" type="button" data-mark="0">Missed</button>
          <button class="self-confirm" type="button" disabled>Submit self-assessment</button>
          <small class="self-status">Choose one result, then submit.</small>`;
        const confirm = mark.querySelector(".self-confirm");
        mark.querySelectorAll(".self-choice").forEach((button) => {
          button.addEventListener("click", () => {
            if (confirmed[q.id]) return;
            marks[q.id] = Number(button.dataset.mark);
            mark.querySelectorAll(".self-choice").forEach((item) => item.classList.remove("on"));
            button.classList.add("on");
            confirm.disabled = false;
            mark.querySelector(".self-status").textContent = "Selection not submitted yet.";
            publish();
          });
        });
        confirm.addEventListener("click", () => {
          if (marks[q.id] === null || confirmed[q.id]) return;
          confirmed[q.id] = true;
          mark.querySelectorAll(".self-choice").forEach((item) => { item.disabled = true; });
          confirm.disabled = true;
          confirm.textContent = "Self-assessment submitted";
          mark.querySelector(".self-status").textContent = marks[q.id] < 1
            ? "Saved to the wrong-answer notebook."
            : "Marked as mastered.";
          syncQuestion(q);
          publish();
        });
        box.appendChild(mark);
      }
    }
  });
  set.questions.forEach(syncQuestion);
  const old = document.querySelector(".result");
  if (old) old.remove();
  const result = document.createElement("section");
  result.className = "result";
  document.querySelector(".actions").before(result);

  function publish() {
    const open = set.questions.filter((q) => isSelfMarked(q) && !confirmed[q.id]);
    const score = set.questions.reduce((sum, q) => sum + (isSelfMarked(q) && !confirmed[q.id] ? 0 : (marks[q.id] || 0)), 0);
    const objective = set.questions.filter((q) => !isSelfMarked(q));
    const objectiveCorrect = objective.filter((q) => marks[q.id] === 1).length;
    const objectiveWrong = objective.filter((q) => marks[q.id] === 0 && attempts[q.id]).length;
    const objectiveBlank = objective.filter((q) => marks[q.id] === 0 && !attempts[q.id]).length;
    const breakdown = objective.length ? `<p class="score-breakdown">自动判分：<b>${objectiveCorrect}</b> 对 · <b>${objectiveWrong}</b> 错${objectiveBlank ? ` · <b>${objectiveBlank}</b> 未答` : ""}</p>` : "";
    const store = loadStore();
    store[setId] = { score, total: set.questions.length, complete:open.length === 0, at: Date.now() };
    saveStore(store);
    const hasSelf = set.questions.some((item) => item.type === "short" || item.type === "draw");
    const needsReview = set.questions.filter((q) => marks[q.id] < 1 && attempts[q.id] && (!isSelfMarked(q) || confirmed[q.id])).length;
    if (open.length) {
      const selected = open.filter((q) => marks[q.id] !== null).length;
      result.innerHTML = `<p class="score">${score} / ${set.questions.length}</p>${breakdown}<p>${hasSelf ? `还需提交 ${open.length} 道自评${selected ? `（其中 ${selected} 道已选择、尚未确认）` : ""}。选择 Matches、Partial 或 Missed 后，再点击 Submit self-assessment。` : "Choices and written outputs are marked automatically."}</p>${needsReview ? `<p><a class="review-result-link" href="review.html">${needsReview} 道待复习题已加入错题本 →</a></p>` : ""}`;
      return;
    }
    result.innerHTML = `<div class="result-complete"><span class="complete-check">✓</span><div><p class="score">${score} / ${set.questions.length}</p>${breakdown}<b>本轮练习已完成</b><p>${needsReview ? `${needsReview} 道错误或部分正确的题目已加入错题本。` : "本轮全部掌握。"}</p></div></div>${needsReview ? `<p><a class="review-result-link" href="review.html">打开错题本复习 ${needsReview} 道题 →</a></p>` : ""}<div class="result-actions"><button type="button" data-result-action="restart">重新练习本组</button><button class="ghost result-home" type="button" data-result-action="home">返回题型目录</button></div>`;
    result.querySelector('[data-result-action="restart"]').addEventListener("click", () => renderQuiz(setId));
    result.querySelector('[data-result-action="home"]').addEventListener("click", renderHome);
  }
  publish();
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const popup = document.createElement("aside");
popup.id = "lookup";
popup.hidden = true;
document.body.appendChild(popup);

let pointerDown = { x: 0, y: 0 };
document.addEventListener("mousedown", (event) => {
  pointerDown = { x: event.clientX, y: event.clientY };
});
document.addEventListener("click", (event) => {
  const label = event.target.closest("label.choice");
  if (!label) return;
  const moved = Math.abs(event.clientX - pointerDown.x) + Math.abs(event.clientY - pointerDown.y) > 4;
  if (moved || window.getSelection().toString().trim()) event.preventDefault();
}, true);

document.addEventListener("mouseup", () => {
  setTimeout(lookupSelection, 0);
});

async function lookupSelection() {
  const selection = window.getSelection();
  const text = selection ? selection.toString().replace(/\s+/g, " ").trim() : "";
  if (!text || text.length > 80 || !selection.rangeCount || popup.contains(selection.anchorNode)) {
    popup.hidden = true;
    return;
  }
  const rect = selection.getRangeAt(0).getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) {
    popup.hidden = true;
    return;
  }
  placePopup(rect);
  popup.hidden = false;
  popup.innerHTML = `<strong>${escapeHtml(text)}</strong><p>Looking up…</p>`;
  const meaning = await meaningOf(text);
  if (window.getSelection().toString().replace(/\s+/g, " ").trim() !== text) return;
  popup.innerHTML = `<strong>${escapeHtml(text)}</strong><p>${escapeHtml(meaning)}</p><button type="button" class="save-english">＋ 加入英语本</button>`;
  popup.querySelector(".save-english").addEventListener("click", () => {
    const words = text.split(/\s+/).filter(Boolean).length;
    const kind = words === 1 ? "word" : /[.!?]$/.test(text) || words > 7 ? "sentence" : "phrase";
    ReviewStore.addEnglish({ text, meaning, kind, reason:"forget", note:"来自刷题页面选词" });
    popup.querySelector(".save-english").textContent = "✓ 已加入英语本";
  });
}

function placePopup(rect) {
  const width = 340;
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
  let top = rect.bottom + 8;
  if (top > window.innerHeight - 120) top = Math.max(8, rect.top - 88);
  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;
}

async function meaningOf(text) {
  const direct = gloss[text.toLowerCase()];
  if (direct) return direct;
  const words = text.split(/[^A-Za-z0-9+-]+/).filter(Boolean);
  const known = words
    .map((word) => {
      const hit = gloss[word.toLowerCase()];
      return hit ? `${word}: ${hit}` : "";
    })
    .filter(Boolean);
  if (known.length === words.length && known.length > 0) return known.join("\n");
  try {
    const url = `https://api.mymemory.translated.net/get?langpair=en|zh-CN&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const data = await response.json();
    const translated = data.responseData && data.responseData.translatedText;
    if (translated && translated.toLowerCase() !== text.toLowerCase()) {
      return known.length ? `${translated}\n${known.join("\n")}` : translated;
    }
  } catch (e) {
    if (known.length) return known.join("\n");
    return "No Chinese meaning yet. Select one word, or check the network.";
  }
  if (known.length) return known.join("\n");
  return "No Chinese meaning yet. Try selecting a single word.";
}

renderHome();
const requestedSet = runtimeParams.get("set");
if (requestedSet && findSet(requestedSet)) renderQuiz(requestedSet);
