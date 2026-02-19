<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";
	import type { HTMLLabelAttributes } from "svelte/elements";

	let { class: className, children, ...rest }: HTMLLabelAttributes & { children?: Snippet } = $props();
</script>

<label
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		className,
	)}
	{...rest}
>
	{#if children}
		{@render children()}
	{/if}
</label>
