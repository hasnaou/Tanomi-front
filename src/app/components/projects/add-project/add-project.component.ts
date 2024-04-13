import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: Project = {
    title: '',
    description: '',
  }

  projects?: Project[];
  currentProject: Project = {};
  currentIndex = -1;

  submitted = false;

  constructor(private projectService: ProjectService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

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

  saveProject(event: Event): void {
    event.preventDefault();
    const data = {
      title: this.project.title,
      description: this.project.description
    }
    this.projectService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.router.navigate(['/add-task']);
        },
        error: (e) => console.error(e) 
      })
  }
}
