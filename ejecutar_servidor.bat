@echo off
title ARQUIVISUAL GAMES - Servidor Local
echo ========================================================
echo   INICIANDO PORTAL WEB DE ARQUIVISUAL GAMES
echo ========================================================
echo   Tu web se abrira en: http://localhost:5500
echo   Presiona CTRL+C en esta ventana para detener el servidor.
echo ========================================================
start http://localhost:5500
python -m http.server 5500
pause
