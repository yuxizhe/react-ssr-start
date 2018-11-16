// import Home from './Home'
// import Grid from './Grid'
import Loadable from 'react-loadable';
import { fetchPopularRepos } from './api';

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "home" */'./Home'),
  loading: () => null,
})
const Grid = Loadable({
  loader: () => import(/* webpackChunkName: "grid" */'./Grid'),
  loading: () => null,
})
const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes