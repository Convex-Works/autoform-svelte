<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  let { class: className, children, ...rest }: { class?: string; children?: Snippet } = $props();
</script>

<p class={cn("text-sm font-medium text-destructive", className)} {...rest}>
  {#if children}
    {@render children()}
  {/if}
</p>
