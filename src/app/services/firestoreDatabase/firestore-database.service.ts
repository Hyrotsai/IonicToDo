import { Injectable } from '@angular/core';
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  onSnapshot,
} from '@angular/fire/firestore';
import { UserService } from '../user/user.service';
import { StorageService } from '../storage/storage.service';
import { Task } from 'src/app/interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class FirestoreDatabaseService {
  constructor(
    private firestore: Firestore,
    private user: UserService,
    private storage: StorageService
  ) {
    this.init();
  }

  async init() {
    const uid = await this.storage.getStorage('uid');
    if (!uid) return;
    this.getUserInfo(uid);
  }

  async getUserInfo(uid: string) {
    //INFO Metodo para devolver los valores sin escuchar los cambios
    // const docRef = doc(this.firestore, 'users', uid);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) this.user.sendInfoUser(docSnap.data());
    //INFO Metodo para devolver los valores escuchando cambios
    const unsub = onSnapshot(
      doc(this.firestore, 'users', uid.replace(/"/g, '')),
      {
        next: (snapshot) => this.handlerSuccess(snapshot),
      }
    );
  }

  handlerSuccess(doc: any) {
    this.user.sendInfoUser(doc.data());
  }

  async saveTaskUnfinished(data: Task) {
    const uid = this.storage.getStorage('uid');
    if (uid)
      await updateDoc(doc(this.firestore, 'users', uid), {
        unfinishedTask: arrayUnion(data),
      });
  }

  async deleteTaskUnfinished(data: Task) {
    const uid = await this.storage.getStorage('uid');
    if (uid)
      await updateDoc(doc(this.firestore, 'users', uid), {
        unfinishedTask: arrayRemove(data),
      });
  }

  async saveTaskFinished(data: Task) {
    const uid = await this.storage.getStorage('uid');
    if (uid)
      await updateDoc(doc(this.firestore, 'users', uid), {
        finishedTask: arrayUnion(data),
      });
  }

  async deleteTaskFinished(data: Task) {
    const uid = await this.storage.getStorage('uid');
    if (uid)
      await updateDoc(doc(this.firestore, 'users', uid), {
        finishedTask: arrayRemove(data),
      });
  }
}
