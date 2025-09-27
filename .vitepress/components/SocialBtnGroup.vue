<template>
    <div class="btn-group" role="group" aria-label="社交按钮组">
        <!-- GitHub 按钮 -->
        <a v-if="github" class="btn github" :href="github" target="_blank" rel="noopener noreferrer"
            aria-label="访问我的 GitHub">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path
                    d="M12 .5C5.73.5.76 5.47.76 11.74c0 4.92 3.19 9.09 7.62 10.56.56.1.76-.24.76-.54 0-.27-.01-1-.02-1.97-3.1.67-3.75-1.49-3.75-1.49-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .17 1.56-.12 1.93-.46-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.43-2.22 1.14-3-.11-.28-.5-1.4.11-2.92 0 0 .95-.31 3.12 1.15a10.8 10.8 0 012.84-.38c.96.01 1.93.13 2.84.38 2.16-1.46 3.11-1.15 3.11-1.15.62 1.52.23 2.64.12 2.92.71.78 1.13 1.78 1.13 3 0 4.28-2.61 5.23-5.09 5.51.3.26.57.77.57 1.55 0 1.12-.01 2.03-.01 2.3 0 .3.2.65.77.54A11.26 11.26 0 0023.24 11.74C23.24 5.47 18.27.5 12 .5z"
                    fill="currentColor" />
            </svg>
            <span class="label">GitHub</span>
        </a>

        <!-- Email 按钮 -->
        <button v-if="email" class="btn email" type="button" @click="copyEmail" :aria-label="`发送邮件到 ${email}`">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path
                    d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11A2.5 2.5 0 0119.5 20h-15A2.5 2.5 0 012 18.5v-12z"
                    stroke="currentColor" stroke-width="0.6" fill="currentColor" opacity="0.98" />
                <path d="M3 6.8l8.4 5.4a1 1 0 001.2 0L21 6.8" fill="none" stroke="#0b1220" stroke-width="0.6" />
            </svg>
            <span class="label">Email</span>
        </button>
    </div>

    <!-- Toast 提示 -->
    <div v-if="showToast" class="toast">邮箱已复制到剪贴板</div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    github: { type: String, default: '' },
    email: { type: String, default: '' },
})

const showToast = ref(false)

function copyEmail() {
    if (!props.email) return
    navigator.clipboard?.writeText(props.email).then(() => {
        showToast.value = true
        setTimeout(() => (showToast.value = false), 2000)
    })
    // 可选：打开默认邮箱客户端
    window.location.href = `mailto:${props.email}`
}
</script>

<style scoped>
.btn-group {
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 14px;
    border-radius: 18px;
    backdrop-filter: blur(6px);
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 12px;
    text-decoration: none;
    color: #e6eef8;
    background: linear-gradient(180deg, #0b1220, rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.04);
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
}

.btn:focus {
    outline: 3px solid rgba(96, 165, 250, 0.18);
    outline-offset: 4px;
}

.btn:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 20px rgba(2, 6, 23, 0.6);
}

.btn svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    display: block;
}

.btn .label {
    display: inline-block;
    line-height: 1;
}

.btn.github {
    background: linear-gradient(180deg, #0f1620, #0b1220);
}

.btn.github:hover {
    background: linear-gradient(180deg, #111827, #0d1220);
}

.btn.email {
    background: linear-gradient(180deg, #08202a, #04212a);
}

.btn.email:hover {
    background: linear-gradient(180deg, #06313b, #04222a);
}

/* toast */
.toast {
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%) translateY(12px);
    background: rgba(10, 15, 20, 0.9);
    color: #dff3ea;
    padding: 8px 14px;
    border-radius: 999px;
    font-size: 13px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 260ms ease, transform 260ms ease;
    box-shadow: 0 6px 28px rgba(2, 6, 23, 0.6);
}

.toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    pointer-events: auto;
}
</style>
