import type { Component, Snippet } from "svelte";

export interface ShadcnFieldComponents {
  Field: Component<{
    orientation?: "vertical" | "horizontal" | "responsive" | string;
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  Label: Component<{
    for?: string;
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  Description?: Component<{
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  Group?: Component<{
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  Set?: Component<{
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  Legend?: Component<{
    class?: string;
    variant?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  Content?: Component<{
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  Separator?: Component<{
    class?: string;
    [key: string]: any;
  }>;
  Error?: Component<{
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  Title?: Component<{
    class?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
}

/**
 * The set of shadcn-svelte components needed to build the theme.
 *
 * Users pass their own locally-installed shadcn components here:
 * ```ts
 * import { createShadcnTheme } from "autoform-svelte/themes/shadcn";
 * import { Button } from "$lib/components/ui/button";
 * import { Input } from "$lib/components/ui/input";
 * // ...
 * export const theme = createShadcnTheme({ Button, Input, ... });
 * ```
 */
export interface ShadcnComponents {
  Button: Component<{
    type?: string;
    variant?: string;
    size?: string;
    disabled?: boolean;
    onclick?: () => void;
    children?: Snippet;
    [key: string]: any;
  }>;
  Input: Component<{
    type?: string;
    value?: string | number;
    placeholder?: string;
    step?: string | number;
    oninput?: (e: Event) => void;
    [key: string]: any;
  }>;
  Textarea: Component<{
    value?: string;
    placeholder?: string;
    rows?: number;
    oninput?: (e: Event) => void;
    [key: string]: any;
  }>;
  Checkbox: Component<{
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    id?: string;
    [key: string]: any;
  }>;
  Label: Component<{
    for?: string;
    children?: Snippet;
    [key: string]: any;
  }>;
  /**
   * Optional field primitives:
   * `import * as Field from "$lib/components/ui/field"`
   */
  Field?: ShadcnFieldComponents;
  /** `import * as Select from "$lib/components/ui/select"` */
  Select: {
    Root: Component<{
      type?: string;
      value?: string;
      onValueChange?: (value: string) => void;
      children?: Snippet;
      [key: string]: any;
    }>;
    Trigger: Component<{
      class?: string;
      children?: Snippet;
      [key: string]: any;
    }>;
    Content: Component<{
      children?: Snippet;
      [key: string]: any;
    }>;
    Item: Component<{
      value: string;
      label?: string;
      disabled?: boolean;
      children?: Snippet;
      [key: string]: any;
    }>;
  };
  /** `import * as Card from "$lib/components/ui/card"` */
  Card: {
    Root: Component<{
      class?: string;
      children?: Snippet;
      [key: string]: any;
    }>;
    Header: Component<{
      children?: Snippet;
      [key: string]: any;
    }>;
    Title: Component<{
      children?: Snippet;
      [key: string]: any;
    }>;
    Description: Component<{
      children?: Snippet;
      [key: string]: any;
    }>;
    Content: Component<{
      children?: Snippet;
      [key: string]: any;
    }>;
    Footer: Component<{
      children?: Snippet;
      [key: string]: any;
    }>;
  };
}
