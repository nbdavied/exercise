import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public error: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  submit() {
    this.userService.login(this.username, this.password)
      .subscribe(
        result => {
          let url = sessionStorage.getItem('redirectUrl');
          this.router.navigate([url]);
        },
        err => this.error = '登陆失败'
      );
  }
}
