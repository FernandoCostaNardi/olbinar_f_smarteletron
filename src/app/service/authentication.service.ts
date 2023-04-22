import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host: string = environment.apiUrl;
  private token: string | undefined;

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/auth/login`, user, {observe: 'response'});
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token)
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token') ?? undefined;
  }
}

