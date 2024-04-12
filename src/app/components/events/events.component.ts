import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  projects?: Project[];
  currentProject: Project = {};
  currentIndex = -1;

  constructor(private projectService: ProjectService, private userService: UserService) { }

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

}
