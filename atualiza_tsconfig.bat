@echo off
echo ✅ Iniciando atualização do tsconfig.json...

:: Caminho do arquivo tsconfig
set TSCONFIG=tsconfig.json

:: Verifica se o arquivo existe
if not exist %TSCONFIG% (
    echo ❌ tsconfig.json não encontrado no diretório atual.
    pause
    exit /b
)

:: Cria backup
copy %TSCONFIG% tsconfig.backup.json > nul
echo 🛡️ Backup criado: tsconfig.backup.json

:: Substitui o conteúdo com a versão atualizada
(
echo {
echo   "compilerOptions": {
echo     "target": "ES2021",
echo     "lib": ["DOM", "DOM.Iterable", "ESNext"],
echo     "allowJs": true,
echo     "skipLibCheck": true,
echo     "strict": true,
echo     "forceConsistentCasingInFileNames": true,
echo     "noEmit": true,
echo     "esModuleInterop": true,
echo     "module": "NodeNext",
echo     "moduleResolution": "NodeNext",
echo     "resolveJsonModule": true,
echo     "isolatedModules": true,
echo     "jsx": "preserve",
echo     "baseUrl": ".",
echo     "paths": {
echo       "@/*": ["app/*"],
echo       "@/lib/*": ["lib/*"],
echo       "@/sanity/*": ["sanity/*"],
echo       "@/app/components/*": ["app/components/*"],
echo       "@/app/components/ui/*": ["app/components/ui/*"],
echo       "@components/*": ["app/components/*"],
echo       "@components/ui/*": ["app/components/ui/*"],
echo       "@components/blog/*": ["app/components/blog/*"]
echo     },
echo     "incremental": true,
echo     "plugins": [{ "name": "next" }]
echo   },
echo   "include": [
echo     "next-env.d.ts",
echo     "**/*.ts",
echo     "**/*.tsx",
echo     ".next/types/**/*.ts",
echo     "@types"
echo   ],
echo   "exclude": ["node_modules"]
echo }
) > %TSCONFIG%

echo ✅ tsconfig.json atualizado com sucesso!
pause