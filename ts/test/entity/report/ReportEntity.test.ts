

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { SpaceflightNewsSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ReportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when SPACEFLIGHT_NEWS_TEST_LIVE=TRUE.
  afterEach(liveDelay('SPACEFLIGHT_NEWS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = SpaceflightNewsSDK.test()
    const ent = testsdk.Report()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('report hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of SpaceflightNewsSDK.test(offline).Report().stream('list')) { }
    }, /offline/)

    for await (const _item of SpaceflightNewsSDK.test(offline).Report()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = SpaceflightNewsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Report().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of SpaceflightNewsSDK.test().Report().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new SpaceflightNewsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Report().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Report().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = SpaceflightNewsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Report().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.SPACEFLIGHT_NEWS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'report.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"authors":{"a":true,"h":"Authors","n":"authors","r":true,"t":"`$ARRAY`","union":{"branches":2,"count":6,"depth":5},"key$":"authors","index$":0},"id":{"a":true,"h":"Id","n":"id","r":true,"ro":true,"t":"`$INTEGER`","key$":"id","index$":1},"image_url":{"a":true,"fo":"uri","h":"Image Url","n":"image_url","r":true,"t":"`$STRING`","key$":"image_url","index$":2},"news_site":{"a":true,"h":"News Site","n":"news_site","r":true,"ro":true,"t":"`$STRING`","key$":"news_site","index$":3},"published_at":{"a":true,"fo":"date-time","h":"Published At","n":"published_at","r":true,"t":"`$STRING`","key$":"published_at","index$":4},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"t":"`$STRING`","key$":"summary","index$":5},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":6},"updated_at":{"a":true,"fo":"date-time","h":"Updated At","n":"updated_at","r":true,"ro":true,"t":"`$STRING`","key$":"updated_at","index$":7},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"t":"`$STRING`","key$":"url","index$":8}},"id":{"field":"id","name":"id"},"name":"report","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v4/reports/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"news_site","or":"news_site","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"news_site_exclude","or":"news_site_exclude","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"ordering","or":"ordering","r":false,"t":"`$ARRAY`","index$":4},{"a":true,"k":"query","n":"published_at_gt","or":"published_at_gt","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"published_at_gte","or":"published_at_gte","r":false,"t":"`$STRING`","index$":6},{"a":true,"k":"query","n":"published_at_lt","or":"published_at_lt","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"query","n":"published_at_lte","or":"published_at_lte","r":false,"t":"`$STRING`","index$":8},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":9},{"a":true,"k":"query","n":"summary_contain","or":"summary_contains","r":false,"t":"`$STRING`","index$":10},{"a":true,"k":"query","n":"summary_contains_all","or":"summary_contains_all","r":false,"t":"`$STRING`","index$":11},{"a":true,"k":"query","n":"summary_contains_one","or":"summary_contains_one","r":false,"t":"`$STRING`","index$":12},{"a":true,"k":"query","n":"title_contain","or":"title_contains","r":false,"t":"`$STRING`","index$":13},{"a":true,"k":"query","n":"title_contains_all","or":"title_contains_all","r":false,"t":"`$STRING`","index$":14},{"a":true,"k":"query","n":"title_contains_one","or":"title_contains_one","r":false,"t":"`$STRING`","index$":15},{"a":true,"k":"query","n":"updated_at_gt","or":"updated_at_gt","r":false,"t":"`$STRING`","index$":16},{"a":true,"k":"query","n":"updated_at_gte","or":"updated_at_gte","r":false,"t":"`$STRING`","index$":17},{"a":true,"k":"query","n":"updated_at_lt","or":"updated_at_lt","r":false,"t":"`$STRING`","index$":18},{"a":true,"k":"query","n":"updated_at_lte","or":"updated_at_lte","r":false,"t":"`$STRING`","index$":19}]},"k":"http","m":"GET","o":"/v4/reports/","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v4"},{"lit":"reports"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v4/reports/{id}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/v4/reports/{id}/","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v4"},{"lit":"reports"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"report","name__orig":"report","Name":"Report","name_":"report","name-":"report","NAME":"REPORT","index$":3}, {"active":true,"entity":"report","key$":"BasicReportFlow","kind":"basic","name":"BasicReportFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"report_ref01"}}]},{"a":true,"d":{},"i":{"ref":"report_ref01","srcdatavar":"report_ref01_data","suffix":"_dt0"},"m":{"id":"report01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-report_ref01"}}]}]}, 'Report', {"GET /v4/reports/":{"protocol":"http","parameters":[{"name":"limit","required":false,"in":"query","schema":{"type":"integer"},"index$":0},{"in":"query","name":"news_site","schema":{"type":"string"},"index$":1},{"in":"query","name":"news_site_exclude","schema":{"type":"string"},"index$":2},{"name":"offset","required":false,"in":"query","schema":{"type":"integer"},"index$":3},{"in":"query","name":"ordering","schema":{"type":"array","items":{"type":"string","enum":["-published_at","-updated_at","published_at","updated_at"]}},"explode":false,"style":"form","index$":4},{"in":"query","name":"published_at_gt","schema":{"type":"string","format":"date-time"},"index$":5},{"in":"query","name":"published_at_gte","schema":{"type":"string","format":"date-time"},"index$":6},{"in":"query","name":"published_at_lt","schema":{"type":"string","format":"date-time"},"index$":7},{"in":"query","name":"published_at_lte","schema":{"type":"string","format":"date-time"},"index$":8},{"name":"search","required":false,"in":"query","schema":{"type":"string"},"index$":9},{"in":"query","name":"summary_contains","schema":{"type":"string"},"index$":10},{"in":"query","name":"summary_contains_all","schema":{"type":"string"},"index$":11},{"in":"query","name":"summary_contains_one","schema":{"type":"string"},"index$":12},{"in":"query","name":"title_contains","schema":{"type":"string"},"index$":13},{"in":"query","name":"title_contains_all","schema":{"type":"string"},"index$":14},{"in":"query","name":"title_contains_one","schema":{"type":"string"},"index$":15},{"in":"query","name":"updated_at_gt","schema":{"type":"string","format":"date-time"},"index$":16},{"in":"query","name":"updated_at_gte","schema":{"type":"string","format":"date-time"},"index$":17},{"in":"query","name":"updated_at_lt","schema":{"type":"string","format":"date-time"},"index$":18},{"in":"query","name":"updated_at_lte","schema":{"type":"string","format":"date-time"},"index$":19}]},"GET /v4/reports/{id}/":{"protocol":"http","parameters":[{"in":"path","name":"id","schema":{"type":"integer"},"required":true,"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let report_ref01_data = Object.values(setup.data.existing.report)[0] as any

    // LIST
    const report_ref01_ent = client.Report()
    const report_ref01_match: any = {}

    const report_ref01_list = (await report_ref01_ent.list(report_ref01_match)).map((e: any) => e.data())


    // LOAD
    const report_ref01_match_dt0: any = {}
    report_ref01_match_dt0.id = report_ref01_data.id
    const report_ref01_data_dt0 = (await report_ref01_ent.load(report_ref01_match_dt0)).data()
    assert(report_ref01_data_dt0.id === report_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/report/ReportTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = SpaceflightNewsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['report01','report02','report03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'SPACEFLIGHT_NEWS_TEST_REPORT_ENTID': idmap,
    'SPACEFLIGHT_NEWS_TEST_LIVE': 'FALSE',
    'SPACEFLIGHT_NEWS_TEST_EXPLAIN': 'FALSE',
    'SPACEFLIGHT_NEWS_APIKEY': '',
  })

  idmap = env['SPACEFLIGHT_NEWS_TEST_REPORT_ENTID']

  const live = 'TRUE' === env.SPACEFLIGHT_NEWS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['SPACEFLIGHT_NEWS_TEST_REPORT_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new SpaceflightNewsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.SPACEFLIGHT_NEWS_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.SPACEFLIGHT_NEWS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
