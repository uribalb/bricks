<script>
  export let show = false,
    showText = "+",
    hideText = "-",
    hideToggle = false;
</script>

{#if !hideToggle}
  {#if show}
    <span on:click={() => (show = false)}>
      <slot name="hide">{hideText}</slot>
    </span>
  {:else}
    <span on:click={() => (show = true)}>
      <slot name="show">{showText}</slot>
    </span>
  {/if}
{/if}

{#if show}
  <slot>
    <!-- optional fallback -->
  </slot>
{/if}
