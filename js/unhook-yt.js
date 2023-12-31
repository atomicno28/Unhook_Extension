(() => {
  const e = document.documentElement,
    t = window.MutationObserver || window.WebKitMutationObserver,
    n = {
      hide_feed: !1,
      hide_redirect_home: !1,
      hide_subs: !1,
      hide_notifs: !1,
    },
    i = Object.keys(n),
    o = "https://www.youtube.com/feed/subscriptions";
  let c,
    u,
    r = !1,
    s = !1,
    l = !1,
    d = !1,
    a = !1,
    m = !1,
    h = !1;
  function f(e, t, n) {
    ((n && c) || (!n && u)) &&
      "true" === t.getAttribute("aria-checked") &&
      (t.click(), setTimeout(f.bind(null, e, t, n), e));
  }
  function g(e, t) {
    "true" === e.getAttribute("aria-checked")
      ? (e.click(), setTimeout(f.bind(null, t, e, !1), t))
      : document.getElementsByClassName("ytp-iv-video-content").length &&
        (e.click(), e.click());
  }
  function y(e) {
    const t = e.getElementsByClassName("annOption");
    for (let e = 0; e < t.length; e += 1) g(t[e], 1500);
    return !t.length;
  }
  function b(e, t) {
    const n = e.querySelectorAll(".ytp-menuitem[role=menuitemcheckbox]");
    n.length &&
      ((annToggle = n[n.length - 1]),
      annToggle.classList.add("annOption"),
      u && g(annToggle, t));
  }
  function w(e, t) {
    const n = 2500;
    e.firstChild
      ? b(e, n)
      : setTimeout(() => {
          t.click(), t.click(), b(e, n);
        }, n);
  }
  function p(e, n) {
    new t((t) => {
      y(e) && w(e, n);
    }).observe(e, { childList: !0 });
  }
  function v(e, n) {
    const i = e.getElementsByClassName("ytp-settings-button");
    if (i.length) {
      const t = i[i.length - 1];
      t.click(), t.click();
      const o = e.getElementsByClassName("ytp-panel-menu"),
        c = o[o.length - 1];
      w(c, t), n ? m || (p(c, t), (m = !0)) : h || (p(c, t), (h = !0));
    } else
      e.hidden ||
        !document.body.contains(e) ||
        e.getElementsByClassName("ytp-unmute").length ||
        e.getElementsByClassName("watchThumbImageContainer").length ||
        new t(function () {
          e.getElementsByClassName("ytp-unmute").length &&
            (v(e, n), this.disconnect());
        }).observe(e, { childList: !0, subtree: !0 });
  }
  function E(e, t) {
    y(e) && v(e, t);
  }
  function _(e, t) {
    const n = e.getElementsByClassName("ytp-autonav-toggle-button")[0];
    return (
      !!n &&
      ("true" === n.getAttribute("aria-checked") &&
        (n.click(), t && setTimeout(f.bind(null, 1500, n, !0), 1500)),
      !0)
    );
  }
  function k(e, n) {
    if (!window.Polymer) return !1;
    const i = document.getElementsByTagName("ytd-watch-flexy")[0];
    if (i && !i.hidden)
      e &&
        (function (e) {
          s ||
            _(e, !1) ||
            ((s = !0),
            new t(function () {
              _(e, !0) && ((s = !1), this.disconnect());
            }).observe(e, { childList: !0, subtree: !0 }));
        })(i),
        n && E(i, !0);
    else if (n) {
      const e = document.querySelector("ytd-browse[page-subtype=channels]");
      e &&
        !e.hidden &&
        e.getElementsByTagName("ytd-channel-video-player-renderer").length &&
        E(e, !1);
    }
    return !0;
  }
  function N(e, t) {
    if (!document.getElementById("player-container-id")) return !1;
    const n = document.getElementById("player");
    if (n && !n.hidden) {
      if (e) {
        const e = document.getElementsByClassName(
          "ytm-autonav-toggle-button-container"
        )[0];
        e && "true" === e.getAttribute("aria-pressed") && e.click();
      }
      t && E(n, !0);
    }
    return !0;
  }
  function B(e) {
    u && E(e, !0);
  }
  function T(e) {
    const t = e.getElementsByTagName("video")[0];
    return !!t && (t.addEventListener("loadeddata", () => B(e)), B(e), !0);
  }
  function L() {
    if (window === window.parent) return !1;
    const e = document.getElementById("player");
    return (
      !!e &&
      (l
        ? B(e)
        : ((l = !0),
          T(e) ||
            new t(function () {
              T(e) && this.disconnect();
            }).observe(e, { childList: !0 })),
      !0)
    );
  }
  function A(e) {
    const t = /^\(\d+\) +/;
    t.test(e.innerText) && (e.innerText = e.innerText.replace(t, ""));
  }
  function C() {
    if (d) return;
    const e = document.getElementsByTagName("title")[0];
    e &&
      (A(e),
      (function (e) {
        new t(function () {
          n.hide_notifs ? A(e) : ((d = !1), this.disconnect());
        }).observe(e, { childList: !0 });
      })(e),
      (d = !0));
  }
  function P(e) {
    e.stopPropagation();
  }
  function S(e) {
    e.href !== o &&
      (e.addEventListener("click", P, !0),
      e.addEventListener("touchend", P, !0),
      (e.href = o));
  }
  function x() {
    return n.hide_feed && n.hide_redirect_home && !n.hide_subs;
  }
  function I() {
    if (a) return;
    const e = document.querySelector("a#logo");
    e &&
      (S(e),
      (function (e) {
        new t(function () {
          r ? S(e) : ((a = !1), this.disconnect());
        }).observe(e, { attributes: !0, attributeFilter: ["href"] });
      })(e),
      (a = !0));
  }
  function O() {
    const e = document.querySelector("a#logo");
    e &&
      e.href === o &&
      (e.removeEventListener("click", P, !0),
      e.removeEventListener("touchend", P, !0),
      (e.href = "/"));
  }
  function q(t) {
    if (
      null == u &&
      ((c = "true" === e.getAttribute("hide_autoplay")),
      (u = "true" === e.getAttribute("hide_annotations")),
      window.Polymer)
    ) {
      for (let t = 0; t <= i.length; t += 1)
        n[i[t]] = "true" === e.getAttribute(i[t]);
      (r = x()),
        -1 === document.cookie.indexOf("SAPISID=") &&
          e.setAttribute("yt-signed-out", "");
    }
    window.Polymer && (n.hide_notifs && C(), r && I()),
      (c || u) &&
        (window.Polymer
          ? k(c, u)
          : 1 === t
          ? !N(c, u) && u && L()
          : 2 === t && N(c, u));
  }
  window.addEventListener("load", q.bind(null, 1)),
    window.addEventListener("yt-page-data-updated", q),
    window.addEventListener("state-navigateend", q.bind(null, 2)),
    "complete" === document.readyState && q(1),
    new t((t) => {
      if (null != u)
        for (let i = 0; i < t.length; i += 1)
          if ("hide_autoplay" === t[i].attributeName)
            (c = "true" === e.getAttribute("hide_autoplay")),
              c && (k(!0, !1) || N(!0, !1));
          else if ("hide_annotations" === t[i].attributeName)
            (u = "true" === e.getAttribute("hide_annotations")),
              u && (k(!1, !0) || N(!1, !0) || L());
          else if (window.Polymer)
            if (
              ((n[t[i].attributeName] =
                "true" === e.getAttribute(t[i].attributeName)),
              "hide_notifs" === t[i].attributeName)
            )
              n.hide_notifs && C();
            else {
              const e = r;
              (r = x()), r ? I() : e && O();
            }
    }).observe(e, {
      attributes: !0,
      attributeFilter: ["hide_autoplay", "hide_annotations", ...i],
    });
})();
