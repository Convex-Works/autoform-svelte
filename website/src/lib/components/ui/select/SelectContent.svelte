<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import { Select as SelectPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";

	let { class: className, children, ...rest }: { class?: string; children?: Snippet } = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		class={cn(
			"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
			className,
		)}
		sideOffset={4}
		{...rest}
	>
		<SelectPrimitive.Viewport class="p-1">
			{#if children}
				{@render children()}
			{/if}
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
