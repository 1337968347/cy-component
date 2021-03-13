import { Component, State, Host, Element, h } from '@stencil/core';
import { showToast } from '../../utils/toast';
const components = ['button', 'time', 'calendar', 'segment', 'nav', 'checkbox', 'loading'];

@Component({
  tag: 'page-root',
  styleUrl: 'page-root.scss',
})
export class PageRoot {
  @Element() el: HTMLElement;
  @State() color = localStorage.getItem('color') || 'primary';
  @State() choose: string = 'button';

  componentWillLoad() {
    this.choose = (location.hash.split('#')[1] && decodeURIComponent(location.hash.split('#')[1])) || 'button';
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
    actionSheet.header = '选择你偏爱的颜色';
    actionSheet.color = this.color;
    const buttons = [];

    ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'].map(color => {
      const title = `${color}`;
      buttons.push({
        text: title,
        handler: () => {
          showToast({ title: color });
          this.color = color;
          localStorage.setItem('color', color);
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
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
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
                  {components.map(com => (
                    <cy-item
                      class={{
                        'select-com': this.choose === com,
                        'menu-item': true,
                      }}
                      onClick={() => {
                        this.switchCom(com);
                      }}
                      button>
                      <cy-icon slot="start" color={this.color} name={com}></cy-icon>
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
                      <cy-toggle onCyChange={this.themeChange.bind(this)} color={this.color}></cy-toggle>
                    </div>
                  </cy-header>
                  <cy-content>
                    <div class="container">{RenderShowItem(this.choose, this.color)}</div>
                  </cy-content>
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
    case 'button':
      return <cy-button color={color}>{color}</cy-button>;
    case 'time':
      return <cy-time color={color}>{color}</cy-time>;
    case 'checkbox':
      return <cy-checkbox color={color}>{color}</cy-checkbox>;
    case 'loading':
      return <cy-spinner color={color}>{color}</cy-spinner>;
    case 'nav':
      return [
        <cy-button
          onClick={() => {
            nextPage();
          }}
          color={color}>
          next page
        </cy-button>,
        <cy-button
          onClick={() => {
            back();
          }}>
          back
        </cy-button>,
      ];
    case 'calendar':
      return <cy-calendar color={color}>{color}</cy-calendar>;
    case 'segment':
      return (
        <div>
          <h3>不可滚动的（可拖动）</h3>
          <cy-segment color={color} value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <h3>可以滚动的</h3>
          <cy-segment color={color} value="大狗子" scrollable>
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
            <cy-segment-button value="四狗子">四狗子</cy-segment-button>
            <cy-segment-button value="五狗子">五狗子</cy-segment-button>
            <cy-segment-button value="六狗子">六狗子</cy-segment-button>
            <cy-segment-button value="七狗子">七狗子</cy-segment-button>
          </cy-segment>
        </div>
      );
    default:
      return <div></div>;
  }
};

const nextPage = () => {
  document.querySelector('cy-nav').push('page-root');
};

const back = () => {
  document.querySelector('cy-nav').pop();
};