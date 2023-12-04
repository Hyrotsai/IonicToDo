import {
  Component,
  OnInit,
  Output,
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Task, userFirebase } from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/services/user/user.service';
import { FirestoreDatabaseService } from 'src/app/services/firestoreDatabase/firestore-database.service';
import { TaskNotFoundComponent } from '../task-not-found/task-not-found.component';

@Component({
  selector: 'app-task-soon',
  templateUrl: './task-soon.component.html',
  styleUrls: ['./task-soon.component.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, CommonModule, TaskNotFoundComponent],
})
export class TaskSoonComponent implements OnInit {
  @Output() sendTaskSoonLength = new EventEmitter<number>();
  userTaskSoon: Task[] = [];

  constructor(
    private user: UserService,
    private cdRef: ChangeDetectorRef,
    private firestore: FirestoreDatabaseService
  ) {}

  ngOnInit() {
    this.user.getUser().subscribe({
      next: (user) => this.handlerSuccess(user),
    });
  }

  handlerSuccess(user: userFirebase) {
    this.getTaskSoon(user.unfinishedTask);
    this.sendTaskSoonLength.emit(this.userTaskSoon.length);
    this.cdRef.detectChanges();
  }

  getTaskSoon(unfinishedTask: Task[]) {
    const fechaHoy = new Date().setHours(0, 0, 0, 0);
    this.userTaskSoon = unfinishedTask.filter((task) => {
      const dateTask = new Date(task.date).setHours(0, 0, 0, 0);
      return dateTask > fechaHoy;
    });
  }

  completeTask(data: Task) {
    this.firestore.saveTaskFinished(data);
    this.firestore.deleteTaskUnfinished(data);
  }

  deleteTask(data: Task) {
    this.firestore.deleteTaskUnfinished(data);
  }
}
