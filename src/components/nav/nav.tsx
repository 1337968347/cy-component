import { Element, Component, State, Method, h } from '@stencil/core';
import { enterAnimationBuilder, leaveAnimationBuilder } from './animation';
@Component({
  tag: 'cy-nav',
  styleUrl: 'nav.scss',
  shadow: true,
})
export class nav {
  @Element() el: HTMLElement;
  @State() lastId = 0;

  @Method()
  async push(componentName: string) {
    const comEl = document.createElement(componentName);
    comEl.classList.add('cy-page');

    this.el.appendChild(comEl);
    const aniEnter = enterAnimationBuilder(comEl);
    await aniEnter.play();

    this.showLastNumPage(this.el, 1);
  }

  @Method()
  async pop() {
    const childEls = Array.from(this.el.children);
    if (childEls.length > 1) {
      const popPageEL = childEls[childEls.length - 1];
      this.showLastNumPage(this.el, 2);

      const aniLeave = leaveAnimationBuilder(popPageEL);
      await aniLeave.play();
      popPageEL.remove();

      this.showLastNumPage(this.el, 1);
    }
  }

  /**
   * only show last page show
   * @param navContainerEl
   */
  showLastNumPage(navContainerEl: HTMLElement, showNum: number = 1) {
    const childEls = Array.from(navContainerEl.children);
    childEls.map((pageEl, index) => {
      if (index + showNum > childEls.length - 1) {
        pageEl.classList.remove('cy-page-hidden');
      } else {
        pageEl.classList.add('cy-page-hidden');
      }
    });
  }

  render() {
    return (
      <div class="nav-container">
        <slot />
      </div>
    );
  }
}
