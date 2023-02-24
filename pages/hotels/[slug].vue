<template>

  <div>
    <HeaderMain background="white" color="dark" mode="sticky"/>

    <section class="hotel-review-hero uk-margin-top uk-margin-bottom">
      <div class="uk-container uk-container-large uk-text-center">
        <div class="uk-padding">
          <Breadcrumbs :current="hotel.title" parentName="Hotels" parentLink="/hotels" />
          <h1>{{hotel.title}} <span class="highlighted-text">Review</span></h1>
          <p><DateUpdated :date="hotel.date_updated" text="Last updated on" /></p>
        </div>
      </div>
    </section>

    <main id="content-main" class="single-hotel-review uk-container uk-container-large uk-margin-bottom">

      <div class="page-with-sidebar" uk-grid>
        <div class="uk-width-3-4@l">

          <div id="gallery" class="hotel-review-start" uk-grid>
            <div class="uk-width-1-3@m">
              <div v-if="hotelMeta" class="hotel-review-amenities bg-light uk-padding uk-position-sticky">
                <div v-for="(group, key, index) in groupByKey(hotelMeta, 'facilitytype_name')" :key="index">
                  <p class="color-dark fs-xs fw-semibold uk-margin-remove-bottom">{{key}}</p>
                  <ul class="uk-list fs-xs">
                    <li v-for="(item, index) in group.slice(0, 5)" :key="index" class="uk-position-relative">
                      {{item.facility_name}}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div class="uk-width-2-3@m">
              <div v-if="hotel.gallery.length > 0" class="hotel-review-gallery" uk-slideshow="animation: pull">
                <div class="uk-position-relative">
                  <ul class="uk-slideshow-items">
                    <li v-for="(image, index) in hotel.gallery" :key="index">
                      <nuxt-img width="680" height="380" :src="imageLink(image.directus_files_id.id, 680, 380, 'webp', 85, 'contain')" class="uk-border-rounded" format="webp" preload :alt="clearImageName(image.directus_files_id.title)" />
                    </li>
                  </ul>

                  <a class="color-white uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous" title="Previous"></a>
                  <a class="color-white uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next" title="Next"></a>
                </div>

                <div class="hotel-review-gallery-nav uk-margin-small-top uk-margin-bottom">
                  <ul class="uk-thumbnav">
                    <li v-for="(image, index) in hotel.gallery" :key="index" :uk-slideshow-item="index+1" class="uk-margin-small-bottom">
                      <a href="#" title="Open Slide">
                        <nuxt-img width="60" height="60" :src="imageLink(image.directus_files_id.id, 60, 60, 'webp', 80)" :alt="clearImageName(image.directus_files_id.title)" class="uk-border-rounded" loading="lazy" format="webp" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div v-if="hotel.description" class="hotel-review-content">
                <EditorContent :content="hotel.description.blocks" />
              </div>

              <div v-if="hotel.faq" class="hotel-faq uk-margin-medium-top">
                <h3 class="hotel-faq-title">Hotel FAQ</h3>
                <ul class="content-faq uk-margin-large-bottom uk-accordion" uk-accordion>
                  <li v-for="(question, index) in hotel.faq" :key="index">
                    <a v-if="question.question" class="uk-accordion-title fw-medium use-transition" href="#" aria-expanded="true" title="Open the answer">
                      {{question.question}}
                    </a>
                    <div v-if="question.answer" class="uk-accordion-content color-black">
                      {{question.answer}}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
        
        <div class="uk-width-1-4@l">

          <SidebarAuthor :author="hotel.user_created" :date="hotel.date_updated" starter="Review by" class="uk-margin-medium-bottom" />

          <aside class="page-sidebar use-transition uk-position-sticky">
            <SidebarCheckAvailability :hotelName="hotel.title" :hotelID="hotel.booking_id" :hotelPrice="hotel.price" />

            <div v-if="hotel.location.length > 0" class="sidebar-box">
              <h4 class="fs-l">Staying options near?</h4>
              <ul class="sidebar-navigation uk-list uk-list-divider">
                <li v-for="(item, index) in hotel.location" :key="index">
                  <NuxtLink :to="item.location_id.parent ? locationLink(item.location_id.slug, item.location_id.parent.slug) : locationLink(item.location_id.slug, '')" activeClass="activeLink" class="color-dark-gray uk-position-relative use-transition">
                    Luxury Hotels in {{item.location_id.title}}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <SidebarAffiliateDisclosure />
          </aside>

        </div>
      </div>

    </main>

    <LazyFooterMain />
  </div>

</template>

