import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'nav-pageone',
})
export class NavPageOne {
  @Element() el: HTMLElement;

  navToPageTwo() {
    this.el.closest('cy-nav').push('nav-pagetwo');
  }

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
        <cy-content>
          <cy-button
            color="primary"
            onClick={() => {
              this.navToPageTwo();
            }}>
            page-two
          </cy-button>
        </cy-content>
      </div>
    );
  }
}
