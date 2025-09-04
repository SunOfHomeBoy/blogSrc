针对 Python 程序在 Docker 容器中**启动时自动执行 `python main.py`** 的场景，实现断点调试的关键是**以交互模式启动容器**并**在代码或启动命令中注入调试逻辑**。以下是具体实现方案和操作步骤：


### **一、核心思路**
Python 断点调试的核心工具是内置的 `pdb`（Python Debugger）或增强版的 `pudb`（需额外安装）。在 Docker 中实现调试需满足：
1. 容器以**交互模式**（`-it`）运行，允许与调试器终端交互。
2. 代码中插入断点（或通过启动命令触发调试模式）。
3. 确保容器内安装了调试工具（如 `pdb` 无需额外安装，`pudb` 需手动安装）。


### **二、具体实现步骤**

#### **方案 1：通过启动命令直接触发 pdb 调试（无需修改代码）**
适用于临时调试，无需修改现有代码，通过修改 Docker 启动命令启动调试模式。

##### **步骤 1：修改 Docker 运行命令（关键）**
默认情况下，Docker 启动命令可能是 `docker run my-python-image python main.py`（后台或非交互模式）。需调整为**交互模式**并触发 `pdb`：
```bash
# 停止当前运行的容器（若有）
docker stop my-container

# 以交互模式启动容器，并覆盖默认命令为 pdb 调试
docker run -it --rm \
  --name my-debug-container \  # 自定义容器名
  my-python-image \  # 你的镜像名
  python -m pdb main.py  # 关键：通过 -m pdb 启动调试
```

##### **步骤 2：在 pdb 中设置断点并调试**
容器启动后，程序会暂停在 `main.py` 的第一行，等待调试命令：
```
> /app/main.py(1)<module>()
-> import os
(Pdb)  # 进入 pdb 交互模式
```

常用 pdb 命令：
- `l`（list）：查看当前行附近的代码（如 `l 10` 查看第 10 行附近）。
- `b <行号>`（break）：在指定行设置断点（如 `b 25` 在第 25 行设断点）。
- `n`（next）：执行下一行（不进入函数）。
- `s`（step）：进入函数内部执行。
- `p <变量名>`（print）：打印变量值（如 `p user_id`）。
- `c`（continue）：继续运行直到下一个断点或程序结束。
- `q`（quit）：退出调试（会终止程序）。


#### **方案 2：在代码中嵌入断点（灵活控制断点位置）**
通过 `pdb.set_trace()` 在代码中主动插入断点，适用于需要精准控制调试位置的场景。

##### **步骤 1：修改 Python 代码**
在需要调试的代码处添加 `import pdb; pdb.set_trace()`：
```python
# main.py
def process_data(data):
    print("开始处理数据...")
    import pdb; pdb.set_trace()  # 断点位置（调试时会在此暂停）
    result = data * 2
    print(f"处理结果：{result}")
    return result

if __name__ == "__main__":
    input_data = 10
    output = process_data(input_data)
    print(f"最终输出：{output}")
```

##### **步骤 2：启动容器（无需修改启动命令）**
直接以交互模式启动容器（确保能接收调试器输入）：
```bash
docker run -it --rm \
  --name my-debug-container \
  my-python-image \  # 镜像需包含 pdb（Python 内置，无需额外安装）
  python main.py  # 正常启动命令
```

##### **步骤 3：调试过程**
程序运行到 `pdb.set_trace()` 时会自动暂停，进入 pdb 交互模式：
```
开始处理数据...
> /app/main.py(5)process_data()
-> result = data * 2
(Pdb)  # 可在此查看变量（如 p data）、执行下一步（n）等
```


#### **方案 3：远程调试（适合无法直接访问容器的场景）**
若容器运行在远程服务器，可通过 `debugpy`（Python 调试器的远程模式）结合 IDE（如 VS Code）实现图形化调试。

