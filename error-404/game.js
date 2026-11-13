/* Hi Daniel! 404 page: language switch + "Bắt trang lạc" (Catch the lost pages) mouse game.
   Static, no backend. Colours are read from the design-system CSS variables. */
(() => {
  "use strict";

  // ---------- Copy ----------
  const I18N = {
    vi: {
      eyebrow: "Lỗi 404",
      title1: "Trang này",
      title2: "đi lạc rồi.",
      lead: "Đường dẫn có thể đã đổi, đã bị xoá, hoặc website đang được cập nhật. Thử tải lại sau ít phút, hoặc về trang chủ nhé.",
      home: "Về trang chủ",
      reload: "Tải lại trang",
      back: "← Quay lại trang trước",
      gameEyebrow: "Mini game · trong lúc chờ",
      gameTitle: "Bắt trang lạc",
      best: "Kỷ lục",
      score: "Điểm",
      combo: "Combo",
      time: "Thời gian",
      howTitle: "Bấm vào bong bóng trước khi chúng bay mất!",
      howText: "Bắt liên tiếp để tăng combo. Bạn có 30 giây.",
      lgPage: "Trang lạc +1",
      lgStar: "Ngôi sao +5",
      lgBug: "Con bọ −3",
      start: "Bắt đầu chơi",
      again: "Chơi lại",
      overTitle: "Hết giờ!",
      newBest: "Kỷ lục mới!",
      result: "Bạn ghi được <strong>{score}</strong> điểm, combo cao nhất <strong>x{combo}</strong>.",
      hint: "Trò chơi chạy hoàn toàn trên trình duyệt của bạn.",
      footer: "Mã lỗi 404 · Không tìm thấy trang",
      canvas: "Khu vực chơi: bấm chuột vào bong bóng",
      docTitle: "404 · Hi Daniel!",
    },
    en: {
      eyebrow: "Error 404",
      title1: "This page",
      title2: "got lost.",
      lead: "The link may have changed or been removed, or the site is being updated. Try reloading in a few minutes, or head back home.",
      home: "Back to home",
      reload: "Reload page",
      back: "← Go to previous page",
      gameEyebrow: "Mini game · while you wait",
      gameTitle: "Catch the lost pages",
      best: "Best",
      score: "Score",
      combo: "Combo",
      time: "Time",
      howTitle: "Click the bubbles before they float away!",
      howText: "Catch them in a row to build your combo. You have 30 seconds.",
      lgPage: "Lost page +1",
      lgStar: "Star +5",
      lgBug: "Bug −3",
      start: "Start playing",
      again: "Play again",
      overTitle: "Time's up!",
      newBest: "New best!",
      result: "You scored <strong>{score}</strong> points with a top combo of <strong>x{combo}</strong>.",
      hint: "The game runs entirely in your browser.",
      footer: "Error 404 · Page not found",
      canvas: "Play area: click the bubbles",
      docTitle: "404 · Hi Daniel!",
    },
  };

  const store = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* storage blocked: keep going without it */
      }
    },
  };

  const $ = (id) => document.getElementById(id);
  let lang = store.get("hd404.lang") || "vi"; // Vietnamese first, like the website
  const t = (key) => I18N[lang][key];

  function applyLang(next) {
    lang = I18N[next] ? next : "vi";
    document.documentElement.lang = lang;
    document.title = t("docTitle");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });
    $("game").setAttribute("aria-label", t("canvas"));
    if (state === "over") showResult();
    store.set("hd404.lang", lang);
  }

  // ---------- Page actions ----------
  const home = document.body.dataset.home || "/";
  document.querySelectorAll("[data-home-link]").forEach((a) => a.setAttribute("href", home));
  $("reload").addEventListener("click", () => location.reload());
  const back = $("back");
  if (history.length > 1) back.addEventListener("click", () => history.back());
  else back.hidden = true;
  document.querySelectorAll("[data-lang]").forEach((btn) => btn.addEventListener("click", () => applyLang(btn.dataset.lang)));

  // ---------- Game ----------
  const ROUND = 30; // seconds
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const canvas = $("game");
  const ctx = canvas.getContext("2d");
  const stage = $("stage");
  const overlay = $("overlay");
  const ui = { score: $("score"), combo: $("combo"), time: $("time"), bar: $("timebar"), best: $("best") };

  const css = getComputedStyle(document.documentElement);
  const token = (name) => css.getPropertyValue(`--hd-${name}`).trim();
  const C = {
    page: token("navy-800"),
    pageText: token("white"),
    pageAccent: token("flame-500"),
    star: token("sun-brand"),
    starEdge: token("flame-500"),
    bug: token("danger"),
    ink: token("navy-900"),
    white: token("white"),
    sparks: [token("flame-500"), token("sun-brand"), token("mint-brand"), token("sky-brand"), token("violet-brand")],
    good: token("success"),
    bad: token("danger"),
    font: token("font-sans"),
  };

  let W = 0;
  let H = 0;
  let scale = 1; // entity size factor for small screens
  let state = "idle"; // idle | playing | over
  let raf = 0;
  let last = 0;
  let elapsed = 0;
  let spawnIn = 0;
  let score = 0;
  let combo = 0;
  let maxCombo = 1;
  let lastHit = -10;
  let shake = 0;
  let best = Number(store.get("hd404.best")) || 0;
  let shown = { score: -1, combo: -1, time: -1 };
  const bubbles = [];
  const sparks = [];
  const popups = [];

  ui.best.textContent = best;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width;
    H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scale = Math.max(0.75, Math.min(1, W / 520));
    if (state !== "playing") draw();
  }
  new ResizeObserver(resize).observe(stage);

  const rand = (a, b) => a + Math.random() * (b - a);
  const multiplier = () => Math.min(5, 1 + Math.floor((combo - 1) / 3));

  function spawn(progress) {
    const roll = Math.random();
    const bugChance = 0.12 + 0.12 * progress;
    const type = roll < 0.07 ? "star" : roll < 0.07 + bugChance ? "bug" : "page";
    const r = (type === "star" ? 22 : rand(24, 32)) * scale;
    const speed = rand(70, 115) * (1 + progress * 0.9) * (type === "star" ? 1.35 : 1) * (0.7 + scale * 0.3);
    bubbles.push({
      type,
      r,
      x: rand(r * 1.3, W - r * 1.3),
      y: H + r * 1.4,
      vy: -speed,
      sway: rand(10, 26) * scale,
      phase: rand(0, Math.PI * 2),
      spin: rand(-1, 1),
      age: 0,
      pop: 0,
    });
  }

  function burst(x, y, colors, count) {
    const n = reduceMotion.matches ? Math.ceil(count / 3) : count;
    for (let i = 0; i < n; i++) {
      const a = rand(0, Math.PI * 2);
      const v = rand(90, 260);
      sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 60, life: 1, size: rand(3, 6), color: colors[i % colors.length] });
    }
  }

  function popup(x, y, text, color) {
    popups.push({ x, y, text, color, life: 1 });
  }

  // ---------- Input ----------
  function pointerPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (state !== "playing") return;
    const { x, y } = pointerPos(e);
    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      const hitR = b.r * (b.type === "page" ? 1.25 : 1.15);
      if ((x - b.x) ** 2 + (y - b.y) ** 2 > hitR * hitR) continue;
      bubbles.splice(i, 1);
      if (b.type === "bug") {
        score = Math.max(0, score - 3);
        combo = 0;
        shake = reduceMotion.matches ? 0 : 0.25;
        burst(b.x, b.y, [C.bug, C.ink], 10);
        popup(b.x, b.y, "−3", C.bad);
        return;
      }
      combo = elapsed - lastHit < 1.3 ? combo + 1 : 1;
      lastHit = elapsed;
      const gain = (b.type === "star" ? 5 : 1) * multiplier();
      maxCombo = Math.max(maxCombo, multiplier());
      score += gain;
      burst(b.x, b.y, b.type === "star" ? [C.star, C.starEdge, C.white] : C.sparks, b.type === "star" ? 18 : 12);
      popup(b.x, b.y, `+${gain}`, b.type === "star" ? C.starEdge : C.good);
      return;
    }
    // Clicked empty space: combo resets.
    combo = 0;
  });

  // ---------- Loop ----------
  function update(dt) {
    elapsed += dt;
    const progress = Math.min(1, elapsed / ROUND);

    spawnIn -= dt;
    if (spawnIn <= 0) {
      spawn(progress);
      spawnIn = rand(0.75, 1.05) - progress * 0.45;
    }
    if (combo && elapsed - lastHit > 1.3) combo = 0;

    for (let i = bubbles.length - 1; i >= 0; i--) {
      const b = bubbles[i];
      b.age += dt;
      b.y += b.vy * dt;
      if (b.y < -b.r * 1.6) {
        bubbles.splice(i, 1);
        if (b.type === "page") combo = 0; // a lost page escaped
      }
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.life -= dt * 1.8;
      s.vy += 520 * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      if (s.life <= 0) sparks.splice(i, 1);
    }
    for (let i = popups.length - 1; i >= 0; i--) {
      const p = popups[i];
      p.life -= dt * 1.4;
      p.y -= 50 * dt;
      if (p.life <= 0) popups.splice(i, 1);
    }
    shake = Math.max(0, shake - dt);

    if (elapsed >= ROUND) endRound();
  }

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // Speech bubble with "404", echoing the logo.
  function drawPage(b) {
    const w = b.r * 2.3;
    const h = b.r * 1.65;
    const x = -w / 2;
    const y = -h / 2;
    ctx.fillStyle = C.page;
    roundRect(x, y, w, h, b.r * 0.5);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + w * 0.2, y + h - 2);
    ctx.lineTo(x + w * 0.14, y + h + b.r * 0.5);
    ctx.lineTo(x + w * 0.45, y + h - 2);
    ctx.fill();
    ctx.fillStyle = C.pageText;
    ctx.font = `800 ${Math.round(b.r * 0.72)}px ${C.font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("404", 0, 1);
    ctx.fillStyle = C.pageAccent;
    ctx.beginPath();
    ctx.arc(w / 2 - b.r * 0.32, y + b.r * 0.32, b.r * 0.13, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawStar(b) {
    ctx.rotate(b.age * b.spin * 2);
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 ? b.r * 0.48 : b.r * 1.15;
      const a = (i * Math.PI) / 5 - Math.PI / 2;
      ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.fillStyle = C.star;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.strokeStyle = C.starEdge;
    ctx.stroke();
  }

  function drawBug(b) {
    const wiggle = Math.sin(b.age * 14) * 0.25;
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    for (const side of [-1, 1]) {
      for (let k = -1; k <= 1; k++) {
        ctx.beginPath();
        ctx.moveTo(side * b.r * 0.6, k * b.r * 0.4);
        ctx.lineTo(side * b.r * 1.15, k * b.r * 0.55 + (k === 0 ? wiggle * b.r : wiggle * b.r * -k));
        ctx.stroke();
      }
    }
    ctx.beginPath();
    ctx.moveTo(-b.r * 0.25, -b.r * 0.8);
    ctx.lineTo(-b.r * 0.45, -b.r * 1.2);
    ctx.moveTo(b.r * 0.25, -b.r * 0.8);
    ctx.lineTo(b.r * 0.45, -b.r * 1.2);
    ctx.stroke();
    ctx.fillStyle = C.bug;
    ctx.beginPath();
    ctx.ellipse(0, 0, b.r * 0.72, b.r * 0.9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(0, -b.r * 0.55);
    ctx.lineTo(0, b.r * 0.85);
    ctx.stroke();
    ctx.fillStyle = C.white;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.arc(side * b.r * 0.26, -b.r * 0.5, b.r * 0.14, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.save();
    if (shake > 0) ctx.translate(rand(-5, 5) * shake * 4, rand(-5, 5) * shake * 4);

    for (const b of bubbles) {
      ctx.save();
      ctx.translate(b.x + Math.sin(b.age * 2.2 + b.phase) * b.sway, b.y);
      if (b.type === "page") drawPage(b);
      else if (b.type === "star") drawStar(b);
      else drawBug(b);
      ctx.restore();
    }

    for (const s of sparks) {
      ctx.globalAlpha = Math.max(0, s.life);
      ctx.fillStyle = s.color;
      ctx.fillRect(s.x - s.size / 2, s.y - s.size / 2, s.size, s.size);
    }
    ctx.globalAlpha = 1;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const p of popups) {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.font = `800 ${Math.round(22 * scale)}px ${C.font}`;
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, p.x, p.y);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  function setStat(el, key, value, text) {
    if (shown[key] === value) return;
    shown[key] = value;
    el.textContent = text;
    if (key !== "time" && !reduceMotion.matches) {
      el.classList.remove("bump");
      void el.offsetWidth; // restart the CSS animation
      el.classList.add("bump");
    }
  }

  function renderHud() {
    const left = Math.max(0, ROUND - elapsed);
    setStat(ui.score, "score", score, String(score));
    const m = combo ? multiplier() : 1;
    setStat(ui.combo, "combo", m, `x${m}`);
    setStat(ui.time, "time", Math.ceil(left), `${Math.ceil(left)}s`);
    ui.bar.style.transform = `scaleX(${left / ROUND})`;
  }

  function frame(now) {
    // Clamp dt so a hidden tab (rAF paused) does not skip the clock forward.
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    draw();
    renderHud();
    if (state === "playing") raf = requestAnimationFrame(frame);
  }

  function startRound() {
    bubbles.length = sparks.length = popups.length = 0;
    elapsed = score = combo = 0;
    maxCombo = 1;
    lastHit = -10;
    spawnIn = 0.2;
    shown = { score: -1, combo: -1, time: -1 };
    state = "playing";
    overlay.hidden = true;
    canvas.focus({ preventScroll: true });
    last = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
  }

  function showResult() {
    const isBest = score > 0 && score >= best;
    $("overlay-title").textContent = isBest ? `${t("overTitle")} ${t("newBest")}` : t("overTitle");
    $("overlay-text").innerHTML = t("result").replace("{score}", score).replace("{combo}", maxCombo);
    $("start").textContent = t("again");
  }

  function endRound() {
    state = "over";
    bubbles.length = 0;
    if (score > best) {
      best = score;
      store.set("hd404.best", String(best));
      ui.best.textContent = best;
    }
    // Let the last sparks fade, then stop the loop.
    const fadeStart = performance.now();
    const fade = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      for (const s of sparks) s.life -= dt * 1.8;
      for (const p of popups) p.life -= dt * 1.4;
      draw();
      if (now - fadeStart < 600) raf = requestAnimationFrame(fade);
    };
    raf = requestAnimationFrame(fade);
    showResult();
    $("start").removeAttribute("data-i18n");
    overlay.hidden = false;
    $("start").focus({ preventScroll: true });
  }

  $("start").addEventListener("click", startRound);

  applyLang(lang);
  renderHud();
})();
