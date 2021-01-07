import { Component, Element, Prop, Host, h, Listen, writeTask } from '@stencil/core';

@Component({
  tag: 'cy-segment',
  styleUrl: 'segment.scss',
  shadow: true,
})
export class segment {
  @Element() el: HTMLElement;
  private currentEl: HTMLCySegmentButtonElement;
  @Prop() color: string = 'primary';
  @Prop() value: string = '';

  componentDidLoad() {
    this.updateCurrent();
  }
  @Listen('choose')
  handleSegChoose(e) {
    this.value = e.detail.value;
  }

  clickSeg(e) {
    const segBtn = this.getSegmentButtonEL(e);
    if (!segBtn || segBtn == this.currentEl) {
      return;
    }
    this.value = segBtn.value;
    if (this.currentEl) {
      this.checkButton(this.currentEl, segBtn);
    } else {
      this.updateCurrent();
    }
  }

  private getIndicator(button: HTMLCySegmentButtonElement): HTMLDivElement | null {
    const root = button.shadowRoot || button;
    return root.querySelector('.segment-button-indicator');
  }

  checkButton(prev: HTMLCySegmentButtonElement, current: HTMLCySegmentButtonElement) {
    const previousIndicator = this.getIndicator(prev);
    const currentIndicator = this.getIndicator(current);
    if (previousIndicator === null || currentIndicator === null) {
      return;
    }

    const previousClientRect = previousIndicator.getBoundingClientRect();
    const currentClientRect = currentIndicator.getBoundingClientRect();

    const widthDelta = previousClientRect.width / currentClientRect.width;
    const xPosition = previousClientRect.left - currentClientRect.left;

    // Scale the indicator width to match the previous indicator width
    // and translate it on top of the previous indicator
    const transform = `translate3d(${xPosition}px, 0, 0) scaleX(${widthDelta})`;

    writeTask(() => {
      // Remove the transition before positioning on top of the previous indicator
      currentIndicator.classList.remove('segment-change-animation');
      currentIndicator.style.setProperty('transform', transform);

      // Force a repaint to ensure the transform happens
      currentIndicator.getBoundingClientRect();

      // Add the transition to move the indicator into place
      currentIndicator.classList.add('segment-change-animation');

      // Remove the transform to slide the indicator back to the button clicked
      currentIndicator.style.setProperty('transform', '');
    });

    this.value = current.value;
    this.updateCurrent();
  }

  updateCurrent() {
    const buttons = Array.from(this.el.querySelectorAll('cy-segment-button'));
    this.currentEl = buttons.find(btn => btn.value === this.value);
    buttons.forEach(btn => btn.update());
  }

  getSegmentButtonEL(e): HTMLCySegmentButtonElement {
    const targetEl = e.target;
    if (targetEl.tagName === 'CY-SEGMENT-BUTTON') {
      return targetEl;
    } else {
      return targetEl.closest('cy-segment-button');
    }
  }

  render() {
    return (
      <Host
        onClick={e => {
          this.clickSeg(e);
        }}
        class={{
          [`cy-color-${this.color}`]: true,
        }}
      >
        <slot />
      </Host>
    );
  }
}
