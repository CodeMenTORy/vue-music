import Vue from 'vue';
import VueRouter from 'vue-router';

const Recommend = () => import('views/recommend/recommend');
const Singer = () => import('views/singer/singer');
const Rank = () => import('views/rank/rank');
const Search = () => import('views/search/search');
const SingerDetail = () => import('views/singerDetail/singerDetail');
const Disc = () => import('views/recommend/childRecommend/disc/disc');
const TopList = () => import('views/rank/childRank/top-list/topList');
const UserCenter = () => import('views/user-center/userCenter')

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Disc,
      },
    ],
  },
  {
    path: '/singer',
    component: Singer,
  },
  {
    path: '/singer/:id',
    component: SingerDetail,
  },
  {
    path: '/rank',
    component: Rank,
  },
  {
    path: '/rank/:id',
    component: TopList,
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/search/:id',
    component: SingerDetail,
  },
  {
    path: '/user',
    component: UserCenter
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
