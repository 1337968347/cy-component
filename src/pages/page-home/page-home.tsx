import { Component, State, Host, Element, h } from '@stencil/core';
import { showToast } from '../../utils/toast';
const components = ['button', 'menu', 'time', 'action-sheet', 'segment', 'toggle', 'checkbox', 'spinner', 'camera'];
@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
})
export class PageHome {
  @Element() el: HTMLElement;
  @State() choose: string = 'button';

  componentWillLoad() {
    this.choose = location.hash.split('#')[1] || 'button';
  }

  switchCom(value) {
    this.choose = value;
    location.hash = value;
    document.querySelector('cy-menu').close();
  }

  render() {
    return (
      <Host>
        <cy-menu>
          <cy-header color="light">
            <h3 class="cy-title">菜单</h3>
          </cy-header>
          <cy-content>
            {components.map(com => (
              <cy-item
                onClick={() => {
                  this.switchCom(com);
                }}
                line
                button>
                <h3>{com}</h3>
              </cy-item>
            ))}
          </cy-content>
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

const openCamera = async () => {
  const camera: any = document.createElement('pwa-camera-modal');

  document.body.appendChild(camera);

  await camera.componentOnReady();

  camera.addEventListener('noDeviceError', async e => {
    console.log('NO DEVICE', e);
  });

  camera.addEventListener('photo', async e => {
    const photo = e.detail;

    if (photo && !(photo instanceof Error)) {
      const url = window.URL.createObjectURL(photo);

      const img: any = document.querySelector('#img') || document.createElement('img');
      img.src = url;
      img.id = 'img';
      img.style.width = '100%';
      img.parentNode && img.parentNode.removeChild(img);

      document.querySelector('.container').appendChild(img);
    } else if (photo) {
      console.error(photo.message);
    }

    // Hide the modal
    await camera.dismiss();
    document.querySelector('.container').removeChild(camera);
  });

  camera.present();
};

const RenderShowItem = (showName: string) => {
  switch (showName) {
    case 'camera':
      return (
        <div>
          <cy-button color="primary" expend="block" onClick={openCamera.bind(this)}>
            Camera
          </cy-button>
        </div>
      );
    case 'button':
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
    case 'toggle':
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
    case 'menu':
      return (
        <div>
          <cy-button color="primary" expend="block" onClick={openMenu.bind(this)}>
            open Menu
          </cy-button>
        </div>
      );
    case 'action-sheet':
      return (
        <div>
          <cy-button color="primary" expend="block" onClick={createActionSheet.bind(this)}>
            action sheet
          </cy-button>
        </div>
      );
    case 'time':
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
    case 'checkbox':
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
    case 'spinner':
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
    case 'segment':
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
