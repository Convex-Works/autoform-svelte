# autoform-svelte

Schema-first generated forms for Svelte 5 with adapter-based schema support.

## Install

```bash
bun install autoform-svelte
```

If you use Zod schemas:

```bash
bun install zod
```

## Usage

```svelte
<script lang="ts">
  import { Autoform } from "autoform-svelte";
  import { zodAdapter } from "autoform-svelte/adapters/zod";
  import { z } from "zod";

  const schema = z.object({
    query: z.string().min(1),
    enabled: z.boolean().default(true),
  });

  let data = $state({
    query: "",
    enabled: true,
  });
</script>

<Autoform
  {schema}
  adapter={zodAdapter}
  bind:data
  onsubmit={(e) => console.log("submit", e.detail.data)}
  oncancel={() => console.log("cancel")}
/>
```

## Adapters

- `zodAdapter` from `autoform-svelte/adapters/zod`
- `jsonSchemaAdapter` (default) from `autoform-svelte`
- `createCustomAdapter()` for custom libraries

```ts
import { createCustomAdapter } from "autoform-svelte";

const myAdapter = createCustomAdapter((schema) => schema.toJSON());
```

## Field metadata

Use schema metadata to customize form rendering:

```ts
z.string().meta({
  form: {
    label: "Message",
    widget: "textarea",
    placeholder: "Write your message",
  },
});

z.object({
  title: z.string(),
  details: z.string(),
}).meta({
  form: {
    reorderable: true,
  },
});
```

Supported keys:

- `form.widget`: `"input" | "textarea"` (string fields only, default is `"input"`)
- `form.label`: field label override
- `form.placeholder`: placeholder text for supported controls (input/textarea/select/date/number)
- `form.reorderable`: enable object key reordering controls (default is disabled)

## Component API

- `schema`: `unknown` (required)
- `adapter?`: `SchemaAdapter` (default: `jsonSchemaAdapter`)
- `data`: `Record<string, any>` (bindable)
- `title?`: `string`
- `submitLabel?`: `string` (default: `"Save"`)
- `cancelLabel?`: `string` (default: `"Cancel"`)

## Events

- `submit`: `{ data: Record<string, any> }`
- `cancel`
- `error`: `{ errors: string[] }`
