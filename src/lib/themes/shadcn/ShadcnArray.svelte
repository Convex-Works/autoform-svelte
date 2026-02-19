<script lang="ts">
  import type { ArrayThemeProps } from "../../core/types.js";
  import { resolveFieldLabel } from "../../core/index.js";
  import { getShadcnComponents } from "./context.js";
  import { resolveFieldComponents } from "./field-components.js";

  let {
    field,
    value,
    onchange,
    items,
    count,
    renderField,
    onAdd,
    onRemove,
  }: ArrayThemeProps = $props();

  const components = getShadcnComponents();
  const { Button } = components;
  const fieldComponents = resolveFieldComponents(components);
  const LabelComponent = fieldComponents.label;
  const FieldComponent = fieldComponents.wrapper;
  const DescriptionComponent = fieldComponents.description;
  const labelText = $derived(resolveFieldLabel(field));
</script>

{#if FieldComponent}
  <FieldComponent>
    <div class="flex items-center justify-between gap-2">
      <LabelComponent>{labelText}</LabelComponent>
      <Button type="button" variant="outline" size="sm" onclick={onAdd}>+ Item</Button>
    </div>
    {#if field.description}
      {#if DescriptionComponent}
        <DescriptionComponent>{field.description}</DescriptionComponent>
      {:else}
        <p class="text-sm text-muted-foreground">{field.description}</p>
      {/if}
    {/if}
    {#if !items}
      <p class="text-sm text-muted-foreground">Array item schema is not supported.</p>
    {:else}
      <div class="flex flex-col gap-2">
        {#each Array(count) as _, i (i)}
          <div class="rounded-md border border-border/70 p-3">
            <div class="mb-2 flex items-center gap-2">
              <span class="text-sm text-muted-foreground">Item {i + 1}</span>
              <Button type="button" variant="destructive" size="sm" onclick={() => onRemove(i)}>Remove</Button>
            </div>
            {@render renderField(items, [i], { showLabel: false })}
          </div>
        {/each}
      </div>
    {/if}
  </FieldComponent>
{:else}
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-2">
      <LabelComponent>{labelText}</LabelComponent>
      <Button type="button" variant="outline" size="sm" onclick={onAdd}>+ Item</Button>
    </div>
    {#if field.description}
      <p class="text-sm text-muted-foreground">{field.description}</p>
    {/if}
    {#if !items}
      <p class="text-sm text-muted-foreground">Array item schema is not supported.</p>
    {:else}
      <div class="flex flex-col gap-2">
        {#each Array(count) as _, i (i)}
          <div class="rounded-md border border-border/70 p-3">
            <div class="mb-2 flex items-center gap-2">
              <span class="text-sm text-muted-foreground">Item {i + 1}</span>
              <Button type="button" variant="destructive" size="sm" onclick={() => onRemove(i)}>Remove</Button>
            </div>
            {@render renderField(items, [i], { showLabel: false })}
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}
