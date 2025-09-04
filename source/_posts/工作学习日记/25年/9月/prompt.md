1. 我使用 SSH映射 服务器 flask 端口
  ```bash
    # 把服务器 emoti SSH 映射到开发机
    ssh -L 0.0.0.0:6005:localhost:6005 os@14.78.1.86 -Nf
  ```

2. wsl 请求 是可以正常返回的
  ```bash
    curl -v http://127.0.0.1:6005/
      *   Trying 127.0.0.1:6005...
      * Connected to 127.0.0.1 (127.0.0.1) port 6005
      > GET / HTTP/1.1
      > Host: 127.0.0.1:6005
      > User-Agent: curl/8.9.1
      > Accept: */*
      >
      * Request completely sent off
      < HTTP/1.1 404 Not Found
      < date: Thu, 04 Sep 2025 02:10:06 GMT
      < server: uvicorn
      < content-length: 22
      < content-type: application/json
      <
      * Connection #0 to host 127.0.0.1 left intact
      {"detail":"Not Found"}
  ```

3. docker 环境 请求失败
  ```bash
    root@f78be4afe02f:/app# curl -v http://172.17.0.1:6005/
      *   Trying 172.17.0.1:6005...
      * connect to 172.17.0.1 port 6005 failed: Connection refused
      * Failed to connect to 172.17.0.1 port 6005 after 0 ms: Couldn't connect to server
      * Closing connection 0
      curl: (7) Failed to connect to 172.17.0.1 port 6005 after 0 ms: Couldn't connect to server
  ```

请你帮忙分析失败原因，并给出解决方案。

# 问题明确
  + 首先 我确实使用了 `ssh -L 0.0.0.0:11434:localhost:11434 os@14.78.1.86 -Nf`
    host 地址是 0.0.0.0
  + 使用 `curl -v http://host.docker.internal:6005/` 尝试连接
