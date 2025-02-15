<script lang="ts">
  import { Char } from '@gzlab/uui';
  import { onMount } from 'svelte';

  export let disabled = false;
  export let value = '';

  onMount(() => {
    onChange();
  });

  const onChange = () => {
    disabled = !disabled;
    value = '';
  };
</script>

<div>
  <div class="input">
    <input type="checkbox" on:change={() => onChange()} />
    <Char bind:value bind:disabled />
  </div>
</div>

<style>
  .input {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
  }
  input {
    margin: 0;
  }
</style>
