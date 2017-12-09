import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class SecurityDatabaseService {
  private url = 'api/web/db';

  constructor(private _http: Http) { }

  public seed() {
    return this._http.post(`${this.url}/seed`, {});
  }
  public clear() {
    return this._http.delete(`${this.url}/clear`, {});
  }
  public destroy() {
    return this._http.delete(`${this.url}/destroy`, {});
  }
}
