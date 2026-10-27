const STORE_KEY = "idat7215-paper-answers";

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveStore(data) {
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

function isSectionHeader(question, next) {
  const heading = question.heading || "";
  if (/^Part\b/i.test(heading)) return true;
  if (!/^Question[- ]?\d+\s*\([^)]*\)\s*:?\s*$/i.test(heading)) return false;
  if (!next) return false;
  return /^\d+\.\d+\s/.test(next.heading) || /^\d+\.\s/.test(next.heading);
}

function parentQuestionNo(questions, index) {
  for (let i = index; i >= 0; i -= 1) {
    const match = (questions[i].heading || "").match(/^Question[- ]?(\d+)/i);
    if (match) return match[1];
  }
  return "";
}

function paperLabel(question, questions, index) {
  const heading = question.heading || "";
  const part = heading.match(/^Part\s+[IVX0-9]+/i);
  if (part) return part[0];
  const sub = heading.match(/^(\d+\.\d+)\b/);
  if (sub) return sub[1];
  const item = heading.match(/^(\d+)\.\s/);
  if (item) {
    const parent = parentQuestionNo(questions, index);
    return parent ? `Question ${parent} · ${item[1]}` : item[1];
  }
  const named = heading.match(/^Question[-\s]?(\d+)/i);
  if (named) return `Question ${named[1]}`;
  return heading.slice(0, 40);
}

function answerKind(question, questions, index) {
  const heading = question.heading || "";
  if (/output of the following/i.test(heading)) return "output";
  if (/^Question\s*3\b/i.test(heading) && String(question.id).startsWith("2022")) return "draw";
  if (/^Question[- ]?[45]\b/i.test(heading)) return "draw";
  const parent = parentQuestionNo(questions, index);
  if (/^\d+\.\s/.test(heading) && !/^\d+\.\d+/.test(heading)) {
    if (parent === "1") return "choice";
    if (parent === "2") return "tf";
  }
  return "short";
}

function replyFields(question, kind, saved) {
  if (kind === "choice") {
    const picked = saved.choice || "";
    return ["A", "B", "C", "D"].map((letter) => `
      <label class="choice">
        <input type="radio" name="${question.id}" value="${letter}" ${picked === letter ? "checked" : ""} />
        ${letter}
      </label>`).join("") + `<p class="hint">选项在上面的原题图片里，这里只选字母。</p>`;
  }
  if (kind === "tf") {
    const picked = saved.choice || "";
    return ["True", "False"].map((value) => `
      <label class="choice">
        <input type="radio" name="${question.id}" value="${value}" ${picked === value ? "checked" : ""} />
        ${value}
      </label>`).join("");
  }
  const placeholder = kind === "output" ? "只写打印出来的结果" : "在这里写下你的答案";
  const text = escapeHtml(saved.text || "");
  const writing = `<textarea class="answer" rows="${kind === "output" ? 3 : 6}" placeholder="${placeholder}">${text}</textarea>`;
  if (kind !== "draw") return writing;
  return `${writing}
    <canvas class="pad" width="640" height="280"></canvas>
    <button type="button" class="ghost clear-pad">清空画布</button>`;
}

function markButtons(question, saved) {
  const submitted = saved.markSubmitted === true;
  const current = submitted ? saved.mark : (saved.pendingMark ?? saved.mark);
  const buttons = [
    ["1", "✓", "对"],
    ["0.5", "~", "部分"],
    ["0", "×", "错"]
  ].map(([value, icon, label]) => {
    const on = String(current) === value ? " on" : "";
    return `<button type="button" data-mark="${value}" class="mark-choice${on}" aria-label="${label}" ${submitted ? "disabled" : ""}><b>${icon}</b>${label}</button>`;
  }).join("");
  const action = submitted
    ? `<button type="button" class="mark-edit" data-mark-action="edit">修改自评</button><small>已提交并同步错题本</small>`
    : `<button type="button" class="mark-submit" data-mark-action="submit" ${current === undefined || current === null || current === "" ? "disabled" : ""}>提交自评</button><small>选择结果后必须提交</small>`;
  return `<div class="mark compact-mark" data-id="${question.id}"><span>自评</span>${buttons}${action}</div>`;
}

function paperScore(paper, store) {
  const answerable = paper.questions.filter((question, index) => !isSectionHeader(question, paper.questions[index + 1]));
  let score = 0;
  let marked = 0;
  answerable.forEach((question) => {
    const saved = store[question.id];
    if (!saved || saved.markSubmitted !== true || saved.mark === undefined || saved.mark === null || saved.mark === "") return;
    score += Number(saved.mark);
    marked += 1;
  });
  return { score, marked, total: answerable.length };
}

