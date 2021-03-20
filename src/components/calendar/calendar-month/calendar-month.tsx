import { Component, Element, Prop, Method, h } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderMouth } from '../utils';

@Component({
  tag: 'cy-calendar-month',
})
export class CalendarMonth implements calendarComponentInterface {
  @Element() el: HTMLElement;
  @Prop() parent: HTMLCyCalendarElement;
  dateNow: Date = new Date();

  @Prop() calendarDate: CalendarDate;

  @Method()
  async prevPage() {
    this.parent.change({ year: this.calendarDate.year - 1 });
  }

  @Method()
  async nextPage() {
    this.parent.change({ year: this.calendarDate.year + 1 });
  }

  handleClick(chooseMouth: number[]) {
    this.parent.change({ year: chooseMouth[0], month: chooseMouth[1] }, 'month');
  }

  private isNow(month: number[]) {
    return month[0] === this.dateNow.getUTCFullYear() && month[1] === this.dateNow.getUTCMonth() + 1;
  }
  render() {
    const getRenderDayTable = (renderMouths: number[][][], tableName: string) => {
      return (
        <div class={tableName}>
          {renderMouths.map(mouths => (
            <div class="tr">
              {mouths.map(month => (
                <div class="td">
                  <div
                    onClick={() => {
                      this.handleClick(month);
                    }}
                    class={{
                      item: true,
                      now: this.isNow(month),
                      obvious: month[0] === this.calendarDate.year && tableName === 'current',
                    }}>
                    {month[1]}月
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    };

    const currentRenderDate = getRenderMouth(this.calendarDate.year);
    const prevRenderDate = getRenderMouth(this.calendarDate.year - 1);
    const nextRenderDate = getRenderMouth(this.calendarDate.year + 1);
    return (
      <div class="table">
        <div class="tbody ">
          <div class="pageNavBox">
            {getRenderDayTable(prevRenderDate, 'prev')}
            {getRenderDayTable(currentRenderDate, 'current')}
            {getRenderDayTable(nextRenderDate, 'next')}
          </div>
        </div>
      </div>
    );
  }
}
