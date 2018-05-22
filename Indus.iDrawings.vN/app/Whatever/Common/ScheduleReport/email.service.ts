import { Injectable } from '@angular/core';

@Injectable()

export class EmailRecipientService {

    clearEmailRec: boolean = false;

    getStatus() {
        
        return this.clearEmailRec;

    }

    setStatus(_status: boolean) {
        debugger

        this.clearEmailRec = _status;
    }


}