<script lang="ts">
	import { z } from "zod";
	import { Autoform, AutoformProvider } from "autoform-svelte";
	import { zodAdapter } from "autoform-svelte/adapters/zod";
	import { shadcnTheme } from "$lib/theme";
	import CodeBlock from "$lib/components/CodeBlock.svelte";
	import DemoSection from "$lib/components/DemoSection.svelte";
	import DataOutput from "$lib/components/DataOutput.svelte";
	import SchemaEditor from "$lib/components/SchemaEditor.svelte";
	import { createSeoMeta, jsonLd } from "$lib/seo";

	type AnyObjectSchema = z.ZodObject<any>;
	const EMPTY_SCHEMA: AnyObjectSchema = z.object({});

	function parseSchemaExpression(source: string): AnyObjectSchema {
		try {
			const buildSchema = new Function("z", `"use strict"; return (${source});`);
			const schema = buildSchema(z);
			if (schema instanceof z.ZodObject) return schema;
		} catch {}
		return EMPTY_SCHEMA;
	}

	// Example 1: Contact Form
	const contactSchemaInitialCode = `z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().meta({
    form: {
      widget: "textarea"
    }
  }),
  newsletter: z.boolean().default(false).meta({
    form: {
      label: "Subscribe to our newsletter",
    },
  }),
})`;
	let contactSchemaCode: string = $state(contactSchemaInitialCode);
	let contactSchema: AnyObjectSchema = $state(parseSchemaExpression(contactSchemaInitialCode));
	$effect(() => {
		contactSchema = parseSchemaExpression(contactSchemaCode);
	});
	let contactData: Record<string, any> = $state({});

	// Example 2: Event Registration
	const eventSchemaInitialCode = `z.object({
  name: z.string().min(1),
  email: z.string().email(),
  ticketTier: z.enum(["General", "VIP", "Student"]),
  eventDate: z.string().datetime(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  guests: z.array(z.string()),
})`;
	let eventSchemaCode: string = $state(eventSchemaInitialCode);
	let eventSchema: AnyObjectSchema = $state(parseSchemaExpression(eventSchemaInitialCode));
	$effect(() => {
		eventSchema = parseSchemaExpression(eventSchemaCode);
	});
	let eventData: Record<string, any> = $state({});

	// Example 3: Shape Builder
	const shapeSchemaInitialCode = `z.object({
  shape: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("Circle"),
      radius: z.number().positive(),
    }),
    z.object({
      type: z.literal("Rectangle"),
      width: z.number().positive(),
      height: z.number().positive(),
    }),
    z.object({
      type: z.literal("Polygon"),
      sides: z.number().int().min(3),
      sideLength: z.number().positive(),
    }),
  ]),
})`;
	let shapeSchemaCode: string = $state(shapeSchemaInitialCode);
	let shapeSchema: AnyObjectSchema = $state(parseSchemaExpression(shapeSchemaInitialCode));
	$effect(() => {
		shapeSchema = parseSchemaExpression(shapeSchemaCode);
	});
	let shapeData: Record<string, any> = $state({});

	const seo = createSeoMeta({
		title: "Svelte 5 Schema-Driven Form Generator (JSON Schema + Zod) | autoform-svelte",
		description:
			"Generate schema-driven forms in Svelte 5 from JSON Schema or Zod. Supports defaults, enums, arrays, nested objects, and customization hooks.",
		path: "/",
		keywords: [
			"svelte form generator",
			"schema driven forms svelte",
			"svelte json schema form",
			"svelte zod form",
			"dynamic form generator svelte",
		],
	});

	const softwareApplicationLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "autoform-svelte",
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Web",
		programmingLanguage: ["TypeScript", "Svelte"],
		url: seo.canonical,
		description: seo.description,
		codeRepository: "https://github.com/convex-works/autoform-svelte",
		license: "https://spdx.org/licenses/MIT.html",
	};

	const faqEntries = [
		{
			question: "Can autoform-svelte generate forms from JSON Schema?",
			answer:
				"Yes. JSON Schema is supported out of the box through the default jsonSchemaAdapter.",
		},
		{
			question: "Can I generate forms from a Zod schema in Svelte 5?",
			answer:
				"Yes. Use zodAdapter with Zod v4 to convert a Zod schema to JSON Schema and render the form.",
		},
		{
			question: "Is this only for admin or internal tools?",
			answer:
				"It is useful for admin and internal tools, but it can also power product settings and CRUD workflows where schema-driven forms are a fit.",
		},
		{
			question: "Can I customize generated fields?",
			answer:
				"Yes. You can customize labels, placeholders, widgets, and object behavior via schema metadata and by providing custom adapters or themes.",
		},
		{
			question: "What are some common use cases of this library?",
			answer: "Admin panel forms, internal tools, CRUD workflows, and settings pages built from existing schemas"
		}
	];

	const faqPageLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqEntries.map((entry) => ({
			"@type": "Question",
			name: entry.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: entry.answer,
			},
		})),
	};

