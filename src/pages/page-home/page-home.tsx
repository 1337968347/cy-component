import { Component, Element, h } from '@stencil/core';

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
              <div class="card-header activatable">input type=number</div>
              <div class="card-content">
                <number-input></number-input>
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
          </div>
        </cy-content>
      </cy-page>
    );
  }
}
