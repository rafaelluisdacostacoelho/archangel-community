import {
    Component,
    ChangeDetectionStrategy,
    Input,
    Output,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    HostBinding
} from '@angular/core';
import { ROUTER_DIRECTIVES, CanActivate, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

class Time {
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
}

@Component({
    moduleId: module.id,
    selector: 'archangel-countdown',
    templateUrl: 'countdown.html',
    styleUrls: ['countdown.css'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    host: { 'class': 'ng-animate archangel-page-transition' }
})
export class ArchangelCountdown implements OnInit, OnDestroy {

    private _deadline: number

    @Input() year: number;
    @Input() month: number;
    @Input() day: number;

    @Output() remaining: Time = new Time;

    @HostBinding('class.archangel-fade-in') fadeIn: boolean;
    @HostBinding('class.archangel-fade-out') fadeOut: boolean;

    ngOnInit() {
        this._deadline = new Date(this.year, this.month, this.day).getTime()

        Observable.interval(1000).subscribe(() => { this.tick(); });
        this.fadeIn = true;
        this.fadeOut = false;

        Observable.of(true).delay(2000).toPromise();
    }

    ngOnDestroy() {
        this.fadeIn = false;
        this.fadeOut = true;

        Observable.of(true).delay(2000).toPromise();
    }

    private tick() {
        let today = new Date().getTime();
        let remaining = this._deadline - today;

        this.remaining.days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        this.remaining.hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        this.remaining.minutes = Math.floor((remaining / (1000 / 60)) % 60);
        this.remaining.seconds = Math.floor((remaining / (1000)) % 60);
    }
}

export const ARCHANGEL_COUNTDOWN_DIRECTIVES = [ArchangelCountdown];