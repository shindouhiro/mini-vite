# Vue 3  + Mini-Vite

这个项目展示了如何使用Vue 3，并实现了一个简化版的Vite开发服务器。

## 项目结构
- `src/`: Vue应用源代码
- `server.js`: Mini-Vite开发服务器实现

## Mini-Vite开发服务器实现

### 主要功能

1. **静态文件服务**
   - 处理HTML入口文件
   - 提供JavaScript文件服务
   - 支持CSS文件加载

2. **模块解析**
   - 通过`/@modules/`前缀处理第三方依赖
   - 自动读取package.json中的module字段确定ESM入口
   - 重写import语句以支持模块加载

3. **Vue单文件组件(.vue)处理**
   - 解析.vue文件的template和script部分
   - 将template编译为渲染函数
   - 处理组件的script内容

### 实现细节

#### 路由处理

1. **根路由('/')**: 返回项目的index.html文件

2. **JavaScript文件处理('.js')**:
   - 读取对应的js文件
   - 通过`rewiereImport`函数处理import语句
   - 设置正确的MIME类型

3. **CSS文件处理('.css')**:
   - 直接返回CSS文件内容
   - 设置text/css MIME类型

4. **NPM模块处理('/@modules/')**:
   - 解析模块名称
   - 读取package.json获取ESM入口
   - 返回处理后的模块内容

5. **Vue文件处理('.vue')**:
   - 使用`@vue/compiler-sfc`解析SFC文件
   - 分别处理template和script部分
   - 编译template为渲染函数
   - 重写script部分的导出

### 使用方法

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
node server.js
```

3. 访问开发服务器：
```
http://localhost:3000
```

### 注意事项

- 这是一个教学用的简化实现，不建议用于生产环境
- 仅实现了基础的开发服务器功能，不包含打包、优化等功能

## Vue 3 + TypeScript 开发

- 项目使用Vue 3 `<script setup>` SFC语法，详见[script setup文档](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)
- 关于TypeScript配置和IDE支持，请参考[Vue TypeScript指南](https://vuejs.org/guide/typescript/overview.html#project-setup)
