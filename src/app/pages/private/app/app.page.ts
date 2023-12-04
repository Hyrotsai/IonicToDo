import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TaskTodayComponent } from 'src/app/components/task-today/task-today.component';
import { TaskSoonComponent } from 'src/app/components/task-soon/task-soon.component';
import { TaskFinishedComponent } from 'src/app/components/task-finished/task-finished.component';
import { TaskFabComponent } from 'src/app/components/task-fab/task-fab.component';

@Component({
  selector: 'app-app',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    TaskTodayComponent,
    TaskSoonComponent,
    TaskFinishedComponent,
    TaskFabComponent,
  ],
})
export class AppPage implements OnInit {
  totalTaskToday!: number;
  totalTaskSoon!: number;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  getTaskTodayLength(e: number) {
    this.totalTaskToday = e;
    this.cdRef.detectChanges();
  }

  getTaskSoonLength(e: number) {
    this.totalTaskSoon = e;
    this.cdRef.detectChanges();
  }
}
