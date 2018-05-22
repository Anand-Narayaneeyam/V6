import { Injectable, Component, Renderer} from '@angular/core';
@Injectable()
export class GetToasterSettings {
    themes = [{
        name: 'Default Theme',
        code: 'default'
    }, {
            name: 'Material Design',
            code: 'material'
        }, {
            name: 'Bootstrap 3',
            code: 'bootstrap'
        }];

    types = [{
        name: 'Default',
        code: 'default',
    }, {
            name: 'Info',
            code: 'info'
        }, {
            name: 'Success',
            code: 'success'
        }, {
            name: 'Wait',
            code: 'wait'
        }, {
            name: 'Error',
            code: 'error'
        }, {
            name: 'Warning',
            code: 'warning'
        }];

    position = [{
        name: 'BR',
        code: 'bottom-right'
    }, {
            name: 'BL',
            code: 'bottom-left'
        }, {
            name: 'TR',
            code: 'top-right'
        }, {
            name: 'TL',
            code: 'top-left'
        }, {
            name: 'TC',
            code: 'top-center'
        },
        {
            name: 'BC',
            code: 'bottom-center'
        }];
    title = { name: 'iDrawings V6' };

}