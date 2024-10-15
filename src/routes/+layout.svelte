<script>
	export const trailingSlash = 'ignore';
</script>

<main>
	<h1><span
		style:color=red
		>Grim</span> Repoer</h1>
	<slot></slot>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
	:global(*){
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		font-family: "Nunito", sans-serif;
	}

	main {
		background-color: #1a2037;
		color: white;
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 5rem;
		min-height: 100vh;
		
		


	}

	span{
		text-shadow:  0rem 0rem 1rem rgb(255, 0, 0), 0rem 0rem .05rem rgb(255, 255, 255);
	}
	h1{
	 color: rgba(245, 245, 245, 0.599);
	}
</style>
