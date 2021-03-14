import { Component, Element, h } from '@stencil/core';

@Component({
  tag: 'nav-pagetwo',
})
export class NavPagetwo {
  @Element() el: HTMLElement;

  back() {
    this.el.closest('cy-nav').pop();
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <div slot="start" class="btn-box activatable" onClick={this.back.bind(this)}>
            <cy-icon name="back" />
            <cy-ripple type="unbounded" />
          </div>
          <h3>Header</h3>
        </cy-header>
        <cy-content>second Page</cy-content>
      </div>
    );
  }
}
