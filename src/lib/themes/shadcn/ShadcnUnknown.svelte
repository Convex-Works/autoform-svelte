<script lang="ts">
  import type { FieldThemeProps } from "../../core/types.js";
  import { resolveFieldLabel } from "../../core/index.js";
  import { getShadcnComponents } from "./context.js";
  import { resolveFieldComponents } from "./field-components.js";

  let { field, value, onchange }: FieldThemeProps = $props();

  const components = getShadcnComponents();
  const fieldComponents = resolveFieldComponents(components);
  const LabelComponent = fieldComponents.label;
  const FieldComponent = fieldComponents.wrapper;
  const DescriptionComponent = fieldComponents.description;
  const labelText = $derived(resolveFieldLabel(field));
</script>

{#if FieldComponent}
  <FieldComponent>
    <LabelComponent>{labelText}</LabelComponent>
    {#if field.description}
      {#if DescriptionComponent}
        <DescriptionComponent>{field.description}</DescriptionComponent>
      {:else}
        <p class="text-sm text-muted-foreground">{field.description}</p>
      {/if}
    {/if}
    <p class="text-sm text-muted-foreground">Field type "{field.type}" is not supported.</p>
  </FieldComponent>
{:else}
  <div class="flex flex-col gap-1.5">
    <LabelComponent>{labelText}</LabelComponent>
    {#if field.description}
      <p class="text-sm text-muted-foreground">{field.description}</p>
    {/if}
    <p class="text-sm text-muted-foreground">Field type "{field.type}" is not supported.</p>
  </div>
{/if}
