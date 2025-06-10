# 搭建WSL Ubuntu 20.04 conda 环境
  - Step 0: 创建 WSL Ubuntu 20.04 conda 环境
    > conda create --name AI python=3.11

  - Step 1: 激活你的 Conda 环境（假设环境名为 AI）
    > conda activate AI

  - Step 2: 使用 pip 安装支持 CUDA 的 PyTorch（以 cu118 为例）
    > pip install torch==2.5.1+cu118 torchvision==0.20.1+cu118 torchaudio==2.5.1 --extra-index-url https://download.pytorch.org/whl/cu118

  - 清除缓存
    > pip cache purge

  - Step 3: 验证安装是否成功，运行以下 Python 代码：
    > python -c "import torch; print('CUDA 可用:', torch.cuda.is_available()); print('当前设备:', torch.cuda.get_device_name(0))"

  - Step 4: 将环境导出为配置文件，便于 复现|部署：
    > conda env export > environment.yml

  - 构建 Docker 镜像

  - WSL 访问 ollama服务端口
    > curl http://localhost:11434/api/tags

  + 如何在 wsl Ubuntu 访问 win11 的 ollama服务？
    