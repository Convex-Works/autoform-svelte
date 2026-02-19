import type { ZodTypeAny } from "zod";
import { toJSONSchema } from "zod";
import type { JSONSchema } from "../core/types.js";
import type { SchemaAdapter } from "./types.js";

export const zodAdapter: SchemaAdapter<ZodTypeAny> = {
  toJSONSchema(schema) {
    return toJSONSchema(schema) as JSONSchema;
  },
};
