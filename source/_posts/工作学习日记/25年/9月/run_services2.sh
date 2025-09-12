#!/bin/bash
cd /home/data/ultralytics/

# 尝试加载系统配置文件并设置环境变量
source /etc/profile 2>/dev/null || true
source ~/.bashrc 2>/dev/null || true
export PATH=/home/anaconda3/bin:/home/anaconda3/condabin:$PATH

# 初始化conda环境
source /home/anaconda3/etc/profile.d/conda.sh
conda init
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
