import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(private loader: LoadingController) {}

  async showLoading(message: string) {
    const loading = await this.loader.create({
      message,
    });
    loading.present();
    return loading;
  }
}
