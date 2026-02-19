<script lang="ts">
	import { cn } from "$lib/utils/cn";
	import { Checkbox as CheckboxPrimitive } from "bits-ui";

	let {
		checked = $bindable(false),
		onCheckedChange,
		class: className,
		id,
		...rest
	}: {
		checked?: boolean;
		onCheckedChange?: (checked: boolean) => void;
		class?: string;
		id?: string;
	} = $props();
</script>

<CheckboxPrimitive.Root
	bind:checked
	{onCheckedChange}
	{id}
	class={cn(
		"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
		className,
	)}
	{...rest}
>
	{#snippet children({ checked: isChecked })}
		<div class="flex items-center justify-center text-current">
			{#if isChecked}
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
			{/if}
		</div>
	{/snippet}
</CheckboxPrimitive.Root>
