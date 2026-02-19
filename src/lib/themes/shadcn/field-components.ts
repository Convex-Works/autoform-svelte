import type { ShadcnComponents, ShadcnFieldComponents } from "./types.js";

export type ResolvedFieldComponents = {
  wrapper?: ShadcnFieldComponents["Field"];
  label: ShadcnFieldComponents["Label"] | ShadcnComponents["Label"];
  description?: ShadcnFieldComponents["Description"];
  group?: ShadcnFieldComponents["Group"];
  set?: ShadcnFieldComponents["Set"];
  legend?: ShadcnFieldComponents["Legend"];
  content?: ShadcnFieldComponents["Content"];
  separator?: ShadcnFieldComponents["Separator"];
  error?: ShadcnFieldComponents["Error"];
  title?: ShadcnFieldComponents["Title"];
};

export function resolveFieldComponents(
  components: ShadcnComponents,
): ResolvedFieldComponents {
  const field = components.Field;
  return {
    wrapper: field?.Field,
    label: field?.Label ?? components.Label,
    description: field?.Description,
    group: field?.Group,
    set: field?.Set,
    legend: field?.Legend,
    content: field?.Content,
    separator: field?.Separator,
    error: field?.Error,
    title: field?.Title,
  };
}
