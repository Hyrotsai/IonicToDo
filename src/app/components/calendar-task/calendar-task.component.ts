import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Task } from 'src/app/interfaces/userInterface';
import { FirestoreDatabaseService } from 'src/app/services/firestoreDatabase/firestore-database.service';

@Component({
  selector: 'app-calendar-task',
  templateUrl: './calendar-task.component.html',
  styleUrls: ['./calendar-task.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CalendarTaskComponent implements OnInit {
  @Input() userTask: Task[] = [];

  constructor(private firestore: FirestoreDatabaseService) {}

  ngOnInit() {}

  completeTask(data: Task) {
    this.firestore.saveTaskFinished(data);
    this.firestore.deleteTaskUnfinished(data);
  }

  deleteTask(data: Task) {
    this.firestore.deleteTaskUnfinished(data);
  }

  taskLate(task: Task) {
    const fechaHoy = new Date().setHours(0, 0, 0, 0);
    const dateTask = new Date(task.date).setHours(0, 0, 0, 0);
    return dateTask < fechaHoy;
  }
}
