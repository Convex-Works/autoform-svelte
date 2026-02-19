<script lang="ts">
  import { createEventDispatcher, getContext } from "svelte";
  import {
    arrayPush,
    arrayRemove,
    assignSafeObject,
    defaultForParsed,
    enumValueKey,
    getNestedValue,
    isObjectReorderable,
    parseJsonSchema,
    resolveObjectSchema,
    validateJson,
    type JSONSchema,
    type ParsedAdditionalProperties,
    type ParsedField,
    type AutoformTheme,
  } from "./lib/core/index.js";
  import { nativeTheme } from "./lib/themes/native/index.js";
  import { jsonSchemaAdapter, type SchemaAdapter } from "./lib/adapters/index.js";

  type SubmitDetail = { data: Record<string, any> };
  type ErrorDetail = { errors: string[] };

  const dispatch = createEventDispatcher<{
    submit: SubmitDetail;
    cancel: undefined;
    error: ErrorDetail;
  }>();

  let {
    schema,
    data = $bindable<Record<string, any>>({}),
    title,
    submitLabel = "Save",
    cancelLabel = "Cancel",
    theme,
    adapter,
  }: {
    schema: unknown;
    data?: Record<string, any>;
    title?: string;
    submitLabel?: string;
    cancelLabel?: string;
    theme?: AutoformTheme;
    adapter?: SchemaAdapter;
  } = $props();

  const contextThemeGetter = getContext<(() => AutoformTheme | undefined) | undefined>("autoform-theme");
  const contextAdapterGetter = getContext<(() => SchemaAdapter | undefined) | undefined>("autoform-adapter");
  const resolvedTheme = $derived(theme ?? contextThemeGetter?.() ?? nativeTheme);
  const resolvedAdapter = $derived(adapter ?? contextAdapterGetter?.() ?? jsonSchemaAdapter);

  function emptyObjectSchema(): JSONSchema {
    return { type: "object", properties: {} };
  }

  function toJsonSchemaSafe(resolved: SchemaAdapter, input: unknown): JSONSchema {
    try {
      const converted = resolved.toJSONSchema(input as any);
      if (!converted || typeof converted !== "object" || Array.isArray(converted)) {
        return emptyObjectSchema();
      }
      return converted;
    } catch {
      return emptyObjectSchema();
    }
  }

  const jsonSchema = $derived(toJsonSchemaSafe(resolvedAdapter, schema));
  const fields = $derived(parseJsonSchema(jsonSchema).fields);

  let values: Record<string, any> = $state(structuredClone($state.snapshot(data) || {}));
  let committedValues: Record<string, any> = $state(structuredClone($state.snapshot(data) || {}));
  let errors = $state<string[]>([]);
  let objectKeyOrders = $state(new Map<string, string[]>());
  const pendingOrderUpdates = new Map<string, string[]>();
  let syncingFromData = false;
  let syncingToData = false;

  function hasOwnKey(object: Record<string, any>, key: string) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  function hydrateFieldDefaults(target: Record<string, any>, field: ParsedField): boolean {
    if (!target || typeof target !== "object" || Array.isArray(target)) return false;

    const hasKey = hasOwnKey(target, field.key);
    const current = hasKey ? target[field.key] : undefined;
    if (!hasKey || current === undefined) {
      target[field.key] = defaultForParsed(field);
      return true;
    }

    if (field.type !== "object") return false;
    if (!current || typeof current !== "object" || Array.isArray(current)) return false;

    const currentObject = current as Record<string, any>;
    let changed = false;

    if (field.discriminatedUnion) {
      const schemaInfo = resolveObjectSchema(field, currentObject);
      const discriminatorKey = schemaInfo.discriminatorKey;
      if (
        discriminatorKey &&
        currentObject[discriminatorKey] === undefined &&
        schemaInfo.activeOption
      ) {
        currentObject[discriminatorKey] = schemaInfo.activeOption.value;
        changed = true;
      }

      for (const child of schemaInfo.children) {
        changed = hydrateFieldDefaults(currentObject, child) || changed;
      }
      return changed;
    }

    for (const child of field.children ?? []) {
      changed = hydrateFieldDefaults(currentObject, child) || changed;
    }
    return changed;
  }

  function hydrateDefaultsIntoValues(
    target: Record<string, any>,
    parsedFields: ParsedField[],
  ): boolean {
    let changed = false;
    for (const field of parsedFields) {
      changed = hydrateFieldDefaults(target, field) || changed;
    }
    return changed;
  }

  function publishValuesToData() {
    const snapshot = structuredClone($state.snapshot(values) || {});
    syncingToData = true;
    data = snapshot;
    return snapshot;
  }

  $effect(() => {
    const nextData = structuredClone($state.snapshot(data) || {});
    hydrateDefaultsIntoValues(nextData, fields);
    if (syncingToData) {
      syncingToData = false;
      return;
    }
    syncingFromData = true;
    values = nextData;
    committedValues = structuredClone(nextData);
    objectKeyOrders = new Map();
    errors = [];
    queueMicrotask(() => {
      syncingFromData = false;
    });
  });

  $effect(() => {
    if (syncingFromData) return;
    publishValuesToData();
  });

  $effect(() => {
    hydrateDefaultsIntoValues(values, fields);
    hydrateDefaultsIntoValues(committedValues, fields);
  });

  function setValueAtPath(path: (string | number)[], value: unknown) {
    assignSafeObject(values, path, value);
    applyStoredOrder(path.slice(0, -1));
  }

  function pathToOrderKey(path: (string | number)[]) {
    if (!path.length) return "__root__";
    return path
      .map((segment) => (typeof segment === "number" ? `[${segment}]` : segment))
      .join(".");
  }

  function setObjectOrder(path: (string | number)[], order: string[]) {
    const key = pathToOrderKey(path);
    const prev = objectKeyOrders.get(key);
    if (
      prev &&
      prev.length === order.length &&
      prev.every((value, index) => value === order[index])
    ) {
      return;
    }

    const next = new Map(objectKeyOrders);
    next.set(key, order);
    objectKeyOrders = next;
    pendingOrderUpdates.delete(key);
  }

  function queueSetObjectOrder(path: (string | number)[], order: string[]) {
    const key = pathToOrderKey(path);
    const pending = pendingOrderUpdates.get(key);
    if (
      pending &&
      pending.length === order.length &&
      pending.every((value, index) => value === order[index])
    ) {
      return;
    }

    pendingOrderUpdates.set(key, order);
    queueMicrotask(() => {
      const queued = pendingOrderUpdates.get(key);
      if (!queued) return;
      pendingOrderUpdates.delete(key);
      setObjectOrder(path, queued);
    });
  }

  function getObjectOrder(
    path: (string | number)[],
    field: ParsedField,
    value: Record<string, any> | null | undefined,
    schemaChildren: ParsedField[],
    excludeKeys: string[] = [],
  ): string[] {
    const key = pathToOrderKey(path);
    const schemaKeys = schemaChildren.map((child) => child.key);
    const exclude = new Set<string>(excludeKeys);
    const dynamicKeys =
      value && typeof value === "object" && !Array.isArray(value)
        ? Object.keys(value).filter((k) => !schemaKeys.includes(k) && !exclude.has(k))
        : [];
    const desired = [...schemaKeys, ...dynamicKeys];
    const existing = objectKeyOrders.get(key);
    if (!existing) {
      queueSetObjectOrder(path, desired);
      return desired;
    }

    const filtered = existing.filter((k) => desired.includes(k));
    for (const k of desired) {
      if (!filtered.includes(k)) filtered.push(k);
    }
    if (
      filtered.length !== existing.length ||
      filtered.some((value, index) => value !== existing[index])
    ) {
      queueSetObjectOrder(path, filtered);
      return filtered;
    }
    return existing;
  }

  function reorderObjectValue(path: (string | number)[], order: string[]) {
    if (!order.length) return;
    const target = getNestedValue<Record<string, any>>(values, ...path);
    if (!target || typeof target !== "object" || Array.isArray(target)) return;
    const next: Record<string, any> = {};
    for (const key of order) {
      if (key in target) next[key] = target[key];
    }
    for (const key of Object.keys(target)) {
      if (!order.includes(key)) next[key] = target[key];
    }
    assignSafeObject(values, path, next);
  }

  function moveObjectKey(
    path: (string | number)[],
    field: ParsedField,
    key: string,
    delta: number,
  ) {
    const currentValue = getNestedValue<Record<string, any>>(values, ...path);
    const schemaInfo = resolveObjectSchema(field, currentValue);
    const order = getObjectOrder(
      path,
      field,
      currentValue,
      schemaInfo.children,
      schemaInfo.discriminatorKey ? [schemaInfo.discriminatorKey] : [],
    );
    const index = order.indexOf(key);
    if (index === -1) return;
    const targetIndex = index + delta;
    if (targetIndex < 0 || targetIndex >= order.length) return;
    const next = order.slice();
    next.splice(index, 1);
    next.splice(targetIndex, 0, key);
    setObjectOrder(path, next);
    reorderObjectValue(path, next);
  }

  function applyStoredOrder(path: (string | number)[]) {
    if (!path.length) return;
    const order = objectKeyOrders.get(pathToOrderKey(path));
    if (!order) return;
    reorderObjectValue(path, order);
  }

  function setDiscriminatedUnionVariant(
    path: (string | number)[],
    field: ParsedField,
    variantValue: string,
  ) {
    const union = field.discriminatedUnion;
    if (!union) return;
    const option = union.options.find((opt) => opt.value === variantValue);
    if (!option) return;

    ensureObjectValue(path);
    const existing = getNestedValue<Record<string, any>>(values, ...path);
    const discriminatorKey = union.discriminatorKey;
    const next: Record<string, any> = {};
    next[discriminatorKey] = option.value;

    const childKeys = new Set<string>();
    for (const child of option.field.children ?? []) {
      childKeys.add(child.key);
      if (child.key === discriminatorKey) continue;
      const existingVal =
        existing && Object.prototype.hasOwnProperty.call(existing, child.key)
          ? (existing as any)[child.key]
          : undefined;
      next[child.key] = existingVal === undefined ? defaultForParsed(child) : existingVal;
    }

    if (existing && typeof existing === "object" && !Array.isArray(existing)) {
      for (const [key, value] of Object.entries(existing)) {
        if (key === discriminatorKey) continue;
        if (!childKeys.has(key)) next[key] = value;
      }
    }

    assignSafeObject(values, path, next);
    const desiredOrder = (option.field.children ?? [])
      .map((child) => child.key)
      .filter((key) => key !== discriminatorKey);
    setObjectOrder(path, desiredOrder);
    applyStoredOrder(path);
  }

  function handleArrayAdd(path: (string | number)[], field: ParsedField) {
    arrayPush(values, path, field);
  }

  function ensureObjectValue(path: (string | number)[]) {
    const existing = getNestedValue<any>(values, ...path);
    if (
      existing == null ||
      typeof existing !== "object" ||
      Array.isArray(existing)
    ) {
      assignSafeObject(values, path, {});
    }
  }

  function handleAddObjectProperty(
    path: (string | number)[],
    field: ParsedField,
    additionalOverride?: ParsedAdditionalProperties,
  ) {
    const additional = additionalOverride ?? field.additionalProperties;
    if (!additional?.allowAny) return;
    const rawName = prompt("Property name");
    if (!rawName) return;
    const propertyName = rawName.trim();
    if (!propertyName) return;

    ensureObjectValue(path);
    const target = getNestedValue<Record<string, any>>(values, ...path);
    if (!target) return;
    if (propertyName in target) {
      errors = [`Property "${propertyName}" already exists.`];
      return;
    }

    const defaultValue = additional.schema ? defaultForParsed(additional.schema) : null;
    assignSafeObject(values, [...path, propertyName], defaultValue);
  }

  function handleRemoveObjectProperty(path: (string | number)[], propertyName: string) {
    const target = getNestedValue<Record<string, any>>(values, ...path);
    if (!target || typeof target !== "object" || Array.isArray(target)) return;
    delete target[propertyName];
  }

  function submit() {
    errors = [];
    const res = validateJson(jsonSchema, values);
    if (!res.ok) {
      errors = res.errors;
      dispatch("error", { errors: res.errors });
      return;
    }
    committedValues = structuredClone($state.snapshot(values) || {});
    const submitted = publishValuesToData();
    dispatch("submit", { data: structuredClone(submitted) });
  }

  function cancel() {
    values = structuredClone($state.snapshot(committedValues) || {});
    errors = [];
    dispatch("cancel");
  }
