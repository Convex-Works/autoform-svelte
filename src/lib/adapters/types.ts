import type { JSONSchema } from "../core/types.js";

export interface SchemaAdapter<TSchema = unknown> {
  toJSONSchema: (schema: TSchema) => JSONSchema;
}
