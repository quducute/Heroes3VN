import { spawn, execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, expect, test } from "vitest";

const EXE = fileURLToPath(
  new URL("../src-tauri/target/release/heroes3vn.exe", import.meta.url),
);
const PORT = 9333;
const TASKKILL = join(
  process.env.SystemRoot ?? "C:\\Windows",
  "System32",
  "taskkill.exe",
);
const missing = process.platform !== "win32" || !existsSync(EXE);

let app;

afterAll(() => {
  if (!app?.pid) return;
  try {
    execFileSync(TASKKILL, ["/pid", String(app.pid), "/T", "/F"], {
      stdio: "ignore",
    });
  } catch {
    app.kill();
  }
});

async function waitForPage() {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (app.exitCode !== null) {
      throw new Error("App thoát ngay, có thể đang có một bản khác đang mở");
    }
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = list.find(
        (t) => t.type === "page" && t.url.includes("tauri.localhost"),
      );
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  throw new Error("Không kết nối được DevTools của WebView2");
}

async function evaluate(wsUrl, expression) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  try {
    const reply = await new Promise((resolve) => {
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === 1) resolve(msg);
      };
      ws.send(
        JSON.stringify({
          id: 1,
          method: "Runtime.evaluate",
          params: { expression, awaitPromise: true, returnByValue: true },
        }),
      );
    });
    if (reply.error) throw new Error(reply.error.message);
    if (reply.result.exceptionDetails) {
      throw new Error(reply.result.exceptionDetails.exception.description);
    }
    return reply.result.result.value;
  } finally {
    ws.close();
  }
}

const CLICK_FIRST_EXTERNAL_LINK = `(async () => {
  const deadline = Date.now() + 10000;
  let a;
  while (!(a = document.querySelector('a[target="_blank"][href^="http"]'))) {
    if (Date.now() > deadline) throw new Error("Không thấy link target=_blank");
    await new Promise((r) => setTimeout(r, 200));
  }
  const internals = window.__TAURI_INTERNALS__;
  const invoke = internals.invoke;
  const calls = [];
  internals.invoke = (cmd, ...rest) => {
    calls.push(cmd);
    return invoke(cmd, ...rest);
  };
  try {
    return await new Promise((resolve) => {
      window.addEventListener(
        "click",
        (e) => {
          const prevented = e.defaultPrevented;
          e.preventDefault();
          resolve({ href: a.href, prevented, calls });
        },
        { once: true },
      );
      a.click();
    });
  } finally {
    internals.invoke = invoke;
  }
})()`;

async function clickWithRetry(wsUrl) {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      return await evaluate(wsUrl, CLICK_FIRST_EXTERNAL_LINK);
    } catch (err) {
      if (attempt === 5 || !/context was destroyed/i.test(err.message)) {
        throw err;
      }
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}

test.skipIf(missing)(
  "bấm link target=_blank không bị script JS của opener chặn",
  async () => {
    app = spawn(EXE, [], {
      env: {
        ...process.env,
        WEBVIEW2_ADDITIONAL_BROWSER_ARGUMENTS: `--remote-debugging-port=${PORT}`,
      },
      stdio: "ignore",
    });
    const result = await clickWithRetry(await waitForPage());
    expect(
      result.prevented,
      `Click vào ${result.href} đã bị chặn trước khi tới on_new_window`,
    ).toBe(false);
    expect(result.calls.filter((c) => c.startsWith("plugin:opener"))).toEqual(
      [],
    );
  },
);
