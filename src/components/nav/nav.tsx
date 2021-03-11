import { Element, Component, State, Method, h } from '@stencil/core';
import { enterAnimationBuilder } from './animation';
@Component({
  tag: 'cy-nav',
  styleUrl: 'nav.scss',
})
export class nav {
  @Element() el: HTMLElement;
  @State() lastId = 0;

  @Method()
  async push(componentName: string) {
    const comEl = document.createElement(componentName);
    comEl.classList.add('cy-page');
    const navContainerEl = this.el.querySelector('.nav-container');
    
    navContainerEl.appendChild(comEl);
    const aniEnter = enterAnimationBuilder(comEl);
    await aniEnter.play();
  }

  @Method()
  async pop() {}

  render() {
    return (
      <div class="nav-container">
        <slot />
      </div>
    );
  }
}
