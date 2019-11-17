<script>
  import { current_component } from "svelte/internal";
  export let show = false;
</script>

<style>
  span {
    cursor: pointer;
  }
</style>

{#if !show || !current_component.$$.ctx.$$slots.deactivator}
  <span class:show on:click={() => (show = !show)}>
    <slot name="activator" />
  </span>
{:else}
  <span class:show on:click={() => (show = false)}>
    <slot name="deactivator" />
  </span>
{/if}
{#if show}
  <slot>
    <!-- optional fallback -->
  </slot>
{/if}
