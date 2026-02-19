import { getContext, setContext } from "svelte";
import type { ShadcnComponents } from "./types.js";

const CONTEXT_KEY = "autoform-shadcn-components";

/** Module-level reference set by createShadcnTheme */
let _components: ShadcnComponents | undefined;

export function bindComponents(components: ShadcnComponents) {
  _components = components;
}

export function getBoundComponents(): ShadcnComponents {
  if (!_components) {
    throw new Error("shadcn theme components not bound. Call createShadcnTheme() first.");
  }
  return _components;
}

export function setShadcnComponents(components: ShadcnComponents) {
  setContext(CONTEXT_KEY, components);
}

export function getShadcnComponents(): ShadcnComponents {
  return getContext<ShadcnComponents>(CONTEXT_KEY);
}
