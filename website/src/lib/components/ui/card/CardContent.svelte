<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import type { Snippet } from "svelte";

	let { class: className, children, ...rest }: { class?: string; children?: Snippet } = $props();
</script>

<div class={cn("p-6 pt-0", className)} {...rest}>
	{#if children}{@render children()}{/if}
</div>