function paperCompletion(paper, store) {
  const tally = paperScore(paper, store);
  const complete = Boolean(store[`__paper_${paper.id}`]?.complete) && tally.marked === tally.total;
  if (complete) {
    return `<div class="paper-finish complete" data-paper-finish="${paper.id}"><span class="complete-check">✓</span><div><b>本套原卷已完成</b><p>自评得分 ${tally.score} / ${tally.total}，错题与部分正确题目已同步到错题本。</p></div><button type="button" data-paper-action="restart" data-paper="${paper.id}">重新开始本套</button></div>`;
  }
  return `<div class="paper-finish" data-paper-finish="${paper.id}"><div><b>完成本套练习</b><p>${tally.marked} / ${tally.total} 题已提交自评。全部提交后才能完成本套。</p></div><button type="button" data-paper-action="finish" data-paper="${paper.id}">提交并完成本套</button></div>`;
}

function syncPaperMistake(paper, question, entry) {
  const mistakeId = `paper-${question.id}`;
  if (entry.mark < 1) {
    ReviewStore.upsertMistake({
      id:mistakeId, source:`历年原卷 · ${paper.id}`, topic:paperLabel(question, paper.questions, paper.questions.indexOf(question)),
      stem:question.heading, attempt:entry.choice || entry.text || (entry.mark === 0.5 ? "自评：部分正确" : "自评：错误"),
      correct:question.answerText || "请在原卷页展开答案", explain:question.explain || "", figure:question.figure || question.reference || "",
      href:`papers.html?paper=${paper.id}#${question.id}`
    });
  } else {
    ReviewStore.setMistakeMastered(mistakeId, true);
  }
}

function refreshScores() {
  const store = loadStore();
  document.querySelectorAll(".paper-score").forEach((node) => {
    const paper = PAPERS.find((item) => item.id === node.dataset.paper);
    const tally = paperScore(paper, store);
    node.textContent = `自评 ${tally.score} / ${tally.total}（已评 ${tally.marked} 题）`;
  });
  document.querySelectorAll(".paper-tab").forEach((button) => {
    const paper = PAPERS.find((item) => item.id === button.dataset.paper);
    const tally = paperScore(paper, store);
    const small = button.querySelector("small");
    if (small) small.textContent = `${tally.marked} / ${tally.total} 已自评`;
  });
}

function attachPads(root) {
  const store = loadStore();
  root.querySelectorAll("canvas.pad").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#1c1915";
    const article = canvas.closest("article");
    const saved = store[article.id] || {};
    if (saved.drawing) {
      const image = new Image();
      image.onload = () => ctx.drawImage(image, 0, 0);
      image.src = saved.drawing;
    }
    let drawing = false;
    const point = (event) => {
      const rect = canvas.getBoundingClientRect();
      return [
        (event.clientX - rect.left) * (canvas.width / rect.width),
        (event.clientY - rect.top) * (canvas.height / rect.height)
      ];
    };
    const persist = () => {
      const data = loadStore();
      const entry = data[article.id] || {};
      entry.drawing = canvas.toDataURL("image/png");
      data[article.id] = entry;
      saveStore(data);
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
      if (!drawing) return;
      drawing = false;
      persist();
    });
    canvas.parentElement.querySelector(".clear-pad").addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const data = loadStore();
      const entry = data[article.id] || {};
      delete entry.drawing;
      data[article.id] = entry;
      saveStore(data);
    });
  });
}

