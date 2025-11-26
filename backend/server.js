const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 模拟数据库存储
let todos = [
  {
    id: '1',
    text: '欢迎使用待办事项应用！',
    createdAt: new Date().toISOString(),
    completed: false
  },
  {
    id: '2',
    text: '添加你的第一个待办事项',
    createdAt: new Date().toISOString(),
    completed: false
  }
];

// 获取所有待办事项
app.get('/api/todos', (req, res) => {
  console.log(`[${new Date().toLocaleString()}] GET /api/todos - 客户端请求获取所有待办事项`);
  res.json(todos);
});

// 创建新的待办事项
app.post('/api/todos', (req, res) => {
  console.log(`[${new Date().toLocaleString()}] POST /api/todos - 客户端请求创建新待办事项:`, req.body);

  const { text } = req.body;

  if (!text || text.trim() === '') {
    console.log(`[${new Date().toLocaleString()}] 错误: 待办事项内容为空`);
    return res.status(400).json({
      error: '待办事项内容不能为空'
    });
  }

  const newTodo = {
    id: uuidv4(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
    completed: false
  };

  todos.push(newTodo);
  console.log(`[${new Date().toLocaleString()}] 成功创建待办事项:`, newTodo);
  res.status(201).json(newTodo);
});

// 更新待办事项状态
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  console.log(`[${new Date().toLocaleString()}] PUT /api/todos/${id} - 客户端请求更新待办事项状态:`, completed);

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    console.log(`[${new Date().toLocaleString()}] 错误: 未找到ID为 ${id} 的待办事项`);
    return res.status(404).json({
      error: '未找到该待办事项'
    });
  }

  todos[todoIndex].completed = completed;
  console.log(`[${new Date().toLocaleString()}] 成功更新待办事项状态:`, todos[todoIndex]);
  res.json(todos[todoIndex]);
});

// 删除待办事项
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  console.log(`[${new Date().toLocaleString()}] DELETE /api/todos/${id} - 客户端请求删除待办事项`);

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    console.log(`[${new Date().toLocaleString()}] 错误: 未找到ID为 ${id} 的待办事项`);
    return res.status(404).json({
      error: '未找到该待办事项'
    });
  }

  const deletedTodo = todos.splice(todoIndex, 1)[0];
  console.log(`[${new Date().toLocaleString()}] 成功删除待办事项:`, deletedTodo);
  res.json(deletedTodo);
});

// 标记为完成（相当于删除）
app.post('/api/todos/:id/complete', (req, res) => {
  const { id } = req.params;
  console.log(`[${new Date().toLocaleString()}] POST /api/todos/${id}/complete - 客户端请求标记待办事项为完成`);

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    console.log(`[${new Date().toLocaleString()}] 错误: 未找到ID为 ${id} 的待办事项`);
    return res.status(404).json({
      error: '未找到该待办事项'
    });
  }

  const completedTodo = todos.splice(todoIndex, 1)[0];
  console.log(`[${new Date().toLocaleString()}] 成功标记待办事项为完成:`, completedTodo);
  res.json(completedTodo);
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ 服务器运行在 http://localhost:${PORT}`);
  console.log(`📋 API 端点: http://localhost:${PORT}/api/todos`);
  console.log(`❤️  健康检查: http://localhost:${PORT}/health`);
});