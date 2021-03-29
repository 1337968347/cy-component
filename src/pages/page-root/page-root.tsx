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
    title: '日历',
    path: 'calendar',
    icon: 'calendar',
  },
  {
    title: '导航',
    path: 'nav',
    icon: 'nav',
  },
  {
    title: '可视化',
    path: 'data-screen',
    icon: 'data-screen',
  },
  {
    title: '虚拟列表',
    path: 'virtual-list',
  },
  {
    title: '设置',
    path: 'setting',
  },
];
@Component({
  tag: 'page-root',
  styleUrl: 'page-root.scss',
})
export class PageRoot {
  @Element() el: HTMLElement;
  @State() color: Color = configManager.getPreferColor();
  @State() choose: Menu = menus[3];

  switchCom(value) {
    this.choose = value;
  }

  toggleMenu() {
    document.querySelector('cy-menu').toggle();
  }

  @Listen('settingChange', { capture: true })
  handleSettingChange(e: CustomEvent) {
    if (e.detail.type === 'color') {
      this.color = e.detail.data;
    }
  }

  render() {
    return (
      <Host>
        <cy-app>
          <div class="menu-content">
            <cy-menu>
              <div class="cy-page">
                <cy-header>
                  <h3 class="cy-title">菜单</h3>
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
                      {menu.icon ? <cy-icon slot="start" name={menu.icon}></cy-icon> : null}
                      <h3 class="menu-h3">{menu.title}</h3>
                    </cy-item>
                  ))}
                </cy-content>
              </div>
            </cy-menu>
            <div class="menu-page">{RenderShowItem(this.choose.path)}</div>
          </div>
        </cy-app>
      </Host>
    );
  }
}

const RenderShowItem = (comName: string) => {
  switch (comName) {
    case 'nav':
      return <page-nav />;
    case 'calendar':
      return <page-calendar></page-calendar>;
    case 'setting':
      return <page-setting />;
    case 'data-screen':
      return (
        <div>
          <cy-button
            onClick={() => {
              location.href = 'https://1337968347.github.io/DataScreen/';
            }}>
            jump
          </cy-button>
        </div>
      );
    case 'virtual-list':
      return <page-virtual></page-virtual>;

    default:
      return <div></div>;
  }
};