import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './components/tabs/tabs.component';
import { StorageService } from './services/storage/storage.service';
import { NgIf } from '@angular/common';
import { UserService } from './services/user/user.service';
import { userFirebase } from './interfaces/userInterface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, TabsComponent, NgIf],
})
export class AppComponent implements OnInit {
  userLogged: boolean = false;
  constructor(
    private user: UserService,
    private storage: StorageService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user.getUser().subscribe({
      next: (user) => this.handleSucess(user),
    });
  }

  handleSucess(user: userFirebase) {
    console.log(user);
    if (user.uid !== '') this.userLogged = true;
    this.cdRef.detectChanges();
  }
}
