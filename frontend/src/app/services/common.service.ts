import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionStorageService, SessionStorage } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private rootUrl = environment.api;
    private httpOptions: any;
    private apikey = environment.api_key;
    private httpOptionsWithBearer: any;
    constructor(private http: HttpClient, public session: SessionStorageService) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-api-key': this.apikey }),observe: 'response'
        };
        this.httpOptionsWithBearer = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Frame-Options': 'DENY', Authorization: 'Bearer ' + '' })
        };
    }

    setSession(key, value, expired: number = 86400) {
        this.session.set(key, value, expired, 's');
    }

    // setCookie(key, value) {
    //     this.cookieService.set(key, value, 3600, '/', this.domainName, true, 'None');
    // }

    removeSession(key) {
        this.session.remove(key);
    }

    // removeCookie(key) {
    //     this.cookieService.delete(key);
    // }

    getSession(key) {
        return this.session.get(key);
    }
}
