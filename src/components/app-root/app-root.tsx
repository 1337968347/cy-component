import { Component, h } from '@stencil/core';
import { startTapClick } from '../../utils/helpers';
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
})
export class AppRoot {
  componentDidLoad() {
    startTapClick();
  }

  render() {
    return (
      <cy-page>
        <header>
          <h3>Stencil App Starter</h3>
        </header>

        <cy-content>
          <cy-refresh slot="fixed"></cy-refresh>
          <cy-ripple></cy-ripple>
        </cy-content>
      </cy-page>
    );
  }
}
