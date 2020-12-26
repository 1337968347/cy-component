import { Component, h, Host } from '@stencil/core';
import { startTapClick } from '../../utils/tap-click';

@Component({
  tag: 'cy-page',
  styleUrl: 'page.scss',
})
export class CyPage {
  componentDidLoad() {
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
