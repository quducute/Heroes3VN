const RGB = {
  aquamarine: [127, 255, 212],
  black: [0, 0, 0],
  burlywood: [222, 184, 135],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  deepskyblue: [0, 191, 255],
  forestgreen: [34, 139, 34],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  indianred: [205, 92, 92],
  khaki: [240, 230, 140],
  lightgreen: [144, 238, 144],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  limegreen: [50, 205, 50],
  mediumpurple: [147, 112, 219],
  navajowhite: [255, 222, 173],
  peru: [205, 133, 63],
  salmon: [250, 128, 114],
  slateblue: [106, 90, 205],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
};

export const mix = (name, amount, base = "black") =>
  `rgb(${RGB[name].map((c, i) => Math.round(c * amount + RGB[base][i] * (1 - amount))).join(", ")})`;

export const alpha = (name, amount) =>
  `rgba(${RGB[name].join(", ")}, ${amount})`;

export const colors = {
  bg: mix("burlywood", 0.09),
  bg2: mix("navajowhite", 0.12),
  panel: mix("burlywood", 0.15),
  panel2: mix("burlywood", 0.2),
  border: mix("burlywood", 0.34),
  gold: "goldenrod",
  goldBright: mix("gold", 0.89),
  text: mix("cornsilk", 0.9),
  muted: mix("wheat", 0.67),
  accent: "goldenrod",
  goldSoft: alpha("goldenrod", 0.08),
  goldSoft2: alpha("goldenrod", 0.14),
  green: "limegreen",
};

export const accents = {
  complete: mix("cornflowerblue", 0.68),
  hota: mix("indianred", 0.84),
  era: mix("mediumpurple", 0.87),
  vcmi: mix("aquamarine", 0.61),
  chronicles: "peru",
  web: "goldenrod",
  faq: "goldenrod",
  cheat: "indianred",
  keybinds: mix("lightskyblue", 0.77),
};

export const radius = { sm: 6, md: 10, lg: 14 };

export const fonts = {
  regular: "Roboto_400Regular",
  italic: "Roboto_400Regular_Italic",
  medium: "Roboto_500Medium",
  bold: "Roboto_700Bold",
  title: "LuxuriousRoman_400Regular",
};
