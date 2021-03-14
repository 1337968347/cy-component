import { Element, Component, State, Method, h } from '@stencil/core';
import { enterAnimationBuilder, leaveAnimationBuilder } from './animation';
@Component({
  tag: 'cy-nav',
  styleUrl: 'nav.scss',
})
export class nav {
  @Element() el: HTMLElement;
  @State() lastId = 0;
  private navContainer: HTMLElement;

  componentDidLoad() {
    this.navContainer = this.el.querySelector<HTMLElement>('.nav-container')
  }

  @Method()
  async push(componentName: string) {
    const comEl = document.createElement(componentName);
    this.navContainer.appendChild(comEl);
    const aniEnter = enterAnimationBuilder(comEl);
    await aniEnter.play();
    this.onlyLastOnePageShow(this.navContainer);
  }

  @Method()
  async pop() {
    const childEls = Array.from(this.navContainer.children);
    if (childEls.length > 1) {
      const popPageEL = childEls[childEls.length - 1];
      const aniLeave = leaveAnimationBuilder(popPageEL);
      await aniLeave.play();
      popPageEL.remove();
      this.onlyLastOnePageShow(this.navContainer);
    }
  }

  /**
   * only show last page show
   * @param navContainerEl
   */
  onlyLastOnePageShow(navContainerEl: HTMLElement, showNum: number = 1) {
    const childEls = Array.from(navContainerEl.children);
    childEls
      .filter((_item, index) => index - showNum > childEls.length)
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
