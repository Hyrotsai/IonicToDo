import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { userFirebase } from '../../../interfaces/userInterface';
import { UserService } from 'src/app/services/user/user.service';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent],
})
export class ConfigPage implements OnInit {
  userLogged!: userFirebase;
  themeToggle = true;

  constructor(
    private user: UserService,
    private session: SessionService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user.getUser().subscribe({
      next: (data) => this.handleSuccess(data),
    });
  }

  logOut() {
    this.session.logOut();
  }

  handleSuccess(data: any) {
    this.userLogged = data;
    this.cdRef.detectChanges();
  }

  changeTheme(ev: any) {
    document.body.classList.toggle('dark', ev.detail.checked);
  }
}
