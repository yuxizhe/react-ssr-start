import axios from 'axios'

export function fetchPopularRepos(language = 'all') {
  const encodedURI = encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  )

  return axios(encodedURI)
    .then(data => data.data)
    .then(repos => repos.items)
    .catch(error => {
      console.warn(error)
      return null
    })
}
