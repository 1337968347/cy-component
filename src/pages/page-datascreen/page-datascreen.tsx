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
  @State() speed: number = 300;

  componentDidLoad() {
    const canvasEl = this.el.querySelector<HTMLCanvasElement>('#canvas');
    const canvasBgEl = this.el.querySelector<HTMLCanvasElement>('#canvasbg');
    canvasEl.width = Math.min(this.el.querySelector('cy-content').clientWidth, this.el.querySelector('cy-content').clientHeight) * 0.8;
    canvasEl.height = canvasEl.width;
    this.gameController = createRetroSnaker(canvasEl, canvasBgEl, canvasEl.width / 20);
  }

  playGames() {
    this.gameController.start(this.speed);
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">canvas</h3>
        </cy-header>
        <cy-content>
          <div class="canvas-box">
            <canvas id="canvas"></canvas>
            <canvas id="canvasbg"></canvas>
          </div>
          <div class="contral">
            <cy-segment
              color={this.color}
              value={this.speed}
              onCyChange={e => {
                this.speed = e.detail;
                this.playGames();
              }}>
              <cy-segment-button value={400}>慢</cy-segment-button>
              <cy-segment-button value={300}>中</cy-segment-button>
              <cy-segment-button value={180}>快</cy-segment-button>
            </cy-segment>

            <div class="game-contral">
              <cy-button onClick={this.playGames.bind(this)}>开始</cy-button>
              <cy-button
                onClick={() => {
                  this.gameController.pause();
                }}>
                暂停
              </cy-button>

              <cy-button
                onClick={() => {
                  this.gameController.destory();
                }}>
                结束
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
