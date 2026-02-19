import { createShadcnTheme } from "autoform-svelte/themes/shadcn";
import { Button } from "$lib/components/ui/button";
import { Input } from "$lib/components/ui/input";
import { Textarea } from "$lib/components/ui/textarea";
import { Checkbox } from "$lib/components/ui/checkbox";
import { Label } from "$lib/components/ui/label";
import * as Select from "$lib/components/ui/select";
import * as Card from "$lib/components/ui/card";
import * as Field from "$lib/components/ui/field";

export const shadcnTheme = createShadcnTheme({
	Button,
	Input,
	Textarea,
	Checkbox,
	Label,
	Field,
	Select,
	Card,
});
