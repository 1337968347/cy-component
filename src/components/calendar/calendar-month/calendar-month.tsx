import { Component, Prop, Event, EventEmitter, Method, h } from '@stencil/core';
import { calendarComponentInterface } from "../../../interface"
import { getRenderMouth } from "../utils"

@Component({
    tag: 'cy-calendar-month'
})
export class CalendarMonth implements calendarComponentInterface {
    @Prop() chooseYear: number
    @Event() choose: EventEmitter

    @Method()
    async prevPage() {

    }

    @Method()
    async nextPage() {

    }

    handleClick(chooseMouth: number[]) {
        this.choose.emit([...chooseMouth])
    }

    private isNow(month: number[]) {
        const dateNow = new Date()
        return month[0] === dateNow.getUTCFullYear() &&
            month[1] === dateNow.getUTCMonth() + 1
    }

    render() {
        const renderMouths = getRenderMouth(this.chooseYear)
        return (
            <div class="table">
                <div class="tbody">
                    {renderMouths.map((mouths) =>
                        <div class="tr">
                            {mouths.map((month) =>
                                <div class="td">
                                    <div onClick={() => { this.handleClick(month) }}
                                        class={{
                                            'item': true,
                                            'now': this.isNow(month),
                                            'obvious': month[0] === this.chooseYear,
                                        }}>
                                        {month[1]}
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