<template>
  <div class="task-page">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>任务管理</span>
        </div>
      </template>
      <div class="search-form">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="窗口号">
            <el-select v-model="searchForm.windowNo" placeholder="请选择窗口" clearable>
              <el-option label="1号窗口" value="WIN001" />
              <el-option label="2号窗口" value="WIN002" />
              <el-option label="3号窗口" value="WIN003" />
              <el-option label="4号窗口" value="WIN004" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
              <el-option label="待调配" :value="1" />
              <el-option label="调配中" :value="2" />
              <el-option label="已完成" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="就诊流水号">
            <el-input v-model="searchForm.visitNo" placeholder="请输入就诊流水号" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleSearch">查询</el-button>
            <el-button icon="Refresh" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="taskList" stripe v-loading="loading">
        <el-table-column prop="task_id" label="任务ID" width="120" />
        <el-table-column prop="visit_no" label="就诊流水号" width="140" />
        <el-table-column prop="patient_name" label="患者姓名" width="100" />
        <el-table-column prop="window_no" label="窗口号" width="80" />
        <el-table-column prop="drug_count" label="药品数" width="80" />
        <el-table-column prop="create_time" label="生成时间" width="160" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleView(row)">查看</el-button>
            <el-button link type="primary" @click="handlePrint(row)" v-if="row.status === 3">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="loadTasks"
        @current-change="loadTasks"
        style="margin-top: 20px; justify-content: flex-end;"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const taskList = ref([])

const searchForm = reactive({
  windowNo: '',
  status: '',
  visitNo: ''
})

const pagination = reactive({
  page: 1,
  size: 10,
  total: 0
})

const getStatusType = (status) => {
  const map = { 1: 'info', 2: 'warning', 3: 'success' }
  return map[status] || 'info'
}

const getStatusText = (status) => {
  const map = { 1: '待调配', 2: '调配中', 3: '已完成' }
  return map[status] || '未知'
}

const loadTasks = async () => {
  loading.value = true
  try {
    // TODO: 调用API获取任务列表
    taskList.value = []
    pagination.total = 0
  } catch (error) {
    ElMessage.error('加载任务失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadTasks()
}

const handleReset = () => {
  searchForm.windowNo = ''
  searchForm.status = ''
  searchForm.visitNo = ''
  pagination.page = 1
  loadTasks()
}

const handleView = (row) => {
  ElMessage.info('查看任务详情功能开发中...')
}

const handlePrint = (row) => {
  ElMessage.info('打印功能开发中...')
}

loadTasks()
</script>

<style scoped>
.task-page {
  height: 100%;
}

.search-form {
  margin-bottom: 20px;
}
</style>
