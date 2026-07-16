/* UI interactions: boot sequence, typewriter, nav, scroll reveal */
(function () {
  "use strict";

  // Kill any stale service worker + caches from the old React build so
  // returning visitors always get the latest site (no stale HTML).
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
    }).catch(function () {});
  }
  if (window.caches && caches.keys) {
    caches.keys().then(function (keys) {
      keys.forEach(function (k) { caches.delete(k); });
    }).catch(function () {});
  }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Boot sequence ---------- */
  var bootLines = [
    "[  OK  ] Initializing kernel modules...",
    "[  OK  ] Mounting /dev/portfolio",
    "[  OK  ] Loading profile: carlos_ivan_pineda",
    "[  OK  ] Connecting to AWS eu-region... established",
    "[  OK  ] Decrypting credentials... done",
    "[  OK  ] Starting matrix daemon... running",
    "> access granted. welcome.",
  ];
  var boot = document.getElementById("boot");
  var bootLog = document.getElementById("boot-log");

  function finishBoot() {
    if (!boot) return;
    boot.classList.add("done");
    setTimeout(function () { boot.style.display = "none"; }, 650);
    startTyping();
  }

  if (reduce || !bootLog) {
    if (boot) { boot.style.display = "none"; }
    startTyping();
  } else {
    var bi = 0;
    (function nextLine() {
      if (bi >= bootLines.length) { setTimeout(finishBoot, 450); return; }
      bootLog.textContent += bootLines[bi] + "\n";
      bi++;
      setTimeout(nextLine, 180 + Math.random() * 160);
    })();
  }

  /* ---------- Typewriter role ---------- */
  var roles = [
    "Software Engineer",
    "AI Engineer",
    "Full Stack Developer",
    "Backend Architect",
    "LLM / RAG Developer",
    "AWS Cloud Engineer",
  ];
  function startTyping() {
    var el = document.getElementById("typed");
    if (!el) return;
    if (reduce) { el.textContent = roles[0]; return; }
    var r = 0, c = 0, deleting = false;
    (function tick() {
      var word = roles[r];
      el.textContent = word.substring(0, c);
      if (!deleting && c < word.length) { c++; setTimeout(tick, 70); }
      else if (!deleting && c === word.length) { deleting = true; setTimeout(tick, 1600); }
      else if (deleting && c > 0) { c--; setTimeout(tick, 35); }
      else { deleting = false; r = (r + 1) % roles.length; setTimeout(tick, 300); }
    })();
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revs = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revs.forEach(function (el) { io.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add("visible"); });
  }
})();
