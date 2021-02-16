import { Component, Element, State, Method, Host, h } from '@stencil/core';
import { ViewMode, CalendarDate } from "../../interface"
import { getDecadeRange, getMouthOffset } from "./utils"

const ViewModeEnum: ViewMode[] = ['decade', 'year', 'month']

@Component({
    tag: 'cy-calendar',
    styleUrl: 'calendar.scss',
    shadow: true
})
export class CyCalendar {
    @Element() el: HTMLElement;
    // 下标 0： 十年  1： 年  2：月份
    @State() calendarDate: CalendarDate
    @State() viewMode: ViewMode = 'month'

    componentWillLoad() {
        const nowDate = new Date()
        const decadeRange = getDecadeRange(nowDate.getUTCFullYear())
        this.calendarDate = {
            decade: [decadeRange[0], decadeRange[1]],
            year: nowDate.getUTCFullYear(),
            month: nowDate.getUTCMonth() + 1
        }
    }

    /**
     * 点击日历左上角
     */
    switchViewMode() {
        if (this.viewMode !== "decade") {
            delete this.calendarDate[this.viewMode]
            this.calendarDate = { ...this.calendarDate }
        }
        const nextIndex = Math.max(ViewModeEnum.indexOf(this.viewMode) - 1, 0)
        this.viewMode = ViewModeEnum[nextIndex]
    }

    handleChooseDay() { }

    handleChooseMouth(chooseMouth: number[]) {
        this.calendarDate.year = chooseMouth[0]
        this.calendarDate.month = chooseMouth[1]
        this.viewMode = 'month'
    }

    handleChooseYear(chooseYear: number) {
        const decadeRange = getDecadeRange(chooseYear)
        this.calendarDate.decade = [decadeRange[0], decadeRange[1]]
        this.calendarDate.year = chooseYear
        this.viewMode = 'year'
    }

    @Method()
    async prevPage() {
        const el = this.el.shadowRoot.querySelector('.translate-box').firstChild as any
        await el.prevPage()
        if (this.viewMode === "month") {
            const [prevMouthYear, prevMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, -1)
            this.calendarDate.year = prevMouthYear
            this.calendarDate.month = prevMouthMouth
            this.calendarDate = { ...this.calendarDate }
        }
    }

    @Method()
    async nextPage() {
        const el = this.el.shadowRoot.querySelector('.translate-box').firstChild as any
        await el.nextPage()
        if (this.viewMode === "month") {
            const [nextMouthYear, nextMouthMouth] = getMouthOffset(this.calendarDate.year, this.calendarDate.month, 1)
            this.calendarDate.year = nextMouthYear
            this.calendarDate.month = nextMouthMouth
            this.calendarDate = { ...this.calendarDate }
        }
    }

    render() {
        return (
            <Host>
                <div class="calendar-header">
                    <div class="calendar-switch activatable" onClick={this.switchViewMode.bind(this)}>
                        {this.viewMode === "decade" ? (<span>{`${this.calendarDate.decade[0]}-${this.calendarDate.decade[1]}`}</span>) : null}
                        {this.viewMode === "year" ? (<span>{this.calendarDate.year}年</span>) : null}
                        {this.viewMode === "month" ? (<span>{this.calendarDate.year}年{this.calendarDate.month}月</span>) : null}
                    </div>

                    <div class="calendar-page-nav">
                        <div class="nav-box">
                            <cy-icon onClick={this.prevPage.bind(this)} class="activatable" name="up" />
                        </div>
                        <div class="nav-box">
                            <cy-icon onClick={this.nextPage.bind(this)} class="activatable" name="down" />
                        </div>
                    </div>
                </div>
                <div class="calendar-content">
                    <div class="translate-box">
                        {this.viewMode === "month" ? <cy-calendar-day chooseYear={this.calendarDate.year} chooseMonth={this.calendarDate.month} /> : null}
                        {this.viewMode === "year" ? <cy-calendar-month chooseYear={this.calendarDate.year} onChoose={(e) => { this.handleChooseMouth(e.detail) }} /> : null}
                        {this.viewMode === "decade" ? <cy-calendar-year chooseYear={this.calendarDate.decade[0]} onChoose={(e) => { this.handleChooseYear(e.detail) }} /> : null}
                    </div>
                </div>
            </Host >
        );
    }
}