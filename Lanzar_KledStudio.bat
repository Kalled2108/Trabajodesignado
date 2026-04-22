@echo off
title Kled.Studio - Launcher
echo ==========================================
echo    INICIANDO KLED.STUDIO PORTAFOLIO
echo ==========================================
echo.
echo 1. Abriendo el navegador en http://localhost:3001...
start "" "http://localhost:3001"
echo.
echo 2. Iniciando el servidor Node.js...
npm start
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] No se pudo iniciar el servidor. 
    echo Asegurate de tener Node.js instalado y estar en la carpeta correcta.
    pause
)
