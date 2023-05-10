import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootUrl = environment.api;
    private httpOptions: any;
    private apikey = environment.api_key;
    private httpOptionsWithBearer: any;
    constructor(private http: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-api-key': this.apikey }),observe: 'response'
        };
        this.httpOptionsWithBearer = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', 'X-Frame-Options': 'DENY', Authorization: 'Bearer ' + '' })
        };
    }

    getAllUsers(val) {
        return this.http.get(this.rootUrl + 'getAllUsers' , this.httpOptions);
    }
}
