#!/bin/bash
cd /home/data/ultralytics/

# 初始化conda环境
source /home/anaconda3/etc/profile.d/conda.sh
conda activate y8

# 启动HTTP服务器
/home/anaconda3/envs/y8/bin/python -m http.server 8000 &
echo "HTTP server started"

# 检查模型文件
if [ -f "best.pt" ]; then
    echo "Found best.pt, starting vi.py"
    # 在已激活的conda环境中运行vi.py
    python vi.py
else
    echo "ERROR: best.pt not found!"
    ls -la
fi

# 保持容器运行
tail -f /dev/null
