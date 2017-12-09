import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/core';

import {
    ROUTER_DIRECTIVES,
    Router,
    RouterLink,
    RouterOutlet
} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'archangel-toolbar',
    directives: [ROUTER_DIRECTIVES, RouterOutlet, RouterLink],
    inputs: ['collapsed'],
    templateUrl: 'toolbar.html',
    styleUrls: ['toolbar.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    // TODO: Change to native in the future
    encapsulation: ViewEncapsulation.None
})
export class ArchangelToolbar {

    // TODO: Implement the HostListeners when they are fixed
    collapsed: boolean = true;

    private _scrolled: boolean = false;

    constructor(private _router: Router) { }

    // Transition Start
    private _switchStart() {
        this._scrolled = false;

        this.collapsed = true;
    }

    // Transition Into
    private _switchInto() {
        this._scrolled = true;

        this.collapsed = false;
    };

    // TODO: This is not a good way, need a better solution
    onScroll(event) {
        // Check scroll position
        if (window.pageYOffset > 100) {
            // User has scrolled > 100px from top since last check
            if (!this._scrolled) {
                this._switchInto();
            }
        } else {
            // User has scrolled back <= 100px from top since last check
            if (this._scrolled) {
                this._switchStart();
            }
        }
    }
}

export const ARCHANGEL_TOOLBAR_DIRECTIVES = [ArchangelToolbar];