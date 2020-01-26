<script>
  import { onDestroy } from "svelte";
  import DefaultTemplate from "./_snackbarTemplate.svelte";
  import emotion from "emotion/core";
  import { crossfade, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  const { css } = emotion;

  export let time = 5000,
    containerClass = css`
      position: fixed;
      bottom: 20px;
      right: 40px;
      text-align: right;
    `,
    template = DefaultTemplate,
    templates = {},
    closeable = false,
    reverse = false,
    filter = msg => msg.snack,
    passthrough = false;

  let messages = [];

  const _info = console.info;
  console.info = function(msg, ...params) {
    if (filter(msg)) {
      const snack = Object.assign(
        msg,
        Object.assign({ time, closeable, template }, msg)
      );
      snack.fn = msg.fn;
      snack.id = messages.length;
      snack.show = true;
      snack.timestamp = Date.now();
      snack.close = function() {
        snack.show = false;
        messages = messages;
      };
      if (typeof snack.template === "string")
        snack.template = templates[snack.template];
      if (snack.time !== 0) {
        setTimeout(() => {
          snack.show = false;
          messages = messages;
        }, snack.time );
      }
      messages = reverse ? [snack, ...messages] : [...messages, snack];
      if (passthrough) _info(msg, ...params);
    } else _info(msg, ...params);
  };

  onDestroy(() => {
    // Let's return console.info to its former glory
    console.info = _info;
  });
</script>

<ul class="{containerClass} snack-container">
  {#each messages.filter(msg => msg.show) as message (message.id)}
    <li
      style={message.fn ? 'cursor: pointer;' : ''}
      on:click={() => {
        if (message.fn) {
          message.fn();
          message.show = false;
        }
      }}
      animate:flip>
      <svelte:component this={message.template} bind:msg={message} />
    </li>
  {/each}
</ul>
