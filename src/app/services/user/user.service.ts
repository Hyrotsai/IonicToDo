import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userFirebaseTEST } from 'src/app/helpers/helper';
import { userFirebase } from 'src/app/interfaces/userInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user = new BehaviorSubject<userFirebase>(userFirebaseTEST);
  user$ = this.user.asObservable();

  constructor() {}

  getUser() {
    return this.user$;
  }

  sendInfoUser(data: any) {
    this.user.next(data);
  }
}
