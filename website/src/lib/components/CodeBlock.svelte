<script lang="ts">
	let { code, lang = "ts" }: { code: string; lang?: string } = $props();
</script>

<div class="rounded-lg border bg-slate-950 text-slate-50 overflow-x-auto">
	<pre class="p-4 text-sm leading-relaxed"><code>{code.trim()}</code></pre>
</div>
