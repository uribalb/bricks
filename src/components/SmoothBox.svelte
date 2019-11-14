<script>
  export let active,
    startTime,
    endTime,
    widthProp = "width",
    heightProp = "height",
    childHeight = "inherited",
    childWidth = "inherited",
    style = '';

  active = !startTime;

  if (startTime) setTimeout(() => (active = true), startTime);
  if (endTime) setTimeout(() => (active = false), timeout);

  $: heightCSS =
    active && heightProp ? `${heightProp}: ${childHeight}px; ` : " ";
  $: widthCSS = active && widthProp ? `${widthProp}: ${childWidth}px; ` : " ";
</script>

<div style="{heightCSS}{widthCSS} {style}" class="smoothbox {$$props.class || ''}">
  <div bind:clientHeight={childHeight} bind:clientWidth={childWidth}>
    <slot>
      <!-- optional fallback -->
    </slot>
  </div>
</div>

<style>.smoothbox {overflow:hidden}</style>