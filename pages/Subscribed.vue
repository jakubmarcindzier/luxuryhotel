<template>
  <div>

    <Head>
      <Title>Successfully subscribed | LuxuryHotels</Title>
      <Meta name="description" content="You successfully subscribed to the luxuryhotel.com newsletter" />
    </Head>
    
    <HeaderMain background="white" color="dark" mode="sticky"/>

    <main id="main-content">
      <article class="page-content uk-container-xsmall uk-align-center uk-text-center uk-section">
        <nuxt-img class="subscribed-image uk-margin-medium-bottom" width="200" height="180" src="/img/subscribed.svg" alt="Successfully subscribed to our newsletter" loading="lazy" />
        <h1 class="subscribed-title fs-xl">Hey, you successfully subscribed to our newsletter!</h1>
        <p class="subscribed-text fs-l uk-margin-medium-bottom">Except no spam and only the best hotel deals and travel tips :)</p>

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

  </div>
</template>

<script setup>
  
  // Get the route query email
  const email = useRoute().query.email;
  const apikey = 'f890497d-108a-4cc1-bd08-c90ed8d32337';
  const listid = '2b77e788-29d7-11ed-9a32-0241b9615763';

  // Subscribe function
  const { subscribed } = await useFetch('https://emailoctopus.com/api/1.6/lists/'+listid+'/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      api_key: apikey,
      email_address: email,
      tags: ['luxuryhotel'],
      status: 'SUBSCRIBED'
    }
  })

</script>

<style>
  .subscribe-box-form:not(.has-success) button {
    pointer-events: none;
  }
  .subscribe-box-form.has-error input {
    box-shadow: 0 0 0 2px #d82013;
  }
  .subscribe-box-form.has-error button {
    background: #d82013;
  }
  .subscribe-box-form.has-success input {
    box-shadow: 0 0 0 2px var(--primary);
  }
  .subscribe-box-form.has-error button {
    background: #d82013;
  }
</style>