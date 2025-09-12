/*
 * @Description:
 * @Date: 2025-09-12 16:16:53
 * @LastEditTime: 2025-09-12 17:18:51
 * @FilePath: \blogSrc\source\_posts\工作学习日记\25年\9月\custom-server.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { parse } = require('url');

let parsedUrl
// 创建代理服务器，监听 p1 端口
const proxy = http.createServer((req, res) => {
  parsedUrl = url.parse(req.url);

  const targetUrl = `http://localhost:${PROXY_PORT}${parsedUrl.path}`;

  // 创建代理请求
  const proxyReq = http.request(targetUrl, {
    method: req.method,
    headers: req.headers
  }, (proxyRes) => {
    // 转发响应头
    res.writeHead(proxyRes.statusCode, proxyRes.headers);

    let body = '';
    proxyRes.setEncoding('utf8');

    // 收集响应体
    proxyRes.on('data', (chunk) => {
      body += chunk;
    });

    proxyRes.on('end', () => {
      // 如果是 HTML 内容，处理 a 标签中的 jpg/png
      if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
        const modifiedBody = transformHtml(body);
        res.end(modifiedBody);
      } else {
        res.end(body);
      }
    });
  });

  // 代理请求错误处理
  proxyReq.on('error', (err) => {
    console.error('代理请求错误:', err);
    res.statusCode = 500;
    res.end('代理服务器错误');
  });

  // 转发请求体
  req.pipe(proxyReq);
});

// 将 a 标签中的 jpg/png 替换为 img 标签
function transformHtml(html) {
  // 支持大小写不敏感的 .jpg 和 .png 文件扩展名
  return html.replace(/<li><a\s+href="([^"]+\.jpg|[^"]+\.png|[^"]+\.JPG|[^"]+\.PNG)"[^>]*>([^<]+)<\/a><\/li>/gi, (match, href, text) => {
    const fullHref = `http://localhost:${PROXY_PORT}${parsedUrl.path}${href}`;
    // console.log(
    //   `%c ${'fullHref'}`,
    //   'color: red; font-size: 20px;',
    //   fullHref,
    // )

    return `
      <div style="float: left; width: 50%;">
        <a href="${fullHref}" target="_blank">${text}</a>
        <img src="${fullHref}" style="width: 100%; height: auto;" alt="${text}">
      </div>
    `;
  });
}

// 解析命令行参数
const args = process.argv.slice(2);
let LISTEN_PORT = 3022; // 默认监听端口
let PROXY_PORT = 8022;  // 默认代理端口

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-p1' && i + 1 < args.length) {
    LISTEN_PORT = parseInt(args[i + 1]);
  }
  if (args[i] === '-p2' && i + 1 < args.length) {
    PROXY_PORT = parseInt(args[i + 1]);
  }
}

// 启动服务器
proxy.listen(LISTEN_PORT, () => {
  console.log(`代理服务器运行在 http://localhost:${LISTEN_PORT}/`);
  console.log(`所有请求将代理到 http://localhost:${PROXY_PORT}/`);
});
