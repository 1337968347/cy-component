# PowerShell 部署脚本

# 构建所有项目并整合
Write-Host "Building all projects..." -ForegroundColor Cyan
& "$PSScriptRoot\build-all.ps1"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}

# 部署到服务器
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "部署到服务器..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

$DEPLOY_DIR = "d:\my-project\Github\cy-component\deploy"
$ARCHIVE = "d:\my-project\Github\cy-component\deploy.tar.gz"
$SERVER = "root@122.51.217.238"
$REMOTE_PATH = "/root/my-project/"

# 压缩部署包
Write-Host "压缩部署包..." -ForegroundColor Yellow
Set-Location "$DEPLOY_DIR"
tar -czf "$ARCHIVE" .

# 上传到服务器
Write-Host "上传到服务器..." -ForegroundColor Yellow
scp "$ARCHIVE" "${SERVER}:/root/"

# 在服务器上解压
Write-Host "在服务器上解压..." -ForegroundColor Yellow
ssh "$SERVER" "mkdir -p $REMOTE_PATH && tar -xzf /root/deploy.tar.gz -C $REMOTE_PATH && rm /root/deploy.tar.gz"

# 清理本地压缩包
Remove-Item -Path "$ARCHIVE" -ErrorAction SilentlyContinue

Set-Location "d:\my-project\Github\cy-component"

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host "部署完成!" -ForegroundColor Green
    Write-Host "访问地址: http://122.51.217.238" -ForegroundColor Yellow
    Write-Host "======================================" -ForegroundColor Cyan
} else {
    Write-Host "部署失败!" -ForegroundColor Red
    exit 1
}
