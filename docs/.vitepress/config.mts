import { defineConfig } from 'vitepress'

import sideBarJson from './config/sidebar.json'

export default defineConfig({
  title: "Triumph-Light",
  description: "主要记录技术笔记、业务笔记、心情笔记",
  head: [['link', { rel: 'icon', href: '../assets/sun.png' }]],
  
  themeConfig: {
    logo: '../assets/sun.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/essay/javascript/index.md' },
      {
        text: '更多', items: [
          {text: '编辑', link: '/editor/editor.md'}
        ]
      }
    ],

    sidebar: sideBarJson,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
})
