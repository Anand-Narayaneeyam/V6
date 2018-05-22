import {Injectable} from '@angular/core';
import {Toast} from './toast';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';




@Injectable()
export class ToasterService {
    addToast: Observable<Toast>;
    private _addToast: Observer<Toast>;


    clearToasts: Observable<IClearWrapper>;
    private _clearToasts: Observer<IClearWrapper>;



    /** 
18      * Creates an instance of ToasterService. 
19      */
    constructor() {
        this.addToast = new Observable<Toast>(observer => this._addToast = observer).share();
        this.clearToasts = new Observable<IClearWrapper>(observer => this._clearToasts = observer).share();

    }



    /** 
27      * Synchronously create and show a new toast instance. 
28      *  
29      * @param {(string | Toast)} type The type of the toast, or a Toast object. 
30      * @param {string=} title The toast title. 
31      * @param {string=} body The toast body. 
32      * @returns {Toast} 
33      *          The newly created Toast instance with a randomly generated GUID Id. 
34      */
    pop(type: string | Toast, title?: string, body?: string): Toast {
        let toast = typeof type === 'string' ? { type: type, title: title, body: body } : type;


        toast.toastId = Guid.newGuid();


        if (!this._addToast) {
            throw new Error("No Toaster Containers have been initialized to receive toasts.");

        }

        this._addToast.next(toast);
        return toast;

    }



    /** 
50      * Asynchronously create and show a new toast instance. 
51      *  
52      * @param {(string | Toast)} type The type of the toast, or a Toast object. 
53      * @param {string=} title The toast title. 
54      * @param {string=} body The toast body. 
55      * @returns {Observable<Toast>} 
56      *          A hot Observable that can be subscribed to in order to receive the Toast instance  
57      *          with a randomly generated GUID Id. 
58      */
    popAsync(type: string | Toast, title?: string, body?: string): Observable<Toast> {
        setTimeout(() => {

            this.pop(type, title, body);


        }, 0);


        return this.addToast;
    }



    /** 
69      * Clears a toast by toastId and/or toastContainerId. 
70      *  
71      * @param {string} toastId The toastId to clear. 
72      * @param {number=} toastContainerId  
73      *        The toastContainerId of the container to remove toasts from. 
74      */
    clear(toastId?: string, toastContainerId?: number) {
        
        let clearWrapper: IClearWrapper = {
            toastId: toastId, toastContainerId: toastContainerId
        };


        this._clearToasts.next(clearWrapper)

    }
}


export interface IClearWrapper {
    toastId?: string;
    toastContainerId?: number;
}


// http://stackoverflow.com/questions/26501688/a-typescript-guid-class 
class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);

        });

    }

} 
