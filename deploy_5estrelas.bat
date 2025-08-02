@echo off
setlocal enabledelayedexpansion

echo 🔁 Iniciando automação do ECOSSISTEMA 5ESTRELAS...
cd /d "C:\Users\Cezar Braga\Desktop\ecossistema5estrelas"

echo 🧠 Verificando status do Git...
git status

echo.
set /p MSG="✍️  Digite a mensagem do commit: "
if "%MSG%"=="" (
  echo ❌ Nenhuma mensagem inserida. Abortando...
  pause
  exit /b
)

git add .
git commit -m "!MSG!"
git push origin main

echo.
echo 🚀 Disparando Deploy Hook da Vercel...
curl -s -X POST https://api.vercel.com/v1/integrations/deploy/prj_tGk2o9PrwYyYyr7squWphUArK4Ha/EOeOmArv5h > nul

echo.
echo ✅ DEPLOY DISPARADO COM SUCESSO!
echo 🌐 Acesse: https://ecossistema5estrelas.vercel.app
pause