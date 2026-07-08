import DefaultTheme from 'vitepress/theme'
import CollapsePanel from './components/CollapsePanel.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CollapsePanel', CollapsePanel)
  }
}
