export const createAnimation = (ele: HTMLElement, keyframes,) => {
    let _keyframes = []
    

}

export const supportWebAnimation = () => {
    return typeof Element === 'function' && typeof Element.prototype.animate === 'function'
}
