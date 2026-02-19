<script lang="ts">
  import type { FieldThemeProps } from "../../core/types.js";
  import { resolveFieldLabel } from "../../core/index.js";

  let { field, value, onchange }: FieldThemeProps = $props();

  const labelText = $derived(resolveFieldLabel(field));
</script>

<label class="af-checkbox-row">
  <input
    type="checkbox"
    checked={!!value}
    oninput={(e) => onchange((e.currentTarget as HTMLInputElement).checked)}
  />
  <span>{labelText}</span>
</label>
{#if field.description}<p class="af-help">{field.description}</p>{/if}

<style>
  .af-checkbox-row {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }
  .af-help {
    margin: 0;
    font-size: 0.75rem;
    color: color-mix(in oklab, currentColor 60%, transparent);
  }
</style>
