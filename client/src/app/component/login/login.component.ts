import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
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
  code:string|null;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
    });
  }

  ngOnInit() {
    console.log(this.code);
    if(this.isWeixinBrowser()){
      
      if(!this.code){
        let redirectUrl = 'http://139.162.82.117/login';
        redirectUrl = encodeURI(redirectUrl);
        let appid = 'wx1f112f65ec5e875f';
        let oauthUrl =  `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}
&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
        window.location.href=oauthUrl;
      }else{
        //TODO 发送code到服务器，获取登陆token
      }

    }
  }
  submit() {
    this.userService.login(this.username, this.password)
      .subscribe(
        result => {
          let url = sessionStorage.getItem('redirectUrl');
          if(url){
            this.router.navigate([url]);
          }else{
            this.router.navigate(["/"]);
          }
          
        },
        err => this.error = '登陆失败'
      );
  }
  private isWeixinBrowser():boolean{
    let ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false;
  }
}
