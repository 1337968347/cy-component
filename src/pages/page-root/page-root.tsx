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
    title: 'webGl',
    path: 'webGl',
    icon: 'camera'
  },
  {
    title: '仿win10日历',
    path: 'calendar',
    icon: 'calendar',
  },
  {
    title: '数据可视化',
    path: 'datascreen',
    icon: 'data'
  },
  {
    title: '虚拟表格',
    path: 'virtual-list',
    icon: 'table'
  },
  {
    title: '设置',
    path: 'setting',
    icon: 'setting'
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
    case 'calendar':
      return <page-calendar></page-calendar>;
    case 'setting':
      return <page-setting />;
    case 'virtual-list':
      return <page-virtual></page-virtual>;
    case 'datascreen':
      return <page-datascreen></page-datascreen>;
    case 'webGl':
      return <page-webgl></page-webgl>;
    default:
      return <div></div>;
  }
};
