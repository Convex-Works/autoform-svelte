<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let { class: className, children, ...rest }: HTMLAttributes<HTMLFieldSetElement> & { children?: Snippet } = $props();
</script>

<fieldset class={cn("space-y-4", className)} {...rest}>
  {#if children}
    {@render children()}
  {/if}
</fieldset>
