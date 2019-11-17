<script>
  import { unusedProps } from "./utils.js";
  export let active,
    widthProp = "width",
    heightProp = "height",
    slotHeight = "inherited",
    slotWidth = "inherited",
    startTime = 0,
    endTime = 0
  active = !startTime;

  if (startTime) setTimeout(() => (active = true), startTime);
  if (endTime) setTimeout(() => (active = false), timeout);

  $: heightCSS =
    active && heightProp ? `${heightProp}: ${slotHeight}px; ` : " ";
  $: widthCSS = active && widthProp ? `${widthProp}: ${slotWidth}px; ` : " ";

</script>

<style>
  .smoothbox {
    overflow: hidden;
  }
</style>

<div style="{heightCSS}{widthCSS} {$$props.style || ''}" class="smoothbox {$$props.class || ''}" {...unusedProps($$props, ['class', 'style'])}>
  <div bind:clientHeight={slotHeight} bind:clientWidth={slotWidth}>
    <slot>
      <!-- optional fallback -->
    </slot>
  </div>
</div>
