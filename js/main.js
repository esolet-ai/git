(function () {
  "use strict";
  var S = window.SITE, D = window.DIAGRAMS;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var subjectById = {};
  S.subjects.forEach(function (s) { subjectById[s.id] = s; });

  /* ---------- 외부 링크 ---------- */
  $$("[data-link]").forEach(function (a) {
    var url = S.links[a.getAttribute("data-link")];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  });

  /* ---------- 숫자 카운터 ---------- */
  function fmt(v, dec, plain) {
    var n = dec ? v.toFixed(dec) : Math.round(v).toString();
    return plain ? n : n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function runCount(el) {
    if (el.dataset.done) return; el.dataset.done = "1";
    var to = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || "0", 10);
    var plain = el.hasAttribute("data-plain");
    if (reduce) { el.textContent = fmt(to, dec, plain); return; }
    var from = plain ? Math.max(0, to - 30) : 0, dur = 1400, t0 = null;
    function ease(t) { return 1 - Math.pow(1 - t, 4); }
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      el.textContent = fmt(from + (to - from) * ease(p), dec, plain);
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = fmt(from, dec, plain);
    requestAnimationFrame(step);
  }

  /* ---------- 너비 애니메이션 바 ---------- */
  function runBar(el) { el.style.width = el.dataset.w + "%"; }

  /* ---------- 등장 감시 ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (e) {
      if (!e.isIntersecting) return;
      var t = e.target;
      if (t.dataset.count) runCount(t);
      else if (t.dataset.w) runBar(t);
      else t.classList.add("in");
      io.unobserve(t);
    });
  }, { threshold: 0.25 }) : null;
  function watch(el) { if (io) io.observe(el); else if (el.dataset.count) runCount(el); else if (el.dataset.w) runBar(el); else el.classList.add("in"); }

  /* ---------- 좌석 그리드: 굿모닝 10 / 유관기업 5~9 / 일반기업 1~5 ---------- */
  var grid = $("#seatGrid");
  if (grid) {
    for (var i = 0; i < 20; i++) {
      var d = document.createElement("i");
      d.className = "seat " + (i < 10 ? "hire" : i < 15 ? "rel" : i < 19 ? "rel range" : "gen");
      d.style.transitionDelay = (reduce ? 0 : i * 45) + "ms";
      grid.appendChild(d);
    }
    watch(grid);
  }

  /* ---------- 헤더: 스크롤 진행·스파이·모바일 메뉴 ---------- */
  var header = $(".site-header"), bar = $(".progress i");
  var links = $$(".gnb a"), secs = links.map(function (a) { return $(a.getAttribute("href")); });
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", y > 8);
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? y / h : 0) + ")";
    var cur = -1;
    secs.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) cur = i; });
    links.forEach(function (a, i) { a.classList.toggle("on", i === cur); });
  }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var mbtn = $(".menu-btn");
  mbtn.addEventListener("click", function () {
    var open = header.classList.toggle("open");
    mbtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  /* 메뉴 이동: 섹션 상단 여백을 건너뛰고 제목이 헤더 바로 아래 오도록 위치 보정 */
  function goTo(target, smooth) {
    var head = target.querySelector(".sec-head") || target;
    var y = head.getBoundingClientRect().top + window.scrollY - header.offsetHeight - 28;
    window.scrollTo({ top: Math.max(0, y), behavior: smooth && !reduce ? "smooth" : "auto" });
  }
  $$('a[href^="#"]').forEach(function (a) {
    var id = a.getAttribute("href");
    if (id.length < 2 || id === "#main") return;
    a.addEventListener("click", function (e) {
      var t = document.querySelector(id); if (!t) return;
      e.preventDefault();
      header.classList.remove("open"); mbtn.setAttribute("aria-expanded", "false");
      goTo(t, true);
      if (history.replaceState) history.replaceState(null, "", id);
    });
  });
  if (location.hash && document.querySelector(location.hash)) setTimeout(function () { goTo(document.querySelector(location.hash), false); }, 60);

  /* ---------- 직무 ↔ 교과 연결 ---------- */
  var roleTabs = $("#roleTabs"), rolePanel = $("#rolePanel");
  function renderRole(idx) {
    var r = S.roles[idx];
    $$("button", roleTabs).forEach(function (b, i) { b.setAttribute("aria-selected", i === idx ? "true" : "false"); });
    var chips = S.subjects.map(function (s) {
      var on = r.rel.indexOf(s.id) > -1;
      return '<li class="' + (on ? "on" : "") + '"><span>' + s.name + "</span><em>" + s.h + "H</em></li>";
    }).join("");
    var hrs = r.rel.reduce(function (a, id) { return a + subjectById[id].h; }, 0);
    rolePanel.innerHTML = '<div class="rp-text"><h4>' + r.name + "</h4><p>" + r.desc + '</p><p class="rp-sum">연계 교과 <b>' + r.rel.length + "개</b> · 정규교과 <b>" + hrs + 'H</b> + 프로젝트 320H</p></div><ul class="rp-map">' + chips + "</ul>";
  }
  if (roleTabs) {
    roleTabs.innerHTML = S.roles.map(function (r, i) { return '<button role="tab" type="button" data-i="' + i + '">' + r.name + "</button>"; }).join("");
    roleTabs.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) renderRole(+b.dataset.i); });
    renderRole(0);
  }

  /* ---------- 월차 로드맵 ---------- */
  var mt = $("#monthTabs"), mp = $("#monthPanel");
  function segName(id) { return subjectById[id] ? subjectById[id].name : S.segNames[id]; }
  function segCls(id) { return id === "p1" || id === "p2" ? "sg-prj" : (id === "etc" || id === "visit") ? "sg-etc" : "sg-" + subjectById[id].area; }
  function renderMonth(idx) {
    var m = S.months[idx];
    $$("button", mt).forEach(function (b, i) { b.setAttribute("aria-selected", i === idx ? "true" : "false"); });
    var bars = m.seg.map(function (s) {
      return '<i class="' + segCls(s[0]) + '" style="--g:' + s[1] + '" title="' + segName(s[0]) + " " + s[1] + 'H"></i>';
    }).join("");
    var rows = m.seg.map(function (s) {
      return '<li><i class="' + segCls(s[0]) + '"></i><span>' + segName(s[0]) + "</span><b>" + s[1] + "H</b></li>";
    }).join("");
    mp.innerHTML = '<div class="mp-head"><p class="mp-k">' + m.label + ' · ' + m.h + 'H</p><h4>' + m.focus + '</h4></div><div class="mp-bar">' + bars + '</div><ul class="mp-list">' + rows + "</ul>";
    if (!reduce) { mp.classList.remove("swap"); void mp.offsetWidth; mp.classList.add("swap"); }
  }
  if (mt) {
    mt.innerHTML = S.months.map(function (m, i) {
      return '<button role="tab" type="button" data-i="' + i + '"><span>' + m.label + "</span><small>" + m.focus.split(" — ")[0] + "</small></button>";
    }).join("");
    mt.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) renderMonth(+b.dataset.i); });
    mt.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      var cur = $$("button", mt).findIndex(function (b) { return b.getAttribute("aria-selected") === "true"; });
      var n = (cur + (e.key === "ArrowRight" ? 1 : -1) + S.months.length) % S.months.length;
      renderMonth(n); $$("button", mt)[n].focus();
    });
    renderMonth(0);
  }

  /* ---------- 교과목 아코디언 ---------- */
  var subj = $("#subjects");
  if (subj) {
    var max = 150;
    subj.innerHTML = S.subjects.map(function (s, i) {
      return '<details class="subj"' + (i === 4 ? " open" : "") + '><summary>' +
        '<span class="sj-area a-' + s.area + '">' + s.area + "</span>" +
        '<span class="sj-name">' + s.name + "</span>" +
        '<span class="sj-bar"><i data-w="' + (s.h / max * 100).toFixed(1) + '"><b style="width:' + (s.t / s.h * 100) + '%"></b></i></span>' +
        '<span class="sj-h">' + s.h + "H</span></summary>" +
        '<div class="sj-body"><p class="sj-tp">이론 ' + s.t + "H · 실기 " + s.p + "H</p><ul>" +
        s.items.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div></details>";
    }).join("") +
      '<p class="sj-legend"><i class="lt"></i>이론 <i class="lp"></i>실기 · 막대 길이는 교과 시간 비례 (최대 150H)</p>';
    $$(".sj-bar i", subj).forEach(watch);
  }

  /* ---------- 프로젝트 ---------- */
  var pt = $("#prjTabs"), pp = $("#prjPanel");
  function renderPrj(idx) {
    var p = S.projects[idx];
    $$("button", pt).forEach(function (b, i) { b.setAttribute("aria-selected", i === idx ? "true" : "false"); });
    pp.innerHTML =
      '<div class="pj-info">' +
        '<p class="pj-k">' + (p.team ? "2차 하이브리드 인프라 운영 기업 프로젝트 · " + p.team : "1차 가상화 기반 서비스 구축 프로젝트") + " · " + p.hours + "H</p>" +
        "<h3>" + p.title + "</h3><p class=\"pj-lead\">" + p.lead + "</p>" +
        '<h4>수행 과업</h4><ol class="pj-tasks">' + p.tasks.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ol>" +
        '<h4>제출 산출물</h4><ul class="pj-out">' + p.outputs.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" +
      "</div>" +
      '<div class="pj-side"><figure class="pj-fig">' + D[p.svg] + '<figcaption>구성 예시도</figcaption></figure>' +
        p.cases.map(function (c) { return '<div class="pj-case"><p class="pj-ck">선도기업 수행 사례</p><b>' + c.t + "</b><p>" + c.d + "</p></div>"; }).join("") +
        '<ul class="pj-tools">' + p.tools.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" +
      "</div>";
    if (!reduce) { pp.classList.remove("swap"); void pp.offsetWidth; pp.classList.add("swap"); }
  }
  if (pt) {
    pt.innerHTML = S.projects.map(function (p, i) {
      return '<button role="tab" type="button" data-i="' + i + '"><small>' + p.hours + "H</small>" + p.tab + "</button>";
    }).join("");
    pt.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) renderPrj(+b.dataset.i); });
    renderPrj(0);
  }

  /* ---------- 간단 적합도 확인 (참고용 점수) ---------- */
  var form = $("#checkForm"), out = $("#checkResult"), gNum = $("#gaugeNum"), gWrap = $("#gauge");
  var W = { edu: { ok: 40, hs: 15 }, career: { yes: 20, no: 5 }, major: { it: 20, other: 10 }, study: { yes: 20, no: 10 } };
  var shown = 0;
  function animateTo(to) {
    var from = shown, t0 = null; shown = to;
    gWrap.style.setProperty("--v", to);
    if (reduce) { gNum.textContent = to; return; }
    (function step(ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / 600);
      gNum.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(performance.now());
  }
  var consultBtns = '<div class="cr-btns"><a class="btn btn-cta btn-sm" target="_blank" rel="noopener" href="' + S.links.consult + '">상담 신청</a><a class="btn btn-kakao btn-sm" target="_blank" rel="noopener" href="' + S.links.kakao + '">카카오톡 상담</a></div>';
  if (form) form.addEventListener("change", function () {
    var v = {}, score = 0, answered = 0;
    Object.keys(W).forEach(function (k) { var c = form.querySelector('input[name="' + k + '"]:checked'); v[k] = c ? c.value : null; if (c) { answered++; score += W[k][c.value]; } });
    gWrap.classList.toggle("partial", answered < 4); gWrap.classList.add("on");
    animateTo(score);
    if (answered < 4) { out.className = "check-result"; out.innerHTML = '<p class="muted">' + (4 - answered) + "개 항목을 더 선택해 주세요.</p>"; return; }
    var head, tips = [], cls = "r-ok";
    if (v.edu === "hs") {
      cls = "r-ask"; head = "상담 시 문의 요망";
      tips.push(v.career === "yes" ? "IT 분야 실무 경력이 있으면 지원할 수 있습니다. 상담에서 경력 사항을 확인해 주세요." : "학력 기준 외 지원은 IT 분야 경력 확인이 필요합니다. 상담에서 지원 가능 여부와 다른 인프라·클라우드 과정을 함께 안내받을 수 있습니다.");
    } else if (score >= 80) {
      head = "우대 요건에 해당합니다";
      tips.push("기초역량평가 대비로 서버·네트워크·OS 기본 개념을 한 번 정리해 두세요.");
    } else {
      head = "지원 가능합니다";
      tips.push(v.major === "other" ? "비전공자도 지원할 수 있습니다. 학업계획서에 준비 계획을 구체적으로 적고, 선발 후 제공되는 사전학습 자료를 활용하세요." : "TCP/IP, Linux 기본 명령, 가상화 개념을 미리 살펴보면 기초역량평가에 도움이 됩니다.");
    }
    out.className = "check-result " + cls;
    out.innerHTML = "<b>" + head + "</b><ul>" + tips.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" + consultBtns;
  });

  /* ---------- 간트 ---------- */
  var g = $("#gantt");
  if (g) {
    var G = S.gantt, cols = G.cols, head = '<div class="gt-row gt-head"><span class="gt-label"></span><div class="gt-cells">';
    for (var c = 0; c < cols; c++) {
      var mm = (G.start.m - 1 + c) % 12 + 1, yy = G.start.y + Math.floor((G.start.m - 1 + c) / 12);
      head += '<span class="' + (mm === 1 ? "yr" : "") + '">' + (mm === 1 || c === 0 ? "<em>" + String(yy).slice(2) + "</em>" : "") + mm + "월</span>";
    }
    head += "</div></div>";
    var rows = G.rows.map(function (r) {
      return '<div class="gt-row"><span class="gt-label">' + r.label + '</span><div class="gt-cells"><i class="gt-bar ' + r.cls + '" style="--s:' + r.from + ";--e:" + (r.to + 1) + ";--n:" + cols + '"></i></div></div>';
    }).join("");
    var now = new Date(), idx = (now.getFullYear() - G.start.y) * 12 + (now.getMonth() + 1 - G.start.m);
    var nowMark = idx >= 0 && idx < cols ? '<i class="gt-now" style="--x:' + ((idx + now.getDate() / 31) / cols) + '"><b>오늘</b></i>' : "";
    g.innerHTML = head + '<div class="gt-body">' + rows + nowMark + "</div>";
    watch(g);
  }

  /* ---------- 나머지 등장 요소 ---------- */
  $$(".num[data-count]").forEach(watch);
  $$("[data-w]").forEach(function (el) { if (!el.closest(".sj-bar")) watch(el); });
  $$(".reveal, .feature, .flow-step, .person, .kpis li, .org-item, .compare-row, .duo-col, .steps li, .rg-steps li, .elig-item").forEach(function (el) { el.classList.add("reveal"); watch(el); });

  /* FAQ: 하나만 열기 */
  $$("#faqList details").forEach(function (d) {
    d.addEventListener("toggle", function () { if (d.open) $$("#faqList details").forEach(function (o) { if (o !== d) o.open = false; }); });
  });
})();
