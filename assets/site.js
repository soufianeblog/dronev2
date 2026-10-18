// VTOL Y3 guides: light/dark toggle. © 2026 bellocloud.com
(function () {
  var root = document.documentElement;
  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function setLabel(btn) {
    var next = current() === "dark" ? "light" : "dark";
    btn.setAttribute("aria-label", btn.getAttribute("data-label-" + next) || ("Switch to " + next + " mode"));
    btn.title = btn.getAttribute("aria-label");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-btn");
    if (!btn) return;
    setLabel(btn);
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      setLabel(btn);
    });
  });
})();
