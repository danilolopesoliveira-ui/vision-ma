@echo off
title Vision M&A — Iniciando...
echo.
echo  ================================================
echo   Vision M&A — Plataforma de Fusoes e Aquisicoes
echo  ================================================
echo.
echo  Iniciando servidor backend (porta 3002)...
start "Vision M&A — Backend" cmd /k "cd /d "%~dp0server" && node index.js"

timeout /t 2 /nobreak > nul

echo  Iniciando frontend (porta 5174)...
start "Vision M&A — Frontend" cmd /k "cd /d "%~dp0client" && node_modules\.bin\vite"

timeout /t 3 /nobreak > nul

echo  Abrindo no navegador...
start http://localhost:5177

echo.
echo  Vision M&A rodando!
echo  Frontend: http://localhost:5177
echo  Backend:  http://localhost:3002
echo.
pause
