<template>
    <div class="timeline">
        <div class="timeline-item left">
            <div class="content">
                <h3>2020</h3>
                <p>进入大学，主修计算机科学与技术</p>
            </div>
        </div>
        <div class="timeline-item right">
            <div class="content">
                <h3>2022</h3>
                <p>开始前端开发实习，接触 React & Vue</p>
            </div>
        </div>
        <div class="timeline-item left">
            <div class="content">
                <h3>2023</h3>
                <p>加入互联网公司，负责前端工具建设</p>
            </div>
        </div>
        <div class="timeline-item right">
            <div class="content">
                <h3>2025</h3>
                <p>专注开源与前端工程化，探索 AI 辅助开发</p>
            </div>
        </div>
    </div>

</template>

<style scoped>
.timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}

.timeline::after {
    content: "";
    position: absolute;
    width: 6px;
    background: #3498db;
    top: 0;
    bottom: 0;
    left: 50%;
    margin-left: -3px;
    border-radius: 3px;
}

.timeline-item {
    padding: 20px 40px;
    position: relative;
    width: 50%;
}

.timeline-item .content {
    padding: 20px;
    background: #fff;
    position: relative;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.timeline-item.left {
    left: 0;
    text-align: right;
}

.timeline-item.right {
    left: 50%;
}

.timeline-item.left::before,
.timeline-item.right::before {
    content: "";
    position: absolute;
    top: 20px;
    width: 20px;
    height: 20px;
    background: #fff;
    border: 4px solid #3498db;
    border-radius: 50%;
    z-index: 1;
}

.timeline-item.left::before {
    right: -12px;
}

.timeline-item.right::before {
    left: -12px;
}

/* 让内容块更有层次感 */
.timeline-item .content:hover {
    transform: scale(1.05);
    transition: 0.3s;
}
</style>