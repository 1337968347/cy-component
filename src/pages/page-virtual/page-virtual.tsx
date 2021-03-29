import { Component, h } from '@stencil/core';


@Component({
    tag: 'page-virtual',
    styleUrl: 'page-virtual.scss'
})
export class PageVirtual {
    
    render() {
        return (
            <p>My name is Stencil</p>
        );
    }
}