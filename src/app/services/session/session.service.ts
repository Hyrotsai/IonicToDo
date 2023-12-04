import { Injectable } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { userLogged } from '../../interfaces/userInterface';
import { FirestoreDatabaseService } from '../firestoreDatabase/firestore-database.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private router: Router,
    private storage: StorageService,
    private database: FirestoreDatabaseService
  ) {}

  async logIn(user: userLogged) {
    const { uid } = user;
    await this.storage.setStorage('logged', true);
    await this.storage.setStorage('uid', uid);
    await this.database.getUserInfo(uid);
    this.router.navigate(['/app']);
  }

  async logOut() {
    const auth = getAuth();
    try {
      await signOut(auth);
      this.storage.cleanStorage();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }
}
