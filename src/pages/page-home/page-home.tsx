import { Component, Element, h } from '@stencil/core';
import { showToast } from '../../utils/toast';
@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
})
export class PageHome {
  @Element() el: HTMLElement;

  showBackDrop() {
    const cyModal = document.createElement('cy-backdrop');
    cyModal.onclick = () => {
      this.el.querySelector('cy-page').removeChild(cyModal);
    };
    this.el.querySelector('cy-page').appendChild(cyModal);
  }

  showToast() {
    showToast({
      title: '这个是标题',
    });
  }

  render() {
    return (
      <cy-page>
        <cy-header>
          <h3>欢迎</h3>
        </cy-header>
        <cy-content>
          <div class="container">
            <div class="card">
              <div class="card-header activatable">button</div>
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

            <div class="card">
              <div class="card-header activatable">toggle</div>
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

            <div class="card">
              <div class="card-header activatable">Modal</div>
              <div class="card-content">
                <cy-button color="primary" onClick={this.showBackDrop.bind(this)}>
                  show modal
                </cy-button>
              </div>
            </div>

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

            <div class="card">
              <div class="card-header activatable">spinner</div>
              <div class="card-content">
                <cy-spinner color="primary">primary</cy-spinner>
                {/* <cy-spinner color="secondary">secondary</cy-spinner>
                <cy-spinner color="tertiary">tertiary</cy-spinner>
                <cy-spinner color="success">success</cy-spinner>
                <cy-spinner color="warning">warning</cy-spinner>
                <cy-spinner color="danger">danger</cy-spinner>
                <cy-spinner color="dark">dark</cy-spinner>
                <cy-spinner color="light">light</cy-spinner> */}
              </div>
            </div>

            <div class="card">
              <div class="card-header activatable">toast</div>
              <div class="card-content">
                <cy-button color="primary" onClick={this.showToast}>
                  show Toast
                </cy-button>
              </div>
            </div>

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
              </div>
            </div>
          </div>
        </cy-content>
      </cy-page>
    );
  }
}
