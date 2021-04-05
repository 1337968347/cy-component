import { Component, State, Element, h } from '@stencil/core';
import createCanvasCtx from '../../utils/canvas';
import { configManager } from '../../utils/config';
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
    const _ctxOper = createCanvasCtx(canvasEl);
    _ctxOper
      .renderLike()
      .renderPalette()
      .renderCircle()
      .renderDottedLine()
      .renderGradient()
      .renderImage()
      .renderTitle()
      .renderRotate()
      .renderStars();
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">可视化</h3>
        </cy-header>
        <cy-content>
          <canvas width="800" height="700" id="canvas"></canvas>
        </cy-content>
      </div>
    );
  }
}
