<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4">发表留言</h2>
    <form @submit.prevent="submitMessage">
      <div class="mb-4">
        <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
          姓名（可选）
        </label>
        <input
          id="author"
          v-model="form.author"
          type="text"
          placeholder="请输入您的姓名"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">
          留言内容 *
        </label>
        <textarea
          id="content"
          v-model="form.content"
          rows="4"
          placeholder="请输入您的留言内容"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          :class="{ 'border-red-500': errors.content }"
        ></textarea>
        <p v-if="errors.content" class="text-red-500 text-sm mt-1">{{ errors.content }}</p>
      </div>
      
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ loading ? '提交中...' : '发表留言' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { messageAPI } from '../api.js'

const emit = defineEmits(['message-created'])

const form = reactive({
  author: '',
  content: ''
})

const errors = reactive({
  content: ''
})

const loading = ref(false)

const validateForm = () => {
  errors.content = ''
  
  if (!form.content.trim()) {
    errors.content = '留言内容不能为空'
    return false
  }
  
  return true
}

const submitMessage = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    await messageAPI.createMessage(
      form.content.trim(),
      form.author.trim() || '匿名用户'
    )
    
    // 重置表单
    form.author = ''
    form.content = ''
    
    // 通知父组件刷新留言列表
    emit('message-created')
    
    alert('留言发表成功！')
  } catch (error) {
    console.error('发表留言失败:', error)
    alert('发表留言失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>