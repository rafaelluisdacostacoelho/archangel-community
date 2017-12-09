import { BodyOutputType } from '../body-output-type';
import { ToasterConfig } from '../toaster-config';

export type IClickHandler = (toast: Toast, isCloseButton?: boolean) => boolean;

export type IOnActionCallback = (toast: Toast) => void;

export interface Toast {
    type: string;
    title?: string;
    body?: any;
    toastId?: string;
    toastContainerId?: number;
    onShowCallback?: IOnActionCallback;
    onHideCallback?: IOnActionCallback;
    timeout?: number;
    timeoutId?: number;
    bodyOutputType?: BodyOutputType;
    clickHandler?: IClickHandler;
    showCloseButton?: boolean;
    closeHtml?: string;
    toasterConfig?: ToasterConfig;
}
