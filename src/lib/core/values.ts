import { defaultForParsed } from "./parse.js";
import type { ParsedField } from "./types.js";

export function assignSafeObject(
  object: Record<string, any>,
  keys: (string | number)[],
  value: any,
) {
  if (!keys.length) throw new Error("unreachable");

  let curr: Record<string, any> = object;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]!;
    const key = typeof k === "number" ? String(k) : k;
    if (typeof curr[key] !== "object" || curr[key] === null) {
      const nextIsIndex = typeof keys[i + 1] === "number";
      curr[key] = nextIsIndex ? [] : {};
    }
    curr = curr[key] as any;
  }

  const last = keys[keys.length - 1]!;
  curr[typeof last === "number" ? String(last) : (last as string)] = value;
}

export function getNestedValue<T = any>(
  object: any,
  ...keys: (string | number)[]
): T | undefined {
  return keys.reduce<any>(
    (acc, key) => acc?.[typeof key === "number" ? String(key) : key],
    object,
  );
}

export function ensureArray(object: Record<string, any>, ...keys: (string | number)[]) {
  const parentKeys = keys.slice(0, -1);
  const last = keys[keys.length - 1]!;
  let parent = object as any;

  for (const k of parentKeys) {
    const kk = typeof k === "number" ? String(k) : k;
    if (typeof parent[kk] !== "object" || parent[kk] === null) parent[kk] = {};
    parent = parent[kk];
  }

  const ll = typeof last === "number" ? String(last) : last;
  if (!Array.isArray(parent[ll])) parent[ll] = [];
  return parent[ll] as any[];
}

export function arrayPush(
  object: Record<string, any>,
  keys: (string | number)[],
  field: ParsedField,
) {
  const arr = ensureArray(object, ...keys);
  if (!field.items) {
    arr.push(null);
    return;
  }
  arr.push(defaultForParsed(field.items));
}

export function arrayRemove(
  object: Record<string, any>,
  keys: (string | number)[],
  index: number,
) {
  const arr = getNestedValue<any[]>(object, ...keys);
  if (Array.isArray(arr)) arr.splice(index, 1);
}

export function toNumberInput(v: unknown): string {
  if (v === null || v === undefined || v === "") return "";
  const n = Number(v);
  return Number.isFinite(n) ? String(n) : "";
}

export function fromNumberInput(s: string): number | null {
  if (s.trim() === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

export function toDatetimeLocal(v: unknown): string {
  if (!v) return "";
  const d = v instanceof Date ? v : new Date(v as any);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function safeParseJson(value: string): any {
  const trimmed = value.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}