function renderPapers() {
  const store = loadStore();
  const requestedYear = new URLSearchParams(location.search).get("paper");
  const initialYear = PAPERS.some((paper) => paper.id === requestedYear) ? requestedYear : PAPERS[0].id;
  const paperNav = PAPERS.map((paper) => {
    const tally = paperScore(paper, store);
    return `<button type="button" class="paper-tab ${paper.id === initialYear ? "on" : ""}" data-paper="${paper.id}">
      <span class="paper-icon" aria-hidden="true"><i></i></span>
      <span><b>${paper.id} 原卷</b><small>${tally.marked} / ${tally.total} 已自评</small></span>
    </button>`;
  }).join("");
  const papers = PAPERS.map((paper, paperIndex) => {
    const tally = paperScore(paper, store);
    const questions = paper.questions.map((question, index) => {
      const questionShots = question.parts.filter((part) => part.q).map((part) => `<img src="${part.q}" alt="" />`).join("");
      const answerShots = question.parts.map((part) => `<img src="${part.a}" alt="" />`).join("");
      const header = isSectionHeader(question, paper.questions[index + 1]);
      const saved = store[question.id] || {};
      const kind = header ? "" : answerKind(question, paper.questions, index);
      const reply = header ? "" : `<div class="reply">${replyFields(question, kind, saved)}${markButtons(question, saved)}</div>`;
      const answer = (question.answerText || "").trim();
      const explain = (question.explain || "").trim();
      const showFigure = kind === "draw" || answer.includes("y''") || question.heading.startsWith("Question 3 (30 Marks)");
      const writeup = header || (!answer && !explain) ? "" : `
          <details>
            <summary>展开答案和解析</summary>
            ${answer ? `<p class="when">答案</p><p class="explain">${escapeHtml(answer)}</p>` : ""}
            ${explain ? `<p class="when">解析</p><p class="explain">${escapeHtml(explain)}</p>` : ""}
            ${showFigure ? `<p class="when">解答图</p><div class="sheet">${answerShots}</div>` : ""}
          </details>`;
      return `
        <article class="q" id="${question.id}">
          <p class="topic">${escapeHtml(paperLabel(question, paper.questions, index))}</p>
          <div class="sheet">${questionShots}</div>
          ${reply}
          ${writeup}
        </article>`;
    }).join("");
    return `
      <section class="paper" id="paper-${paper.id}" data-year="${paper.id}" ${paper.id === initialYear ? "" : "hidden"}>
        <p class="when">${escapeHtml(paper.file)}</p>
        <h2>${escapeHtml(paper.title)}</h2>
        <p class="paper-score" data-paper="${paper.id}">自评 ${tally.score} / ${tally.total}（已评 ${tally.marked} 题）</p>
        ${questions}
        ${paperCompletion(paper, store)}
      </section>`;
  }).join("");
  const html = `<div class="papers-layout"><aside class="papers-sidebar"><p class="side-label">试卷目录 · PAPERS</p>${paperNav}<div class="paper-help"><b>刷卷顺序</b><p>作答 → 展开解析 → 自评 → 重做错题</p></div></aside><div class="papers-stage">${papers}</div></div>`;
  const app = document.getElementById("app");
  app.innerHTML = html;
  app.querySelectorAll(".paper-tab").forEach((button) => button.addEventListener("click", () => {
    app.querySelectorAll(".paper-tab").forEach((item) => item.classList.remove("on"));
    button.classList.add("on");
    const year = button.dataset.paper;
    app.querySelectorAll(".paper").forEach((paper) => paper.hidden = paper.dataset.year !== year);
    history.replaceState(null, "", `papers.html?paper=${year}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
  attachPads(app);
  app.addEventListener("input", (event) => {
    const article = event.target.closest("article");
    if (!article) return;
    const data = loadStore();
    const entry = data[article.id] || {};
    if (event.target.classList.contains("answer")) entry.text = event.target.value;
    data[article.id] = entry;
    saveStore(data);
  });
  app.addEventListener("change", (event) => {
    if (event.target.type !== "radio") return;
    const article = event.target.closest("article");
    const data = loadStore();
    const entry = data[article.id] || {};
    entry.choice = event.target.value;
    data[article.id] = entry;
    saveStore(data);
  });
  app.addEventListener("click", (event) => {
    const paperAction = event.target.closest("[data-paper-action]");
    if (paperAction) {
      const paper = PAPERS.find((item) => item.id === paperAction.dataset.paper);
      const data = loadStore();
      if (paperAction.dataset.paperAction === "finish") {
        const tally = paperScore(paper, data);
        const holder = paperAction.closest(".paper-finish");
        if (tally.marked < tally.total) {
          holder.querySelector("p").textContent = `还有 ${tally.total - tally.marked} 题没有提交自评，请先完成这些题目。`;
          holder.classList.add("needs-work");
          return;
        }
        data[`__paper_${paper.id}`] = { complete:true, at:Date.now(), score:tally.score, total:tally.total };
        saveStore(data);
        holder.outerHTML = paperCompletion(paper, data);
        return;
      }
      if (paperAction.dataset.paperAction === "restart") {
        paper.questions.forEach((question) => { delete data[question.id]; });
        delete data[`__paper_${paper.id}`];
        saveStore(data);
        location.href = `papers.html?paper=${paper.id}`;
        return;
      }
    }
    const button = event.target.closest(".mark-choice");
    const markAction = event.target.closest("[data-mark-action]");
    if (!button && !markAction) return;
    const control = button || markAction;
    const article = control.closest("article");
    const paperSection = article.closest(".paper");
    const paper = PAPERS.find((item) => item.id === paperSection.dataset.year);
    const question = paper.questions.find((item) => item.id === article.id);
    const data = loadStore();
    const entry = data[article.id] || {};
    if (button) {
      if (entry.markSubmitted === true) return;
      entry.pendingMark = Number(button.dataset.mark);
      data[article.id] = entry;
      saveStore(data);
      article.querySelectorAll(".mark-choice").forEach((item) => item.classList.remove("on"));
      button.classList.add("on");
      article.querySelector(".mark-submit").disabled = false;
      return;
    }
    if (markAction.dataset.markAction === "edit") {
      entry.markSubmitted = false;
      entry.pendingMark = entry.mark;
      data[article.id] = entry;
      saveStore(data);
      article.querySelector(".compact-mark").outerHTML = markButtons(question, entry);
      return;
    }
    const selected = entry.pendingMark ?? entry.mark;
    if (selected === undefined || selected === null || selected === "") return;
    entry.mark = Number(selected);
    entry.markSubmitted = true;
    delete entry.pendingMark;
    data[article.id] = entry;
    delete data[`__paper_${paper.id}`];
    saveStore(data);
    syncPaperMistake(paper, question, entry);
    article.querySelector(".compact-mark").outerHTML = markButtons(question, entry);
    refreshScores();
    const finish = document.querySelector(`[data-paper-finish="${paper.id}"]`);
    if (finish) finish.outerHTML = paperCompletion(paper, data);
  });
  if (location.hash) setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ block:"start" }), 50);
}

if (window.CourseSwitch?.current() === "7224") {
  window.render7224ReviewPaper?.();
} else {
  renderPapers();
}
