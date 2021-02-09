import { Component, State, Host, h } from '@stencil/core';
import { getRenderDate } from "./utils"

@Component({
    tag: 'cy-calendar',
    styleUrl: 'calendar.scss',
    shadow: true
})
export class CyCalendar {
    @State() currentDay = ''
    @State() currentYear
    @State() currentMonth

    componentWillLoad() {
        const date = new Date()
        this.currentDay = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        this.currentYear = this.getYear()
        this.currentMonth = this.getMonth()

    }

    private getYear() {
        return parseInt(this.currentDay.split('-')[0])
    }

    private getMonth() {
        return parseInt(this.currentDay.split('-')[1])
    }


    render() {
        const renderYears = () => {
            const years = []
            for (let i = 2010; i < 2030; i++) { years.push(i) }
            return years
        }
        const renderDate = getRenderDate(this.currentYear, this.currentMonth)
        return (
            <Host>
                <div class="calendar-header">
                    <select onChange={(e) => {
                        this.currentYear = parseInt((e.target as any).value)
                    }}>
                        {renderYears().map((year) =>
                            <option selected={this.currentYear == year} value={year}>{year}</option>)}
                    </select>
                    <select onChange={(e) => {
                        this.currentMonth = parseInt((e.target as any).value)
                    }}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((mouth) =>
                            <option selected={this.currentMonth == mouth} value={mouth}>{mouth}</option>)}
                    </select>
                </div>
                <div class="calendar-content">
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
                                                notCurrentMouth: parseInt(day.split('-')[1]) !== this.currentMonth,
                                                nowDay: day === this.currentDay
                                            }}>
                                                {day.split('-')[2]}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Host>
        );
    }
}