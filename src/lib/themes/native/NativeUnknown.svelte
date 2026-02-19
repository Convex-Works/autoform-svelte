<script lang="ts">
  import type { FieldThemeProps } from "../../core/types.js";
  import { resolveFieldLabel } from "../../core/index.js";

  let { field, value, onchange }: FieldThemeProps = $props();

  const labelText = $derived(resolveFieldLabel(field));
</script>

<p class="af-label">{labelText}</p>
{#if field.description}<p class="af-help">{field.description}</p>{/if}
<p class="af-help">Field type "{field.type}" is not supported.</p>

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
</style>
