(function () {
  const key = "idat-course-selection-v1";
  const params = new URLSearchParams(location.search);
  const requested = params.get("course");
  const course = requested === "7224" || requested === "7215" ? requested : localStorage.getItem(key) || "7215";
  localStorage.setItem(key, course);
  window.CourseSwitch = { current: () => course };
  document.documentElement.dataset.course = course;
  const labels = { "7215": "IDAT 7215 · Programming & AI", "7224": "IDAT 7224 · Deep Learning" };
  const nav = document.querySelector(".site-nav");
  if (!nav) return;
  const selector = document.createElement("label");
  selector.className = "course-switch";
  selector.innerHTML = '<span>Course</span><select aria-label="选择课程"><option value="7215">IDAT 7215</option><option value="7224">IDAT 7224</option></select>';
  const select = selector.querySelector("select");
  select.value = course;
  select.addEventListener("change", () => {
    localStorage.setItem(key, select.value);
    const next = new URL(location.href);
    next.searchParams.set("course", select.value);
    ["set", "paper"].forEach((name) => next.searchParams.delete(name));
    location.href = next.href;
  });
  nav.appendChild(selector);
  if (!document.getElementById("course-switch-style")) {
    const style = document.createElement("style");
    style.id = "course-switch-style";
    style.textContent = ".course-switch{display:flex;align-items:center;gap:7px;margin-left:auto;padding:6px 10px;border:1px solid rgba(31,77,58,.18);border-radius:10px;background:#fffdf8;color:#315543;font-size:12px;font-weight:800}.course-switch select{border:0;background:transparent;color:#315543;font-weight:800;cursor:pointer}.course-empty-note{padding:10px 12px;border-left:4px solid #b06d25;border-radius:0 9px 9px 0;background:#fff5df;color:#6f4d19}.course-switch-content{width:100%}.course-7224-study{display:block!important}.course-7224-study .course-switch-content{max-width:1280px;margin:0 auto;padding:30px 28px}.course-7224-study .course-card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px}.course-lesson-card{position:relative}.course-lesson-card header{align-items:flex-start}.course-tag{display:inline-block;margin:-4px 0 12px;padding:4px 8px;border-radius:99px;background:#e5f1e9;color:#315543;font-size:11px;font-style:normal;font-weight:900}.course-diagram{display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin:14px 0}.course-diagram span{flex:1;min-width:84px;padding:11px 7px;border-radius:10px;background:#edf4ef;color:#315543;text-align:center;font-size:12px;font-weight:800}.course-diagram i{color:#b06d25;font-style:normal;font-size:20px}.course-source{display:block;color:#8b8174;margin-top:10px}.course-switch-content .case{margin-top:10px}.course-switch-content .exam-move{margin-top:10px}@media(max-width:900px){.course-7224-study .course-card-grid{grid-template-columns:1fr}.course-switch{margin-left:0}.site-nav{flex-wrap:wrap}}";
    document.head.appendChild(style);
    const materialStyle = document.createElement("style");
    materialStyle.textContent = ".course-materials{margin-top:22px}.material-tabs{display:flex;gap:8px;flex-wrap:wrap;margin:15px 0}.material-tab{border:1px solid #b8d3c3;border-radius:10px;padding:10px 13px;background:#fffdf8;color:#315543;font-weight:800;cursor:pointer}.material-tab.on{background:#315543;color:#fff}.material-viewer{border:1px solid #d9dfd7;border-radius:16px;background:#fffdf8;padding:18px}.material-meta{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:10px 12px;border-radius:10px;background:#edf4ef;color:#315543}.material-meta span{color:#8b8174;font-size:12px}.material-doc{margin-top:14px}.material-section{border:1px solid #d9dfd7;border-radius:12px;margin:9px 0;overflow:hidden;background:#fff}.material-section summary{cursor:pointer;padding:13px 15px;background:#f1f6f1;color:#315543;font-weight:900}.material-body{padding:13px 15px}.material-body h3{margin-top:18px;color:#315543}.material-body img{display:block;max-width:100%;height:auto;max-height:480px;object-fit:contain;margin:12px auto;border-radius:8px;background:#f3f5f1}.material-body p{color:#4f5f54;line-height:1.75}.material-body code{padding:2px 5px;border-radius:4px;background:#edf4ef;color:#315543}.material-body ul{color:#4f5f54}.material-table{white-space:pre-wrap;overflow:auto;padding:12px;border-radius:9px;background:#f5f3ec;color:#4f5f54;font:12px/1.5 Consolas,monospace}@media(max-width:700px){.material-meta{display:block}.material-meta span{display:block;margin-top:5px}}";
    document.head.appendChild(materialStyle);
  }
  const brand = nav.querySelector(".brand span:last-child");
  if (brand) brand.textContent = course === "7224" ? "IDAT 7224" : "IDAT 7215";
  nav.querySelectorAll(".site-links a").forEach((link) => {
    const next = new URL(link.href, location.href);
    next.searchParams.set("course", course);
    link.href = next.href;
  });
  const title = document.querySelector(".kicker");
  if (title) title.textContent = labels[course];
})();

