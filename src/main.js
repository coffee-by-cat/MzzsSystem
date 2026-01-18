import { createApp } from 'vue'
import { createPinia } from 'pinia'

// === 保留用于回退：Element Plus 相关导入 ===
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
// ================================================

import App from './App.vue'
import router from './router'

// 导入新的 Tailwind CSS 样式
import './styles/index.css'

const app = createApp(App)

// === 保留用于回退：注册 Element Plus 图标 ===
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
// ===============================================

app.use(createPinia())
app.use(router)

// === 保留用于回退：使用 Element Plus ===
// app.use(ElementPlus, { locale: zhCn })
// ============================================

app.mount('#app')
