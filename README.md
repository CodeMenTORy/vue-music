# Vue.js 开发移动端音乐 WebApp

该项目是以 Vue.js （2.x）为框架，加上Vue生态全家桶而开发出的、媲美原生的移动端音乐 WebApp，媲美原生，酷炫动画、完美交互、功能完善。

👉 学习自黄轶老师，慕课网学习地址: http://coding.imooc.com/class/107.html

![图片预览](https://coding.imooc.com/static/module/class/content/img/107/section2-1.png)

## 个人收获

- 对`vue`的特性（数据的双向绑定/响应式更新/组件化）有了更深的理解，对`vue`的开发流程（目录结构分类/组件分类以及复用性/业务逻辑规划/路由规划）有更清晰的认识
- 通过`vue`组件式开发，收获了10+可复用基础/业务组件以及业务逻辑的启发
- 对`debounce`/`throttle`、`mixin`、`Promise`以及类（`class`）封装思想等有更深的理解
- 更加熟练运用`jsonp`、`axios`等网络请求方式
- 体会到软件 UI 与用户交互的重要性以及 JS 动效的学习
- 增强对业务逻辑边界情况的敏感以及相应BUG的解决能力
- 学习黄轶老师的编程习惯和代码风格

## 技术栈

#### 前端

- `Vue`：尤大开发的构建用户界面的优秀 MVVM 框架，核心特色是**响应式数据绑定**和**组件系统**
- `vue-router`：vue为单页面应用提供的路由系统，项目上线前使用了 `Lazy Loading Routes` 技术来实现异步懒加载来优化性能
- `vuex`：Vue 集中状态管理，使得多个组件共享某些状态时更加快速简介、并且更加容易管理
- `vue-lazyload`：第三方图片懒加载库，优化页面图片加载速度，并且提供图片加载失败方案
- `fastclick`: 解决移动端点击300ms延迟问题
- `better-scroll`：由黄轶老师开发的iscroll 优化版，使移动端滑动体验更加流畅
- `ES6`：ECMAScript 新一代语法，具备模块化、解构赋值、Promise、Class 等新特色

#### 网络

- `jsonp`：跨域请求在线数据
- `axios`：一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中，支持拦截器等高级配置。

#### 自动化构建及其他辅助插件

- `vue-cli`：Vue 脚手架工具，快速初始化项目代码、起服务、自动配置打包、热更新等
- `npm`：包管理工具实现各种插件的安装与管理
- `eslint`：代码风格检查工具，规范代码格式
- `vConsole`：由微信前端团队开发的开源移动端调试工具，在移动端输出日志

- `good-storage`：由黄轶老师开源的浏览器本地存储读写工具，方便快捷

- `lyric-parser`：由黄轶老师开源的歌词解析工具

- `create-keyframe-animation` ：优秀的 JS 动效插件

## 项目细节

项目主要有六个核心页面：

- 推荐页（Recommend）
- 歌手页（Singer）
- 播放页（Player）
- 排行页（Rank）
- 搜索页（Search）
- 用户个人中心（User-Center）

#### 目录结构

```
vue-music
├─ src
│  ├─ api ................... 网络请求
│  ├─ App.vue ............... 主组件
│  ├─ main.js ............... 入口文件
│  ├─ assets  ............... 静态资源
│  ├─ common  ............... 通用文件
│  │  ├─ fonts
│  │  ├─ image
│  │  ├─ js
│  │  └─ stylus
│  ├─ components ............ 组件文件夹
│  │  ├─ common  ............ 通用组件
│  │  └─ content ............ 项目业务组件
│  ├─ router ................ 路由配置
│  ├─ store  ................ vuex状态管理
│  └─ views  ................ 核心视图组件
│     ├─ player
│     ├─ rank
│     ├─ recommend
│     ├─ search
│     ├─ singer
│     └─ user-center
└─ vue.config.js ............ 配置文件
```

#### 推荐页（Recommend）

上方是一个轮播图组件，使用第三方库 `better-scroll` 辅助实现，使用 `axios` 抓取 QQ音乐(移动端)数据

下部分是一个歌单推荐列表，使用 `axios` 异步请求

歌单推荐列表图片，使用图片懒加载技术 `vue-lazyload`，优化页面加载速度

为了更好的用户体验，当数据未请求到时，显示 `loading` 组件

##### 推荐页 -> 歌单详情页

点击推荐页歌单可以进入歌单详情页面，使用封装的`MusicList`组件

#### 歌手页（Singer）

左侧是一个歌手列表，使用 `axios `抓取 QQ音乐(PC端)歌手数据并通过`Class Singer`整理获取的JSON数据以方便之后使用

列表图片使用懒加载技术 `vue-lazyload`，优化页面加载速度，并优化对图片加载失败情况的处理

右侧是一个字母列表，与左侧歌手列表实现联动滚动，并且通过`touch`事件实现`Sticky`固定标题

##### 歌手页 -> 歌手详情页

点击歌手可进入歌手详情页面，复用封装的`MusicList`组件

#### 播放器内核页（Play）

因为播放页面涉及多个数据共享，所以使用 `vuex` 管理各种播放时状态，播放、暂停等功能。

播放器分为最大化页面和最小化页面。

最大化页面中部唱片动画使用第三方 JS 动画库 `create-keyframe-animation` 实现，底部操作区图标使用 `iconfonts`。

抽象了一个横向进度条组件和一个圆形进度条组件，横向进度条可以拖动小球和点击进度条来改变播放进度，圆形进度条组件使用 SVG `<circle>` 元素

播放模式有：顺序播放、单曲循环、随机播放，原理是调整歌单列表数组

实现了播放页面侧滑显示歌词列表、使用黄轶老师`lyric-parser`歌词跟随进度条高亮等交互效果

最小化播放页面增加了当前播放列表组件，可在其中加入/删除歌曲，用户可“喜欢”歌曲加入到喜欢列表中

##### 播放页面 -> 添加歌曲到列表

展开播放列表，通过点击“添加歌曲到队列”可以进入复用搜索页面的组件

#### 排行页（Rank）

使用`axios`获取排行榜数据，使用`better-scroll`实现排行榜滚动

##### 排行页 -> 歌单详情页

点击排行榜进入歌单详情页，复用封装的`MusicList`组件

#### 搜索页（Search）

通过`axios`获取搜索数据，根据抓取的数据特征，结合`better-scroll`实现上拉刷新的功能

考虑到数据量大且输入词汇频繁的问题，对请求做了`debounce`节流处理

考虑到移动端键盘在滚动时占屏的问题，对滚动前的 `input` 做了 `blur()` 操作

对搜索历史进行了 `localstorage` 缓存，清空搜索历史时使用了改装过的 `confirm` 组件，防止用户误触删除

支持将搜索的歌曲添加到播放列表

#### 个人中心（User-Center）

将 `localstorage` 中 “我的收藏” 和 “最近播放” 反映到界面上，点击可加入到当前播放列表

## vue-music-app

```
# clone the repo into your disk.
$ git clone https://github.com/CodeMenTORy/vue-music-app.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run serve

# build for production with minification
$ npm run build
```

