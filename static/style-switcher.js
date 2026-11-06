// Style picker for the recipebox site. scripts/build-site.sh adds this to
// every page and copies the sheets to static/styles/. The choice lives in
// localStorage, so it follows the reader across pages.
(function () {
  var STYLES = [
    ["recipe-card", "Recipe card"],
    ["inline-measurements", "Inline measurements"],
    ["parallel-tracks", "Parallel tracks"],
    ["index-card", "Index card"],
  ];
  var KEY = "recipebox-style";
  var link = document.querySelector('link[rel="stylesheet"][href$="culina.css"]');
  if (!link) return;

  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }
  function apply(name) {
    link.href = name === "recipe-card" ? "culina.css" : "static/styles/" + name + ".css";
  }

  // Runs in <head>, before first paint, so the saved sheet never flashes
  // the default.
  var current = stored();
  if (!STYLES.some(function (s) { return s[0] === current; })) current = "recipe-card";
  apply(current);

  document.addEventListener("DOMContentLoaded", function () {
    var label = document.createElement("label");
    label.className = "culina-style-picker";
    label.textContent = "Style ";
    var select = document.createElement("select");
    STYLES.forEach(function (s) {
      var o = document.createElement("option");
      o.value = s[0];
      o.textContent = s[1];
      o.selected = s[0] === current;
      select.appendChild(o);
    });
    select.addEventListener("change", function () {
      apply(select.value);
      try {
        localStorage.setItem(KEY, select.value);
      } catch (e) {}
    });
    label.appendChild(select);

    // Own styling, so the picker looks the same under every sheet.
    var css = document.createElement("style");
    css.textContent =
      ".culina-style-picker{position:fixed;top:8px;right:8px;z-index:1000;" +
      "font:13px/1.2 system-ui,sans-serif;color:#333;background:rgba(255,255,255,.92);" +
      "border:1px solid #bbb;border-radius:4px;padding:4px 6px}" +
      ".culina-style-picker select{font:inherit}" +
      "@media print{.culina-style-picker{display:none}}";
    document.head.appendChild(css);
    document.body.appendChild(label);
  });
})();
