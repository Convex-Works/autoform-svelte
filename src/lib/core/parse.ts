import type {
  JSONSchema,
  FieldType,
  FormWidget,
  ParsedDiscriminatedUnion,
  ParsedEnumOption,
  ParsedFieldFormMeta,
  ParsedField,
  ResolvedObjectSchema,
} from "./types.js";

export function schemaNodeType(s?: JSONSchema): FieldType {
  const t = (s?.type ?? "object") as string;
  if (t === "string") {
    if ((s as any).format === "date-time") return "date";
    return "string";
  }
  if (t === "number") return "number";
  if (t === "integer") return "integer";
  if (t === "boolean") return "boolean";
  if (t === "object") return "object";
  if (t === "array") return "array";
  return "unknown";
}

export function enumValueKey(value: unknown): string {
  if (value === null) return "null:";
  const type = typeof value;
  if (type === "object") {
    try {
      return `object:${JSON.stringify(value)}`;
    } catch {
      return "object:[unserializable]";
    }
  }
  if (type === "undefined") return "undefined:";
  if (type === "number" && Number.isNaN(value)) return "number:NaN";
  return `${type}:${String(value)}`;
}

export function enumValueLabel(value: unknown): string {
  if (value === null) return "null";
  const type = typeof value;
  if (type === "string") return value as string;
  if (type === "number" || type === "boolean") return String(value as any);
  if (type === "undefined") return "undefined";
  if (type === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "[object]";
    }
  }
  return String(value as any);
}

function parseDiscriminatedUnion(node: JSONSchema): ParsedDiscriminatedUnion {
  const variants = Array.isArray((node as any)?.anyOf)
    ? ((node as any).anyOf as JSONSchema[])
    : Array.isArray((node as any)?.oneOf)
      ? ((node as any).oneOf as JSONSchema[])
      : null;
  if (!variants || variants.length === 0) {
    throw new Error("anyOf/oneOf must contain at least one variant");
  }

  let discriminatorKey: string | undefined;
  const options = [];
  const seenValues = new Set<string>();

  for (const variant of variants) {
    if (schemaNodeType(variant) !== "object") {
      throw new Error("Only object variants are supported for discriminated unions");
    }
    const props = (variant as any)?.properties as Record<string, JSONSchema> | undefined;
    if (!props) {
      throw new Error("Discriminated union variants must define properties");
    }

    const discriminantEntries = Object.entries(props).filter(
      ([, propSchema]) =>
        (propSchema as any)?.type === "string" &&
        typeof (propSchema as any)?.const === "string",
    );
    if (discriminantEntries.length === 0) {
      throw new Error("Discriminated union variants must have a string const property");
    }
    if (discriminantEntries.length > 1) {
      throw new Error(
        "Discriminated union variants must have exactly one string const property",
      );
    }

    const [discKey, discSchema] = discriminantEntries[0]!;
    if (discriminatorKey && discKey !== discriminatorKey) {
      throw new Error(
        "Discriminated union variants must share the same discriminant key",
      );
    }
    discriminatorKey ??= discKey;
    const discValue = (discSchema as any).const as string;
    if (seenValues.has(discValue)) {
      throw new Error(`Duplicate discriminant value "${discValue}" is not allowed`);
    }
    seenValues.add(discValue);

    const parsedVariant = parseField("__variant__", variant as JSONSchema, true);
    options.push({
      value: discValue,
      label: discValue,
      field: parsedVariant,
    });
  }

  if (!discriminatorKey) {
    throw new Error("Unable to determine discriminant key for anyOf union");
  }

  return {
    discriminatorKey,
    options,
  };
}

function parseObjectChildren(node: JSONSchema): ParsedField[] {
  const props = (node?.properties ?? {}) as Record<string, JSONSchema>;
  const req = new Set<string>(node?.required ?? []);
  return Object.entries(props).map(([key, child]) => parseField(key, child, req.has(key)));
}

function parseEnum(node: JSONSchema): ParsedEnumOption[] | undefined {
  const enumeration = Array.isArray((node as any)?.enum)
    ? ((node as any).enum as unknown[])
    : undefined;

  if (!enumeration?.length) return undefined;

  return enumeration.map((value) => ({
    value,
    key: enumValueKey(value),
    label: enumValueLabel(value),
  }));
}

function parseFormMeta(node: JSONSchema): ParsedFieldFormMeta | undefined {
  const raw = (node as any)?.form;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;

  const parsed: ParsedFieldFormMeta = {};

  if (raw.widget === "input" || raw.widget === "textarea") {
    parsed.widget = raw.widget as FormWidget;
  }
  if (typeof raw.label === "string") {
    parsed.label = raw.label;
  }
  if (typeof raw.placeholder === "string") {
    parsed.placeholder = raw.placeholder;
  }
  if (raw.reorderable === true) {
    parsed.reorderable = true;
  }

  return Object.keys(parsed).length ? parsed : undefined;
}

