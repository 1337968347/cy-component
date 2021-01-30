import { Component, State, h, Method, Host } from '@stencil/core';

@Component({
  tag: 'cy-menu',
  styleUrl: 'menu.scss',
  shadow: true,
})
export class CyMenu {
  @State() isOpen: boolean = false;

  onBackDropClick() {
    this.close();
  }

  @Method()
  async open() {
    this.isOpen = true;
  }

  @Method()
  async close() {
    this.isOpen = false;
  }

  render() {
    return (
      <Host
        class={{
          'open-menu': this.isOpen,
        }}
      >
        <div class="menu-container">
          <slot />
        </div>
        <cy-backdrop onBackDrop={this.onBackDropClick.bind(this)} />
      </Host>
    );
  }
}
