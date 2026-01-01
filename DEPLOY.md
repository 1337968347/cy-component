# 部署指南

本项目已整合多个子项目，可以一键构建并部署到服务器。

## 项目结构

整合后的部署包含以下项目：

- **cy-component** (主项目) - 组件展示和导航
- **2d-noise** - 噪声生成演示
- **DataScreen** - 数据可视化大屏
- **demo** - 心脏标准切面渲染
- **SimpleRenderer** - 水渲染
- **tinyrenderer** - 软光栅渲染器
- **raytrace** - 小球路径追踪

## 使用方法

### Windows 环境（推荐）

使用 PowerShell 执行：

```powershell
# 仅构建所有项目
.\build-all.ps1

# 构建并部署到服务器
.\deploy.ps1
```

### Linux/Mac/Git Bash 环境

```bash
# 仅构建所有项目
sh build-all.sh

# 构建并部署到服务器
sh publish.sh
```

## 构建产物

构建完成后，所有文件会整合到 `deploy/` 目录：

```
deploy/
├── index.html          # 主入口页面
├── build/              # 主项目资源
├── manifest.json
└── projects/           # 子项目目录
    ├── 2d-noise/
    ├── DataScreen/
    ├── demo/
    ├── SimpleRenderer/
    ├── tinyrenderer/
    └── raytrace/
```

## 部署说明

### 自动部署

运行 `deploy.ps1` (Windows) 或 `publish.sh` (Linux/Mac) 会自动：

1. 构建所有项目
2. 整合到 deploy 目录
3. 上传到服务器: `root@122.51.217.238:/root/my-project/`

### 手动部署

如果需要手动部署，可以：

1. 先运行构建脚本生成 deploy 目录
2. 使用 FTP/SFTP 工具将 deploy 目录内容上传到服务器
3. 确保 Web 服务器（如 Nginx）配置正确

## Nginx 配置示例

在服务器上配置 Nginx 来提供静态文件服务：

```nginx
server {
    listen 80;
    server_name 122.51.217.238;
    
    root /root/my-project;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 为子项目配置正确的 MIME 类型
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 访问地址

部署完成后，可以通过以下地址访问：

- 主站: http://122.51.217.238
- 2D Noise: http://122.51.217.238/projects/2d-noise/
- 数据可视化: http://122.51.217.238/projects/DataScreen/
- 心脏渲染: http://122.51.217.238/projects/demo/
- 水渲染: http://122.51.217.238/projects/SimpleRenderer/
- 软光栅: http://122.51.217.238/projects/tinyrenderer/
- 路径追踪: http://122.51.217.238/projects/raytrace/

## 注意事项

1. **首次构建**: 首次运行构建脚本时，需要确保各个项目的依赖已安装（npm install）
2. **构建时间**: 完整构建所有项目可能需要几分钟时间
3. **SSH 配置**: 部署到服务器需要配置 SSH 密钥，避免每次输入密码
4. **端口访问**: 确保服务器防火墙允许 80 端口访问

## 故障排查

### 构建失败

如果某个项目构建失败，检查：
- 是否已运行 `npm install` 安装依赖
- Node.js 版本是否符合要求
- 检查具体错误信息

### 部署失败

如果部署失败，检查：
- SSH 连接是否正常: `ssh root@122.51.217.238`
- scp 命令是否可用
- 服务器目标路径是否存在且有写入权限

### 页面无法访问

如果部署后无法访问，检查：
- Nginx 服务是否运行: `systemctl status nginx`
- 防火墙设置: `firewall-cmd --list-all`
- 文件路径和权限是否正确
