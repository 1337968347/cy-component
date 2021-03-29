import { Component, State, Element, h } from '@stencil/core';
import { configManager } from '../../utils/config';
import { Color } from '../../interface';

@Component({
  tag: 'page-datascreen',
})
export class PageDatascreen {
  @Element() el: HTMLElement;
  @State() color: Color = configManager.getPreferColor();

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">数据可视化</h3>
        </cy-header>
        <cy-content>
          <cy-button
            color={this.color}
            onClick={() => {
              location.href = '/DataScreen/';
            }}>
            jump
          </cy-button>
        </cy-content>
      </div>
    );
  }
}
