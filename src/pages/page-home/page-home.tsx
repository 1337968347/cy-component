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
          <p>基于兴趣做的一点小玩意。没用很正常。。。</p>
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

            <div class="card">
              <div class="card-header activatable">SVG</div>
              <div class="card-content">
                <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="50" height="50" fill="transparent" stroke="red" stroke-width="4" /><rect x="70" y="10" rx="5" ry="5" width="50" height="50" stroke="black" fill="transparent" stroke-width="4" /><circle cx="35" cy="100" r="25" fill="transparent" stroke="red" stroke-width="4" /><ellipse cx="100" cy="100" rx="30" ry="15" fill="transparent" stroke="red" stroke-width="4" /><line x1="30" y1="140" x2="100" y2="150" stroke="blue" stroke-width="4" /><polyline points="30 170,40 180,50 180, 60 190" stroke="red" fill="transparent" stroke-width="4" /><polygon points="100 160 105 180 120 180 110 190 115 205 100 195 85 205 90 190 80 180 95 180" stroke="green" fill="transparent" stroke-width="4" /><path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="4" /><path d="M150 00  v 300" fill="transparent" stroke="black" /><path d="M160 20 l 80 0 l 0 80 l -80 0 Z" fill="transparent" stroke="black" /><path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent" /><path d="M70 10 C 70 20, 120 20, 120 10" stroke="black" fill="transparent" /><path d="M130 10 C 120 20, 180 20, 170 10" stroke="black" fill="transparent" /><path d="M10 60 C 20 80, 40 80, 50 60" stroke="black" fill="transparent" /><path d="M70 60 C 70 80, 110 80, 110 60" stroke="black" fill="transparent" /><path d="M130 60 C 120 80, 180 80, 170 60" stroke="black" fill="transparent" /><path d="M10 110 C 20 140, 40 140, 50 110" stroke="black" fill="transparent" /><path d="M70 110 C 70 140, 110 140, 110 110" stroke="black" fill="transparent" /><path d="M130 110 C 120 140, 180 140, 170 110" stroke="black" fill="transparent" /><path d="M150 150 l 150 0" fill="transparent" stroke="black" /><path d="M160 180 C 180 170 180 200 160 195 C 180 195 180 220 160 212 M 160 179 L 160 240 M 181 190 L 208 190 M 196 182 L 182 205 L 208 205 M 195 195 L 195 232 L 190 228 M 185 220 L 180 225 M 205 220 L 210 225" fill="transparent" stroke="red" stroke-width="3" /><path d="M240 180 C 260 170 260 200 240 195 C 260 195 260 220 240 212 M 240 180 L 240 240 M 260 190 L 280 190 L 280 230 L 260 230 Z M260 210 L 280 210" fill="transparent" stroke="red" stroke-width="3" /></svg>
              </div>
            </div>
          </div>
        </cy-content>
      </cy-page>
    );
  }
}
