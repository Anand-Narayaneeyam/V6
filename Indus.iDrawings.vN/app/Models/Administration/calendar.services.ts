import {Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {HttpHelpers} from '../../Whatever/utils/HttpHelpers';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class CalendarService extends HttpHelpers {
}