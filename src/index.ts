import Autoform from "./Autoform.svelte";

export { Autoform };
export { Autoform as default };
export { default as AutoformProvider } from "./AutoformProvider.svelte";
export { nativeTheme } from "./lib/themes/native/index.js";
export * from "./lib/core/index.js";
export type { SchemaAdapter } from "./lib/adapters/types.js";
export { createCustomAdapter, jsonSchemaAdapter } from "./lib/adapters/custom.js";
