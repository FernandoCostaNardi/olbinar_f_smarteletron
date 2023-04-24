import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../model/user";
import { JwtHelperService } from "@auth0/angular-jwt";
import {Login} from "../dto/login.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host: string = environment.apiUrl;
  private token: string | undefined;
  private loggedInUsername: string | undefined;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public login(user: Login): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/auth/login`, user, {observe: 'response'});
  }

  public saveToken(token: string | undefined): void {
    this.token = token;
    if (typeof token === "string") {
      localStorage.setItem('token', token);
    }
  }

  public addUserToLocalCache(user: User | null): void {
    console.log(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token') ?? undefined;
  }

  public getToken(): string {
    return <string>this.token;
  }

  public logOut(): void {
    this.token = null ?? undefined;
    this.loggedInUsername = null ?? undefined;;
    localStorage.removeItem('token');
  }

  // @ts-ignore
  public isLoggedIn(): boolean {
    this.loadToken();
    if(this.token != null && this.token !== '') {
      if(this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    }else {
      this.logOut();
      return false;
    }
  }


}

