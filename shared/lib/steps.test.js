import { describe, expect, test } from "vitest";
import {
  cleanSteps,
  clearSteps,
  countDone,
  joinScope,
  pageSteps,
  stepIds,
  stepsScope,
  toggleStep,
} from "./steps.js";

describe("joinScope", () => {
  test("nối trang và mục bằng dấu /", () => {
    expect(joinScope("hota", "cai-dat")).toBe("hota/cai-dat");
  });

  test("thiếu một phần thì không có scope", () => {
    expect(joinScope(null, "cai-dat")).toBeNull();
    expect(joinScope("hota", undefined)).toBeNull();
    expect(joinScope("", "")).toBeNull();
  });
});

describe("stepsScope", () => {
  test("không có tiêu đề thì dùng scope của mục", () => {
    expect(stepsScope("hota/cai-dat")).toBe("hota/cai-dat");
  });

  test("có tiêu đề thì thêm slug của tiêu đề", () => {
    expect(stepsScope("vcmi/cai-thu-cong", "Android / iOS / iPadOS")).toBe(
      "vcmi/cai-thu-cong/android-ios-ipados",
    );
    expect(stepsScope("complete/plugin", "Hướng dẫn cài SoD SP")).toBe(
      "complete/plugin/huong-dan-cai-sod-sp",
    );
  });

  test("ngoài trang hướng dẫn thì không có scope", () => {
    expect(stepsScope(null)).toBeNull();
    expect(stepsScope(null, "Windows")).toBeNull();
  });
});

describe("stepIds", () => {
  test("đánh số từ 1 theo thứ tự bước", () => {
    expect(stepIds("hota/cai-dat", 3)).toEqual([
      "hota/cai-dat/1",
      "hota/cai-dat/2",
      "hota/cai-dat/3",
    ]);
  });

  test("không có scope thì không có id", () => {
    expect(stepIds(null, 3)).toEqual([]);
  });
});

describe("pageSteps", () => {
  const done = ["hota/cai-dat/1", "hota/template/2", "era/cai-dat/1"];

  test("lấy mọi bước đã tick của một trang", () => {
    expect(pageSteps(done, "hota")).toEqual([
      "hota/cai-dat/1",
      "hota/template/2",
    ]);
  });

  test("không nhầm trang có tên bắt đầu giống nhau", () => {
    expect(pageSteps(["hotax/a/1", "hota/a/1"], "hota")).toEqual(["hota/a/1"]);
  });

  test("không có trang thì không có bước nào", () => {
    expect(pageSteps(done, null)).toEqual([]);
  });
});

describe("toggleStep / countDone / clearSteps", () => {
  const ids = stepIds("hota/cai-dat", 6);
  const other = stepIds("era/cai-dat", 2);

  test("tick rồi bỏ tick", () => {
    const done = toggleStep([], ids[0]);
    expect(done).toEqual([ids[0]]);
    expect(toggleStep(done, ids[0])).toEqual([]);
  });

  test("chỉ đếm bước của khối đang xem", () => {
    const done = [ids[0], ids[2], other[0]];
    expect(countDone(done, ids)).toBe(2);
    expect(countDone(done, other)).toBe(1);
  });

  test("bước 1 không bị nhầm với bước 10", () => {
    const many = stepIds("vcmi/link", 10);
    expect(countDone([many[9]], [many[0]])).toBe(0);
  });

  test("bỏ tick cả khối không ảnh hưởng khối khác", () => {
    const done = [ids[0], ids[1], other[1]];
    expect(clearSteps(done, ids)).toEqual([other[1]]);
  });

  test("cleanSteps bỏ giá trị sai và trùng", () => {
    expect(cleanSteps([ids[0], ids[0], "", 5, null, ids[1]])).toEqual([
      ids[0],
      ids[1],
    ]);
    expect(cleanSteps("hota")).toEqual([]);
  });
});
