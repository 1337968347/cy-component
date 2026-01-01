import { Component, State, Host, Element, h, Listen } from '@stencil/core';
import { Color } from '../../interface';
import { configManager } from '../../utils/config';
interface Menu {
  title: string;
  path: string;
  icon?: string;
}
const menus: Menu[] = [
  {
    title: '水渲染',
    path: 'water',
    icon: 'camera',
  },
  {
    title: '图形噪音',
    path: 'noise',
    icon: 'color',
  },
  {
    title: '小球路径追踪(webGL)',
    path: 'pathtrace',
    icon: 'animation',
  },
  {
    title: '软光栅(纯JS)',
    path: 'rasterizer',
    icon: 'button',
  },
  {
    title: '心脏标准切面(webGL)',
    path: 'heart',
    icon: 'data-screen',
  },
  {
    title: '仿win10日历',
    path: 'calendar',
    icon: 'calendar',
  },
  {
    title: '数据可视化',
    path: 'datascreen',
    icon: 'data',
  },
  {
    title: '虚拟表格',
    path: 'virtual-list',
    icon: 'table',
  },
  {
    title: '设置',
    path: 'setting',
    icon: 'setting',
  },
];
@Component({
  tag: 'page-root',
  styleUrl: 'page-root.scss',
})
export class PageRoot {
  @Element() el: HTMLElement;
  @State() color: Color = configManager.getPreferColor();
  @State() choose: Menu = menus[0];
  @State() menuOpen: boolean = false;

  componentWillLoad() {
    // 从 URL 读取初始路由
    const hash = window.location.hash.slice(1);
    const menu = menus.find(m => m.path === hash);
    if (menu) {
      this.choose = menu;
    }

    // 检测是否为 PC 端，如果是 PC 端则默认展开
    this.updateMenuState();
  }

  componentDidLoad() {
    // 监听窗口大小变化
    window.addEventListener('resize', this.updateMenuState.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.updateMenuState.bind(this));
  }

  updateMenuState = () => {
    // PC 端：屏幕宽度 >= 768px
    const isPc = window.innerWidth >= 768;
    this.menuOpen = isPc;
  }

  toggleMenu = () => {
    // 移动端才允许切换
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      this.menuOpen = !this.menuOpen;
    }
  }

  switchCom(value) {
    this.choose = value;
    // 更新 URL 锤点
    window.location.hash = value.path;

    // 移动端点击菜单后自动收起
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      this.menuOpen = false;
    }
  }

  @Listen('settingChange', { capture: true })
  handleSettingChange(e: CustomEvent) {
    if (e.detail.type === 'color') {
      this.color = e.detail.data;
    }
  }

  render() {
    const isMobile = window.innerWidth < 768;

    return (
      <Host>
        <cy-app>
          {/* 移动端菜单按钮 - 只在移动端渲染 */}
          {isMobile && (
            <button class="menu-toggle" onClick={this.toggleMenu}>
              <cy-icon name="menu"></cy-icon>
            </button>
          )}

          {/* 移动端遮罩层 */}
          <div class={{
            'menu-overlay': true,
            'menu-overlay-visible': this.menuOpen
          }} onClick={this.toggleMenu}></div>

          <div class="menu-content">
            <div class={{
              'menu-sidebar': true,
              'menu-open': this.menuOpen
            }}>
              <div class="cy-page">
                <cy-header>
                  <h3 class="cy-title">作品集</h3>
                </cy-header>
                <cy-content>
                  {menus.map(menu => (
                    <cy-item
                      button
                      color={this.color}
                      class={{
                        'select-com': this.choose.path === menu.path,
                        'menu-item': true,
                      }}
                      onClick={() => {
                        this.switchCom(menu);
                      }}>
                      <cy-icon slot="start" name={menu.icon}></cy-icon>
                      <h3 class="menu-h3">{menu.title}</h3>
                    </cy-item>
                  ))}
                </cy-content>
              </div>
            </div>
            <div class="menu-page">{RenderShowItem(this.choose.path)}</div>
          </div>
        </cy-app>
      </Host>
    );
  }
}

const RenderShowItem = (comName: string) => {
  switch (comName) {
    case 'calendar':
      return <page-calendar></page-calendar>;
    case 'setting':
      return <page-setting />;
    case 'virtual-list':
      return <page-virtual></page-virtual>;
    case 'datascreen':
      return <page-datascreen></page-datascreen>;
    case 'water':
      return <page-webgl></page-webgl>;
    case 'noise':
      return <page-noise></page-noise>;
    case 'pathtrace':
      return <page-pathtrace></page-pathtrace>;
    case 'rasterizer':
      return <page-rasterizer></page-rasterizer>;
    case 'heart':
      return <page-heart></page-heart>;
    default:
      return <page-webgl></page-webgl>;
  }
};
