<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">留言列表</h2>
    
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">加载中...</p>
    </div>
    
    <div v-else-if="messages.length === 0" class="text-center py-8">
      <p class="text-gray-500">暂无留言，快来发表第一条留言吧！</p>
    </div>
    
    <div v-else class="space-y-4">
      <div
        v-for="message in messages"
        :key="message._id"
        class="border-l-4 border-blue-500 pl-4 py-3 bg-gray-50 rounded-r-lg"
      >
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-semibold text-gray-800">{{ message.author }}</h3>
          <span class="text-sm text-gray-500">{{ formatDate(message.created_at) }}</span>
        </div>
        <p class="text-gray-700 leading-relaxed">{{ message.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>