import { enumValueKey, enumValueLabel, schemaNodeType } from "./parse.js";
import type { JSONSchema } from "./types.js";

export function validateJson(
  schema: JSONSchema,
  data: unknown,
): { ok: true } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  function getUnionVariants(node: JSONSchema): JSONSchema[] | undefined {
    if (Array.isArray((node as any)?.anyOf)) return (node as any).anyOf as JSONSchema[];
    if (Array.isArray((node as any)?.oneOf)) return (node as any).oneOf as JSONSchema[];
    return undefined;
  }

  function checkEnum(node: JSONSchema, value: any, path: string) {
    const enumeration = Array.isArray((node as any)?.enum)
      ? ((node as any).enum as unknown[])
      : undefined;
    if (!enumeration || value === undefined) return;
    const matches = enumeration.some((opt) => enumValueKey(opt) === enumValueKey(value));
    if (!matches) {
      errors.push(
        `${path || "(root)"} should be one of ${enumeration
          .map(enumValueLabel)
          .join(", ")}`,
      );
    }
  }

  function findDiscriminatedUnionVariant(node: JSONSchema, value: any): JSONSchema | undefined {
    const variants = getUnionVariants(node);
    if (
      !variants ||
      variants.length === 0 ||
      value == null ||
      typeof value !== "object" ||
      Array.isArray(value)
    ) {
      return undefined;
    }

    let discriminatorKey: string | undefined;
    for (const variant of variants) {
      if (schemaNodeType(variant) !== "object") {
        throw new Error("Only object variants are supported for discriminated unions");
      }
      const props = (variant as any)?.properties as Record<string, JSONSchema> | undefined;
      if (!props) {
        throw new Error("Discriminated union variants must define properties");
      }
      const entries = Object.entries(props).filter(
        ([, schema]) =>
          (schema as any)?.type === "string" &&
          typeof (schema as any)?.const === "string",
      );
      if (entries.length !== 1) {
        throw new Error(
          "Discriminated union variants must have exactly one string const property",
        );
      }
      const [discKey, discSchema] = entries[0]!;
      if (discriminatorKey && discKey !== discriminatorKey) {
        throw new Error("Discriminated union variants must share the same discriminant key");
      }
      discriminatorKey ??= discKey;
      const discValue = (discSchema as any).const as string;
      if ((value as any)[discKey] === discValue) return variant;
    }

    return undefined;
  }

  function walk(node: JSONSchema, value: any, path: string) {
    const t = schemaNodeType(node);

    if (t === "object") {
      if (value == null || typeof value !== "object" || Array.isArray(value)) {
        errors.push(`${path || "(root)"} should be an object`);
        return;
      }
      const props = (node.properties ?? {}) as Record<string, JSONSchema>;
      const req = new Set<string>(node.required ?? []);
      for (const k of req) {
        if (!(k in value)) errors.push(`${path ? path + "." : ""}${k} is required`);
      }
      for (const [k, child] of Object.entries(props)) {
        if (k in value) walk(child, value[k], path ? `${path}.${k}` : k);
      }
      const additional = (node as any)?.additionalProperties;
      if (additional === false) {
        for (const k of Object.keys(value)) {
          if (!(k in props)) errors.push(`${path ? path + "." : ""}${k} is not allowed`);
        }
      } else if (additional && additional !== true && typeof additional === "object") {
        for (const [k, val] of Object.entries(value)) {
          if (!(k in props)) walk(additional as JSONSchema, val, path ? `${path}.${k}` : k);
        }
      }

      const unionVariants = getUnionVariants(node);
      if (unionVariants?.length) {
        const match = findDiscriminatedUnionVariant(node, value);
        if (!match) {
          errors.push(`${path || "(root)"} did not match any union variant`);
          return;
        }
        walk(match, value, path);
        return;
      }

      checkEnum(node, value, path);
      return;
    }

    if (t === "string") {
      if (value != null && typeof value !== "string") {
        errors.push(`${path || "(root)"} should be a string`);
      } else {
        checkEnum(node, value, path);
      }
      return;
    }

    if (t === "date") {
      if (value != null) {
        const d = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(d.getTime())) {
          errors.push(`${path || "(root)"} should be a valid date-time`);
        }
      }
      checkEnum(node, value, path);
      return;
    }

    if (t === "number" || t === "integer") {
      if (value != null && typeof value !== "number") {
        errors.push(`${path || "(root)"} should be a number`);
        return;
      }
      if (t === "integer" && value != null && !Number.isInteger(value)) {
        errors.push(`${path || "(root)"} should be an integer`);
        return;
      }
      checkEnum(node, value, path);
      return;
    }

    if (t === "boolean") {
      if (value != null && typeof value !== "boolean") {
        errors.push(`${path || "(root)"} should be a boolean`);
        return;
      }
      checkEnum(node, value, path);
      return;
    }

    if (t === "array") {
      if (!Array.isArray(value)) {
        errors.push(`${path || "(root)"} should be an array`);
        return;
      }
      const items = (node as any).items;
      if (items) {
        if (Array.isArray(items) && items.length > 0) {
          value.forEach((it, i) => walk(items[0] as JSONSchema, it, `${path}[${i}]`));
        } else if (!Array.isArray(items)) {
          value.forEach((it, i) => walk(items as JSONSchema, it, `${path}[${i}]`));
        }
      }
      checkEnum(node, value, path);
      return;
    }

    checkEnum(node, value, path);
  }

  walk(schema, data, "");
  return errors.length ? { ok: false, errors } : { ok: true };
}
