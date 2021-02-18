import { Component, Prop, Event, EventEmitter, Method, h } from '@stencil/core';
import { calendarComponentInterface, CalendarDate } from '../../../interface';
import { getRenderMouth } from '../utils';

@Component({
  tag: 'cy-calendar-month',
})
export class CalendarMonth implements calendarComponentInterface {
  @Prop() calendarDate: CalendarDate;
  @Event() choose: EventEmitter;
  dateNow: Date = new Date();

  @Method()
  async prevPage() {}

  @Method()
  async nextPage() {}

  handleClick(chooseMouth: number[]) {
    this.choose.emit([...chooseMouth]);
  }

  private isNow(month: number[]) {
    return month[0] === this.dateNow.getUTCFullYear() && month[1] === this.dateNow.getUTCMonth() + 1;
  }

  render() {
    const renderMouths = getRenderMouth(this.calendarDate.year);
    return (
      <div class="table">
        <div class="tbody">
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
                      obvious: month[0] === this.calendarDate.year,
                    }}>
                    {month[1]}月
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
