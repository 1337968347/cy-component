import { Component, Host, h } from '@stencil/core';
import { startTapClick } from '../../utils/tap-click';

@Component({
  tag: 'cy-app',
  styleUrl: 'app.css',
})
export class app {
  componentWillLoad() {
    startTapClick();
  }

  render() {
    return (
      <Host class="cy-page">
        <slot />
      </Host>
    );
  }
}
