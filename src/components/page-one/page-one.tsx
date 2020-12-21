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
  render() {
    return (
      <cy-page>
        <header>
          <h3>Stencil App Starter{this.id}</h3>
        </header>

        <cy-content>
          <cy-ripple
            onClick={() => {
              this.addCom();
            }}
          ></cy-ripple>
        </cy-content>
      </cy-page>
    );
  }
}
