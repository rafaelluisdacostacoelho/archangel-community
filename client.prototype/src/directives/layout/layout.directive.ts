import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
    selector: '[layout]'
})
export class LayoutDirective {
    @Input() layout: string;
    @HostBinding('style.display') display = 'flex';

    @HostBinding('style.flex-direction')
    getDirection() {
        return `${this.layout === 'column' ? 'column' : 'row'}`;
    }
}