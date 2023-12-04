import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-not-found',
  templateUrl: './task-not-found.component.html',
  styleUrls: ['./task-not-found.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class TaskNotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
