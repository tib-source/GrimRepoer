<!-- Taken from https://github.com/Schum123/svelte-loading-spinners/blob/master/src/lib/Stretch.svelte -->
<script lang="ts">

    type SpinnerTypes = {
        size: string | number;
        color: string;
        unit: string;
        duration: string;
        pause: boolean;
    };

    export const durationUnitRegex = /[a-zA-Z]/;
    export const range = (size: number, startAt = 0) => [...Array(size).keys()].map((i) => i + startAt);

	export let color: SpinnerTypes['color'] = '#FF3E00';
	export let unit: SpinnerTypes['unit'] = 'px';
	export let duration: SpinnerTypes['duration'] = '1.2s';
	export let size: SpinnerTypes['size'] = '60';
	export let pause: SpinnerTypes['pause'] = false;
	let durationUnit: string = duration.match(durationUnitRegex)?.[0] ?? 's';
	let durationNum: string = duration.replace(durationUnitRegex, '');


</script>

<div class="wrapper" style="--size: {size}{unit}; --color: {color}; --duration: {duration}">
	{#each range(5, 1) as version}
		<div
			class="rect"
			class:pause-animation={pause}
			style="animation-delay: {(version - 1) * (+durationNum / 12)}{durationUnit}"
		/>
	{/each}
</div>

<style>
	.wrapper {
		height: var(--size);
		width: var(--size);
		display: inline-block;
		text-align: center;
		font-size: 10px;
	}
	.rect {
		height: 100%;
		width: 10%;
		display: inline-block;
		margin-right: 4px;
		transform: scaleY(0.4);
		background-color: var(--color);
		animation: stretch var(--duration) ease-in-out infinite;
	}
	.pause-animation {
		animation-play-state: paused;
	}
	@keyframes stretch {
		0%,
		40%,
		100% {
			transform: scaleY(0.4);
		}
		20% {
			transform: scaleY(1);
		}
	}
</style>