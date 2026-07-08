<template>
  <details class="collapse-panel" :open="defaultOpen">
    <summary class="collapse-title">
      <span class="collapse-title-main">
        <span class="collapse-badge" aria-hidden="true"></span>
        <span>{{ title }}</span>
      </span>
      <span class="collapse-icon">›</span>
    </summary>

    <div class="collapse-content-wrap">
      <div class="collapse-content">
        <slot />
      </div>
    </div>
  </details>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '展开内容'
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.collapse-panel {
  position: relative;
  margin: 20px 0;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.42));
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  overflow: hidden;
}

.collapse-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0));
  pointer-events: none;
}

.dark .collapse-panel {
  border-color: rgba(255, 255, 255, 0.08);
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.72), rgba(15, 23, 42, 0.5));
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
}

.dark .collapse-panel::before {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0));
}

.collapse-title {
  position: relative;
  z-index: 1;
  padding: 12px 16px;
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
  color: var(--vp-c-text-2);
  letter-spacing: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.collapse-title-main {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.collapse-badge {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  flex: none;
  background: rgba(100, 116, 139, 0.55);
  box-shadow: none;
}

.collapse-title:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--vp-c-text-1);
}

.dark .collapse-title:hover {
  background: rgba(255, 255, 255, 0.03);
}

.collapse-title::-webkit-details-marker {
  display: none;
}

.collapse-icon {
  color: var(--vp-c-text-3);
  font-size: 14px;
  transition: transform 0.25s ease, color 0.25s ease;
}

.collapse-panel[open] .collapse-icon {
  transform: rotate(90deg);
  color: var(--vp-c-text-2);
}

.collapse-content-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s ease;
}

.collapse-panel[open] .collapse-content-wrap {
  grid-template-rows: 1fr;
}

.collapse-content {
  position: relative;
  z-index: 1;
  min-height: 0;
  overflow: hidden;
  padding: 14px 20px 18px;
  border-top: 1px solid rgba(148, 163, 184, 0.14);
  color: var(--vp-c-text-2);
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.24s ease, transform 0.24s ease;
}

.collapse-panel[open] .collapse-content {
  opacity: 1;
  transform: translateY(0);
}

.dark .collapse-content {
  border-top-color: rgba(255, 255, 255, 0.06);
}

.collapse-content :deep(p) {
  margin: 12px 0;
}

.collapse-content :deep(ul) {
  margin: 8px 0 12px;
}
</style>
