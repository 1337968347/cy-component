import { Component, Prop, State, Host, h } from '@stencil/core';
import { getSvgContent } from './icon-utils';

@Component({
  tag: 'cy-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class cyIcon {
  @Prop() name: string = '';
  @State() svgContent: string = '';

  componentDidLoad() {
    getSvgContent(this.name).then(svgContent => {
      this.svgContent = svgContent;
    });
  }

  render() {
    return (
      <Host>
        <div class="svg-container" innerHTML={this.svgContent}></div>
      </Host>
    );
  }
}
