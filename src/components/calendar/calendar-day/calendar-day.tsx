import { Component, Prop, State, Element, h, Method, Watch } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderDay, getMouthOffset, TranslateClass } from '../utils';
@Component({
  tag: 'cy-calendar-day',
})
export class CalendarMouth implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() parent: HTMLCyCalendarElement;
  dateNow: Date = new Date();

  @Prop() calendarDate: CalendarDate;
  @Watch('calendarDate')
  handleNav() {
    this.renderDate = getRenderDay(this.calendarDate.year, this.calendarDate.month);
    this.setTransformY(1);
  }

  @State() renderDate: number[][][] = [];
  @State() transformY: number = 0;

  activateEl: HTMLElement;

  componentWillLoad() {
    this.renderDate = getRenderDay(this.calendarDate.year, this.calendarDate.month);
    this.setTransformY(1);
  }

  /**
   * 计算平移的距离
   */
  private setTransformY(offset: number) {
    const transLateYArr = [];
    const oneRowHeight = this.el.closest('.translate-box').clientWidth / 7;
    this.renderDate.map((week, index) => {
      week.map(day => {
        if (day[2] === 1) {
          transLateYArr.push(-1 * index * oneRowHeight);
        }
      });
    });
    this.transformY = transLateYArr[offset];
  }

  @Method()
  async prevPage(animationDuration: number = 800) {
    return new Promise<void>(resolve => {
      const transLateEl = this.el.querySelector<HTMLElement>('.pageNavBox');
      transLateEl.classList.add(TranslateClass);
      this.setTransformY(0);

      setTimeout(() => {
        transLateEl.classList.remove(TranslateClass);
        transLateEl.style.transform = '';
        this.removeClick();

        const [prevMouthYear, prevMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, -1);
        this.parent.change({ year: prevMouthYear, month: prevMouthMouth });
        resolve();
      }, animationDuration);
    });
  }

  @Method()
  async nextPage(animationDuration: number = 800) {
    return new Promise<void>(resolve => {
      const transLateEl = this.el.querySelector<HTMLElement>('.pageNavBox');
      transLateEl.classList.add(TranslateClass);
      this.setTransformY(2);

      setTimeout(() => {
        transLateEl.classList.remove(TranslateClass);
        transLateEl.style.transform = '';
        this.removeClick();

        const [nextMouthYear, nextMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, 1);
        this.parent.change({ year: nextMouthYear, month: nextMouthMouth });
        resolve();
      }, animationDuration);
    });
  }

  private isNow(day: number[]) {
    return day[0] === this.dateNow.getUTCFullYear() && day[1] === this.dateNow.getUTCMonth() + 1 && day[2] === this.dateNow.getUTCDate();
  }

  handleClick(e: any) {
    this.removeClick();
    this.activateEl = e.target.closest('.td');
    this.activateEl.classList.add('choosed');
  }

  removeClick() {
    if (this.activateEl) {
      this.activateEl.classList.remove('choosed');
    }
  }

  render() {
    return (
      <div class="table">
        <div class="tr">
          {['一', '二', '三', '四', '五', '六', '日'].map(tag => (
            <div class="td">{tag}</div>
          ))}
        </div>
        <div class="tbody ">
          <div
            class="pageNavBox"
            style={{
              transform: `translateY(${this.transformY}px)`,
            }}>
            {this.renderDate.map(week => (
              <div class="tr">
                {week.map(day => (
                  <div
                    class="td"
                    onClick={e => {
                      this.handleClick(e);
                    }}>
                    <div
                      class={{
                        item: true,
                        obvious: day[1] === this.calendarDate.month,
                        now: this.isNow(day),
                      }}>
                      {day[2]}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
