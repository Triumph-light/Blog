# 孤岛架构(Islands Architecture)

实现原理：
主要过程分成三步走

1. Server runtime。服务器运行时负责服务端渲染，也就是组件到 HTML 的转换过程(renderToString)。这个阶段的主要任务是在 renderToString 过程中收集孤岛组件信息。

2. Build time。构建时负责生成孤岛组件的客户端脚本并注入到 HTML 中。在构建时 Island.js 会生成三个 bundle：
   Server bundle，用于服务端渲染。
   Client hydration bundle，用于客户端 hydration。
   Islands bundle，用于注册孤岛组件的客户端脚本，所有孤岛组件将会挂载在 window 对象上。
   在 Island.js 中，收集完所有的孤岛组件后，会构造一个虚拟模块，作用是将所有的孤岛组件注册到 window 对象上，因此在客户端 hydration bundle 中，我们可以从 window 对象上获取到所有的孤岛组件，然后对其进行 hydration。

3. Client runtime。客户端运行时主要是负责孤岛组件的 hydration，也就是将孤岛组件变得可以交互，通过 hydrate 方法，一个一个去水合组件。

留个 todo，过程待实践....

相关文章参考：
![Islands architecture](https://islandjs.dev/zh/guide/islands-arch)
![Islands Architecture（上）](https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&mid=2651258270&idx=1&sn=ccec1124ba35dc19b03cfb510e573196&chksm=bd49241a8a3ead0cc142c0b0e82b4822bc09cb417337c4936bbafd507899fad01d208dc505ff&scene=21#wechat_redirect)
![Astro Islands architecture](https://docs.astro.build/en/concepts/islands/)
