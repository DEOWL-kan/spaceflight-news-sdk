# Voxgig SDK Generator — developer experience report

## API selected and rationale

[Spaceflight News API](https://spaceflightnewsapi.net) (SNAPI) v4 by The Space Devs. It is free, needs no key, is read-only, and publishes a small OpenAPI 3.0.3 spec (7 paths: articles, blogs, reports, info), so a real call can be shown without side effects.

To check the catalogue for duplicates, I listed all 804 `voxgig-sdk` repos. Names and descriptions had no `spaceflight`/`snapi` match, and the READMEs of the space-related repos (`launch-library2-sdk` is another API from the same provider) did not use its domain. A GitHub code search for the domain found nothing. Code search does not index everything, so this rules out a duplicate within those checks only.

## Environment and tooling

macOS, Node 24.20.0 (also tried 26.8.1), `@voxgig/create-sdkgen` 0.30.7, `@voxgig/sdkgen` 4.34.5, `@voxgig/apidef` 8.25.2. TypeScript target only.

## Steps taken

1. `npm create @voxgig/sdkgen@latest -- spaceflight-news -o spaceflight-news-sdk -d snapi.yaml`
2. Set `server: 'https://api.spaceflightnewsapi.net'` in `.sdk/build/apidef.js` (the spec has no `servers`).
3. `npx voxgig-sdkgen target add ts && npm run generate`, then `npm install && npm run build && npm test` in `ts/`.
4. Switched the input to a prose-stripped JSON spec (`.sdk/build/fetch-def.mjs`, see below). Set publisher, repo path and package name in `.sdk/model/project.aontu`, then regenerated from scratch.
5. Wrote `examples/list-articles.ts`.

## Outcome

- Generation: succeeded, with 4 entities: Article, Blog and Report offer `list` and `load`, and Info offers `list`.
- Build: succeeded.
- Offline tests (Node 24): 238 passed, 0 failed, 12 skipped. The skipped tests cover features this SDK does not enable.
- Real call: `client.Article().list({ limit: 3 })` returned 3 live articles. A logging `fetch` showed the request went to `https://api.spaceflightnewsapi.net/v4/articles/?limit=3`, and I matched each id against a separate `curl`. `load({ id })` returned the same id. The paginated envelope (`count/next/results`) is unwrapped into entities automatically.

## Developer experience observations

- **Fast to a working SDK.** Three commands produced an SDK that built and passed its tests. Entities matched the spec's resources with no model editing.
- **Node 26 breaks the generated README test.** With Node 26.8.1, 3 tests in `readme_examples.test.ts` fail with `The property 'options.mode' must be one of: 'strip'. Received 'transform'` (from `stripTypeScriptTypes`). On Node 24 LTS they pass. The tutorial does ask for "a recent LTS", but the error does not point back to that.
- **Defaults carry Voxgig's identity.** Until `main.kit.publisher` and `main.kit.repo` were set, the LICENSE said "Copyright (c) 2026 Voxgig", and the README pointed installs at `github.com/voxgig-sdk/...` under the `@voxgig-sdk` scope. `model.md` documents the fix clearly. The quick start does not mention it, so an outside user could easily publish with the wrong licence holder.
- **Existing files are overwritten silently.** The scaffold accepted a non-empty directory. Generation then replaced my own `AGENTS.md`/`CLAUDE.md` at the repo root without any warning.
- **Spec prose is copied verbatim.** `info.description` (including a maintainer email) and every parameter description went into the README, SUMMARY and test fixtures. That is fine for your own API. For a third-party spec with no stated licence, I stripped `description`/`example` in a small fetch script (`.sdk/build/fetch-def.mjs`) before generating. The stripped spec I generated from had sha256 `4341883d2073f3f7cb6d67f655b95930a67253dc56d1dfdce13de2800cc01686` (SNAPI 4.33.0). What remains in the SDK are interface facts: paths, parameter and field names, and types. I assume these can be republished, since a client needs them to interoperate.
- **The README suggests an API key the spec doesn't have.** The spec defines no security scheme, yet the generated README shows `apikey: process.env.SPACEFLIGHT_NEWS_APIKEY`.

## Suggested improvements

1. Have `create-sdkgen` ask for (or take flags for) publisher and repo path, or at least flag them in the quick start.
2. Make the README examples test use `mode: 'strip'`, or narrow the generated `engines` (currently `>=22.13`, which admits Node 26).
3. Warn before overwriting pre-existing untracked files, and omit the `apikey` snippet when the spec declares no security scheme.

## Time and AI assistance

- Active human time: **about 11 minutes** (applicant-reported). That is 1 minute choosing the API and 10 minutes reviewing the plan, results and decisions.
- AI: Claude Code (model reported by the session: Claude Opus 5.5) did the API selection, plan, generation, example, verification and this draft. OpenAI Codex reviewed the plan and the implementation in read-only mode. By Claude's own log, the implementation took about 15 minutes of wall-clock time (18:22–18:37 local), including the verification reruns.
