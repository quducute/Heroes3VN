const RGB = {
  black: [0, 0, 0],
  burlywood: [222, 184, 135],
  cornflowerblue: [100, 149, 237],
  deepskyblue: [0, 191, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  peru: [205, 133, 63],
  wheat: [245, 222, 179],
};

export const mix = (name, amount, base = "black") =>
  `rgb(${RGB[name].map((c, i) => Math.round(c * amount + RGB[base][i] * (1 - amount))).join(", ")})`;

export const alpha = (name, amount) =>
  `rgba(${RGB[name].join(", ")}, ${amount})`;

export const colors = {
  gold: "goldenrod",
  goldBright: mix("gold", 0.89),
  muted: mix("wheat", 0.67),
  green: "limegreen",
};
