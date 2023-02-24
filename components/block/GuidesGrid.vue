<template>
  <section class="page-module uk-container uk-container-large">

    <div v-if="guides.data" class="guides-loop guides-grid uk-grid uk-child-width-1-1@s" :class="'uk-child-width-1-2@s uk-child-width-1-'+(props.columns - 1)+'@m uk-child-width-1-'+props.columns+'@l layout_'+props.layout" uk-grid>
      <template v-if="props.layout != 'cards_mixed'">
        <div v-for="guide in  guides.data" :key="guide.id" class="guides-grid-item guides-item-small">
          <NuxtLink :to="'/guides/'+guide.slug+'/'" :prefetch="false" :title="guide.title" class="guides-item-link bg-black uk-flex uk-position-relative uk-border-rounded">
            <div class="guides-grid-content uk-position-small uk-position-bottom-left uk-position-z-index">
              <h3 v-if="props.layout == 'cards' || props.layout == 'cards_mixed'" class="color-white fs-m">
                {{guide.title}}
              </h3>
              <p v-if="guide.content && countHotels(guide.content.blocks)" class="guides-hotels-sub uk-margin-remove-top uk-margin-remove-bottom uk-flex uk-flex-middle color-white">
                <span class="guides-hotels-num bg-secondary uk-border-circle fs-xxs uk-flex-inline uk-flex-center uk-flex-middle">{{countHotels(guide.content.blocks)}}</span>
                <span class="guides-hotels-label fs-s">hotel ideas</span>
              </p>
            </div>

            <nuxt-img v-if="guide.image" class="guides-grid-image uk-border-rounded use-transition" :src="imageLink(guide.image, 320, 260, 'webp', 85)" :alt="guide.title" loading="lazy" format="webp" placeholder />
            <nuxt-img v-else class="guides-grid-image uk-border-rounded use-transition" src="/img/placeholder.webp" :alt="guide.title" loading="lazy" format="webp" placeholder />
          </NuxtLink>

          <div v-if="props.layout == 'default'" class="guides-item-info uk-padding-small uk-margin-top">
            <NuxtLink :to="'/guides/'+guide.slug+'/'" class="sb-hotel-action">
              <h3 class="fs-l">{{guide.title}}</h3>
            </NuxtLink>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="uk-width-2-5@m uk-first-column">
          <div v-for="guide in guides.data.slice(0, 1)" :key="guide.id" class="guides-grid-item guides-item-big">
            <NuxtLink :to="'/guides/'+guide.slug+'/'" :prefetch="false" class="guides-item-link bg-black uk-flex uk-position-relative uk-border-rounded">
              <div class="guides-grid-content uk-position-large uk-position-bottom-left uk-position-z-index">
                <h3 class="color-white fs-l uk-margin-remove-bottom">
                  {{guide.title}}
                </h3>
                <p v-if="guide.content && countHotels(guide.content.blocks)" class="guides-hotels-sub uk-margin-remove-top uk-margin-remove-bottom uk-flex uk-flex-middle color-white">
                  <span class="guides-hotels-num bg-secondary uk-border-circle fs-xxs uk-flex-inline uk-flex-center uk-flex-middle">{{countHotels(guide.content.blocks)}}</span>
                  <span class="guides-hotels-label fs-s">hotel ideas</span>
                </p>
              </div>

              <nuxt-img v-if="guide.image" class="guides-grid-image uk-border-rounded use-transition" :src="imageLink(guide.image, 320, 260, 'webp', 85)" :alt="guide.title" loading="lazy" format="webp" placeholder />
              <nuxt-img v-else class="guides-grid-image uk-border-rounded use-transition" src="/img/placeholder.webp" :alt="guide.title" loading="lazy" format="webp" placeholder />
            </NuxtLink>
          </div>
        </div>

        <div class="uk-width-3-5@m">
          <div class="guides-inner-grid uk-child-width-1-1@s uk-child-width-1-2@m uk-grid" uk-grid="">
            <div v-for="guide in guides.data.slice(1, 5)" :key="guide.id" class="guides-grid-item guides-item-small">
              <NuxtLink :to="'/guides/'+guide.slug+'/'" :prefetch="false" class="guides-item-link bg-black uk-flex uk-position-relative uk-border-rounded">
                <div class="guides-grid-content uk-position-small uk-position-bottom-left uk-position-z-index">
                  <h3 v-if="props.layout == 'cards' || props.layout == 'cards_mixed'" class="color-white fs-m">
                    {{guide.title}}
                  </h3>
                  <p v-if="guide.content && countHotels(guide.content.blocks)" class="guides-hotels-sub uk-margin-remove-top uk-margin-remove-bottom uk-flex uk-flex-middle color-white">
                    <span class="guides-hotels-num bg-secondary uk-border-circle fs-xxs uk-flex-inline uk-flex-center uk-flex-middle">{{countHotels(guide.content.blocks)}}</span>
                    <span class="guides-hotels-label fs-s">hotel ideas</span>
                  </p>
                </div>

                <nuxt-img v-if="guide.image" class="guides-grid-image uk-border-rounded use-transition" :src="imageLink(guide.image, 320, 260, 'webp', 85)" :alt="guide.title" loading="lazy" format="webp" placeholder />
                <nuxt-img v-else class="guides-grid-image uk-border-rounded use-transition" src="/img/placeholder.webp" :alt="guide.title" loading="lazy" format="webp" placeholder />
              </NuxtLink>

            </div>
          </div>
        </div>
      </template>
    </div>

    <div v-if="props.pagination == 'enabled' && allGuides" class="hb-pagination uk-center">
      <pagination v-model="pageNumber" :records="allGuides.length" :per-page="props.number" @paginate="usePagination()" />
    </div>

  </section>
