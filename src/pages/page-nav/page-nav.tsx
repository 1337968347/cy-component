import { Component, State, h } from '@stencil/core';
import { configManager } from '../../utils/config';
import { Color } from '../../interface';

@Component({
  tag: 'page-nav',
})
export class PageNav {
  @State() color: Color = configManager.getPreferColor();

  nextPage() {
    document.querySelector('cy-nav').push('nav-pageone');
  }

  render() {
    return (
      <cy-nav>
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">导航</h3>
        </cy-header>
        <cy-content>
          <cy-button color={this.color} onClick={this.nextPage.bind(this)}>
            jump
          </cy-button>
        </cy-content>
      </cy-nav>
    );
  }
}
