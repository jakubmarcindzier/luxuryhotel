import UIkit from 'uikit';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$UIkit = UIkit;
  nuxtApp.provide("UIkit", UIkit);
})