</template>

<script setup>

  // Import libraries
  // import Pagination from 'v-pagination-3'
  // Import libraries
  const Pagination = defineAsyncComponent(() =>
    import('v-pagination-3')
  )

  // Set the props
  const props = defineProps(['id', 'layout', 'columns', 'number', 'pagination'])

  // Get started
  const config = useRuntimeConfig();
  const CMS_TOKEN = config.CMS_TOKEN
  const { getItems } = useDirectusItems()

  // Define the basics
  const pageNumber = ref(1)

  // Get the hotels from Booking's API
  const { pending, data: guides, refresh } = await useAsyncData(
    ''+props.id+'_guides',
    () => $fetch(`${config.CMS_URL}/items/guides?filter[status][_eq]=published`, {
      params: {
        sort: 'date_created',
        limit: props.number ? props.number : 20,
        page: pageNumber.value
      },
    }
  ))

  // Get all the guides
  const allGuides = await getItems({
    collection: 'guides',
    params: {
      filter: {
        'status': 'published'
      },
      limit: -1
    }
  });

  // Definte the pagination function
  function usePagination() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    refresh()
  }

  // Count the hotel ideas in guide
  function countHotels(content) {
    if( content ) {
      let hotels = content.filter(post => {
        return post.type.includes('hotel')
      })
      return hotels.length
    } else {
      return 0
    }
  }

</script>

<style>
  .guides-item-big .guides-item-link {
    height: 500px;
  }
  .guides-item-small .guides-item-link {
    height: calc(250px - 20px);
  }
  .guides-hotels-sub {
    gap: 10px;
  }
  .guides-hotels-num {
    width: 26px;
    height: 26px;
  }
  .guides-hotels-label {
    opacity: .9;
    -webkit-text-shadow: 0 0 3px #000000a3;
    text-shadow: 0 0 3px #000000a3;
  }
  .guides-grid-item .guides-item-link:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 15px;
    height: 8px;
    width: calc(100% - 30px);
    background: var(--light-gray);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .guides-grid-item .guides-item-link,
  .guides-grid-item .guides-item-link:after{
    -moz-transition: all .2s cubic-bezier(0.4, 0, 1, 1);
    -webkit-transition: all .2s cubic-bezier(0.4, 0, 1, 1);
    transition: all .2s cubic-bezier(0.4, 0, 1, 1);
  }
  .guides-grid-item .guides-item-link:hover {
    -moz-transform: translateY(-5px);
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
  .guides-grid-item a:hover:after {
    height: 13px;
    width: calc(100% - 20px);
    left: 10px;
  }
  .guides-grid-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .guides-grid.layout_cards .guides-grid-image,
  .guides-grid.layout_cards_mixed .guides-grid-image {
    opacity: .6;
  }
  .guides-grid.layout_default .guides-grid-content {
    opacity: 0;
    bottom: -10px;
    transition: all .4s ease;
  }
  .guides-grid.layout_default .guides-grid-item:hover .guides-grid-content {
    opacity: 1;
    bottom: 0;
  }
  .guides-grid.layout_default .guides-grid-item:hover img {
    opacity: .5;
  }
  @media only screen and (max-width: 992px) {
    .guides-item-big .guides-item-link {
      height: 250px;
    }
    .guides-grid-content h3 {
      max-width: 70%;
    }
    .guides-grid-content h3.fs-l {
      margin-bottom: 0;
    }
  }
</style>