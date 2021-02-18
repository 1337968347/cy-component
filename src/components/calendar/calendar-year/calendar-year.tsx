import {Component, Prop, Event, EventEmitter, Method, h} from '@stencil/core';
import {calendarComponentInterface, CalendarDate} from '../../../interface';
import {getRenderYear} from '../utils';

@Component({
  tag: 'cy-calendar-year',
})
export class CalendarYear implements calendarComponentInterface {
  @Prop() calendarDate: CalendarDate;
  @Event() choose: EventEmitter;

  dateNow: Date = new Date();

  componentDidLoad() {}

  @Method()
  async prevPage() {}

  @Method()
  async nextPage() {}

  handleClick(year: number) {
    this.choose.emit(year);
  }

  render() {
    const renderYears = getRenderYear(this.calendarDate.decade);
    return (
      <div class="table">
        <div class="tbody">
          {renderYears.map(decade => (
            <div class="tr">
              {decade.map(year => (
                <div class="td">
                  <div
                    onClick={() => {
                      this.handleClick(year);
                    }}
                    class={{
                      item: true,
                      now: this.dateNow.getUTCFullYear() === year,
                      obvious: year >= this.calendarDate.decade[0] && year <= this.calendarDate.decade[1],
                    }}>
                    {year}
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
