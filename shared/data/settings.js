export const SETTINGS = {
  title: "Heroes 3 VN Settings",
  updateTitle: "Cập nhật tool",
  currentVersion: "Phiên bản đang dùng: ",
  checkUpdate: "Check update",
  autoCheck: "Tool cũng tự kiểm tra bản mới mỗi lần mở.",
  windowSizeTitle: "Kích thước cửa sổ mặc định",
  windowSizeSaved: "Đã lưu và áp dụng ngay.",
  windowSizeHint: "Áp dụng ngay và được nhớ cho những lần mở tool sau.",
  windowSizeError: "Không lưu được kích thước cửa sổ.",
  defaultPageTitle: "Tab mặc định khi mở tool",
  defaultPageSaved: "Đã lưu, áp dụng từ lần mở tool sau.",
  defaultPageHint: "Tab hiển thị đầu tiên mỗi lần mở tool.",
  defaultPageError: "Không lưu được tab mặc định.",
  fontSizeTitle: "Cỡ chữ",
  fontSizeSaved: "Đã lưu và áp dụng ngay.",
  fontSizeHint: "Phóng to hoặc thu nhỏ chữ trong nội dung các trang.",
  fontSizeError: "Không lưu được cỡ chữ.",
  otherTitle: "Cài đặt khác",
  cache: "Cache: ",
  clearCache: "Xoá cache",
  reset: "Đặt lại",
  cacheHint: "Xoá cache khi tool hiển thị sai version.",
  cacheCleared: (size) => `Đã xoá ${size} cache.`,
  cacheError: "Không xoá được cache.",
  resetHint:
    "Đặt lại: cửa sổ 1280 × 720, tab mặc định là Trang chủ, cỡ chữ Vừa (mục đã ghim được giữ nguyên).",
  resetPageHint:
    "Đặt lại: tab mặc định là Trang chủ, cỡ chữ Vừa (mục đã ghim được giữ nguyên).",
  resetDone: "Đã đặt lại cài đặt về mặc định.",
  resetError: "Không đặt lại được cài đặt.",
  readError: "Không đọc được cài đặt.",
};

export const FONT_SIZES = [
  { value: "small", label: "Nhỏ", scale: 0.9 },
  { value: "medium", label: "Vừa (mặc định)", scale: 1 },
  { value: "large", label: "Lớn", scale: 1.15 },
];

export const DEFAULT_FONT_SIZE = "medium";

export const validFontSize = (value) =>
  FONT_SIZES.some((f) => f.value === value) ? value : DEFAULT_FONT_SIZE;

export const fontScale = (value) =>
  (FONT_SIZES.find((f) => f.value === value) ?? FONT_SIZES[1]).scale;
