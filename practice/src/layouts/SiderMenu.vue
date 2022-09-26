<template>
  <el-row class="tac">
    <el-col :span="24">
      <h5 class="title">XX管理系统</h5>
      <!-- el-menu标签中前两行是绑定路由（像是语法糖） -->
      <el-menu 
        default-active="$route.path"
        router unique-opened
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#fff"
        active-background-color="#87ceeb"
        text-color="#000000"
        active-text-color="#00ffff">
        <div v-for="(item,index) in menuData" :key="index">
          <el-menu-item  :key="index" :index="item.path" v-if="!item.children">
              <i :class="item.meta.icon"></i>
              <span>{{item.meta.title}}</span>
          </el-menu-item>
          <el-submenu :index="item.path" v-else>
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span>{{item.meta.title}}</span>
              </template>
              <div v-for="(child,index) in item.children" :key="index">
                <el-menu-item  :key="index" :index="child.path" v-if="!child.children">
                  <i :class="child.meta.icon"></i>
                  <span>{{child.meta.title}}</span>
                </el-menu-item>
                <el-submenu :index="child.path" v-if="child.children">
                  <template slot="title">
                    <i :class="child.meta.icon"></i>
                    <span>{{child.meta.title}}</span>
                  </template>
                  <el-menu-item  v-for="(child2,index) in child.children" :key="index" :index="child2.path">
                    <i :class="child2.meta.icon"></i>
                    <span>{{child2.meta.title}}</span>
                </el-menu-item>
                </el-submenu>
              </div>
           </el-submenu>
        </div>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import {check} from "../utils/auth.js";
export default {
    // props:{
    //   menuList:{
    //     type:Array,
    //     default:()=>[],
    //   }
    // },
    data(){
      return{
        menus:"",
        menuData:"",
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //递归方法生成导航栏
      getMenuData(routes){
        const menu = [];
        for(let item of routes){
          //如果用户校验不通过，则直接break掉
          if(item.meta && item.meta.authority && !check(item.meta.authority)){
            break;
          }
          // routes.forEach(item => {
          if(item.name && !item.hideInMenu){
            const newItem = {...item};
            delete newItem.children;
            if(item.children && !item.hideChildrenMenu){
              newItem.children = this.getMenuData(item.children)
            }
            menu.push(newItem);
            }else if(!item.hideInMenu && !item.hideChildrenMenu && item.children){
              menu.push(...this.getMenuData(item.children));
          }
        // });
        }
        return menu;
      }
    },
    mounted(){
      this.menuData = this.getMenuData(this.$router.options.routes);
      console.log(this.menuData);

    }
  }
</script>
<style scoped>
.title{
  text-align: center;
  padding:10px 1px;
  font-size: larger;
  font-weight: bolder;
  color: rgb(0, 0, 0);
}
</style>