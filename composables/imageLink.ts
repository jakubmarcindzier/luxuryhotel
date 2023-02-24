export function imageLink(id, width = 100, height = 100, format = 'webp', quality = 85, fit = 'cover') {

  // Get the runtime config
  const config = useRuntimeConfig()

  // Set custom atts
  const att_width = width ? `width=${width}` : ``
  const att_heigth = height ? `height=${height}` : ``

  const sizes = [att_width, att_heigth].join('&')

  // Return the link
  return `${config.CMS_URL}/assets/${id}?${sizes}&format=${format}&quality=${quality}&fit=${fit}`
}