/*
 Scrapes apartment images from the live site using Puppeteer and saves them to public/apartment-images.json
*/
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

async function scrape() {
  const url = 'https://www.casa-bamboo.com/apartments'
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  page.setDefaultTimeout(45000)
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('body', { timeout: 45000 })
    // Slowly scroll to trigger lazy loading in galleries
    await page.evaluate(async () => {
      const sleep = (ms) => new Promise(r => setTimeout(r, ms))
      let y = 0
      const step = Math.max(200, Math.floor(window.innerHeight * 0.6))
      while (y < document.body.scrollHeight) {
        y += step
        window.scrollTo({ top: y, behavior: 'instant' })
        await sleep(350)
      }
      // small bounce back up to force more loads
      for (let i = 0; i < 3; i++) {
        window.scrollTo({ top: Math.max(0, y - (i + 1) * step), behavior: 'instant' })
        await sleep(250)
        window.scrollTo({ top: y, behavior: 'instant' })
        await sleep(250)
      }
    })

    const images = await page.evaluate(() => {
      const urls = new Set()
      document.querySelectorAll('img').forEach(img => {
        const s = img.getAttribute('src') || ''
        const srcset = img.getAttribute('srcset') || ''
        if (s.includes('static.wixstatic.com/media')) urls.add(s)
        if (srcset) {
          srcset.split(',').forEach(part => {
            const u = part.trim().split(' ')[0]
            if (u && u.includes('static.wixstatic.com/media')) urls.add(u)
          })
        }
        const ds = img.getAttribute('data-src') || ''
        if (ds && ds.includes('static.wixstatic.com/media')) urls.add(ds)
      })
      document.querySelectorAll('*').forEach(el => {
        const bg = getComputedStyle(el).backgroundImage
        if (bg && bg.includes('static.wixstatic.com/media')) {
          const m = bg.match(/url\(["']?(.*?)["']?\)/)
          if (m && m[1]) urls.add(m[1])
        }
      })
      // Normalize Wix resizer URLs to a larger size where possible by removing small w_,h_ patterns
      const list = Array.from(urls)
        .filter(u => /(\.jpg|\.jpeg|\.png|\.webp)(\?|$)/i.test(u))
        .map(u => u.replace(/\s/g, '%20'))
      return list
    })

    const outDir = path.join(__dirname, '..', 'public')
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
    const outPath = path.join(outDir, 'apartment-images.json')
    const data = { scrapedAt: new Date().toISOString(), count: images.length, images }
    fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`Saved ${images.length} images to ${outPath}`)
  } finally {
    await browser.close()
  }
}

scrape().catch(err => {
  console.error('Scrape failed:', err)
  process.exit(1)
})
