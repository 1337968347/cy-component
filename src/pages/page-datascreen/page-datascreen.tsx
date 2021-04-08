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
  gameController: any;
  @State() color: Color = configManager.getPreferColor();

  componentDidLoad() {
    const canvasEl = this.el.querySelector<HTMLCanvasElement>('#canvas');
    canvasEl.width = this.el.querySelector('cy-content').clientWidth * 0.95;
    canvasEl.height = canvasEl.width;
    this.gameController = createRetroSnaker(canvasEl, 20);
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">canvas</h3>
        </cy-header>
        <cy-content>
          <canvas id="canvas"></canvas>
          <div class="contral">
            <div class="game-contral">
              <cy-button
                onClick={() => {
                  this.gameController.start();
                }}>
                play
              </cy-button>

              <cy-button
                onClick={() => {
                  this.gameController.pause();
                }}>
                pause
              </cy-button>

              <cy-button
                onClick={() => {
                  this.gameController.destory();
                }}>
                destory
              </cy-button>
            </div>

            <div class="direction">
              <cy-button
                color={this.color}
                onClick={() => {
                  this.gameController.turn(0);
                }}>
                上
              </cy-button>
            </div>
            <div class="direction">
              <cy-button
                color={this.color}
                onClick={() => {
                  this.gameController.turn(240);
                }}>
                左
              </cy-button>
              <cy-button
                color={this.color}
                onClick={() => {
                  this.gameController.turn(90);
                }}>
                右
              </cy-button>
            </div>
            <div class="direction">
              <cy-button
                color={this.color}
                onClick={() => {
                  this.gameController.turn(180);
                }}>
                下
              </cy-button>
            </div>
          </div>
        </cy-content>
      </div>
    );
  }
}
