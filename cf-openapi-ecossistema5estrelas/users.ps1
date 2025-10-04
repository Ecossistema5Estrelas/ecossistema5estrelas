$BaseUrl = "http://127.0.0.1:8787/users"

function New-User {
    param(
        [string]$Name,
        [string]$Email
    )
    $body = @{
        name  = $Name
        email = $Email
    } | ConvertTo-Json -Compress

    Invoke-RestMethod -Uri $BaseUrl -Method POST -ContentType "application/json" -Body $body
}

function Get-Users {
    Invoke-RestMethod -Uri $BaseUrl -Method GET
}

function Update-User {
    param(
        [int]$Id,
        [string]$Name,
        [string]$Email
    )
    $body = @{
        name  = $Name
        email = $Email
    } | ConvertTo-Json -Compress

    Invoke-RestMethod -Uri "$BaseUrl/$Id" -Method PUT -ContentType "application/json" -Body $body
}

function Remove-User {
    param([int]$Id)
    Invoke-RestMethod -Uri "$BaseUrl/$Id" -Method DELETE
}

function Show-UserMenu {
    do {
        Clear-Host
        Write-Host "==== MENU DE USUÁRIOS ===="
        Write-Host "1 - Listar usuários"
        Write-Host "2 - Criar usuário"
        Write-Host "3 - Atualizar usuário"
        Write-Host "4 - Remover usuário"
        Write-Host "0 - Sair"
        $opt = Read-Host "Escolha"

        switch ($opt) {
            1 { (Get-Users).result | Format-Table id,name,email }
            2 {
                $n = Read-Host "Nome"
                $e = Read-Host "Email"
                New-User -Name $n -Email $e
            }
            3 {
                $id = Read-Host "ID"
                $n  = Read-Host "Nome"
                $e  = Read-Host "Email"
                Update-User -Id $id -Name $n -Email $e
            }
            4 {
                $id = Read-Host "ID"
                Remove-User -Id $id
            }
            0 { break }
            Default { Write-Host "Opção inválida" }
        }
        if ($opt -ne 0) { Pause }
    } while ($opt -ne 0)
}