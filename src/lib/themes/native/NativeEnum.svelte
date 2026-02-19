<script lang="ts">
  import type { EnumThemeProps } from "../../core/types.js";
  import { resolveFieldLabel, resolvePlaceholder } from "../../core/index.js";

  let { field, value, onchange, options, selectedKey }: EnumThemeProps = $props();

  const labelText = $derived(resolveFieldLabel(field));
  const placeholder = $derived(resolvePlaceholder(field) ?? "Select an option");
</script>

<p class="af-label">{labelText}</p>
{#if field.description}<p class="af-help">{field.description}</p>{/if}
<select
  class="af-input"
  value={selectedKey}
  oninput={(e) => {
    const key = (e.currentTarget as HTMLSelectElement).value;
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
  {#if selectedKey === ""}
    <option value="" disabled>{placeholder}</option>
  {/if}
  {#each options as option (option.key)}
    <option value={option.key}>{option.label}</option>
  {/each}
</select>

<style>
  .af-label {
    font-size: 0.875rem;
    font-weight: 500;
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
</style>
