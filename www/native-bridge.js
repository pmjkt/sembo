/* Makes downloads and file sharing work inside the Android app.
   In a normal browser this file does nothing. */
(function () {
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  var P = C.Plugins || {}, FS = P.Filesystem, SH = P.Share;
  if (!FS || !SH) return;
  var safe = function (n) { return String(n).replace(/[^\w.\-]+/g, "_"); };
  window.dl = async function (name, data, mime) {
    try {
      var blob = data instanceof Blob ? data : new Blob([data], { type: mime });
      var b64 = await new Promise(function (res, rej) {
        var r = new FileReader();
        r.onload = function () { res(String(r.result).split(",")[1] || ""); };
        r.onerror = rej;
        r.readAsDataURL(blob);
      });
      var w = await FS.writeFile({ path: safe(name), data: b64, directory: "CACHE" });
      await SH.share({ title: name, url: w.uri, dialogTitle: "Send or save " + name });
    } catch (e) {
      if (e && /cancel/i.test(e.message || "")) return;
      try { alert("Could not export the file: " + (e.message || e)); } catch (x) {}
    }
  };
  /* The Android WebView cannot share files itself, so make the app use dl() above */
  try { navigator.canShare = function () { return false; }; } catch (e) {}
})();
