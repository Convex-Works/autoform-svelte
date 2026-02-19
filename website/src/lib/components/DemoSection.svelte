<script lang="ts">
	import type { Snippet } from "svelte";
	import SchemaEditor from "$lib/components/SchemaEditor.svelte";

	let {
		title,
		description,
		code = $bindable(),
		children,
	}: {
		title: string;
		description: string;
		code: string;
		children: Snippet;
	} = $props();
</script>

<section class="space-y-4">
	<div>
		<h3 class="text-2xl font-bold">{title}</h3>
		<p class="text-muted-foreground mt-1">{description}</p>
	</div>
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<div>
			<SchemaEditor bind:value={code} />
		</div>
		<div class="space-y-4">
			{@render children()}
		</div>
	</div>
</section>
