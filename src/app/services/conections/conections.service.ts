import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { userLogged } from '../..//interfaces/userInterface';
import { ToastService } from '../toast/toast.service';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class ConectionsService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private toast: ToastService,
    private session: SessionService
  ) {}

  async register(email: string, password: string) {
    try {
      const { user }: any = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await this.saveInfoInFirestore(user);
      this.session.logIn(user);
      return true;
    } catch (error) {
      this.toast.presentToast('Email ya se encuentra en uso');
      return false;
    }
  }

  async registerWithGmail() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const { user }: any = result;
      await this.saveInfoInFirestore(user);
      this.session.logIn(user);
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    try {
      const { user }: any = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      this.session.logIn(user);
      return user;
    } catch (error) {
      return this.toast.presentToast('Credenciales incorrectas');
    }
  }

  async loginWithGmail() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      //TODO arreglar
      // const result = await signInWithRedirect(auth, provider);
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const { user }: any = result;
      if (user) this.session.logIn(user);
    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }

  async saveInfoInFirestore(data: userLogged) {
    const saveData = {
      displayName: data.providerData[0].displayName,
      photoURL: data.providerData[0].photoURL || '',
      email: data.email,
      uid: data.uid,
    };
    await setDoc(doc(this.firestore, 'users', data.uid), saveData);
    return;
  }
}
