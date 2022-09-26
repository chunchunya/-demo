<template>
  <div>
    <div>mock模拟数据生成</div>
    <div>{{response}}</div>
    <v-chart
      ref="ref_echart1"
      :option="option_column"
      style="height: 400px"
    >
    </v-chart>
  </div>
</template>

<script>
import axios from 'axios';
import '../../../mock/mock.js'
import request from "../../utils/request.js"
export default {
  data(){
    return {
      response: {},
      option_column: {
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    }
  },
  mounted(){
    // this.getChartData();
    window.addEventListener("resize", () => this.$refs?.ref_echart1?.resize())
    this.getMock();
  },
  methods:{
    // getChartData(){
    //   // axios.get('/api/dashboard/chart',{params:{ID:123}}).then(response=>{
    //   //   this.chartOption = response.data
    //   // })

    //   //利用二次封装的axios进行请求
    //   request({
    //     url:'/api/dashboard/chart',
    //     method: 'GET',
    //     params:{ID:123}
    //   })
    //   .then(response=>{
    //      this.chartOption = response.data
    //   })
    // },
    getMock(){
      request({
        url:'mock/demo/test',
        method:'GET'
      })
      .then(response=>{
        console.log(response);
        this.response = response;
      })
    }
  }
}
</script>

<style>

</style>