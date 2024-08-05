<!-- <script>
    export let data
</script> -->

<script>
	let a = false
	
	const test = () => {
		a = a == true ? false : true
	}
</script>

<button on:click={test}>
  {#if a}
    Hide Button
  {:else}
    Show Button
  {/if}
</button>