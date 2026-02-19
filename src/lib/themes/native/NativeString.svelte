<script lang="ts">
  import type { FieldThemeProps } from "../../core/types.js";
  import { resolveFieldLabel, resolvePlaceholder, resolveStringWidget } from "../../core/index.js";

  let { field, value, onchange }: FieldThemeProps = $props();

  const labelText = $derived(resolveFieldLabel(field));
  const widget = $derived(resolveStringWidget(field));
  const placeholder = $derived(resolvePlaceholder(field));
</script>

<p class="af-label">{labelText}</p>
{#if field.description}<p class="af-help">{field.description}</p>{/if}
{#if widget === "textarea"}
  <textarea
    class="af-input"
    value={(value ?? "") as string}
    placeholder={placeholder}
    oninput={(e) => onchange((e.currentTarget as HTMLTextAreaElement).value)}
    rows={3}
  ></textarea>
{:else}
  <input
    class="af-input"
    type="text"
    value={(value ?? "") as string}
    placeholder={placeholder}
    oninput={(e) => onchange((e.currentTarget as HTMLInputElement).value)}
  />
{/if}

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
