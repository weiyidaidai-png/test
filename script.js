// 待办事项数组，用于存储所有待办项
let todos = [];

// DOM 元素
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// 初始化函数
function init() {
    // 从 localStorage 加载保存的待办事项
    loadTodosFromStorage();

    // 渲染待办事项列表
    renderTodos();

    // 绑定事件监听器
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
}

// 从 localStorage 加载待办事项
function loadTodosFromStorage() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
}

// 保存待办事项到 localStorage
function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// 添加待办事项
function addTodo() {
    // 获取输入值并去除前后空格
    const todoText = todoInput.value.trim();

    // 验证输入是否为空
    if (!todoText) {
        alert('请输入待办事项内容');
        return;
    }

    // 创建新的待办事项对象
    const newTodo = {
        id: Date.now(), // 使用时间戳作为唯一ID
        text: todoText,
        createdAt: new Date().toISOString()
    };

    // 添加到待办事项数组
    todos.push(newTodo);

    // 保存到 localStorage
    saveTodosToStorage();

    // 渲染更新后的列表
    renderTodos();

    // 清空输入框
    todoInput.value = '';

    // 聚焦输入框，方便连续输入
    todoInput.focus();
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

        // 创建完成按钮
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = '完成';
        completeBtn.addEventListener('click', () => completeTodo(todo.id));

        // 组装列表项
        todoItem.appendChild(todoText);
        todoItem.appendChild(completeBtn);

        // 添加到列表
        todoList.appendChild(todoItem);
    });
}

// 完成待办事项（从列表中移除）
function completeTodo(todoId) {
    // 确认用户是否真的要标记为完成
    if (confirm('确定要标记这个待办事项为完成吗？')) {
        // 从数组中移除对应的待办事项
        todos = todos.filter(todo => todo.id !== todoId);

        // 保存到 localStorage
        saveTodosToStorage();

        // 渲染更新后的列表
        renderTodos();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);