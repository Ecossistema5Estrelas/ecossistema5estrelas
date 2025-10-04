# Carrega os módulos de tarefas e usuários
. "$PSScriptRoot\tasks.ps1"
. "$PSScriptRoot\users.ps1"

function Show-MainMenu {
    do {
        Clear-Host
        Write-Host "==== MENU PRINCIPAL ===="
        Write-Host "1 - Gerenciar tarefas"
        Write-Host "2 - Gerenciar usuários"
        Write-Host "0 - Sair"
        $opt = Read-Host "Escolha"

        switch ($opt) {
            1 { Show-TaskMenu }
            2 { Show-UserMenu }
            0 { break }
            Default { Write-Host "Opção inválida" }
        }

        if ($opt -ne 0) { Pause }
    } while ($opt -ne 0)
}