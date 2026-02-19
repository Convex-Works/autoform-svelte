<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";

	let { class: className, children, ...rest }: { class?: string; children?: Snippet } = $props();
</script>

<div class={cn("flex flex-col space-y-1.5 p-6", className)} {...rest}>
	{#if children}{@render children()}{/if}
</div>
