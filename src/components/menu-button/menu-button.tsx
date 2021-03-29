import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'cy-menu-button',
})
export class MenuButton {
  toggleMenu() {
    document.querySelector('cy-menu').toggle();
  }

  render() {
    return (
      <Host onClick={this.toggleMenu} class="activatable" slot="start">
        <cy-icon name="menu" />
        <cy-ripple type="unbounded" />
      </Host>
    );
  }
}
