<script>
  import { getContext } from "svelte";
  import { TABS } from "./Tabs.svelte";
  export let preserve

  const panel = {};
  const { registerPanel, selectedPanel } = getContext(TABS);

  registerPanel(panel);

  $: selected = $selectedPanel === panel;

  async function setHeight(e) {
    tabWindowHeight = e.clientHeight;
  }
</script>

<style>
  .panel {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>

<div class="panel" style="position: {selected ? 'relative' : 'absolute'}; {selected ? '' : 'z-index:-1'}">
  {#if selected || preserve}
    <slot />
  {/if}
</div>
