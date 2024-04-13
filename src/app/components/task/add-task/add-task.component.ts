import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from 'src/app/enums/priority';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  projects?: Project[];
  currentProject: Project = {
    title: '',
    description: ''
  };
  task: Task = {
    title: '',
    description: '',
    priority: Priority.LOW
  };

  submitted = false;
  currentIndex = -1;

  toDoTasks: Task[] | any[] = [];
  inProgressTasks: Task[] | any[] = [];
  doneTasks: Task[] | any[] = [];


  constructor(private projectService: ProjectService, private userService: UserService, private taskService: TaskService, private route: ActivatedRoute, private router: Router, private renderer: Renderer2, private el: ElementRef) { }

  openForm() {
    const formPopup = this.el.nativeElement.querySelector('.form-popup-bg');
    this.renderer.addClass(formPopup, 'is-visible');
  }
  closeForm() {
    const formPopup = this.el.nativeElement.querySelector('.form-popup-bg');
    this.renderer.removeClass(formPopup, 'is-visible');
  }

  ngOnInit(): void {
    this.retrieveProjects();
    this.getProject(this.route.snapshot.params["id"]);
    this.showToDoTask(this.route.snapshot.params["id"]);
    this.showInProgressTask(this.route.snapshot.params["id"]);
    this.showDoneTask(this.route.snapshot.params["id"]);
  }

  saveTask(event: Event): void {
    event.preventDefault();
    const id = this.route.snapshot.params["id"];
    const data = {
       title: this.task.title,
       description: this.task.description,
       priority: this.task.priority ? this.task.priority.toString().toUpperCase() : Priority.LOW.toString().toUpperCase(),
       project: {
         id: id
       }
    };
    this.taskService.create(data)
       .subscribe({
         next: (res) => {
           console.log(res);
           this.submitted = true;
           this.closeForm();
         },
         error: (e) => console.error(e)
       });
  }
   
  deleteTask(id: number): void {
    this.taskService.delete(id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      })
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

  getProject(id: number): void {
    this.projectService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProject = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  showToDoTask(id: number) {
    this.taskService.getAllToDo(id)
      .subscribe({
        next: (data) => {
            this.toDoTasks = data;
          },
          error: (e) => console.error(e)
    })
  }

  showInProgressTask(id: number) {
    this.taskService.getAllInProgress(id)
      .subscribe({
        next: (data) => {
            this.inProgressTasks = data;
          },
          error: (e) => console.error(e)
      })
  }

  showDoneTask(id: number) {
    this.taskService.getAllDone(id)
      .subscribe({
        next: (data) => {
            this.doneTasks = data;
          },
          error: (e) => console.error(e)
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                         event.container.data,
                         event.previousIndex,
                         event.currentIndex);
      const taskId = event.item.data.id;
      const newState = event.container.id === 'doneList' ? 'DONE' : 'IN_PROGRESS';
      this.taskService.updateTaskState(taskId, newState);
    }
  }
  
}