##### **步骤 1：在容器内安装 debugpy**
修改 Dockerfile 安装 `debugpy`（或在容器内手动安装）：
```dockerfile
# Dockerfile
FROM python:3.9-slim

# 安装 debugpy（远程调试依赖）
RUN pip install debugpy

# 复制代码并设置启动命令（保持自动执行 python main.py）
WORKDIR /app
COPY . .
CMD ["python", "main.py"]
```

构建并启动容器（需暴露调试端口，如 5678）：
```bash
docker build -t my-debug-image .
docker run -it --rm \
  -p 5678:5678 \  # 映射调试端口到宿主机
  --name my-debug-container \
  my-debug-image
```

##### **步骤 2：在代码中添加远程调试入口**
修改 `main.py`，在启动时连接远程调试器（或延迟执行，等待 IDE 连接）：
```python
# main.py
import debugpy
import time

# 等待 IDE 连接（超时时间 30 秒）
debugpy.listen(("0.0.0.0", 5678))
print("等待调试器连接...")
debugpy.wait_for_client()  # 阻塞直到 IDE 连接

# 正常业务代码
def main():
    print("程序启动，开始执行...")
    # ... 你的业务逻辑 ...

if __name__ == "__main__":
    main()
```

##### **步骤 3：通过 VS Code 连接调试**
1. 在 VS Code 中打开项目，创建 `.vscode/launch.json`：
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "name": "远程调试 Python",
         "type": "python",
         "request": "attach",
         "host": "localhost",  # 若宿主机和远程服务器不同，需替换为服务器 IP
         "port": 5678,
         "pathMappings": [
           {
             "localRoot": "${workspaceFolder}",  # 本地代码路径
             "remoteRoot": "/app"  # 容器内代码路径
           }
         ]
       }
     ]
   }
   ```
2. 启动容器后，在 VS Code 中点击调试按钮（F5），选择上述配置。
3. VS Code 连接成功后，即可在代码中设置断点、查看变量、逐行执行。


### **三、关键注意事项**

#### **1. 容器必须以交互模式运行（-it）**
若容器以非交互模式（如 `-d` 后台运行）启动，调试器无法接收用户输入（如 pdb 的命令）。必须使用 `-it` 参数保持终端交互：
```bash
# 错误方式（后台运行，无法调试）
docker run -d my-image python main.py

# 正确方式（交互模式）
docker run -it --rm my-image python -m pdb main.py
```


#### **2. 代码需挂载到容器（可选但推荐）**
若需实时修改代码并调试，可将宿主机代码目录挂载到容器，避免重复构建镜像：
```bash
docker run -it --rm \
  -v $(pwd):/app \  # 宿主机当前目录 → 容器内 /app 目录
  my-python-image \
  python -m pdb main.py
```


#### **3. 调试完成后退出容器**
调试结束后，可通过 `q`（pdb）或关闭调试器（VS Code）终止程序，容器会因 `--rm` 参数自动清理（或手动 `docker stop`）。


#### **4. 生产环境需移除调试工具**
调试完成后，建议移除 `debugpy` 等调试工具（或使用多阶段构建），避免镜像体积膨胀和安全风险：
```dockerfile
# 多阶段构建示例（生产环境镜像不含调试工具）
# 阶段 1：调试构建（包含 debugpy）
FROM python:3.9-slim AS debug
RUN pip install debugpy
COPY . .
CMD ["python", "-m", "debugpy", "--listen", "5678", "main.py"]

# 阶段 2：生产镜像（仅保留必要依赖）
FROM python:3.9-slim AS production
COPY --from=debug /app /app
WORKDIR /app
CMD ["python", "main.py"]  # 生产环境不启用调试
```


### **总结**
针对 Docker 中自动执行 `python main.py` 的场景，调试的核心是：
- **交互模式启动容器**（`-it`）。
- **通过 `pdb` 或 `debugpy` 注入断点**（代码嵌入或启动命令触发）。
- **按需挂载代码目录**（方便实时修改）。

根据需求选择临时调试（方案1/2）或远程调试（方案3），即可高效完成 Python 程序在 Docker 中的断点调试。
