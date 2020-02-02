<script>
  export let show = false;
</script>

<style>
  span {
    cursor: pointer;
  }
</style>

<!-- show activator? -->
{#if !show}
  <span class:show on:click={() => (show = !show)}>
    <slot name="activator" />
  </span>
{:else}
  <!-- else show deactivator -->
  <span class:show on:click={() => (show = false)}>
    <slot name="deactivator" />
  </span>
{/if}
{#if show}
  <slot>
    <!-- optional fallback -->
  </slot>
{/if}
