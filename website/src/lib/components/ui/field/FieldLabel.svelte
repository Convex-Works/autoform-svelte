<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import { Label } from "$lib/components/ui/label";
  import type { Snippet } from "svelte";

  let { class: className, children, ...rest }: { class?: string; children?: Snippet } = $props();
</script>

<Label class={cn(className)} {...rest}>
  {#if children}
    {@render children()}
  {/if}
</Label>
