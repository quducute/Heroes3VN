import { sectionAnchor } from "./anchor.js";
import { cleanPins, countPinned, togglePin } from "./pins.js";

export const cleanSteps = cleanPins;

export const toggleStep = togglePin;

export const countDone = countPinned;

export const joinScope = (parent, part) =>
  parent && part ? `${parent}/${part}` : null;

export function stepsScope(section, title) {
  const part = sectionAnchor(title);
  return part ? joinScope(section, part) : section || null;
}

export const stepIds = (scope, count) =>
  scope ? Array.from({ length: count }, (_, i) => `${scope}/${i + 1}`) : [];

export const pageSteps = (steps, page) =>
  page ? steps.filter((s) => s.startsWith(`${page}/`)) : [];

export function clearSteps(steps, ids) {
  const set = new Set(ids);
  return steps.filter((s) => !set.has(s));
}
