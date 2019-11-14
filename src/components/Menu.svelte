<script>
  export let show,
    closeOnClick,
    xOffset = "0",
    yOffset = "100%",
    xAlign = "left",
    yAlign = "top";
</script>

<style>
  .activator-reference {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .menu {
    position: absolute;
    min-width: 100%;
  }

  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .activator {
    cursor: pointer;
    display: inline-block;
  }
</style>

<div style="position: relative; display: inline-block;" class:show>
  <span
    class="activator"
    on:click={() => {
      show = true;
    }}>
    <slot name="activator">
      &#9776;
    </slot>
  </span>

  {#if show}
    <div
      class="backdrop"
      on:click={() => {
        show = false;
      }} />
    <div
      class="activator-reference"
      style="transform: translate({xOffset}, {yOffset})">
      <div
        class="menu"
        style="{xAlign}: 0; {yAlign}:0;"
        on:click={() => (show = !closeOnClick)}>
        <slot />
      </div>
    </div>
  {/if}
</div>
