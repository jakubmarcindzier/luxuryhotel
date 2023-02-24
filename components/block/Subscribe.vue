<template>
  <section class="uk-container uk-container-large">
    <div class="subscribe-box uk-flex uk-flex-middle uk-flex-between uk-padding uk-border-rounded bg-dark color-white">
      <div class="subscribe-box-text">
        <h6 v-if="props.title" class="fs-xxl color-white uk-margin-small-bottom">{{props.title}}</h6>
        <p v-if="props.subtitle" class="uk-margin-remove">{{props.subtitle}}</p>
      </div>

      <div class="subscribe-box-form fancy-form uk-position-relative uk-width-1-1 uk-width-auto@m" :class="isEmailValid()">
        <input v-model="email" type="text" class="subscribe-input fs-s" placeholder="Your email address" aria-label="Subscribe email">
        <NuxtLink :to="'/subscribed?email='+email" target="_blank" class="subscribe-submit centrify bg-primary color-white uk-position-absolute uk-position-right use-transition" aria-label="Subscribe now button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send lh-svg">
            <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>

  // Set the props
  const props = defineProps(['id', 'title', 'subtitle'])

  // Set the subscriber data
  const email = ref('')
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

  // Check if the email is valid
  function isEmailValid() {
    return (email.value == "")? "" : (reg.test(email.value)) ? 'has-success' : 'has-error';
  }

  // Subscribe me functon
  async function subscribeMe() {
    if(email) {
      await navigateTo('/subscribed?email='+email.value)
    }
  }

</script>

<style>
  .subscribe-box-form .subscribe-input {
    width: 400px;
    max-width: calc(100% - 60px);
    height: 60px;
    border-radius: 30px;
    padding: 0 30px;
    border: none;
    outline: none;
  }
  .subscribe-box-form .subscribe-submit {
    width: 50px;
    height: 50px;
    top: 5px;
    right: 5px;
    border: none;
    border-radius: 100%;
  }
  .subscribe-box-form .subscribe-submit:hover {
    background: var(--secondary);
  }
  @media only screen and (max-width: 1024px) {
    .subscribe-box {
      flex-flow: column;
      gap: 20px;
    }
    .subscribe-box-form .subscribe-input {
      width: 100%;
    }
  }
</style>