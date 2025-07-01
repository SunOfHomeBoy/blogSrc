# 一、驱动程序更新需求
  1. 驱动兼容性分析
    + 同型号显卡无需强制更新驱动：若新增 Tesla P40 与现有显卡 完全同型号（包括固件版本一致），且当前驱动版本 ≥ 470.82.01（支持 Turing 架构），则系统可自动识别新显卡。

    + 需更新驱动的场景：
      - 当前驱动版本 < 470.82.01（需升级至最新稳定版）
      - 系统内核版本更新（如从 Ubuntu 20.04 升级到 22.04）
      - 需要启用新功能（如 DLSS 3.0 或 CUDA 12 优化）

  2. 验证驱动状态
    ```bash
    # 查看当前驱动版本

    nvidia-smi --query-gpu=driver_version --format=csv
    # 示例输出：driver_version: 535.161.08

    # 检查多显卡识别状态

    lspci -vnn | grep -i nvidia
    # 应显示两张 P40 显卡信息
    ```

# 二、服务器硬件配置验证
  1. 物理连接检查
    + 电源需求：单张 P40 功耗 250W，双卡需至少 850W 电源（建议 1000W 以上冗余）
    + PCIe 通道分配：
      - 确认主板支持 PCIe 3.0 x16 插槽（P40 无需 x16 带宽即可满速运行）
      - 若使用 NVLink 桥接，需额外安装桥接器（提升多卡通信效率）
  2. BIOS 设置
    + 启用多 GPU 支持：
      - 开启 Above 4G Decoding（避免大显存寻址冲突）
      - 关闭 PCIe ASPM（减少电源管理导致的通信延迟）

# 三、Docker 多 GPU 配置
  1. 容器启动参数优化
  ```sh
  docker run -d \
    --name ollama_multi_gpu \
    --gpus all \                  # 启用所有 GPU
    -e NVIDIA_VISIBLE_DEVICES=0,1 \  # 显式指定 GPU 索引
    -e OLLAMA_NUM_GPU_LAYERS=60 \   # 分配更多层到 GPU
    -e OLLAMA_GPU_LAYER_OFFLOAD=1 \ # 启用 GPU 层卸载
    ollama_qwen3_32b_container
  ```
  
  2. 验证容器内 GPU 可用性
  ```sh
  docker exec -it ollama_multi_gpu nvidia-smi
  # 应显示两张 GPU 的负载和显存使用
  ```

# 四、Ollama 多 GPU 并行策略
  1. 环境变量配置
  ```sh
  # 设置多 GPU 并行模式
  export OLLAMA_SCHED_SPREAD=1      # 启用模型层自动分布
  export CUDA_VISIBLE_DEVICES="0,1" # 限制容器可见 GPU

  # 启动大模型时指定多卡
  ollama run qwen3:32b --gpu-layers 60 --n-gpu-layers 30
  ```

  2. 性能调优建议
    + 显存分配：若单卡显存不足，可通过 --n-gpu-layers 分割模型层到不同 GPU
    + 通信优化：启用 NCCL_DEBUG=INFO 查看多卡通信日志

      > docker run ... -e NCCL_DEBUG=INFO ...
  

# 五、故障排查指南
  现象 解决方案

  新显卡未被识别: [
    1. 检查 PCIe 插槽供电,
    2. 更新 BIOS 至最新版本,
    3. 使用 sudo ubuntu-drivers autoinstall 重新安装驱动
  ]
    
  容器内仅显示单GPU: [
    1. 确认 NVIDIA_VISIBLE_DEVICES 设置,
    2. 检查 Docker 运行时是否加载 nvidia 模块（lsmod grep nvidia）
  ]
  多 GPU 负载不均: [
    1. 调整 OLLAMA_GPU_SPLIT 策略,
    2. 使用 torch.distributed 实现数据并行
  ]

# 六、扩展建议
  + 使用 GPU 监控工具：
    ```sh
    # 实时监控多 GPU 利用率
    watch -n 1 "docker exec ollama_multi_gpu nvidia-smi --query-gpu=index,utilization.gpu --format=csv"
    ```
  + 启用持久化模式：
    > nvidia-smi -i 0,1 -pm 1  # 启用持久化模式提升稳定性

