(function () {
  if (window.CourseSwitch?.current() === "7224") {
    window.render7224Study?.();
    return;
  }
  const storageKey = "idat7215-study-progress-v1";
  const viewKey = "idat7215-study-view-v1";
  const checks = [...document.querySelectorAll("[data-module]")];
  const progress = document.getElementById("studyProgress");
  const progressText = document.getElementById("studyProgressText");
  const expandButton = document.getElementById("expandAll");
  const modules = [...document.querySelectorAll(".class-module")];
  let saved = {};
  let view = {};
  let restoring = true;
  try { saved = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch (_) {}
  try { view = JSON.parse(localStorage.getItem(viewKey) || "{}"); } catch (_) {}
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  function moduleSection(module) {
    return module.closest(".class-section")?.id || "";
  }

  function saveView() {
    if (restoring) return;
    view.scrollY = Math.max(0, Math.round(window.scrollY));
    view.openModules = modules.filter((item) => item.open).map(moduleSection).filter(Boolean);
    localStorage.setItem(viewKey, JSON.stringify(view));
  }

  function openTarget(id) {
    const target = document.getElementById(id);
    const module = target?.matches(".class-section") ? target.querySelector(".class-module") : target?.closest(".class-section")?.querySelector(".class-module");
    if (module) module.open = true;
    return target;
  }

  function restoreView() {
    const explicitId = location.hash.slice(1);
    if (explicitId) {
      const target = openTarget(explicitId);
      if (target) target.scrollIntoView({ block:"start" });
      view.section = explicitId;
      requestAnimationFrame(() => { restoring = false; saveView(); });
      return;
    }
    if (Array.isArray(view.openModules)) {
      modules.forEach((item) => { item.open = view.openModules.includes(moduleSection(item)); });
    }
    if (view.section) openTarget(view.section);
    if (Number.isFinite(Number(view.scrollY))) window.scrollTo(0, Number(view.scrollY));
    requestAnimationFrame(() => { restoring = false; saveView(); });
  }
  function updateProgress() {
    const done = checks.filter((box) => box.checked).length;
    progress.style.width = `${(done / checks.length) * 100}%`;
    progressText.textContent = `${done} / ${checks.length} 节完成`;
    checks.forEach((box) => { saved[box.dataset.module] = box.checked; });
    localStorage.setItem(storageKey, JSON.stringify(saved));
  }
  checks.forEach((box) => { box.checked = Boolean(saved[box.dataset.module]); box.addEventListener("change", updateProgress); });
  updateProgress();
  expandButton.addEventListener("click", () => {
    const shouldOpen = modules.some((item) => !item.open);
    modules.forEach((item) => { item.open = shouldOpen; });
    expandButton.textContent = shouldOpen ? "收起全部课程" : "展开全部课程";
    saveView();
  });
  modules.forEach((item) => item.addEventListener("toggle", saveView));
  const links = [...document.querySelectorAll(".study-sidebar > a")];
  const targets = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  function syncCurrentSection() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const probeY = window.scrollY + Math.max(140, viewportHeight * 0.5);
    const visible = targets.reduce((current, target) => {
      const absoluteTop = target.getBoundingClientRect().top + window.scrollY;
      return absoluteTop <= probeY ? target : current;
    }, targets[0]);
    if (!visible) return;
    links.forEach((link) => link.classList.toggle("current", link.getAttribute("href") === `#${visible.id}`));
    if (!restoring) view.section = visible.id;
  }
  links.forEach((link) => link.addEventListener("click", () => {
    const id = link.getAttribute("href").slice(1);
    view.section = id;
    openTarget(id);
    saveView();
  }));

  let scrollTick = 0;
  window.addEventListener("scroll", () => {
    if (scrollTick) return;
    scrollTick = window.setTimeout(() => { scrollTick = 0; syncCurrentSection(); saveView(); }, 150);
  }, { passive:true });
  window.addEventListener("resize", syncCurrentSection);
  window.addEventListener("pagehide", saveView);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") saveView(); });
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (id) { view.section = id; openTarget(id); saveView(); }
  });

  const favoriteKey = "idat7215-study-favorites-v1";
  const highlightKey = "idat7215-study-highlights-v1";
  const cards = [...document.querySelectorAll(".concept-card")];
  let favorites = [];
  let highlights = [];
  let pendingSelection = null;
  try { favorites = JSON.parse(localStorage.getItem(favoriteKey) || "[]"); } catch (_) {}
  try { highlights = JSON.parse(localStorage.getItem(highlightKey) || "[]"); } catch (_) {}
  if (!Array.isArray(favorites)) favorites = [];
  if (!Array.isArray(highlights)) highlights = [];

  function studyCardId(card, index) {
    const section = card.closest(".class-section")?.id || "exam";
    const number = card.querySelector("header > span")?.textContent.trim() || String(index + 1);
    return card.id || `${section}-card-${number}`;
  }
  cards.forEach((card, index) => { card.dataset.studyCard = studyCardId(card, index); });

  const studyTools = document.createElement("div");
  studyTools.className = "study-tools";
  studyTools.dataset.studyControl = "true";
  studyTools.innerHTML = `<button type="button" id="openStudyDrawer" aria-expanded="false">★ 我的收藏 <span>0</span></button>`;
  document.body.appendChild(studyTools);
  const studyDrawer = document.createElement("aside");
  studyDrawer.className = "study-drawer";
  studyDrawer.dataset.studyControl = "true";
  studyDrawer.hidden = true;
  studyDrawer.innerHTML = `<div class="study-drawer-head"><div><h3>我的学习标记</h3><p>收藏卡片、划词高亮都会保存在本浏览器。</p></div><button type="button" data-close-drawer aria-label="关闭">×</button></div><div id="savedCardList" class="saved-card-list"></div><h4>划词标记</h4><p class="study-drawer-empty">选中卡片内的文字，再点击“标记”即可。</p><div id="highlightList" class="highlight-list"></div>`;
  document.body.appendChild(studyDrawer);
  const selectionAction = document.createElement("button");
  selectionAction.type = "button";
  selectionAction.className = "selection-action";
  selectionAction.dataset.studyControl = "true";
  selectionAction.textContent = "＋ 标记这段";
  selectionAction.hidden = true;
  document.body.appendChild(selectionAction);

  function saveStudyMarks() {
    localStorage.setItem(favoriteKey, JSON.stringify(favorites));
    localStorage.setItem(highlightKey, JSON.stringify(highlights));
  }
  function cardTitle(card) {
    return card.querySelector("h3")?.textContent.trim() || "知识卡片";
  }
  function jumpToCard(card) {
    const module = card.closest(".class-module");
    if (module) module.open = true;
    card.scrollIntoView({ behavior:"smooth", block:"center" });
    card.classList.add("favorite-flash");
    window.setTimeout(() => card.classList.remove("favorite-flash"), 700);
    studyDrawer.hidden = true;
    document.getElementById("openStudyDrawer").setAttribute("aria-expanded", "false");
  }
  function renderStudyDrawer() {
    const savedList = document.getElementById("savedCardList");
    const favoriteCards = favorites.map((id) => cards.find((card) => card.dataset.studyCard === id)).filter(Boolean);
    studyTools.querySelector("span").textContent = String(favoriteCards.length);
    savedList.innerHTML = favoriteCards.length ? favoriteCards.map((card) => `<button type="button" data-jump-card="${card.dataset.studyCard}">★ ${cardTitle(card)}</button>`).join("") : `<p class="study-drawer-empty">还没有收藏。点击知识卡右上角的 ☆ 即可收藏。</p>`;
    const highlightList = document.getElementById("highlightList");
    highlightList.innerHTML = highlights.length ? highlights.map((item) => `<button type="button" data-jump-highlight="${item.id}" title="点击回到原文">“${item.text.replace(/[<>&"]/g, (char) => ({"<":"&lt;", ">":"&gt;", "&":"&amp;", "\"":"&quot;"}[char]))}”</button>`).join("") : "";
    cards.forEach((card) => card.querySelector(".card-favorite")?.classList.toggle("active", favorites.includes(card.dataset.studyCard)));
  }

  cards.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "card-favorite";
    button.dataset.studyControl = "true";
    button.title = "收藏这张知识卡";
    button.setAttribute("aria-label", `收藏：${cardTitle(card)}`);
    button.textContent = "★";
    button.addEventListener("click", () => {
      const id = card.dataset.studyCard;
      favorites = favorites.includes(id) ? favorites.filter((item) => item !== id) : [...favorites, id];
      saveStudyMarks();
      renderStudyDrawer();
    });
    card.appendChild(button);
  });

  function studyTextNodes(card) {
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.length) return NodeFilter.FILTER_REJECT;
        if (node.parentElement?.closest("[data-study-control]")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    return nodes;
  }
  function selectionOffsets(card, range) {
    const nodes = studyTextNodes(card);
    let total = 0;
    let start = null;
    let end = null;
    nodes.forEach((node) => {
      if (node === range.startContainer) start = total + range.startOffset;
      if (node === range.endContainer) end = total + range.endOffset;
      total += node.nodeValue.length;
    });
    return start === null || end === null ? null : { start, end };
  }
  function clearRenderedHighlights() {
    document.querySelectorAll("mark.study-highlight").forEach((mark) => {
      const parent = mark.parentNode;
      mark.replaceWith(document.createTextNode(mark.textContent));
      parent?.normalize();
    });
  }
  function renderHighlights() {
    clearRenderedHighlights();
    highlights.forEach((item) => {
      const card = cards.find((entry) => entry.dataset.studyCard === item.cardId);
      if (!card) return;
      let cursor = 0;
      studyTextNodes(card).forEach((node) => {
        const nodeStart = cursor;
        const nodeEnd = cursor + node.nodeValue.length;
        cursor = nodeEnd;
        const localStart = Math.max(0, item.start - nodeStart);
        const localEnd = Math.min(node.nodeValue.length, item.end - nodeStart);
        if (localStart >= localEnd) return;
        const range = document.createRange();
        range.setStart(node, localStart);
        range.setEnd(node, localEnd);
        const mark = document.createElement("mark");
        mark.className = "study-highlight";
        mark.dataset.highlightId = item.id;
        mark.title = "点击删除这条标记";
        range.surroundContents(mark);
      });
    });
  }
  function hideSelectionAction() {
    selectionAction.hidden = true;
    pendingSelection = null;
  }
  document.addEventListener("mouseup", (event) => {
    if (event.target.closest("[data-study-control]")) return;
    window.setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || !selection.rangeCount) return hideSelectionAction();
      const range = selection.getRangeAt(0);
      const card = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE ? range.commonAncestorContainer.closest?.(".concept-card") : range.commonAncestorContainer.parentElement?.closest(".concept-card");
      const text = selection.toString().replace(/\s+/g, " ").trim();
      if (!card || text.length < 2 || text.length > 160) return hideSelectionAction();
      const offsets = selectionOffsets(card, range);
      if (!offsets || offsets.start >= offsets.end) return hideSelectionAction();
      if (highlights.some((item) => item.cardId === card.dataset.studyCard && offsets.start < item.end && offsets.end > item.start)) return hideSelectionAction();
      pendingSelection = { cardId:card.dataset.studyCard, start:offsets.start, end:offsets.end, text };
      const rect = range.getBoundingClientRect();
      selectionAction.style.left = `${Math.min(window.innerWidth - 120, Math.max(8, rect.left + rect.width / 2 - 48))}px`;
      selectionAction.style.top = `${Math.max(8, rect.top - 40)}px`;
      selectionAction.hidden = false;
    }, 0);
  });
  selectionAction.addEventListener("mousedown", (event) => event.preventDefault());
  selectionAction.addEventListener("click", () => {
    if (!pendingSelection) return;
    highlights.push({ ...pendingSelection, id:`h-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` });
    saveStudyMarks();
    renderHighlights();
    renderStudyDrawer();
    window.getSelection()?.removeAllRanges();
    hideSelectionAction();
  });
  document.addEventListener("click", (event) => {
    const mark = event.target.closest("mark.study-highlight");
    if (mark) {
      highlights = highlights.filter((item) => item.id !== mark.dataset.highlightId);
      saveStudyMarks();
      renderHighlights();
      renderStudyDrawer();
      return;
    }
    const cardJump = event.target.closest("[data-jump-card]");
    if (cardJump) {
      const card = cards.find((item) => item.dataset.studyCard === cardJump.dataset.jumpCard);
      if (card) jumpToCard(card);
      return;
    }
    const highlightJump = event.target.closest("[data-jump-highlight]");
    if (highlightJump) {
      const item = highlights.find((entry) => entry.id === highlightJump.dataset.jumpHighlight);
      const card = item && cards.find((entry) => entry.dataset.studyCard === item.cardId);
      if (card) jumpToCard(card);
    }
  });
  document.getElementById("openStudyDrawer").addEventListener("click", () => {
    studyDrawer.hidden = !studyDrawer.hidden;
    document.getElementById("openStudyDrawer").setAttribute("aria-expanded", String(!studyDrawer.hidden));
  });
  studyDrawer.querySelector("[data-close-drawer]").addEventListener("click", () => {
    studyDrawer.hidden = true;
    document.getElementById("openStudyDrawer").setAttribute("aria-expanded", "false");
  });
  renderHighlights();
  renderStudyDrawer();
  document.querySelectorAll(".memory-flip").forEach((card) => card.addEventListener("click", () => {
    const flipped = card.classList.toggle("flipped");
    card.setAttribute("aria-pressed", String(flipped));
  }));
  requestAnimationFrame(() => requestAnimationFrame(() => {
    restoreView();
    requestAnimationFrame(syncCurrentSection);
    window.setTimeout(syncCurrentSection, 250);
  }));
})();
