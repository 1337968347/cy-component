import { Component, State, h } from '@stencil/core';
import { configManager } from '../../utils/config';
import { Color } from '../../interface';

@Component({
  tag: 'page-nav',
})
export class PageNav {
  @State() color: Color = configManager.getPreferColor();
  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">导航</h3>
        </cy-header>
        <cy-content>
          <cy-button
            color={this.color}
            onClick={() => {
              location.href = 'https://1337968347.github.io/DataScreen/';
            }}>
            jump
          </cy-button>
        </cy-content>
      </div>
    );
  }
}
