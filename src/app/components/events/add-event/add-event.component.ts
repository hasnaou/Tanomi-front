import { Component, OnInit } from '@angular/core';
import { co } from '@fullcalendar/core/internal-common';
import { Event } from 'src/app/models/event.model';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  event: Event = {
    title: '',
    date: new Date(),
    description: ''
  }

  projects?: Project[];
  currentProject: Project = {};
  currentIndex = -1;

  submitted = false;

  constructor(private eventService: EventService, private projectService: ProjectService, private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveProjects();
  }

  retrieveProjects(): void {
    this.projectService.getAll()
      .subscribe({
        next: (data) => {
          this.projects = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      })
  }

  logout() {
    this.userService.signOut();
  }

  saveEvent(): void {
    const data = {
      title: this.event.title,
      date: this.event.date,
      description: this.event.description
    }
    this.eventService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      })
  }
}
