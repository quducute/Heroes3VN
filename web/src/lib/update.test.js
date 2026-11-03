import { beforeEach, describe, expect, test, vi } from "vitest";

const RELEASE = { tag_name: "v1.7.5", published_at: "2026-11-01T00:00:00Z" };
const CACHED = {
  hota: { label: "HotA mới nhất", version: "1.8.1", date: "01.11.2026" },
  era: { label: "ERA mới nhất", version: "3.9.31", date: "02.11.2026" },
};

const json = (data, ok = true) => ({
  ok,
  status: ok ? 200 : 404,
  json: async () => data,
  text: async () => JSON.stringify(data),
});

function mockFetch(versions) {
  const fetch = vi.fn(async (url) => {
    if (url === "./versions.json") {
      if (versions instanceof Error) throw versions;
      return versions ? json({ sources: versions }) : json({}, false);
    }
    if (url.includes("api.github.com/repos/vcmi/vcmi/")) return json(RELEASE);
    throw new Error(`không mong đợi: ${url}`);
  });
  vi.stubGlobal("fetch", fetch);
  return fetch;
}

const calls = (fetch, part) =>
  fetch.mock.calls.filter(([url]) => url.includes(part)).length;

let update;
beforeEach(async () => {
  vi.resetModules();
  update = await import("./update.js");
});

describe("fetchModLatest", () => {
  test("id lạ trả về null mà không tải gì", async () => {
    const fetch = mockFetch(CACHED);
    expect(await update.fetchModLatest("abc")).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  test("ưu tiên dữ liệu trong versions.json", async () => {
    const fetch = mockFetch(CACHED);
    expect(await update.fetchModLatest("hota")).toEqual(CACHED.hota);
    expect(await update.fetchModLatest("era")).toEqual(CACHED.era);
    expect(calls(fetch, "github")).toBe(0);
  });

  test("chỉ tải versions.json một lần", async () => {
    const fetch = mockFetch(CACHED);
    await Promise.all([
      update.fetchModLatest("hota"),
      update.fetchModLatest("era"),
      update.fetchModLatest("vcmi"),
    ]);
    await update.fetchModLatest("hota");
    expect(calls(fetch, "versions.json")).toBe(1);
  });

  test("thiếu trong versions.json thì chỉ ERA và VCMI được tải trực tiếp", async () => {
    const fetch = mockFetch({});
    for (const id of ["complete", "hota", "chronicles"])
      expect(await update.fetchModLatest(id)).toBeNull();
    expect(await update.fetchModLatest("vcmi")).toEqual({
      label: "VCMI mới nhất",
      version: "1.7.5",
      date: "01.11.2026",
    });
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test("versions.json lỗi hoặc 404 vẫn tải trực tiếp được VCMI", async () => {
    for (const versions of [null, new Error("offline")]) {
      vi.resetModules();
      const { fetchModLatest } = await import("./update.js");
      mockFetch(versions);
      expect(await fetchModLatest("vcmi")).toMatchObject({ version: "1.7.5" });
      expect(await fetchModLatest("hota")).toBeNull();
    }
  });
});

describe("fetchAllModLatest", () => {
  test("gom nguồn tải được, bỏ qua và cảnh báo nguồn lỗi", async () => {
    mockFetch({});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const sources = await update.fetchAllModLatest();
    expect(Object.keys(sources)).toEqual(["vcmi"]);
    expect(sources.vcmi).toMatchObject({ version: "1.7.5" });
    expect(warn).toHaveBeenCalled();
    for (const id of ["complete", "hota", "era", "chronicles"])
      expect(warn.mock.calls.some(([msg]) => msg.startsWith(`${id}:`))).toBe(
        true,
      );
  });
});
