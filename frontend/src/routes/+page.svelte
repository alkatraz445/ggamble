<script lang="ts">
	let games = [
		{ name: 'DICE', players: 4298, image: '🎲' },
		{ name: 'CRASH', players: 2325, image: '📈' },
		{ name: 'PLINKO', players: 2783, image: '🔵' },
		{ name: 'MINES', players: 6453, image: '💎' },
		{ name: 'LIMBO', players: 4291, image: '🎯' },
		{ name: 'KENO', players: 1638, image: '🎲' },
		{ name: 'HILO', players: 1045, image: '🎴' }
	];

	let promos = [
		{
			title: 'Conquer the Casino',
			description: 'Win a share in $50,000 every week',
			button: 'Play Now',
			image: '👑'
		},
		{
			title: '$1,000,000 Race',
			description: 'Happy New Year!',
			button: 'Race Now',
			image: '🏎️'
		},
		{
			title: 'Weekly Raffle',
			description: 'Share in $75,000 each week',
			button: 'Learn More',
			image: '🎟️'
		}
	];
</script>

<div class="container mx-auto p-4 space-y-8">
	<!-- Promotional Banner Section -->
	<div class="flex gap-4 overflow-x-auto pb-4">
		{#each promos as promo}
			<div class="card variant-filled-primary p-4 w-80">
				<header class="card-header justify-around gap-4">
					<span class="text-4xl">{promo.image}</span>
					<div>
						<h3 class="h3">{promo.title}</h3>
						<p class="opacity-80">{promo.description}</p>
					</div>
				</header>
				<footer class="card-footer">
					<button class="btn variant-filled-secondary w-full">{promo.button}</button>
				</footer>
			</div>
		{/each}
	</div>

	<!-- Search Bar -->
	<div class="relative">
		<input
			class="input w-full pl-10"
			type="search"
			placeholder="Search games..."
		/>
		<span class="absolute left-3 top-3 opacity-50">🔍</span>
	</div>

	<!-- Games Grid -->
	<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
		{#each games as game}
			<div class="card variant-filled-surface p-4 text-center hover:variant-filled-primary transition-all duration-200">
				<header class="card-header pb-4">
					<span class="text-4xl mb-2">{game.image}</span>
					<h3 class="h3">{game.name}</h3>
				</header>
				<footer class="card-footer">
					<p class="text-sm opacity-80">{game.players} w grze</p>
				</footer>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	/* Custom scrollbar for overflow elements */
	::-webkit-scrollbar {
		height: 8px;
	}
	::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 4px;
	}
	::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.2);
	}
</style>
