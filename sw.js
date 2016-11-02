var __wpo = {
  "assets": {"main": ["./assets/app.js"], "additional": [], "optional": []},
  "hashesMap": {"eea82f429231a07ddd58bacfdcc214f5": "./assets/app.js"},
  "strategy": "all",
  "version": "2016-11-02 21:09:27",
  "name": "webpack-offline",
  "relativePaths": true
};

!function (n) {
  function e(r) {
    if (t[r])return t[r].exports;
    var o = t[r] = {i: r, l: !1, exports: {}};
    return n[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
  }

  var t = {};
  return e.m = n, e.c = t, e.i = function (n) {
    return n
  }, e.d = function (n, e, t) {
    Object.defineProperty(n, e, {configurable: !1, enumerable: !0, get: t})
  }, e.n = function (n) {
    var t = n && n.__esModule ? function () {
      return n["default"]
    } : function () {
      return n
    };
    return e.d(t, "a", t), t
  }, e.o = function (n, e) {
    return Object.prototype.hasOwnProperty.call(n, e)
  }, e.p = "./assets/", e(e.s = 2)
}([function (n, e) {
}, function (n, e) {
  "use strict"
}, function (n, e, t) {
  "use strict";
  function r(n) {
    function e() {
      if (!p.additional.length)return Promise.resolve();
      s && console.log("[SW]:", "Caching additional");
      var n = void 0;
      return n = "changed" === v ? r("additional") : t("additional"), n["catch"](function (n) {
        console.error("[SW]:", "Cache section `additional` failed to load")
      })
    }

    function t(e) {
      var t = p[e];
      return caches.open(S).then(function (e) {
        return o(e, t, {bust: n.version})
      }).then(function () {
        u("Cached assets: " + e, t)
      })["catch"](function (n) {
        throw console.error(n), n
      })
    }

    function r(e) {
      return f().then(function (r) {
        if (!r)return t(e);
        var i = r[0], c = r[1], a = r[2], s = a.hashmap, f = a.version;
        if (!a.hashmap || f === n.version)return t(e);
        var l = Object.keys(s).map(function (n) {
          return s[n]
        }), h = c.map(function (n) {
          var e = new URL(n.url);
          return e.search = "", e.toString()
        }), d = p[e], v = [], m = d.filter(function (n) {
          return h.indexOf(n) === -1 || l.indexOf(n) === -1
        });
        Object.keys(g).forEach(function (n) {
          var e = g[n];
          if (d.indexOf(e) !== -1 && m.indexOf(e) === -1 && v.indexOf(e) === -1) {
            var t = s[n];
            t && h.indexOf(t) !== -1 ? v.push([t, e]) : m.push(e)
          }
        }), u("Changed assets: " + e, m), u("Moved assets: " + e, v);
        var x = Promise.all(v.map(function (n) {
          return i.match(n[0]).then(function (e) {
            return [n[1], e]
          })
        }));
        return caches.open(S).then(function (e) {
          var t = x.then(function (n) {
            return Promise.all(n.map(function (n) {
              return e.put(n[0], n[1])
            }))
          });
          return Promise.all([t, o(e, m, {bust: n.version})])
        })
      })
    }

    function c() {
      return caches.keys().then(function (n) {
        var e = n.map(function (n) {
          if (0 === n.indexOf(x) && 0 !== n.indexOf(S))return console.log("[SW]:", "Delete cache:", n), caches["delete"](n)
        });
        return Promise.all(e)
      })
    }

    function f() {
      return caches.keys().then(function (n) {
        for (var e = n.length, t = void 0; e-- && (t = n[e], 0 !== t.indexOf(x)););
        if (t) {
          var r = void 0;
          return caches.open(t).then(function (n) {
            return r = n, n.match(new URL(W, location).toString())
          }).then(function (n) {
            if (n)return Promise.all([r, r.keys(), n.json()])
          })
        }
      })
    }

    function l() {
      return caches.open(S).then(function (e) {
        var t = new Response(JSON.stringify({version: n.version, hashmap: g}));
        return e.put(new URL(W, location).toString(), t)
      })
    }

    function h(n) {
      return n["catch"](function () {
      }).then(function (n) {
        return n && n.ok ? n : (s && console.log("[SW]:", "Loading navigation fallback [" + w + "] from cache"), i(w, S))
      })
    }

    function d() {
      Object.keys(p).forEach(function (n) {
        p[n] = p[n].map(function (n) {
          var e = new URL(n, location);
          return e.search = "", e.toString()
        })
      }), g = Object.keys(g).reduce(function (n, e) {
        var t = new URL(g[e], location);
        return t.search = "", n[e] = t.toString(), n
      }, {})
    }

    var v = n.strategy, p = n.assets, g = n.hashesMap, m = {
      all: n.version,
      changed: n.version
    }, x = n.name, O = m[v], S = x + ":" + O, W = "__offline_webpack__data";
    d();
    var k = [].concat(p.main, p.additional, p.optional), w = n.navigateFallbackURL;
    self.addEventListener("install", function (n) {
      console.log("[SW]:", "Install event");
      var e = void 0;
      e = "changed" === v ? r("main") : t("main"), n.waitUntil(e)
    }), self.addEventListener("activate", function (n) {
      console.log("[SW]:", "Activate event");
      var t = e();
      t = t.then(l), t = t.then(c), t = t.then(function () {
        if (self.clients && self.clients.claim)return self.clients.claim()
      }), n.waitUntil(t)
    }), self.addEventListener("fetch", function (n) {
      var e = new URL(n.request.url);
      e.search = "";
      var t = e.toString();
      if ("GET" !== n.request.method || k.indexOf(t) === -1)return w && a(n.request) ? void n.respondWith(h(fetch(n.request))) : void(e.origin !== location.origin && navigator.userAgent.indexOf("Firefox/44.") !== -1 && n.respondWith(fetch(n.request)));
      var r = i(t, S).then(function (e) {
        if (e)return s && console.log("[SW]:", "URL [" + t + "] from cache"), e;
        var r = fetch(n.request).then(function (n) {
          if (!n || !n.ok)return s && console.log("[SW]:", "URL [" + t + "] wrong response: [" + n.status + "] " + n.type), n;
          s && console.log("[SW]:", "URL [" + t + "] fetched");
          var e = n.clone();
          return caches.open(S).then(function (n) {
            return n.put(t, e)
          }).then(function () {
            console.log("[SW]:", "Cache asset: " + t)
          }), n
        });
        return w && a(n.request) ? h(r) : r
      });
      n.respondWith(r)
    }), self.addEventListener("message", function (n) {
      var e = n.data;
      if (e)switch (e.action) {
        case"skipWaiting":
          self.skipWaiting && self.skipWaiting()
      }
    })
  }

  function o(n, e, t) {
    var r = t && t.bust;
    return Promise.all(e.map(function (n) {
      return r && (n = c(n, r)), fetch(n)
    })).then(function (t) {
      if (t.some(function (n) {
          return !n.ok
        }))return Promise.reject(new Error("Wrong response status"));
      var r = t.map(function (t, r) {
        return n.put(e[r], t)
      });
      return Promise.all(r)
    })
  }

  function i(n, e) {
    return caches.match(n, {cacheName: e})["catch"](function () {
    })
  }

  function c(n, e) {
    var t = n.indexOf("?") !== -1;
    return n + (t ? "&" : "?") + "__uncache=" + encodeURIComponent(e)
  }

  function a(n) {
    return "navigate" === n.mode || n.headers.get("Upgrade-Insecure-Requests") || (n.headers.get("Accept") || "").indexOf("text/html") !== -1
  }

  function u(n, e) {
    console.groupCollapsed("[SW]:", n), e.forEach(function (n) {
      console.log("Asset:", n)
    }), console.groupEnd()
  }

  if ("undefined" == typeof s)var s = !1;
  t(1), r(__wpo), n.exports = t(0)
}]);
