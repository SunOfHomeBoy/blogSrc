#!/bin/bash
cd /home/data/ultralytics/

# 尝试加载系统配置文件并设置环境变量
source /etc/profile 2>/dev/null || true
source ~/.bashrc 2>/dev/null || true
export PATH=/home/anaconda3/bin:/home/anaconda3/condabin:$PATH

# 启动HTTP服务器
/home/anaconda3/bin/python -m http.server 8000 &
echo "HTTP server started"

# 检查模型文件
if [ -f "best.pt" ]; then
    echo "Found best.pt, starting vi.py"
    # 激活conda环境并运行vi.py
    conda init && conda activate y8 && python vi.py
else
    echo "ERROR: best.pt not found!"
    ls -la
fi

# 保持容器运行
tail -f /dev/null