</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />
	<link rel="canonical" href={seo.canonical} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:type" content={seo.type} />
	<meta property="og:url" content={seo.canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	{@html jsonLd(softwareApplicationLd)}
	{@html jsonLd(faqPageLd)}
	<!-- {@html jsonLd(softwareApplicationLd)}</script> -->
	<!-- <script type="application/ld+json">{@html jsonLd(faqPageLd)}</script> -->
</svelte:head>

<AutoformProvider theme={shadcnTheme} adapter={zodAdapter}>
<div class="min-h-screen">
	<!-- Hero -->
	<header class="border-b">
		<div class="max-w-5xl mx-auto px-6 py-20 text-center">
			<h1 class="text-5xl font-extrabold tracking-tight">autoform-svelte</h1>
			<p class="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
				Schema-driven form generator for Svelte 5. Generate forms from JSON Schema or <a href="https://zod.dev" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 transition-colors">Zod</a>,
				with support for <a href="https://www.shadcn-svelte.com/" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 transition-colors">shadcn-svelte</a> theming.
			</p>
			<div class="mt-6 max-w-md mx-auto">
				<CodeBlock code="bun add autoform-svelte zod" lang="bash" />
				<a
					href="https://github.com/convex-works/autoform-svelte"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
				>
					GitHub
				</a>
				<a
					href="https://www.npmjs.com/package/@cnvx/autoform-svelte"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
				>
				  NPM
				</a>
			</div>
			<!-- <div class="mt-6 flex gap-3 justify-center">
				<a
					href="https://github.com/convex-works/autoform-svelte"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
				>
					GitHub
				</a>
				<a
					href="#examples"
					class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
				>
					See examples &darr;
				</a>
			</div> -->
			<div class="mt-12 text-left">
				<div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
					<div>
						<SchemaEditor bind:value={contactSchemaCode} />
					</div>
					<div class="space-y-4">
						<Autoform
							schema={contactSchema}
							bind:data={contactData}
							title="Contact Us"
						/>
						<DataOutput data={contactData} />
					</div>
				</div>
			</div>

		</div>
	</header>

	<main class="max-w-5xl mx-auto px-6 py-16 space-y-24">
		<!-- Quick Start -->
		<section id="quick-start" class="space-y-4">
			<h2 class="text-3xl font-bold">Quick Start</h2>
			<p class="text-muted-foreground">Define a schema, pass the adapter, and render <code class="text-sm bg-muted px-1.5 py-0.5 rounded">&lt;Autoform&gt;</code>.</p>
			<CodeBlock code={`<script lang="ts">
  import { z } from "zod";
  import { Autoform } from "autoform-svelte";
  import { zodAdapter } from "autoform-svelte/adapters/zod";

  const schema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
  });
</script>

<Autoform {schema} adapter={zodAdapter} onsubmit={(e) => console.log(e.data)} />`} />
		</section>

		<section id="customization" class="space-y-4">
			<h2 class="text-3xl font-bold">Field Metadata</h2>
			<p class="text-muted-foreground">
				Customize widgets, placeholders, and object key reordering with
				<code class="text-sm bg-muted px-1.5 py-0.5 rounded">.meta({"{ form: { ... } }"})</code>.
			</p>
			<CodeBlock code={`const schema = z.object({
  message: z.string().meta({
    form: {
      widget: "textarea",
      label: "Message",
      placeholder: "Write your message",
    },
  }),
  shape: z.object({
    type: z.string(),
    radius: z.number(),
  }).meta({
    form: {
      reorderable: true,
    },
  }),
});`} />
		</section>

		<!-- Examples -->
		<section id="examples" class="space-y-20">
			<h2 class="text-3xl font-bold">Examples</h2>

			<!-- Example 2: Event Registration -->
			<DemoSection
				title="Event Registration"
				description="Editable schema expression with automatic form generation."
				bind:code={eventSchemaCode}
			>
				<Autoform
					schema={eventSchema}
					bind:data={eventData}
					title="Register for Event"
				/>
				<DataOutput data={eventData} />
			</DemoSection>

			<!-- Example 3: Shape Builder -->
			<DemoSection
				title="Shape Builder"
				description="Discriminated unions and nested object rendering."
				bind:code={shapeSchemaCode}
			>
				<Autoform
					schema={shapeSchema}
					bind:data={shapeData}
					title="Shape Builder"
				/>
				<DataOutput data={shapeData} />
			</DemoSection>
		</section>

		<!-- Theming -->
		<section id="adapters" class="space-y-6">
			<h2 class="text-3xl font-bold">Theming</h2>
			<p class="text-muted-foreground">
				Autoform ships with a native HTML theme by default. For styled forms, use the shadcn-svelte theme or create your own.
			</p>

			<div class="space-y-4">
				<h3 class="text-xl font-semibold">Native (default)</h3>
				<CodeBlock code={`<!-- Works out of the box with plain HTML elements -->
<Autoform schema={jsonSchema} onsubmit={handleSubmit} />`} />
			</div>

			<div class="space-y-4">
				<h3 class="text-xl font-semibold">shadcn-svelte</h3>
				<CodeBlock code={`// lib/theme.ts
import { createShadcnTheme } from "autoform-svelte/themes/shadcn";
import { Button } from "$lib/components/ui/button";
import { Input } from "$lib/components/ui/input";
import { Textarea } from "$lib/components/ui/textarea";
import { Checkbox } from "$lib/components/ui/checkbox";
import { Label } from "$lib/components/ui/label";
import * as Select from "$lib/components/ui/select";
import * as Card from "$lib/components/ui/card";
import * as Field from "$lib/components/ui/field";

export const shadcnTheme = createShadcnTheme({
  Button, Input, Textarea, Checkbox, Label, Field, Select, Card,
});`} />
			</div>

				<div class="space-y-4">
					<h3 class="text-xl font-semibold">Using a Theme</h3>
					<CodeBlock code={`<!-- Per-form -->
<Autoform {schema} theme={shadcnTheme} adapter={zodAdapter} />

<!-- Or globally via provider -->
<AutoformProvider theme={shadcnTheme} adapter={zodAdapter}>
  <Autoform {schema} />
  <Autoform {schema2} />
</AutoformProvider>`} />
				</div>
		</section>

		<!-- API Reference -->
		<section class="space-y-6">
			<h2 class="text-3xl font-bold">API Reference</h2>

			<div class="space-y-4">
				<h3 class="text-xl font-semibold">Props</h3>
				<div class="overflow-x-auto rounded-lg border">
					<table class="w-full text-sm">
						<thead class="bg-muted/50">
							<tr>
								<th class="text-left p-3 font-medium">Prop</th>
								<th class="text-left p-3 font-medium">Type</th>
								<th class="text-left p-3 font-medium">Default</th>
								<th class="text-left p-3 font-medium">Description</th>
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr><td class="p-3"><code class="text-sm">schema</code></td><td class="p-3"><code class="text-sm">unknown</code></td><td class="p-3">required</td><td class="p-3">Schema object consumed by the adapter</td></tr>
							<tr><td class="p-3"><code class="text-sm">adapter</code></td><td class="p-3"><code class="text-sm">SchemaAdapter</code></td><td class="p-3">jsonSchemaAdapter</td><td class="p-3">Schema conversion adapter (e.g. zodAdapter)</td></tr>
							<tr><td class="p-3"><code class="text-sm">data</code></td><td class="p-3"><code class="text-sm">Record&lt;string, any&gt;</code></td><td class="p-3"><code class="text-sm">{"{}"}</code></td><td class="p-3">Bindable form data object</td></tr>
							<tr><td class="p-3"><code class="text-sm">title</code></td><td class="p-3"><code class="text-sm">string</code></td><td class="p-3">-</td><td class="p-3">Form title</td></tr>
							<tr><td class="p-3"><code class="text-sm">submitLabel</code></td><td class="p-3"><code class="text-sm">string</code></td><td class="p-3"><code class="text-sm">"Save"</code></td><td class="p-3">Submit button text</td></tr>
							<tr><td class="p-3"><code class="text-sm">cancelLabel</code></td><td class="p-3"><code class="text-sm">string</code></td><td class="p-3"><code class="text-sm">"Cancel"</code></td><td class="p-3">Cancel button text</td></tr>
							<tr><td class="p-3"><code class="text-sm">theme</code></td><td class="p-3"><code class="text-sm">AutoformTheme</code></td><td class="p-3">nativeTheme</td><td class="p-3">UI component theme</td></tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="space-y-4">
				<h3 class="text-xl font-semibold">Events</h3>
				<div class="overflow-x-auto rounded-lg border">
					<table class="w-full text-sm">
						<thead class="bg-muted/50">
							<tr>
								<th class="text-left p-3 font-medium">Event</th>
								<th class="text-left p-3 font-medium">Payload</th>
								<th class="text-left p-3 font-medium">Description</th>
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr><td class="p-3"><code class="text-sm">submit</code></td><td class="p-3"><code class="text-sm">{"{ data }"}</code></td><td class="p-3">Fires when form passes validation</td></tr>
							<tr><td class="p-3"><code class="text-sm">cancel</code></td><td class="p-3">-</td><td class="p-3">Fires when cancel button is clicked</td></tr>
							<tr><td class="p-3"><code class="text-sm">error</code></td><td class="p-3"><code class="text-sm">{"{ errors: string[] }"}</code></td><td class="p-3">Fires on validation failure</td></tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="space-y-4">
				<h3 class="text-xl font-semibold">Supported Zod Types</h3>
				<div class="overflow-x-auto rounded-lg border">
					<table class="w-full text-sm">
						<thead class="bg-muted/50">
							<tr>
								<th class="text-left p-3 font-medium">Zod Type</th>
								<th class="text-left p-3 font-medium">Renders As</th>
							</tr>
						</thead>
						<tbody class="divide-y">
							<tr><td class="p-3"><code class="text-sm">z.string()</code></td><td class="p-3">Text input (default), textarea via metadata</td></tr>
							<tr><td class="p-3"><code class="text-sm">z.number()</code></td><td class="p-3">Number input</td></tr>
							<tr><td class="p-3"><code class="text-sm">z.boolean()</code></td><td class="p-3">Checkbox</td></tr>
							<tr><td class="p-3"><code class="text-sm">z.enum([...])</code></td><td class="p-3">Select dropdown</td></tr>
							<tr><td class="p-3"><code class="text-sm">z.object({"{...}"})</code></td><td class="p-3">Grouped fields</td></tr>
							<tr><td class="p-3"><code class="text-sm">z.array(...)</code></td><td class="p-3">List with add/remove</td></tr>
							<tr><td class="p-3"><code class="text-sm">z.discriminatedUnion(...)</code></td><td class="p-3">Variant switcher</td></tr>
							<tr><td class="p-3"><code class="text-sm">z.string().datetime()</code></td><td class="p-3">Date/time picker</td></tr>
							<tr><td class="p-3"><code class="text-sm">.catchall() / z.record()</code></td><td class="p-3">Dynamic key/value pairs</td></tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>

		<section class="space-y-6">
			<h2 class="text-3xl font-bold">FAQ</h2>
			<div class="space-y-4">
				{#each faqEntries as entry}
					<div class="rounded-lg border p-4">
						<h3 class="text-lg font-semibold">{entry.question}</h3>
						<p class="mt-2 text-muted-foreground">{entry.answer}</p>
					</div>
				{/each}
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t">
		<div class="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted-foreground">
			<span>MIT License</span>
			<a
				href="https://github.com/convex-works/autoform-svelte"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-foreground transition-colors"
			>
				GitHub
			</a>
		</div>
	</footer>
</div>
</AutoformProvider>
