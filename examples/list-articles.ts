// List the three latest articles from the Spaceflight News API using the
// generated SDK. No API key needed. Build the SDK first (cd ts && npm run build).
import { SpaceflightNewsSDK } from '../ts/dist/SpaceflightNewsSDK.js'

const client = new SpaceflightNewsSDK()

const articles = await client.Article().list({ limit: 3 })

for (const article of articles) {
  const { id, title, news_site, published_at } = article.data()
  console.log(`${id}  ${published_at}  [${news_site}]  ${title}`)
}
