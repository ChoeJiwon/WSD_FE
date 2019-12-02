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
    path: '/finderboard',
    name: 'FinderBoard',
    view: 'TableList'
  },
  {
    path: '/losterboard',
    name: 'LosterBoard',
    view: 'UserProfile'
  },
  {
    path: '/mypage',
    view: 'MyPage'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  }
]
