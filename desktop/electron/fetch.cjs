const FETCH_ALLOWED_HOSTS = new Set([
  "drive.google.com",
  "drive.usercontent.google.com",
  "api.gog.com",
  "download.h3hota.com",
  "rss.moddb.com",
]);

const TIMEOUT_MS = 10000;
const MAX_REDIRECTS = 5;

function hostOf(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return String(url);
  }
}

function isAllowedUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && FETCH_ALLOWED_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

function fetchText(net, url, { timeout = TIMEOUT_MS } = {}) {
  return new Promise((resolve, reject) => {
    if (!isAllowedUrl(url)) {
      reject(new Error(`Host không được phép: ${hostOf(url)}`));
      return;
    }
    const request = net.request({ url, redirect: "manual" });
    let redirects = 0;
    let done = false;
    const finish = (err, text) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      if (err) {
        request.abort();
        reject(err);
      } else {
        resolve(text);
      }
    };
    const timer = setTimeout(
      () => finish(new Error("Hết thời gian chờ")),
      timeout,
    );
    request.on("redirect", (_status, _method, location) => {
      redirects += 1;
      if (redirects > MAX_REDIRECTS) {
        finish(new Error("Chuyển hướng quá nhiều lần"));
      } else if (isAllowedUrl(location)) {
        request.followRedirect();
      } else {
        finish(new Error(`Host không được phép: ${hostOf(location)}`));
      }
    });
    request.on("response", (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        finish(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => finish(null, Buffer.concat(chunks).toString("utf8")));
      res.on("error", (err) => finish(err));
    });
    request.on("error", (err) => finish(err));
    request.end();
  });
}

module.exports = { FETCH_ALLOWED_HOSTS, isAllowedUrl, fetchText };
