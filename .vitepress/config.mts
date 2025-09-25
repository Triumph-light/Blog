import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "Triumph",
  description: "A VitePress Site",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'Blog',
        link: '/Blog/index.md'
      }
    ],

    sidebar: [
      {
        text: 'Blog',
        items: [
          { text: '', link: '/Blog/index' },
          { text: 'eslint-config', link: '/Blog/eslint-config' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Triumph-light' }
    ]
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPNav\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/CustomNav.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPHomeHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/HomeHero.vue', import.meta.url)
          )
        }
      ]
    }
  }
})