通过以上配置，新增的 Tesla P40 显卡可与现有显卡协同工作，无需额外驱动更新（除非系统环境有变动）。Docker 和 Ollama 通过标准的多 GPU 配置参数即可实现无缝扩展。

# 2025年6月30日 周一
+ 腾讯元宝
```bash
  以下是无需 Docker Compose 的直接配置方案，通过 docker run 命令实现双 Tesla P40 显卡调用：

  一、停止现有容器

  docker stop dcf9a775ca0e  # 停止当前 Ollama 容器

  二、启动多 GPU 容器

  docker run -d \
    --name ollama_multi_gpu \
    --gpus "device=0,1" \                 # 指定使用 GPU 0 和 1
    -e CUDA_VISIBLE_DEVICES=0,1 \         # 显式声明可见 GPU
    -e OLLAMA_NUM_GPU=2 \                 # 设置 GPU 数量
    -e OLLAMA_GPU_LAYERS=32 \             # 分配前 32 层到 GPU
    -p 11434:11434 \                      # 暴露 API 端口
    -v /opt/ollama:/root/.ollama \        # 挂载模型存储
    --shm-size=32G \                      # 扩展共享内存
    ollama_qwen3_32b_gpu:V1.0 \           # 使用 GPU 优化镜像
    ollama run qwen3:32b --tensor-parallel-size 2  # 启动多 GPU 推理

  三、关键参数说明
  参数 作用 参考值

  --gpus "device=0,1" 指定使用的物理 GPU 编号 根据实际 PCIe 位置调整
  CUDA_VISIBLE_DEVICES 控制容器内可见的 GPU 必须与 --gpus 一致
  OLLAMA_NUM_GPU 声明可用 GPU 数量 双卡设为 2
  --tensor-parallel-size 设置张量并行度 不超过 GPU 数量

  四、验证配置
  宿主机端验证

  查看 PCIe 总线状态

  lspci -vvv | grep -A 12 "Tesla P40"  # 确认两张卡均处于 PCIe 3.0 x16 模式

  检查驱动绑定

  nvidia-smi topo -m  # 应显示两张卡处于相同 PCIe 域

  容器内验证

  docker exec -it ollama_multi_gpu bash
  nvidia-smi -L  # 应显示两张显卡
  cat /sys/module/nvidia/version  # 确认内核模块版本一致

  五、性能调优建议
  显存分配策略

        # 手动分配显存（根据模型需求调整）
    docker run ... --gpu-memory 24GiB --gpu-memory 24GiB
    
  PCIe 带宽优化

        # 提升 PCIe 传输效率
    echo 100000 > /sys/module/nvidia/parameters/pci_bus_max
    
  系统级调度优化

        # 提高内核调度优先级
    sudo systemctl set-property docker.service CPUQuota=200%
    

  六、常见问题处理
  现象 解决方案

  容器仅识别单卡 检查 /etc/docker/daemon.json 是否包含 "default-runtime": "nvidia"
  PCIe 带宽不足 使用 lspci -vvv 检查 PCIe 链路状态，确认 Switch 是否启用
  显存分配失败 添加 --shm-size=32G 参数扩大共享内存
  温度过高 设置风扇曲线 sudo nvidia-settings -a "[gpu:0]/GPUFanControlState=1"

  七、进阶配置（可选）
  NVLink 桥接配置

        # 安装桥接驱动
    sudo apt install nvidia-driver-570-nvlink
    
    # 启动时添加参数
    --nvlink-bridges 1 --nvlink-width 16
    
  分布式推理配置

        # 使用 vLLM 分布式框架
    docker run --gpus all -p 8000:8000 \
      -v $(pwd)/models:/usr/share/ollama/.ollama/models \
      ollama/ollama run qwen3:32b --tensor-parallel-size 2
    

  通过以上配置，您的双 Tesla P40 显卡可提供 48GB 显存和 19.2 TFLOPS 的算力。建议使用 nvidia-smi -i 0,1 -pm 1 启用持久模式，并通过 nvidia-smi -i 0,1 -ac 877,1530 提升时钟频率。
```

