import { Component, State, Host, Element, h } from '@stencil/core';
import { showToast } from '../../utils/toast';
const components = ['button', 'time', 'calendar', 'segment', 'toggle', 'checkbox', 'loading'];

@Component({
  tag: 'page-root',
  styleUrl: 'page-root.scss',
})
export class PageRoot {
  @Element() el: HTMLElement;
  @State() color = localStorage.getItem('color') || 'promary';
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

  render() {
    return (
      <Host>
        <cy-app>
          <div class="menu-content">
            <cy-menu>
              <div class="cy-page">
                <cy-header color={this.color}>
                  <h3 class="cy-title">菜单</h3>
                </cy-header>
                <cy-content>
                  {components.map(com => (
                    <cy-item
                      class={{
                        'select-com': this.choose === com,
                      }}
                      onClick={() => {
                        this.switchCom(com);
                      }}
                      button>
                      <cy-icon color={this.color} slot="start" name={com}></cy-icon>
                      <h3>{com}</h3>
                    </cy-item>
                  ))}
                </cy-content>
              </div>
            </cy-menu>
            <div class="menu-page">
              <cy-header color={this.color}>
                <div onClick={this.toggleMenu} class="btn-box activatable" slot="start">
                  <cy-icon name="menu" />
                  <cy-ripple type="unbounded" />
                </div>
                <h3 class="cy-title">{this.choose}</h3>
                <div onClick={this.selectColor.bind(this)} class="btn-box activatable" slot="end">
                  <cy-icon name="color"  />
                  <cy-ripple type="unbounded" />
                </div>
              </cy-header>
              <cy-content>
                <div class="container">{RenderShowItem(this.choose, this.color)}</div>
              </cy-content>
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
    case 'toggle':
      return <cy-toggle color={color}>{color}</cy-toggle>;
    case 'time':
      return <cy-time color={color}>{color}</cy-time>;
    case 'checkbox':
      return <cy-checkbox color={color}>{color}</cy-checkbox>;
    case 'loading':
      return <cy-spinner color={color}>{color}</cy-spinner>;
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
