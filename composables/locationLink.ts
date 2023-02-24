export function locationLink(locationSlug, parentSlug) {
  if( parentSlug && locationSlug !== parentSlug ) {
    return '/in/'+parentSlug+'/'+locationSlug+'/'
  } else {
    return '/in/'+locationSlug+'/'
  }
}