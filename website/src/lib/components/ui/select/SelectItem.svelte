<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import { Select as SelectPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	let {
		value,
		label,
		class: className,
		children,
		disabled,
		...rest
	}: {
		value: string;
		label?: string;
		class?: string;
		children?: Snippet;
		disabled?: boolean;
	} = $props();
</script>

<SelectPrimitive.Item
	{value}
	{label}
	{disabled}
	class={cn(
		"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		className,
	)}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		{label ?? value}
	{/if}
</SelectPrimitive.Item>
