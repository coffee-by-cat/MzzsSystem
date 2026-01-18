<template>
  <div class="dashboard">
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <div class="stat-icon" style="background: #409EFF;">
              <el-icon :size="30"><Clock /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.waiting }}</div>
              <div class="stat-label">待调配</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <div class="stat-icon" style="background: #E6A23C;">
              <el-icon :size="30"><Loading /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.processing }}</div>
              <div class="stat-label">调配中</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <div class="stat-icon" style="background: #67C23A;">
              <el-icon :size="30"><CircleCheck /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.completed }}</div>
              <div class="stat-label">已完成</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <div class="stat-icon" style="background: #F56C6C;">
              <el-icon :size="30"><Warning /></el-icon>
            </div>
            <div class="stat-content">
              <div class="stat-value">{{ stats.total }}</div>
              <div class="stat-label">今日任务</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="content-row">
      <el-col :span="16">
        <el-card class="task-list-card">
          <template #header>
            <div class="card-header">
              <span>实时任务列表</span>
              <el-button type="primary" icon="Refresh" @click="refreshTasks">刷新</el-button>
            </div>
          </template>
          <el-table :data="tasks" stripe height="500" v-loading="loading">
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
            <el-table-column label="操作" fixed="right" width="100">
              <template #default="{ row }">
                <el-button link type="primary" @click="viewDetail(row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <template #header>
            <span>任务趋势</span>
          </template>
          <div id="taskTrendChart" style="height: 300px;"></div>
        </el-card>
        <el-card class="chart-card" style="margin-top: 20px;">
          <template #header>
            <span>窗口任务分布</span>
          </template>
          <div id="windowChart" style="height: 250px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import { getStatistics, getPendingTasks } from '@/api/dashboard'
import { getTaskDetail } from '@/api/task'

const loading = ref(false)
const tasks = ref([])

const stats = reactive({
  waiting: 0,
  processing: 0,
  completed: 0,
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

const loadStatistics = async () => {
  try {
    const res = await getStatistics()
    Object.assign(stats, res.data)
  } catch (error) {
    console.error('加载统计数据失败', error)
  }
}

const loadTasks = async () => {
  loading.value = true
  try {
    const res = await getPendingTasks()
    tasks.value = res.data || []
  } catch (error) {
    console.error('加载任务失败', error)
  } finally {
    loading.value = false
  }
}

const refreshTasks = () => {
  loadStatistics()
  loadTasks()
  ElMessage.success('刷新成功')
}

const viewDetail = async (task) => {
  ElMessage.info('查看任务详情功能开发中...')
}

const initCharts = () => {
  const trendChart = echarts.init(document.getElementById('taskTrendChart'))
  trendChart.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: '任务数',
      type: 'line',
      data: [5, 12, 25, 18, 10, 15, 20],
      smooth: true,
      areaStyle: {
        color: 'rgba(64, 158, 255, 0.3)'
      }
    }]
  })
  
  const windowChart = echarts.init(document.getElementById('windowChart'))
  windowChart.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [{
      type: 'pie',
      radius: '60%',
      data: [
        { value: 25, name: '1号窗口' },
        { value: 30, name: '2号窗口' },
        { value: 20, name: '3号窗口' },
        { value: 15, name: '4号窗口' }
      ]
    }]
  })
}

onMounted(() => {
  loadStatistics()
  loadTasks()
  initCharts()
})
</script>

<style scoped>
.dashboard {
  height: 100%;
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #999;
}

.content-row {
  height: calc(100% - 140px);
}

.task-list-card,
.chart-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
