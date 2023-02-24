<template>

  <div>
    <HeaderMain background="transparent" color="light" mode="static"/>

    <template v-if="page_modules">
      <template v-for="block in page_modules" :key="block.modules_id.id">

        <div :id="block.modules_id.id" class="home-section"
          :style="[
            block.modules_id.padding_top ? 'padding-top:'+block.modules_id.padding_top+'px':'',
            block.modules_id.padding_bottom ? 'padding-bottom:'+block.modules_id.padding_bottom+'px' : '',
            block.modules_id.background ? 'background:'+block.modules_id.background+'' : ''
          ]"

          :class="[
            block.modules_id.padding_top ? 'has-ptop':'',
            block.modules_id.padding_bottom ? 'has-pbottom' : '',
            block.modules_id.background ? 'has-bgr' : ''
          ]"
        >
          <div v-if="block.modules_id.type != 'Subscribe' && (block.modules_id.title || block.modules_id.subtitle)" class="heading-with-subtitle uk-container uk-container-small uk-text-center uk-margin-medium-bottom">
            <h3 v-if="block.modules_id.title" class="uk-margin-small-bottom">{{block.modules_id.title}}</h3>
            <p v-if="block.modules_id.subtitle" class="uk-margin-remove-top uk-margin-remove-bottom">{{block.modules_id.subtitle}}</p>
          </div>

          <BlockHero v-if="block.modules_id.type == 'Hero'" :id="block.modules_id.id" :title="block.modules_id.hero_title" :background="block.modules_id.hero_background" :subtitle="block.modules_id.hero_subtitle" :search="block.modules_id.hero_search" :types="block.modules_id.hero_hotel_types_builder" :type_title="block.modules_id.hero_types_title" />
          <BlockHotelsCarousel v-if="block.modules_id.type == 'HotelsCarousel'" :id="block.modules_id.id" :columns="block.modules_id.hotels_carousel_columns" :locations="block.modules_id.hotels_carousel_destinations" />
          <BlockReviewsCarousel v-if="block.modules_id.type == 'ReviewsCarousel'" :id="block.modules_id.id" :columns="block.modules_id.reviews_carousel_columns" :number="block.modules_id.reviews_carousel_number" :items="block.modules_id.reviews_carousel_items" />
          <BlockGuidesGrid v-if="block.modules_id.type == 'GuidesGrid'" :id="block.modules_id.id" :layout="block.modules_id.guides_grid_layout" :columns="block.modules_id.guides_grid_columns" :number="block.modules_id.guides_grid_number" :pagination="block.modules_id.guides_grid_pagination" />
          <BlockDestinationsGrid v-if="block.modules_id.type == 'DestinationsGrid'" :id="block.modules_id.id" :locations="block.modules_id.destinations_list" :columns="block.modules_id.destinations_grid_columns" :number="block.modules_id.destinations_grid_number" :filter="block.modules_id.destinations_grid_filters" :types="block.modules_id.destinations_type" />
          <BlockFeatures v-if="block.modules_id.type == 'Features'" :id="block.modules_id.id" :items="block.modules_id.features_list" :columns="block.modules_id.features_columns" />
          <BlockSubscribe v-if="block.modules_id.type == 'Subscribe'" :id="block.modules_id.id" :title="block.modules_id.title" :subtitle="block.modules_id.subtitle" />
        </div>
      </template>
    </template>

    <LazyFooterMain />
  </div>

</template>

<script setup>

  // Define the page meta
  definePageMeta({
    layout: false,
  });
  
  // Get started
  const route = useRoute();
  const config = useRuntimeConfig();
  const CMS_TOKEN = config.CMS_TOKEN
  const { getItems } = useDirectusItems();

  // Get the homepage data
  const homepage = await getItems({
    collection: 'homepage',
  });

  // Get the homepage modules
  const page_modules = await getItems({
    collection: 'homepage_modules',
    params: {
      filter: {
        'id': {
          '_in': homepage.modules
        }
      },
      sort: 'modules_sort',
      // fields: ['modules_id', 'modules_id.type', 'modules_id.padding_top', 'modules_id.padding_bottom', 'modules_id.background', 'modules_id.features_list', 'modules_id.features_columns'],
      fields: [
        'modules_id',
        'modules_id.id',
        'modules_id.features_list',
        'modules_id.hero_title',
        'modules_id.hero_subtitle',
        'modules_id.features_columns',
        'modules_id.hero_types_title',
        'modules_id.hero_search',
        'modules_id.hero_use_types',
        'modules_id.hotels_carousel_columns',
        'modules_id.guides_grid_number',
        'modules_id.type',
        'modules_id.background',
        'modules_id.name',
        'modules_id.hero_background',
        'modules_id.guides_grid_pagination',
        'modules_id.guides_grid_layout',
        'modules_id.guides_grid_columns',
        'modules_id.destinations_grid_columns',
        'modules_id.destinations_grid_number',
        'modules_id.destinations_grid_filters',
        'modules_id.hotel_reviews_pagination',
        'modules_id.hotel_reviews_number',
        'modules_id.title',
        'modules_id.subtitle',
        'modules_id.padding_top',
        'modules_id.padding_bottom',
        'modules_id.date_created',
        'modules_id.hotels_carousel_destinations',
        'modules_id.destinations_type',
        'modules_id.hero_hotel_types_builder',
        'modules_id.reviews_carousel_number',
        'modules_id.reviews_carousel_columns',
        'modules_id.reviews_carousel_items',
        'modules_id.destinations_list'
      ]
    }
  });

  // Start with Page Modules
  const modules = ref('');

  // Check for modules and get them
  // if( page_modules.length ) {
  //   modules.value = await getItems({
  //     collection: 'modules',
  //     params: {
  //       filter: {
  //         'id': {
  //           '_in': page_modules.map(a => a.modules_id)
  //         }
  //       },
  //       sort: 'id'
  //     }
  //   });
  // }

  // Set the head
  useHead({
    title: homepage.seo_title ? homepage.seo_title : 'Homepage | LuxuryHotels',
    link: [
      { rel: 'canonical', href: config.FRONT_URL + route.fullPath, },
    ],
    meta: [
      { name: 'description', content: homepage.seo_description },
      { property: 'og:title', content: homepage.seo_title ? homepage.seo_title : 'Homepage | LuxuryHotels' },
      { property: 'og:description', content: homepage.seo_description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: config.FRONT_URL + route.fullPath },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'LuxuryHotel' },
      { property: 'og:image', content: '/img/lh_facebook.jpg' },
      { property: 'og:image:alt', content: homepage.seo_title ? homepage.seo_title : 'Homepage | LuxuryHotels' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@luxuryhotelcom' },
      { name: 'twitter:title', content: homepage.seo_title ? homepage.seo_title : 'Homepage | LuxuryHotels' },
      { name: 'twitter:description', content: homepage.seo_description },
      { name: 'twitter:image', content: '/img/lh_twitter.jpg' },
      { name: 'twitter:image:alt', content: homepage.seo_title ? homepage.seo_title : 'Homepage | LuxuryHotels' },
      { name: 'twitter:creator', content: '@luxuryhotelcom' },
    ]
  });

</script>

<style>
  .cb-image-text {
    gap: 40px;
    margin: 40px 0;
  }

  @media only screen and (max-width: 600px) {
    .home-section.has-ptop {
      padding-top: 40px !important;
    }
    .home-section.has-pbottom {
      padding-bottom: 40px !important;
    }
  }
</style>