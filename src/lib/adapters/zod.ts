import type { ZodTypeAny } from "zod";
import type { JSONSchema } from "../core/types.js";
import type { SchemaAdapter } from "./types.js";

export const zodAdapter: SchemaAdapter<ZodTypeAny> = {
  toJSONSchema(schema) {
    const toJSONSchema = (schema as any)?.toJSONSchema;
    if (typeof toJSONSchema !== "function") {
      throw new Error(
        'zodAdapter requires Zod with toJSONSchema support. Install "zod@^4" in the app that uses zodAdapter.',
      );
    }
    return toJSONSchema.call(schema) as JSONSchema;
  },
};
