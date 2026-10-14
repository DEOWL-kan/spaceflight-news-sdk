# SpaceflightNews TypeScript SDK Reference

Complete API reference for the SpaceflightNews TypeScript SDK.


## SpaceflightNewsSDK

### Constructor

```ts
new SpaceflightNewsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `SpaceflightNewsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = SpaceflightNewsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `SpaceflightNewsSDK` instance in test mode.


### Instance Methods

#### `Article(data?: object)`

Create a new `Article` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArticleEntity` instance.

#### `Blog(data?: object)`

Create a new `Blog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BlogEntity` instance.

#### `Info(data?: object)`

Create a new `Info` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InfoEntity` instance.

#### `Report(data?: object)`

Create a new `Report` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `SpaceflightNewsSDK.test()`.

**Returns:** `SpaceflightNewsSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## ArticleEntity

```ts
const article = client.Article()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `any[]` | Yes |  |
| `events` | `any[]` | Yes |  |
| `featured` | `boolean` | No |  |
| `id` | `number` | Yes |  |
| `image_url` | `string` | Yes |  |
| `launches` | `any[]` | Yes |  |
| `news_site` | `string` | Yes |  |
| `published_at` | `string` | Yes |  |
| `summary` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Article().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Article().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArticleEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpaceflightNewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BlogEntity

```ts
const blog = client.Blog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `any[]` | Yes |  |
| `events` | `any[]` | Yes |  |
| `featured` | `boolean` | No |  |
| `id` | `number` | Yes |  |
| `image_url` | `string` | Yes |  |
| `launches` | `any[]` | Yes |  |
| `news_site` | `string` | Yes |  |
| `published_at` | `string` | Yes |  |
| `summary` | `string` | Yes |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Blog().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Blog().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BlogEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpaceflightNewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InfoEntity

```ts
const info = client.Info()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `news_sites` | `any[]` | Yes |  |
| `version` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Info().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InfoEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpaceflightNewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportEntity

```ts
const report = client.Report()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `authors` | `any[]` | Yes |  |
| `id` | `number` | Yes |  |
| `image_url` | `string` | Yes |  |
| `news_site` | `string` | Yes |  |
| `published_at` | `string` | Yes |  |
| `summary` | `string` | No |  |
| `title` | `string` | Yes |  |
| `updated_at` | `string` | Yes |  |
| `url` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Report().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Report().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportEntity` instance with the same client and
options.

#### `client()`

Return the parent `SpaceflightNewsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new SpaceflightNewsSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

