// 每次开发对应项目，都需要改这里的 pjid 和 prdid 才能调到 api 接口
// 以后加了新的项目，都在 proxyTable 里面添加一条新的键值对，然后修改导出的值

const proxyTable = {
  newhouse: 'http://fe.iwjw.com:8888/api/fete_api/sgwMZB/Amx5NK/mock'
}

exports.proxyUrl = proxyTable.newhouse
