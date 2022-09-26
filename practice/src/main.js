import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import ElementUI from 'element-gui';
import 'echarts'
import ECharts from 'vue-echarts'
import 'element-gui/lib/theme-chalk/index.css';
import Authorized from './components/Authorized.vue';
import Auth from './directives/auth.js';


Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(ElementUI);
Vue.component('v-chart', ECharts)
//这里是组件全局注册的方式（为什么不用Vue.use,是因为是人家组件库中做了相应的处理，而我们并没有）
Vue.component('Authorized', Authorized);
Vue.use(Auth);

new Vue({
  router,
  store,
  render: (h) => h(App),
  // 安装事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
  }
}).$mount("#app");
