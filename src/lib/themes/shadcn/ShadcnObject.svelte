<script lang="ts">
  import type { ObjectThemeProps, ParsedField } from "../../core/types.js";
  import { resolveFieldLabel } from "../../core/index.js";
  import { safeParseJson } from "../../core/values.js";
  import { getShadcnComponents } from "./context.js";
  import { resolveFieldComponents } from "./field-components.js";

  let {
    field,
    value,
    onchange,
    resolved,
    orderedKeys,
    childLookup,
    renderField,
    onAddProperty,
    onRemoveProperty,
    onMoveKey,
    discriminator,
  }: ObjectThemeProps = $props();

  const components = getShadcnComponents();
  const { Button, Select, Textarea } = components;
  const fieldComponents = resolveFieldComponents(components);
  const LabelComponent = fieldComponents.label;
  const FieldComponent = fieldComponents.wrapper;
  const DescriptionComponent = fieldComponents.description;
  const labelText = $derived(resolveFieldLabel(field));
  const objectValue = $derived(
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, any>)
      : {},
  );
</script>

{#if FieldComponent}
  <FieldComponent>
    <div class="flex items-center justify-between gap-2">
      <LabelComponent>{labelText}</LabelComponent>
      {#if onAddProperty}
        <Button type="button" variant="outline" size="sm" onclick={onAddProperty}>+ Property</Button>
      {/if}
    </div>
    {#if field.description}
      {#if DescriptionComponent}
        <DescriptionComponent>{field.description}</DescriptionComponent>
      {:else}
        <p class="text-sm text-muted-foreground">{field.description}</p>
      {/if}
    {/if}

    {#if discriminator}
      <div class="rounded-md border border-border/70 p-3">
        <div class="flex flex-col gap-1.5">
          <LabelComponent>{discriminator.key}</LabelComponent>
          <Select.Root
            type="single"
            value={discriminator.value}
            onValueChange={(v) => discriminator!.onchange(v)}
          >
            <Select.Trigger class="w-full">
              {discriminator.options.find((o) => o.value === discriminator!.value)?.label ?? discriminator.value}
            </Select.Trigger>
            <Select.Content>
              {#each discriminator.options as option (option.value)}
                <Select.Item value={option.value} label={option.label}>
                  {option.label}
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    {/if}

    <div class="flex flex-col gap-2">
      {#each orderedKeys as keyName, index (keyName)}
        {@const childField = childLookup.get(keyName)}
        {@const isFirst = index === 0}
        {@const isLast = index === orderedKeys.length - 1}
        <div class="rounded-md border border-border/70 p-3">
          {#if (onMoveKey && orderedKeys.length > 1) || !childField}
            <div class="mb-2 flex items-center gap-1.5">
              {#if onMoveKey && orderedKeys.length > 1}
                <Button type="button" variant="outline" size="sm" onclick={() => onMoveKey?.(keyName, -1)} disabled={isFirst}>Up</Button>
                <Button type="button" variant="outline" size="sm" onclick={() => onMoveKey?.(keyName, 1)} disabled={isLast}>Down</Button>
              {/if}
              {#if !childField}
                <Button type="button" variant="destructive" size="sm" onclick={() => onRemoveProperty?.(keyName)}>Remove</Button>
              {/if}
            </div>
          {/if}
          {#if childField}
            {@render renderField(childField, [childField.key])}
          {:else}
            {@const dynamicValue = objectValue[keyName]}
            {@const serializedDynamic = (() => {
              if (typeof dynamicValue === "string") return dynamicValue;
              if (dynamicValue === undefined) return "";
              try {
                return JSON.stringify(dynamicValue, null, 2);
              } catch {
                return String(dynamicValue);
              }
            })()}
            {#if resolved.additionalProperties?.schema}
              {@render renderField(resolved.additionalProperties.schema, [keyName], { showLabel: false })}
            {:else}
              <LabelComponent>{keyName}</LabelComponent>
              <Textarea
                value={serializedDynamic}
                oninput={(e) => onchange({ ...objectValue, [keyName]: safeParseJson((e.currentTarget as HTMLTextAreaElement).value) })}
                rows={3}
              />
            {/if}
          {/if}
        </div>
      {/each}
    </div>
  </FieldComponent>
{:else}
  <div class="flex flex-col gap-2">
    <div class="flex items-center justify-between gap-2">
      <LabelComponent>{labelText}</LabelComponent>
      {#if onAddProperty}
        <Button type="button" variant="outline" size="sm" onclick={onAddProperty}>+ Property</Button>
      {/if}
    </div>
    {#if field.description}
      <p class="text-sm text-muted-foreground">{field.description}</p>
    {/if}

    {#if discriminator}
      <div class="rounded-md border border-border/70 p-3">
        <div class="flex flex-col gap-1.5">
          <LabelComponent>{discriminator.key}</LabelComponent>
          <Select.Root
            type="single"
            value={discriminator.value}
            onValueChange={(v) => discriminator!.onchange(v)}
          >
            <Select.Trigger class="w-full">
              {discriminator.options.find((o) => o.value === discriminator!.value)?.label ?? discriminator.value}
            </Select.Trigger>
            <Select.Content>
              {#each discriminator.options as option (option.value)}
                <Select.Item value={option.value} label={option.label}>
                  {option.label}
                </Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    {/if}

    <div class="flex flex-col gap-2">
      {#each orderedKeys as keyName, index (keyName)}
        {@const childField = childLookup.get(keyName)}
        {@const isFirst = index === 0}
        {@const isLast = index === orderedKeys.length - 1}
        <div class="rounded-md border border-border/70 p-3">
          {#if (onMoveKey && orderedKeys.length > 1) || !childField}
            <div class="mb-2 flex items-center gap-1.5">
              {#if onMoveKey && orderedKeys.length > 1}
                <Button type="button" variant="outline" size="sm" onclick={() => onMoveKey?.(keyName, -1)} disabled={isFirst}>Up</Button>
                <Button type="button" variant="outline" size="sm" onclick={() => onMoveKey?.(keyName, 1)} disabled={isLast}>Down</Button>
              {/if}
              {#if !childField}
                <Button type="button" variant="destructive" size="sm" onclick={() => onRemoveProperty?.(keyName)}>Remove</Button>
              {/if}
            </div>
          {/if}
          {#if childField}
            {@render renderField(childField, [childField.key])}
          {:else}
            {@const dynamicValue = objectValue[keyName]}
            {@const serializedDynamic = (() => {
              if (typeof dynamicValue === "string") return dynamicValue;
              if (dynamicValue === undefined) return "";
              try {
                return JSON.stringify(dynamicValue, null, 2);
              } catch {
                return String(dynamicValue);
              }
            })()}
            {#if resolved.additionalProperties?.schema}
              {@render renderField(resolved.additionalProperties.schema, [keyName], { showLabel: false })}
            {:else}
              <LabelComponent>{keyName}</LabelComponent>
              <Textarea
                value={serializedDynamic}
                oninput={(e) => onchange({ ...objectValue, [keyName]: safeParseJson((e.currentTarget as HTMLTextAreaElement).value) })}
                rows={3}
              />
            {/if}
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}
