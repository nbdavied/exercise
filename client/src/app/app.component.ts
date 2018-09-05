import { Component } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TEST YOURSELF';
  constructor(private userService:UserService){}
  ngOnInit(){
  }
  logout() {
    this.userService.logout();
  }
}
