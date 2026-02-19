import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			'autoform-svelte/themes/shadcn': path.resolve(__dirname, '../src/lib/themes/shadcn/index.ts'),
			'autoform-svelte/adapters/zod': path.resolve(__dirname, '../src/lib/adapters/zod.ts'),
			'autoform-svelte/adapters': path.resolve(__dirname, '../src/lib/adapters/index.ts'),
			'autoform-svelte': path.resolve(__dirname, '../src/index.ts'),
		},
	},
});
