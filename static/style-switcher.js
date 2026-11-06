// Style and layout pickers for the recipebox site. scripts/build-site.sh
// adds this to every page and copies the sheets to static/styles/. Each
// choice lives in localStorage, so it follows the reader across pages.
//
// Style swaps the card stylesheet (culina.css). Layout sets data-layout on
// <html>, which culina-grid.css reads to show the CfE grid in place of the
// ingredient list and method; it only appears on pages that carry a grid.
(function () {
  var STYLES = [
    ["recipe-card", "Recipe card"],
    ["inline-measurements", "Inline measurements"],
    ["parallel-tracks", "Parallel tracks"],
    ["index-card", "Index card"],
  ];
  var LAYOUTS = [
    ["card", "Card"],
    ["grid", "Grid"],
    ["grid-slant", "Grid, slanted"],
  ];
  var root = document.documentElement;
  var link = document.querySelector('link[rel="stylesheet"][href$="culina.css"]');
  if (!link) return;

  function stored(key, options, fallback) {
    var v = null;
    try {
      v = localStorage.getItem(key);
    } catch (e) {}
    return options.some(function (o) { return o[0] === v; }) ? v : fallback;
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }
  function applyStyle(name) {
    link.href = name === "recipe-card" ? "culina.css" : "static/styles/" + name + ".css";
  }
  function applyLayout(name) {
    root.setAttribute("data-layout", name);
  }

  // Runs in <head>, before first paint, so a saved choice never flashes the
  // default. A layout the site config set is the default for a new reader.
  var style = stored("recipebox-style", STYLES, "recipe-card");
  var layout = stored("recipebox-layout", LAYOUTS, root.getAttribute("data-layout") || "card");
  applyStyle(style);
  applyLayout(layout);

  function picker(text, options, current, onChange) {
    var label = document.createElement("label");
    label.textContent = text + " ";
    var select = document.createElement("select");
    options.forEach(function (o) {
      var opt = document.createElement("option");
      opt.value = o[0];
      opt.textContent = o[1];
      opt.selected = o[0] === current;
      select.appendChild(opt);
    });
    select.addEventListener("change", function () { onChange(select.value); });
    label.appendChild(select);
    return label;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var box = document.createElement("div");
    box.className = "culina-style-picker";
    box.appendChild(picker("Style", STYLES, style, function (v) {
      applyStyle(v);
      save("recipebox-style", v);
    }));
    if (document.querySelector(".culina-grid-view")) {
      box.appendChild(picker("Layout", LAYOUTS, layout, function (v) {
        applyLayout(v);
        save("recipebox-layout", v);
      }));
    }

    // Own styling, so the pickers look the same under every sheet.
    var css = document.createElement("style");
    css.textContent =
      ".culina-style-picker{position:fixed;top:8px;right:8px;z-index:1000;display:flex;gap:10px;" +
      "font:13px/1.2 system-ui,sans-serif;color:#333;background:rgba(255,255,255,.92);" +
      "border:1px solid #bbb;border-radius:4px;padding:4px 6px}" +
      ".culina-style-picker select{font:inherit}" +
      "@media print{.culina-style-picker{display:none}}";
    document.head.appendChild(css);
    document.body.appendChild(box);
  });
})();
