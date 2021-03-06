import axios from 'axios'

export function fetchPopularRepos(category = 'MANAGER_SPEECH') {
  var datas = {
    order_by: 'content_time',
    category: category
  }
  var url = '/xq/private_fund/v3/community/list.json'

  if (!__isBrowser__) {
    url = url.replace('/xq', '')
    url = 'https://xueqiu.com' + url
  }

  var res = axios(url, {
    params: datas
  })
    .then(data => data.data)
    .catch(error => {
      console.warn('api error')
      return null
    })

  return res
}
