<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    variant = "default",
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLLegendElement> & {
    variant?: "default" | "label" | string;
    children?: Snippet;
  } = $props();

  const variants: Record<string, string> = {
    default: "text-base font-semibold",
    label: "text-sm font-medium",
  };
</script>

<legend class={cn(variants[variant] ?? variants.default, className)} {...rest}>
  {#if children}
    {@render children()}
  {/if}
</legend>
