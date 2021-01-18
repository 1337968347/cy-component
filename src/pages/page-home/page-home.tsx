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

  render() {
    return (
      <cy-page>
        <cy-header>
          <h3>欢迎</h3>
        </cy-header>
        <cy-content>
          <div class="content">
            <cy-segment
              scrollable={true}
              color="medium"
              value={this.choose}
              onCyChange={e => {
                this.choose = e.detail;
              }}
            >
              <cy-segment-button value="button">Button</cy-segment-button>
              <cy-segment-button value="toggle">Toggle</cy-segment-button>
              <cy-segment-button value="ripple">ripple</cy-segment-button>
              <cy-segment-button value="modal">modal</cy-segment-button>
              <cy-segment-button value="time">time</cy-segment-button>
              <cy-segment-button value="checkBox">checkBox</cy-segment-button>
              <cy-segment-button value="spinner">spinner</cy-segment-button>
              <cy-segment-button value="toast">toast</cy-segment-button>
              <cy-segment-button value="segment">segment</cy-segment-button>
            </cy-segment>
            <div class="container">{RenderShowItem(this.choose)}</div>
          </div>
        </cy-content>
      </cy-page>
    );
  }
}

const RenderShowItem = (showName: string) => {
  switch (showName) {
    case 'button':
      return (
        <div class="card">
          <div class="card-header">button</div>
          <div class="card-content">
            <cy-button color="primary">primary</cy-button>
            <cy-button color="secondary">secondary</cy-button>
            <cy-button color="tertiary">tertiary</cy-button>
            <cy-button color="success">success</cy-button>
            <cy-button color="warning">warning</cy-button>
            <cy-button color="danger">danger</cy-button>
            <cy-button color="dark">dark</cy-button>
            <cy-button color="light">light</cy-button>
          </div>
        </div>
      );
    case 'toggle':
      return (
        <div class="card">
          <div class="card-header">toggle</div>
          <div class="card-content">
            <cy-toggle color="primary">primary</cy-toggle>
            <cy-toggle color="secondary">secondary</cy-toggle>
            <cy-toggle color="tertiary">tertiary</cy-toggle>
            <cy-toggle color="success">success</cy-toggle>
            <cy-toggle color="warning">warning</cy-toggle>
            <cy-toggle color="danger">danger</cy-toggle>
            <cy-toggle color="dark">dark</cy-toggle>
            <cy-toggle color="light">light</cy-toggle>
          </div>
        </div>
      );
    case 'ripple':
      return (
        <div class="card">
          <div class="card-header activatable">
            ripple
            <cy-ripple />
          </div>
          <div class="card-content">
            <div
              style={{
                width: '150px',
                height: '40px',
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
                width: '180px',
                height: '40px',
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
                'width': '80px',
                'height': '70px',
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
        </div>
      );
    case 'modal':
      return (
        <div class="card">
          <div class="card-header activatable">Modal</div>
          <div class="card-content">
            <cy-button color="primary" onClick={createBackDrop.bind(this)}>
              show modal
            </cy-button>
          </div>
        </div>
      );
    case 'time':
      return (
        <div class="card">
          <div class="card-header activatable">Time</div>
          <div class="card-content">
            <cy-time color="primary">primary</cy-time>
            <cy-time color="secondary">secondary</cy-time>
            <cy-time color="tertiary">tertiary</cy-time>
            <cy-time color="success">success</cy-time>
            <cy-time color="warning">warning</cy-time>
            <cy-time color="danger">danger</cy-time>
            <cy-time color="dark">dark</cy-time>
            <cy-time color="light">light</cy-time>
          </div>
        </div>
      );
    case 'checkBox':
      return (
        <div class="card">
          <div class="card-header activatable">checkBox</div>
          <div class="card-content">
            <cy-checkbox color="primary">primary</cy-checkbox>
            <cy-checkbox color="secondary">secondary</cy-checkbox>
            <cy-checkbox color="tertiary">tertiary</cy-checkbox>
            <cy-checkbox color="success">success</cy-checkbox>
            <cy-checkbox color="warning">warning</cy-checkbox>
            <cy-checkbox color="danger">danger</cy-checkbox>
            <cy-checkbox color="dark">dark</cy-checkbox>
            <cy-checkbox color="light">light</cy-checkbox>
          </div>
        </div>
      );
    case 'spinner':
      return (
        <div class="card">
          <div class="card-header activatable">spinner</div>
          <div class="card-content">
            <cy-spinner color="primary">primary</cy-spinner>
            <cy-spinner color="secondary">secondary</cy-spinner>
            <cy-spinner color="tertiary">tertiary</cy-spinner>
            <cy-spinner color="success">success</cy-spinner>
            <cy-spinner color="warning">warning</cy-spinner>
            <cy-spinner color="danger">danger</cy-spinner>
            <cy-spinner color="dark">dark</cy-spinner>
            <cy-spinner color="light">light</cy-spinner>
          </div>
        </div>
      );
    case 'toast':
      return (
        <div class="card">
          <div class="card-header activatable">toast</div>
          <div class="card-content">
            <cy-button color="primary" onClick={showToast}>
              show Toast
            </cy-button>
          </div>
        </div>
      );
    case 'segment':
      return (
        <div class="card">
          <div class="card-header activatable">Segment</div>
          <div class="card-content">
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
            <cy-segment color="light" value="大狗子">
              <cy-segment-button value="大狗子">大狗子</cy-segment-button>
              <cy-segment-button value="二狗子">二狗子</cy-segment-button>
              <cy-segment-button value="三狗子">三狗子</cy-segment-button>
            </cy-segment>

            <cy-segment color="light" value="大狗子" scrollable>
              <cy-segment-button value="大狗子">大狗子</cy-segment-button>
              <cy-segment-button value="二狗子">二狗子</cy-segment-button>
              <cy-segment-button value="四狗子">特别长特别长特别长</cy-segment-button>
              <cy-segment-button value="三狗子">三狗子</cy-segment-button>
            </cy-segment>

            <cy-segment style={{ width: '70px' }} color="primary" direction="y" value="大狗子">
              <cy-segment-button value="大狗子">大狗子</cy-segment-button>
              <cy-segment-button value="二狗子">二狗子</cy-segment-button>
              <cy-segment-button value="三狗子">三狗子</cy-segment-button>
            </cy-segment>
          </div>
        </div>
      );
    default:
      return <div></div>;
  }
};
