# build-single.ps1 - regenerates the all-in-one EM-Study.html from source.
#
# The single-file build is the no-server fallback: one HTML file that can be
# opened straight from disk or emailed to yourself, with every stylesheet,
# script, font and the favicon inlined. Run this after ANY change to
# index.html, css/, fonts/, data/, or js/, otherwise EM-Study.html silently
# drifts out of date.
#
#   powershell -ExecutionPolicy Bypass -File build-single.ps1
#
# Lives in the repo (not the scratchpad) because a previous copy was lost when
# the temp directory was cleared.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$out  = Join-Path $root "EM-Study.html"

$html = Get-Content (Join-Path $root "index.html") -Raw -Encoding UTF8

# --- inline the stylesheet, embedding its fonts as data: URLs ---
# MatchEvaluator rather than -replace: a literal '$' anywhere in the CSS or JS
# would otherwise be read as a regex substitution group and silently mangled.
$css = Get-Content (Join-Path $root "css/styles.css") -Raw -Encoding UTF8
$css = [System.Text.RegularExpressions.Regex]::Replace(
  $css,
  'url\("\.\./fonts/([^"]+)"\)',
  {
    param($m)
    $font = Join-Path $root ("fonts/" + $m.Groups[1].Value)
    if (-not (Test-Path $font)) { throw "build-single: missing font '$($m.Groups[1].Value)'" }
    'url("data:font/woff2;base64,' + [Convert]::ToBase64String([IO.File]::ReadAllBytes($font)) + '")'
  }
)
$html = [System.Text.RegularExpressions.Regex]::Replace(
  $html,
  '(?m)^[ \t]*<link rel="stylesheet" href="css/styles\.css" />[ \t]*\r?$',
  { param($m) "  <style>`n" + $css + "`n  </style>" }
)

# --- inline every <script src="..."> in document order ---
$html = [System.Text.RegularExpressions.Regex]::Replace(
  $html,
  '(?m)^[ \t]*<script src="([^"]+)"></script>[ \t]*\r?$',
  {
    param($m)
    $rel  = $m.Groups[1].Value
    $path = Join-Path $root $rel   # forward slashes work on Windows and macOS/Linux
    if (-not (Test-Path $path)) { throw "build-single: missing source file '$rel'" }
    $body = Get-Content $path -Raw -Encoding UTF8
    "  <script>`n" + $body + "`n  </script>"
  }
)

# --- drop the service-worker registration (irrelevant for a single local file) ---
$html = $html -replace '(?s)\s*<!-- register offline service worker.*?</script>', ''

# --- embed the favicon; drop links to sibling files that won't travel with it ---
$svg = [Convert]::ToBase64String([IO.File]::ReadAllBytes((Join-Path $root "favicon.svg")))
$html = $html -replace '<link rel="icon" href="favicon\.svg" type="image/svg\+xml" />', ('<link rel="icon" href="data:image/svg+xml;base64,' + $svg + '" type="image/svg+xml" />')
$html = $html -replace '(?m)^[ \t]*<link rel="(manifest|apple-touch-icon|preload)"[^>]*/>[ \t]*\r?\n', ''

if ($html -match '<script src=') { throw "build-single: some <script src> tags were not inlined" }
if ($html -match '<link rel="stylesheet"') { throw "build-single: stylesheet was not inlined" }
if ($html -match 'url\("\.\./fonts/') { throw "build-single: fonts were not embedded" }

Set-Content -Path $out -Value $html -Encoding UTF8 -NoNewline

$kb = [math]::Round((Get-Item $out).Length / 1KB)
Write-Host "Built EM-Study.html ($kb KB)"
