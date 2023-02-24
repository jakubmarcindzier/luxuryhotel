<template>

  <header id="header" :class="'header-'+props.color+' bg-'+props.background+' uk-position-z-index '+modeClass" :uk-sticky="props.mode == 'sticky' ? 'start: 500; offset: 0; show-on-up: true; animation: uk-animation-slide-top' : null">
    <div class="uk-container uk-container-large uk-flex uk-flex-middle uk-flex-between">
      <HeaderLogo :color="props.color"/>
      <HeaderMenu :color="props.color"/>
      <HeaderActions />
    </div>
  </header>

</template>

<script setup>

  // Set the props
  const props = defineProps(['background', 'color', 'mode'])

  // Set the header attributes
  const modeClass = ref('')
  if( props.mode == 'static' ) {
    modeClass.value = 'uk-position-top'
  }
</script>

<style>
  #header {
    z-index: 9;
  }
  #header.header-dark {
    border-bottom: 1px solid var(--light-gray);
  }
  .menu-actions .menu-action {
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 20px;
  }
  #header:not(.bg-transparent) .menu-actions .menu-action {
    background: var(--faded);
  }
  #header:not(.bg-transparent) .menu-actions .menu-action:hover {
    background: var(--light);
  }
  #header.header-light .logo {
    filter: invert(100);
  }
  .menu-actions .menu-action:hover {
    color: inherit;
    background: var(--light);
  }
  .menu-actions a:not(:last-child) {
    margin-right: 15px;
  }
  .menu-actions .menu-action-switchers {
    width: 90px;
  }
  ul#menu li a {
    letter-spacing: .5px;
  }
  ul#menu > li:not(:last-child) {
    margin-right: 40px;
  }
  ul#menu > li > a:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    top: auto;
    display: block;
    height: 3px;
    width: 0px;
    background-color: var(--primary);
    -moz-transition: all .1s linear;
    -webkit-transition: all .1s linear;
    transition: all .1s linear;
  }
  ul#menu:hover > li > a.activeLink:before {
    width: 0;
  }
  ul#menu > li > a.activeLink:before,
  ul#menu > li > a.activeLink:hover:before,
  ul#menu > li > a:hover:before {
    width: 25px;
  }
  ul#menu li.menu-parent > a:after {
    content: "";
    display: inline-block;
    margin-left: 10px;
    margin-top: -7px;
    width: 5px;
    height: 5px;
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    background: 0 0;
    border-right: 1.5px solid;
    border-bottom: 1.5px solid;
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    transition: all .2s ease;
  }
  ul#menu li.menu-parent .menu-dropdown {
    border: 1px solid var(--light-gray);
    border-top: none;
  }
  ul#menu li.menu-parent .menu-dropdown a,
  ul.footer-content-links li a {
    display: inline-flex;
    position: relative;
  }
  ul#menu li.menu-parent .menu-dropdown a:not(.uk-button):after,
  ul.footer-content-links li a:after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' stroke='currentColor' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3Cpolyline points='12 5 19 12 12 19'%3E%3C/polyline%3E%3C/svg%3E");
    display: inline-block;
    position: absolute;
    left: 100%;
    top: calc(50% - 8px);
    opacity: 0;
    visibility: hidden;
    transition: all .1s linear;
  }
  ul#menu li.menu-parent .menu-dropdown a:hover:after,
  ul.footer-content-links li a:hover:after {
    opacity: 1;
    visibility: visible;
    left: calc(100% + 4px);
  }
  ul#menu .megamenu li.megamenu-accent {
    border-top: 1px solid var(--light-gray);
    padding-top: 20px;
  }
  ul#menu li.menu-parent .menu-dropdown a span {
    position: absolute;
    top: 0;
    right: 90%;
    opacity: 0;
    visibility: hidden;
    white-space: nowrap;
    transition-delay: .2s;
  }
  ul#menu li.menu-parent .menu-dropdown a:hover span {
    opacity: 1;
    visibility: visible;
    right: calc(100% + 6px)
  }
  ul#menu li.menu-parent .menu-dropdown.megamenu a:before,
  .sidebar-box .uk-list > li > a:not(.sidebar-list-expand):before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
    left: -5px;
    width: 15px;
    height: 100%;
    background: var(--faded);
    border-radius: 3px;
    z-index: -1;
    transition: all .3s ease;
  }
  ul#menu li.menu-parent .menu-dropdown.megamenu a:hover:before,
  .sidebar-box .uk-list > li > a:hover:before,
  .sidebar-box .uk-list > li > a.activeLink:before {
    width: calc(100% + 10px);
  }
  .contact-socials-icon {
    width: 70px;
    height: 70px;
    border: 3px solid transparent;
  }
  .contact-socials-item:hover .contact-socials-icon {
    border-color: var(--faded);
  }
  @media only screen and (max-width: 992px) {
    #header {
      padding: 15px 0;
    }
  }
  @media only screen and (max-width: 600px) {
    #header {
      padding: 10px 0;
    }
    .menu-actions a:not(:last-child) {
      margin-right: 10px;
    }
  }
</style>