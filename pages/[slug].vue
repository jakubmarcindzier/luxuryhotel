<template>

  <div>
    <HeaderMain background="white" color="dark" mode="sticky"/>

    <section v-if="page.hero == true" class="hero-bgr uk-position-relative">
      <div class="uk-container uk-container-small uk-text-center uk-position-relative uk-position-z-index">
        <div class="location-hero-text uk-text-center">
          <Breadcrumbs :current="page.title" />
          <div v-html="page.hero_content" class="page-hero-content"></div>
        </div>
      </div>

      <nuxt-img class="hero-background uk-position-absolute uk-position-center" src="/img/hero-bgr.svg" preload />
    </section>

    <main id="content-main" class="uk-container" :class="{ 'uk-container-large' : page.template == 'full-width'}">

      <div v-if="page.hero == false" class="page-heading uk-text-center uk-margin-large-top uk-margin-large-bottom">
        <h1 class="page-headihg-title fw-semibold fs-xxl uk-margin-small-bottom">{{page.title}}</h1>
        <Breadcrumbs :current="page.title" />
      </div>

      <NuxtLayout :name="page.template">
        <EditorContent v-if="page.content" :content="page.content.blocks" class="page-editorjs" />

        <template v-if="modules">
          <template v-for="block in modules" :key="block.id">

            <BlockHero v-if="block.type == 'Hero'" :id="page.id" />
            <BlockGuidesGrid v-if="block.type == 'GuidesGrid'" :id="page.id" :layout="block.guides_grid_layout" :columns="block.guides_grid_columns" :number="block.guides_grid_number" :pagination="block.guides_grid_pagination" />
            <BlockDestinationsGrid v-if="block.type == 'DestinationsGrid'" :id="page.id" :locations="block.destinations_list" :columns="block.destinations_grid_columns" :number="block.destinations_grid_number" :filter="block.destinations_grid_filters" :types="block.destinations_type" />
            <BlockHotelReviews v-if="block.type == 'HotelReviews'" :id="page.id" :number="block.hotel_reviews_number" :pagination="block.hotel_reviews_pagination" />

          </template>
        </template>

      </NuxtLayout>

    </main>

    <LazyFooterMain />
  </div>

</template>

<script setup>

  // Get started
  const { getItems } = useDirectusItems();
  const config = useRuntimeConfig();
  const CMS_TOKEN = config.CMS_TOKEN
  const route = useRoute();

  // Get the data
  const thePage = await getItems({
    collection: 'pages',
    params: {
      filter: {
        'status': 'published',
        'slug': {
          '_eq': route.params.slug
        }
      },
    }
  });

  // Set the page
  const page = thePage[0];

  // Check if page exists
  if (!page) {
    showError(404, 'Nothing Found')
    console.log('no page')
  }

  // Start with Page Modules
  const page_modules = ref('');
  const modules = ref('');

  // Check for modules and get them
  if( page.modules.length ) {
    page_modules.value = await getItems({
      collection: 'pages_modules',
      params: {
        filter: {
          'pages_id': {
            '_eq': page.id
          }
        },
      }
    })

    // Get the modules
    modules.value = await getItems({
      collection: 'modules',
      params: {
        filter: {
          'id': {
            '_in': page_modules.value.map(a => a.modules_id)
          }
        },
      }
    });
  }

  // Set the SEO meta
  useHead({
    title: page.seo_title ? page.seo_title : page.title,
    link: [
      { rel: 'canonical', href: config.FRONT_URL + route.fullPath, },
    ],
    meta: [
      { name: 'description', content: page.seo_description ? page.seo_description : 'LuxuryHotel - five-star hotel reviews' },
      { property: 'og:title', content: page.seo_title ? page.seo_title : page.title },
      { property: 'og:description', content: page.seo_description ? page.seo_description : 'LuxuryHotel - five-star hotel reviews' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: config.FRONT_URL + route.fullPath },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'LuxuryHotel' },
      { property: 'og:image', content: '/img/lh_facebook.jpg' },
      { property: 'og:image:alt', content: page.seo_title ? page.seo_title : page.title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@luxuryhotelcom' },
      { name: 'twitter:title', content: page.seo_title ? page.seo_title : page.title },
      { name: 'twitter:description', content: page.seo_description ? page.seo_description : 'LuxuryHotel - five-star hotel reviews' },
      { name: 'twitter:image', content: '/img/lh_twitter.jpg' },
      { name: 'twitter:image:alt', content: page.seo_title ? page.seo_title : page.title },
      { name: 'twitter:creator', content: '@luxuryhotelcom' },
    ]
  });

  // Create the JSON LD Schema
  useJsonld({
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    '@id': `${config.FRONT_URL}/#webpage`,
    'description': page.title,
    'name': page.title,
    'url': config.FRONT_URL + route.fullPath,
    'datePublished': page.date_created,
    'dateModified': page.date_updated,
    'inLanguage': 'en-US',
    'about': {
      '@id': `${config.FRONT_URL}/#identity`
    },
    'isPartOf': {
      '@id': `${config.FRONT_URL}/#website`
    },
    'breadcrumb': {
      '@id': `${config.FRONT_URL}/#breadcrumbs`
    },
    'potentialAction': [
      {
        '@type': 'ReadAction',
        'target': [ config.FRONT_URL + route.fullPath ]
      }
    ],
  });

</script>

<style>
  .hero-bgr {
    padding: 60px 0;
    background: linear-gradient(180deg,rgba(233,237,240,.85) 60%,hsla(0,0%,100%,.5));
  }
  .hero-background {
    object-fit: cover;
    width: 80%;
    height: 100%;
    z-index: 0;
  }
  #content-main .page-sidebar.uk-position-sticky,
  #content-main .hotel-review-amenities {
    top: 0px;
  }
  header.uk-sticky-fixed ~ #content-main .page-sidebar.uk-position-sticky,
  header.uk-sticky-fixed ~ #content-main .hotel-review-amenities {
    top: 90px !important;
  }
  .page-sidebar > *:not(:last-child) {
    margin-bottom: 40px;
  }
  .page-content:not(.content-with-sidebar) {
    margin: 60px auto !important;
  }
  .page-hero-content p {
    font-size: var(--font-size-l);
    color: var(--dark);
    margin-top: 40px;
  }
  .page-hero-content * {
    text-decoration-color: var(--secondary) !important;
  }
  @media only screen and (max-width: 600px) {
    .page-hero-content h1 {
      font-size: 36px;
    }
    .page-hero-content p {
      font-size: var(--font-size-m);
    }
    .page-content:not(.content-with-sidebar) {
      margin: 30px auto !important;
    }
  }
</style>