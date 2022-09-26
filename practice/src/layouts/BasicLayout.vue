<template>
  <div>
    <el-container>
      <el-aside width="200px" style="background-color:#fff; min-height: 100vh">
        <sider-menu></sider-menu>
      </el-aside>
      <el-container>
        <el-header class="head">
          <Header></Header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer class="foot">
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./Header.vue";
import SiderMenu from "./SiderMenu.vue";
import Footer from "./Footer.vue";
export default {
    components: { 
      Header,
      SiderMenu,
      Footer
     },
    data(){
      return{
        menuList:[]
      }
     },
     methods:{

     },
     created(){
      console.log('1',this.$route.path);
      this.menuList = this.$router.options.routes
      console.log(this.menuList)
     }
}
</script>

<style scoped>
.head{
  padding: 0 0;
}
.foot{
  padding: 0 0;
}
</style>