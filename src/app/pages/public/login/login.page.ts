import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConectionsService } from 'src/app/services/conections/conections.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { userLogged } from 'src/app/interfaces/userInterface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class LoginPage implements OnInit {
  //TODO Borrar datos de prueba
  email: string = 'test@yopmail.com';
  password: string = '123456';

  constructor(
    private conection: ConectionsService,
    private loader: LoaderService
  ) {}

  ngOnInit() {}

  async loginUser() {
    const load = await this.loader.showLoading('Espere...');
    const user: userLogged = await this.conection.login(
      this.email,
      this.password
    );
    load.dismiss();
  }

  async loginWithGmail() {
    this.conection.loginWithGmail();
  }
}
