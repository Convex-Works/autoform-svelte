<script lang="ts">
  import type { EnumThemeProps } from "../../core/types.js";
  import { resolveFieldLabel, resolvePlaceholder } from "../../core/index.js";
  import { getShadcnComponents } from "./context.js";
  import { resolveFieldComponents } from "./field-components.js";

  let { field, value, onchange, options, selectedKey }: EnumThemeProps = $props();

  const components = getShadcnComponents();
  const { Select } = components;
  const fieldComponents = resolveFieldComponents(components);
  const LabelComponent = fieldComponents.label;
  const FieldComponent = fieldComponents.wrapper;
  const DescriptionComponent = fieldComponents.description;
  const labelText = $derived(resolveFieldLabel(field));
  const placeholder = $derived(resolvePlaceholder(field) ?? "Select an option");
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
    <Select.Root
      type="single"
      value={selectedKey}
      onValueChange={(key) => {
        if (!key) return;
        const option = options.find((opt) => opt.key === key);
        if (!option) return;
        const nextValue =
          option.value !== null && typeof option.value === "object"
            ? structuredClone(option.value)
            : option.value;
        onchange(nextValue);
      }}
    >
      <Select.Trigger class="w-full">
        {#if selectedKey}
          {options.find((opt) => opt.key === selectedKey)?.label ?? placeholder}
        {:else}
          {placeholder}
        {/if}
      </Select.Trigger>
      <Select.Content>
        {#each options as option (option.key)}
          <Select.Item value={option.key} label={option.label}>
            {option.label}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </FieldComponent>
{:else}
  <div class="flex flex-col gap-1.5">
    <LabelComponent>{labelText}</LabelComponent>
    {#if field.description}
      <p class="text-sm text-muted-foreground">{field.description}</p>
    {/if}
    <Select.Root
      type="single"
      value={selectedKey}
      onValueChange={(key) => {
        if (!key) return;
        const option = options.find((opt) => opt.key === key);
        if (!option) return;
        const nextValue =
          option.value !== null && typeof option.value === "object"
            ? structuredClone(option.value)
            : option.value;
        onchange(nextValue);
      }}
    >
      <Select.Trigger class="w-full">
        {#if selectedKey}
          {options.find((opt) => opt.key === selectedKey)?.label ?? placeholder}
        {:else}
          {placeholder}
        {/if}
      </Select.Trigger>
      <Select.Content>
        {#each options as option (option.key)}
          <Select.Item value={option.key} label={option.label}>
            {option.label}
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
{/if}
