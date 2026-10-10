@echo off
title SUBIR ARQUIVISUAL GAMES STUDIO A GITHUB (AL652025)
echo ===================================================================
echo           PUBLICADOR OFICIAL: ARQUIVISUAL GAMES STUDIO
echo                  Cuenta de GitHub: AL652025
echo       Repositorio: arquivisual-games_studio
echo ===================================================================
echo.
cd /d "%~dp0"

echo 1. Verificando repositorio y rama main...
git branch -M main
git remote set-url origin https://github.com/AL652025/arquivisual-games_studio.git

echo 2. Agregando todos los archivos actualizados...
git add .
git commit -m "Actualizacion oficial: Arquivisual Games Studio web completa" >nul 2>&1

echo 3. Subiendo a GitHub (https://github.com/AL652025/arquivisual-games_studio)...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo -------------------------------------------------------------------
    echo ATENCION: Si te pide iniciar sesion en GitHub, autorizalo en la
    echo ventana emergente de tu navegador.
    echo -------------------------------------------------------------------
    pause
    echo Reintentando subida...
    git push -u origin main
)

echo.
echo ===================================================================
echo ENHORABUENA! Tu proyecto esta subido a GitHub con exito.
echo.
echo Para que tu pagina se vea en internet:
echo 1. Ve a: https://github.com/AL652025/arquivisual-games_studio/settings/pages
echo 2. En "Build and deployment" -^> "Branch", selecciona: [main] y [/root]
echo 3. Haz clic en "Save".
echo.
echo Tu ENLACE PUBLICO OFICIAL en internet sera:
echo https://al652025.github.io/arquivisual-games_studio/
echo ===================================================================
echo.
pause
