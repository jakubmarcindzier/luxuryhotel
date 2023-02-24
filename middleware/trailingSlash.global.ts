export default defineNuxtRouteMiddleware( async(to) => {
  if (to.path.slice(-1) !== '/') {
    return redirectMeTo(to.path+'/', 301)
  }
});
