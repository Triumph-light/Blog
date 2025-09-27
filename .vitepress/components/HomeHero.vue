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
    <SocialBtnGroup github="https://github.com/Triumph-light" email="2495685883@qq.com"></SocialBtnGroup>
  </div>
</template>




<script lang='ts' setup>
import SocialBtnGroup from './SocialBtnGroup.vue';
import TimeLine from './TimeLine.vue'
import { onUnmounted, ref, onMounted } from 'vue';

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
@font-face {
  font-family: "阿里妈妈刀隶体 Regular";
  font-weight: 400;
  src: url("//at.alicdn.com/wf/webfont/V6fFGwK23EIR/dQTLusKrAkZz.woff2") format("woff2"),
    url("//at.alicdn.com/wf/webfont/V6fFGwK23EIR/kP6E0f3PUfwu.woff") format("woff");
  font-variation-settings: normal;
  font-display: swap;
}

.home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(80vh - (var(--vp-nav-height) * 2));
}

.avatar {
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: rotateY(30deg) rotateZ(30deg);
    transition: all 0.5s;
  }
}

.home-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 2rem;
}

.home-title_second {
  margin-top: 15px;
  font-family: '阿里妈妈刀隶体 Regular';
  font-size: 30px;
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

.sub-title {
  margin-top: 1rem;
  font-size: 14px;
  color: #666;
  font-style: italic;
  font-family: 'Cormorant Garamond', serif;
}
</style>