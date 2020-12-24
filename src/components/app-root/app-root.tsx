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
      <cy-nav>
        <page-one></page-one>
      </cy-nav>
    );
  }
}
