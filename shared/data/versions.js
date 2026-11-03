import { complete } from "./versions/complete.jsx";
import { hota } from "./versions/hota.jsx";
import { era } from "./versions/era.jsx";
import { vcmi } from "./versions/vcmi.jsx";
import { chronicles } from "./versions/chronicles.jsx";

export const versions = [complete, hota, era, vcmi, chronicles];

export const versionIcons = Object.fromEntries(
  versions.map((v) => [v.id, v.icon]),
);
