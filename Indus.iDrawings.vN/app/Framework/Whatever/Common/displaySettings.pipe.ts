import { Pipe, PipeTransform } from '@angular/core';
import {IField} from '../../Models//Interface/IField';

@Pipe({ name: 'displayPipe', pure: false })
export class DisplaySettingsPipe implements PipeTransform {
    transform(allFields, dataKey): any {
        if ((allFields == null) || (allFields == undefined)) {
            return null;
        }
        if (dataKey != undefined) {
            // return allFields.filter(field => field.FieldName != dataKey);
            for (var i = 0; i < dataKey.length; i++) {
                allFields = allFields.filter(field => field.FieldName != dataKey[i])
            }
        }
        return allFields
    }
}