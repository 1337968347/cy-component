import { Element, Component, State, Method, h } from '@stencil/core';
import { enterAnimationBuilder, leaveAnimationBuilder } from './animation';
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
    const navContainerEl = this.el.querySelector<HTMLElement>('.nav-container');

    navContainerEl.appendChild(comEl);
    const aniEnter = enterAnimationBuilder(comEl);
    await aniEnter.play();
    this.onlyLastOnePageShow(navContainerEl);
  }

  @Method()
  async pop() {
    const navContainerEl = this.el.querySelector<HTMLElement>('.nav-container');
    const childEls = Array.from(navContainerEl.children);
    if (childEls.length > 1) {
      const popPageEL = childEls[childEls.length - 1];
      const aniLeave = leaveAnimationBuilder(popPageEL);
      await aniLeave.play();
      popPageEL.remove();
      this.onlyLastOnePageShow(navContainerEl);
    }
  }

  /**
   * only show last page show
   * @param navContainerEl
   */
  onlyLastOnePageShow(navContainerEl: HTMLElement) {
    const childEls = Array.from(navContainerEl.children);
    childEls
      .filter((_item, index) => index !== childEls.length - 1)
      .map(pageEl => {
        pageEl.classList.add('cy-page-hidden');
      });
    childEls[childEls.length - 1].classList.remove('cy-page-hidden');
  }

  render() {
    return (
      <div class="nav-container">
        <slot />
      </div>
    );
  }
}
