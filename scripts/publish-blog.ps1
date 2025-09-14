param(
  [Parameter(Mandatory=$true)][string]$Title,
  [Parameter(Mandatory=$true)][string]$Slug,
  [Parameter(Mandatory=$true)][string]$Body,
  [Parameter(Mandatory=$true)][string]$ImagePathOrUrl,
  [switch]$Draft
)
$ErrorActionPreference="Stop"
$projectId=$env:SANITY_PROJECT_ID; $dataset=$env:SANITY_DATASET; $token=$env:SANITY_TOKEN
if(-not $projectId -or -not $dataset -or -not $token){ throw "Defina SANITY_PROJECT_ID, SANITY_DATASET, SANITY_TOKEN." }

# Obtém caminho da imagem (URL -> baixa; caminho local -> usa)
$tmpImg=$null
if($ImagePathOrUrl -match '^https?://'){
  $fname=[IO.Path]::GetFileName(([Uri]$ImagePathOrUrl).AbsolutePath); if([string]::IsNullOrWhiteSpace($fname)){$fname="img.jpg"}
  $tmpImg=Join-Path $env:TEMP ("sanity_"+$fname); Invoke-WebRequest -Uri $ImagePathOrUrl -OutFile $tmpImg -UseBasicParsing
  $imgPath=$tmpImg
}else{
  $imgPath=(Resolve-Path $ImagePathOrUrl).Path
}

# Upload do asset
$assetUrl="https://api.sanity.io/v2021-06-07/assets/images/$projectId/$dataset"
$assetResp=Invoke-WebRequest -Uri $assetUrl -Headers @{Authorization="Bearer $token"} -Method Post -InFile $imgPath -ContentType "application/octet-stream"
$asset=$assetResp.Content | ConvertFrom-Json
$assetRef=$asset.document._id

# Documento
$now=(Get-Date).ToString("s")+"Z"
$doc=@{
  mutations=@(
    @{
      create=@{
        _type="post"
        title=$Title
        slug=@{ current=$Slug }
        mainImage=@{ _type="image"; asset=@{ _type="reference"; _ref=$assetRef } }
        publishedAt=$now
        status= (if($Draft){"draft"}else{"published"})
        body=@(
          @{ _type="block"; children=@(@{ _type="span"; text=$Body }) }
          @{ _type="block"; children=@(@{ _type="span"; text="— ArqFuturum" }) }
        )
      }
    }
  )
} | ConvertTo-Json -Depth 10

# Mutação
$mutateUrl="https://$projectId.api.sanity.io/v2021-06-07/data/mutate/$dataset"
$resp=Invoke-WebRequest -Uri $mutateUrl -Headers @{Authorization="Bearer $token"; "Content-Type"="application/json"} -Method Post -Body $doc
$resp.Content

# Limpeza
if($tmpImg -and (Test-Path $tmpImg)){ Remove-Item $tmpImg -Force }
