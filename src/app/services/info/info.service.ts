import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Response, RequestOptions } from '@angular/http';
import { HttpClient } from '../http.client';

@Injectable()
export class InfoService {

  constructor( private http: HttpClient ) {}

  // Service message commands
  setTab(tab: string) {
    // TODO: Remove all call to setTab() from all components
  }

  getAdministrationInfo = (id: string): Observable<object> => this.getInfo('administration', id);
  updateAdministrationInfo = (id: string, diff: object[]): Observable<number> => this.updateInfo('administration', id, diff);

  getPeopleInfo = (id: string): Observable<object> => this.getInfo('people', id);
  updatePeopleInfo = (id: string, diff: object[]): Observable<number> => this.updateInfo('people', id, diff);

  getFacilityInfo = (id: string): Observable<object> => this.getInfo('facilities', id);
  updateFacilityInfo = (id: string, diff: object[]): Observable<number> => this.updateInfo('facilities', id, diff);

  private getInfo(category: string, id: string): Observable<object> {
    return this.http.get(`/server/info/${category}/${id}`)
      .map((res: Response) => res.json() as object)
      .catch((error: any) => {
        if (error.status) {
          return Observable.of({
            'err': error.status,
            'info': [{ name: 'Oops! Some Error Ocurred' }]
          });
        } else {
          return Observable.throw(error.json().error || error.message || error);
        }
      });
  }

  private updateInfo(category: string, id: string, diff: object[]): Observable<number> {
    return this.http.post(`/server/info/${category}/${id}`, {
      'diff': diff
    }).map(res => res.status)
      .catch((error: any) => {
          if (error.status) {
              return Observable.of(error.status);
          } else {
              return Observable.throw(error.message || error);
          }
      });
  }

}
