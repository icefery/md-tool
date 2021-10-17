## 简介

一款 Markdown 批处理工具。目前支持功能如下：

- [x] `pretttier` 格式化 Markdown
- [x] `front-matter` 生成 `title` 和 `categories`
- [x] `mv-image` 移动图片到 `${basename}`

## 快速开始

```js
const { format } = require('@icefery/md-tool')

format('/your/doc', '/your/doc/root')
```

## 自定义

```js
const { format, plugins } = require('@icefery/md-tool')

function customPlugin(filename, root, text) {
  // TODO
  return text
}

format(
  '/your/doc',
  '/your/doc/root',
  [customPlugin, plugins.prettier]
)
```
