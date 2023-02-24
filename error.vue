<template>

  <div>
    <Head>
      <Title>404 Nothing Found | LuxuryHotels</Title>
      <Meta name="description" content="Nothing found page" />
    </Head>
    
    <HeaderMain background="white" color="dark" mode="sticky"/>

    <main id="main-content">
      <article class="page-content uk-container-xsmall uk-align-center uk-text-center uk-section">
        <img class="404-image uk-margin-medium-bottom" src="/img/404.svg" alt="Nothing found">
        <h1 class="404-title">Ohh! Page Not Found</h1>
        <p class="404-text fs-l uk-margin-medium-bottom">We can’t seem to find the page you’re looking for</p>

        <div class="error-search fancy-form uk-position-relative uk-margin-auto-left uk-margin-auto-right uk-margin-medium-bottom">
          <span class="uk-position-small uk-position-absolute">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search lh-icon">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input @focus="openSearch()" type="text" class="error-search-input fs-s" placeholder="Find your destination...">
        </div>

        <NuxtLink to="/" class="uk-flex-inline uk-flex-middle fw-semibold">
          <svg class="uk-margin-small-right" width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7.5H1" stroke="#3AAFA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 13.5L1 7.5L7 1.5" stroke="#3AAFA9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Go back home
        </NuxtLink>
      </article>
    </main>

    <FooterMain />

    <OffcanvasErrorSearch />
  </div>

</template>

<script setup>

  // Import UIkit
  import UIkit from 'uikit';

  defineProps({
    error: Object
  })

  function openSearch() {
    UIkit.toggle('#errorSearch').toggle();
  }
</script>

<style>
  .error-search {
    max-width: 470px;
  }
  .error-search .error-search-input {
    width: 100%;
    max-width: calc(100% - 76px);
    height: 60px;
    padding: 0 30px 0 46px;
    outline: none;
    border-radius: 40px;
    border: 1px solid var(--light-gray);
  }
  .error-search span {
    top: 1px;
  }
</style>