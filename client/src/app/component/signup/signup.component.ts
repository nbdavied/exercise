import { Component, OnInit } from '@angular/core';
import { User } from '../../entity/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user: User;
  public checkpass: string;
  public message: string;
  constructor(public userService: UserService) { }

  ngOnInit() {
    this.user = new User;
  }
  submit(){
    this.userService.signup(this.user).subscribe(
      result => {
        this.message = "注册成功";
      },
      err => {
        this.message = err.error.message;
      }
    );
  }
}
