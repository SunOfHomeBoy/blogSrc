+ 研究 服务器操作系统
  ```sh
    [root@localhost ~]# cat /etc/os-release
    NAME="Kylin Linux Advanced Server"
    VERSION="V10 (Lance)"
    ID="kylin"
    VERSION_ID="V10"
    PRETTY_NAME="Kylin Linux Advanced Server V10 (Lance)"
    ANSI_COLOR="0;31"

    [root@localhost ~]# uname -a
    'Linux localhost.localdomain 4.19.90-52.22.v2207.ky10.aarch64 #1 SMP Tue Mar 14 11:52:45 CST 2023 aarch64 aarch64 aarch64 GNU/Linux'
  ```
  NAME: 操作系统名称为“Kylin Linux Advanced Server”。
  VERSION: 版本号为“V10 (Lance)”。
  ID: 系统标识符为“kylin”。
  VERSION_ID: 版本标识符为“V10”。
  PRETTY_NAME: 显示的完整版本名称为“Kylin Linux Advanced Server V10 (Lance)”。
  ANSI_COLOR: 终端颜色设置为“0;31”。



  + CPU
    ```sh
      [root@localhost ~]# lscpu
      架构：                           aarch64
      CPU 运行模式：                   64-bit
      字节序：                         Little Endian
      CPU:                             64
      在线 CPU 列表：                  0-63
      每个核的线程数：                 1
      每个座的核数：                   32
      座：                             2
      NUMA 节点：                      2
      厂商 ID：                        HiSilicon
      型号：                           0
      型号名称：                       Kunpeng-920
      步进：                           0x1
      CPU 最大 MHz：                   2600.0000
      CPU 最小 MHz：                   200.0000
      BogoMIPS：                       200.00
      L1d 缓存：                       4 MiB
      L1i 缓存：                       4 MiB
      L2 缓存：                        32 MiB
      L3 缓存：                        64 MiB
      NUMA 节点0 CPU：                 0-31
      NUMA 节点1 CPU：                 32-63
      Vulnerability Itlb multihit:     Not affected
      Vulnerability L1tf:              Not affected
      Vulnerability Mds:               Not affected
      Vulnerability Meltdown:          Not affected
      Vulnerability Mmio stale data:   Not affected
      Vulnerability Spec store bypass: Mitigation; Speculative Store Bypass disabled via prctl
      Vulnerability Spectre v1:        Mitigation; __user pointer sanitization
      Vulnerability Spectre v2:        Not affected
      Vulnerability Srbds:             Not affected
      Vulnerability Tsx async abort:   Not affected
      标记：                           fp asimd evtstrm aes pmull sha1 sha2 crc32 atomics fphp asimdhp cpuid asimdrdm jscvt fcma dcpop
                                        asimddp asimdfhm ssbs
    ```
  + npu
    ```sh
      [root@localhost ~]# npu-smi info
      +--------------------------------------------------------------------------------------------------------+
      | npu-smi 24.1.0.1                                 Version: 24.1.0.1                                     |
      +-------------------------------+-----------------+------------------------------------------------------+
      | NPU     Name                  | Health          | Power(W)     Temp(C)           Hugepages-Usage(page) |
      | Chip    Device                | Bus-Id          | AICore(%)    Memory-Usage(MB)                        |
      +===============================+=================+======================================================+
      | 1       310P3                 | OK              | NA           47                0     / 0             |
      | 0       0                     | 0000:01:00.0    | 0            1894 / 44215                            |
      +===============================+=================+======================================================+
      +-------------------------------+-----------------+------------------------------------------------------+
      | NPU     Chip                  | Process id      | Process name             | Process memory(MB)        |
      +===============================+=================+======================================================+
      | No running processes found in NPU 1                                                                    |
      +===============================+=================+======================================================+
    ```

  + 部署 python 环境
    - 确认系统架构
