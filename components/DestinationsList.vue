<template>
  <div v-if="props.area == 'megamenu'" class="megamenu menu-dropdown uk-navbar-dropdown" uk-drop="boundary: #header; boundary-align: false; pos: bottom-justify;">
    <div class="uk-container uk-container-large">
      <ul v-if="destinations" class="uk-navbar-dropdown-nav uk-grid-small uk-child-width-1-2@s uk-child-width-1-5@m uk-child-width-1-6@l" uk-grid>
        <li v-for="destination in destinations" :key="destination.id">
          <NuxtLink class="use-transition" :to="destination.parent ? locationLink(destination.slug, destination.parent.slug) : locationLink(destination.slug, '')" :prefetch="false">{{destination.title}}</NuxtLink>
        </li>

        <li class="megamenu-accent uk-margin-medium-top uk-width-1-1 uk-text-center">
          <NuxtLink to="/destinations/" :prefetch="false" class="fw-semibold fs-xxs uk-text-uppercase use-transition">All Destinations</NuxtLink>
        </li>
      </ul>
    </div>
  </div>

  <ul v-if="props.area == 'mobile' && destinations" class="fs-s uk-nav-sub uk-padding-remove-left">
    <li v-for="destination in destinations" :key="destination.id">
      <NuxtLink class="use-transition" :to="destination.parent ? locationLink(destination.slug, destination.parent.slug) : locationLink(destination.slug, '')" uk-toggle="target: #offcanvas-mobile-menu">
        {{destination.title}}
      </NuxtLink>
    </li>

    <li class="menu-accent uk-margin-top uk-margin-bottom">
      <NuxtLink to="/destinations/" :prefetch="false" class="fw-semibold fs-xxs uk-text-uppercase use-transition" uk-toggle="target: #offcanvas-mobile-menu">
        All Destinations
      </NuxtLink>
    </li>
  </ul>

  <ul v-if="props.area == 'footer' && destinations" class="footer-content-links fs-xs uk-grid-small uk-child-width-1-2 uk-child-width-1-4@m uk-child-width-1-5@l" uk-grid>
    <li v-for="destination in destinations" :key="destination.id">
      <NuxtLink class="use-transition" :to="destination.parent ? locationLink(destination.slug, destination.parent.slug) : locationLink(destination.slug, '')" :prefetch="false">
        {{destination.title}}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup>

  // Set the props
  const props = defineProps([ 'area' ])

  // Get started
  const { getItems } = useDirectusItems();

  // Get all the options
  const destinations = await getItems({
    collection: 'location',
    params: {
      fields: ['title', 'slug', 'parent', 'parent.title', 'parent.slug'],
      limit: -1,
      filter: {
        options_destinations: {
          '_nnull': true
        }
      },
      sort: 'title'
    }
  });

</script>
