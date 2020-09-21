import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8808';
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }
  getData(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
  post(uri: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
    .pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
}