+ 部署 ollama 模型(2天)
    ```sh
      [root@localhost ~]# ls
      公共  视频  文档  音乐  anaconda-ks.cfg  Ascend-hdk-310p-npu-driver_24.1.0.1_linux-aarch64.run  log
      模板  图片  下载  桌面  ascend_check     initial-setup-ks.cfg                                   ollama-linux-arm64.tgz
      [root@localhost ~]# sudo tar -C /usr -xzf ollama-linux-arm64.tgz
      [root@localhost ~]# ls
      公共  视频  文档  音乐  anaconda-ks.cfg  Ascend-hdk-310p-npu-driver_24.1.0.1_linux-aarch64.run  log
      模板  图片  下载  桌面  ascend_check     initial-setup-ks.cfg                                   ollama-linux-arm64.tgz
      [root@localhost ~]# ll
      总用量 1795288
      drwxr-xr-x 2 root root          6  4月 15 17:11 公共
      drwxr-xr-x 2 root root          6  4月 15 17:11 模板
      drwxr-xr-x 2 root root          6  4月 15 17:11 视频
      drwxr-xr-x 2 root root          6  4月 15 17:11 图片
      drwxr-xr-x 2 root root          6  4月 15 17:11 文档
      drwxr-xr-x 2 root root          6  4月 15 17:11 下载
      drwxr-xr-x 2 root root          6  4月 15 17:11 音乐
      drwxr-xr-x 2 root root          6  4月 15 17:11 桌面
      -rw------- 1 root root       3421  4月 15 17:06 anaconda-ks.cfg
      dr-x------ 2 root root         86  4月 15 17:32 ascend_check
      -rwxr-xr-x 1 root root  142529552  4月 15 17:25 Ascend-hdk-310p-npu-driver_24.1.0.1_linux-aarch64.run
      -rw-r--r-- 1 root root       4004  4月 15 17:10 initial-setup-ks.cfg
      drwxr-xr-x 3 root root         22  4月 15 17:29 log
      -rw-r--r-- 1 root root 1695832508  5月 21 15:15 ollama-linux-arm64.tgz
      [root@localhost ~]# ollama -v
      ollama: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.25' not found (required by ollama)
      [root@localhost ~]# ollama -h
      ollama: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.25' not found (required by ollama)
    ```

    ```sh
      [root@localhost ~]# sudo tar -C /usr -xvzf ollama-linux-arm64.tgz
      bin/ollama
      lib/ollama/cuda_v11/
      lib/ollama/cuda_v11/libcudart.so.11.0
      lib/ollama/cuda_v11/libcudart.so.11.3.109
      lib/ollama/cuda_v11/libcublasLt.so.11
      lib/ollama/cuda_v11/libcublas.so.11.5.1.109
      lib/ollama/cuda_v11/libcublas.so.11
      lib/ollama/cuda_v11/libggml-cuda.so
      lib/ollama/cuda_v11/libcublasLt.so.11.5.1.109
      lib/ollama/cuda_v12/
      lib/ollama/cuda_v12/libcublasLt.so.12
      lib/ollama/cuda_v12/libcudart.so.12
      lib/ollama/cuda_v12/libcudart.so.12.8.90
      lib/ollama/cuda_v12/libcublas.so.12
      lib/ollama/cuda_v12/libcublasLt.so.12.8.4.1
      lib/ollama/cuda_v12/libcublas.so.12.8.4.1
      lib/ollama/cuda_v12/libggml-cuda.so
      lib/ollama/libggml-base.so
      lib/ollama/libggml-cpu.so
    ```

    ```sh
      [root@localhost ~]# lspci | grep VGA
      06:00.0 VGA compatible controller: Huawei Technologies Co., Ltd. Hi171x Series [iBMC Intelligent Management system chip w/VGA support] (rev 01)
      [root@localhost ~]# sudo lshw -C display
        *-display                 
            description: VGA compatible controller
            product: Hi171x Series [iBMC Intelligent Management system chip w/VGA support]
            vendor: Huawei Technologies Co., Ltd.
            physical id: 0
            bus info: pci@0000:06:00.0
            version: 01
            width: 32 bits
            clock: 33MHz
            capabilities: pm msi pciexpress vga_controller bus_master cap_list
            configuration: driver=hibmc-drm latency=0
            resources: irq:77 memory:e4000000-e5ffffff memory:e8000000-e81fffff
    ```
    + 解决GCC版本
    ```sh
    [root@localhost ~]# strings /usr/lib64/libstdc++.so.6 | grep GLIBCXX
    GLIBCXX_3.4
    GLIBCXX_3.4.1
    GLIBCXX_3.4.2
    GLIBCXX_3.4.3
    GLIBCXX_3.4.4
    GLIBCXX_3.4.5
    GLIBCXX_3.4.6
    GLIBCXX_3.4.7
    GLIBCXX_3.4.8
    GLIBCXX_3.4.9
    GLIBCXX_3.4.10
    GLIBCXX_3.4.11
    GLIBCXX_3.4.12
    GLIBCXX_3.4.13
    GLIBCXX_3.4.14
    GLIBCXX_3.4.15
    GLIBCXX_3.4.16
    GLIBCXX_3.4.17
    GLIBCXX_3.4.18
    GLIBCXX_3.4.19
    GLIBCXX_3.4.20
    GLIBCXX_3.4.21
    GLIBCXX_3.4.22
    GLIBCXX_3.4.23
    GLIBCXX_3.4.24
    GLIBCXX_DEBUG_MESSAGE_LENGTH
    ```
