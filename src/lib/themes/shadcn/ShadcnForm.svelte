<script lang="ts">
  import type { FormThemeProps } from "../../core/types.js";
  import { getBoundComponents, setShadcnComponents } from "./context.js";
  import { resolveFieldComponents } from "./field-components.js";

  let {
    title,
    errors,
    submitLabel,
    cancelLabel,
    onsubmit,
    oncancel,
    children,
  }: FormThemeProps = $props();

  const components = getBoundComponents();
  setShadcnComponents(components);

  const Card = components.Card;
  const Button = components.Button;
  const fieldComponents = resolveFieldComponents(components);
  const GroupComponent = fieldComponents.group;
</script>

<Card.Root>
  {#if title}
    <Card.Header>
      <Card.Title>{title}</Card.Title>
    </Card.Header>
  {/if}
  <Card.Content>
    <form
      class="flex flex-col gap-4"
      onsubmit={(e) => {
        e.preventDefault();
        onsubmit();
      }}
    >
      {#if GroupComponent}
        <GroupComponent class="gap-4">
          {@render children()}
        </GroupComponent>
      {:else}
        {@render children()}
      {/if}
      {#if errors.length}
        <div class="rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
          {#each errors as err, i (`${i}-${err}`)}
            <p>{err}</p>
          {/each}
        </div>
      {/if}
      <div class="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onclick={oncancel}>
          {cancelLabel}
        </Button>
        <Button type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>
