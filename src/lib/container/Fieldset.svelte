<script lang="ts">
  export let title = '';
</script>

<fieldset>
  <legend>{title}</legend>
  <slot />
</fieldset>

<style>
  fieldset {
    position: relative;
    border: 2px solid var(--border-color);
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.3rem;
    border-radius: 12px;
    min-height: 29px;
    height: fit-content;
  }
  legend{
    font-weight: bold;
    font-size: 0.85rem;
  }
</style>
