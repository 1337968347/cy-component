import { Component, Prop, State, Element, Event, EventEmitter, h, Method, Watch } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderDay, getMouthOffset, TranslateClass } from '../utils';

@Component({
  tag: 'cy-calendar-day',
})
export class CalendarMouth implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() calendarDate: CalendarDate;
  @Prop() parent: HTMLCyCalendarElement;
  dateNow: Date = new Date();

  @Watch('calendarDate')
  handleNav() {
    this.calcTransformY();
    this.initTransformY();
  }

  @State() renderDate: number[][][] = [];
  @State() transLateYArr = [];

  @Event() choose: EventEmitter;
  activateEl: HTMLElement;

  componentWillLoad() {
    this.calcTransformY();
  }

  componentDidLoad() {
    this.initTransformY();
  }

  /**
   * 计算平移的距离
   */
  private calcTransformY() {
    this.transLateYArr = [];
    this.renderDate = getRenderDay(this.calendarDate.year, this.calendarDate.month);
    const oneRowHeight = this.el.closest('.translate-box').clientWidth / 7;
    this.renderDate.map((week, index) => {
      week.map(day => {
        if (day[2] === 1) {
          this.transLateYArr.push(-1 * index * oneRowHeight);
        }
      });
    });
  }

  private initTransformY() {
    const transLateEl = this.el.querySelector<HTMLElement>('.translateBox');
    transLateEl && (transLateEl.style.transform = `translateY(${this.transLateYArr[1]}px)`);
  }

  @Method()
  async prevPage() {
    return new Promise<void>(resolve => {
      const transLateEl = this.el.querySelector<HTMLElement>('.translateBox');
      transLateEl.classList.add(TranslateClass);
      transLateEl.style.transform = `translateY(${this.transLateYArr[0]}px)`;

      setTimeout(() => {
        transLateEl.classList.remove(TranslateClass);
        transLateEl.style.transform = '';

        const [prevMouthYear, prevMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, -1);
        this.parent.change({ year: prevMouthYear, month: prevMouthMouth });
        resolve();
      }, 800);
    });
  }

  @Method()
  async nextPage() {
    return new Promise<void>(resolve => {
      const transLateEl = this.el.querySelector<HTMLElement>('.translateBox');
      transLateEl.classList.add(TranslateClass);
      transLateEl.style.transform = `translateY(${this.transLateYArr[2]}px)`;
      setTimeout(() => {
        transLateEl.classList.remove(TranslateClass);
        transLateEl.style.transform = '';

        const [nextMouthYear, nextMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, 1);
        this.parent.change({ year: nextMouthYear, month: nextMouthMouth });
        resolve();
      }, 800);
    });
  }

  private isNow(day: number[]) {
    return day[0] === this.dateNow.getUTCFullYear() && day[1] === this.dateNow.getUTCMonth() + 1 && day[2] === this.dateNow.getUTCDate();
  }

  handleClick(e: any, day: number[]) {
    if (this.activateEl) {
      this.activateEl.classList.remove('choosed');
    }
    this.activateEl = e.target;
    this.activateEl.classList.add('choosed');
    this.choose.emit([...day]);
  }

  render() {
    return (
      <div class="table">
        <div class="tr">
          {['一', '二', '三', '四', '五', '六', '日'].map(tag => (
            <div class="td">{tag}</div>
          ))}
        </div>
        <div class="tbody">
          <div class="translateBox">
            {this.renderDate.map(week => (
              <div class="tr">
                {week.map(day => (
                  <div class="td">
                    <div
                      onClick={e => {
                        this.handleClick(e, day);
                      }}
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
