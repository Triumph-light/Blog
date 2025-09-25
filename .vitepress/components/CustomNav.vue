<template>
  <!-- 毛玻璃导航 -->
  <nav class="glass-nav">
    <span v-for="nav in navList" @click="() => gotoPage(nav.link)">{{ nav.text }}</span>
  </nav>
</template>

<script lang='ts' setup>
import { useData, useRouter } from 'vitepress';

const { site } = useData()
const navList = site.value.themeConfig.nav
console.log(site.value)
const router = useRouter()

function gotoPage(link: string) {
  console.log(link)
  router.go(link)
}
</script>

<style scoped>
/* 毛玻璃导航 */
.glass-nav {
  position: sticky;
  top: var(--vp-nav-height);
  left: 50%;
  z-index: 30;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 12px;
  width: fit-content;
  background: rgba(255, 255, 255, 0.14);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  backdrop-filter: blur(12px) saturate(120%);
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
</style>