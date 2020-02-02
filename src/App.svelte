<script>
  export let inputVal;
  export let anagrams;

  function handleSubmit(event) {
    let val = JSON.stringify({
      word: inputVal
    });

    postVal(val)
      .then(data => {
        anagrams = data.best;
        console.log(data);
      });
  }

  // Post input to express server endpoint
  async function postVal(val) {
    let res = await fetch(
      '/word', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        'word': inputVal
      })
    });

    return await res.json();
  }

</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" bind:value={inputVal} placeholder="Type some letters">
  <button type="submit">Submit</button>
</form>

{#if anagrams}
  <h2>Anagrams of {inputVal}</h2>
  <ul>
    {#each anagrams as item}
      <li>{item}</li>
    {/each}
  </ul>
{/if}
