import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class TabsPage {
  isLoggedIn = false;

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    this.isLoggedIn = await this.auth.isLoggedIn();
  }
}
