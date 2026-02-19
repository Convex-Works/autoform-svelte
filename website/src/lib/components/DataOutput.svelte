<script lang="ts">
	let { data, label = "Form Data" }: { data: Record<string, any>; label?: string } = $props();
</script>

<div class="rounded-lg border bg-slate-50 overflow-x-auto">
	<div class="px-4 py-2 border-b bg-slate-100 text-xs font-medium text-slate-500 uppercase tracking-wider">
		{label}
	</div>
	<pre class="p-4 text-sm leading-relaxed text-slate-700"><code>{JSON.stringify(data, null, 2)}</code></pre>
</div>
