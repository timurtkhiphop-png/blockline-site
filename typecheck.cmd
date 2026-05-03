@echo off
cd /d "%~dp0"
node "node_modules\typescript\lib\tsc.js" --noEmit
