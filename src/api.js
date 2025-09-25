import axios from 'axios'

// 生产环境使用相对路径，开发环境使用完整 URL
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://czwwvitjevld.usw.sealos.io/api'  // 生产环境通过 Nginx 代理
  : 'http://localhost:5000/api'  // 开发环境直连后端


// const API_BASE_URL = '每个环境写死'
// const API_BASE_URL = 读BASE_URL环境变量
// const API_BASE_URL = env.get('prod') ? 'http://sealos.io:5000/api' : 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const messageAPI = {
  // 获取留言列表
  getMessages(page = 1, perPage = 5) {
    return api.get('/messages', {
      params: { page, per_page: perPage }
    })
  },

  // 创建新留言
  createMessage(content, author = '匿名用户') {
    return api.post('/messages', {
      content,
      author
    })
  }
}

export default api