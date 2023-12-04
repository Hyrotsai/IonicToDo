import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { AddTaskComponent } from '../add-task/add-task.component';
import { FirestoreDatabaseService } from '../../services/firestoreDatabase/firestore-database.service';
import { Task } from 'src/app/interfaces/userInterface';

@Component({
  selector: 'app-task-fab',
  templateUrl: './task-fab.component.html',
  styleUrls: ['./task-fab.component.scss'],
  standalone: true,
  imports: [IonicModule, AddTaskComponent],
})
export class TaskFabComponent implements OnInit {
  @ViewChild(IonModal) modal: any;
  saveEnable: boolean = false;
  dataTask!: Task;

  constructor(private firestore: FirestoreDatabaseService) {}

  ngOnInit() {}

  closeModal() {
    this.modal.dismiss();
  }

  disableAceptButton() {
    this.saveEnable = false;
  }

  saveTask() {
    this.modal.dismiss();
    //INFO Envia la informacion a firebase
    this.firestore.saveTaskUnfinished(this.dataTask);
  }

  getInfoTask(event: any) {
    this.saveEnable = true;
    this.dataTask = event;
  }
}
