<script lang="ts">
  import type { FieldThemeProps } from "../../core/types.js";
  import { resolveFieldLabel } from "../../core/index.js";
  import { getShadcnComponents } from "./context.js";
  import { resolveFieldComponents } from "./field-components.js";

  let { field, value, onchange }: FieldThemeProps = $props();

  const components = getShadcnComponents();
  const { Checkbox } = components;
  const fieldComponents = resolveFieldComponents(components);
  const LabelComponent = fieldComponents.label;
  const FieldComponent = fieldComponents.wrapper;
  const DescriptionComponent = fieldComponents.description;
  const ContentComponent = fieldComponents.content;
  const labelText = $derived(resolveFieldLabel(field));
  const id = $derived(`af-${field.key}`);
</script>

{#if FieldComponent}
  <FieldComponent orientation="horizontal">
    <Checkbox
      {id}
      checked={!!value}
      onCheckedChange={(checked) => onchange(checked)}
    />
    {#if DescriptionComponent && ContentComponent}
      <ContentComponent class="space-y-1">
        <LabelComponent for={id}>{labelText}</LabelComponent>
        {#if field.description}
          <DescriptionComponent>{field.description}</DescriptionComponent>
        {/if}
      </ContentComponent>
    {:else}
      <div class="flex flex-col gap-1">
        <LabelComponent for={id}>{labelText}</LabelComponent>
        {#if field.description}
          <p class="text-sm text-muted-foreground">{field.description}</p>
        {/if}
      </div>
    {/if}
  </FieldComponent>
{:else}
  <div class="flex flex-col gap-1.5">
    <div class="flex items-center gap-2">
      <Checkbox
        {id}
        checked={!!value}
        onCheckedChange={(checked) => onchange(checked)}
      />
      <LabelComponent for={id}>{labelText}</LabelComponent>
    </div>
    {#if field.description}
      <p class="text-sm text-muted-foreground">{field.description}</p>
    {/if}
  </div>
{/if}
