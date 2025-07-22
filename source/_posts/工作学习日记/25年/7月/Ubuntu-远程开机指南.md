<!--
 * @Description:
 * @Date: 2025-07-21 10:50:39
 * @LastEditTime: 2025-07-22 16:56:58
 * @FilePath: \blogSrc\source\_posts\工作学习日记\25年\7月\Ubuntu-远程开机指南.md
-->
---
title: Ubuntu 服务器远程开机指南 (Wake-on-LAN)
date: 2025-07-21 10:51:00
tags:
- Ubuntu
- Server
- Wake-on-LAN
- 远程开机
---

远程开机（Wake-on-LAN，简称WOL）是一项非常实用的技术，它允许你通过网络将一台处于关机或休眠状态的计算机唤醒。这对于需要随时访问但又不想7x24小时开机的服务器来说，能有效节省电费并降低硬件损耗。

本文将详细介绍如何在 Ubuntu 服务器上配置和使用远程开机。

### 步骤一：在 BIOS/UEFI 中启用 WOL

这是最关键的一步。远程唤醒功能需要在硬件层面得到支持和开启。

1.  **进入 BIOS/UEFI 设置**：重启服务器，在启动过程中根据屏幕提示按下特定键（通常是 `Del`, `F2`, `F10` 或 `Esc`）进入 BIOS/UEFI 设置界面。
2.  **找到 WOL 相关选项**：这个选项通常位于 "Power Management"（电源管理）或 "Advanced"（高级设置）菜单下。它的名称可能是 "Wake on LAN", "Power On by PCI-E", "WOL", "Resume by LAN" 等。
3.  **启用该选项**：将其状态设置为 "Enabled" 或 "On"。
4.  **保存并退出**：保存您的设置更改并重启服务器。

### 步骤二：在 Ubuntu 系统中配置网卡

硬件层面启用后，还需要在操作系统中确保网卡配置正确。

1.  **安装 ethtool**：`ethtool` 是一个强大的命令行工具，用于查看和修改网卡参数。
    ```bash
    sudo apt update
    sudo apt install ethtool
    ```

2.  **查找你的网卡名称**：使用 `ip a` 或 `ifconfig` 命令找到你的有线网卡名称。它通常是 `eth0` 或以 `enp` 开头的格式，例如 `enp3s0`。

3.  **检查 WOL 支持状态**：使用 `ethtool` 检查你的网卡。请将 `eth0` 替换为你的实际网卡名称。
    ```bash
    sudo ethtool eth0
    ```
    在输出信息中，关注 `Supports Wake-on` 和 `Wake-on` 这两行。
    *   `Supports Wake-on`: 后面的字母 `g` 表示支持 Magic Packet（魔术包）唤醒。
    *   `Wake-on`: 后面的字母表示当前启用的唤醒模式。如果为 `d`，表示禁用 (disabled)。我们需要将其设置为 `g`。

4.  **启用 WOL**：
    ```bash
    sudo ethtool -s eth0 wol g
    ```
    **注意**：此命令设置在系统重启后会失效。要使其永久生效，可以将其写入启动脚本或网络配置文件中。

### 步骤三：获取服务器的 MAC 地址

MAC 地址是网卡的唯一物理地址，发送唤醒信号时必须用到。

```bash
ip a | grep ether

  # 执行输出
  os@os-S2600WFT:~$ ip a | grep ether
  link/ether fe:ef:ed:e1:d5:13 brd ff:ff:ff:ff:ff:ff
  link/ether a4:bf:01:70:28:1a brd ff:ff:ff:ff:ff:ff
  link/ether ba:1d:b3:a6:80:8d brd ff:ff:ff:ff:ff:ff
  link/ether 52:d7:04:f2:9c:f6 brd ff:ff:ff:ff:ff:ff link-netnsid 0
  link/ether 12:10:93:0c:f5:24 brd ff:ff:ff:ff:ff:ff link-netnsid 1
  link/ether 92:df:6c:74:b8:f7 brd ff:ff:ff:ff:ff:ff link-netnsid 2

```
你会看到类似 `ether 00:1a:2b:3c:4d:5e` 的输出，这串十六进制数就是你的 MAC 地址。请妥善记录。

### 步骤四：发送远程开机命令

现在，你可以在**同一局域网内**的另一台电脑上发送“魔术包”（Magic Packet）来唤醒服务器了。

1.  **安装唤醒工具**：在另一台 Linux/Ubuntu 电脑上，可以安装 `wakeonlan` 或 `etherwake`。
    ```bash
    # 安装 wakeonlan
    sudo apt install wakeonlan
    ```

2.  **发送唤醒命令**：将下面的 `00:1a:2b:3c:4d:5e` 替换为你的服务器的真实 MAC 地址。
    ```bash
    wakeonlan 00:1a:2b:3c:4d:5e
    ```

如果以上所有步骤都配置正确，你的 Ubuntu 服务器应该就会被成功唤醒并开始启动。

### 总结

简单来说，远程开机的命令就是 `wakeonlan [MAC地址]`，但要使其生效，必须完成前置的硬件和系统配置。
