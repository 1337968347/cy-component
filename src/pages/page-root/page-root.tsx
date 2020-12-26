import { Component, h } from '@stencil/core';

@Component({
  tag: 'page-root',
})
export class PageRoot {
  render() {
    return (
      <cy-page>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url="/" component="page-home" exact={true} />
            {/* <stencil-route url="/demos" component="demos-page" />
          <stencil-route url="/other" component="other-page" /> */}
            <stencil-route component="page-not-found" />
          </stencil-route-switch>
        </stencil-router>
      </cy-page>
    );
  }
}
