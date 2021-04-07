import { Component, State, Element, h } from '@stencil/core';
import { configManager } from '../../utils/config';
import { createRetroSnaker } from './retroSnaker';
import { Color } from '../../interface';

@Component({
  tag: 'page-datascreen',
  styleUrl: 'page-datascreen.scss',
})
export class PageDatascreen {
  @Element() el: HTMLElement;
  @State() color: Color = configManager.getPreferColor();

  componentDidLoad() {
    const canvasEl = this.el.querySelector<HTMLCanvasElement>('#canvas');
    const gameController =  createRetroSnaker(canvasEl);
    gameController.start();
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">可视化</h3>
        </cy-header>
        <cy-content>
          <canvas width="1000" height="500" id="canvas"></canvas>
        </cy-content>
      </div>
    );
  }
}
