export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/system',
    name: 'system',
    icon: 'smile',
    routes: [
      {
        name: 'user',
        icon: 'table',
        path: '/system/users',
        component: './System/UserAdmin',
      },
      {
        name: 'role',
        icon: 'table',
        path: '/system/role',
        component: './System/RoleAdmin',
      },
      {
        name: 'menu',
        icon: 'table',
        path: '/system/menu',
        component: './System/MenuAdmin',
      },
    ]
  },
  {
    component: './404',
  },
];
