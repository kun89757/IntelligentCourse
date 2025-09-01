import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'
import ForgetPwd from '../views/login/ForgetPwd.vue'
import Home from '../views/Home.vue'
import Course from '../views/course/Course.vue'
import LoginByEmail from '../views/login/LoginByEmail'
import LoginByPhone from '../views/login/LoginByPhone'
import Admin from '../views/admin/Admin.vue'
import Concept from '../views/concept/ConceptInfo.vue'
import { stringifyQuery, parseQuery } from '@/utils/query'
Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: 'home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: ForgetPwd
  },
  {
    path: '/course/:courseId/:unchecked?', 
    name: 'course',
    component: Course
  },
  {
    path: '/concept/:conceptId', 
    name: 'concept',
    component: Concept
  },
  {
    path: '/loginByEmail', 
    name: 'byEmail', 
    component: LoginByEmail
  },
  {
    path: '/loginByPhone',
    name: 'byPhone', 
    component: LoginByPhone
  },
  {
    path: '/courseList/:courseName',
    name: 'courseList',
    component: () => import('@/views/course/CourseList.vue')
  },
  {
    path: '/conceptList/:courseId',
    name: 'conceptList',
    component: () => import('@/views/concept/ConceptList.vue')
  },
  {
    path: '/conceptCourseList',
    name: 'conceptCourseList',
    component: () => import('@/views/concept/ConceptCourseList.vue')
  },
  {
    path: '/conceptInfo/:conceptId/:conceptName?',
    name: 'conceptInfo',
    component: () => import('@/views/concept/ConceptInfo.vue')
  },
  {
    path: '/startCourse/:path/:courseId',
    name: 'startCourse',
    component: () => import('@/views/course/StartCourse.vue')
  },
  {
    path: '/historyCourse',
    name: 'historyCourse',
    component: () => import('@/views/course/HistoryCourse.vue')
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/Feedback.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/ProfileIndex.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    redirect: 'admin/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/admin/Index.vue'),
      },
      {
        path: 'conceptAudition',
        name: 'conceptAudition',
        component: () => import('@/views/admin/ConceptAudition.vue')
      },
      {
        path: 'conceptExtraction',
        name: 'conceptExtraction',
        component: () => import('@/views/admin/ConceptExtraction.vue')
      },
      {
        path: 'courseAudition',
        name: 'courseAudition',
        component: () => import('@/views/admin/CourseAudition.vue')
      },
      {
        path: 'createCourse',
        name: 'createCourse',
        component: () => import('@/views/admin/CreateCourse.vue')
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/admin/UserManagement.vue')
      },
      {
        path: 'recommendationAudition',
        name: 'recommendationAudition',
        component: () => import('@/views/admin/RecommendationAudition.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  stringifyQuery: stringifyQuery,
  parseQuery: parseQuery
})

export default router
