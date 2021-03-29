import { Component, State, Element, h } from '@stencil/core';
import { showToast } from '../../utils/toast';
import { configManager } from '../../utils/config';
import { Color, ViewMode } from '../../interface';

@Component({
  tag: 'page-setting',
  styleUrl: 'page-setting.scss',
})
export class PageSetting {
  @Element() el: HTMLElement;
  @State() color: Color = configManager.getPreferColor();
  @State() viewMode: ViewMode = configManager.getViewMode();

  selectColor() {
    const actionSheet = document.createElement('cy-action-sheet');
    actionSheet.header = '选择主题颜色';
    actionSheet.color = this.color;
    const buttons = [];

    ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'].map((color: Color) => {
      const title = `${color}`;
      buttons.push({
        text: title,
        handler: () => {
          showToast({ title: color });
          this.emitEvent('color', color);
          this.color = color;
          configManager.setPreferColor(color);
        },
      });
    });

    buttons.push({
      text: '取消',
      role: 'cancel',
    });

    actionSheet.buttons = buttons;
    document.body.appendChild(actionSheet);
    actionSheet.present();
  }

  emitEvent(name: string, data: any) {
    const event = new CustomEvent('settingChange', {
      detail: { type: name, data },
    });
    this.el.dispatchEvent(event);
  }

  themeChange(e: CustomEvent) {
    if (e.detail) {
      this.viewMode = 'dark';
    } else {
      this.viewMode = 'light';
    }
    configManager.setViewMode(this.viewMode);
  }

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <cy-menu-button class="btn-box" slot="start" />
          <h3 class="cy-title">设置</h3>
        </cy-header>
        <cy-content>
          <cy-item button line onClick={this.selectColor.bind(this)}>
            <h4>主题色</h4>
            <cy-icon
              slot="end"
              name="color"
              class={{
                [`cy-color-${this.color}`]: !!this.color,
              }}
            />
          </cy-item>

          <cy-item line>
            <h4>深色模式</h4>
            <cy-toggle slot="end" onCyChange={this.themeChange.bind(this)} checked={this.viewMode === 'dark'} color={this.color} />
          </cy-item>
        </cy-content>
      </div>
    );
  }
}
