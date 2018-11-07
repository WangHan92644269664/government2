import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layout/layout'

import index from '@/components/viewpage/index'
import error from '@/components/common/error'


const datainfo = () => import('@/components/viewpage/panel/datainfo.vue')
const partinfo = () => import('@/components/viewpage/panel/partinfo.vue')
const sysdesign = () => import('@/components/viewpage/panel/sysdesign.vue')
const password = () => import('@/components/viewpage/panel/password.vue')
// import datainfo from '@/components/viewpage/panel/datainfo.vue'
// import partinfo from '@/components/viewpage/panel/partinfo'
// import sysdesign from '@/components/viewpage/panel/sysdesign'
// import password from '@/components/viewpage/panel/password'
const infosys = () => import('@/components/viewpage/myassets/infosys')
const toinfo = () => import('@/components/viewpage/myassets/toinfo')
const infoing = () => import('@/components/viewpage/myassets/infoing')
const infoed = () => import('@/components/viewpage/myassets/infoed')
const inforef = () => import('@/components/viewpage/myassets/inforef')
const infoitem = () => import('@/components/viewpage/myassets/infoitem')

// import infosys from '@/components/viewpage/myassets/infosys'
// import toinfo from '@/components/viewpage/myassets/toinfo'
// import infoing from '@/components/viewpage/myassets/infoing'
// import infoed from '@/components/viewpage/myassets/infoed'
// import inforef from '@/components/viewpage/myassets/inforef'
// import infoitem from '@/components/viewpage/myassets/infoitem'
const todos = () => import('@/components/viewpage/catalog/todos')
const todeals = () => import('@/components/viewpage/catalog/todeals')
const backed = () => import('@/components/viewpage/catalog/backed')
const dealed = () => import('@/components/viewpage/catalog/dealed')

// import todos from '@/components/viewpage/catalog/todos'
// import todeals from '@/components/viewpage/catalog/todeals'
// import backed from '@/components/viewpage/catalog/backed'
// import dealed from '@/components/viewpage/catalog/dealed'
const tableconf = () => import('@/components/viewpage/sysconfig/tableconf/tableconf')
const infosysconfig = () => import('@/components/viewpage/sysconfig/tableconf/infosysconfig')
const itemconfig = () => import('@/components/viewpage/sysconfig/tableconf/itemconfig')
const refconfig = () => import('@/components/viewpage/sysconfig/tableconf/refconfig')
const userconfig = () => import('@/components/viewpage/sysconfig/tableconf/userconfig')
// import tableconf from '@/components/viewpage/sysconfig/tableconf/tableconf'
// import infosysconfig from '@/components/viewpage/sysconfig/tableconf/infosysconfig'
// import itemconfig from '@/components/viewpage/sysconfig/tableconf/itemconfig'
// import refconfig from '@/components/viewpage/sysconfig/tableconf/refconfig'
// import userconfig from '@/components/viewpage/sysconfig/tableconf/userconfig'
const menuhandle = () => import('@/components/viewpage/sysconfig/menuhandle')
const cateconfig = () => import('@/components/viewpage/sysconfig/cateconfig')
const charconfig = () => import('@/components/viewpage/sysconfig/charconfig')
const parthandle = () => import('@/components/viewpage/sysconfig/parthandle')
const userhandle = () => import('@/components/viewpage/sysconfig/userhandle')
const rolehandle = () => import('@/components/viewpage/sysconfig/rolehandle')

// import menuhandle from '@/components/viewpage/sysconfig/menuhandle'
// import cateconfig from '@/components/viewpage/sysconfig/cateconfig'
// import charconfig from '@/components/viewpage/sysconfig/charconfig'
// import parthandle from '@/components/viewpage/sysconfig/parthandle'
// import userhandle from '@/components/viewpage/sysconfig/userhandle'
// import rolehandle from '@/components/viewpage/sysconfig/rolehandle'

import ctrllog from '@/components/viewpage/sysctrl/ctrllog'
import linkctrl from '@/components/viewpage/sysctrl/linkctrl'

Vue.use(Router)

