# PowerShell 构建脚本

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "开始构建所有项目..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# 设置基础路径
$BASE_DIR = "d:\my-project\Github"
$DEPLOY_DIR = "$BASE_DIR\cy-component\deploy"

# 清理并创建部署目录
Write-Host "清理并创建部署目录..." -ForegroundColor Yellow
if (Test-Path $DEPLOY_DIR) {
    Remove-Item -Path $DEPLOY_DIR -Recurse -Force
}
New-Item -Path "$DEPLOY_DIR\projects" -ItemType Directory -Force | Out-Null

# 1. 构建 cy-component (主项目)
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "1. 构建 cy-component..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Set-Location "$BASE_DIR\cy-component"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: cy-component 构建失败" -ForegroundColor Red
    exit 1
}
# 复制主项目构建产物到部署目录根目录
Copy-Item -Path "www\*" -Destination $DEPLOY_DIR -Recurse -Force
Write-Host "✓ cy-component 构建完成" -ForegroundColor Green

# 2. 复制 2d-noise (无需构建)
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "2. 复制 2d-noise..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
New-Item -Path "$DEPLOY_DIR\projects\2d-noise" -ItemType Directory -Force | Out-Null
Copy-Item -Path "$BASE_DIR\2d-noise\*" -Destination "$DEPLOY_DIR\projects\2d-noise\" -Recurse -Force
# 删除不必要的文件
Remove-Item -Path "$DEPLOY_DIR\projects\2d-noise\.gitignore" -ErrorAction SilentlyContinue
Remove-Item -Path "$DEPLOY_DIR\projects\2d-noise\package.json" -ErrorAction SilentlyContinue
Remove-Item -Path "$DEPLOY_DIR\projects\2d-noise\README.md" -ErrorAction SilentlyContinue
Remove-Item -Path "$DEPLOY_DIR\projects\2d-noise\noise.ts" -ErrorAction SilentlyContinue
Write-Host "✓ 2d-noise 复制完成" -ForegroundColor Green

# 3. 构建 DataScreen
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "3. 构建 DataScreen..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Set-Location "$BASE_DIR\DataScreen"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: DataScreen 构建失败" -ForegroundColor Red
    exit 1
}
New-Item -Path "$DEPLOY_DIR\projects\DataScreen" -ItemType Directory -Force | Out-Null
Copy-Item -Path "www\*" -Destination "$DEPLOY_DIR\projects\DataScreen\" -Recurse -Force
Write-Host "✓ DataScreen 构建完成" -ForegroundColor Green

# 4. 构建 demo (心脏标准切面)
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "4. 构建 demo..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Set-Location "$BASE_DIR\demo"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: demo 构建失败" -ForegroundColor Red
    exit 1
}
New-Item -Path "$DEPLOY_DIR\projects\demo" -ItemType Directory -Force | Out-Null
Copy-Item -Path "build\*" -Destination "$DEPLOY_DIR\projects\demo\" -Recurse -Force
Write-Host "✓ demo 构建完成" -ForegroundColor Green

# 5. 构建 SimpleRenderer
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "5. 构建 SimpleRenderer..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Set-Location "$BASE_DIR\SimpleRenderer"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: SimpleRenderer 构建失败" -ForegroundColor Red
    exit 1
}
New-Item -Path "$DEPLOY_DIR\projects\SimpleRenderer" -ItemType Directory -Force | Out-Null
Copy-Item -Path "www\*" -Destination "$DEPLOY_DIR\projects\SimpleRenderer\" -Recurse -Force
Write-Host "✓ SimpleRenderer 构建完成" -ForegroundColor Green

# 6. 构建 tinyrenderer
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "6. 构建 tinyrenderer..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Set-Location "$BASE_DIR\tinyrenderer"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: tinyrenderer 构建失败" -ForegroundColor Red
    exit 1
}
New-Item -Path "$DEPLOY_DIR\projects\tinyrenderer" -ItemType Directory -Force | Out-Null
Copy-Item -Path "www\*" -Destination "$DEPLOY_DIR\projects\tinyrenderer\" -Recurse -Force
Write-Host "✓ tinyrenderer 构建完成" -ForegroundColor Green

# 7. 构建 raytrace
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "7. 构建 raytrace..." -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Set-Location "$BASE_DIR\raytrace"
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "错误: raytrace 构建失败" -ForegroundColor Red
    exit 1
}
New-Item -Path "$DEPLOY_DIR\projects\raytrace" -ItemType Directory -Force | Out-Null
Copy-Item -Path "www\*" -Destination "$DEPLOY_DIR\projects\raytrace\" -Recurse -Force
Write-Host "✓ raytrace 构建完成" -ForegroundColor Green

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "所有项目构建完成!" -ForegroundColor Green
Write-Host "部署目录: $DEPLOY_DIR" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "目录结构:" -ForegroundColor Yellow
Write-Host "deploy/"
Write-Host "├── index.html          (主入口)"
Write-Host "├── build/              (主项目资源)"
Write-Host "└── projects/"
Write-Host "    ├── 2d-noise/"
Write-Host "    ├── DataScreen/"
Write-Host "    ├── demo/"
Write-Host "    ├── SimpleRenderer/"
Write-Host "    ├── tinyrenderer/"
Write-Host "    └── raytrace/"
Write-Host ""

# 返回到 cy-component 目录
Set-Location "$BASE_DIR\cy-component"
