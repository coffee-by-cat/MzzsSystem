<template>
  <el-container class="layout-container">
    <el-header class="layout-header">
      <div class="header-left">
        <h1 class="logo">门诊预调配管理系统</h1>
      </div>
      <div class="header-right">
        <el-badge :value="messageCount" class="item">
          <el-button circle icon="Bell" @click="handleMessage" />
        </el-badge>
        <el-dropdown @command="handleCommand">
          <span class="user-info">
            <el-icon><User /></el-icon>
            {{ userStore.userInfo?.name || '用户' }}
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>
    
    <el-container>
      <el-aside width="200px" class="layout-aside">
        <el-menu
          :default-active="activeMenu"
          router
          class="sidebar-menu"
        >
          <el-menu-item index="/dashboard">
            <el-icon><Monitor /></el-icon>
            <span>主监控</span>
          </el-menu-item>
          <el-menu-item index="/task">
            <el-icon><List /></el-icon>
            <span>任务管理</span>
          </el-menu-item>
          <el-menu-item index="/print">
            <el-icon><Printer /></el-icon>
            <span>用药指导打印</span>
          </el-menu-item>
          <el-menu-item index="/log">
            <el-icon><Document /></el-icon>
            <span>日志查询</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <el-icon><TrendCharts /></el-icon>
            <span>工作量统计</span>
          </el-menu-item>
          <el-menu-item index="/system">
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/store/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const activeMenu = computed(() => route.path)
const messageCount = ref(0)

let ws = null

onMounted(() => {
  // 连接WebSocket
  connectWebSocket()
})

onUnmounted(() => {
  if (ws) {
    ws.close()
  }
})

const connectWebSocket = () => {
  ws = new WebSocket('ws://localhost:8080/api/ws')
  
  ws.onopen = () => {
    console.log('WebSocket连接成功')
  }
  
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'new_task' || data.type === 'task_update') {
      messageCount.value++
      ElMessage.success(data.message)
    }
  }
  
  ws.onerror = (error) => {
    console.error('WebSocket错误:', error)
  }
  
  ws.onclose = () => {
    console.log('WebSocket连接关闭')
    // 5秒后重连
    setTimeout(connectWebSocket, 5000)
  }
}

const handleMessage = () => {
  messageCount.value = 0
  ElMessage.info('消息中心开发中...')
}

const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm('确定要退出登录吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      userStore.logout()
      router.push('/login')
    }).catch(() => {})
  } else if (command === 'profile') {
    ElMessage.info('个人中心开发中...')
  }
}
</script>

<style scoped>
.layout-container {
  width: 100%;
  height: 100vh;
}

.layout-header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 20px;
  color: #409EFF;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: #333;
}

.layout-aside {
  background: #304156;
  overflow-y: auto;
}

.sidebar-menu {
  border: none;
  background: #304156;
}

.sidebar-menu .el-menu-item {
  color: #bfcbd9;
}

.sidebar-menu .el-menu-item:hover,
.sidebar-menu .el-menu-item.is-active {
  background: #263445;
  color: #409EFF;
}

.layout-main {
  background: #f0f2f5;
  padding: 20px;
}
</style>
