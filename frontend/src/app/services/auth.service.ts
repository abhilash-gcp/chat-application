import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rootUrl = environment.api;
    private httpOptions: any;
    private apikey = environment.api_key;
    private httpOptionsWithBearer: any;
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-api-key': this.apikey })
        };
        this.httpOptionsWithBearer = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Frame-Options': 'DENY', Authorization: 'Bearer ' + '' })
        };
    }

    login(val) {
        return this.http.post(this.rootUrl + 'login', val, this.httpOptions);
    }
}
