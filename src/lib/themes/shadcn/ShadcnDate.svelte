<script lang="ts">
  import type { FieldThemeProps } from "../../core/types.js";
  import { resolveFieldLabel, resolvePlaceholder } from "../../core/index.js";
  import { toDatetimeLocal } from "../../core/values.js";
  import { getShadcnComponents } from "./context.js";
  import { resolveFieldComponents } from "./field-components.js";

  let { field, value, onchange }: FieldThemeProps = $props();

  const components = getShadcnComponents();
  const { Input } = components;
  const fieldComponents = resolveFieldComponents(components);
  const LabelComponent = fieldComponents.label;
  const FieldComponent = fieldComponents.wrapper;
  const DescriptionComponent = fieldComponents.description;
  const labelText = $derived(resolveFieldLabel(field));
  const id = $derived(`af-${field.key}`);
  const placeholder = $derived(resolvePlaceholder(field));
</script>

{#if FieldComponent}
  <FieldComponent>
    <LabelComponent for={id}>{labelText}</LabelComponent>
    {#if field.description}
      {#if DescriptionComponent}
        <DescriptionComponent>{field.description}</DescriptionComponent>
      {:else}
        <p class="text-sm text-muted-foreground">{field.description}</p>
      {/if}
    {/if}
    <Input
      {id}
      type="datetime-local"
      value={toDatetimeLocal(value)}
      {placeholder}
      oninput={(e) => onchange(new Date((e.currentTarget as HTMLInputElement).value))}
    />
  </FieldComponent>
{:else}
  <div class="flex flex-col gap-1.5">
    <LabelComponent for={id}>{labelText}</LabelComponent>
    {#if field.description}
      <p class="text-sm text-muted-foreground">{field.description}</p>
    {/if}
    <Input
      {id}
      type="datetime-local"
      value={toDatetimeLocal(value)}
      {placeholder}
      oninput={(e) => onchange(new Date((e.currentTarget as HTMLInputElement).value))}
    />
  </div>
{/if}
