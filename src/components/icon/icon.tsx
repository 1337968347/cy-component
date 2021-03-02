import { Component, Prop, State, h, Host } from '@stencil/core';
import { getSvgContent } from './icon-utils';

@Component({
  tag: 'cy-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class cyIcon {
  @Prop() color: string = '';
  @Prop() name: string = '';
  @State() svgContent: string = '';

  componentDidLoad() {
    getSvgContent(this.name).then(svgContent => {
      this.svgContent = svgContent;
    });
  }

  render() {
    return (
      <Host
        class={{
          [`cy-color-${this.color}`]: !!this.color,
          'svg-container': true,
        }}>
        <div innerHTML={this.svgContent}></div>
      </Host>
    );
  }
}
