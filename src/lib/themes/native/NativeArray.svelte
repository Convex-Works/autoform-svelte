<script lang="ts">
  import type { ArrayThemeProps } from "../../core/types.js";
  import { resolveFieldLabel } from "../../core/index.js";

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

  const labelText = $derived(resolveFieldLabel(field));
</script>

<div class="af-label-row">
  <p class="af-label">{labelText}</p>
  <button type="button" class="af-btn af-btn-secondary" onclick={onAdd}>+ Item</button>
</div>
{#if field.description}<p class="af-help">{field.description}</p>{/if}
{#if !items}
  <p class="af-help">Array item schema is not supported.</p>
{:else}
  {#each Array(count) as _, i (i)}
    <div class="af-nested">
      <div class="af-move-row">
        <span class="af-help">Item {i + 1}</span>
        <button type="button" class="af-btn af-btn-danger" onclick={() => onRemove(i)}>Remove</button>
      </div>
      {@render renderField(items, [i], { showLabel: false })}
    </div>
  {/each}
{/if}

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
