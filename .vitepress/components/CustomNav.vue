<template>
  <div class="nav-header">
    <img class="logo" src="/logo.png">

    </img>
    <div class="btn-group">
    </div>
  </div>
  <!-- 毛玻璃导航 -->
  <nav class="glass-nav" :class="{ 'scrolled': isScrolled }">
    <span v-for="nav in navList" @click="() => gotoPage(nav.link)">{{ nav.text }}</span>
  </nav>
</template>

<script lang='ts' setup>
import { useData, useRouter } from 'vitepress';
import { onMounted, onUnmounted, ref } from 'vue';

const { site } = useData()
const navList = site.value.themeConfig.nav
console.log(site.value)
const router = useRouter()

function gotoPage(link: string) {
  router.go(link.replace(/\.md$/, '.html'))
}

// 监听页面滚动
const isScrolled = ref(false)

function handleScroll() {
  // 比如：滚动超过 100px 就切换
  isScrolled.value = window.scrollY > 100
  console.log(isScrolled.value)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const btnGroup = [{
  text: 'GitHub',
  link: ''
}]
</script>

<style lang="scss" scoped>
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    display: inline-block;
    height: 52px;
    width: 52px;
  }
}

/* 毛玻璃导航 */
.glass-nav {
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.14);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  backdrop-filter: blur(12px) saturate(120%);
  font-style: italic;
  font-family: 'Cormorant Garamond', serif;


  &.scrolled {
    position: sticky;
    top: var(--vp-nav-height);
    z-index: var(--vp-z-index-nav);
    width: fit-content;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  span {
    width: 90px;
    height: 36px;
    padding: 10px 20px;
    margin: 8px 5px;
    text-align: center;
    line-height: 16px;
    font-size: 16px;
  }

  span:hover {
    cursor: pointer;
    background-color: rgba(199, 199, 199, 0.2);
    border-radius: 5px;
  }
}
</style>