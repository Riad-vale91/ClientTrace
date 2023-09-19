import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  menuState: string = 'closed';

  constructor(private router: Router,private authService: MsalService) {}

  goToClientTrace() {
    this.router.navigateByUrl("");
  }

  toggleMenu() {
    this.sidenav.toggle().then(() => {
      this.menuState = this.sidenav.opened ? 'open' : 'closed';
    });
  }

  logout(){
    this.authService.logoutPopup({
      mainWindowRedirectUri: "/"
      //this.router.navigateByUrl("/home");
    });
  }
}
