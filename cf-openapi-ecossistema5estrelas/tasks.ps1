$BaseUrl = "http://127.0.0.1:8787/tasks"

function New-Task {
    param(
        [string]$Name,
        [string]$Slug,
        [string]$Description,
        [bool]$Completed = $false,
        [datetime]$DueDate
    )
    $body = @{
        name        = $Name
        slug        = $Slug
        description = $Description
        completed   = $Completed
        due_date    = $DueDate.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    } | ConvertTo-Json -Compress

    Invoke-RestMethod -Uri $BaseUrl -Method POST -ContentType "application/json" -Body $body
}

function Get-Tasks {
    Invoke-RestMethod -Uri $BaseUrl -Method GET
}

function Update-Task {
    param(
        [int]$Id,
        [string]$Name,
        [string]$Slug,
        [string]$Description,
        [bool]$Completed,
        [datetime]$DueDate
    )
    $body = @{
        name        = $Name
        slug        = $Slug
        description = $Description
        completed   = $Completed
        due_date    = $DueDate.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    } | ConvertTo-Json -Compress

    Invoke-RestMethod -Uri "$BaseUrl/$Id" -Method PUT -ContentType "application/json" -Body $body
}

function Remove-Task {
    param([int]$Id)
    Invoke-RestMethod -Uri "$BaseUrl/$Id" -Method DELETE
}

function Show-TaskMenu {
    do {
        Clear-Host
        Write-Host "==== MENU DE TAREFAS ===="
        Write-Host "1 - Listar tarefas"
        Write-Host "2 - Criar tarefa"
        Write-Host "3 - Atualizar tarefa"
        Write-Host "4 - Remover tarefa"
        Write-Host "0 - Sair"

        $opt = Read-Host "Escolha"

        switch ($opt) {
            1 {
                (Get-Tasks).result | Format-Table id,name,completed,due_date
                Pause
            }
            2 {
                $n = Read-Host "Nome"
                $s = Read-Host "Slug"
                $d = Read-Host "Descrição"
                $due = Read-Host "Data (yyyy-MM-dd HH:mm)"
                New-Task -Name $n -Slug $s -Description $d -DueDate $due
                Pause
            }
            3 {
                $id  = Read-Host "ID"
                $n   = Read-Host "Nome"
                $s   = Read-Host "Slug"
                $d   = Read-Host "Descrição"
                $c   = Read-Host "Concluída? (true/false)"
                $due = Read-Host "Data (yyyy-MM-dd HH:mm)"
                Update-Task -Id $id -Name $n -Slug $s -Description $d -Completed ([bool]::Parse($c)) -DueDate $due
                Pause
            }
            4 {
                $id = Read-Host "ID"
                Remove-Task -Id $id
                Pause
            }
        }
    } while ($opt -ne 0)
}