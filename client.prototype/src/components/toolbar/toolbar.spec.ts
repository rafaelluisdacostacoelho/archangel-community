describe('ArchangelToolbar', () => { 
    it('true to true', () => {
        expect(true).toEqual(true);
    });
});
/*
import {Component} from '@angular/core';
import {inject} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {By} from '@angular/platform-browser';
import {ArchangelToolbar} from './toolbar';

describe('ArchangelToolbar', () => {
    let builder: TestComponentBuilder;
    beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        builder = tcb;
    }));

    it('should apply class based on color attribute', (done: () => void) => {
        return builder.createAsync(TestApp).then((fixture) => {
            // let testComponent = fixture.debugElement.componentInstance;
            // let toolbarDebugElement = fixture.debugElement.query(By.css('md-toolbar'));

            // testComponent.toolbarColor = 'primary';
            // fixture.detectChanges();

            // expect(toolbarDebugElement.nativeElement.classList.contains('md-primary')).toBe(true);

            // testComponent.toolbarColor = 'accent';
            // fixture.detectChanges();

            // expect(toolbarDebugElement.nativeElement.classList.contains('md-primary')).toBe(false);
            // expect(toolbarDebugElement.nativeElement.classList.contains('md-accent')).toBe(true);

            // testComponent.toolbarColor = 'warn';
            // fixture.detectChanges();

            // expect(toolbarDebugElement.nativeElement.classList.contains('md-accent')).toBe(false);
            // expect(toolbarDebugElement.nativeElement.classList.contains('md-warn')).toBe(true);

            done();
        });
    });
});

@Component({
    selector: 'test-app',
    template: `
        <archangel-toolbar>
            <div>title</div>
        </archangel-toolbar>
    `,
    directives: [ArchangelToolbar]
})
class TestApp {

}
*/