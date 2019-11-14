<script>
  import { onDestroy } from "svelte";
  import emotion from "emotion/dist/emotion.umd.min.js";
  import { crossfade, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  const { css } = emotion;

  export let defaultTime = 5000,
    containerClass = css`
      position: fixed;
      bottom: 20px;
      right: 40px;
      text-align: right;
    `,
    snackClass = css`
      display: inline-block; 
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
        0 1px 2px 0 rgba(0, 0, 0, 0.06);
      background: #fff;
      padding: 4px 16px;
      margin-top: 12px;
      font-size: 1.5rem;
    `,
    closeClass = css`
      cursor: pointer;
      float: left;
      padding-right: 8px;
    `,
    closeHtml = "x",
    closeable = false,
    reverse = false,
    filter = msg => msg.snack,
    transition = fade,
    passthrough = false;

  let messages = [];

  const _info = console.info;
  console.info = function(msg, ...params) {
    const snack = JSON.parse(JSON.stringify(msg));
    snack.fn = msg.fn;
    if (filter(snack)) {
      snack.id = messages.length;
      snack.show = true;
      snack.timestamp = Date.now();
      snack.closeable = snack.closeable || closeable;

      if (snack.time !== 0) {
        setTimeout(() => {
          snack.show = false;
          messages = messages;
        }, snack.time || defaultTime);
      }
      messages = reverse ? [snack, ...messages] : [...messages, snack];
      if (passthrough) _info(msg, ...params);
    } else _info(msg, ...params);
  };

  function close(i) {
    messages[i].show = false;
  }

  onDestroy(() => {
    // Let's return console.info to its former glory
    console.info = _info;
  });
</script>

<ul class="{containerClass} snack-container">
  {#each messages.filter(msg => msg.show) as message (message.id)}
    <li
      on:click={() => {
        if (message.fn) {
          message.fn();
          message.show = false;
        }
      }}
      
      transition:transition
      animate:flip>
      <span class="snack {snackClass}
      {message.class || ''}
      {message.closeable ? 'has-close' : ''}"
      style={message.fn ? 'cursor: pointer;':''}
      >
        {message.snack}
        {#if message.closeable}
          <span class="{closeClass} snack-close" on:click={() => close(message.id)}>
            {@html closeHtml}
          </span>
        {/if}
      </span>
    </li>
  {/each}
</ul>
