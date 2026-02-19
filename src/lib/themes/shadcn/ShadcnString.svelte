<script lang="ts">
  import type { FieldThemeProps } from "../../core/types.js";
  import { resolveFieldLabel, resolvePlaceholder, resolveStringWidget } from "../../core/index.js";
  import { getShadcnComponents } from "./context.js";
  import { resolveFieldComponents } from "./field-components.js";

  let { field, value, onchange }: FieldThemeProps = $props();

  const components = getShadcnComponents();
  const { Input, Textarea } = components;
  const fieldComponents = resolveFieldComponents(components);
  const LabelComponent = fieldComponents.label;
  const FieldComponent = fieldComponents.wrapper;
  const DescriptionComponent = fieldComponents.description;
  const labelText = $derived(resolveFieldLabel(field));
  const id = $derived(`af-${field.key}`);
  const widget = $derived(resolveStringWidget(field));
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
    {#if widget === "textarea"}
      <Textarea
        {id}
        value={(value ?? "") as string}
        placeholder={placeholder}
        oninput={(e) => onchange((e.currentTarget as HTMLTextAreaElement).value)}
        rows={3}
      />
    {:else}
      <Input
        {id}
        type="text"
        value={(value ?? "") as string}
        placeholder={placeholder}
        oninput={(e) => onchange((e.currentTarget as HTMLInputElement).value)}
      />
    {/if}
  </FieldComponent>
{:else}
  <div class="flex flex-col gap-1.5">
    <LabelComponent for={id}>{labelText}</LabelComponent>
    {#if field.description}
      <p class="text-sm text-muted-foreground">{field.description}</p>
    {/if}
    {#if widget === "textarea"}
      <Textarea
        {id}
        value={(value ?? "") as string}
        placeholder={placeholder}
        oninput={(e) => onchange((e.currentTarget as HTMLTextAreaElement).value)}
        rows={3}
      />
    {:else}
      <Input
        {id}
        type="text"
        value={(value ?? "") as string}
        placeholder={placeholder}
        oninput={(e) => onchange((e.currentTarget as HTMLInputElement).value)}
      />
    {/if}
  </div>
{/if}
