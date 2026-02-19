import { describe, expect, test } from "bun:test";
import {
  arrayPush,
  defaultForParsed,
  resolveFieldLabel,
  isObjectReorderable,
  parseJsonSchema,
  resolvePlaceholder,
  resolveStringWidget,
  validateJson,
  type JSONSchema,
} from "./index.js";

describe("parseJsonSchema", () => {
  test("parses top-level object fields and enum options", () => {
    const schema: JSONSchema = {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        role: { type: "string", enum: ["admin", "member"] },
      },
    };

    const parsed = parseJsonSchema(schema);
    expect(parsed.fields.length).toBe(2);
    expect(parsed.fields[0]?.key).toBe("name");
    expect(parsed.fields[0]?.required).toBe(true);
    expect(parsed.fields[1]?.enumValues?.length).toBe(2);
  });

  test("parses form metadata and resolves widget/placeholder/reorderability", () => {
    const schema: JSONSchema = {
      type: "object",
      properties: {
        description: {
          type: "string",
          form: {
            widget: "textarea",
            label: "Profile description",
            placeholder: "Add details",
          },
        },
        title: {
          type: "string",
        },
        settings: {
          type: "object",
          properties: {
            mode: { type: "string" },
          },
          form: {
            reorderable: true,
          },
        },
      },
    };

    const parsed = parseJsonSchema(schema);
    const descriptionField = parsed.fields.find((f) => f.key === "description");
    const titleField = parsed.fields.find((f) => f.key === "title");
    const settingsField = parsed.fields.find((f) => f.key === "settings");

    expect(descriptionField).toBeDefined();
    expect(titleField).toBeDefined();
    expect(settingsField).toBeDefined();

    expect(resolveStringWidget(descriptionField!)).toBe("textarea");
    expect(resolveFieldLabel(descriptionField!)).toBe("Profile description");
    expect(resolvePlaceholder(descriptionField!)).toBe("Add details");
    expect(resolveStringWidget(titleField!)).toBe("input");
    expect(resolvePlaceholder(titleField!)).toBeUndefined();
    expect(isObjectReorderable(settingsField!)).toBe(true);
  });

  test("uses schema defaults when present", () => {
    const schema: JSONSchema = {
      type: "object",
      properties: {
        title: { type: "string", default: "Hello" },
        attempts: { type: "integer", default: 3 },
        flags: {
          type: "array",
          items: { type: "boolean" },
          default: [true, false],
        },
      },
    };

    const parsed = parseJsonSchema(schema);
    const titleField = parsed.fields.find((f) => f.key === "title");
    const attemptsField = parsed.fields.find((f) => f.key === "attempts");
    const flagsField = parsed.fields.find((f) => f.key === "flags");

    expect(defaultForParsed(titleField!)).toBe("Hello");
    expect(defaultForParsed(attemptsField!)).toBe(3);
    expect(defaultForParsed(flagsField!)).toEqual([true, false]);
  });
});

describe("validateJson", () => {
  test("returns errors for invalid required and types", () => {
    const schema: JSONSchema = {
      type: "object",
      required: ["age"],
      properties: {
        age: { type: "integer" },
      },
    };

    const invalid = validateJson(schema, { age: "17" });
    expect(invalid.ok).toBe(false);
    if (!invalid.ok) {
      expect(invalid.errors.length).toBeGreaterThan(0);
    }
  });

  test("validates discriminated unions declared with oneOf", () => {
    const schema: JSONSchema = {
      type: "object",
      required: ["shape"],
      properties: {
        shape: {
          type: "object",
          oneOf: [
            {
              type: "object",
              required: ["type", "radius"],
              properties: {
                type: { type: "string", const: "Circle" },
                radius: { type: "number" },
              },
            },
            {
              type: "object",
              required: ["type", "width", "height"],
              properties: {
                type: { type: "string", const: "Rectangle" },
                width: { type: "number" },
                height: { type: "number" },
              },
            },
          ],
        },
      },
    };

    const missingVariantField = validateJson(schema, {
      shape: { type: "Circle" },
    });
    expect(missingVariantField.ok).toBe(false);
    if (!missingVariantField.ok) {
      expect(missingVariantField.errors).toContain("shape.radius is required");
    }

    const unknownVariant = validateJson(schema, {
      shape: { type: "Triangle", side: 4 },
    });
    expect(unknownVariant.ok).toBe(false);
    if (!unknownVariant.ok) {
      expect(unknownVariant.errors).toContain("shape did not match any union variant");
    }
  });
});

describe("arrayPush", () => {
  test("adds default values based on item schema", () => {
    const target: Record<string, unknown> = {};
    const parsed = parseJsonSchema({
      type: "object",
      properties: {
        tags: { type: "array", items: { type: "string" } },
      },
    });

    const field = parsed.fields[0]!;
    arrayPush(target as Record<string, any>, ["tags"], field);
    expect(target).toEqual({ tags: [""] });
  });
});
