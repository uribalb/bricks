<script>
  import { Snackbar } from "svelteBricks";
  function launchSnack() {
    console.info({ snack: "basic" });
  }
  function launchWarning() {
    console.info({ snack: "basic", class: "warning" });
  }
  function warningFilter(msg) {
    return msg.class === "warning";
  }

  $: snackObject = {};

  const msgOptions = [
    { name: "class", options: ["", "warning", "crazy"] },
    { name: "closeable", options: [false, true] },
    { name: "fn", options: [undefined, () => alert("hello")] },
    { name: "time", options: [undefined, 0, 300, 2000] }
  ];
  const snackbarOptions = {
    defaultTime: [undefined, 0, 300, 2000],
    containerClass: ["", "topright"],
    snackClass: ["", "warning"],
    closeClass: [""],
    closeHtml: [""],
    closeable: [false, true],
    reverse: [false, true],
    filter: [undefined, msg => msg.class === "warning"],
    transition: ["fade"],
    passthrough: [false, true]
  };

  const snackbarConfig = Object.entries(snackbarOptions).reduce(
    (defaults, [name, values]) => {
      defaults[name] = values[0];
      return defaults;
    },
    {}
  );
  const msgConfig = {};
  let snackbarConfigWithoutDefaults = {};
  let snackbarProps = [];
  $: snackbarElement = snackbarProps && `<Snackbar ${snackbarProps.join(" ")} />`;
  $: snackbarProps && console.log(snackbarProps);
  $: snackbarConfig && updateSnackbar();

  function updateSnackbar() {
    snackbarConfigWithoutDefaults = {};
    snackbarProps = [];
    Object.entries(snackbarConfig).forEach(([name, value]) => {
      const valueType = typeof value;
      if (snackbarOptions[name][0] !== value) {
        snackbarConfigWithoutDefaults[name] = value;
        if (valueType === "string") value = `"${value}"`;
        if (valueType === "function") value = `{${value.toString()}}`;
        snackbarProps.push(`${name}=${value}`);
      }
    });
    snackbarProps = snackbarProps;
  }
</script>

<style>
  :global(.topright) {
    position: fixed;
    top: 0;
    right: 0;
    margin: 24px 64px;
  }

  :global(.snack.warning) {
    background: red;
  }
</style>

<form action="">
  {#each Object.entries(snackbarOptions) as [name, options]}
    <div>
      <div class="font-bold">{name}</div>
      <ul>
        {#each options as option}
          <li class="pl-3">
            <input
              type="radio"
              bind:group={snackbarConfig[name]}
              id="sc-{name}-{option}"
              value={option} />
            <label for="sc-{name}-{option}">{option}</label>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</form>

<button class="btn solid green" on:click={launchSnack}>Launch a snack</button>
<button class="btn solid red" on:click={launchWarning}>Launch a warning</button>
<br />

<pre class="language-html">
  <!-- <code class="language-html"> -->
  

{'<Snackbox '}{snackbarProps.join(' ')} {'/>'}
  <!-- </code> -->
</pre>
<Snackbar  />
<Snackbar {...snackbarConfigWithoutDefaults} />
