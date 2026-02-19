<script lang="ts">
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    orientation = "vertical",
    class: className,
    children,
    ...rest
  }: HTMLAttributes<HTMLDivElement> & {
    orientation?: "vertical" | "horizontal" | "responsive" | string;
    children?: Snippet;
  } = $props();

  const orientationClasses: Record<string, string> = {
    vertical: "flex flex-col gap-1.5",
    horizontal: "flex items-start gap-2",
    responsive: "grid gap-3 md:grid-cols-[minmax(0,220px)_1fr] md:items-start",
  };
</script>

<div
  role="group"
  class={cn("w-full", orientationClasses[orientation] ?? orientationClasses.vertical, className)}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</div>
