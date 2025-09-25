<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">留言板</h1>
        <p class="text-gray-600">分享您的想法和感受</p>
      </header>
      
      <main>
        <!-- 留言表单 -->
        <MessageForm @message-created="handleMessageCreated" />
        
        <!-- 留言列表 -->
        <MessageList :messages="messages" :loading="loading" />
        
        <!-- 分页 -->
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MessageForm from './components/MessageForm.vue'
import MessageList from './components/MessageList.vue'
import Pagination from './components/Pagination.vue'
import { messageAPI } from './api.js'

const messages = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = 5

const loadMessages = async (page = 1) => {
  loading.value = true
  
  try {
    const response = await messageAPI.getMessages(page, perPage)
    const data = response.data.data
    
    messages.value = data.messages
    currentPage.value = data.page  // 修改这里：从 current_page 改为 page
    totalPages.value = data.total_pages
  } catch (error) {
    console.error('加载留言失败:', error)
    alert('加载留言失败，请刷新页面重试')
  } finally {
    loading.value = false
  }
}

const handleMessageCreated = () => {
  // 新留言创建后，回到第一页并刷新
  loadMessages(1)
}

const handlePageChange = (page) => {
  loadMessages(page)
}

// 组件挂载时加载第一页留言
onMounted(() => {
  loadMessages()
})
</script>
