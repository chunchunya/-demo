import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
import NotFound from "../components/404.vue";
import Forbidden from "../components/403.vue";
import {check,isLogin} from "../utils/auth.js";
// import RenderRouterView from "../components/RenderRouterView.vue";
import { Notification } from 'element-gui';
Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu:true,
    // component: RenderRouterView,    //除了组件外还有jsx函数方式   {render:h=>h("router-view")},
    component: () =>
          import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),   //webpack异步加载
    children: [
      {
        path:"/user",
        redirect:"/user/login"    //重定向

      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue"),
      },
    ],
  },
  //主页，一进来的主页面
  {
    path: "/",
    meta: {
      authority:['user','admin']
    },
    component: () =>
          import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
          children:[
            //dashboard
            {
              path:"/",
              redirect:"/dashboard/analysis",
            },
            {
              path:"/dashboard",
              name:"dashboard",
              meta:{
                    icon: 'el-icon-menu',
                    title: '首页'
                  },
              component:{render:h=>h("router-view")},
              children:[
                {
                  path:"/dashboard/analysis",
                  name:"analysis",
                  meta:{
                    icon: 'el-icon-menu',
                    title: '分析'
                  },
                  component:()=>
                  import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"),
                },
                {
                  path:"/dashboard/todolist",
                  name:"todo-list",
                  meta:{
                    icon: 'el-icon-menu',
                    title: '待办事项'
                  },
                  component:()=>
                  import(/* webpackChunkName: "dashboard" */ "../views/Dashboard/TodoList.vue"),
                }
              ]
            },
            //form
            {
              path:"/form",
              name:"form",
              meta:{
                icon: 'el-icon-document',
                title: '表单',
                authority: ['user','admin']
              },
              component:{render:h=>h("router-view")},
              children:[
                {
                  path:"/form/basic-form",
                  name:"basicform",
                  meta:{
                    icon: 'el-icon-info',
                    title: '基础表单'
                  },
                  component:()=>
                  import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm.vue")
                },
                {
                  path:"/form/step-form",
                  name:"stepform",
                  // hideChildrenMenu: true,
                  meta:{
                    icon: 'el-icon-copy',
                    title: '分布表单'
                  },
                  component:()=>
                  import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
                  children:[
                    {
                      path:"/form/step-form",
                      redirect:"/form/step-form/info"
                    },
                    {
                      path:"/form/step-form/info",
                      name:"info",
                      meta:{
                        icon: 'el-icon-copy',
                        title: '信息页'
                      },
                      component:()=>
                      import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/StepFormInfo.vue")
                    },
                    {
                      path:"/form/step-form/confirm",
                      name:"confirm",
                      meta:{
                        icon: 'el-icon-copy',
                        title: '确认页'
                      },
                      component:()=>
                      import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/StepFormConfirm.vue")
                    },
                    {
                      path:"/form/step-form/result",
                      name:"result",
                      meta:{
                        icon: 'el-icon-copy',
                        title: '结果页'
                      },
                      component:()=>
                      import(/* webpackChunkName: "form" */ "../views/Forms/StepForm/StepFormResult.vue")
                    }
                  ]
                }
              ]
            },
          ],
  },
  {
    path:"/403",
    name:"403",
    hideInMenu:true,
    component:Forbidden
  },
  {
    path:"*",
    name:"404",
    hideInMenu:true,
    component:NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 加载进度条、设置路由的用户权限
router.beforeEach((to, from, next)=>{
  if(to.path !== from.path){
     NProgress.start();
  }
  //to.matched（即将去到的路由  .matched是路由提供给我们的一个接口，
  //可以从该字段中取到我们当前访问的路由所匹配到的所有路由信息）
  //这里的目的是找到距离该路由最近的父路由的用户权限信息
  console.log(to.matched);
  const record = findLast(to.matched,item => item.meta.authority)
  if(record && !check(record.meta.authority)){
    //如果没有权限且也没有登陆，则跳转到登录页，如果登陆了但没权限，则跳转到403
    if(!isLogin() && to.path !== "/user/login"){
      next({
        path: "/user/login"
      });
    }else if(to.path !== "/403"){
      Notification.error({
        title: '403',
        message: '你没有权限访问，请联系管理员处理'
      });
      next({
        path: "/403"
      }); 
    }
    NProgress.done();
  }
  next();
});
router.afterEach(()=>{
  NProgress.done();
});

export default router;
