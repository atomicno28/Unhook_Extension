(() => {
  "use strict";
  (() => {
    let t,
      e = chrome;
    "object" == typeof browser &&
      "object" == typeof browser.runtime &&
      (e = browser),
      (t = e.storage.local),
      "object" == typeof e.storage.sync && (t = e.storage.sync),
      (function (o, r = null, s = []) {
        t.get(r, (n) => {
          e.runtime.lastError
            ? ((t = e.storage.local),
              t.get(r, (t) => {
                o(t, ...s);
              }))
            : o(n, ...s);
        });
      })(
        function (t) {
          document.documentElement.setAttribute(
            "dark_mode",
            t.popup_settings.dark_mode
          );
        },
        ["popup_settings"]
      );
  })();
})();
