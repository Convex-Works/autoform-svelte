import { describe, expect, test } from "bun:test";
import { z } from "zod";
import type { JSONSchema } from "../core/types.js";
import { createCustomAdapter, jsonSchemaAdapter } from "./custom.js";
import { zodAdapter } from "./zod.js";

describe("jsonSchemaAdapter", () => {
  test("passes through JSON schema objects", () => {
    const schema: JSONSchema = {
      type: "object",
      properties: {
        name: { type: "string" },
      },
    };

    expect(jsonSchemaAdapter.toJSONSchema(schema)).toEqual(schema);
  });

  test("throws for non-json-schema objects", () => {
    expect(() =>
      jsonSchemaAdapter.toJSONSchema({ _def: { typeName: "ZodObject" } } as unknown as JSONSchema),
    ).toThrow("Invalid JSON Schema");
  });
});

describe("createCustomAdapter", () => {
  test("converts custom schema shape", () => {
    const adapter = createCustomAdapter<{ exportSchema: () => JSONSchema }>((schema) =>
      schema.exportSchema(),
    );
    const out = adapter.toJSONSchema({
      exportSchema: () => ({ type: "string" }),
    });
    expect(out).toEqual({ type: "string" });
  });
});

describe("zodAdapter", () => {
  test("converts zod schema to json schema", () => {
    const out = zodAdapter.toJSONSchema(
      z.object({
        name: z.string(),
      }),
    );
    expect(out.type).toBe("object");
    expect((out.properties as Record<string, unknown>)?.name).toBeDefined();
  });

  test("preserves zod form metadata in json schema", () => {
    const out = zodAdapter.toJSONSchema(
      z.object({
        description: z.string().meta({
          form: {
            widget: "textarea",
            label: "Description",
            placeholder: "Add details",
            reorderable: true,
          },
        }),
      }),
    );

    const description = (out.properties as Record<string, any>)?.description;
    expect(description?.form?.widget).toBe("textarea");
    expect(description?.form?.label).toBe("Description");
    expect(description?.form?.placeholder).toBe("Add details");
    expect(description?.form?.reorderable).toBe(true);
  });
});
