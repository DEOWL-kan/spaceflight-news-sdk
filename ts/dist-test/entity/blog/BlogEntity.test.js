"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BlogEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when SPACEFLIGHT_NEWS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('SPACEFLIGHT_NEWS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.SpaceflightNewsSDK.test();
        const ent = testsdk.Blog();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('blog hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.SpaceflightNewsSDK.test(offline).Blog().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.SpaceflightNewsSDK.test(offline).Blog()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.SpaceflightNewsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Blog().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.SpaceflightNewsSDK.test().Blog().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.SpaceflightNewsSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Blog().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Blog().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.SpaceflightNewsSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Blog().list({ "has_event": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.SPACEFLIGHT_NEWS_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'blog.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "authors": { "a": true, "h": "Authors", "n": "authors", "r": true, "t": "`$ARRAY`", "union": { "branches": 2, "count": 6, "depth": 5 }, "key$": "authors", "index$": 0 }, "events": { "a": true, "h": "Events", "n": "events", "r": true, "t": "`$ARRAY`", "key$": "events", "index$": 1 }, "featured": { "a": true, "h": "Featured", "n": "featured", "r": false, "t": "`$BOOLEAN`", "key$": "featured", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "ro": true, "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "image_url": { "a": true, "fo": "uri", "h": "Image Url", "n": "image_url", "r": true, "t": "`$STRING`", "key$": "image_url", "index$": 4 }, "launches": { "a": true, "h": "Launches", "n": "launches", "r": true, "t": "`$ARRAY`", "key$": "launches", "index$": 5 }, "news_site": { "a": true, "h": "News Site", "n": "news_site", "r": true, "ro": true, "t": "`$STRING`", "key$": "news_site", "index$": 6 }, "published_at": { "a": true, "fo": "date-time", "h": "Published At", "n": "published_at", "r": true, "t": "`$STRING`", "key$": "published_at", "index$": 7 }, "summary": { "a": true, "h": "Summary", "n": "summary", "r": true, "t": "`$STRING`", "key$": "summary", "index$": 8 }, "title": { "a": true, "h": "Title", "n": "title", "r": true, "t": "`$STRING`", "key$": "title", "index$": 9 }, "updated_at": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updated_at", "r": true, "ro": true, "t": "`$STRING`", "key$": "updated_at", "index$": 10 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": true, "t": "`$STRING`", "key$": "url", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "blog", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v4/blogs/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "event", "or": "event", "r": false, "t": "`$ARRAY`", "index$": 0 }, { "a": true, "k": "query", "n": "has_event", "or": "has_event", "r": false, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "k": "query", "n": "has_launch", "or": "has_launch", "r": false, "t": "`$BOOLEAN`", "index$": 2 }, { "a": true, "k": "query", "n": "is_featured", "or": "is_featured", "r": false, "t": "`$BOOLEAN`", "index$": 3 }, { "a": true, "k": "query", "n": "launch", "or": "launch", "r": false, "t": "`$ARRAY`", "index$": 4 }, { "a": true, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 5 }, { "a": true, "k": "query", "n": "news_site", "or": "news_site", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "query", "n": "news_site_exclude", "or": "news_site_exclude", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 8 }, { "a": true, "k": "query", "n": "ordering", "or": "ordering", "r": false, "t": "`$ARRAY`", "index$": 9 }, { "a": true, "k": "query", "n": "published_at_gt", "or": "published_at_gt", "r": false, "t": "`$STRING`", "index$": 10 }, { "a": true, "k": "query", "n": "published_at_gte", "or": "published_at_gte", "r": false, "t": "`$STRING`", "index$": 11 }, { "a": true, "k": "query", "n": "published_at_lt", "or": "published_at_lt", "r": false, "t": "`$STRING`", "index$": 12 }, { "a": true, "k": "query", "n": "published_at_lte", "or": "published_at_lte", "r": false, "t": "`$STRING`", "index$": 13 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 14 }, { "a": true, "k": "query", "n": "summary_contain", "or": "summary_contains", "r": false, "t": "`$STRING`", "index$": 15 }, { "a": true, "k": "query", "n": "summary_contains_all", "or": "summary_contains_all", "r": false, "t": "`$STRING`", "index$": 16 }, { "a": true, "k": "query", "n": "summary_contains_one", "or": "summary_contains_one", "r": false, "t": "`$STRING`", "index$": 17 }, { "a": true, "k": "query", "n": "title_contain", "or": "title_contains", "r": false, "t": "`$STRING`", "index$": 18 }, { "a": true, "k": "query", "n": "title_contains_all", "or": "title_contains_all", "r": false, "t": "`$STRING`", "index$": 19 }, { "a": true, "k": "query", "n": "title_contains_one", "or": "title_contains_one", "r": false, "t": "`$STRING`", "index$": 20 }, { "a": true, "k": "query", "n": "updated_at_gt", "or": "updated_at_gt", "r": false, "t": "`$STRING`", "index$": 21 }, { "a": true, "k": "query", "n": "updated_at_gte", "or": "updated_at_gte", "r": false, "t": "`$STRING`", "index$": 22 }, { "a": true, "k": "query", "n": "updated_at_lt", "or": "updated_at_lt", "r": false, "t": "`$STRING`", "index$": 23 }, { "a": true, "k": "query", "n": "updated_at_lte", "or": "updated_at_lte", "r": false, "t": "`$STRING`", "index$": 24 }] }, "k": "http", "m": "GET", "o": "/v4/blogs/", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v4" }, { "lit": "blogs" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v4/blogs/{id}/", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v4/blogs/{id}/", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v4" }, { "lit": "blogs" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "blog", "name__orig": "blog", "Name": "Blog", "name_": "blog", "name-": "blog", "NAME": "BLOG", "index$": 1 }, { "active": true, "entity": "blog", "key$": "BasicBlogFlow", "kind": "basic", "name": "BasicBlogFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "blog_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "blog_ref01", "srcdatavar": "blog_ref01_data", "suffix": "_dt0" }, "m": { "id": "blog01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-blog_ref01" } }] }] }, 'Blog', { "GET /v4/blogs/": { "protocol": "http", "parameters": [{ "in": "query", "name": "event", "schema": { "type": "array", "items": { "type": "integer" } }, "explode": false, "style": "form", "index$": 0 }, { "in": "query", "name": "has_event", "schema": { "type": "boolean" }, "index$": 1 }, { "in": "query", "name": "has_launch", "schema": { "type": "boolean" }, "index$": 2 }, { "in": "query", "name": "is_featured", "schema": { "type": "boolean" }, "index$": 3 }, { "in": "query", "name": "launch", "schema": { "type": "array", "items": { "type": "string", "format": "uuid" } }, "explode": false, "style": "form", "index$": 4 }, { "name": "limit", "required": false, "in": "query", "schema": { "type": "integer" }, "index$": 5 }, { "in": "query", "name": "news_site", "schema": { "type": "string" }, "index$": 6 }, { "in": "query", "name": "news_site_exclude", "schema": { "type": "string" }, "index$": 7 }, { "name": "offset", "required": false, "in": "query", "schema": { "type": "integer" }, "index$": 8 }, { "in": "query", "name": "ordering", "schema": { "type": "array", "items": { "type": "string", "enum": ["-published_at", "-updated_at", "published_at", "updated_at"] } }, "explode": false, "style": "form", "index$": 9 }, { "in": "query", "name": "published_at_gt", "schema": { "type": "string", "format": "date-time" }, "index$": 10 }, { "in": "query", "name": "published_at_gte", "schema": { "type": "string", "format": "date-time" }, "index$": 11 }, { "in": "query", "name": "published_at_lt", "schema": { "type": "string", "format": "date-time" }, "index$": 12 }, { "in": "query", "name": "published_at_lte", "schema": { "type": "string", "format": "date-time" }, "index$": 13 }, { "name": "search", "required": false, "in": "query", "schema": { "type": "string" }, "index$": 14 }, { "in": "query", "name": "summary_contains", "schema": { "type": "string" }, "index$": 15 }, { "in": "query", "name": "summary_contains_all", "schema": { "type": "string" }, "index$": 16 }, { "in": "query", "name": "summary_contains_one", "schema": { "type": "string" }, "index$": 17 }, { "in": "query", "name": "title_contains", "schema": { "type": "string" }, "index$": 18 }, { "in": "query", "name": "title_contains_all", "schema": { "type": "string" }, "index$": 19 }, { "in": "query", "name": "title_contains_one", "schema": { "type": "string" }, "index$": 20 }, { "in": "query", "name": "updated_at_gt", "schema": { "type": "string", "format": "date-time" }, "index$": 21 }, { "in": "query", "name": "updated_at_gte", "schema": { "type": "string", "format": "date-time" }, "index$": 22 }, { "in": "query", "name": "updated_at_lt", "schema": { "type": "string", "format": "date-time" }, "index$": 23 }, { "in": "query", "name": "updated_at_lte", "schema": { "type": "string", "format": "date-time" }, "index$": 24 }] }, "GET /v4/blogs/{id}/": { "protocol": "http", "parameters": [{ "in": "path", "name": "id", "schema": { "type": "integer" }, "required": true, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let blog_ref01_data = Object.values(setup.data.existing.blog)[0];
        // LIST
        const blog_ref01_ent = client.Blog();
        const blog_ref01_match = {};
        const blog_ref01_list = (await blog_ref01_ent.list(blog_ref01_match)).map((e) => e.data());
        // LOAD
        const blog_ref01_match_dt0 = {};
        blog_ref01_match_dt0.id = blog_ref01_data.id;
        const blog_ref01_data_dt0 = (await blog_ref01_ent.load(blog_ref01_match_dt0)).data();
        (0, node_assert_1.default)(blog_ref01_data_dt0.id === blog_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/blog/BlogTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.SpaceflightNewsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['blog01', 'blog02', 'blog03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'SPACEFLIGHT_NEWS_TEST_BLOG_ENTID': idmap,
        'SPACEFLIGHT_NEWS_TEST_LIVE': 'FALSE',
        'SPACEFLIGHT_NEWS_TEST_EXPLAIN': 'FALSE',
        'SPACEFLIGHT_NEWS_APIKEY': '',
    });
    idmap = env['SPACEFLIGHT_NEWS_TEST_BLOG_ENTID'];
    const live = 'TRUE' === env.SPACEFLIGHT_NEWS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['SPACEFLIGHT_NEWS_TEST_BLOG_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.SpaceflightNewsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=BlogEntity.test.js.map