Add-Type -AssemblyName System.Drawing
$referenceArt = [System.Drawing.Image]::FromFile((Join-Path (Get-Location) 'refernce image/ChatGPT Image Sep 6, 2026, 05_44_15 PM.png'))
$referenceCrops = @(
 @('reference_startups',718,124,53,97),
 @('reference_education',776,124,52,106),
 @('reference_healthcare',833,124,53,106),
 @('reference_retail',891,124,52,97),
 @('reference_finance',949,124,52,106),
 @('reference_insight_ai',718,559,89,88),
 @('reference_insight_production',813,559,90,88),
 @('reference_insight_scale',910,559,91,88),
 @('reference_solutions',695,266,222,209),
 @('reference_case',404,1183,266,106),
 @('reference_footer',832,1252,192,184)
)
foreach ($referenceCrop in $referenceCrops) {
 $referenceBitmap = New-Object System.Drawing.Bitmap([int]$referenceCrop[3], [int]$referenceCrop[4])
 $referenceGraphics = [System.Drawing.Graphics]::FromImage($referenceBitmap)
 $referenceDestination = New-Object System.Drawing.Rectangle(0,0,[int]$referenceCrop[3],[int]$referenceCrop[4])
 $referenceGraphics.DrawImage($referenceArt, $referenceDestination, [int]$referenceCrop[1], [int]$referenceCrop[2], [int]$referenceCrop[3], [int]$referenceCrop[4], [System.Drawing.GraphicsUnit]::Pixel)
 $referenceBitmap.Save((Join-Path (Get-Location) ('public/assets/images/' + $referenceCrop[0] + '.jpg')), [System.Drawing.Imaging.ImageFormat]::Jpeg)
 $referenceGraphics.Dispose()
 $referenceBitmap.Dispose()
}
$referenceArt.Dispose()