</script>

{#snippet renderField(field: ParsedField, path: (string | number)[], options?: { showLabel?: boolean })}
  {@const current = getNestedValue(values, ...path)}
  {@const enumOptions = field.enumValues && field.enumValues.length > 0 ? field.enumValues : null}
  {@const T = resolvedTheme}

  {#if enumOptions}
    {@const selectedKeyRaw = current === undefined ? null : enumValueKey(current)}
    {@const selectedKey = selectedKeyRaw && enumOptions.some((opt) => opt.key === selectedKeyRaw) ? selectedKeyRaw : ""}
    <T.Enum
      {field}
      value={current}
      onchange={(v) => setValueAtPath(path, v)}
      options={enumOptions}
      {selectedKey}
    />
  {:else if field.type === "object"}
    {@const objectValue = current && typeof current === "object" && !Array.isArray(current) ? (current as Record<string, any>) : {}}
    {@const schemaInfo = resolveObjectSchema(field, objectValue)}
    {@const reorderable = isObjectReorderable(field)}
    {@const orderedKeys = getObjectOrder(path, field, objectValue, schemaInfo.children, schemaInfo.discriminatorKey ? [schemaInfo.discriminatorKey] : [])}
    {@const childLookup = new Map(schemaInfo.children.map((child) => [child.key, child]))}
    {#snippet objectChildRenderer(childField: ParsedField, childRelPath: (string | number)[], childOpts?: { showLabel?: boolean })}
      {@render renderField(childField, [...path, ...childRelPath], childOpts)}
    {/snippet}
    <T.Object
      {field}
      value={current}
      onchange={(v) => setValueAtPath(path, v)}
      resolved={schemaInfo}
      {orderedKeys}
      {childLookup}
      renderField={objectChildRenderer}
      onAddProperty={schemaInfo.additionalProperties?.allowAny ? () => handleAddObjectProperty(path, field, schemaInfo.additionalProperties) : undefined}
      onRemoveProperty={(key) => handleRemoveObjectProperty(path, key)}
      onMoveKey={reorderable ? (key, delta) => moveObjectKey(path, field, key, delta) : undefined}
      discriminator={field.discriminatedUnion ? {
        key: field.discriminatedUnion.discriminatorKey,
        value: schemaInfo.activeOption?.value ?? "",
        options: field.discriminatedUnion.options.map((o) => ({ value: o.value, label: o.label })),
        onchange: (v) => setDiscriminatedUnionVariant(path, field, v),
      } : undefined}
    />
  {:else if field.type === "array"}
    {@const arr = Array.isArray(current) ? current : []}
    {#snippet arrayChildRenderer(childField: ParsedField, childRelPath: (string | number)[], childOpts?: { showLabel?: boolean })}
      {@render renderField(childField, [...path, ...childRelPath], childOpts)}
    {/snippet}
    <T.Array
      {field}
      value={current}
      onchange={(v) => setValueAtPath(path, v)}
      items={field.items}
      count={arr.length}
      renderField={arrayChildRenderer}
      onAdd={() => handleArrayAdd(path, field)}
      onRemove={(i) => arrayRemove(values, path, i)}
    />
  {:else if field.type === "boolean"}
    <T.Boolean {field} value={current} onchange={(v) => setValueAtPath(path, v)} />
  {:else if field.type === "number" || field.type === "integer"}
    <T.Number {field} value={current} onchange={(v) => setValueAtPath(path, v)} />
  {:else if field.type === "string"}
    <T.String {field} value={current} onchange={(v) => setValueAtPath(path, v)} />
  {:else if field.type === "date"}
    <T.Date {field} value={current} onchange={(v) => setValueAtPath(path, v)} />
  {:else}
    <T.Unknown {field} value={current} onchange={(v) => setValueAtPath(path, v)} />
  {/if}
{/snippet}

{#if true}
  {@const T = resolvedTheme}
  <T.Form
    {title}
    {errors}
    {submitLabel}
    {cancelLabel}
    onsubmit={submit}
    oncancel={cancel}
  >
    {#snippet children()}
      {#each fields as field (field.key)}
        {@render renderField(field, [field.key])}
      {/each}
    {/snippet}
  </T.Form>
{/if}
