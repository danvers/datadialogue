(function () {
  var tabs = document.querySelectorAll(".day-tab");
  var panels = document.querySelectorAll(".day-panel");

  function activate(day) {
    var match = false;
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-day") === day;
      t.classList.toggle("is-active", on);
      if (on) { match = true; }
    });
    panels.forEach(function (p) {
      p.classList.toggle("is-active", p.getAttribute("data-day") === day);
    });
    return match;
  }

  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        activate(tab.getAttribute("data-day"));
      });
    });

    // open the day referenced in the URL hash, e.g. /program/#wed
    var fromHash = function () {
      var day = (location.hash || "").replace("#", "");
      if (day) { activate(day); }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
  }

  document.querySelectorAll(".schedule-item.has-details").forEach(function (item) {
    var row = item.querySelector(".schedule-row");
    var panel = item.querySelector(".schedule-panel");
    row.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      row.setAttribute("aria-expanded", open ? "true" : "false");
      panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    });
  });
})();
