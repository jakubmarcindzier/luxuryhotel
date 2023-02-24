// Get the library
import {create} from 'xmlbuilder2';

// Build the export function
export default defineEventHandler(async (event) => {

  // Get the runtime config
  const config = useRuntimeConfig()

  // Fetch all the links
  const sitemaps = [ 'pages', 'locations', 'guides', 'hotels' ]
  
  // Map the urls
  const sitemap = sitemaps.map(function(item){
    return {
      loc: config.FRONT_URL+'/api/sitemap-'+item+'.xml',
      lastmod: new Date().toISOString()
    }
  })
  
  // Build the XML file structure
  const urls = {
    sitemapindex: {
      "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      sitemap
    }
  }

  // Create the XML
  const root = create(urls, { version: '1.0' }); 
  
  // Convert the XML tree to string
  const xml = root.end({ prettyPrint: true });

  // Set the XML header
  event.res.setHeader('Content-Type', 'application/xml')

  // Output the XML
  return xml

})