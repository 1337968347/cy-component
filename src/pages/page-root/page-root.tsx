import { Component, State, Host, Element, h } from '@stencil/core';
import { showToast } from '../../utils/toast';
import { configManager } from '../../utils/config';
import { Color, ViewMode } from '../../interface';

const components = ['mobile', 'calendar', 'nav', 'data-screen', 'animation'];

@Component({
  tag: 'page-root',
  styleUrl: 'page-root.scss',
})
export class PageRoot {
  @Element() el: HTMLElement;
  @State() color = configManager.getPreferColor();
  @State() viewMode: ViewMode = configManager.getViewMode();
  @State() choose: string = 'mobile';

  componentWillLoad() {
    this.choose = (location.hash.split('#')[1] && decodeURIComponent(location.hash.split('#')[1])) || 'mobile';
  }

  switchCom(value) {
    this.choose = value;
    location.hash = value;
  }

  toggleMenu() {
    document.querySelector('cy-menu').toggle();
  }

  selectColor() {
    const actionSheet = document.createElement('cy-action-sheet');
    actionSheet.header = '选择主题颜色';
    actionSheet.color = this.color;
    const buttons = [];

    ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'].map((color: Color) => {
      const title = `${color}`;
      buttons.push({
        text: title,
        handler: () => {
          showToast({ title: color });
          this.color = color;
          configManager.setPreferColor(color);
        },
      });
    });

    buttons.push({
      text: '取消',
      role: 'cancel',
    });

    actionSheet.buttons = buttons;
    document.body.appendChild(actionSheet);
    actionSheet.present();
  }

  themeChange(e: CustomEvent) {
    if (e.detail) {
      this.viewMode = 'dark';
    } else {
      this.viewMode = 'light';
    }
    configManager.setViewMode(this.viewMode);
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
                  {components.map(com => (
                    <cy-item
                      color={this.color}
                      class={{
                        'select-com': this.choose === com,
                        'menu-item': true,
                      }}
                      onClick={() => {
                        this.switchCom(com);
                      }}>
                      <cy-icon slot="start" name={com}></cy-icon>
                      <h3 class="menu-h3">{com}</h3>
                    </cy-item>
                  ))}
                </cy-content>
              </div>
            </cy-menu>
            <div class="menu-page">
              <cy-nav>
                <div class="cy-page">
                  <cy-header>
                    <div onClick={this.toggleMenu} class="btn-box activatable" slot="start">
                      <cy-icon name="menu" />
                      <cy-ripple type="unbounded" />
                    </div>
                    <h3 class="cy-title">{this.choose}</h3>
                    <div class="btn-box" slot="end">
                      <div class="btn activatable" onClick={this.selectColor.bind(this)}>
                        <cy-icon
                          name="color"
                          class={{
                            [`cy-color-${this.color}`]: !!this.color,
                          }}
                        />
                        <cy-ripple type="unbounded" />
                      </div>
                      <cy-toggle onCyChange={this.themeChange.bind(this)} checked={this.viewMode === 'dark'} color={this.color}></cy-toggle>
                    </div>
                  </cy-header>
                  <cy-content>{RenderShowItem(this.choose, this.color)}</cy-content>
                </div>
              </cy-nav>
            </div>
          </div>
        </cy-app>
      </Host>
    );
  }
}

const RenderShowItem = (comName: string, color: string = 'primary') => {
  switch (comName) {
    case 'nav':
      return (
        <cy-nav>
          <cy-button
            onClick={() => {
              nextPage();
            }}
            color={color}>
            next page
          </cy-button>
        </cy-nav>
      );
    case 'calendar':
      return (
        <div>
          <cy-calendar color={color}>{color}</cy-calendar>
          <cy-time color={color}></cy-time>
        </div>
      );
    case 'mobile':
      return <page-mobile color={color}></page-mobile>;
    case 'data-screen':
      return (
        <div>
          <h3>使用stencil ionic搭建的数据可视化系统</h3>
          <cy-button
            color={color}
            onClick={() => {
              location.href = 'https://1337968347.github.io/DataScreen/';
            }}>
            jump
          </cy-button>
        </div>
      );
    default:
      return <div></div>;
  }
};

const nextPage = () => {
  document.querySelector('cy-nav').push('nav-pageone');
};
