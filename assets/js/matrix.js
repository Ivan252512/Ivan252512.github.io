/* Matrix digital rain — canvas background */
(function () {
  var canvas = document.getElementById("matrix");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノabcdefghijklmnopqrstuvwxyz0123456789$+-*/<>=;{}[]".split("");
  var fontSize = 16;
  var columns, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height / fontSize;
    }
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    ctx.fillStyle = "rgba(13, 2, 8, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";
    for (var i = 0; i < drops.length; i++) {
      var text = chars[Math.floor(Math.random() * chars.length)];
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      // leading char brighter
      ctx.fillStyle = Math.random() > 0.975 ? "#d6ffe0" : "#00ff41";
      ctx.fillText(text, x, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  if (reduce) {
    draw();
    return;
  }
  var last = 0;
  function loop(t) {
    if (t - last > 55) { draw(); last = t; }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
