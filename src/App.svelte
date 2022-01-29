<script lang="ts">
	import { onMount } from 'svelte'
	import { localStorageDetector } from 'typesafe-i18n/detectors'

	import logo from './assets/svelte.png'
	import LL, { locale, setLocale } from './i18n/i18n-svelte'
	import type { Locales } from './i18n/i18n-types'
	import { detectLocale, locales } from './i18n/i18n-util'
	import { loadLocaleAsync } from './i18n/i18n-util.async'
	import Counter from './lib/Counter.svelte'

	onMount(async () => {
		const detectedLocale = detectLocale(localStorageDetector)
		await chooseLocale(detectedLocale)
		console.log($LL.startup())
		localeToSelect = $locale
	})

	const chooseLocale = async(locale: Locales) => {
		await loadLocaleAsync(locale)
		setLocale(locale)
	}

	let localeToSelect: Locales
	$: localeToSelect && chooseLocale(localeToSelect)

	$: $locale && localStorage.setItem('lang', $locale)

	let name: string = 'typesafe-i18n'
</script>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
			'Helvetica Neue', sans-serif;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	img {
		height: 16rem;
		width: 16rem;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 2rem auto;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 1rem auto;
		line-height: 1.35;
	}

	select {
		width: 50px;
	}

	hr {
		margin: 2rem 0;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>

<main>
	<label>
		{$LL.locale.selectedLocale()}
		<select bind:value={localeToSelect}>
			<option value="" selected disabled>{$LL.locale.choose()}</option>
			{#each locales as locale}
				<option value={locale}>{locale}</option>
			{/each}
		</select>
	</label>

	<hr />

	<img src={logo} alt="Svelte Logo" />

	<h1>{$LL.greeting.message({ name })}</h1>

	<label>
		{$LL.greeting.label()}
		<input type="text" bind:value={name} />
	</label>

	<hr />

	<p>
		{$LL.today({ date: new Date() })}
	</p>

	<hr />

	<Counter />
</main>
