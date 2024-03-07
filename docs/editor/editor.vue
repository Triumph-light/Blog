<script setup>
import { ref, computed } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useData } from 'vitepress';

const content = ref('# Hello Editor');
const data = useData();
const theme = computed(()=>data.isDark.value ? 'dark' : 'light')

const handleSave = () => {
    // 请求保存接口
    fetch('http://localhost:3000/saveEditor',{
        method: 'POST',
        headers: {
              "Content-Type": "application/json "
        },
        mode:'cors',
        body:JSON.stringify({
            content:content.value,
            title:'文章',
            link:'/javascript/hello'
        })
    }).then(res=>{
        console.log(res)
    })
}
</script>
<template>
  <MdEditor v-model="content" :theme="theme"/>
  <button class="save-btn" @click="handleSave">保存</button>
</template>
<style>
.save-btn{
  float: right;
  margin-top: 10px;
}
</style>