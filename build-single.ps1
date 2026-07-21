# build-single.ps1 - regenerates the all-in-one BCEMP-Trainer.html from source.
#
# The single-file build is the no-server fallback: one HTML file that can be
# opened straight from disk or emailed to yourself, with every stylesheet and
# script inlined. Run this after ANY change to index.html, css/, data/, or js/,
# otherwise BCEMP-Trainer.html silently drifts out of date.
#
#   powershell -ExecutionPolicy Bypass -File build-single.ps1
#
# Lives in the repo (not the scratchpad) because a previous copy was lost when
# the temp directory was cleared.

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$out  = Join-Path $root "BCEMP-Trainer.html"

$html = Get-Content (Join-Path $root "index.html") -Raw -Encoding UTF8

# --- inline the stylesheet ---
# MatchEvaluator rather than -replace: a literal '$' anywhere in the CSS or JS
# would otherwise be read as a regex substitution group and silently mangled.
$css = Get-Content (Join-Path $root "css\styles.css") -Raw -Encoding UTF8
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
    $path = Join-Path $root ($rel -replace '/', '\')
    if (-not (Test-Path $path)) { throw "build-single: missing source file '$rel'" }
    $body = Get-Content $path -Raw -Encoding UTF8
    "  <script>`n" + $body + "`n  </script>"
  }
)

# --- drop the service-worker registration (irrelevant for a single local file) ---
$html = $html -replace '(?s)\s*<!-- register offline service worker.*?</script>', ''

# --- manifest/icon links point at sibling files that may not travel with it ---
$html = $html -replace '(?m)^\s*<link rel="manifest" href="manifest\.json" />\s*\r?\n', ''

if ($html -match '<script src=') { throw "build-single: some <script src> tags were not inlined" }
if ($html -match '<link rel="stylesheet"') { throw "build-single: stylesheet was not inlined" }

Set-Content -Path $out -Value $html -Encoding UTF8 -NoNewline

$kb = [math]::Round((Get-Item $out).Length / 1KB)
Write-Host "Built BCEMP-Trainer.html ($kb KB)"
