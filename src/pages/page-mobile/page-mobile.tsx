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
            <h3>不可滚动的（可拖动）</h3>
            <cy-segment color={this.color} value="大狗子">
              <cy-segment-button value="大狗子">大狗子</cy-segment-button>
              <cy-segment-button value="二狗子">二狗子</cy-segment-button>
              <cy-segment-button value="三狗子">三狗子</cy-segment-button>
            </cy-segment>
            <h3>可以滚动的</h3>
            <cy-segment color={this.color} value="大狗子" scrollable>
              <cy-segment-button value="大狗子">大狗子</cy-segment-button>
              <cy-segment-button value="二狗子">二狗子</cy-segment-button>
              <cy-segment-button value="三狗子">三狗子</cy-segment-button>
              <cy-segment-button value="四狗子">四狗子</cy-segment-button>
              <cy-segment-button value="五狗子">五狗子</cy-segment-button>
              <cy-segment-button value="六狗子">六狗子</cy-segment-button>
              <cy-segment-button value="七狗子">七狗子</cy-segment-button>
            </cy-segment>
          </div>
        </div>
      </cy-content>
    );
  }
}
