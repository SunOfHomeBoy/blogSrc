// 分页功能初始化函数
function initPagination(path, proxyPort) {
  let currentPage = 1;
  let totalPages = 1;
  let totalImages = 0;
  let limit = 20; // 默认每页显示20张图片
  let loading = false;

  function loadImages(page) {
    if (loading) return;
    loading = true;

    // 显示加载指示器
    const container = document.getElementById('image-container');
    container.innerHTML = '<div style="text-align: center; width: 100%;">加载中...</div>';

    const host = window.location.origin;

    console.log(
      `%c ${'host'}`,
      'color: red; font-size: 20px;',
      host,
    );

    fetch(host + `/api/images?path=${encodeURIComponent(path)}&page=${page}&limit=${limit}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        currentPage = data.currentPage;
        totalPages = data.totalPages;
        totalImages = data.totalImages;

        // 渲染图片
        renderImages(data.images);
        // 渲染分页控件
        renderPagination();

        loading = false;
      })
      .catch(error => {
        console.error('加载图片失败:', error);
        const container = document.getElementById('image-container');
        container.innerHTML = '<div style="text-align: center; width: 100%; color: red;">加载图片失败</div>';
        loading = false;
      });
  }

  function renderImages(images) {
    const container = document.getElementById('image-container');
    container.innerHTML = '';

    if (images.length === 0) {
      container.innerHTML = '<div style="text-align: center; width: 100%;">该目录下没有图片</div>';
      return;
    }

    images.forEach(image => {
      const fullHref = `http://localhost:${proxyPort}${path}${image.href}`;
      const imageElement = document.createElement('div');
      imageElement.style.cssText = 'float: left; width: 50%; padding: 10px; box-sizing: border-box;';
      imageElement.innerHTML = `
        <a href="${fullHref}" target="_blank">${image.text}</a>
        <img src="${fullHref}" style="width: 100%; height: auto;" alt="${image.text}">
      `;
      container.appendChild(imageElement);
    });
  }

  function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    if (totalPages <= 1) {
      return;
    }

    let paginationHtml = `
      <div style="clear: both; text-align: center; padding: 20px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
        <div style="margin: 5px;">总条数: ${totalImages}</div>
        <div style="margin: 5px;">
          <label for="limit-select">每页显示:</label>
          <select id="limit-select" onchange="changeLimit()" style="margin: 0 5px;">
            <option value="10">10</option>
            <option value="20" selected>20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div style="margin: 5px;">${currentPage}/${totalPages}</div>
        <button onclick="goToPage(1)" ${currentPage === 1 ? 'disabled' : ''} style="margin: 0 5px;">首页</button>
        <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} style="margin: 0 5px;">上一页</button>
        <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} style="margin: 0 5px;">下一页</button>
        <button onclick="goToPage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''} style="margin: 0 5px;">末页</button>
        <div style="margin: 5px;">
          <label for="page-input">跳转到:</label>
          <input type="number" id="page-input" min="1" max="${totalPages}" style="width: 60px; margin: 0 5px;">
          <button onclick="jumpToPage()">跳转</button>
        </div>
      </div>
    `;

    paginationContainer.innerHTML = paginationHtml;
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    loadImages(page);
  }

  function changeLimit() {
    const limitSelect = document.getElementById('limit-select');
    limit = parseInt(limitSelect.value);
    loadImages(1); // 重新加载第一页
  }

  function jumpToPage() {
    const pageInput = document.getElementById('page-input');
    const page = parseInt(pageInput.value);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      loadImages(page);
    } else {
      alert('请输入有效的页码 (1-' + totalPages + ')');
    }
  }

  // 将函数挂载到window对象上，供HTML中的按钮调用
  window.goToPage = goToPage;
  window.changeLimit = changeLimit;
  window.jumpToPage = jumpToPage;
}

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { parse } = require('url');

let parsedUrl
// 创建代理服务器，监听 p1 端口
const proxy = http.createServer((req, res) => {
  parsedUrl = url.parse(req.url);

  // 处理API请求，用于懒加载图片数据
  if (parsedUrl.pathname === '/api/images') {
    handleImageApi(req, res);
    return;
  }

  // 处理静态JS文件请求
  if (parsedUrl.pathname === '/pagination.js') {
    fs.readFile(path.join(__dirname, 'pagination.js'), 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error loading pagination.js');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
    return;
  }

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
        const modifiedBody = transformHtml(body, parsedUrl.path);
        // 删除 Content-Length 头部，避免长度不匹配问题
        delete proxyRes.headers['content-length'];

        // 设置新的 Content-Length
        proxyRes.headers['content-length'] = Buffer.byteLength(modifiedBody, 'utf8');
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        res.end(modifiedBody);
      } else {
        // 转发响应头
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
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

// 处理图片API请求
function handleImageApi(req, res) {
  const query = url.parse(req.url, true).query;
  const path = query.path || '/';
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 50; // 默认每页50张图片

  // 从代理服务器获取数据
  const targetUrl = `http://localhost:${PROXY_PORT}${path}`;
  http.get(targetUrl, (proxyRes) => {
    let body = '';
    proxyRes.setEncoding('utf8');

    proxyRes.on('data', (chunk) => {
      body += chunk;
    });

    proxyRes.on('end', () => {
      if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].includes('text/html')) {
        // 提取图片链接
        const images = extractImages(body);
        // 分页处理
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedImages = images.slice(start, end);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          images: paginatedImages,
          currentPage: page,
          totalPages: Math.ceil(images.length / limit),
          totalImages: images.length
        }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not a directory page' }));
      }
    });
  }).on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Proxy request failed' }));
  });
}

