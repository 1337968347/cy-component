import { Component, h, State } from '@stencil/core';
import { configManager } from '../../utils/config';
import { Color } from '../../interface';

@Component({
  tag: 'page-android',
  styleUrl: 'page-android.scss',
})
export class PageAndroid {
  @State() color: Color = configManager.getPreferColor();

  render() {
    return (
      <div class="cy-page">
        <cy-header>
          <h3 class="cy-title">我的react native app</h3>
        </cy-header>
        <cy-content>
          <div class="android-page">
            <h2>已经签名的android app</h2>
             <p style={{ marginBottom: '20px', color: 'var(--cy-text-color-step-150)' }}>
              使用 react native ，并使用mobx 管理状态数据
            </p>
            <p style={{ marginBottom: '20px', color: 'var(--cy-text-color-step-150)' }}>
              点击下方按钮下载最新版 Android 应用
            </p>
            <a href="./projects/android/app-release.apk" class="download-btn" download="app-release.apk">
              下载 Android APK
            </a>
          </div>
        </cy-content>
      </div>
    );
  }
}
