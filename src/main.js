import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios';
// import './mock/index'
// import './mock/modules/admin'
// import './mock/modules/user'
// import './mock/modules/login'
// import './mock/modules/course'
// import './mock/modules/concept'
import 'element-ui/lib/theme-chalk/index.css';
import md5 from 'js-md5';
import 'echarts'
import ECharts from 'vue-echarts';
import vueDplayer from 'vue-dplayer';
import "vue-dplayer/dist/vue-dplayer.css"

Vue.use(vueDplayer);
Vue.component('v-charts', ECharts)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.prototype.$md5 = md5;

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/forgetPassword' || to.path === '/loginByEmail') {
    next();
  } else if (to.path === '/admin') {
    let roleId = localStorage.getItem('roleId');
    if (roleId == '1') {
      next();
    }
  } else {
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      next('/login');
    } else {
      if (to.matched.length === 0) {
        next('/404')
      } else {
        next();
      }
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
