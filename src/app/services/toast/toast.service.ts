import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: ToastController) {}

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'top'
  ) {
    const toast = await this.toast.create({
      message,
      duration: 1500,
      position,
    });

    await toast.present();
  }
}
