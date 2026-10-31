import iconComplete from "../assets/icons/complete.webp";
import iconHota from "../assets/icons/hota.webp";
import iconEra from "../assets/icons/era.webp";
import iconVcmi from "../assets/icons/vcmi.webp";
import iconChronicles from "../assets/icons/chronicles.webp";
import { complete } from "./versions/complete";
import { hota } from "./versions/hota";
import { era } from "./versions/era";
import { vcmi } from "./versions/vcmi";
import { chronicles } from "./versions/chronicles";

export const versionIcons = {
  complete: iconComplete,
  hota: iconHota,
  era: iconEra,
  vcmi: iconVcmi,
  chronicles: iconChronicles,
};

export const versions = [complete, hota, era, vcmi, chronicles];