function cloneValue<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object") return value;
  return structuredClone(value);
}

export function parseField(
  key: string,
  node: JSONSchema,
  required = false,
): ParsedField {
  const type = schemaNodeType(node);
  const parsed: ParsedField = {
    key,
    type,
    title: node?.title,
    description: node?.description,
    defaultValue: (node as any)?.default !== undefined ? cloneValue((node as any).default) : undefined,
    form: parseFormMeta(node),
    required,
    enumValues: parseEnum(node),
  };

  const unionVariants = Array.isArray((node as any)?.anyOf)
    ? ((node as any).anyOf as JSONSchema[])
    : Array.isArray((node as any)?.oneOf)
      ? ((node as any).oneOf as JSONSchema[])
      : undefined;
  if (unionVariants?.length) {
    parsed.discriminatedUnion = parseDiscriminatedUnion(node as JSONSchema);
  }

  if (type === "object") {
    parsed.children = parseObjectChildren(node);
    const additional = (node as any)?.additionalProperties;
    if (additional && additional !== false) {
      parsed.additionalProperties =
        additional === true
          ? { allowAny: true }
          : {
              allowAny: true,
              schema: parseField("__additional__", additional as JSONSchema),
            };
    }
  } else if (type === "array") {
    const items = (node as any)?.items;
    if (Array.isArray(items)) {
      if (items.length > 0) parsed.items = parseField("__item__", items[0]!);
    } else if (items) {
      parsed.items = parseField("__item__", items as JSONSchema);
    }
  }

  return parsed;
}

export function parseJsonSchema(schema: JSONSchema) {
  const nodeType = schemaNodeType(schema);

  if (nodeType !== "object") {
    return { fields: [parseField("value", schema, true)] };
  }

  return {
    fields: parseObjectChildren(schema),
  };
}

export function resolveStringWidget(field: ParsedField): FormWidget {
  if (field.type !== "string") return "input";
  return field.form?.widget === "textarea" ? "textarea" : "input";
}

export function resolvePlaceholder(field: ParsedField): string | undefined {
  return typeof field.form?.placeholder === "string" ? field.form.placeholder : undefined;
}

export function resolveFieldLabel(field: ParsedField): string {
  if (typeof field.form?.label === "string" && field.form.label.trim().length > 0) {
    return field.form.label;
  }
  if (field.title) return field.title;
  return field.key === "__item__" ? "Item" : field.key;
}

export function isObjectReorderable(field: ParsedField): boolean {
  return field.type === "object" && field.form?.reorderable === true;
}

export function defaultForParsed(f: ParsedField): any {
  if (f.defaultValue !== undefined) {
    return cloneValue(f.defaultValue);
  }

  if (f.enumValues?.length) {
    const first = f.enumValues[0]!.value;
    if (first !== null && typeof first === "object") return structuredClone(first);
    return first;
  }

  switch (f.type) {
    case "string":
      return "";
    case "number":
    case "integer":
      return null;
    case "boolean":
      return false;
    case "date":
      return "";
    case "object": {
      const o: Record<string, any> = {};
      if (f.discriminatedUnion && f.discriminatedUnion.options.length > 0) {
        const option = f.discriminatedUnion.options[0]!;
        const discriminatorKey = f.discriminatedUnion.discriminatorKey;
        o[discriminatorKey] = option.value;
        for (const sf of option.field.children ?? []) {
          if (sf.key === discriminatorKey) continue;
          o[sf.key] = defaultForParsed(sf);
        }
        return o;
      }
      for (const sf of f.children ?? []) {
        o[sf.key] = defaultForParsed(sf);
      }
      return o;
    }
    case "array":
      return [];
    default:
      return null;
  }
}

export function resolveObjectSchema(
  field: ParsedField,
  value: Record<string, any> | null | undefined,
): ResolvedObjectSchema {
  if (!field.discriminatedUnion) {
    return {
      children: field.children ?? [],
      additionalProperties: field.additionalProperties,
    };
  }

  const info = field.discriminatedUnion;
  const currentDiscriminator =
    value && typeof value === "object" && !Array.isArray(value)
      ? value[info.discriminatorKey]
      : undefined;
  const activeOption =
    info.options.find((opt) => opt.value === currentDiscriminator) ?? info.options[0];
  const children =
    activeOption?.field.children?.filter((child) => child.key !== info.discriminatorKey) ??
    [];

  return {
    children,
    additionalProperties: activeOption?.field.additionalProperties,
    discriminatorKey: info.discriminatorKey,
    activeOption,
  };
}

export function fieldWithKey(field: ParsedField, key: string): ParsedField {
  return {
    ...field,
    key,
  };
}
