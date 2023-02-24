<template>
  <div id="offcanvas-settings" uk-offcanvas="flip: true; overlay: true">
    <div class="uk-offcanvas-bar">
      <LazySwitchers />
      <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-medium-top" uk-toggle="target: #offcanvas-settings">Save</button>
    </div>
  </div>
</template>

<style>
  #offcanvas-settings .uk-offcanvas-bar .uk-button-primary {
    color: var(--white);
    background: var(--primary);
  }
</style>