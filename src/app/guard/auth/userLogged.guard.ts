import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class userLoggedGuard implements CanActivate {
  constructor(private router: Router, private storage: StorageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const data = this.storage.getStorage('logged');
    console.log(data);
    if (data) {
      console.log('entra verdad');
      this.router.navigate(['/app']);
      return true;
    }
    console.log('entra a falso');
    return false;
  }
}
