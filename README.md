# AntPro Admin

根据Ant Design Rro 二次封装、方便快速开发、

### 功能模块
- [ ] 用户管理（创建、修改、删除、启用/禁用）
- [ ] 分配用户角色
- [ ] 权限管理 （创建、修改、删除、启用/禁用）
- [ ] 分配权限给角色
- [ ] 角色管理 （创建、修改、删除、启用/禁用）
- [ ] 关联用户非配对应权限
- [ ] 菜单管理 （创建、修改、删除、启用/禁用）
- [ ] 对应不同角色分配不同菜单
- [ ] 字典管理 （创建、修改、删除、启用/禁用）
- [ ] 常用hook封装
- [ ] 页面常用组件封装
- [ ] 动态路由、动态菜单

### 代码目录

```s
+-- config/            ---配置文件目录
+-- dist/              ---打包的文件目录
+-- node_modules/      ---npm下载文件目录
+-- mock/              ---项目依赖mock数据
+-- public/
|   +-- icons          --- icons
+-- src/                                    ---核心代码目录
|   +-- components                          ---公用组件存放目录
|   |    +-- Footer                         ---全局底部组件
|   |    |    --- ...
|   +-- common                               ---项目工具库
|   |    +-- js                              ---js工具库
|   |    +-- styles                          ---样式工具库
|   +-- pages                                ---项目页面目录
|   +-- services                             ---项目接口目录
|   --- App.jsx                              ---组件入口文件
|   --- index.js                             ---项目的整体js入口文件，包括路由配置等
--- .env                                     ---启动项目自定义端口配置文件
--- .eslintrc                                ---自定义eslint配置文件，包括增加的react jsx语法限制
--- package.json
```

### 安装运行

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

### 运行项目

```bash
npm start
```

### 编译项目

```bash
npm run build
```

### 校验代码风格

```bash
npm run lint
```

### 尝试修改错误代码风格

```bash
npm run lint:fix
```
