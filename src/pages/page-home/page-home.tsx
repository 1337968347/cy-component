import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-home',
  styleUrl: 'page-home.scss',
})
export class PageHome {
  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <h3>欢迎</h3>
        </cy-header>
        <cy-content>
          <div class="container">
            <div class="card">
              <div class="card-header activatable">
                button
                <cy-ripple />
              </div>
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
              <div class="card-header activatable">
                input type=number <cy-ripple />
              </div>
              <div class="card-content">
                <number-input></number-input>
              </div>
            </div>

            <div class="card">
              <div class="card-header activatable">
                toggle
                <cy-ripple />
              </div>
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
          </div>
        </cy-content>
      </div>
    );
  }
}
