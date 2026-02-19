<script lang="ts">
  import type { FormThemeProps } from "../../core/types.js";

  let {
    title,
    errors,
    submitLabel,
    cancelLabel,
    onsubmit,
    oncancel,
    children,
  }: FormThemeProps = $props();
</script>

<form
  class="af-form"
  onsubmit={(e) => {
    e.preventDefault();
    onsubmit();
  }}
>
  {#if title}
    <h3 class="af-title">{title}</h3>
  {/if}
  {@render children()}
  {#if errors.length}
    <div class="af-errors">
      {#each errors as err, i (`${i}-${err}`)}
        <p>{err}</p>
      {/each}
    </div>
  {/if}
  <div class="af-actions">
    <button type="button" class="af-btn af-btn-secondary" onclick={oncancel}>
      {cancelLabel}
    </button>
    <button type="submit" class="af-btn af-btn-primary">{submitLabel}</button>
  </div>
</form>

<style>
  .af-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .af-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  .af-errors {
    border: 1px solid #ef4444;
    border-radius: 0.375rem;
    padding: 0.625rem;
    font-size: 0.75rem;
    color: #dc2626;
  }
  .af-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
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
  .af-btn-primary {
    background: #2563eb;
    color: white;
  }
  .af-btn-secondary {
    border-color: color-mix(in oklab, currentColor 22%, transparent);
    background: transparent;
    color: inherit;
  }
</style>
