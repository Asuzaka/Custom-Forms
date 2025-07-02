$files = Get-ChildItem -Recurse -Path "./widgets" | Where-Object { $_.Name -cmatch '[A-Z]' }

foreach ($file in $files) {
    $fullPath = $file.FullName
    $lowerName = $file.Name.ToLower()
    $dir = $file.DirectoryName
    $tempName = "$($file.Name).tmp_casefix"

    $tempPath = Join-Path $dir $tempName
    $lowerPath = Join-Path $dir $lowerName

    git mv "$fullPath" "$tempPath"
    git mv "$tempPath" "$lowerPath"
}
