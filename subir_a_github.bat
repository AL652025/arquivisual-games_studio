@echo off
title SUBIR ARQUIVISUAL GAMES A GITHUB (AL652025)
echo ===================================================================
echo           PUBLICADOR AUTOMATICO: ARQUIVISUAL GAMES
echo                  Cuenta de GitHub: AL652025
echo ===================================================================
echo.
echo 1. Comprobando repositorio local...
git branch -M main
git add .
git commit -m "Actualizacion: Portal ARQUIVISUAL GAMES oficial para AL652025" >nul 2>&1

echo 2. Subiendo a GitHub (https://github.com/AL652025/arquivisual-games)...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo -------------------------------------------------------------------
    echo AVISO: Si todavia no creaste el repositorio en GitHub:
    echo 1. Se abrira la ventana en tu navegador para crearlo en 1 solo clic.
    echo 2. Haz clic en el boton verde "Create repository".
    echo 3. Luego vuelve aqui y presiona cualquier tecla para reintentar.
    echo -------------------------------------------------------------------
    start https://github.com/new?name=arquivisual-games^&description=Portal+Web+Interactivo+ARQUIVISUAL+GAMES
    pause
    echo Reintentando subida...
    git push -u origin main
)

echo.
echo ===================================================================
echo LISTO! Tu pagina esta subida a GitHub.
echo Tu enlace de GitHub Pages sera:
echo https://al652025.github.io/arquivisual-games/
echo ===================================================================
pause
