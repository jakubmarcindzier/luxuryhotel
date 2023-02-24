<template>
  <nav :class="'uk-navbar-container uk-navbar-transparent uk-'+props.color" uk-navbar>
    <div class="uk-navbar-center uk-visible@m">
  
      <ul id="menu" class="uk-navbar-nav fs-xxs">

        <template v-for="(menu, index) in menu_items" :key="index" >
          <li :class="{ 'menu-parent' : menu.submenu || menu.type == 'megamenu_destinations' }" class="uk-position-relative">
            <NuxtLink activeClass="activeLink" :to="menu.link" :prefetch="false" :target="menu.target" class="color-white fw-semibold uk-padding-remove">
              {{menu.title}}
            </NuxtLink>

            <div v-if="menu.submenu" class="menu-dropdown uk-navbar-dropdown">
              <ul class="uk-nav uk-navbar-dropdown-nav">
                <li v-for="submenu in menu.submenu" :key="submenu.id">
                  <NuxtLink :to="submenu.link" :prefetch="false" class="use-transition">
                    {{submenu.title}}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <LazyDestinationsList v-if="menu.type == 'megamenu_destinations'" area="megamenu" />
          </li>
        </template>
        
      </ul>
    </div>
  </nav>

</template>

<script setup>

  // Set Directus
  const config = useRuntimeConfig()
  const CMS_TOKEN = config.CMS_TOKEN
  const { getItemById } = useDirectusItems();

  // Set the props
  const props = defineProps(['color'])

  // Get the options
  const options = await getItemById({
    collection: 'options',
    id: '1',
    params: {
      fields: ['header_menu']
    }
  });

  // Get the menu
  const menu = await getItemById({
    collection: 'menus',
    id: options.header_menu
  });

  // Set the menus
  const menu_items = menu.menu_items ? menu.menu_items : []

</script>