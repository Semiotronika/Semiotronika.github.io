import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import LabFrame from './components/LabFrame.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('LabFrame', LabFrame)
  },
}
