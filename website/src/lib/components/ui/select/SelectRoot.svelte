<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	let {
		value = $bindable(),
		onValueChange,
		children,
		...rest
	}: {
		type?: string;
		value?: string;
		onValueChange?: (value: string) => void;
		children?: Snippet;
	} = $props();
</script>

<SelectPrimitive.Root bind:value {onValueChange} {...rest}>
	{#if children}
		{@render children()}
	{/if}
</SelectPrimitive.Root>
