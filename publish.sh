# 构建所有项目并整合
echo "Building all projects..."
sh build-all.sh

if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

# 压缩部署包
echo "Compressing deployment package..."
tar -czf deploy.tar.gz -C deploy .

# 上传到服务器
echo "Uploading to server..."
scp deploy.tar.gz root@122.51.217.238:/root/

# 在服务器上解压
echo "Extracting on server..."
ssh root@122.51.217.238 "mkdir -p /root/my-project && tar -xzf /root/deploy.tar.gz -C /root/my-project/ && rm /root/deploy.tar.gz"

# 清理本地压缩包
rm deploy.tar.gz

echo "Deployment completed!"
echo "Access your site at: http://122.51.217.238"
