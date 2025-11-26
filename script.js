// API 配置
const API_BASE_URL = 'http://localhost:3001/api';

// 待办事项数组，用于存储所有待办项
let todos = [];

// DOM 元素
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 初始化函数
async function init() {
    try {
        // 从 API 加载待办事项
        await loadTodosFromAPI();

        // 渲染待办事项列表
        renderTodos();

        // 绑定事件监听器
        addBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    } catch (error) {
        console.error('初始化失败:', error);
        showMessage('网络连接失败，请检查后端服务是否启动', 'error');
    }
}

// 从 API 加载待办事项
async function loadTodosFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/todos`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        todos = await response.json();
    } catch (error) {
        console.error('加载待办事项失败:', error);
        // 如果 API 失败，使用 localStorage 作为备选
        loadTodosFromStorage();
    }
}

// 保存待办事项到 localStorage（备选方案）
function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 从 localStorage 加载待办事项（备选方案）
function loadTodosFromStorage() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
}

// 添加待办事项
async function addTodo() {
    // 获取输入值并去除前后空格
    const todoText = todoInput.value.trim();

    // 验证输入是否为空
    if (!todoText) {
        showMessage('请输入待办事项内容', 'warning');
        return;
    }

    try {
        // 发送 POST 请求到 API
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: todoText }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '添加失败');
        }

        const newTodo = await response.json();

        // 添加到待办事项数组
        todos.push(newTodo);

        // 保存到 localStorage 作为备份
        saveTodosToStorage();

        // 渲染更新后的列表
        renderTodos();

        // 清空输入框
        todoInput.value = '';

        // 聚焦输入框，方便连续输入
        todoInput.focus();

        showMessage('待办事项添加成功！', 'success');
    } catch (error) {
        console.error('添加待办事项失败:', error);
        showMessage(`添加失败: ${error.message}`, 'error');
    }
}

// 标记待办事项为完成
async function completeTodo(todoId) {
    // 确认用户是否真的要标记为完成
    if (!confirm('确定要标记这个待办事项为完成吗？')) {
        return;
    }

    try {
        // 发送 DELETE 请求到 API
        const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || '操作失败');
        }

        // 从数组中移除对应的待办事项
        todos = todos.filter(todo => todo.id !== todoId);

        // 保存到 localStorage 作为备份
        saveTodosToStorage();

        // 渲染更新后的列表
        renderTodos();

        showMessage('待办事项已标记为完成！', 'success');
    } catch (error) {
        console.error('标记完成失败:', error);
        showMessage(`操作失败: ${error.message}`, 'error');
    }
}

// 渲染待办事项列表
function renderTodos() {
    // 清空现有列表
    todoList.innerHTML = '';

    // 如果没有待办事项，显示空状态
    if (todos.length === 0) {
        const emptyState = document.createElement('li');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <div>暂无待办事项</div>
            <div style="font-size: 14px; margin-top: 10px;">添加你的第一个待办事项吧！</div>
        `;
        todoList.appendChild(emptyState);
        return;
    }

    // 遍历待办事项数组，创建列表项
    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.dataset.id = todo.id;

        // 创建待办事项文本
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo.text;
        if (todo.completed) {
            todoText.style.textDecoration = 'line-through';
            todoText.style.color = '#999';
        }

        // 创建完成按钮
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = todo.completed ? '已完成' : '完成';
        completeBtn.addEventListener('click', () => completeTodo(todo.id));

        // 组装列表项
        todoItem.appendChild(todoText);
        todoItem.appendChild(completeBtn);

        // 添加到列表
        todoList.appendChild(todoItem);
    });
}

// 显示消息提示
function showMessage(message, type = 'info') {
    // 移除现有的消息
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 创建消息元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;

    // 添加样式
    Object.assign(messageDiv.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '4px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        maxWidth: '300px',
        wordWrap: 'break-word',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });

    // 设置背景色
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    messageDiv.style.backgroundColor = colors[type] || colors.info;

    // 添加到页面
    document.body.appendChild(messageDiv);

    // 显示动画
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(0)';
    }, 10);

    // 自动隐藏
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);