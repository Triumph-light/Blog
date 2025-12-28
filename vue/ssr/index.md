# 一、什么是服务端渲染（SSR）

SSR（Sever-side Rendering），在浏览器发起页面请求之后由服务端完成页面的 html 结构拼接，返回给浏览器解析后能渲染出完整的页面内容。

目前前端正在使用的 SSR 渲染也被称为同构渲染，它的流程是服务端会给浏览器返回完整的 HTML 内容（静态模板、无交互），并在 HTML 中注入一段完整的 js 脚本用于完成事件的绑定，也就是完成 hydrate（水合）。当 hydrate（水合）完成之后，页面也才能够进行真正的交互。

![架构图](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

# 二、为什么使用服务端渲染（SSR）

目前 Vue、React 框架下的项目都是以 SPA 为主，SPA 项目通常都是走 CSR 渲染。

这里我们详细介绍一下 CSR 渲染：
CSR（Client side Rendering）：客户端渲染，它大致的流程是浏览器请求页面，服务端返回一个无具体内容的 HTML，浏览器还需要加载并执行 js，动态将内容和数据渲染到页面，才能完成页面具体内容的显示。

与传统的 SPA 的 CSR 渲染相比较，SSR 渲染的好处：

- 更好的 SEO
- 更快的首屏渲染

# 三、一个框架级别的 SSR 应该有哪些能力

- 数据预获取（Server-side data pre-fetching）
- 路由级别的代码分割（Route-level code splitting）
- 状态注入（Client-side state & DOM hydration）
- CSS 管理
- 项目构建
