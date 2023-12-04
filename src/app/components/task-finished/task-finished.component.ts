import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Task, userFirebase } from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/services/user/user.service';
import { TaskNotFoundComponent } from '../task-not-found/task-not-found.component';

@Component({
  selector: 'app-task-finished',
  templateUrl: './task-finished.component.html',
  styleUrls: ['./task-finished.component.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, CommonModule, TaskNotFoundComponent],
})
export class TaskFinishedComponent implements OnInit {
  userTaskFinished!: Task[];

  constructor(private user: UserService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.user.getUser().subscribe({
      next: (user) => this.handlerSuccess(user),
    });
  }

  handlerSuccess(user: userFirebase) {
    if (user.finishedTask == undefined) return (this.userTaskFinished = []);
    this.userTaskFinished = user.finishedTask;
    this.cdRef.detectChanges();
    return;
  }
}
