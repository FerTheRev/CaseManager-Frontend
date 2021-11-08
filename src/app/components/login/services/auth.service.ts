import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = `${environment.server_uri}/api/auth`;

  constructor(
    private _http: HttpClient
  ) { }

  Login(user: any) {
    return this._http.post(`${this.apiURL}/signIn`, user);
  };

  GetUserProfile() {
    return this._http.get(`${this.apiURL}/userProfile`)
  }
}