// 从HTML中提取图片链接
function extractImages(html) {
  const images = [];
  const regex = /<li><a\s+href="([^"]+\.jpg|[^"]+\.png|[^"]+\.JPG|[^"]+\.PNG)"[^>]*>([^<]+)<\/a><\/li>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    images.push({
      href: match[1],
      text: match[2]
    });
  }

  return images;
}

// 将 a 标签中的 jpg/png 替换为 img 标签
function transformHtml(html, path) {
  // 移除原有的图片列表
  const modifiedHtml = html.replace(/<ul>[\s\S]*?<\/ul>/, '<div id="image-container"></div><div id="pagination-container"></div>');

  // 添加分页脚本
  return `
    ${modifiedHtml}
    <script>
      let currentPage = 1;
      let totalPages = 1;
      let totalImages = 0;
      const path = '${path}';
      let limit = 20; // 默认每页显示50张图片
      let loading = false;

      // 页面加载完成后初始化
      document.addEventListener('DOMContentLoaded', function() {
        loadImages(1);
      });

      function loadImages(page) {
        if (loading) return;
        loading = true;

        // 显示加载指示器
        const container = document.getElementById('image-container');
        container.innerHTML = '<div style="text-align: center; width: 100%;">加载中...</div>';

        const host = window.location.origin;

        console.log(
          \`%c ${'host'}\`,
          'color: red; font-size: 20px;',
          host,
        )

        fetch(host + \`/api/images?path=\${encodeURIComponent(path)}&page=\${page}&limit=\${limit}\`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            currentPage = data.currentPage;
            totalPages = data.totalPages;
            totalImages = data.totalImages;

            // 渲染图片
            renderImages(data.images);
            // 渲染分页控件
            renderPagination();

            loading = false;
          })
          .catch(error => {
            console.error('加载图片失败:', error);
            const container = document.getElementById('image-container');
            container.innerHTML = '<div style="text-align: center; width: 100%; color: red;">加载图片失败</div>';
            loading = false;
          });
      }

      function renderImages(images) {
        const container = document.getElementById('image-container');
        container.innerHTML = '';

        if (images.length === 0) {
          container.innerHTML = '<div style="text-align: center; width: 100%;">该目录下没有图片</div>';
          return;
        }

        images.forEach(image => {
          const fullHref = \`http://localhost:${PROXY_PORT}\${path}\${image.href}\`;
          const imageElement = document.createElement('div');
          imageElement.style.cssText = 'float: left; width: 50%; padding: 10px; box-sizing: border-box;';
          imageElement.innerHTML = \`
            <a href="\${fullHref}" target="_blank">\${image.text}</a>
            <img src="\${fullHref}" style="width: 100%; height: auto;" alt="\${image.text}">
          \`;
          container.appendChild(imageElement);
        });
      }

      function renderPagination() {
        const paginationContainer = document.getElementById('pagination-container');
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) {
          return;
        }

        let paginationHtml = \`
          <div style="clear: both; text-align: center; padding: 20px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap;">
            <div style="margin: 5px;">总条数: \${totalImages}</div>
            <div style="margin: 5px;">
              <label for="limit-select">每页显示:</label>
              <select id="limit-select" onchange="changeLimit()" style="margin: 0 5px;">
                <option value="10" \${limit === 10 ? 'selected' : ''}>10</option>
                <option value="20" \${limit === 20 ? 'selected' : ''}>20</option>
                <option value="50" \${limit === 50 ? 'selected' : ''}>50</option>
                <option value="100" \${limit === 100 ? 'selected' : ''}>100</option>
              </select>
            </div>
            <div style="margin: 5px;">\${currentPage}/\${totalPages}</div>
            <button onclick="goToPage(1)" \${currentPage === 1 ? 'disabled' : ''} style="margin: 0 5px;">首页</button>
            <button onclick="goToPage(\${currentPage - 1})" \${currentPage === 1 ? 'disabled' : ''} style="margin: 0 5px;">上一页</button>
            <button onclick="goToPage(\${currentPage + 1})" \${currentPage === totalPages ? 'disabled' : ''} style="margin: 0 5px;">下一页</button>
            <button onclick="goToPage(\${totalPages})" \${currentPage === totalPages ? 'disabled' : ''} style="margin: 0 5px;">末页</button>
            <div style="margin: 5px;">
              <label for="page-input">跳转到:</label>
              <input type="number" id="page-input" min="1" max="\${totalPages}" style="width: 60px; margin: 0 5px;">
              <button onclick="jumpToPage()">跳转</button>
            </div>
          </div>
        \`;

        paginationContainer.innerHTML = paginationHtml;
      }

      function goToPage(page) {
        if (page < 1 || page > totalPages || page === currentPage) return;
        loadImages(page);
      }

      function changeLimit() {
        const limitSelect = document.getElementById('limit-select');
        limit = parseInt(limitSelect.value);
        loadImages(1); // 重新加载第一页
      }

      function jumpToPage() {
        const pageInput = document.getElementById('page-input');
        const page = parseInt(pageInput.value);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
          loadImages(page);
        } else {
          alert('请输入有效的页码 (1-' + totalPages + ')');
        }
      }
    </script>
  `;
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
