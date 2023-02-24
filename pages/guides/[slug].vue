<template>

  <div>
    <HeaderMain background="white" color="dark" mode="sticky" />

    <main id="content-main" class="single-guide uk-container uk-container-large">

      <div class="single-guide-cover uk-block uk-position-relative uk-margin-medium-top uk-margin-medium-bottom uk-overflow-hidden">
        <nuxt-img v-if="guide.image" :src="imageLink(guide.image, 1400, 460)" width="1400" height="460" :alt="guide.title" class="uk-border-rounded" format="webp" preload />
        <div class="uk-overlay-primary uk-position-cover uk-border-rounded"></div>
        <div class="uk-overlay uk-light uk-position-bottom">
          <Breadcrumbs :current="guide.title.slice(0, 25)+'...'" parentName="Guides" parentLink="/guides" />
          <h1 class="single-guide-title page-headihg-title fw-medium fs-xxxl uk-margin-small-bottom">{{guide.title}}</h1>
          <p class="fs-xs fw-light uk-margin-remove-top">Last updated on {{ dateUpdated(guide.date_updated) }}</p>
        </div>
      </div>

      <div class="page-with-sidebar uk-grid" uk-grid>
        
        <div class="uk-width-3-4@m uk-first-column">
          <article class="page-content content-with-sidebar">
            <EditorContent v-if="guide.content" :content="guide.content.blocks" />
          </article>
        </div>
        
        <div class="uk-width-1-4@m">
          <aside class="page-sidebar use-transition uk-position-sticky">

            <SidebarAuthor :author="guide.author" :date="guide.date_updated" starter="Guide by" />
            <SidebarAffiliateDisclosure />
            <SidebarGuideRelatedLocations :guide="guide.id" />

            <h5 class="uk-margin-bottom">Latest Guides</h5>
            <div v-if="guides" class="sidebar-guides">
              <div v-for="item in guides" :key="item.id" class="guides-grid-item uk-margin-medium-bottom">
                <NuxtLink :to="'/guides/'+item.slug+'/'" class="guides-item-link bg-black uk-flex uk-position-relative uk-border-rounded" :title="item.title">
                  <div class="guides-grid-content uk-position-small uk-position-bottom-left uk-position-z-index">
                    <p v-if="item.content && countHotels(item.content.blocks)" class="guides-hotels-sub uk-margin-remove-top uk-margin-remove-bottom uk-flex uk-flex-middle color-white">
                      <span class="guides-hotels-num bg-secondary uk-border-circle fs-xxs uk-flex-inline uk-flex-center uk-flex-middle">{{countHotels(item.content.blocks)}}</span>
                      <span class="guides-hotels-label fs-s">hotel ideas</span>
                    </p>
                  </div>
                  <nuxt-img v-if="item.image" :src="imageLink(item.image, 380, 250, 'webp', 85)" width="380" height="250" loading="lazy" format="webp" alt="{{ item.title }}" class="guides-grid-image uk-border-rounded use-transition" />
                </NuxtLink>

                <h4 class="fs-m uk-margin-top uk-text-center">{{item.title}}</h4>
              </div>
            </div>
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
  const config = useRuntimeConfig();

  // Get the data
  const theGuide = await getItems({
    collection: 'guides',
    params: {
      filter: {
        'status': 'published',
        'slug': {
          '_eq': route.params.slug
        }
      },
      fields: ['id', 'author.first_name', 'author.last_name', 'author.avatar', 'author.description', 'date_created', 'date_updated', 'title', 'image', 'content'],
    }
  });

  // Set the current guide
  const guide = theGuide[0];

  // Check if guide exists
  if (!guide) {
    showError(404, 'Nothing Found')
  }

  // Get the latest guides
  const guides = await getItems({
    collection: 'guides',
    params: {
      filter: {
        'status': 'published',
        'id': {
          '_nin': guide.id
        }
      },
      fields: ['id', 'title', 'slug', 'image', 'content'],
      limit: 3,
      sort: 'date_created'
    }
  });

  // Set the Date updated
  function dateUpdated( date ) {
    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    let guideDate = new Date(date).toLocaleDateString('en-US', options)
    return guideDate
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

  // Set the SEO meta
  useHead({
    title: guide.title,
    link: [
      { rel: 'canonical', href: config.FRONT_URL + route.fullPath, },
    ],
    meta: [
      { name: 'description', content: guide.content ? guide.content.blocks[0].data.text : '' },
      { property: 'og:title', content: guide.title ? guide.title : 'LuxuryHotel Guide' },
      { property: 'og:description', content: guide.content ? guide.content.blocks[0].data.text : '' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: config.FRONT_URL + route.fullPath },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'LuxuryHotel' },
      { property: 'og:image', content: imageLink(guide.image, 1200, 627) ? imageLink(guide.image, 1200, 627) : '/img/lh_facebook.jpg' },
      { property: 'og:image:alt', content: guide.title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@luxuryhotelcom' },
      { name: 'twitter:title', content: guide.title ? guide.title : 'LuxuryHotel Guide' },
      { name: 'twitter:description', content: guide.content ? guide.content.blocks[0].data.text : '' },
      { name: 'twitter:image', content: imageLink(guide.image, 600, 330) ? imageLink(guide.image, 600, 330) : '/img/lh_twitter.jpg' },
      { name: 'twitter:image:alt', content: guide.title ? guide.title : 'LuxuryHotel Guide' },
      { name: 'twitter:creator', content: '@luxuryhotelcom' },
    ]
  });

  // Create the JSON LD Schema
  useJsonld({
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': guide.title,
    'description': guide.content ? guide.content.blocks[0].data.text : '',
    'image': guide.image ? imageLink(guide.image, 1400, 460) : '',
    'author': {
      '@type': 'Organization',
      'name': 'LuxuryHotel',
      'url': `${config.FRONT_URL}`
    },  
    'publisher': {
      '@type': 'Organization',
      'name': 'LuxuryHotel',
      'logo': {
        '@type': 'ImageObject',
        'url': `${config.FRONT_URL}/img/logo.svg`
      }
    },
    'datePublished': guide.date_created,
    'dateModified': guide.date_updated,
    'inLanguage': 'en-US',
    'about': {
      '@id': `${config.FRONT_URL}/#identity`
    },
    'isPartOf': {
      '@id': `${config.FRONT_URL}/#website`
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
  .single-guide-cover {
    min-height: 460px;
  }
  .single-guide-cover img {
    max-width: unset;
  }
  .single-guide-title {
    max-width: 760px;
  }
  .single-guide-image:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50px;
    height: 20px;
    width: calc(100% - 100px);
    background: var(--slate);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .single-guide-content figure img {
    width: 100%;
  }
  .single-guide .editorjs-content {
    padding: 0 50px;
  }
  .single-guide figure {
    margin-left: -50px;
    margin-right: -50px;
  }
  @media only screen and (max-width: 600px) {
    .single-guide-cover {
      min-height: 260px;
    }
    .single-guide-title {
      font-size: 30px;
    }
    .single-guide .editorjs-content {
      padding: 0 10px;
    }
    .single-guide figure {
      margin: 20px 0;
    }
  }
</style>