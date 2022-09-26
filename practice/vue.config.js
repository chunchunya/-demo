const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        // modifyVars: { "@primary-color": "#1DA57A" },
        // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
        // Vue CLI v3 用户可参考 css-loader v1 文档
        // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
      },
    },
  },
  lintOnSave:false, /*关闭语法检查*/

  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        bypass:function(req,res){
          if(req.headers.accept.indexOf('html')!==-1){
            console.log('Skipping proxy for browser request.');
            return '/index.html';
          }else{
            //name就是要获取的mock文件夹下的文件名称（这里是dashboard_chart）
            const name = req.path.split('/api/')[1].split('/').join('_')
            //将mock文件require进来
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            //清理缓存
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
});
