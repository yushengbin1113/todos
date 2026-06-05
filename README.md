<!--
 * @Author: yushengbin yushengbin1113@gmail.com
 * @Date: 2026-06-05 17:16:07
 * @LastEditors: yushengbin yushengbin1113@gmail.com
 * @LastEditTime: 2026-06-05 19:22:26
 * @FilePath: \todos\README.md
 * @Description: README.md
-->
# Todos

基于 Vue 3 + Vite + JavaScript 的待办事项应用，数据保存在浏览器本地（localStorage），无需后端。

## 在线演示

部署 GitHub Pages 后访问：

```
https://yushengbin1113.github.io/todos/
```


## 功能

- 添加、编辑、删除待办事项
- 标记完成 / 未完成
- 筛选：全部 / 进行中 / 已完成
- 优先级：高 / 中 / 低（列表按优先级排序）
- 截止日期（今天到期、已过期高亮提醒）
- 分类标签（工作 / 生活 / 学习）及分类筛选
- 清空已完成
- 本地持久化（刷新页面数据不丢失）
- 顶部个人风格展示区（图片 + 文字）

## 技术栈

- Vue 3 (Composition API)
- Vite
- JavaScript

## 项目结构

```
todos/
├── public/              # 静态资源
├── src/
│   ├── assets/          # 图片等资源
│   ├── components/      # 可复用组件
│   ├── composables/     # 组合式函数（如 useTodos）
│   ├── constants/       # 常量定义
│   ├── styles/          # 全局样式
│   ├── utils/           # 工具函数
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── index.html
├── vite.config.js
└── package.json
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建（需带 base 路径）
npm run preview
```

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库（仓库名建议为 `todos`）
2. 在仓库 **Settings → Pages** 中：
   - Source: **Deploy from a branch**
   - Branch: `gh-pages` / `/ (root)`
3. 推送 `main` 分支后，GitHub Actions 会自动构建并部署

> `vite.config.js` 中 `base` 已配置为 `/todos/`，与仓库名保持一致。若仓库名不同，需同步修改 `base`。

## 路径别名

已配置 `@` 指向 `src` 目录，例如：

```js
import { useTodos } from '@/composables/useTodos'
```

## License

[MIT](LICENSE)
