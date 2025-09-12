---
title: docker容器报错分析
date: 2025-09-11 10:00:00
tags:
  - Docker
  - Troubleshooting
categories:
  - 工作学习日记
  - 25年
  - 9月
---

# Docker容器报错分析

## 问题描述

在运行新创建的容器时遇到错误，容器无法正常启动并退出。

## 错误日志

```bash
```

## 错误分析

## 解决方案

### 方案一：检查并修复环境变量

确保在运行容器时包含所有必要的环境变量：

```bash
  docker run -d \
    --name graphics_algorithm \
    --restart=always \
    --gpus all \
    --cpus 36 \
    -p 5001:5001 \
    -p 8000:8000 \
    -p 8082:8082 \
    -v /home/z/模板:/home/data \
    -w /home/data/ultralytics/ \
    --shm-size 32g \
    -e PATH="/opt/conda/bin:/usr/local/nvidia/bin:/usr/local/cuda/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin" \
    graphics_algorithm_image \
    /bin/bash -c "source /etc/profile && source ~/.bashrc && cd /home/data/ultralytics/ && conda activate y8 && python -m http.server 8000 & python vi.py && tail -f /dev/null"

  docker stop graphics_algorithm
  docker rm graphics_algorithm
```

### 方案二：使用原始入口点并添加自定义命令

```bash
  # 首先检查原始镜像的入口点
  docker inspect graphics_algorithm_image --format='{{.Config.Entrypoint}}'

  # 然后使用正确的入口点
  docker run -d \
    --name graphics_algorithm \
    --restart=always \
    --gpus all \
    --cpus 36 \
    -p 5001:5001 \
    -p 8000:8000 \
    -p 8082:8082 \
    -v /home/z/模板:/home/data \
    --shm-size 64g \
    --entrypoint="/opt/nvidia/nvidia_entrypoint.sh" \
    graphics_algorithm_image \
    /bin/bash -c "source /etc/profile && source ~/.bashrc && cd /home/data/ultralytics/ && conda activate y8 && python -m http.server 8000 & python vi.py && tail -f /dev/null"
```

### 方案三：进入容器调试

先以交互模式运行容器，检查环境：

```bash
docker run -it --rm --entrypoint="/bin/bash" graphics_algorithm_image

# 在容器内检查：
# 1. Python是否安装
which python
python --version

# 2. Conda是否安装
which conda
conda --version

# 3. 环境变量
echo $PATH

# 4. y8环境是否存在
conda env list
```

+ 使用 方案三：进入容器调试
```bash
z@z-SYS-4029GP-TRT:~$ docker run -it --rm --entrypoint="/bin/bash" graphics_algorithm_image

(base) root@95fcebfcc5e3:/# which python
/home/anaconda3/bin/python

(base) root@95fcebfcc5e3:/# python --version
Python 3.12.4

(base) root@95fcebfcc5e3:/# which conda
/home/anaconda3/bin/conda

(base) root@95fcebfcc5e3:/# conda -V
conda 24.5.0

(base) root@95fcebfcc5e3:/# echo $PATH
/home/anaconda3/bin:/home/anaconda3/condabin:/usr/local/nvidia/bin:/usr/local/cuda/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

(base) root@95fcebfcc5e3:/# conda env list
  # conda environments:
  #
  base                  *  /home/anaconda3
  y8                       /home/anaconda3/envs/y8
```

#### 为什么方案三能找到python和conda？

这是一个很好的问题。在交互模式下可以找到python和conda，但在通过[docker run]命令执行自定义脚本时却找不到，主要原因如下：

1. **Shell初始化差异**：
   - 交互模式下，bash会自动加载配置文件（如[~/.bashrc]、[/etc/profile]等），这些文件中包含了conda的初始化脚本
   - 当使用`/bin/bash -c "command"`执行命令时，bash以非交互、非登录模式运行，不会自动加载这些配置文件

2. **环境变量继承**：
   - 交互式容器继承了镜像的完整环境设置，包括PATH变量中包含[/home/anaconda3/bin]路径
   - 在执行自定义命令时，如果没有正确设置环境，系统就无法找到python命令

3. **Conda环境激活机制**：
   - Conda通过修改PATH和其他环境变量来激活环境
   - 在交互模式下，`(base)`环境默认是激活的（从提示符可以看出）
   - 但在非交互模式下，需要显式执行`source`命令来激活conda环境

4. **入口点脚本**：
   - 容器的入口点脚本[/opt/nvidia/nvidia_entrypoint.sh]可能也设置了相关环境变量
   - 当覆盖入口点执行自定义命令时，这些环境变量可能没有被正确设置

这就是为什么在交互模式下一切正常，但在执行自定义脚本时会出现"command not found"错误的原因。

+ 基于你刚才的分析，使用`/bin/bash -c "command"`执行命令时 如何解决 找不到 conda 和 python 命令的问题？

根据上述分析，有以下几种解决方案：

#### 方案一：显式加载bash配置文件

在执行命令前先加载必要的配置文件：

