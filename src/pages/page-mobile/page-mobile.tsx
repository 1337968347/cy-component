import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'page-mobile',
  styleUrl: 'page-mobile.scss',
})
export class PageMobile {
  @Prop() color: string = '';

  render() {
    return (
      <cy-content>
        <div class="mobile-container">
          <div>
            <h3>按钮</h3>
            <cy-button color={this.color}>{this.color}</cy-button>
          </div>
          <div>
            <h3>单选框</h3>
            <cy-checkbox color={this.color}>{this.color}</cy-checkbox>
          </div>
          <div>
            <h3>加载</h3>
            <cy-spinner color={this.color}>{this.color}</cy-spinner>
          </div>

          <div>
            <h3>开关</h3>
            <cy-toggle color={this.color}></cy-toggle>
          </div>

          <div>
            <h3>滑块</h3>
            <div>
              <cy-segment color={this.color} value="大狗子">
                <cy-segment-button value="大狗子">大狗子</cy-segment-button>
                <cy-segment-button value="二狗子">二狗子</cy-segment-button>
                <cy-segment-button value="三狗子">三狗子</cy-segment-button>
              </cy-segment>
            </div>
          </div>
        </div>
      </cy-content>
    );
  }
}
