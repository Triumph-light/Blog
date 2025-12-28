# 前置介绍

## 2.1 了解 MPA、SPA

MPA 和 SPA 是构建前端页面常见的两种方式。

### 2.1.1 概念

MPA（Multi-page application）即多页应用，是从服务器加载多个 html 页面的应用程序。每一个页面都彼此独立，有各自的 URL。例如，传统的模板技术如 JSP、Python、Django、PHP、Laravel 等都是基于 MPA 的框架，包括目前比较火的 Astro 也是采用的 MPA 方案。

SPA（Single-page application）即单页应用，它只有一个不包含具体页面内容的 html，当浏览器拿到这份 html 之后加载页面所需要的 js 脚本，通过 js 脚本完成页面的内容的渲染和事件绑定，从而让页面可以交互。如现在使用的大多数 Vue、React 中后台应用都是 SPA 应用。

## 2.2 渲染模式通识

CSR（Client Side Rendering）：客户端渲染
SSR（Server Side Rendering）：服务端渲染
SSG（Static Site Generation）：静态网站生成
