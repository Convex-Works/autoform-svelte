import type { AutoformTheme } from "../../core/types.js";
import type { ShadcnComponents } from "./types.js";
import { bindComponents } from "./context.js";
import ShadcnForm from "./ShadcnForm.svelte";
import ShadcnString from "./ShadcnString.svelte";
import ShadcnNumber from "./ShadcnNumber.svelte";
import ShadcnBoolean from "./ShadcnBoolean.svelte";
import ShadcnDate from "./ShadcnDate.svelte";
import ShadcnEnum from "./ShadcnEnum.svelte";
import ShadcnObject from "./ShadcnObject.svelte";
import ShadcnArray from "./ShadcnArray.svelte";
import ShadcnUnknown from "./ShadcnUnknown.svelte";

export type { ShadcnComponents } from "./types.js";

/**
 * Create a shadcn-svelte theme by providing your locally-installed components.
 *
 * ```ts
 * import { createShadcnTheme } from "autoform-svelte/themes/shadcn";
 * import { Button } from "$lib/components/ui/button";
 * import { Input } from "$lib/components/ui/input";
 * import { Textarea } from "$lib/components/ui/textarea";
 * import { Checkbox } from "$lib/components/ui/checkbox";
 * import { Label } from "$lib/components/ui/label";
 * import * as Field from "$lib/components/ui/field";
 * import * as Select from "$lib/components/ui/select";
 * import * as Card from "$lib/components/ui/card";
 *
 * export const shadcnTheme = createShadcnTheme({
 *   Button, Input, Textarea, Checkbox, Label, Field, Select, Card,
 * });
 * ```
 */
export function createShadcnTheme(components: ShadcnComponents): AutoformTheme {
  bindComponents(components);

  return {
    Form: ShadcnForm,
    String: ShadcnString,
    Number: ShadcnNumber,
    Boolean: ShadcnBoolean,
    Date: ShadcnDate,
    Enum: ShadcnEnum,
    Object: ShadcnObject,
    Array: ShadcnArray,
    Unknown: ShadcnUnknown,
  };
}
