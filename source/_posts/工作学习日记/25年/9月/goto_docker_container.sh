#!/bin/bash
# 自动跳转到指定Docker容器目录的脚本

CONTAINER_ID="ca51df3d8f94e69552ced7c122cd39efe9fe9e02df2717077815c2c5ed2d601f"
TARGET_DIR="/var/lib/docker/containers/${CONTAINER_ID}"

# 检查目录是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo "错误: 目录 $TARGET_DIR 不存在"
    exit 1
fi

# 切换到目标目录
cd "$TARGET_DIR"

# 启动一个新的shell会话
echo "已切换到目录: $(pwd)"
exec bash
