# 极简待办事项网站

一个功能完整的待办事项管理网站，支持前端界面和后端 API。

## 功能特性

### 基础功能
- ✅ **添加待办事项**：在输入框中输入文本，点击添加按钮
- ✅ **完成待办事项**：点击事项旁的"完成"按钮移除事项
- ✅ **数据持久化**：支持后端 API 存储，数据不会丢失
- ✅ **简洁界面**：中文界面，友好易用
- ✅ **响应式设计**：支持桌面和移动设备

### 增强功能
- 🔄 **后端 API 支持**：基于 Node.js + Express 的 RESTful API
- 📱 **前后端分离**：前端通过 AJAX 与后端通信
- 💾 **内存存储**：后端暂存数据（可扩展为数据库）
- 🎯 **错误处理**：完善的网络错误处理和用户提示
- 📡 **健康检查**：后端服务状态监控

## 技术栈

### 前端
- **HTML5**：页面结构
- **CSS3**：样式设计
- **JavaScript (ES6+)**：功能实现
- **Fetch API**：与后端通信

### 后端
- **Node.js**：运行环境
- **Express.js**：Web 框架
- **CORS**：跨域支持
- **UUID**：生成唯一 ID

## 使用方法

### 完整模式（推荐 - 使用后端 API）

#### 1. 启动后端服务
```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 启动开发服务器（自动重启）
npm run dev

# 或启动生产服务器
npm start
```

后端服务将运行在 `http://localhost:3001`

#### 2. 启动前端
在浏览器中直接打开 `index.html` 文件，或使用 HTTP 服务器：

```bash
# 回到项目根目录
cd ..

# 使用 Python 启动服务器
python -m http.server 8000
# 或使用 Python 3
python3 -m http.server 8000

# 在浏览器中访问
http://localhost:8000
```

### 离线模式（仅前端）
如果不需要后端功能，可以直接在浏览器中打开 `index.html`，系统会自动切换到 localStorage 存储模式。

## 项目结构

```
todo-list/
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # JavaScript 功能实现
├── README.md       # 项目说明
└── backend/        # 后端目录
    ├── server.js   # Express 服务器和 API 实现
    ├── package.json # 后端依赖配置
    └── README.md   # 后端说明文档
```

## API 接口

### 基础 API
- `GET /api/todos` - 获取所有待办事项
- `POST /api/todos` - 创建新待办事项
- `PUT /api/todos/:id` - 更新待办事项状态
- `DELETE /api/todos/:id` - 删除待办事项

### 辅助接口
- `POST /api/todos/:id/complete` - 标记待办事项为完成
- `GET /health` - 健康检查

详细的 API 文档请参考 `backend/README.md`

## 核心功能说明

### 添加待办事项
1. 在顶部输入框中输入待办事项内容
2. 点击"添加"按钮或按 Enter 键
3. 前端会发送请求到后端 API
4. 成功后事项将出现在待办列表中

### 完成待办事项
1. 找到要完成的待办事项
2. 点击右侧的"完成"按钮
3. 确认后前端会发送删除请求到后端
4. 事项将从列表中移除

### 数据存储
- **在线模式**：数据存储在后端内存中
- **离线模式**：自动切换到 localStorage 存储
- **数据同步**：前端会自动尝试连接后端，失败时使用本地存储

## 浏览器兼容性

支持所有现代浏览器：
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发说明

### 前端架构
- `init()`：初始化函数，加载数据和绑定事件
- `addTodo()`：添加新待办事项（支持 API）
- `renderTodos()`：渲染待办事项列表
- `completeTodo()`：标记事项为完成（支持 API）
- `load/saveTodosFrom/toStorage()`：本地存储操作（备选方案）
- `showMessage()`：用户消息提示

### 后端架构
- Express 中间件配置
- RESTful API 设计
- 模拟数据存储（可扩展为数据库）
- 错误处理和 CORS 支持

## 扩展建议

### 数据库集成
- MongoDB + Mongoose
- PostgreSQL + Sequelize
- MySQL + TypeORM

### 功能扩展
- 用户认证和授权
- 待办事项分类和标签
- 优先级和截止日期
- 数据导入导出
- 实时通知

## 许可证

MIT License - 可自由使用和修改

## 作者

由 Claude Code 生成和实现