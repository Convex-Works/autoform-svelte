<script lang="ts">
  import { setContext } from "svelte";
  import type { AutoformTheme } from "./lib/core/types.js";
  import type { Snippet } from "svelte";
  import type { SchemaAdapter } from "./lib/adapters/index.js";

  let {
    theme,
    adapter,
    children,
  }: {
    theme?: AutoformTheme;
    adapter?: SchemaAdapter;
    children: Snippet;
  } = $props();

  setContext("autoform-theme", () => theme);
  setContext("autoform-adapter", () => adapter);
</script>

{@render children()}
