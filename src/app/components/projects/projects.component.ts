import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects?: Project[];
  currentProject: Project = {};
  currentIndex = -1;

  constructor(private userService: UserService, private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

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

  deleteProject(id: number): void {
    this.projectService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      })
  }

  logout() {
    this.userService.signOut();
  }

}
