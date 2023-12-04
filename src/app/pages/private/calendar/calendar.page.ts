import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UserService } from 'src/app/services/user/user.service';
import {
  Task,
  colorTask,
  userFirebase,
} from 'src/app/interfaces/userInterface';
import { FirestoreDatabaseService } from 'src/app/services/firestoreDatabase/firestore-database.service';
import { CalendarTaskComponent } from 'src/app/components/calendar-task/calendar-task.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HeaderComponent,
    CalendarTaskComponent,
  ],
})
export class CalendarPage implements OnInit {
  highlightedDates!: colorTask[];
  SelectedDate!: string;
  userTask!: Task[];
  finalUserCalendarTask: Task[] = [];

  constructor(
    private user: UserService,
    private cdRef: ChangeDetectorRef,
    private firestore: FirestoreDatabaseService
  ) {}

  ngOnInit() {
    this.user.getUser().subscribe({
      next: (user) => this.handleSuccess(user),
    });
  }

  handleSuccess(user: userFirebase) {
    this.userTask = user.unfinishedTask;
    this.highlightedDates = user.unfinishedTask.map((task: Task) => {
      const fechaFormateada = this.getFechaString(task.date);
      const color = this.getColorDate(fechaFormateada);
      return { date: fechaFormateada, backgroundColor: color };
    });
    this.cdRef.detectChanges();
  }

  getFechaString(date: string) {
    const fecha = new Date(date);
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const día = String(fecha.getDate()).padStart(2, '0');
    return `${año}-${mes}-${día}`;
  }

  getColorDate(date: string) {
    const StringNumber = Number(date.slice(-2));
    if (StringNumber % 2 === 0) return '#b5daff';
    if (StringNumber % 3 === 0) return '#a4f6d2';
    return '#ffc4c4';
  }

  getDateFromCalendar() {
    const dateCalendar = this.SelectedDate.split('T')[0];
    this.finalUserCalendarTask = this.userTask.filter(
      (task: Task) => dateCalendar == task.date.split('T')[0]
    );
    this.cdRef.detectChanges();
  }
}
