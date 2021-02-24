import { Component, State, Host, Element, h } from '@stencil/core';
import { showToast } from '../../utils/toast';
const components = ['按钮', '钟表', '日历', '选择器', '滑块', '开关', '单选框', '加载'];

@Component({
  tag: 'page-root',
  styleUrl: 'page-root.scss',
})
export class PageRoot {
  @Element() el: HTMLElement;
  @State() choose: string = '按钮';

  componentWillLoad() {
    this.choose = (location.hash.split('#')[1] && decodeURIComponent(location.hash.split('#')[1])) || '按钮';
  }

  switchCom(value) {
    this.choose = value;
    location.hash = value;
    document.querySelector('cy-menu').close();
  }

  render() {
    return (
      <Host>
        <cy-app>
          <cy-menu>
            <div class="cy-page">
              <cy-header color="light">
                <h3 class="cy-title">菜单</h3>
              </cy-header>
              <cy-content>
                {components.map(com => (
                  <cy-item
                    color={this.choose === 'com' ? 'primary' : ''}
                    onClick={() => {
                      this.switchCom(com);
                    }}
                    line
                    button>
                    <h3>{com}</h3>
                  </cy-item>
                ))}
              </cy-content>
            </div>
          </cy-menu>
          <div class="cy-page">
            <cy-header color="light">
              <div onClick={openMenu} class="btn-box activatable" slot="start">
                <cy-icon name="menu" />
                <cy-ripple type="unbounded" />
              </div>
              <h3 class="cy-title">{this.choose}</h3>
            </cy-header>
            <cy-content>
              <div class="container">{RenderShowItem(this.choose)}</div>
            </cy-content>
          </div>
        </cy-app>
      </Host>
    );
  }
}
const createActionSheet = () => {
  const actionSheet = document.createElement('cy-action-sheet');
  actionSheet.header = 'Albums';
  actionSheet.cssClass = 'my-custom-class';
  const buttons = [];
  for (let i = 0; i < 20; i++) {
    const title = `select ${i}`;
    buttons.push({
      text: title,
      handler: () => {
        showToast({ title: '你选中了 ' + title });
      },
    });
  }
  buttons.push({
    text: 'Cancel',
    role: 'cancel',
    handler: () => {
      showToast({ title: 'Cancel' });
    },
  });

  actionSheet.buttons = buttons;
  document.body.appendChild(actionSheet);
  actionSheet.present();
};

const openMenu = () => {
  document.querySelector('cy-menu').open();
};

const RenderShowItem = (showName: string) => {
  switch (showName) {
    case '按钮':
      return (
        <div>
          <h3>default</h3>
          <cy-button color="primary">primary</cy-button>
          <cy-button color="secondary">secondary</cy-button>
          <cy-button color="tertiary">tertiary</cy-button>
          <cy-button color="success">success</cy-button>
          <cy-button color="warning">warning</cy-button>
          <cy-button color="danger">danger</cy-button>
          <cy-button color="dark">dark</cy-button>
          <cy-button color="light">light</cy-button>
          <h3>block width</h3>
          <cy-button color="primary" expend="block">
            primary
          </cy-button>
          <h3>full width</h3>
          <cy-button color="primary" expend="full">
            primary
          </cy-button>
        </div>
      );
    case '开关':
      return (
        <div>
          <h3>一键滑动解锁</h3>
          <cy-toggle color="primary">primary</cy-toggle>
          <cy-toggle color="secondary">secondary</cy-toggle>
          <cy-toggle color="tertiary">tertiary</cy-toggle>
          <cy-toggle color="success">success</cy-toggle>
          <cy-toggle color="warning">warning</cy-toggle>
          <cy-toggle color="danger">danger</cy-toggle>
          <cy-toggle color="dark">dark</cy-toggle>
          <cy-toggle color="light">light</cy-toggle>
        </div>
      );
    case '选择器':
      return (
        <div>
          <cy-button color="primary" expend="block" onClick={createActionSheet.bind(this)}>
            action sheet
          </cy-button>
        </div>
      );
    case '钟表':
      return (
        <div>
          <cy-time color="primary">primary</cy-time>
          <cy-time color="secondary">secondary</cy-time>
          <cy-time color="tertiary">tertiary</cy-time>
          <cy-time color="success">success</cy-time>
          <cy-time color="warning">warning</cy-time>
          <cy-time color="danger">danger</cy-time>
          <cy-time color="dark">dark</cy-time>
          <cy-time color="light">light</cy-time>
        </div>
      );
    case '单选框':
      return (
        <div>
          <cy-checkbox color="primary">primary</cy-checkbox>
          <cy-checkbox color="secondary">secondary</cy-checkbox>
          <cy-checkbox color="tertiary">tertiary</cy-checkbox>
          <cy-checkbox color="success">success</cy-checkbox>
          <cy-checkbox color="warning">warning</cy-checkbox>
          <cy-checkbox color="danger">danger</cy-checkbox>
          <cy-checkbox color="dark">dark</cy-checkbox>
          <cy-checkbox color="light">light</cy-checkbox>
        </div>
      );
    case '加载':
      return (
        <div>
          <cy-spinner color="primary">primary</cy-spinner>
          <cy-spinner color="secondary">secondary</cy-spinner>
          <cy-spinner color="tertiary">tertiary</cy-spinner>
          <cy-spinner color="success">success</cy-spinner>
          <cy-spinner color="warning">warning</cy-spinner>
          <cy-spinner color="danger">danger</cy-spinner>
          <cy-spinner color="dark">dark</cy-spinner>
          <cy-spinner color="light">light</cy-spinner>
        </div>
      );
    case '日历':
      return (
        <div>
          <cy-calendar color="primary"></cy-calendar>
          <cy-calendar color="secondary"></cy-calendar>
          <cy-calendar color="tertiary"></cy-calendar>
          <cy-calendar color="success"></cy-calendar>
          <cy-calendar color="warning"></cy-calendar>
          <cy-calendar color="danger"></cy-calendar>
          <cy-calendar color="dark"></cy-calendar>
          <cy-calendar color="light"></cy-calendar>
        </div>
      );
    case '滑块':
      return (
        <div>
          <h3>不可滚动的（可拖动）</h3>
          <cy-segment color="primary" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <cy-segment color="secondary" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <cy-segment color="tertiary" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <cy-segment color="success" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <cy-segment color="warning" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <cy-segment color="danger" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <cy-segment color="dark" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <cy-segment color="medium" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <cy-segment color="light" value="大狗子">
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
          </cy-segment>
          <h3>可以滚动的</h3>
          <cy-segment color="primary" value="大狗子" scrollable>
            <cy-segment-button value="大狗子">大狗子</cy-segment-button>
            <cy-segment-button value="二狗子">二狗子</cy-segment-button>
            <cy-segment-button value="三狗子">三狗子</cy-segment-button>
            <cy-segment-button value="四狗子">特别长特别长特别长特别长特别长特别长特别长特别长特别长</cy-segment-button>
            <cy-segment-button value="五狗子">五狗子</cy-segment-button>
          </cy-segment>
        </div>
      );
    default:
      return <div></div>;
  }
};
