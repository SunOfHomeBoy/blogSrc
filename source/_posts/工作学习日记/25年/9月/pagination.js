let currentPage = 1;
let totalPages = 1;
let totalImages = 0;
let path = ''; // 将在初始化时设置
let limit = 20; // 默认每页显示20张图片
let loading = false;
let proxyPort = 8022; // 默认代理端口，将在初始化时更新

// 初始化分页功能
function initPagination(initialPath, initialProxyPort) {
  path = initialPath;
  proxyPort = initialProxyPort;
  loadImages(1);
}

function loadImages(page) {
  if (loading) return;
  loading = true;

  // 显示加载指示器
  const container = document.getElementById('image-container');
  container.innerHTML = '<div style="text-align: center; width: 100%;">加载中...</div>';

  const apiUrl = `/api/images?path=${encodeURIComponent(path)}&page=${page}&limit=${limit}`;

  fetch(apiUrl)
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
      container.innerHTML = '<div style="text-align: center; width: 100%; color: red;">加载图片失败: ' + error.message + '</div>';
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
          <option value="10" ${limit === 10 ? 'selected' : ''}>10</option>
          <option value="20" ${limit === 20 ? 'selected' : ''}>20</option>
          <option value="50" ${limit === 50 ? 'selected' : ''}>50</option>
          <option value="100" ${limit === 100 ? 'selected' : ''}>100</option>
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
