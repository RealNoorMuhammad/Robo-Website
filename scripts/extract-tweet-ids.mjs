const urls = [
  'https://r.jina.ai/https://x.com/roboPBOC',
  'https://r.jina.ai/https://twitter.com/roboPBOC',
  'https://r.jina.ai/https://x.com/roboPBOC/media',
  'https://r.jina.ai/https://x.com/roboPBOC/with_replies',
  'https://r.jina.ai/https://x.com/roboPBOC/highlights',
]

const HANDLE = 'roboPBOC'
/** Only IDs that appear as @{handle}/status/{id} (avoids unrelated status links in markup). */
const re = new RegExp(`${HANDLE}/status/(\\d+)`, 'g')

async function main() {
  const order = []
  const seen = new Set()
  for (const u of urls) {
    const t = await fetch(u).then((r) => r.text())
    let m
    while ((m = re.exec(t))) {
      if (!seen.has(m[1])) {
        seen.add(m[1])
        order.push(m[1])
      }
    }
  }
  console.log('count', order.length)
  console.log(order.join(','))
}

main().catch(console.error)
