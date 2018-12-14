import index from '../views/index.vue'
import login from '../views/login.vue'

import basicSet from '../views/Basic-setting/basic-setting.vue'
import statistic from '../views/statistic.vue'
import Interated from '../views/statistics/Interated-date.vue'
import consume from '../views/statistics/consume-date.vue'
import new_date from '../views/statistics/new-date.vue'
import user from '../views/statistics/user-date.vue'
import user_detail from '../views/statistics/user-detail.vue'

export default[
  {
    path: '/',
    hidden: true,
    component: basicSet
  },{
  	path:'/login',
    hidden: true,
  	component: login
  },{
    path:'/basicSet',
    hidden: true,
    component: basicSet
  },{
    path: '/statistic',
    component: statistic,
    name: '',
    leaf: true,//只有一个节点
    children: [
      { path: '/Interated', component: Interated, name:'综合数据'}
    ]
  },{
    path: '/statistic',
    component: statistic,
    name: '',
    leaf: true,//只有一个节点
    children: [
      { path: '/new_date', component: new_date, name:'新增记录'}

    ]
  },{
    path: '/statistic',
    component: statistic,
    name: '',
    leaf: true,//只有一个节点
    children: [
      { path: '/consume', component: consume, name:'消耗记录'}
    ]
  },{
    path: '/statistic',
    component: statistic,
    name: '',
    leaf: true,//只有一个节点
    children: [
      { path: '/user', component: user, name:'用户记录'}
    ]
  },
  {
    path: '/statistic',
    component: statistic,
    name: '',
    hidden: true,
    leaf: true,//只有一个节点
    children: [
      { path: '/user_detail', component: user_detail,name: '用户详情'}
    ]
  }
]
