/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    name: 'Home',
    view: 'Dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    view: 'Login'
  },
  {
    path: '/finderboard',
    name: 'FinderBoard',
    view: 'FinderBoard'
  },
  {
    path: '/losterboard',
    name: 'LosterBoard',
    view: 'LosterBoard'
  },
  {
    path: '/writefindpost',
    view: 'WriteFindPost'
  },
  {
    path: '/writelostpost',
    view: 'WriteLostPost'
  },
  {
    path: '/showfindpost/:_id',
    view: 'ShowFindPost'
  },
  {
    path: '/showlostpost/:_id',
    view: 'ShowLostPost'
  },
  {
    path: '/modifyfindpost/:_id',
    view: 'ModifyFindPost'
  },
  {
    path: '/modifylostpost/:_id',
    view: 'ModifyLostPost'
  },
  {
    path:'/mypage',
    view: 'MyPage'
  },
  {
    path:'/signup',
    view: 'SignUp'
  }
]
