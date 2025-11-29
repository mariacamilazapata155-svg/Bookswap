import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Platform, IonApp, IonRouterOutlet } from '@ionic/angular/standalone'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private platform: Platform) {}

  async ngOnInit() {
    this.platform.ready().then(async () => {
      const loggedIn = await this.authService.isLoggedIn();
      this.router.navigate([loggedIn ? 'tabs/libros' : 'login'], { replaceUrl: true })});
  }


  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