<script setup>

  // Get started
  const { getItems } = useDirectusItems();
  const route = useRoute();

  // Define the API settings
  const config = useRuntimeConfig()
  const CMS_TOKEN = config.CMS_TOKEN
  const RA_KEY = config.RAPIDAPI_KEY
  const RA_HOST = config.RAPIDAPI_HOST

  // Set the slug
  const theSlug = route.params.slug

  // Get the data
  const thisHotel = await getItems({
    collection: 'hotels',
    params: {
      filter: {
        'status': 'published',
        'slug': {
          '_eq': theSlug
        }
      },
      fields: ['id', 'user_created.first_name', 'user_created.last_name', 'user_created.avatar', 'user_created.description', 'date_created', 'date_updated', 'title', 'image', 'gallery.directus_files_id.id', 'gallery.directus_files_id.title', 'blurb', 'description', 'location.location_id.slug', 'location.location_id.title', 'location.location_id.parent.slug', 'address', 'facilities', 'stars', 'price_from', 'booking_id', 'faq'],
    }
  });

  // Set the hotel
  const hotel = thisHotel[0];

  // Check for the hotel
  if (!hotel) {
    navigateTo('/hotels/')
  }

  // Get the hotels from Booking's API
  const { pending, data: hotelMeta, refresh } = await useLazyAsyncData(
    ''+hotel.id+'-singleHotelMeta',
    () => $fetch('https://booking-com.p.rapidapi.com/v1/hotels/facilities', {
      params: {
        'hotel_id': hotel.booking_id ? hotel.booking_id : '',
        'locale': 'en-gb'
      },
      headers: {
        'X-RapidAPI-Key': RA_KEY,
        'X-RapidAPI-Host': RA_HOST
      }
    }
  ))

  // Group amenities by groups
  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if(obj[key] === undefined) return hash; 
      return Object.assign(hash, { [obj[key]]:( hash[obj[key]] || [] ).concat(obj)})
    }, {})
  }

  // Remove the image extension to set the alt tag
  function clearImageName(image) {
    return image.replace(/\.[^.$]+$/, '');
  }

  // Set the FAQs
  const faqs = ref()
  if( hotel.faq ) {
    faqs.value = hotel.faq.map((entity) => {
      return {
        "@type": "Question",
        name: `${entity.question}`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${entity.answer}`,
        },
      };
    });
  }

  // Set the SEO meta
  useHead({
    title: hotel.title + ' Hotel Review',
    link: [
      { rel: 'canonical', href: config.FRONT_URL + route.fullPath, },
    ],
    meta: [
      { name: 'description', content: hotel.blurb ? hotel.blurb : hotel.title + 'Five-star hotel review' },
      { property: 'og:title', content: hotel.title + ' Hotel Review' },
      { property: 'og:description', content: hotel.blurb ? hotel.blurb : hotel.title + 'Five-star hotel review' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: config.FRONT_URL + route.fullPath },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'LuxuryHotel' },
      { property: 'og:image', content: hotel.image ? imageLink(hotel.image, 680, '', 'webp', 85, 'contain') : '/img/lh_facebook.jpg' },
      { property: 'og:image:alt', content: hotel.title + ' Hotel Review' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@luxuryhotelcom' },
      { name: 'twitter:title', content: hotel.title + ' Hotel Review' },
      { name: 'twitter:description', content: hotel.blurb ? hotel.blurb : hotel.title + 'Five-star hotel review' },
      { name: 'twitter:image', content: hotel.image ? imageLink(hotel.image, 680, '', 'webp', 85, 'contain') : '/img/lh_twitter.jpg' },
      { name: 'twitter:image:alt', content: hotel.title + ' Hotel Review' },
      { name: 'twitter:creator', content: '@luxuryhotelcom' },
    ]
  });

  // Create the JSON LD Schema
  useJsonld([
    {
      '@context': 'http://schema.org',
      '@type': 'WebPage',
      '@id': `${config.FRONT_URL}/#webpage`,
      'description': hotel.blurb ? hotel.blurb : hotel.title + 'Five-star hotel review',
      'name': hotel.title,
      'url': config.FRONT_URL + route.fullPath,
      'datePublished': hotel.date_created,
      'dateModified': hotel.date_updated,
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
    },
    {
      "@context": "http://schema.org",
      '@type': 'FAQPage',
      mainEntity: faqs.value,
    }
  ]);

</script>

<style>
  .hotel-review-amenities ul li {
    padding-left: 20px;
  }
  .hotel-review-amenities ul li:before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='14' height='14' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
    position: absolute;
    top: 2px;
    left: 0;
  }
  @media only screen and (min-width: 1200px) {
    .single-hotel-review .author-box {
      padding-top: 0;
    }
  }
</style>