export const routerMap = [
  {
    path: '*',
    redirect: '/index',
    meta: {hidden: true}  
  },
  {
    path: '/error',
    component: error,
    meta: { hidden: true,title: 'error', icon: 'fa-calendar' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'home',
    meta: {hidden: true, roles: ['admin'] }, 
    children: [{
      path: 'index',
      component: index, 
      name: 'index',
      meta: { 
        hidden: true,
        title: 'index',
        icon: 'fa-calendar',
        roles: ['admin'] 
      }
    }]
  },
  {
    path: '/panel',
    component: Layout,
    redirect: '/partinfo',
    name: 'panel',
    meta: { title: '我的面板', icon: 'fa-calendar' },
    children: [
      {
        path: '/partinfo',
        component: partinfo,
        name: 'partinfo',
        meta: { title: '部门信息', icon: 'fa-calendar' }
      },
      {
        path: '/datainfo',
        component: datainfo,
        name: 'datainfo',
        meta: { title: '数据概览', icon: 'fa-calendar' }
      },
      {
        path: '/sysdesign',
        component: sysdesign,
        name: 'sysdesign',
        meta: { title: '系统统计', icon: 'fa-calendar' }
      },
      {
        path: '/password',
        component: password,
        name: 'password',
        meta: { title: '密码服务', icon: 'fa-calendar' }
      }
    ]
  },
  {
    path: '/myassets',
    component: Layout,
    redirect: '/toinfo',
    name: 'myassets',
    meta: { title: '我的资产', icon: 'fa-calendar' },
    children: [
      {
        path: '/infosys',
        component: infosys,
        name: 'infosys',
        meta: { title: '信息系统', icon: 'fa-calendar' },
        children: [
          {
            path: '/infoed',
            component: infoed,
            name: 'infoed',
            meta: { title: '已建系统', icon: 'fa-calendar' }
          },
          {
            path: '/infoing',
            component: infoing,
            name: 'infoing',
            meta: { title: '在建系统', icon: 'fa-calendar' }
          },
          {
            path: '/toinfo',
            component: toinfo,
            name: 'toinfo',
            meta: { title: '拟建系统', icon: 'fa-calendar' }
          }
        ]
      },     
      {
        path: '/inforef',
        component: inforef,
        name: 'inforef',
        meta: { title: '信息资源', icon: 'fa-calendar' }
      },
      {
        path: '/infoitem',
        component: infoitem,
        name: 'infoitem',
        meta: { title: '信息项', icon: 'fa-calendar' }
      }
    ]
  },
  {
    path: '/catalog',
    component: Layout,
    redirect: '/todos',
    name: 'catalog',
    meta: { title: '目录管理', icon: 'fa-calendar' },
    children: [
      {
        path: '/todos',
        component: todos,
        name: 'todos',
        meta: { title: '待办事宜', icon: 'fa-calendar' }
      },
      {
        path: '/todeals',
        component: todeals,
        name: 'todeals',
        meta: { title: '待审核资源', icon: 'fa-calendar' }
      },
      {
        path: '/backed',
        component: backed,
        name: 'backed',
        meta: { title: '已回退资源', icon: 'fa-calendar' }
      },
      {
        path: '/dealed',
        component: dealed,
        name: 'dealed',
        meta: { title: '已审核资源', icon: 'fa-calendar' }
      }
    ]
  },
  {
    path: '/sysconfig',
    component: Layout,
    redirect: '/menuhandle',
    name: 'sysconfig',
    meta: { title: '系统配置', icon: 'fa-calendar' },
    children: [
      {
        path: '/tableconf',
        component: tableconf,
        redirect: '/itemconfig',
        name: 'tableconf',
        meta: { title: '表单配置', icon: 'fa-calendar' },
        children: [
          {
            path: '/itemconfig',
            component: itemconfig,
            name: 'itemconfig',
            meta: { title: '信息项目配置', icon: 'fa-calendar' }
          },
          {
            path: '/refconfig',
            component: refconfig,
            name: 'refconfig',
            meta: { title: '信息资源配置', icon: 'fa-calendar' }
          },
          {
            path: '/infosysconfig',
            component: infosysconfig,
            name: 'infosysconfig',
            meta: { title: '信息系统配置', icon: 'fa-calendar' }
          },
          {
            path: '/userconfig',
            component: userconfig,
            name: 'userconfig',
            meta: { title: '用户中心配置', icon: 'fa-calendar' }
          }
        ]
      },     
      {
        path: '/menuhandle',
        component: menuhandle,
        name: 'menuhandle',
        meta: { title: '菜单管理', icon: 'fa-calendar' }
      },
      {
        path: '/cateconfig',
        component: cateconfig,
        name: 'cateconfig',
        meta: { title: '目录配置', icon: 'fa-calendar' }
      },
      {
        path: '/charconfig',
        component: charconfig,
        name: 'charconfig',
        meta: { title: '字典配置', icon: 'fa-calendar' }
      },
      {
        path: '/parthandle',
        component: parthandle,
        name: 'parthandle',
        meta: { title: '机构管理', icon: 'fa-calendar' }
      },
      {
        path: '/userhandle',
        component: userhandle,
        name: 'userhandle',
        meta: { title: '用户管理', icon: 'fa-calendar' }
      },
      {
        path: '/rolehandle',
        component: rolehandle,
        name: 'rolehandle',
        meta: { title: '角色管理', icon: 'fa-calendar' }
      }
    ]
  },
  {
    path: '/sysctrl',
    component: Layout,
    redirect: '/ctrllog',
    name: 'sysctrl',
    meta: { title: '系统监控', icon: 'fa-calendar' },
    children: [
      {
        path: '/ctrllog',
        component: ctrllog,
        name: 'ctrllog',
        meta: { title: '监控日志', icon: 'fa-calendar' }
      },
      {
        path: '/linkctrl',
        component: linkctrl,
        name: 'linkctrl',
        meta: { title: '连接池监控', icon: 'fa-calendar' }
      }     
    ]
  }
  
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})
