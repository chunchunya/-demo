//mock模拟生成数据
import Mock from "mockjs"

const result = Mock.mock({
    data: [
      {
        id: '@increment',
        name: '@cname()',
        address: '@city(true)'
      }
    ]
  })
  // 模拟一个不需要传参的 get 请求
  Mock.mock('mock/demo/test', 'get', () => {
    return {
      status: 200,
      message: '数据获取成功',
      data: result
    }
  })
  