```bash
docker run -d \
  --name graphics_algorithm \
  --restart=always \
  --gpus all \
  --cpus 36 \
  -p 5001:5001 \
  -p 8000:8000 \
  -p 8082:8082 \
  -v /home/z/模板:/home/data \
  --shm-size 32g \
  graphics_algorithm_image \
  /bin/bash -c "source /etc/profile && source ~/.bashrc && cd /home/data/ultralytics/ && conda activate y8 && python -m http.server 8000 & python vi.py && tail -f /dev/null"
```
* 执行上面命令后，还是报错找不到 python
```
==========
== CUDA ==
==========

CUDA Version 11.6.2

Container image Copyright (c) 2016-2022, NVIDIA CORPORATION & AFFILIATES. All rights reserved.

This container image and its contents are governed by the NVIDIA Deep Learning Container License.
By pulling and using the container, you accept the terms and conditions of this license:
https://developer.nvidia.com/ngc/nvidia-deep-learning-container-license

A copy of this license is made available in this container at /NGC-DL-CONTAINER-LICENSE for your convenience.

/bin/bash: python: command not found
```

#### 方案二：手动设置PATH环境变量

显式设置PATH变量，包含conda和python的路径：

```bash
docker run -d \
  --name graphics_algorithm \
  --restart=always \
  --gpus all \
  --cpus 36 \
  -p 5001:5001 \
  -p 8000:8000 \
  -p 8082:8082 \
  -v /home/z/模板:/home/data \
  --shm-size 32g \
  graphics_algorithm_image \
  /bin/bash -c "export PATH=/home/anaconda3/bin:/home/anaconda3/condabin:$PATH && cd /home/data/ultralytics/ && conda activate y8 && python -m http.server 8000 & python vi.py && tail -f /dev/null"
```

#### 融合方案：结合配置文件加载和环境变量设置

为了提高成功率，我们可以将两种方案结合起来，既加载配置文件又显式设置环境变量：

```bash
docker run -d \
  --name graphics_algorithm \
  --restart=always \
  --gpus all \
  --cpus 36 \
  -p 5001:5001 \
  -p 8000:8000 \
  -p 8082:8082 \
  -v /home/z/模板:/home/data \
  --shm-size 32g \
  graphics_algorithm_image \
  /bin/bash -c "source /etc/profile 2>/dev/null || true; source ~/.bashrc 2>/dev/null || true; export PATH=/home/anaconda3/bin:/home/anaconda3/condabin:$PATH; cd /home/data/ultralytics/ && conda activate y8 && python -m http.server 8000 & python vi.py && tail -f /dev/null"
```

这种方法的优势：
1. 尝试加载系统配置文件（如果存在）
2. 显式设置PATH环境变量作为后备方案
3. 使用`2>/dev/null || true`避免配置文件不存在时的错误

#### 最佳实践方案：使用绝对路径（推荐）

虽然融合方案可能有效，但最可靠的解决方案仍然是使用绝对路径：

```
docker run -d \
  --name graphics_algorithm \
  --restart=always \
  --gpus all \
  --cpus 36 \
  -p 5001:5001 \
  -p 8000:8000 \
  -p 8082:8082 \
  -v /home/z/模板:/home/data \
  --shm-size 32g \
  graphics_algorithm_image \
  /bin/bash -c "cd /home/data/ultralytics/ && /home/anaconda3/bin/python -m http.server 8000 & /home/anaconda3/envs/y8/bin/python /home/data/ultralytics/vi.py && tail -f /dev/null"
```

**注意**：如果[vi.py]文件在[/home/data/ultralytics/]目录下，使用`cd`命令切换目录后，可以直接使用相对路径调用。但如果仍然报找不到[vi.py]文件，可以使用完整路径：

```bash
docker run -d \
  --name graphics_algorithm \
  --restart=always \
  --gpus all \
  --cpus 36 \
  -p 5001:5001 \
  -p 8000:8000 \
  -p 8082:8082 \
  -v /home/z/模板:/home/data \
  --shm-size 32g \
  graphics_algorithm_image \
  /bin/bash -c "cd /home/data/ultralytics/ && /home/anaconda3/bin/python -m http.server 8000 & /home/anaconda3/envs/y8/bin/python /home/data/ultralytics/vi.py && tail -f /dev/null"
```

或者在执行[vi.py]之前确认文件存在：

```bash
docker run -d \
  --name graphics_algorithm \
  --restart=always \
  --gpus all \
  --cpus 36 \
  -p 5001:5001 \
  -p 8000:8000 \
  -p 8082:8082 \
  -v /home/z/模板:/home/data \
  --shm-size 32g \
  graphics_algorithm_image \
  /bin/bash -c "cd /home/data/ultralytics/ && ls -la && /home/anaconda3/bin/python -m http.server 8000 & /home/anaconda3/envs/y8/bin/python vi.py && tail -f /dev/null"
```

#### 方案四：初始化conda环境

显式初始化conda环境：

