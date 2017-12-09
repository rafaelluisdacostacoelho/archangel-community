import { trigger, state, animate, style, transition } from '@angular/core';

export function routerTransition() {
    return slideToLeft();
}

const stateVoid = state('void', style({
    position: 'fixed',
    left: 0,
    right: 0
}));

const stateAll = state('*', style({
    position: 'fixed',
    left: 0,
    right: 0
}));

function slideToLeft() {
    return trigger('routerTransition', [
        stateVoid,
        stateAll,
        transition(':enter', [
            style({
                transform: 'translateX(100%)'
            }),
            animate('0.5s ease-in-out', style({
                transform: 'translateX(0%)'
            }))
        ]),
        transition(':leave', [
            style({
                transform: 'translateX(0%)'
            }),
            animate('0.5s ease-in-out', style({
                transform: 'translateX(-100%)'
            }))
        ])
    ]);
}

function slideToRight() {
    return trigger('routerTransition', [
        stateVoid,
        stateAll,
        transition(':enter', [
            style({
                transform: 'translateX(-100%)'
            }),
            animate('0.5s ease-in-out', style({
                transform: 'translateX(0%)'
            }))
        ]),
        transition(':leave', [
            style({
                transform: 'translateX(0%)'
            }),
            animate('0.5s ease-in-out', style({
                transform: 'translateX(100%)'
            }))
        ])
    ]);
}

function slideToBottom() {
    return trigger('routerTransition', [
        stateVoid,
        stateAll,
        transition(':enter', [
            style({
                transform: 'translateY(-100%)'
            }),
            animate('0.5s ease-in-out', style({
                transform: 'translateY(0%)'
            }))
        ]),
        transition(':leave', [
            style({
                transform: 'translateY(0%)'
            }),
            animate('0.5s ease-in-out', style({
                transform: 'translateY(100%)'
            }))
        ])
    ]);
}

function slideToTop() {
    return trigger('routerTransition', [
        stateVoid,
        stateAll,
        transition(':enter', [
            style({ transform: 'translateY(100%)' }),
            animate('0.5s ease-in-out', style({
                transform: 'translateY(0%)'
            }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0%)' }),
            animate('0.5s ease-in-out', style({
                transform: 'translateY(-100%)'
            }))
        ])
    ]);
}
