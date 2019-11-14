<script>
  import emotion from "emotion/dist/emotion.umd.min.js";
  const { css } = emotion;
  export let backdropCSS = "",
    backdropCSSMobile = "background-color: green; opacity: 0.2;",
    align = "left",
    breakpoint = "768px",
    show = true,
    showOnMobile = false,
    width = "256px",
    widthMobile,
    widthCollapsed = "0px",
    widthCollapsedMobile,
    collapseMode = "slide",
    collapseModeMobile,
    mainMode = "shrink",
    mainModeMobile = "cover",
    mainEffectCSS = "",
    mainEffectCSSMobile = "",
    transition = "all 0.3s",
    activatorMode = "outside",
    activatorModeMobile,
    classPrefix = "";

  const navClass = $$props.class;

  const inset0 = `position: absolute;    top: 0;    right: 0;    bottom: 0;    left: 0;`;

  $: backdropCSSMobile = backdropCSSMobile || backdropCSS;
  $: collapseModeMobile = collapseModeMobile || collapseMode;
  $: widthMobile = widthMobile || width;
  $: widthCollapsedMobile = widthCollapsedMobile || widthCollapsed;
  $: activatorModeMobile = activatorModeMobile || activatorMode;
  $: widthIsPct = width.match("%");
  $: widthMobileIsPct = widthMobile.match("%");

  $: oppositeAlign = align === "left" ? "right" : "left";
  $: plus = align === "left" ? "+" : "-";
  $: minus = align === "left" ? "-" : "+";

  $: cssId = classPrefix || "nav-" + Math.round(Math.random() * 1000000);

  $: container = css`
    ${inset0};
    overflow-x: hidden;
  `;

  $: backdrop = css`
    display: none;
    @media not all and (min-width: ${breakpoint}) {
      .${cssId}.show-mobile &.mobile {
        ${backdropCSSMobile
          ? backdropCSSMobile + inset0 + "display: block;"
          : ""}
      }
    }
    @media only screen and (min-width: ${breakpoint}) {
      .${cssId}.show &.desktop {
        ${backdropCSS ? backdropCSS + inset0 + "display: block;" : ""}
      }
    }
  `;

  $: main = css`
    ${inset0}
    overflow: auto;
    overflow-x: hidden;
    transition: ${transition};    

    @media not all and (min-width: ${breakpoint}) {
      margin-${align}: ${widthCollapsedMobile};
      .${cssId}.show-mobile.mobile-main-shrink & {
        margin-${align}: ${widthMobile};
      }
      .${cssId}.show-mobile.mobile-main-slide & {
        transform: translateX(${minus + widthCollapsedMobile})
            translateX(${plus + widthMobile});
      }
      .${cssId}.show-mobile & {
        ${mainEffectCSSMobile}
      }

    }
    @media only screen and (min-width: ${breakpoint}) {
      margin-${align}: ${widthCollapsed};
      .${cssId}.show.desktop-main-shrink & {
        margin-${align}: ${width};
      }
      .${cssId}.show.desktop-main-slide & {
        transform: translateX(${minus + widthCollapsed})
            translateX(${plus + width});
      }
      .${cssId}.show & {
        ${mainEffectCSS}
      }
    }
  `;

  $: aside = css`
     {
      ${inset0}
      ${oppositeAlign}: auto;
      transition: ${transition};
      transition-property: margin, width, transform;
      height: 100%;

      @media not all and (min-width: ${breakpoint}) {
        width: ${widthMobile};

        /** HIDE **/

        .${cssId}.mobile-slide & {
          transform: translateX(${plus + widthCollapsedMobile})
            translateX(${minus}100%);
        }
        .${cssId}.mobile-mask & {
          overflow: hidden;
          width: ${widthCollapsedMobile};
        }

        /** SHOW **/

        .${cssId}.show-mobile & {
          transform: translateX(0);
          width: ${widthMobile};
        }
      }

      @media only screen and (min-width: ${breakpoint}) {
        width: ${width};

        /** HIDE **/

        .${cssId}.desktop-slide & {
          transform: translateX(${plus + widthCollapsed})
            translateX(${minus}100%);
        }
        .${cssId}.desktop-mask & {
          overflow: hidden;
          width: ${widthCollapsed};
        }

        /** SHOW **/

        .${cssId}.show & {
          transform: translateX(0);
          width: ${width};
        }
      }
    }
  `;

  $: asideInner = css`
      position: absolute;      
      height: 100%;}
      ${align}: 0;
      @media not all and (min-width: ${breakpoint}) {
        width: ${widthMobile};
      }
      @media only screen and (min-width: ${breakpoint}) {
        width: ${width};      
      `;

  $: activator = css`
     {
      transition: ${transition};
      position: absolute;
      top: 0;
      display: none;
      cursor: pointer;
      pointer-events: none;
      & > * {
        pointer-events: auto;
      }
      ${align}: 0;

      @media not all and (min-width: ${breakpoint}) {
        &.mobile {
          display: inline;
        }
        .${cssId}.mobile-activator-follow & {
          transform: translateX(${plus+widthCollapsedMobile}) translateX(${minus}100%);
        }
        .${cssId}.mobile-activator-outside & {
          transform: translateX(0);
        }

        /** SHOW **/
        .${cssId}.show-mobile.mobile-activator-outside &,
        .${cssId}.show-mobile.mobile-activator-follow & {
          transform: translateX(${plus+widthMobile}) translateX(${minus}100%);
        }
        /**relative width fix**/
        .${cssId}.show-mobile.mobile-activator-outside.mobile-width-pct &,
        .${cssId}.show-mobile.mobile-activator-follow.mobile-width-pct & {
          ${align}: ${widthMobile};
          transform: translateX(${minus}100%);
        }
      }

      @media only screen and (min-width: ${breakpoint}) {
        &.desktop {
          display: inline;
        }
        .${cssId}.desktop-activator-follow & {
          transform: translateX(${plus+widthCollapsed}) translateX(${minus}100%);
        }
        .${cssId}.desktop-activator-outside & {
          transform: translateX(0);
        }

        /** SHOW **/
        .${cssId}.show.desktop-activator-outside &,
        .${cssId}.show.desktop-activator-follow & {
          transform: translateX(${plus+width}) translateX(${minus}100%);
        }
        /**relative width fix**/
        .${cssId}.show.desktop-activator-outside.desktop-width-pct &, 
        .${cssId}.show.desktop-activator-follow.desktop-width-pct & {
          ${align}: ${width};
          transform: translateX(${minus}100%);
        }
      }
    }
  `;

  function toggleMobile() {
    showOnMobile = !showOnMobile;
    show = show || showOnMobile;
  }
  function toggleDesktop() {
    show = !show;
    showOnMobile = show && showOnMobile;
  }
