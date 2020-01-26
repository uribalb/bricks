<script>
  import emotion from "emotion/core";
  const { css } = emotion;
  import { fade } from "svelte/transition";
  import { onDestroy } from "svelte";
  export let backdropCSS = "background-color: #000; opacity: 0.2",
    show = false,
    onClose = false;

  $: backdrop = css`
    ${backdropCSS};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  `;

  $: modalContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100%;
    overflow: hidden;
    z-index: 100;
  `;

  $: modalWrapper = css`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    overscroll-behavior: contain;
  `;

  $: modal = css`
    display: inline-block;
    margin: auto;
  `;

  function handleHide() {
    // backgroundElement.parentNode.removeChild(backgroundElement)
    if (onClose) onClose();
    else show = false;
  }

  function handleShow() {
    show = true;
  }

  function attachChild(e) {
    const body = document.getElementsByTagName("BODY")[0];
    body.append(e);
  }
</script>

<span on:click={handleShow}>
  <slot name="activator" />
</span>
{#if show}
  <div class="{modalContainer} modal-container" use:attachChild>
    <slot name="backdrop">
      {#if backdropCSS}
        <div class="{backdrop} backdrop" transition:fade />
      {/if}
    </slot>
    <div class="{modalWrapper} modal-wrapper" on:click={handleHide}>
      <main class="{modal} modal " on:click|stopPropagation>
        <slot>
          <!-- optional fallback -->
        </slot>
      </main>
    </div>
  </div>
{/if}
