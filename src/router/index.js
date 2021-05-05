import Vue from 'vue'
import VueRouter from 'vue-router'
import Male from '../views/Male.vue'
import Ranking from '../views/Ranking.vue'
import Stacks from '../views/Stacks.vue'
import Recharge from '../views/Recharge.vue'
import Female from '../views/Female.vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import detaillist from '../views/detaillist.vue'
// import detail from '../views/detail.vue'
import vipAll from '../views/vipAll.vue'
import comment from '../views/comment.vue'



// 二级路由


// /Ranking/gender=male
// vipAll

Vue.use(VueRouter)



// import VueRouter from 'vue-router'
// Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isShowNav: true
    },
  },
  {
    path: '/Male',
    name: 'Male',
    component: Male,
    meta: {
      isShowNav: false
    },
  },
  {
    path: '/User',
    name: 'User',
    component: User,
    meta: {
      isShowNav: false
    },
  },
  {
    path: '/Ranking',
    name: 'Ranking',
    component: Ranking,
    meta: {
      isShowNav: false,
    },
  },
  {
    path: '/Stacks',
    name: 'Stacks',
    component: Stacks,
    meta: {
      isShowNav: false,
    
    },
    children: [{
      path: 'malemajor',
      name:'malemajor',
      component:()=>import('../views/malemajor.vue'),
      meta: {
        isShowNav: false,
      

      },

    }],

  },
  {
    path: '/Recharge',
    name: 'Recharge',
    component: Recharge,
    meta: {
      isShowNav: false
    },
  },
  {
    path: '/Female',
    name: 'Female',
    component: Female,
    meta: {
      isShowNav: false
    },
  },
  {
    path: '/detaillist',
    name: 'detaillist',
    component: detaillist,
    meta: {
      isShowNav: false
    },

    children: [{
      path: 'detail',
      name:'detail',
      component:()=>import('../views/detail.vue'),
      meta: {
        isShowNav: false,
      },

    }],
  },
  // {
  //   path: '/detail',
  //   name: 'detail',
  //   component: detail,
  //   meta: {
  //     isShowNav: false
  //   },
  // },
  {
    path: '/vipAll',
    name: 'vipAll',
    component: vipAll,
    meta: {
      isShowNav: false
    },
  },
  {
    path: '/comment',
    name: 'comment',
    component: comment,
    meta: {
      isShowNav: false
    },
  },
  {
    path: '/bookrack',
    name: 'bookrack',
    component:()=>import('../views/bookrack.vue'),
    meta: {
      isShowNav: false
    },
  },
]

const router = new VueRouter({
  routes
})

export default router