import { EventEmitter, ComponentInterface } from "@stencil/core"

export interface calendarComponentInterface extends ComponentInterface {
    nextPage(): Promise<void>
    prevPage(): Promise<void>
    choose: EventEmitter<any>
}