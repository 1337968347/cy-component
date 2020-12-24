import { Element, Prop, Component, h } from '@stencil/core';

@Component({
  tag: 'page-one',
  styleUrl: 'page-one.scss',
})
export class PageOne {
  @Prop() id = '';
  @Element() el;
  addCom() {
    this.el.closest('cy-nav').addCom();
  }
  back() {
    this.el.closest('cy-nav').pop();
  }
  render() {
    return (
      <cy-page>
        <header>
          <cy-ripple
            onClick={() => {
              this.back();
            }}
          >
            返回
          </cy-ripple>
          <h3>Stencil App Starter{this.id}</h3>
        </header>

        <cy-content>
          <cy-refresh slot="fixed"></cy-refresh>
          <cy-ripple
            onClick={() => {
              this.addCom();
            }}
          >
            next page
          </cy-ripple>
          <number-input />
        </cy-content>
      </cy-page>
    );
  }
}
