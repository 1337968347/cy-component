import { Component, Prop, Event, EventEmitter, Method, h } from '@stencil/core';
import { calendarComponentInterface } from "../../../interface"
import { getRenderMouth } from "../utils"

@Component({
    tag: 'cy-calendar-mouth',
    styleUrl: 'calendar-mouth.scss'
})
export class CalendarMouth implements calendarComponentInterface {
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

    private isNow(mouth: number[]) {
        const dateNow = new Date()
        return mouth[0] === dateNow.getUTCFullYear() &&
            mouth[1] === dateNow.getUTCMonth() + 1
    }

    render() {
        const renderMouths = getRenderMouth(this.chooseYear)
        return (
            <table>
                <tbody>
                    {renderMouths.map((mouths) =>
                        <tr>
                            {mouths.map((mouth) =>
                                <td onClick={() => { this.handleClick(mouth) }}
                                    class={{
                                        'item': true,
                                        'now': this.isNow(mouth),
                                        'obvious': mouth[0] === this.chooseYear,
                                    }}>

                                    {mouth[1]}
                                </td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}