```bash
docker run -d \
  --name graphics_algorithm \
  --restart=always \
  --gpus all \
  --cpus 36 \
  -p 5001:5001 \
  -p 8000:8000 \
  -p 8082:8082 \
  -v /home/z/模板:/home/data \
  --shm-size 32g \
  graphics_algorithm_image \
  /bin/bash -c "cd /home/data/ultralytics/ && source /home/anaconda3/etc/profile.d/conda.sh && conda activate y8 && python -m http.server 8000 & python vi.py && tail -f /dev/null"
```

推荐使用方案三（绝对路径），因为它最可靠，不依赖于环境变量的正确设置。

### 方案四：重新构建镜像

如果上述方案都不行，可能需要重新构建镜像，在Dockerfile中确保正确安装所有依赖：

```dockerfile
FROM graphics_algorithm_image

# 确保环境变量正确设置
ENV PATH="/opt/conda/bin:$PATH"

# 安装或验证conda和python
RUN conda --version || echo "Conda not found"
RUN python --version || echo "Python not found"

# 其他必要的设置...
```

## 预防措施

1. 在提交容器为镜像前，确保所有必要组件都已安装
2. 使用Dockerfile而不是直接提交容器，以确保构建过程可重复
3. 在生产环境部署前，先在测试环境中验证容器功能
4. 记录完整的环境配置信息，包括所有环境变量

## 总结

该错误主要是由于容器中缺少Python和Conda环境导致的。建议先通过交互模式进入容器检查环境配置，然后根据检查结果选择合适的解决方案。


# 2025年9月11日 14:11:18
+ 使用脚本文件方式
  创建一个启动脚本，将所有命令放在一个脚本文件中执行，这样可以确保环境设置在同一上下文中：

  **关于脚本文件存放位置的说明：**

  脚本文件需要存放在容器中，因为docker run命令是在容器内部执行的。有几种方式可以将脚本放入容器：

  1. **通过数据卷挂载（推荐）**：将宿主机上的脚本文件挂载到容器中
  2. **构建新镜像**：将脚本文件打包到新的镜像中
  3. **在容器启动时动态创建**：通过echo命令在容器中创建脚本文件

  首先创建一个启动脚本run_services.sh：
  ```bash
    #!/bin/bash
    cd /home/data/ultralytics/
    source /home/anaconda3/etc/profile.d/conda.sh
    conda activate y8
    python -m http.server 8000 &
    python vi.py
    tail -f /dev/null
  ```

  **方法一：通过数据卷挂载脚本文件（推荐）**

  首先在宿主机上创建脚本文件，例如放在[/home/z/scripts/run_services.sh](file:///home/z/scripts/run_services.sh)：
  ```bash
  # 在宿主机上创建脚本文件
  mkdir -p /home/z/scripts
  cat > /home/z/scripts/run_services.sh << 'EOF'
  #!/bin/bash
  cd /home/data/ultralytics/
  source /home/anaconda3/etc/profile.d/conda.sh
  conda activate y8
  python -m http.server 8000 &
  python vi.py
  tail -f /dev/null
  EOF

  chmod +x /home/z/scripts/run_services.sh
  ```

  然后通过数据卷挂载运行容器：
  ```bash
  docker run -d \
    --name graphics_algorithm \
    --restart=always \
    --gpus all \
    --cpus 36 \
    -p 5001:5001 \
    -p 8000:8000 \
    -p 8082:8082 \
    -v /home/z/模板:/home/data \
    -v /home/z/scripts:/scripts \
    --shm-size 32g \
    graphics_algorithm_image \
    /bin/bash -c "chmod +x /scripts/run_services.sh && /scripts/run_services.sh"
  ```

  **方法二：在容器启动时动态创建脚本**
  ```bash
  docker run -d \
    --name graphics_algorithm \
    --restart=always \
    --gpus all \
    --cpus 36 \
    -p 5001:5001 \
    -p 8000:8000 \
    -p 8082:8082 \
    -v /home/z/模板:/home/data \
    --shm-size 32g \
    graphics_algorithm_image \
    /bin/bash -c "cat > /tmp/run_services.sh << 'EOF'
  #!/bin/bash
  cd /home/data/ultralytics/
  source /home/anaconda3/etc/profile.d/conda.sh
  conda activate y8
  python -m http.server 8000 &
  python vi.py
  tail -f /dev/null
  EOF
  chmod +x /tmp/run_services.sh && /tmp/run_services.sh"
  ```

  **方法三：构建包含脚本的新镜像（最佳实践）**

  创建Dockerfile：
  ```dockerfile
  FROM graphics_algorithm_image

  COPY run_services.sh /usr/local/bin/
  RUN chmod +x /usr/local/bin/run_services.sh

  CMD ["/usr/local/bin/run_services.sh"]
  ```

  构建并运行新镜像：
  ```bash
  # 构建新镜像
  docker build -t graphics_algorithm_image_with_script .

  # 运行容器
  docker run -d \
    --name graphics_algorithm \
    --restart=always \
    --gpus all \
    --cpus 36 \
    -p 5001:5001 \
    -p 8000:8000 \
    -p 8082:8082 \
    -v /home/z/模板:/home/data \
    --shm-size 32g \
    graphics_algorithm_image_with_script
  ```
