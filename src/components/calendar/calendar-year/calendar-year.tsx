import { Component, Prop, Event, EventEmitter, Method, h } from '@stencil/core';
import { calendarComponentInterface } from "../../../interface"
import { getRenderYear } from "../utils"

@Component({
    tag: 'cy-calendar-year'
})
export class CalendarYear implements calendarComponentInterface {
    @Prop() chooseYear: number
    @Event() choose: EventEmitter

    componentDidLoad() {
    }

    @Method()
    async prevPage() {

    }

    @Method()
    async nextPage() {

    }

    handleClick(year: number) {
        this.choose.emit(year)
    }

    private isNow(day: number) {
        const dateNow = new Date()
        return day === dateNow.getUTCFullYear()
    }

    render() {
        const renderYears = getRenderYear(this.chooseYear)
        return (
            <div class="table">
                <div class="tbody">
                    {renderYears.map((decade) =>
                        <div class="tr">
                            {decade.map((year) =>
                                <div class="td">
                                    <div onClick={() => { this.handleClick(year) }}
                                        class={{
                                            'item': true,
                                            'now': this.isNow(year),
                                            'obvious': Math.floor(year / 10) === Math.floor(this.chooseYear / 10)
                                        }}>
                                        {year}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}