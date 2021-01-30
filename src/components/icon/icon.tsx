import { Component, Prop, State, Host, h } from '@stencil/core';

@Component({
  tag: 'cy-icon',
  styleUrl: 'icon.css',
})
export class cyIcon {
  @Prop() name: string = '';
  @State() svgContent: string = '';

  render() {
    return <Host>{this.svgContent}</Host>;
  }
}
