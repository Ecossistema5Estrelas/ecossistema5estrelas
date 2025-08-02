@echo off
setlocal enabledelayedexpansion

echo 🔁 Iniciando automação do ECOSSISTEMA 5ESTRELAS...

cd /d "C:\Users\Cezar Braga\Desktop\ecossistema5estrelas"

echo 🧠 Verificando status do Git...
git status

echo.
set /p MSG="Digite a mensagem do commit: "
git add .
git commit -m "!MSG!"
git push origin main

echo 🚀 Disparando Deploy Hook da Vercel...
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_tGk2o9PrwYyYyr7squWphUArK4Ha/EOeOmArv5h

echo.
echo ✅ DEPLOY DISPARADO COM SUCESSO!
echo 🌐 Acesse: https://ecossistema5estrelas.vercel.app
pause