param(
  [switch] $Global,
  [switch] $ApiKeyAuth
)

$ErrorActionPreference = "Stop"

$env:NODE_OPTIONS = (($env:NODE_OPTIONS, "--use-system-ca") -join " ").Trim()
$localNpmCache = Join-Path (Get-Location) ".npm-cache"
$env:npm_config_cache = $localNpmCache
$env:NPM_CONFIG_CACHE = $localNpmCache

$agent = "codex"
$scopeArgs = @()
if ($Global) {
  $scopeArgs += "-g"
}

$authArgs = @()
if ($ApiKeyAuth) {
  if (-not $env:NEON_API_KEY) {
    throw "NEON_API_KEY is required when using -ApiKeyAuth. Set it in your local shell; do not put it in source files."
  }
  $authArgs += "--header"
  $authArgs += "Authorization: Bearer $env:NEON_API_KEY"
}

Write-Host "Configuring Neon MCP for $agent..."
Write-Host "Scope: $(if ($Global) { 'global user config' } else { 'project config' })"
Write-Host "Auth: $(if ($ApiKeyAuth) { 'API key from NEON_API_KEY' } else { 'OAuth on first use' })"

npx add-mcp https://mcp.neon.tech/mcp -a $agent -n neon -y @scopeArgs @authArgs
if ($LASTEXITCODE -ne 0) {
  throw "add-mcp failed with exit code $LASTEXITCODE"
}

Write-Host ""
Write-Host "Neon MCP config command completed. Restart Codex or reload MCP servers before using it."
