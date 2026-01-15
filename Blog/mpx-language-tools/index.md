# 介绍

mpx-language-tools 是我目前公司里的语言服务工具，它是基于 Volar 去构建的，为 Mpx 框架提供完整的语言服务支持。它遵循 volar 的设计理念，采用分层架构，实现 Mpx 单文件组件的解析、编译和语言服务支持。

我共建项目许久，今天就来盘一下这个项目整体。

# 整体构架

它整体被分为 6 个包：

- @mpxjs/language-shared：提供跨包共享的工具函数，包括字符串处理、映射工具等通用功能
- @mpxjs/language-core：核心的.mpx 文件解析器，创建 MpxVirtualCode 虚拟代码实例，处理 SFC 的解析和转换，提供语言插件机制
- @mpxjs/typescript-plugin：为 TypeScript 服务提供 Mpx 特定功能，处理组件属性、事件、指令的类型推断
- @mpxjs/language-service：提供完整的 LSP 功能实现，包含多个专门的插件处理不同语言特性，集成格式化、Emmet 等服务
- @mpxjs/language-server：实现 LSP 协议，与客户端通信，协调各层组件工作，管理项目和文档状态
- VSCode Extension：作为客户端连接语言服务器，提供编辑器集成和 UI 功能，支持分割编辑器、语法高亮等特性

![整体架构图](/public/mpx-language-tools/language-tools.svg)
![整体关系图](/public/mpx-language-tools/language-tools-relationship.svg)

# 整体流程

当用户在 VSCode 中打开.mpx 文件时：
1、VSCode Extension 启动并连接 Language Server
2、Language Server 通过 Language Core 解析.mpx 文件
3、创建 MpxVirtualCode，将文件分解为不同部分
4、各语言服务插件处理相应部分
5、TypeScript Plugin 提供组件类型信息
6、Language Server 整合结果并返回给 VSCode
7、用户获得完整的语言服务支持（补全、诊断、跳转等）

![整体交互图](/public/mpx-language-tools/language-tools-inreaction.svg)
