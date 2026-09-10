$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$assetRoot = Join-Path $projectRoot 'public/assets/images/4k'
$originalRoot = Join-Path $projectRoot 'output/imagegen'
New-Item -ItemType Directory -Force -Path $assetRoot, $originalRoot | Out-Null
$assets = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'image-assets.json') -Raw | ConvertFrom-Json
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$report = @()
foreach ($asset in $assets) {
  $originalPath = Join-Path $originalRoot ($asset.name + '.png')
  if (-not (Test-Path -LiteralPath $originalPath)) { Copy-Item -LiteralPath $asset.source -Destination $originalPath }
  $original = [System.Drawing.Image]::FromFile($originalPath)
  $portrait = $original.Height -gt $original.Width
  $widths = if ($portrait) { @(540,1080,2160) } else { @(960,1920,3840) }
  foreach ($width in $widths) {
    $height = if ($portrait) { [int]($width * 16 / 9) } else { [int]($width * 9 / 16) }
    $suffix = if ($width -eq $widths[-1]) { '4k' } else { [string]$width }
    $destination = Join-Path $assetRoot ($asset.name + '-' + $suffix + '.jpg')
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $attributes = New-Object System.Drawing.Imaging.ImageAttributes
    $attributes.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
    $rectangle = New-Object System.Drawing.Rectangle(0,0,$width,$height)
    $graphics.DrawImage($original, $rectangle, 0, 0, $original.Width, $original.Height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
    $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]94)
    $bitmap.Save($destination, $jpegEncoder, $parameters)
    $report += [PSCustomObject]@{ name=$asset.name; file=('public/assets/images/4k/' + $asset.name + '-' + $suffix + '.jpg'); width=$width; height=$height; sourceWidth=$original.Width; sourceHeight=$original.Height; bytes=(Get-Item -LiteralPath $destination).Length }
    $parameters.Dispose(); $attributes.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
  }
  $original.Dispose()
}
$report | ConvertTo-Json | Set-Content -Encoding UTF8 -LiteralPath (Join-Path $PSScriptRoot 'image-export-report.json')
$report | Format-Table name,width,height,sourceWidth,sourceHeight,bytes -AutoSize
