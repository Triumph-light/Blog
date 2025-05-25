# 前言

相关资料：
* https://antfu.me/posts/why-not-prettier-zh
* https://github.com/antfu/eslint-config?tab=readme-ov-file
* https://github.com/sxzz/eslint-config

今天想了解一下`eslint-config`库，`sxzz`和`anthony Fu`都有创建这么一个库，目的是为了打造一个属于个人的eslint校验规则。
但是发现 `anthony Fu` 提到 `prettier` 和 `eslint` 关系， 仔细看之后，其实它相当于是 eslint 的一个子集的一个关系....，因为`prettier` 它就是一个单纯格式化工具， 而` eslint `也能够进行格式化规则配置，在日常开发过程中，我们配置`prettier` 也是需要在`eslint`去扩展`prettier`的规则，来保证不会冲突报错。

# 再次了解eslint
`eslint` 在 `v9.0.0`版本推出`Flag Config`。
带来的好处有：
* 简单的扩展、覆盖规则
* 更好的灵活性、动态性、自定义性
* 更易于在多个项目之间使用，易于迁移适配

|传统配置|扁平配置|
| ----------- | ----------- |
|多文件入口|单文件入口|
|基于extend的扩展|更加明确的原始导入|
|plugins的名字由包名决定|plugins是对象，可以随意重命名|
|树形配置复杂|组合式，简单易于追述|

因此 `eslint-config` 这种组合式的配置产生。

# 使用eslint-config
eslint-config 是 `Flag Config`， 要在编码时开启，需要在vscode中下载`ESLint` 插件， 同时在插件的配置里开启使用`Flag Config`。

为了能够自动修复错误规则，在.vscode/settings.json配置，具体配置如下：
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  }
}
```

# 打造个人的eslint-config
https://github.com/antfu/eslint-flat-config-utils

eslint-config具备功能：
* 内置本身个人的默认规则，通过开关开启
* 允许用户传入个人规则
* 链式打造

实现步骤：
1、采用 `eslint-plugin-flat-utils`，生成能够链式的调用的`composer`对象
2、将默认规则改成开关开启形式，开启了添加`Flat`规则，用户自定义的就正常添加，给到`FlatConfigComposer`来生成对象

