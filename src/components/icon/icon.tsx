import { Component, Prop, State, h } from '@stencil/core';
import { getSvgContent } from './icon-utils';

@Component({
  tag: 'cy-icon',
  styleUrl: 'icon.css',
})
export class cyIcon {
  @Prop() color: string = 'primary';
  @Prop() name: string = '';
  @State() svgContent: string = '';

  componentDidLoad() {
    getSvgContent(this.name).then(svgContent => {
      this.svgContent = svgContent;
    });
  }

  render() {
    return (
      <div
        class={{
          [`cy-color-${this.color}`]: true,
          'svg-container': true,
        }}
        innerHTML={this.svgContent}></div>
    );
  }
}
