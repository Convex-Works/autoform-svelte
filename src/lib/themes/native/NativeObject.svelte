<script lang="ts">
  import type { ObjectThemeProps, ParsedField } from "../../core/types.js";
  import { resolveFieldLabel } from "../../core/index.js";
  import { safeParseJson } from "../../core/values.js";

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

  const labelText = $derived(resolveFieldLabel(field));
  const objectValue = $derived(
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, any>)
      : {},
  );
</script>

<div class="af-label-row">
  <p class="af-label">{labelText}</p>
  {#if onAddProperty}
    <button type="button" class="af-btn af-btn-secondary" onclick={onAddProperty}>+ Property</button>
  {/if}
</div>
{#if field.description}<p class="af-help">{field.description}</p>{/if}

{#if discriminator}
  <p class="af-help">{discriminator.key}</p>
  <select
    class="af-input"
    value={discriminator.value}
    oninput={(e) => discriminator!.onchange((e.currentTarget as HTMLSelectElement).value)}
  >
    {#each discriminator.options as option (option.value)}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
{/if}

{#each orderedKeys as keyName, index (keyName)}
  {@const childField = childLookup.get(keyName)}
  {@const isFirst = index === 0}
  {@const isLast = index === orderedKeys.length - 1}
  <div class="af-nested">
    {#if (onMoveKey && orderedKeys.length > 1) || !childField}
      <div class="af-move-row">
        {#if onMoveKey && orderedKeys.length > 1}
          <button type="button" class="af-btn af-btn-secondary" onclick={() => onMoveKey?.(keyName, -1)} disabled={isFirst}>Up</button>
          <button type="button" class="af-btn af-btn-secondary" onclick={() => onMoveKey?.(keyName, 1)} disabled={isLast}>Down</button>
        {/if}
        {#if !childField}
          <button type="button" class="af-btn af-btn-danger" onclick={() => onRemoveProperty?.(keyName)}>Remove</button>
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
        <p class="af-label">{keyName}</p>
        <textarea
          class="af-input"
          value={serializedDynamic}
          oninput={(e) => onchange({ ...objectValue, [keyName]: safeParseJson((e.currentTarget as HTMLTextAreaElement).value) })}
          rows={3}
        ></textarea>
      {/if}
    {/if}
  </div>
{/each}

<style>
  .af-label {
    font-size: 0.875rem;
    font-weight: 500;
  }
  .af-label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .af-help {
    margin: 0;
    font-size: 0.75rem;
    color: color-mix(in oklab, currentColor 60%, transparent);
  }
  .af-input {
    width: 100%;
    border: 1px solid color-mix(in oklab, currentColor 22%, transparent);
    border-radius: 0.375rem;
    padding: 0.5rem 0.625rem;
    background: transparent;
    box-sizing: border-box;
  }
  .af-nested {
    border-left: 2px solid color-mix(in oklab, currentColor 18%, transparent);
    padding-left: 0.75rem;
    margin: 0.5rem 0;
  }
  .af-move-row {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 0.375rem;
  }
  .af-btn {
    border-radius: 0.375rem;
    border: 1px solid transparent;
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .af-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .af-btn-secondary {
    border-color: color-mix(in oklab, currentColor 22%, transparent);
    background: transparent;
    color: inherit;
  }
  .af-btn-danger {
    border-color: #dc2626;
    color: #dc2626;
    background: transparent;
  }
</style>
