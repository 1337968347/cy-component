import { Component, Element, State, h, Method, Host } from '@stencil/core';
import { enterAnimationBuilder } from './animation';

@Component({
  tag: 'cy-menu',
  styleUrl: 'menu.scss',
  shadow: true,
})
export class CyMenu {
  @Element() el: HTMLElement;
  @State() isOpen: boolean = false;

  onBackDropClick() {
    this.close();
  }

  @Method()
  async open() {
    const enterAni = enterAnimationBuilder(this.el);
    enterAni.play();
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
        }}>
        <div class="menu-container">
          <slot />
        </div>
        <cy-backdrop onBackDrop={this.onBackDropClick.bind(this)} />
      </Host>
    );
  }
}
