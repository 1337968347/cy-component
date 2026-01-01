#!/bin/bash

echo "======================================"
echo "开始构建所有项目..."
echo "======================================"

# 设置基础路径
BASE_DIR="d:/my-project/Github"
DEPLOY_DIR="$BASE_DIR/cy-component/deploy"

# 清理并创建部署目录
echo "清理并创建部署目录..."
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/projects"

# 1. 构建 cy-component (主项目)
echo ""
echo "======================================"
echo "1. 构建 cy-component..."
echo "======================================"
cd "$BASE_DIR/cy-component"
npm run build
if [ $? -ne 0 ]; then
    echo "错误: cy-component 构建失败"
    exit 1
fi
# 复制主项目构建产物到部署目录根目录
cp -r www/* "$DEPLOY_DIR/"
echo "✓ cy-component 构建完成"

# 2. 复制 2d-noise (无需构建)
echo ""
echo "======================================"
echo "2. 复制 2d-noise..."
echo "======================================"
mkdir -p "$DEPLOY_DIR/projects/2d-noise"
cp -r "$BASE_DIR/2d-noise"/* "$DEPLOY_DIR/projects/2d-noise/"
# 删除不必要的文件
rm -f "$DEPLOY_DIR/projects/2d-noise/.gitignore"
rm -f "$DEPLOY_DIR/projects/2d-noise/package.json"
rm -f "$DEPLOY_DIR/projects/2d-noise/README.md"
rm -f "$DEPLOY_DIR/projects/2d-noise/noise.ts"
echo "✓ 2d-noise 复制完成"

# 3. 构建 DataScreen
echo ""
echo "======================================"
echo "3. 构建 DataScreen..."
echo "======================================"
cd "$BASE_DIR/DataScreen"
npm run build
if [ $? -ne 0 ]; then
    echo "错误: DataScreen 构建失败"
    exit 1
fi
mkdir -p "$DEPLOY_DIR/projects/DataScreen"
cp -r www/* "$DEPLOY_DIR/projects/DataScreen/"
echo "✓ DataScreen 构建完成"

# 4. 构建 demo (心脏标准切面)
echo ""
echo "======================================"
echo "4. 构建 demo..."
echo "======================================"
cd "$BASE_DIR/demo"
npm run build
if [ $? -ne 0 ]; then
    echo "错误: demo 构建失败"
    exit 1
fi
mkdir -p "$DEPLOY_DIR/projects/demo"
cp -r build/* "$DEPLOY_DIR/projects/demo/"
echo "✓ demo 构建完成"

# 5. 构建 SimpleRenderer
echo ""
echo "======================================"
echo "5. 构建 SimpleRenderer..."
echo "======================================"
cd "$BASE_DIR/SimpleRenderer"
npm run build
if [ $? -ne 0 ]; then
    echo "错误: SimpleRenderer 构建失败"
    exit 1
fi
mkdir -p "$DEPLOY_DIR/projects/SimpleRenderer"
cp -r www/* "$DEPLOY_DIR/projects/SimpleRenderer/"
echo "✓ SimpleRenderer 构建完成"

# 6. 构建 tinyrenderer
echo ""
echo "======================================"
echo "6. 构建 tinyrenderer..."
echo "======================================"
cd "$BASE_DIR/tinyrenderer"
npm run build
if [ $? -ne 0 ]; then
    echo "错误: tinyrenderer 构建失败"
    exit 1
fi
mkdir -p "$DEPLOY_DIR/projects/tinyrenderer"
cp -r www/* "$DEPLOY_DIR/projects/tinyrenderer/"
echo "✓ tinyrenderer 构建完成"

# 7. 构建 raytrace
echo ""
echo "======================================"
echo "7. 构建 raytrace..."
echo "======================================"
cd "$BASE_DIR/raytrace"
npm run build
if [ $? -ne 0 ]; then
    echo "错误: raytrace 构建失败"
    exit 1
fi
mkdir -p "$DEPLOY_DIR/projects/raytrace"
cp -r www/* "$DEPLOY_DIR/projects/raytrace/"
echo "✓ raytrace 构建完成"

echo ""
echo "======================================"
echo "所有项目构建完成!"
echo "部署目录: $DEPLOY_DIR"
echo "======================================"
echo ""
echo "目录结构:"
echo "deploy/"
echo "├── index.html          (主入口)"
echo "├── build/              (主项目资源)"
echo "└── projects/"
echo "    ├── 2d-noise/"
echo "    ├── DataScreen/"
echo "    ├── demo/"
echo "    ├── SimpleRenderer/"
echo "    ├── tinyrenderer/"
echo "    └── raytrace/"
echo ""
