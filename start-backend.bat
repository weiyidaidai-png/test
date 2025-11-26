@echo off
echo ===================================
echo    待办事项应用后端服务启动脚本
echo ===================================
echo.
echo 正在进入后端目录...
cd backend
echo.
echo 正在检查并安装依赖...
if not exist "node_modules" (
    echo 首次运行，正在安装依赖...
    npm install
    echo.
)
echo.
echo 正在启动后端服务...
echo 服务将运行在: http://localhost:3001
echo API端点: http://localhost:3001/api/todos
echo 健康检查: http://localhost:3001/health
echo.
echo 按 Ctrl+C 停止服务
echo ===================================
echo.
npm start