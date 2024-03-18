import { defineConfig } from 'vitepress'

import sideBarJson from './config/sidebar.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My personal blog",
  description: "Triumph Blog",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/essay/javascript/index.md' },
      { text: '编辑', link: '/editor/editor.md' }
    ],

    sidebar: sideBarJson,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
})
