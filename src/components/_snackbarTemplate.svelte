<script>
  import { fade } from "svelte/transition";
  export let msg;
</script>

<style>
  .snack {
    display: inline-block;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    background: #fff;
    padding: 4px 16px;
    margin-top: 12px;
    font-size: 1.5rem;
  }
  .close {
    cursor: pointer;
    float: left;
    padding-right: 8px;
  }
</style>

<div
  transition:fade
  class="snack {msg.class || ''}">
  {msg.snack}
  {#if msg.closeable}
    <span class="close" on:click={msg.close}>x</span>
  {/if}
</div>
