<template>
  <div id="offcanvas-mobile-menu" uk-offcanvas="flip: true; overlay: true">
    <div class="uk-offcanvas-bar uk-flex uk-flex-column uk-flex-between">

      <div class="mobile-navigation">
        <ul v-if="menu_items"  id="mobile-menu" class="fs-m uk-nav uk-nav-default" uk-nav>
          <li v-for="menu in menu_items" :key="menu.id" :class="{ 'uk-parent' : menu.submenu || menu.type == 'megamenu_destinations' }" class="uk-position-relative">
            <NuxtLink activeClass="uk-active" :to="menu.link" :target="menu.target" :uk-toggle="menu.submenu || menu.type == 'megamenu_destinations' ? null : 'target: #offcanvas-mobile-menu'" :prefetch="false">
              {{menu.title}}
              <svg v-if="menu.submenu || menu.type == 'megamenu_destinations'" class="uk-margin-small-left" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                <polyline fill="none" stroke="currentColor" stroke-width="1.1" points="1 3.5 6 8.5 11 3.5"></polyline>
              </svg>
            </NuxtLink>

            <ul v-if="menu.submenu" class="fs-s uk-nav-sub uk-padding-remove-left">
              <li v-for="submenu in menu.submenu" :key="submenu.id">
                <NuxtLink :to="submenu.link" class="use-transition" uk-toggle="target: #offcanvas-mobile-menu" :prefetch="false">
                  {{submenu.title}}
                </NuxtLink>
              </li>
            </ul>

            <LazyDestinationsList v-if="menu.type == 'megamenu_destinations'" area="mobile" />
          </li>
        </ul>

        <hr />

        <SocialNetworks class="footer-content-socials" />
      </div>

      <LazySwitchers />

    </div>
  </div>

</template>

<script setup>

  // Get started
  const config = useRuntimeConfig()
  const { getItemById } = useDirectusItems();

  // Set the props
  const props = defineProps(['color'])

  // Get the options
  const options = await getItemById({
    collection: 'options',
    id: '1',
    params: {
      fields: ['header_menu']
    },
  });

  // Get the menu
  const menu = await getItemById({
    collection: 'menus',
    id: options.header_menu,
    params: {
      fields: ['menu_items']
    },
  });

  // Set the menus
  const menu_items = ref()
  if( menu ) {
    menu_items.value = menu.menu_items
  }

</script>

<style>
  ul.uk-nav-sub {
    max-height: 40vh;
    overflow-y: auto;
  }
</style>