@echo off
REM Starts the ecommerce_platform backend and frontend together.
REM Installs dependencies first if node_modules is missing in either folder.

setlocal

set "SCRIPT_DIR=%~dp0"
set "BACKEND_DIR=%SCRIPT_DIR%backend"
set "FRONTEND_DIR=%SCRIPT_DIR%frontend"

if not exist "%BACKEND_DIR%\node_modules" (
    echo [backend] node_modules not found, running npm install...
    pushd "%BACKEND_DIR%"
    call npm install
    popd
) else (
    echo [backend] node_modules found, skipping install.
)

if not exist "%FRONTEND_DIR%\node_modules" (
    echo [frontend] node_modules not found, running npm install...
    pushd "%FRONTEND_DIR%"
    call npm install
    popd
) else (
    echo [frontend] node_modules found, skipping install.
)

echo Starting backend (npm run dev)...
start "Backend" cmd /k "cd /d "%BACKEND_DIR%" && npm run dev"

echo Starting frontend (npm run dev)...
start "Frontend" cmd /k "cd /d "%FRONTEND_DIR%" && npm run dev"

endlocal
