const path = require('path')
const fs = require('fs')

exports.createSiteMapXml = function(dietitians, posts) {
  // define our destination folder and sitemap file name
  const dest = path.resolve('./public', 'sitemap.xml');

  const hostname = 'https://diyetkocum.net'

  var urls = ['', '/blog', '/enler']

  dietitians.forEach(d => {
    urls.push(`/${d.username}`)
    urls.push(`/diyetisyen/${d.name}`)
  })

  posts.forEach(p => {
    urls.push(`/${p.username}/blog/${p.post}`)
  })

var urlsStr = urls.map(u => `
  <url>
    <loc>${hostname}${u}</loc>
  </url>`).join('')

  var str = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsStr}
</urlset>
  `

  //console.log(str)

  // write sitemap.xml file in /public folder
  // Access the sitemap content by converting it with .toString() method
  fs.writeFileSync(dest, str)
}