// Fetch the Spaceflight News API OpenAPI spec into def/snapi.json, keeping the
// interface (paths, parameters, schemas) and dropping its prose (`description`,
// `example`), which carries no stated license. Run before `npm run generate`.
// Written for the SNAPI spec's shape (no component schema named `description`).
import { writeFileSync } from 'node:fs'

const res = await fetch('https://api.spaceflightnewsapi.net/v4/schema/?format=json')
if (!res.ok) throw new Error(`spec fetch failed: HTTP ${res.status}`)

const PROSE = new Set(['description', 'example'])
const strip = (v, parent) =>
  Array.isArray(v) ? v.map((x) => strip(x))
  : v && 'object' === typeof v
    ? Object.fromEntries(Object.entries(v)
        // Under `properties` the keys are field names, not prose.
        .filter(([k]) => 'properties' === parent || !PROSE.has(k))
        .map(([k, x]) => [k, strip(x, k)]))
    : v

const spec = strip(await res.json())
writeFileSync(new URL('../def/snapi.json', import.meta.url), JSON.stringify(spec, null, 2) + '\n')
console.log(`def/snapi.json: OpenAPI ${spec.openapi}, ${spec.info.version}, ${Object.keys(spec.paths).length} paths`)
