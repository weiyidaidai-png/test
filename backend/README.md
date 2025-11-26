# Todo List Backend

一个基于 Node.js 和 Express 的待办事项应用后端 API。

## 功能特性

- ✅ 获取所有待办事项
- ✅ 创建新的待办事项
- ✅ 更新待办事项状态
- ✅ 删除待办事项
- ✅ 标记待办事项为完成
- ✅ 健康检查

## 技术栈

- Node.js
- Express.js
- CORS
- UUID

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

或者启动生产服务器：

```bash
npm start
```

### 3. 访问 API

服务器将运行在 http://localhost:3001

## API 端点

### 获取所有待办事项

```http
GET /api/todos
```

响应示例：
```json
[
  {
    "id": "1",
    "text": "待办事项内容",
    "createdAt": "2023-10-05T14:48:00.000Z",
    "completed": false
  }
]
```

### 创建新的待办事项

```http
POST /api/todos
Content-Type: application/json

{
  "text": "新的待办事项"
}
```

响应示例：
```json
{
  "id": "2",
  "text": "新的待办事项",
  "createdAt": "2023-10-05T14:48:00.000Z",
  "completed": false
}
```

### 更新待办事项状态

```http
PUT /api/todos/:id
Content-Type: application/json

{
  "completed": true
}
```

### 删除待办事项

```http
DELETE /api/todos/:id
```

### 标记为完成（删除）

```http
POST /api/todos/:id/complete
```

### 健康检查

```http
GET /health
```

响应示例：
```json
{
  "status": "OK",
  "timestamp": "2023-10-05T14:48:00.000Z"
}
```

## 前端集成

前端代码位于项目根目录，可以直接在浏览器中打开 `index.html` 使用。前端会自动与后端 API 交互。

## 数据存储

当前使用内存存储数据，重启服务器后数据会重置。在生产环境中，建议使用数据库（如 MongoDB、PostgreSQL 等）。