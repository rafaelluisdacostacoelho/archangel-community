import { Headers, RequestOptions } from '@angular/http';

export class ApplicationSettings {

    static instance: ApplicationSettings;
    static isCreating: boolean = false;
    static headers: Headers;

    constructor() {
        if (!ApplicationSettings.isCreating) {
            throw Error('You can\'t call new in Singleton instances! Call AppSettings.getInstance() instead.');
        }
    }

    public static get API_URI(): string { return 'http://localhost:5000'; };

    public static get HEADERS(): Headers {

        this.headers = new Headers();

        this.headers.append('Accept', 'application/json');
        this.headers.append('Content-Type', 'application/json');

        return this.headers;
    };

    public static get OPTIONS(): RequestOptions {
        return new RequestOptions({
            headers: this.HEADERS
        });
    }

    static getInstance() {
        if (ApplicationSettings.instance == null) {
            ApplicationSettings.isCreating = true;
            ApplicationSettings.instance = new ApplicationSettings();
            ApplicationSettings.isCreating = false;
        }

        return ApplicationSettings.instance;
    }
}
