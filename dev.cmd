@echo off
cd /d "%~dp0"
echo.
echo  Локальный сайт: http://localhost:3010
echo  Занят порт? "npm.cmd run dev:3000" или "npm.cmd run dev:3001"
echo.
node "node_modules\next\dist\bin\next" dev -p 3010 --turbo
