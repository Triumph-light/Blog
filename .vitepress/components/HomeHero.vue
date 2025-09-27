<template>
  <div class="home-hero">
    <img class="avatar" src="https://avatars.githubusercontent.com/u/76158517?v=1&size=800" alt="头像">
    <div class="home-title">
      <div class="home-title_first">Welcome to</div>
      <div class="home-title_second">
        <span>{{ homeTitle }}</span>
        <span class="title-cursor">|</span>
      </div>
    </div>
    <div class="sub-title">
      Now working at DiDi
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onUnmounted, ref, onMounted, onBeforeUnmount } from 'vue';

const homeTitle = ref('');

const tapStr = 'Triumph-Light Blog'
const idx = ref(0)
let timer: NodeJS.Timeout | undefined
function typeWriter() {
  if (idx.value < tapStr.length) {
    homeTitle.value += tapStr[idx.value]
    idx.value++
    timer = setTimeout(typeWriter, 200) // 递归调用
  } else {
    // 等一会儿再清空重来
    timer = setTimeout(() => {
      idx.value = 0
      homeTitle.value = ''
      typeWriter()
    }, 1000)
  }
}

onMounted(() => {
  typeWriter()
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - (var(--vp-nav-height) * 2));
}

.avatar {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
}

.home-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
}

.home-title_second {
  margin-top: 15px;
}

.title-cursor {
  animation: blink-opacity 0.8s steps(2, start) infinite;
}

@keyframes blink-opacity {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>