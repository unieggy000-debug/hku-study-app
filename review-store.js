(function () {
  const course = window.CourseSwitch?.current?.() || "7215";
  const scope = `idat${course}`;
  const MISTAKE_KEY = `${scope}-mistakes-v1`;
  const ENGLISH_KEY = `${scope}-english-v1`;
  const ENGLISH_STATS_KEY = `${scope}-english-stats-v1`;
  const DEFINITION_KEY = `${scope}-definitions-v1`;
  const DEFINITION_STATS_KEY = `${scope}-definition-stats-v1`;
  const VOCAB_SEED_KEY = `${scope}-scipy-vocab-seeded-v1`;

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function upsertMistake(item) {
    const items = read(MISTAKE_KEY);
    const index = items.findIndex((entry) => entry.id === item.id);
    const now = Date.now();
    if (index >= 0) {
      items[index] = { ...items[index], ...item, mastered:false, lastSeen:now, times:(items[index].times || 1) + 1 };
    } else {
      items.unshift({ ...item, mastered:false, createdAt:now, lastSeen:now, times:1 });
    }
    write(MISTAKE_KEY, items);
  }

  function setMistakeMastered(id, mastered) {
    const items = read(MISTAKE_KEY);
    const found = items.find((entry) => entry.id === id);
    if (!found) return;
    found.mastered = Boolean(mastered);
    found.masteredAt = mastered ? Date.now() : null;
    write(MISTAKE_KEY, items);
  }

  function removeMistake(id) {
    write(MISTAKE_KEY, read(MISTAKE_KEY).filter((entry) => entry.id !== id));
  }

  function addEnglish(item) {
    const text = String(item.text || "").trim();
    if (!text) return false;
    const items = read(ENGLISH_KEY);
    const existing = items.find((entry) => entry.text.toLowerCase() === text.toLowerCase());
    const now = Date.now();
    if (existing) {
      Object.assign(existing, item, { text, mastered:false, masteredAt:null, nextReview:now, reviewLevel:Math.max(0, Number(existing.reviewLevel || 0) - 1), lastSeen:now, times:(existing.times || 1) + 1 });
    } else {
      items.unshift({ id:`en-${now}-${Math.random().toString(36).slice(2,7)}`, ...item, text, mastered:false, reviewLevel:0, reviewCount:0, correctStreak:0, nextReview:now, createdAt:now, lastSeen:now, times:1 });
    }
    write(ENGLISH_KEY, items);
    return true;
  }

  function seedEnglish(items) {
    if (localStorage.getItem(VOCAB_SEED_KEY) === "1") return;
    const current = read(ENGLISH_KEY);
    const existing = new Set(current.map((entry) => String(entry.text || "").trim().toLowerCase()));
    const now = Date.now();
    const additions = items.filter((item) => !existing.has(item.text.toLowerCase())).map((item, index) => ({
      id:item.id, ...item, mastered:false, reviewLevel:0, reviewCount:0, correctStreak:0,
      nextReview:now, createdAt:now + index, lastSeen:now, times:1
    }));
    if (additions.length) write(ENGLISH_KEY, [...additions, ...current]);
    localStorage.setItem(VOCAB_SEED_KEY, "1");
  }

  function setEnglishMastered(id, mastered) {
    const items = read(ENGLISH_KEY);
    const found = items.find((entry) => entry.id === id);
    if (!found) return;
    found.mastered = Boolean(mastered);
    found.masteredAt = mastered ? Date.now() : null;
    found.reviewLevel = mastered ? Math.max(4, Number(found.reviewLevel || 0)) : Math.min(3, Number(found.reviewLevel || 0));
    found.nextReview = mastered ? Date.now() + 14 * 86400000 : Date.now();
    write(ENGLISH_KEY, items);
  }

  function removeEnglish(id) {
    write(ENGLISH_KEY, read(ENGLISH_KEY).filter((entry) => entry.id !== id));
  }

  function addDefinition(item) {
    const term = String(item.term || "").trim();
    const definition = String(item.definition || "").trim();
    if (!term || !definition) return false;
    const items = read(DEFINITION_KEY);
    const existing = items.find((entry) => entry.term.toLowerCase() === term.toLowerCase());
    const now = Date.now();
    const next = { ...item, term, definition, updatedAt:now };
    if (existing) Object.assign(existing, next, { mastered:false, nextReview:now, reviewLevel:Math.max(0, Number(existing.reviewLevel || 0) - 1) });
    else items.unshift({ id:`def-${now}-${Math.random().toString(36).slice(2,7)}`, ...next, mastered:false, reviewLevel:0, reviewCount:0, correctStreak:0, nextReview:now, createdAt:now });
    write(DEFINITION_KEY, items);
    return true;
  }

  function updateDefinitionChinese(id, chineseDefinition) {
    const value = String(chineseDefinition || "").trim();
    if (!value) return false;
    const items = read(DEFINITION_KEY);
    const found = items.find((entry) => entry.id === id);
    if (!found) return false;
    found.chineseDefinition = value;
    found.updatedAt = Date.now();
    write(DEFINITION_KEY, items);
    return true;
  }

  function removeDefinition(id) { write(DEFINITION_KEY, read(DEFINITION_KEY).filter((entry) => entry.id !== id)); }
  function setDefinitionMastered(id, mastered) {
    const items = read(DEFINITION_KEY); const found = items.find((entry) => entry.id === id); if (!found) return;
    found.mastered = Boolean(mastered); found.reviewLevel = mastered ? Math.max(4, Number(found.reviewLevel || 0)) : Math.min(3, Number(found.reviewLevel || 0)); found.nextReview = mastered ? Date.now() + 14 * 86400000 : Date.now(); write(DEFINITION_KEY, items);
  }
  function recordDefinitionReview(id, quality) {
    const items = read(DEFINITION_KEY); const found = items.find((entry) => entry.id === id); if (!found) return null;
    const now = Date.now(); const current = Number(found.reviewLevel || 0); const intervals = [0.007, 1, 3, 7, 14, 30];
    const level = quality === "again" ? Math.max(0, current - 1) : quality === "hard" ? Math.max(1, current) : Math.min(5, current + 1);
    const days = quality === "again" ? intervals[0] : quality === "hard" ? Math.max(0.25, intervals[level] / 2) : intervals[level];
    Object.assign(found, { reviewLevel:level, reviewCount:Number(found.reviewCount || 0) + 1, correctStreak:quality === "again" ? 0 : Number(found.correctStreak || 0) + 1, lastResult:quality, lastReviewed:now, nextReview:now + days * 86400000, mastered:level >= 4 });
    write(DEFINITION_KEY, items);
    const stats = read(DEFINITION_STATS_KEY); const today = dayKey(); stats[today] = Number(stats[today] || 0) + 1; write(DEFINITION_STATS_KEY, stats);
    return found;
  }
  function definitionStats() { const items = read(DEFINITION_KEY); return { total:items.length, open:items.filter((x) => !x.mastered).length, due:items.filter((x) => !x.nextReview || x.nextReview <= Date.now()).length }; }

  function dayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function englishStats() {
    const stored = read(ENGLISH_STATS_KEY);
    const base = { dailyGoal:10, xp:0, totalReviews:0, streak:0, lastStudyDate:"", todayKey:"", todayCount:0 };
    const stats = Array.isArray(stored) ? base : { ...base, ...stored };
    if (stats.todayKey !== dayKey()) {
      stats.todayKey = dayKey();
      stats.todayCount = 0;
    }
    return stats;
  }

  function saveEnglishStats(stats) {
    write(ENGLISH_STATS_KEY, stats);
  }

  function recordEnglishReview(id, quality) {
    const items = read(ENGLISH_KEY);
    const found = items.find((entry) => entry.id === id);
    if (!found) return null;
    const now = Date.now();
    const currentLevel = Number(found.reviewLevel || 0);
    const intervals = [0.007, 1, 3, 7, 14, 30];
    let level = currentLevel;
    if (quality === "again") level = Math.max(0, currentLevel - 1);
    if (quality === "hard") level = Math.max(1, currentLevel);
    if (quality === "good") level = Math.min(5, currentLevel + 1);
    const days = quality === "again" ? intervals[0] : quality === "hard" ? Math.max(0.25, intervals[level] / 2) : intervals[level];
    found.reviewLevel = level;
    found.reviewCount = Number(found.reviewCount || 0) + 1;
    found.correctStreak = quality === "again" ? 0 : Number(found.correctStreak || 0) + 1;
    found.lastResult = quality;
    found.lastReviewed = now;
    found.lastSeen = now;
    found.nextReview = now + days * 86400000;
    found.mastered = level >= 4;
    if (found.mastered && !found.masteredAt) found.masteredAt = now;
    if (!found.mastered) found.masteredAt = null;
    write(ENGLISH_KEY, items);

    const stats = englishStats();
    const today = dayKey();
    if (stats.lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      stats.streak = stats.lastStudyDate === dayKey(yesterday) ? Number(stats.streak || 0) + 1 : 1;
      stats.lastStudyDate = today;
    }
    stats.todayKey = today;
    stats.todayCount = Number(stats.todayCount || 0) + 1;
    stats.totalReviews = Number(stats.totalReviews || 0) + 1;
    stats.xp = Number(stats.xp || 0) + ({ again:3, hard:6, good:10 }[quality] || 3);
    saveEnglishStats(stats);
    return { item:found, stats };
  }

  if (course === "7215") seedEnglish([
    { id:"en-scipy-integration", text:"Integration", meaning:"积分", kind:"word", reason:"both", note:"计算曲线下面积、位移或累计量；SciPy 模块：scipy.integrate" },
    { id:"en-scipy-linear-algebra", text:"Linear Algebra", meaning:"线性代数", kind:"phrase", reason:"both", note:"矩阵求逆、求解线性方程组；SciPy 模块：scipy.linalg" },
    { id:"en-scipy-optimization", text:"Optimization", meaning:"优化", kind:"word", reason:"both", note:"寻找函数最小值、最优解或方程的根；SciPy 模块：scipy.optimize" },
    { id:"en-scipy-interpolation", text:"Interpolation", meaning:"插值", kind:"word", reason:"both", note:"根据已知数据估计中间的未知值；SciPy 模块：scipy.interpolate" },
    { id:"en-scipy-fft", text:"Fast Fourier Transform (FFT)", meaning:"快速傅里叶变换", kind:"phrase", reason:"both", note:"把信号从时域转换到频域并分析频率成分；课件写 scipy.fftpack，现代写法为 scipy.fft" },
    { id:"en-scipy-signal-processing", text:"Signal Processing", meaning:"信号处理", kind:"phrase", reason:"both", note:"用于滤波、降噪和检测信号峰值；SciPy 模块：scipy.signal" }
  ]);

  window.ReviewStore = {
    mistakes:() => read(MISTAKE_KEY), upsertMistake, setMistakeMastered, removeMistake,
    english:() => read(ENGLISH_KEY), addEnglish, setEnglishMastered, removeEnglish,
    definitions:() => read(DEFINITION_KEY), addDefinition, updateDefinitionChinese, setDefinitionMastered, removeDefinition, recordDefinitionReview, definitionStats,
    englishStats, recordEnglishReview, course
  };
}());
