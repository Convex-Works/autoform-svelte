<script lang="ts">
	import { onMount } from "svelte";

	let { value = $bindable("") }: { value?: string } = $props();

	let container = $state<HTMLDivElement | null>(null);
	let view: any = null;
	let syncingFromEditor = false;

	onMount(() => {
		let destroyed = false;

		(async () => {
			if (!container || destroyed) return;
			const [{ EditorView, basicSetup }, { StreamLanguage }] = await Promise.all([
				import("codemirror"),
				import("@codemirror/language"),
			]);
			if (destroyed || !container) return;

			const typescriptLanguage = StreamLanguage.define({
				startState() {
					return {
						inBlockComment: false,
						inString: null as '"' | "'" | "`" | null,
					};
				},
				token(stream: any, state: { inBlockComment: boolean; inString: '"' | "'" | "`" | null }) {
					if (state.inBlockComment) {
						if (stream.skipTo("*/")) {
							stream.pos += 2;
							state.inBlockComment = false;
						} else {
							stream.skipToEnd();
						}
						return "comment";
					}

					if (state.inString) {
						while (!stream.eol()) {
							const ch = stream.next();
							if (ch === "\\") {
								stream.next();
								continue;
							}
							if (ch === state.inString) {
								state.inString = null;
								break;
							}
						}
						return "string";
					}

					if (stream.eatSpace()) return null;
					if (stream.match(/^\/\/.*/)) return "comment";
					if (stream.match("/*")) {
						state.inBlockComment = true;
						return "comment";
					}
					if (stream.match(/^['"`]/)) {
						state.inString = stream.current() as '"' | "'" | "`";
						return "string";
					}
					if (stream.match(/^(true|false|null|undefined)\b/)) return "atom";
					if (
						stream.match(
							/^(import|from|export|default|const|let|var|function|return|if|else|for|while|switch|case|break|continue|new|class|extends|implements|interface|type|enum|as|async|await|try|catch|finally|throw|in|of)\b/
						)
					) {
						return "keyword";
					}
					if (stream.match(/^(string|number|boolean|unknown|any|void|never|object)\b/)) {
						return "typeName";
					}
					if (stream.match(/^\d+(\.\d+)?/)) return "number";
					if (stream.match(/^(=>|===|!==|==|!=|<=|>=|\|\||&&|[=+\-*/%<>?:.])/)) {
						return "operator";
					}
					if (stream.match(/^[_$A-Za-z][\w$]*/)) return "variableName";

					stream.next();
					return null;
				},
				languageData: {
					commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
				},
			});

			view = new EditorView({
				doc: value,
				parent: container,
				extensions: [
					basicSetup,
					typescriptLanguage,
					EditorView.lineWrapping,
					EditorView.updateListener.of((update: any) => {
						if (!update.docChanged) return;
						syncingFromEditor = true;
						value = update.state.doc.toString();
						queueMicrotask(() => {
							syncingFromEditor = false;
						});
					}),
				],
			});
		})();

		return () => {
			destroyed = true;
			view?.destroy();
			view = null;
		};
	});

	$effect(() => {
		if (!view || syncingFromEditor) return;
		const current = view.state.doc.toString();
		if (current === value) return;
		view.dispatch({
			changes: { from: 0, to: current.length, insert: value },
		});
	});
</script>

<div class="overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] text-slate-700">
	<div class="border-b border-slate-200 px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-500">
		Schema
	</div>
	<div bind:this={container} class="schema-editor"></div>
</div>

<style>
	.schema-editor :global(.cm-editor) {
		background: #f8fafc;
		color: #334155;
		min-height: 16rem;
	}

	.schema-editor :global(.cm-scroller) {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		font-size: 0.875rem;
		line-height: 1.4;
		padding: 1rem;
	}

	.schema-editor :global(.cm-gutters) {
		background: #f1f5f9;
		border-right: 1px solid #e2e8f0;
		color: #94a3b8;
	}

	.schema-editor :global(.cm-activeLineGutter) {
		background: #eef2ff;
	}

	.schema-editor :global(.cm-activeLine) {
		background: #f1f5f9;
	}

	.schema-editor :global(.cm-cursor) {
		border-left-color: #334155;
	}

	.schema-editor :global(.cm-selectionBackground) {
		background: #dbeafe !important;
	}

	.schema-editor :global(.cm-content) {
		caret-color: #334155;
	}

	.schema-editor :global(.cm-comment) {
		color: #94a3b8;
		font-style: italic;
	}

	.schema-editor :global(.cm-keyword) {
		color: #7c6ad8;
	}

	.schema-editor :global(.cm-string) {
		color: #0f766e;
	}

	.schema-editor :global(.cm-number) {
		color: #c26b2e;
	}

	.schema-editor :global(.cm-typeName) {
		color: #2f6fd3;
	}

	.schema-editor :global(.cm-atom) {
		color: #5b8a3c;
	}

	.schema-editor :global(.cm-operator) {
		color: #64748b;
	}

	.schema-editor :global(.cm-variableName) {
		color: #334155;
	}
</style>
