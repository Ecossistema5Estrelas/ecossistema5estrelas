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