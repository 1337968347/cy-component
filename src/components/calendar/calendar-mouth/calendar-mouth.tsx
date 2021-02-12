import { Component, Prop, Event, EventEmitter, h, Method } from '@stencil/core';
import { calendarComponentInterface } from "../calendar-interface"
import { getRenderDate } from "../utils"

@Component({
    tag: 'cy-calendar-mouth',
    styleUrl: 'calendar-mouth.scss'
})
export class CalendarMouth implements calendarComponentInterface {
    @Prop() currentYear: number
    @Prop() currentMonth: number
    @Event() choose: EventEmitter

    @Method()
    async prevPage() {

    }

    @Method()
    async nextPage() {

    }

    render() {
        const renderDate = getRenderDate(this.currentYear, this.currentMonth)
        return (
            <table>
                <thead>
                    <tr>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                        <th>日</th>
                    </tr>
                </thead>
                <tbody>
                    {renderDate.map((week) =>
                        <tr>
                            {week.map((day) =>
                                <td>
                                    <div class={{
                                        day: true,
                                        currentMouth: day[1] === this.currentMonth,
                                        nowDay: day[0] === this.currentYear &&
                                            day[1] === this.currentMonth &&
                                            day[2] === new Date().getDate()
                                    }}>
                                        {day[2]}
                                    </div>
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>

        );
    }
}