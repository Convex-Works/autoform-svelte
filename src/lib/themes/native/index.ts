import type { AutoformTheme } from "../../core/types.js";
import NativeForm from "./NativeForm.svelte";
import NativeString from "./NativeString.svelte";
import NativeNumber from "./NativeNumber.svelte";
import NativeBoolean from "./NativeBoolean.svelte";
import NativeDate from "./NativeDate.svelte";
import NativeEnum from "./NativeEnum.svelte";
import NativeObject from "./NativeObject.svelte";
import NativeArray from "./NativeArray.svelte";
import NativeUnknown from "./NativeUnknown.svelte";

export const nativeTheme: AutoformTheme = {
  Form: NativeForm,
  String: NativeString,
  Number: NativeNumber,
  Boolean: NativeBoolean,
  Date: NativeDate,
  Enum: NativeEnum,
  Object: NativeObject,
  Array: NativeArray,
  Unknown: NativeUnknown,
};
