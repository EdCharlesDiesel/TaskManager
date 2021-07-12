import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLoggerService } from './services/router-logger.service';
import { Router, NavigationEnd } from '@angular/router';
import { keyFrameAnimation } from "./my-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [keyFrameAnimation]
})
export class AppComponent {
  constructor(public loginService: LoginService, private domSanitizer: DomSanitizer, private routerLoggerService: RouterLoggerService, private router: Router) {
  }

  ngOnInit() : void{
    this.loginService.detectIfAlreadyLoggedIn();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const userName = (this.loginService.currentUserName) ? this.loginService.currentUserName : "anonymous";

        const logMsg = new Date().toLocaleString() + ": " + userName + " navigates to " + event.url;

        //this.routerLoggerService.log(logMsg).subscribe();
      }
    });
  }

  onSearchClick() {
    console.log(this.loginService.currentUserName);
  }

  getState(outconst: any) {
    return outconst.isActivated ? outconst.activatedRoute.snapshot.url[0].path && outconst.activatedRouteData["linkIndex"] : "none";
  }
}
