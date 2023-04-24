import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {User} from "../model/user";
import {Subscription} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Login} from "../dto/login.dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  showLoading: boolean | undefined;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    if(this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/dashboard')
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(login: Login): void {
    this.showLoading = true;
    console.log(login);
    this.subscriptions.push(
      this.authenticationService.login(login).subscribe(
        (response: HttpResponse<User> | HttpErrorResponse) => {
          if (response instanceof HttpResponse) {
          const token = response.body?.token;
            this.authenticationService.saveToken(token);
            this.authenticationService.addUserToLocalCache(response.body ?? null);
            this.router.navigateByUrl('/dashboard');
          }
          this.showLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.showLoading = false;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
