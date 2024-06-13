<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '~/service/http'

interface IFileInfo {
  file: string
  file_url: string
  id: number
  uploaded_at: string
}

const downloadUrl = ref<string | null>(null)

onMounted(() => {
  http.get<IFileInfo>('/files/latest').then((response) => {
    // 直接使用 response 作为 IFileInfo 类型
    const fileInfo = response as unknown as IFileInfo
    downloadUrl.value = fileInfo.file_url
  })
})

function downloadApp() {
  if (downloadUrl.value) {
    // 创建一个隐藏的 <a> 元素并触发下载
    const link = document.createElement('a')
    link.href = downloadUrl.value
    link.setAttribute('download', 'app.apk') // 设置下载文件名
    link.style.display = 'none' // 隐藏 <a> 元素
    document.body.appendChild(link) // 添加到文档
    link.click() // 触发点击
    document.body.removeChild(link) // 下载完成后移除 <a> 元素
  }
  else {
    console.error('Download URL is not available.')
  }
}
</script>

<template>
  <section flex items-center justify-center md:row lt-md:flex-col-reverse>
    <div shrink-0 grow-10 md:w-1>
      <h1 class="text-gradient" text-12 font-900 xl:text-13>
        {{ $t('page.home.header.about') }}
      </h1>
      <div class="divider" mt-8 h-1 w-20 />
      <p mt-6 max-w-500px prose lt-lg:text-.8rem>
        {{ $t('page.home.header.p') }}
      </p>
      <div mt-6 row>
        <button grow class="primary">
          {{ $t('page.home.header.open-app') }}
        </button>

        <button ml-8 grow class="primary with-border" text="Download" @click="downloadApp">
          {{ $t('page.home.header.download') }}
        </button>
      </div>
    </div>
    <div shrink-0 grow-14 md:w-1>
      <img mx-auto max-w-200 w-full src="/imgs/home-header-img.webp" alt="Homepage header img">
    </div>
  </section>
</template>

<style scoped>
</style>
