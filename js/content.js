(() => {
  "use strict";
  (() => {
    let e,
      t = chrome;
    function n(n, o = null, r = []) {
      e.get(o, (c) => {
        t.runtime.lastError
          ? ((e = t.storage.local),
            e.get(o, (e) => {
              n(e, ...r);
            }))
          : n(c, ...r);
      });
    }
    const o =
        ("object" == typeof browser &&
          "object" == typeof browser.runtime &&
          (t = browser),
        (e = t.storage.local),
        "object" == typeof t.storage.sync && (e = t.storage.sync),
        t),
      r = document.documentElement;
    function c(e) {
      Object.keys(e).forEach((t) => {
        -1 !== t.indexOf("hide") && r.setAttribute(t, e[t]);
      });
    }
    function i(e) {
      !0 === e.yt_on && c(e),
        (function () {
          const e = document.createElement("script");
          (e.src = o.runtime.getURL("js/unhook-yt.js")),
            (e.id = "unhook-yt"),
            r.appendChild(e);
        })();
    }
    function u(e) {
      Object.keys(e).forEach((e) => {
        -1 !== e.indexOf("hide") && r.removeAttribute(e);
      });
    }
    function s() {
      n(i),
        o.storage.onChanged.addListener((e) => {
          Object.prototype.hasOwnProperty.call(e, "yt_on")
            ? e.yt_on.newValue
              ? n(c)
              : n(u)
            : Object.keys(e).forEach((t) => {
                -1 !== t.indexOf("hide") && r.setAttribute(t, e[t].newValue);
              });
        });
    }
    document.unhookRunning ||
      ((document.unhookRunning = !0),
      window === window.parent
        ? s()
        : window.addEventListener("DOMContentLoaded", () => {
            document.getElementById("player") && s();
          }));
  })();
})();
