import { describe, expect, test } from "vitest";
import { mergeSource, mergeSources } from "./versions.js";

const GOG = { label: "GOG", version: "4.0" };
const HD = { label: "HD", version: "5.8" };
const HD_NEW = { label: "HD", version: "5.9" };
const HOTA = { label: "HotA", version: "1.8.1" };

describe("mergeSource", () => {
  test("nguồn lỗi hẳn thì giữ nguyên dữ liệu cũ", () => {
    expect(mergeSource(undefined, [GOG, HD])).toEqual({
      value: [GOG, HD],
      kept: [],
    });
    expect(mergeSource(undefined, HOTA).value).toBe(HOTA);
  });

  test("dữ liệu mới đầy đủ thì dùng dữ liệu mới", () => {
    expect(mergeSource([GOG, HD_NEW], [GOG, HD])).toEqual({
      value: [GOG, HD_NEW],
      kept: [],
    });
    expect(mergeSource(HOTA, { label: "HotA", version: "1.8.0" }).value).toBe(
      HOTA,
    );
  });

  test("mất một dòng thì giữ dòng cũ ở đúng vị trí", () => {
    expect(mergeSource([HD_NEW], [GOG, HD])).toEqual({
      value: [GOG, HD_NEW],
      kept: [GOG],
    });
    expect(mergeSource([GOG], [GOG, HD])).toEqual({
      value: [GOG, HD],
      kept: [HD],
    });
  });

  test("thêm dòng mới hoặc chưa có dữ liệu cũ thì không giữ gì", () => {
    const XXL = { label: "XXL", version: "1.0" };
    expect(mergeSource([GOG, HD, XXL], [GOG, HD]).value).toEqual([
      GOG,
      HD,
      XXL,
    ]);
    expect(mergeSource([GOG], undefined).value).toEqual([GOG]);
    expect(mergeSource([GOG], HOTA).value).toEqual([GOG]);
  });
});

describe("mergeSources", () => {
  test("gộp mọi nguồn của cả bản mới lẫn bản cũ", () => {
    const { sources, kept } = mergeSources(
      { complete: [HD_NEW], vcmi: { label: "VCMI", version: "1.7.5" } },
      { complete: [GOG, HD], hota: HOTA },
    );
    expect(sources).toEqual({
      complete: [GOG, HD_NEW],
      hota: HOTA,
      vcmi: { label: "VCMI", version: "1.7.5" },
    });
    expect(kept).toEqual([GOG]);
  });

  test("cả hai đều rỗng thì ra rỗng", () => {
    expect(mergeSources({}, {})).toEqual({ sources: {}, kept: [] });
  });
});
