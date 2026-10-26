/* Worldie OS — shared site script */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const page = document.body.dataset.page || "home";

  /* ---------- Icons ---------- */
  const I = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
    ticket: '<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5z"/><path d="M14 5v14" stroke-dasharray="2 2.5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20.5c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    shield: '<path d="M12 3l8 3v6c0 4.6-3.4 8.3-8 9-4.6-.7-8-4.4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3z"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
    bed: '<path d="M3 18V7M3 14h18v4M21 14v-2.5a3 3 0 0 0-3-3h-7v5.5"/><circle cx="7" cy="11" r="2"/>',
    palm: '<path d="M12 21v-9"/><path d="M12 12c-2-3-6-3.5-8-2 2-3 6-3.5 8 0 2-3.5 6-3 8 0-2-1.5-6-1-8 2z"/><path d="M12 12c-1-3 0-6 3-8"/>',
    fork: '<path d="M7 3v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3M9 13v8M17 3c-2 0-3 2-3 5s1 4 3 4v9"/>',
    leaf: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l8-8"/>',
    glass: '<path d="M6 3h12l-1 6a5 5 0 0 1-10 0z"/><path d="M12 14v7M8 21h8"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3"/>',
    anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v14M5 13a7 7 0 0 0 14 0M8 11h8"/>',
    boat: '<path d="M3 17l2 4h14l2-4z"/><path d="M12 3v14M12 4l6 10h-6"/>',
    home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z"/>',
    building: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    key2: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M4 7l8 6 8-6"/>',
    whatsapp: '<path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z"/><path d="M9 9c0 3 2.5 5.8 6 6l1-1.5-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2z" fill="currentColor" stroke="none"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor"/>',
    messenger: '<path d="M12 3C7 3 3 6.7 3 11.3c0 2.6 1.3 4.9 3.3 6.4V21l3-1.7c.9.3 1.8.4 2.7.4 5 0 9-3.7 9-8.3S17 3 12 3z"/><path d="M7.5 13.5l3-3 2.5 2 3.5-3"/>',
    sms: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/>',
    qr: '<rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><path d="M14 14h2v2h-2zM18 18h2.5M14 20.5V18M18 14h2.5v2"/>',
    web: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    plug: '<path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
    eye: '<path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    alert: '<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17h.01"/>',
    coin: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.6-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.4-2.6-1.2M12 6.5v11"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
  };
  const svg = (name, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${I[name] || ""}</svg>`;
  document.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = svg(el.dataset.icon) + el.innerHTML;
  });

  /* ---------- Brand mark ---------- */
  const logo = `<picture><source srcset="assets/img/worldie-logo.webp" type="image/webp" /><img class="brand__logo" src="assets/img/worldie-logo.png" alt="Worldie" width="1062" height="251" /></picture>`;

  /* ---------- Nav + footer ---------- */
  const LOGIN_URL = "https://os.worldie.ai/login";
  // Main navigation from the client copy; Intelligence & language, Integrations & trust
  // and FAQs sit in the Solutions menu (and the footer)
  const solutionsMenu = [
    ["solutions.html", "Solutions", "solutions"],
    ["intelligence.html", "Intelligence & language", "intelligence"],
    ["integrations-and-trust.html", "Integrations & trust", "integrations"],
    ["faqs.html", "FAQs", "faqs"],
  ];
  const links = [
    ["bridge-network.html", "Creator Bridge", "bridge"],
    ["how-it-works.html", "How it works", "how"],
    ["who-its-for.html", "Who it’s for", "who"],
    ["results.html", "Results", "results"],
  ];
  const navLink = ([h, l, k]) => `<a href="${h}" class="${k === page ? "is-active" : ""}">${l}</a>`;
  const solutionsActive = solutionsMenu.some(([, , k]) => k === page);
  const navHost = document.querySelector("[data-nav]");
  if (navHost) {
    navHost.outerHTML = `
    <nav class="nav" aria-label="Primary">
      <div class="nav__inner">
        <a class="brand" href="index.html" aria-label="Worldie home">${logo}</a>
        <div class="nav__links">
          <div class="nav__drop">
            <a href="solutions.html" class="nav__trigger ${solutionsActive ? "is-active" : ""}" aria-haspopup="true">Solutions <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></a>
            <div class="nav__menu">${solutionsMenu.map(navLink).join("")}</div>
          </div>
          ${links.map(navLink).join("")}
        </div>
        <div class="nav__cta">
          <a class="btn btn--glass btn--sm nav__login" href="${LOGIN_URL}">Client Login</a>
          <a class="btn btn--gold btn--sm" href="book-a-demo.html">Book a demo ${svg("arrow")}</a>
          <button class="nav__toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
        </div>
      </div>
    </nav>
    <div class="mobile-menu" aria-hidden="true">
      ${[solutionsMenu[0], ...links, solutionsMenu[1], solutionsMenu[2], ["creators.html", "For Creators"], solutionsMenu[3]]
        .map(([h, l], i) => `<a href="${h}" style="transition-delay:${i * 30}ms">${l}</a>`).join("")}
      <div class="btn-row">
        <a class="btn btn--glass" href="${LOGIN_URL}">Client Login</a>
        <a class="btn btn--gold" href="book-a-demo.html">Book a demo ${svg("arrow")}</a>
      </div>
    </div>`;
    const nav = document.querySelector(".nav");
    const toggle = nav.querySelector(".nav__toggle");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 20), { passive: true });
  }

  const footHost = document.querySelector("[data-footer]");
  if (footHost) {
    footHost.outerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="stack" style="gap:18px">
            <a class="brand brand--footer" href="index.html" aria-label="Worldie home">${logo}</a>
            <p style="margin:0;font-size:18px;color:var(--text)">Worldie — Bespoke AI for hospitality.</p>
            <p class="gold-text" style="margin:0;font-size:16px;line-height:1.5;max-width:380px">Creator partnerships. Connected service. Clearer results. Powered by Worldie OS.</p>
          </div>
          <nav class="footer__links" aria-label="Footer">
            <a href="solutions.html">Solutions</a><a href="bridge-network.html">Creator Bridge</a><a href="intelligence.html">Intelligence &amp; language</a><a href="how-it-works.html">How it works</a><a href="who-its-for.html">Who it’s for</a><a href="results.html">Results</a><a href="integrations-and-trust.html">Integrations &amp; trust</a><a href="creators.html">For Creators</a><a href="faqs.html">FAQs</a><a href="book-a-demo.html">Book a demo</a>
          </nav>
        </div>
        <div class="footer__bottom"><span>© 2026 Worldie. All rights reserved.</span><span class="footer__legal"><a href="#">Privacy Notice</a><a href="#">Cookie Policy</a><a href="#">Terms</a><a href="#">Data Requests</a></span></div>
      </div>
    </footer>`;
  }

  /* ---------- Split headlines into words for blur reveal ---------- */
  document.querySelectorAll("[data-words]").forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) return frag.append(part);
            const s = document.createElement("span");
            s.className = "w";
            s.style.setProperty("--i", i++);
            s.textContent = part;
            frag.append(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") {
          // Keep styled spans (e.g. <em>) intact as one unit so gradients aren't broken
          if (n.matches("em")) {
            n.classList.add("w");
            n.style.setProperty("--i", i++);
          } else walk(n);
        }
      });
    };
    walk(el);
    el.classList.add("words");
  });

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          e.target.dispatchEvent(new CustomEvent("reveal"));
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.08, rootMargin: "0px 0px -2% 0px" }
  );
  document.querySelectorAll(".reveal, .words, [data-observe]").forEach((el) => io.observe(el));
  // Catch anything skipped by a fast scroll or anchor jump
  let sweepQueued = false;
  const sweep = () => {
    sweepQueued = false;
    document.querySelectorAll(".reveal:not(.is-in), .words:not(.is-in), [data-observe]:not(.is-in)").forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * 0.9) {
        io.unobserve(el);
        el.classList.add("is-in");
        el.dispatchEvent(new CustomEvent("reveal"));
      }
    });
  };
  addEventListener("scroll", () => { if (!sweepQueued) { sweepQueued = true; setTimeout(sweep, 120); } }, { passive: true });

  /* ---------- Counters ---------- */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const run = () => {
      if (reduce) return (el.textContent = target.toLocaleString("en") + suffix);
      const t0 = performance.now();
      const dur = 1800;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const v = target * (1 - Math.pow(1 - p, 4));
        el.textContent = Math.round(v).toLocaleString("en") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); o.disconnect(); } }, { threshold: 0.5 });
    o.observe(el);
  });

  /* ---------- Spotlight cards ---------- */
  document.querySelectorAll(".spot").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  /* ---------- Gold particle globe ---------- */
  function globe(canvas, opts = {}) {
    const ctx = canvas.getContext("2d");
    const N = opts.points || 1400;
    const pts = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    // Arcs between random points = messages travelling across the world
    const arcs = Array.from({ length: opts.arcs ?? 10 }, () => newArc());
    function newArc() {
      const a = pts[(Math.random() * N) | 0];
      const b = pts[(Math.random() * N) | 0];
      return { a, b, t: Math.random(), speed: 0.0025 + Math.random() * 0.004 };
    }
    const stars = Array.from({ length: opts.stars ?? 180 }, () => [Math.random(), Math.random(), Math.random() * 1.2 + 0.2, Math.random() * Math.PI * 2]);

    let w, h, dpr, R, cx, cy, rot = 0, visible = true, mx = 0, my = 0;
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 1.5); // soft dots don't need full Retina resolution
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w, h) * (opts.scale || 0.42);
      cx = w * (opts.x ?? 0.5);
      cy = h * (opts.y ?? 0.5);
    };
    resize();
    addEventListener("resize", resize);
    if (opts.mouse) addEventListener("pointermove", (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);

    const tilt = opts.tilt ?? 0.35;
    const project = ([x, y, z], ry, rx) => {
      let X = x * Math.cos(ry) - z * Math.sin(ry);
      let Z = x * Math.sin(ry) + z * Math.cos(ry);
      let Y = y * Math.cos(rx) - Z * Math.sin(rx);
      Z = y * Math.sin(rx) + Z * Math.cos(rx);
      return [cx + X * R, cy + Y * R, Z];
    };
    const slerp = (a, b, t) => {
      const v = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
      const len = Math.hypot(...v) || 1;
      const lift = 1 + Math.sin(Math.PI * t) * 0.35;
      return v.map((c) => (c / len) * lift);
    };

    function frame(time) {
      requestAnimationFrame(frame);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      // stars
      for (const s of stars) {
        const a = 0.25 + 0.35 * Math.sin(time * 0.0012 + s[3]);
        ctx.fillStyle = `rgba(246,225,161,${a * 0.6})`;
        ctx.fillRect(s[0] * w, s[1] * h, s[2], s[2]);
      }
      if (!reduce) rot += opts.speed ?? 0.0016;
      const ry = rot + mx * 0.6, rx = tilt + my * 0.3;
      // halo
      const g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.5);
      g.addColorStop(0, "rgba(212,175,55,0.10)");
      g.addColorStop(1, "rgba(212,175,55,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, Math.PI * 2); ctx.fill();
      // points
      for (const p of pts) {
        const [x, y, z] = project(p, ry, rx);
        const depth = (z + 1) / 2; // 0 back, 1 front
        const a = 0.08 + depth * 0.75;
        const size = 0.5 + depth * 1.3;
        ctx.fillStyle = depth > 0.82 ? `rgba(255,241,196,${a})` : `rgba(212,175,55,${a})`;
        ctx.fillRect(x, y, size, size);
      }
      // arcs
      ctx.lineWidth = 1;
      for (let k = 0; k < arcs.length; k++) {
        const arc = arcs[k];
        arc.t += reduce ? 0 : arc.speed;
        if (arc.t > 1.35) arcs[k] = newArc(), (arcs[k].t = 0);
        const head = Math.min(arc.t, 1), tail = Math.max(0, arc.t - 0.35);
        ctx.beginPath();
        let started = false, lastZ = 0, hp;
        for (let s = tail; s <= head; s += 0.02) {
          const [x, y, z] = project(slerp(arc.a, arc.b, s), ry, rx);
          lastZ = z; hp = [x, y];
          started ? ctx.lineTo(x, y) : (ctx.moveTo(x, y), (started = true));
        }
        const alpha = lastZ > -0.2 ? 0.75 : 0.18;
        ctx.strokeStyle = `rgba(246,225,161,${alpha})`;
        ctx.stroke();
        if (hp && arc.t < 1) {
          ctx.fillStyle = `rgba(255,248,220,${alpha})`;
          ctx.beginPath(); ctx.arc(hp[0], hp[1], 2, 0, Math.PI * 2); ctx.fill();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  document.querySelectorAll("canvas[data-globe]").forEach((c) => {
    const o = JSON.parse(c.dataset.globe || "{}");
    globe(c, o);
  });

  /* ---------- Launch film placeholder waveform ---------- */
  document.querySelectorAll("canvas[data-wave]").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    let w, h, visible = true;
    const resize = () => {
      const d = Math.min(devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * d; canvas.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    resize(); addEventListener("resize", resize);
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
    const draw = (t) => {
      requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, w, h);
      const lines = 26;
      for (let i = 0; i < lines; i++) {
        const p = i / lines;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const nx = x / w;
          const env = Math.sin(nx * Math.PI);
          const y = h * 0.62 + Math.sin(nx * 6 + t * 0.0008 + p * 2.2) * h * 0.08 * env + Math.sin(nx * 13 - t * 0.0013 + p * 4) * h * 0.03 * env + (p - 0.5) * h * 0.18 * env;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = `rgba(212,175,55,${0.04 + (1 - Math.abs(p - 0.5) * 2) * 0.22})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };
    requestAnimationFrame(draw);
  });

  /* ---------- Launch video: plays the real film once a src is set ---------- */
  document.querySelectorAll(".launch").forEach((el) => {
    const btn = el.querySelector(".play");
    const src = el.dataset.videoSrc;
    if (!btn) return;
    btn.addEventListener("click", () => {
      if (!src) {
        btn.animate([{ transform: "scale(1)" }, { transform: "scale(0.9)" }, { transform: "scale(1)" }], { duration: 400, easing: "ease-out" });
        const note = el.querySelector("[data-soon]");
        if (note) note.textContent = "Launch film premieres soon";
        return;
      }
      const v = document.createElement("video");
      v.src = src; v.controls = true; v.autoplay = true; v.playsInline = true;
      el.querySelector(".launch__screen").append(v);
      el.classList.add("is-playing");
    });
  });

  /* ---------- Scroll-linked: stage tilt, float parallax, step progress ---------- */
  const stage = document.querySelector(".stage");
  const launch = stage && stage.querySelector(".launch");
  const floats = [...document.querySelectorAll(".float")];
  const steps = document.querySelector(".steps");
  let mouseX = 0, mouseY = 0;
  addEventListener("pointermove", (e) => { mouseX = e.clientX / innerWidth - 0.5; mouseY = e.clientY / innerHeight - 0.5; }, { passive: true });

  const loop = () => {
    requestAnimationFrame(loop);
    if (reduce) return;
    if (launch) {
      const r = stage.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - (r.top - innerHeight * 0.15) / (innerHeight * 0.75)));
      launch.style.setProperty("--tilt", `${(1 - p) * 16}deg`);
      launch.style.setProperty("--scale", (0.92 + p * 0.08).toFixed(3));
      floats.forEach((f, i) => {
        const depth = (i % 2 ? 1 : -1) * (18 + i * 6);
        f.style.transform = `translate3d(${mouseX * depth}px, ${mouseY * depth - p * (30 + i * 12)}px, 0)`;
      });
    }
    if (steps) {
      const r = steps.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.2)));
      steps.style.setProperty("--p", p.toFixed(3));
      steps.querySelectorAll(".step").forEach((s, i, all) => s.classList.toggle("is-lit", p >= i / all.length + 0.02));
    }
  };
  requestAnimationFrame(loop);

  /* ---------- Hero chat: language rotator ---------- */
  const rot = document.querySelector("[data-lang-rotator]");
  if (rot) {
    const convo = [
      ["ES", "¿Tienen mesa para seis esta noche?", "¡Claro! Tengo una mesa a las 20:30 en la terraza. ¿La reservo?"],
      ["FR", "Le spa est-il ouvert à 7h ?", "Oui, dès 7h. Je vous réserve un massage de 60 min ?"],
      ["JA", "レイトチェックアウトは可能ですか？", "はい、14時まで可能です。お手配しましょうか？"],
      ["PT", "O ar-condicionado parou de funcionar.", "Sinto muito! Já avisei a manutenção — urgente."],
      ["DE", "Gibt es heute Abend noch Plätze?", "Ja, um 21 Uhr ist ein Tisch frei. Soll ich buchen?"],
      ["EN", "Can we bring our dog?", "Of course — pets are welcome in our garden suites."],
    ];
    let k = 0;
    const lang = rot.querySelector("[data-l]"), q = rot.querySelector("[data-q]"), a = rot.querySelector("[data-a]");
    const set = () => {
      const [l, qq, aa] = convo[k++ % convo.length];
      rot.animate([{ opacity: 1 }, { opacity: 0, filter: "blur(6px)" }], { duration: 300, fill: "forwards" }).onfinish = () => {
        lang.textContent = l; q.textContent = qq; a.textContent = aa;
        rot.animate([{ opacity: 0, filter: "blur(6px)" }, { opacity: 1, filter: "blur(0)" }], { duration: 500, fill: "forwards" });
      };
    };
    setInterval(set, 3600);
  }

  /* ---------- AI team: the concierge routes each customer to a specialist ---------- */
  document.querySelectorAll("[data-routing]").forEach((box) => {
    const scenes = [
      { ch: "WhatsApp · 19:42", guest: "Table for six on Saturday at 8? It's my mum's birthday 🎂", intent: "Intent · Booking", mood: "Mood · Celebrating", lang: "EN", to: "reservations", toLabel: "Reservations", reply: "Happy early birthday to her! I have a table for six at 20:00 on the terrace. Shall I hold it under your name?" },
      { ch: "Instagram · 15:10", guest: "¿Tienen masajes en pareja esta tarde?", intent: "Intent · Experience", mood: "Mood · Curious", lang: "ES", to: "experiences", toLabel: "Experiences", reply: "¡Sí! Tenemos un masaje en pareja de 60 minutos a las 17:30. ¿Lo reservo para ustedes?" },
      { ch: "Text · 23:06", guest: "The shower in 214 is only running cold.", intent: "Intent · Request", mood: "Mood · Frustrated", lang: "EN", to: "facilities", toLabel: "Facilities", reply: "I'm sorry about that. I've sent maintenance to room 214 as a priority. They'll be with you shortly." },
    ];
    const $ = (sel) => box.querySelector(sel);
    const steps = [...box.querySelectorAll("[data-step]")];
    const rows = [...box.querySelectorAll("[data-agent]")];
    const state = (agent, text) => {
      const row = box.querySelector(`[data-agent="${agent}"]`);
      row.classList.toggle("is-on", !!text);
      row.querySelector(".roster__state").textContent = text || "";
    };
    let k = 0, timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const play = () => {
      const s = scenes[k++ % scenes.length];
      steps.forEach((el) => el.classList.remove("is-shown"));
      rows.forEach((r) => { r.classList.remove("is-on"); r.querySelector(".roster__state").textContent = ""; });
      state("concierge", "Listening");
      $("[data-channel]").textContent = s.ch;
      $("[data-guest]").textContent = s.guest;
      $("[data-intent]").textContent = s.intent;
      $("[data-mood]").textContent = s.mood;
      $("[data-lang]").textContent = "Language · " + s.lang;
      $("[data-to]").textContent = s.toLabel;
      $("[data-reply]").textContent = s.reply;
      $("[data-sign]").textContent = s.toLabel + " specialist · in your brand's voice";
      at(300, () => steps[0].classList.add("is-shown"));
      at(1200, () => { state("concierge", "Reading"); steps[1].classList.add("is-shown"); });
      at(2300, () => { state("concierge", "Routing"); steps[2].classList.add("is-shown"); });
      at(3000, () => { state("concierge", ""); state(s.to, "Replying"); });
      at(3900, () => steps[3].classList.add("is-shown"));
      at(7600, play);
    };
    let started = false;
    box.addEventListener("reveal", () => {
      if (started) return;
      started = true;
      play();
      if (reduce) {
        // Show the first scene fully, without the timed sequence
        timers.forEach(clearTimeout);
        steps.forEach((el) => el.classList.add("is-shown"));
        state("concierge", "");
        state(scenes[0].to, "Replying");
      }
    });
  });

  /* ---------- "Your setup": features and specialists per business type ---------- */
  document.querySelectorAll("[data-config]").forEach((box) => {
    const setups = [
      { specialists: ["Reservations", "Private events"], features: ["Tables & waitlists", "Booking links", "Review requests", "Customer campaigns"], channels: ["Website", "WhatsApp", "Instagram"] },
      { specialists: ["Berths", "Charters", "Facilities"], features: ["Berth enquiries", "Service requests", "Staff approvals", "Customer history"], channels: ["Website", "WhatsApp", "Text"] },
      { specialists: ["Reservations", "Experiences", "Facilities"], features: ["Guest requests", "Relevant extras", "Escalation", "Daily knowledge gaps"], channels: ["Website", "WhatsApp", "Instagram", "Messenger"] },
      { specialists: ["Membership", "Events"], features: ["Member profiles", "Segments", "Staff approvals", "Follow-ups"], channels: ["Website", "WhatsApp", "Text"] },
    ];
    const tabs = [...box.querySelectorAll("[role=tab]")];
    const fill = (sel, items) => {
      box.querySelector(sel).innerHTML = items.map((t, i) => `<span style="--i:${i}">${t}</span>`).join("");
    };
    let k = 0, timer;
    const show = (i) => {
      k = i;
      tabs.forEach((t, j) => { t.classList.toggle("is-on", j === i); t.setAttribute("aria-selected", j === i); });
      fill("[data-specialists]", setups[i].specialists);
      fill("[data-features]", setups[i].features);
      fill("[data-channels]", setups[i].channels);
    };
    const auto = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show((k + 1) % setups.length), 3600); };
    tabs.forEach((t, i) => t.addEventListener("click", () => { show(i); auto(); }));
    show(0);
    auto();
  });

  /* ---------- Integrations: a request moving through your rules ---------- */
  document.querySelectorAll("[data-rflow]").forEach((box) => {
    const stages = [...box.querySelectorAll(".stage-card")];
    const rules = [...box.querySelectorAll("[data-rule]")];
    const approve = box.querySelector("[data-approve]");
    const setP = (p) => box.style.setProperty("--p", p);
    // Run the track exactly from the first stage's circle to the last one (row or column layout)
    const track = box.querySelector(".rflow__track");
    const nodes = [...box.querySelectorAll(".stage-card__node")];
    const fitTrack = () => {
      const b = box.getBoundingClientRect();
      const c = (n) => { const r = n.getBoundingClientRect(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top]; };
      const [x1, y1] = c(nodes[0]), [x2, y2] = c(nodes[nodes.length - 1]);
      const vertical = Math.abs(x2 - x1) < 2;
      Object.assign(track.style, vertical
        ? { left: `${x1 - 1}px`, top: `${y1}px`, width: "2px", height: `${y2 - y1}px`, right: "auto", bottom: "auto" }
        : { left: `${x1}px`, top: `${y1 - 1}px`, width: `${x2 - x1}px`, height: "2px", right: "auto", bottom: "auto" });
    };
    fitTrack();
    addEventListener("resize", fitTrack);
    const showAll = () => {
      stages.forEach((s) => s.classList.add("on"));
      rules.forEach((r) => r.classList.add(r.hasAttribute("data-hold") ? "hold" : "ok"));
      approve.classList.add("pressed");
      setP(1);
    };
    let timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const play = () => {
      timers.forEach(clearTimeout); timers = [];
      stages.forEach((s) => s.classList.remove("on"));
      rules.forEach((r) => r.classList.remove("ok", "hold"));
      approve.classList.remove("pressed");
      setP(0);
      at(200, () => stages[0].classList.add("on"));
      at(900, () => setP(1 / 3));
      at(1700, () => stages[1].classList.add("on"));
      rules.forEach((r, i) => at(2200 + i * 600, () => r.classList.add(r.hasAttribute("data-hold") ? "hold" : "ok")));
      at(4200, () => setP(2 / 3));
      at(5000, () => stages[2].classList.add("on"));
      at(6000, () => approve.classList.add("pressed"));
      at(6600, () => setP(1));
      at(7400, () => stages[3].classList.add("on"));
      at(11000, play);
    };
    let started = false;
    box.addEventListener("reveal", () => {
      if (started) return;
      started = true;
      reduce ? showAll() : play();
    });
  });

  /* ---------- Tone selector cycle ---------- */
  document.querySelectorAll("[data-cycle]").forEach((row) => {
    const items = [...row.children];
    let i = 0;
    setInterval(() => {
      items.forEach((s) => s.classList.remove("on"));
      items[i++ % items.length].classList.add("on");
    }, 1400);
  });

  /* ---------- Trust check sequence ---------- */
  document.querySelectorAll("[data-check]").forEach((box) => {
    const rows = [...box.querySelectorAll(".check__row")];
    const bar = box.querySelector(".scanline i");
    let started = false;
    const run = () => {
      rows.forEach((r) => r.classList.remove("on"));
      if (bar) { bar.style.transition = "none"; bar.style.width = "0"; }
      rows.forEach((r, i) =>
        setTimeout(() => {
          r.classList.add("on");
          if (bar && i === 1) { bar.style.transition = ""; bar.style.width = "100%"; }
        }, 400 + i * 1300)
      );
      setTimeout(run, 400 + rows.length * 1300 + 3200);
    };
    box.addEventListener("reveal", () => { if (!started) { started = true; run(); } });
    io.observe(box);
  });

  /* ---------- Language cloud shimmer ---------- */
  document.querySelectorAll(".lang-cloud").forEach((cloud) => {
    const items = [...cloud.children];
    setInterval(() => {
      items.forEach((s) => s.classList.remove("lit"));
      for (let n = 0; n < 3; n++) items[(Math.random() * items.length) | 0].classList.add("lit");
    }, 1100);
  });

  /* ---------- Demo form ---------- */
  const form = document.querySelector("[data-demo-form]");
  if (form) {
    // Sector cards on "Who it's for" link here with ?type=… to preselect the business type
    const type = new URLSearchParams(location.search).get("type");
    const select = form.querySelector("select[name=type]");
    if (type && select && select.querySelector(`option[value="${CSS.escape(type)}"]`)) select.value = type;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("has-errors");
        form.querySelector(":invalid").focus();
        return;
      }
      form.classList.remove("has-errors");
      form.classList.add("is-sent");
      form.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    });
  }

  /* ---------- Journey strips: steps light up in order along the track ---------- */
  document.querySelectorAll("[data-journey]").forEach((box) => {
    const steps = [...box.querySelectorAll(".journey__steps li")];
    const nodes = steps.map((li) => li.querySelector(".journey__node"));
    const track = box.querySelector(".journey__track");
    // Run the track from the first node's centre to the last (row or column layout)
    const fit = () => {
      const b = box.getBoundingClientRect();
      const c = (n) => { const r = n.getBoundingClientRect(); return [r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top]; };
      const [x1, y1] = c(nodes[0]), [x2, y2] = c(nodes[nodes.length - 1]);
      const vertical = Math.abs(x2 - x1) < 2;
      Object.assign(track.style, vertical
        ? { left: `${x1 - 1}px`, top: `${y1}px`, width: "2px", height: `${y2 - y1}px` }
        : { left: `${x1}px`, top: `${y1 - 1}px`, width: `${x2 - x1}px`, height: "2px" });
    };
    fit();
    addEventListener("resize", fit);
    const setP = (p) => box.style.setProperty("--p", p);
    const last = steps.length - 1;
    let timers = [];
    const play = () => {
      timers.forEach(clearTimeout); timers = [];
      steps.forEach((s) => s.classList.remove("on"));
      setP(0);
      steps.forEach((s, i) => {
        timers.push(setTimeout(() => { setP(i / last); }, 300 + i * 1100));
        timers.push(setTimeout(() => s.classList.add("on"), 300 + i * 1100 + (i ? 700 : 0)));
      });
      timers.push(setTimeout(play, 300 + steps.length * 1100 + 2600));
    };
    let started = false;
    box.addEventListener("reveal", () => {
      if (started) return;
      started = true;
      if (reduce) { steps.forEach((s) => s.classList.add("on")); setP(1); } else play();
    });
  });
})();
