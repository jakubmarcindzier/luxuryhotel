<template>

  <div class="page-with-sidebar uk-grid" uk-grid>
    <div class="uk-width-2-3@m uk-first-column">
      <article class="page-content content-with-sidebar">
        <slot />
      </article>
    </div>
    
    <div class="uk-width-1-3@m">
      <aside class="page-sidebar use-transition uk-position-sticky">
        <div v-if="menu" class="sidebar-box">
          <h6>Quick navigation</h6>
          <ul class="sidebar-navigation uk-list uk-list-divider">
            <li v-for="item in menu[0].menu_items" :key="item.id">
              <NuxtLink :to="item.link" :target="item.target" activeClass="activeLink" class="color-dark-gray use-transition">{{item.title}}</NuxtLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  </div>

</template>

<script setup>

  // Get started
  const { getItems } = useDirectusItems();

  // Get the options data
  const options = await getItems({
    collection: 'options',
  });

  // Get the sidebar menu
  const menu = ref('')
  if( options.sidebar_menu ) {
    menu.value = await getItems({
      collection: 'menus',
      params: {
        filter: {
          id: {
            '_eq': options.sidebar_menu
          }
        },
      }
    });
  }
</script>

<style>
  ul.sidebar-navigation li a.activeLink {
    color: var(--primary);
  }
  ul.sidebar-navigation li a:not(.sidebar-list-expand) {
    position: relative;
    display: inline-block;
  }
  ul.sidebar-navigation:not(.sidebar-types) li a:not(.sidebar-list-expand):after {
    content: url("data:image/svg+xml,%3Csvg width='17' height='11' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 6H16.7143' stroke='%233AAFA9' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.8066 1L16.8066 6L11.8066 11' stroke='%233AAFA9' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    position: absolute;
    left: 100%;
    top: 0px;
    opacity: 0;
    visibility: hidden;
    -moz-transition: all .1s linear;
    -webkit-transition: all .1s linear;
    transition: all .1s linear;
    transition-delay: .2s;
  }
  ul.sidebar-navigation li a:not(.sidebar-list-expand):hover:after {
    opacity: 1;
    visibility: visible;
    left: calc(100% + 8px);
  }
  .page-sidebar .sidebar-guides .guides-grid-item .guides-item-link {
    height: 150px;
  }
  @media only screen and (max-width: 1200px) {
    ul.sidebar-navigation {
      font-size: 14px;
    }
  }
</style>