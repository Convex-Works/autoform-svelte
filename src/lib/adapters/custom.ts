import type { JSONSchema } from "../core/types.js";
import type { SchemaAdapter } from "./types.js";

export function createCustomAdapter<TSchema>(
  toJSONSchema: (schema: TSchema) => JSONSchema,
): SchemaAdapter<TSchema> {
  return { toJSONSchema };
}

function hasJsonSchemaMarkers(schema: Record<string, unknown>): boolean {
  return (
    "type" in schema ||
    "properties" in schema ||
    "items" in schema ||
    "enum" in schema ||
    "anyOf" in schema ||
    "oneOf" in schema ||
    "required" in schema ||
    "additionalProperties" in schema ||
    "format" in schema ||
    "$ref" in schema
  );
}

export const jsonSchemaAdapter: SchemaAdapter<JSONSchema> = {
  toJSONSchema(schema) {
    if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
      throw new Error(
        "jsonSchemaAdapter expected a JSON Schema object. Pass adapter for non-JSON schema libraries.",
      );
    }

    const node = schema as Record<string, unknown>;
    if (!hasJsonSchemaMarkers(node)) {
      throw new Error(
        "Invalid JSON Schema: missing core schema keys. If you are using Zod or another schema library, pass its adapter.",
      );
    }

    return schema;
  },
};
