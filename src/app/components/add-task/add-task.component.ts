import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Task } from 'src/app/interfaces/userInterface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class AddTaskComponent implements OnInit {
  @Output() sendInfoTask = new EventEmitter<Task>();
  title: string = '';
  alarm: boolean = false;
  date: string = '';

  constructor() {}

  ngOnInit() {
    // Obtén la hora actual en UTC (GMT)
    const horaActualUTC = new Date();
    // Ajusta la hora al huso horario GMT-5 (EST)
    horaActualUTC.setHours(horaActualUTC.getHours() - 5);
    // Formatea la hora en formato ISO (ISOString)
    this.date = horaActualUTC.toISOString();
  }

  checkTitle(e: any) {
    this.title = e.detail.value;
    this.emitEvent();
  }

  checkAlarm(e: any) {
    this.alarm = e.detail.checked;
  }

  checkDate(e: any) {
    if (e.detail.value) this.date = e.detail.value;
    this.emitEvent();
  }

  emitEvent() {
    if (this.title == '') return;
    const data: Task = {
      id: Math.random().toString(36).substring(2),
      title: this.title,
      alarm: this.alarm,
      date: this.date,
      finished: false,
    };
    this.sendInfoTask.emit(data);
  }
}
