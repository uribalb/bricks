<script>
  import { onDestroy, tick } from "svelte";
  export let show = false,
    closeOnClick = false,
    openOnHover = false,
    xOffset = "0",
    yOffset = "100%",
    xAlign = "left",
    yAlign = "top",
    style = "";

  document.body.addEventListener("click", handleBgClick, false);

  onDestroy(() => {
    document.body.removeEventListener("click", handleBgClick, false);
  });

  function handleBgClick(event) {
    show = false;
  }

  function handleMenuClick(e) {
    show = !closeOnClick;
  }

  async function handleClick() {
    setTimeout(() => (show = !show));
  }
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
    z-index: 100;
  }

  .activator {
    cursor: pointer;
  }
</style>

<div
  style="position:relative; display: inline-block; {style}
  "
  class:show
  class={$$props.class || ''}
  on:mouseenter={() => {
    openOnHover && (show = true);
  }}
  on:mouseleave={() => {
    openOnHover && (show = false);
  }}>
  <div class="activator" on:click={handleClick}>
    <slot name="activator">&#9776;</slot>
  </div>

  {#if show}
    <div class="activator-reference">
      <div
        class="activator-reference"
        style="transform: translate({xOffset}, {yOffset}); z-index:1">
        <div
          class="menu"
          style="{xAlign}: 0; {yAlign}:0;"
          on:click|stopPropagation={handleMenuClick}>
          <slot />
        </div>
      </div>
    </div>
  {/if}
</div>