</script>

<style>
  .inset-0 {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>

<div
  style=""
  class="{show ? 'show' : ''}
  {showOnMobile ? 'show-mobile' : ''} desktop-{collapseMode} mobile-{collapseModeMobile}
  nav-component {cssId} desktop-main-{mainMode} mobile-main-{mainModeMobile}
  {container}
  {activatorMode ? 'desktop-activator-' + activatorMode : ''}
  {activatorModeMobile ? 'mobile-activator-' + activatorModeMobile : ''}
  {widthIsPct ? 'desktop-width-pct' : ''}
  {widthMobileIsPct ? 'mobile-width-pct' : ''}
  ">
  <!-- Main -->
  <main class="{main} {classPrefix}main">
    <slot>
      No main content
      <!-- optional fallback -->
    </slot>
  </main>

  <!-- Backdrop -->
  <slot name="backdrop">
    <div
      class="{backdrop}
      {classPrefix}backdrop mobile"
      on:click={toggleMobile} />
    <div
      class="{backdrop}
      {classPrefix}backdrop desktop"
      on:click={toggleDesktop} />
  </slot>

  <!-- Navigation -->
  <aside class="{aside} {navClass} {classPrefix}aside">

    <aside class="{asideInner} {classPrefix}aside-inner">
      <!-- Slot -->
      <slot class="nav" name="aside">
        <!-- optional fallback -->
      </slot>
    </aside>
  </aside>

  <!-- Activator -->
  <div
    on:click={toggleMobile}
    class="{activator}
    {classPrefix}activator mobile">
    <slot name="activator">
      <div style="margin: 6px 10px">&#9776;</div>
    </slot>
  </div>
  <div
    on:click={toggleDesktop}
    class="{activator}
    {classPrefix}activator desktop">
    <slot name="activator">
      <div style="margin: 6px 10px">&#9776;</div>
    </slot>
  </div>
</div>
