import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConectionsService } from 'src/app/services/conections/conections.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class RegisterPage implements OnInit {
  email: string = 'test@yopmail.com';
  password: string = '123456';

  constructor(
    private conection: ConectionsService,
    private toast: ToastService,
    private loader: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {}

  async registerUser() {
    if (!this.email) {
      this.toast.presentToast('Digite correo');
      return;
    }
    if (!this.password) {
      this.toast.presentToast('Digite password');
      return;
    }
    const load = await this.loader.showLoading('Registrando...');
    const resultRegister = await this.conection.register(
      this.email,
      this.password
    );
    load.dismiss();
    if (resultRegister) this.router.navigateByUrl('/app');
  }

  registerWithGmail() {
    this.conection.registerWithGmail();
  }
}
