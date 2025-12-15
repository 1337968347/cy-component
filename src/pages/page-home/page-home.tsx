import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
})
export class PageHome {
  render() {
    return (
      <div class="cy-page">
        <cy-content>
          <div class="home-container">
            <div class="welcome-section">
              <h1 class="main-title">作品概览</h1>
              <p class="subtitle">Welcome to My Portfolio</p>
            </div>

            <div class="info-card">
              <div class="card-icon">
                <cy-icon name="information-circle"></cy-icon>
              </div>
              <div class="card-content">
                <h2>关于本站</h2>
                <p>这是我的前端作品展示网站，收录了一些个人项目和技术实践。</p>
              </div>
            </div>

            <div class="info-card">
              <div class="card-icon">
                <cy-icon name="time"></cy-icon>
              </div>
              <div class="card-content">
                <h2>加载说明</h2>
                <p>每个作品都使用 iframe 嵌入展示，首次加载可能需要一些时间，请耐心等待。</p>
                <p class="tip">💡 建议：点击菜单后稍等片刻，内容会逐步呈现。</p>
              </div>
            </div>

            <div class="info-card">
              <div class="card-icon">
                <cy-icon name="code"></cy-icon>
              </div>
              <div class="card-content">
                <h2>查看源码</h2>
                <p>每个作品页面右上角都有 GitHub 图标，悬停后会显示"查看源码"提示。</p>
                <p>点击即可跳转到对应的源码仓库。</p>
              </div>
            </div>

            <div class="tech-stack">
              <h3>技术栈</h3>
              <div class="tags">
                <span class="tag">Stencil</span>
                <span class="tag">TypeScript</span>
                <span class="tag">Web Components</span>
                <span class="tag">WebGL</span>
                <span class="tag">Sass</span>
              </div>
            </div>

            <div class="start-guide">
              <p>👈 从左侧菜单选择作品开始浏览</p>
            </div>
          </div>
        </cy-content>
      </div>
    );
  }
}
