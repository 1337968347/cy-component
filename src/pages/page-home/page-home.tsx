import { Component, State, Element, h } from '@stencil/core';
import { showToast } from '../../utils/toast';
import { createBackDrop } from '../../utils/backdrop';
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

  render() {
    return (
      <cy-page>
        <cy-header>
          <h3>欢迎</h3>
        </cy-header>
        <cy-segment
          style={{ height: '35px' }}
          scrollable={true}
          color="medium"
          value={this.choose}
          onCyChange={e => {
            this.choose = e.detail;
            location.hash = e.detail;
          }}
        >
          <cy-segment-button value="button">Button</cy-segment-button>
          <cy-segment-button value="toggle">Toggle</cy-segment-button>
          <cy-segment-button value="ripple">Ripple</cy-segment-button>
          <cy-segment-button value="modal">Modal</cy-segment-button>
          <cy-segment-button value="action-sheet">ActionSheet</cy-segment-button>
          <cy-segment-button value="time">Time</cy-segment-button>
          <cy-segment-button value="checkBox">CheckBox</cy-segment-button>
          <cy-segment-button value="spinner">Spinner</cy-segment-button>
          <cy-segment-button value="toast">Toast</cy-segment-button>
          <cy-segment-button value="segment">Segment</cy-segment-button>
        </cy-segment>
        <cy-content>
          <div class="container">{RenderShowItem(this.choose)}</div>
        </cy-content>
      </cy-page>
    );
  }
}
const createActionSheet = () => {
  const actionSheet = document.createElement('cy-action-sheet');
  actionSheet.header = 'Albums';
  actionSheet.cssClass = 'my-custom-class';
  actionSheet.buttons = [
    {
      text: 'Delete',
      role: 'destructive',
      icon: 'trash',
      handler: () => {
        console.log('Delete clicked');
        document.body.removeChild(actionSheet);
      },
    },
    {
      text: 'Share',
      icon: 'share',
      handler: () => {
        console.log('Share clicked');
        document.body.removeChild(actionSheet);
      },
    },
    {
      text: 'Play (open modal)',
      icon: 'caret-forward-circle',
      handler: () => {
        console.log('Play clicked');
        document.body.removeChild(actionSheet);
      },
    },
    {
      text: 'Favorite',
      icon: 'heart',
      handler: () => {
        console.log('Favorite clicked');
        document.body.removeChild(actionSheet);
      },
    },
    {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
        document.body.removeChild(actionSheet);
      },
    },
  ];
  document.body.appendChild(actionSheet);
  actionSheet.present();
};

const RenderShowItem = (showName: string) => {
  switch (showName) {
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
    case 'ripple':
      return (
        <div>
          <div
            style={{
              height: '50px',
              margin: '5px',
              background: '#f1f1f1',
              color: 'var(--cy-color-primary)',
            }}
            class="activatable"
          >
            PRIMARY
            <cy-ripple />
          </div>
          <div
            style={{
              height: '50px',
              margin: '5px',
              background: '#f1f1f1',
              color: 'var(--cy-color-secondary)',
            }}
            class="activatable"
          >
            secondary
            <cy-ripple />
          </div>
          <div
            style={{
              'width': '100px',
              'height': '100px',
              'margin': '5px',
              'border-radius': '50%',
              'background': '#f1f1f1',
              'color': 'var(--cy-color-tertiary)',
            }}
            class="activatable"
          >
            <cy-ripple type="unbounded" />
          </div>
        </div>
      );
    case 'modal':
      return (
        <cy-button color="primary" expend="block" onClick={createBackDrop.bind(this)}>
          show modal
        </cy-button>
      );
    case 'action-sheet':
      return (
        <cy-button color="primary" expend="block" onClick={createActionSheet.bind(this)}>
          action sheet
        </cy-button>
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
    case 'checkBox':
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
    case 'toast':
      return (
        <cy-button
          expend="block"
          color="primary"
          onClick={() => {
            showToast({ title: '标题' });
          }}
        >
          show Toast
        </cy-button>
      );
    case 'segment':
      return (
        <div>
          <h3>不可滚动的</h3>
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
