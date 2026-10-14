"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "article",
        "accessor": "Article",
        "op": "list",
        "method": "GET",
        "path": "/v4/articles/",
        "args": [],
        "select": {
            "event": "v1",
            "has_event": "v1",
            "has_launch": "v1",
            "is_featured": "v1",
            "launch": "v1",
            "limit": "v1",
            "news_site": "v1",
            "news_site_exclude": "v1",
            "offset": "v1",
            "ordering": "v1",
            "published_at_gt": "v1",
            "published_at_gte": "v1",
            "published_at_lt": "v1",
            "published_at_lte": "v1",
            "search": "v1",
            "summary_contain": "v1",
            "summary_contains_all": "v1",
            "summary_contains_one": "v1",
            "title_contain": "v1",
            "title_contains_all": "v1",
            "title_contains_one": "v1",
            "updated_at_gt": "v1",
            "updated_at_gte": "v1",
            "updated_at_lt": "v1",
            "updated_at_lte": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "event",
            "has_event",
            "has_launch",
            "is_featured",
            "launch",
            "limit",
            "news_site",
            "news_site_exclude",
            "offset",
            "ordering",
            "published_at_gt",
            "published_at_gte",
            "published_at_lt",
            "published_at_lte",
            "search",
            "summary_contains",
            "summary_contains_all",
            "summary_contains_one",
            "title_contains",
            "title_contains_all",
            "title_contains_one",
            "updated_at_gt",
            "updated_at_gte",
            "updated_at_lt",
            "updated_at_lte"
        ],
        "queryArgs": [
            {
                "name": "event",
                "wire": "event"
            },
            {
                "name": "has_event",
                "wire": "has_event"
            },
            {
                "name": "has_launch",
                "wire": "has_launch"
            },
            {
                "name": "is_featured",
                "wire": "is_featured"
            },
            {
                "name": "launch",
                "wire": "launch"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "news_site",
                "wire": "news_site"
            },
            {
                "name": "news_site_exclude",
                "wire": "news_site_exclude"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "ordering",
                "wire": "ordering"
            },
            {
                "name": "published_at_gt",
                "wire": "published_at_gt"
            },
            {
                "name": "published_at_gte",
                "wire": "published_at_gte"
            },
            {
                "name": "published_at_lt",
                "wire": "published_at_lt"
            },
            {
                "name": "published_at_lte",
                "wire": "published_at_lte"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "summary_contain",
                "wire": "summary_contains"
            },
            {
                "name": "summary_contains_all",
                "wire": "summary_contains_all"
            },
            {
                "name": "summary_contains_one",
                "wire": "summary_contains_one"
            },
            {
                "name": "title_contain",
                "wire": "title_contains"
            },
            {
                "name": "title_contains_all",
                "wire": "title_contains_all"
            },
            {
                "name": "title_contains_one",
                "wire": "title_contains_one"
            },
            {
                "name": "updated_at_gt",
                "wire": "updated_at_gt"
            },
            {
                "name": "updated_at_gte",
                "wire": "updated_at_gte"
            },
            {
                "name": "updated_at_lt",
                "wire": "updated_at_lt"
            },
            {
                "name": "updated_at_lte",
                "wire": "updated_at_lte"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "title": "x",
                    "authors": [
                        {
                            "name": "x",
                            "socials": {}
                        }
                    ],
                    "url": "x",
                    "image_url": "x",
                    "news_site": "x",
                    "summary": "x",
                    "published_at": "2026-01-01T00:00:00Z",
                    "updated_at": "2026-01-01T00:00:00Z",
                    "featured": true,
                    "launches": [
                        {
                            "launch_id": "x",
                            "provider": "x"
                        }
                    ],
                    "events": [
                        {
                            "event_id": 1,
                            "provider": "x"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "article",
        "accessor": "Article",
        "op": "load",
        "method": "GET",
        "path": "/v4/articles/{id}/",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "id": 1,
            "title": "x",
            "authors": [
                {
                    "name": "x",
                    "socials": {
                        "x": "x",
                        "youtube": "x",
                        "instagram": "x",
                        "linkedin": "x",
                        "mastodon": "x",
                        "bluesky": "x"
                    }
                }
            ],
            "url": "x",
            "image_url": "x",
            "news_site": "x",
            "summary": "x",
            "published_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "featured": true,
            "launches": [
                {
                    "launch_id": "x",
                    "provider": "x"
                }
            ],
            "events": [
                {
                    "event_id": 1,
                    "provider": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "blog",
        "accessor": "Blog",
        "op": "list",
        "method": "GET",
        "path": "/v4/blogs/",
        "args": [],
        "select": {
            "event": "v1",
            "has_event": "v1",
            "has_launch": "v1",
            "is_featured": "v1",
            "launch": "v1",
            "limit": "v1",
            "news_site": "v1",
            "news_site_exclude": "v1",
            "offset": "v1",
            "ordering": "v1",
            "published_at_gt": "v1",
            "published_at_gte": "v1",
            "published_at_lt": "v1",
            "published_at_lte": "v1",
            "search": "v1",
            "summary_contain": "v1",
            "summary_contains_all": "v1",
            "summary_contains_one": "v1",
            "title_contain": "v1",
            "title_contains_all": "v1",
            "title_contains_one": "v1",
            "updated_at_gt": "v1",
            "updated_at_gte": "v1",
            "updated_at_lt": "v1",
            "updated_at_lte": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "event",
            "has_event",
            "has_launch",
            "is_featured",
            "launch",
            "limit",
            "news_site",
            "news_site_exclude",
            "offset",
            "ordering",
            "published_at_gt",
            "published_at_gte",
            "published_at_lt",
            "published_at_lte",
            "search",
            "summary_contains",
            "summary_contains_all",
            "summary_contains_one",
            "title_contains",
            "title_contains_all",
            "title_contains_one",
            "updated_at_gt",
            "updated_at_gte",
            "updated_at_lt",
            "updated_at_lte"
        ],
        "queryArgs": [
            {
                "name": "event",
                "wire": "event"
            },
            {
                "name": "has_event",
                "wire": "has_event"
            },
            {
                "name": "has_launch",
                "wire": "has_launch"
            },
            {
                "name": "is_featured",
                "wire": "is_featured"
            },
            {
                "name": "launch",
                "wire": "launch"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "news_site",
                "wire": "news_site"
            },
            {
                "name": "news_site_exclude",
                "wire": "news_site_exclude"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "ordering",
                "wire": "ordering"
            },
            {
                "name": "published_at_gt",
                "wire": "published_at_gt"
            },
            {
                "name": "published_at_gte",
                "wire": "published_at_gte"
            },
            {
                "name": "published_at_lt",
                "wire": "published_at_lt"
            },
            {
                "name": "published_at_lte",
                "wire": "published_at_lte"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "summary_contain",
                "wire": "summary_contains"
            },
            {
                "name": "summary_contains_all",
                "wire": "summary_contains_all"
            },
            {
                "name": "summary_contains_one",
                "wire": "summary_contains_one"
            },
            {
                "name": "title_contain",
                "wire": "title_contains"
            },
            {
                "name": "title_contains_all",
                "wire": "title_contains_all"
            },
            {
                "name": "title_contains_one",
                "wire": "title_contains_one"
            },
            {
                "name": "updated_at_gt",
                "wire": "updated_at_gt"
            },
            {
                "name": "updated_at_gte",
                "wire": "updated_at_gte"
            },
            {
                "name": "updated_at_lt",
                "wire": "updated_at_lt"
            },
            {
                "name": "updated_at_lte",
                "wire": "updated_at_lte"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "title": "x",
                    "authors": [
                        {
                            "name": "x",
                            "socials": {}
                        }
                    ],
                    "url": "x",
                    "image_url": "x",
                    "news_site": "x",
                    "summary": "x",
                    "published_at": "2026-01-01T00:00:00Z",
                    "updated_at": "2026-01-01T00:00:00Z",
                    "featured": true,
                    "launches": [
                        {
                            "launch_id": "x",
                            "provider": "x"
                        }
                    ],
                    "events": [
                        {
                            "event_id": 1,
                            "provider": "x"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "blog",
        "accessor": "Blog",
        "op": "load",
        "method": "GET",
        "path": "/v4/blogs/{id}/",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "id": 1,
            "title": "x",
            "authors": [
                {
                    "name": "x",
                    "socials": {
                        "x": "x",
                        "youtube": "x",
                        "instagram": "x",
                        "linkedin": "x",
                        "mastodon": "x",
                        "bluesky": "x"
                    }
                }
            ],
            "url": "x",
            "image_url": "x",
            "news_site": "x",
            "summary": "x",
            "published_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z",
            "featured": true,
            "launches": [
                {
                    "launch_id": "x",
                    "provider": "x"
                }
            ],
            "events": [
                {
                    "event_id": 1,
                    "provider": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "info",
        "accessor": "Info",
        "op": "list",
        "method": "GET",
        "path": "/v4/info/",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "version": "x",
            "news_sites": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "report",
        "accessor": "Report",
        "op": "list",
        "method": "GET",
        "path": "/v4/reports/",
        "args": [],
        "select": {
            "limit": "v1",
            "news_site": "v1",
            "news_site_exclude": "v1",
            "offset": "v1",
            "ordering": "v1",
            "published_at_gt": "v1",
            "published_at_gte": "v1",
            "published_at_lt": "v1",
            "published_at_lte": "v1",
            "search": "v1",
            "summary_contain": "v1",
            "summary_contains_all": "v1",
            "summary_contains_one": "v1",
            "title_contain": "v1",
            "title_contains_all": "v1",
            "title_contains_one": "v1",
            "updated_at_gt": "v1",
            "updated_at_gte": "v1",
            "updated_at_lt": "v1",
            "updated_at_lte": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "news_site",
            "news_site_exclude",
            "offset",
            "ordering",
            "published_at_gt",
            "published_at_gte",
            "published_at_lt",
            "published_at_lte",
            "search",
            "summary_contains",
            "summary_contains_all",
            "summary_contains_one",
            "title_contains",
            "title_contains_all",
            "title_contains_one",
            "updated_at_gt",
            "updated_at_gte",
            "updated_at_lt",
            "updated_at_lte"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "news_site",
                "wire": "news_site"
            },
            {
                "name": "news_site_exclude",
                "wire": "news_site_exclude"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "ordering",
                "wire": "ordering"
            },
            {
                "name": "published_at_gt",
                "wire": "published_at_gt"
            },
            {
                "name": "published_at_gte",
                "wire": "published_at_gte"
            },
            {
                "name": "published_at_lt",
                "wire": "published_at_lt"
            },
            {
                "name": "published_at_lte",
                "wire": "published_at_lte"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "summary_contain",
                "wire": "summary_contains"
            },
            {
                "name": "summary_contains_all",
                "wire": "summary_contains_all"
            },
            {
                "name": "summary_contains_one",
                "wire": "summary_contains_one"
            },
            {
                "name": "title_contain",
                "wire": "title_contains"
            },
            {
                "name": "title_contains_all",
                "wire": "title_contains_all"
            },
            {
                "name": "title_contains_one",
                "wire": "title_contains_one"
            },
            {
                "name": "updated_at_gt",
                "wire": "updated_at_gt"
            },
            {
                "name": "updated_at_gte",
                "wire": "updated_at_gte"
            },
            {
                "name": "updated_at_lt",
                "wire": "updated_at_lt"
            },
            {
                "name": "updated_at_lte",
                "wire": "updated_at_lte"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "title": "x",
                    "authors": [
                        {
                            "name": "x",
                            "socials": {}
                        }
                    ],
                    "url": "x",
                    "image_url": "x",
                    "news_site": "x",
                    "summary": "x",
                    "published_at": "2026-01-01T00:00:00Z",
                    "updated_at": "2026-01-01T00:00:00Z"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "report",
        "accessor": "Report",
        "op": "load",
        "method": "GET",
        "path": "/v4/reports/{id}/",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "id": 1,
            "title": "x",
            "authors": [
                {
                    "name": "x",
                    "socials": {
                        "x": "x",
                        "youtube": "x",
                        "instagram": "x",
                        "linkedin": "x",
                        "mastodon": "x",
                        "bluesky": "x"
                    }
                }
            ],
            "url": "x",
            "image_url": "x",
            "news_site": "x",
            "summary": "x",
            "published_at": "2026-01-01T00:00:00Z",
            "updated_at": "2026-01-01T00:00:00Z"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map