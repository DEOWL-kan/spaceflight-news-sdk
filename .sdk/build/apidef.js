
const { ApiDef } = require('@voxgig/apidef')

const opts = {
  folder: __dirname + '/../model',
  // The SNAPI spec has no `servers` entry; its paths already start with /v4/.
  server: 'https://api.spaceflightnewsapi.net',
}

module.exports = ApiDef.makeBuild(opts)
