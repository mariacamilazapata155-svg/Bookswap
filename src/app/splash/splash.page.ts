import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class SplashPage implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  async ngOnInit() {
    setTimeout(async () => {
      const loggedIn = await this.authService.isLoggedIn();
      this.router.navigate([loggedIn ? '/tabs/tab1' : '/login'], {
        replaceUrl: true,
      });
    }, 2500);
  }
}
