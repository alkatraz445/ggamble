<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, Avatar } from '@skeletonlabs/skeleton';

	// Mock user state - replace with actual auth store later
	let user: { loggedIn: boolean; name: string; tokens: number; avatar?: string } | null = null;

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class="px-4">
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center space-x-2">
					<span class="text-4xl">🎲</span>
					<strong class="text-xl">GGamble</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if user?.loggedIn}
					<div class="flex items-center gap-4">
						<div class="flex items-center gap-2">
							<span class="text-xl">💰</span>
							<span class="font-bold">{user.tokens}</span>
						</div>
						<div class="flex items-center gap-2">
							<Avatar width="w-10" rounded="rounded-full" src={user.avatar} initials={user.name[0]} />
							<span class="font-semibold">{user.name}</span>
						</div>
					</div>
				{:else}
					<a class="btn variant-filled-primary" href="/login">Zaloguj się</a>
					<a class="btn variant-filled-secondary" href="/register">Zarejestruj się</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
