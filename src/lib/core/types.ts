export type JSONSchema =
  | ({
      type?: "object";
      properties?: Record<string, JSONSchema>;
      required?: string[];
      additionalProperties?: boolean | JSONSchema;
    } & Base)
  | ({ type?: "string"; format?: "date-time" } & Base)
  | ({ type?: "number" | "integer" } & Base)
  | ({ type?: "boolean" } & Base)
  | ({ type?: "array"; items?: JSONSchema | JSONSchema[] } & Base)
  | Base;

export type Base = {
  title?: string;
  description?: string;
  default?: unknown;
  [$k: string]: any;
};

export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "object"
  | "integer"
  | "array"
  | "unknown";

export type FormWidget = "input" | "textarea";

export interface ParsedFieldFormMeta {
  widget?: FormWidget;
  label?: string;
  placeholder?: string;
  reorderable?: boolean;
}

export interface ParsedField {
  key: string;
  type: FieldType;
  title?: string;
  description?: string;
  defaultValue?: unknown;
  form?: ParsedFieldFormMeta;
  required?: boolean;
  enumValues?: ParsedEnumOption[];
  children?: ParsedField[];
  additionalProperties?: ParsedAdditionalProperties;
  discriminatedUnion?: ParsedDiscriminatedUnion;
  items?: ParsedField;
}

export interface ParsedEnumOption {
  key: string;
  value: unknown;
  label: string;
}

export interface ParsedAdditionalProperties {
  allowAny: boolean;
  schema?: ParsedField;
}

export interface ParsedDiscriminatedUnionOption {
  value: string;
  label: string;
  field: ParsedField;
}

export interface ParsedDiscriminatedUnion {
  discriminatorKey: string;
  options: ParsedDiscriminatedUnionOption[];
}

export interface ResolvedObjectSchema {
  children: ParsedField[];
  additionalProperties?: ParsedAdditionalProperties;
  discriminatorKey?: string;
  activeOption?: ParsedDiscriminatedUnionOption;
}

// ── Theme system ──────────────────────────────────────────────────

import type { Component, Snippet } from "svelte";

export interface AutoformTheme {
  Form: Component<FormThemeProps>;
  String: Component<FieldThemeProps>;
  Number: Component<FieldThemeProps>;
  Boolean: Component<FieldThemeProps>;
  Date: Component<FieldThemeProps>;
  Enum: Component<EnumThemeProps>;
  Object: Component<ObjectThemeProps>;
  Array: Component<ArrayThemeProps>;
  Unknown: Component<FieldThemeProps>;
}

/** Shared base for all field theme components */
export interface FieldThemeProps {
  field: ParsedField;
  value: unknown;
  onchange: (value: unknown) => void;
}

/** Enum fields get the parsed options */
export interface EnumThemeProps extends FieldThemeProps {
  options: ParsedEnumOption[];
  selectedKey: string;
}

/** Object fields get child rendering and action callbacks */
export interface ObjectThemeProps extends FieldThemeProps {
  resolved: ResolvedObjectSchema;
  orderedKeys: string[];
  childLookup: Map<string, ParsedField>;
  renderField: Snippet<
    [field: ParsedField, path: (string | number)[], options?: { showLabel?: boolean }]
  >;
  onAddProperty?: () => void;
  onRemoveProperty?: (key: string) => void;
  onMoveKey?: (key: string, delta: number) => void;
  discriminator?: {
    key: string;
    value: string;
    options: { value: string; label: string }[];
    onchange: (value: string) => void;
  };
}

/** Array fields get item rendering and add/remove callbacks */
export interface ArrayThemeProps extends FieldThemeProps {
  items: ParsedField | undefined;
  count: number;
  renderField: Snippet<
    [field: ParsedField, path: (string | number)[], options?: { showLabel?: boolean }]
  >;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

/** Form wrapper props */
export interface FormThemeProps {
  title?: string;
  errors: string[];
  submitLabel: string;
  cancelLabel: string;
  onsubmit: () => void;
  oncancel: () => void;
  children: Snippet;
}
