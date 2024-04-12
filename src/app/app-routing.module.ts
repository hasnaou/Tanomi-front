import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';
import { CalendarInsideComponent } from './components/calendar-inside/calendar-inside.component';
import { EventsComponent } from './components/events/events.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { DragDropTestComponent } from './components/drag-drop-test/drag-drop-test.component';
import { AuthGuard } from './guards/auth.guard';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "sign-in", component: SignInComponent},
  {path: "sign-up", component: SignUpComponent},
  {path: "forget-password", component: ForgetPasswordComponent},
  {path: "dashboard", component: DashboardComponent,canActivate: [AuthGuard]}, // 
  {path: "events", component: EventsComponent},
  {path: "task", component: TaskComponent},
  {path: "add-task", component: AddTaskComponent},
  {path: "calendar-inside", component: CalendarInsideComponent},
  {path: "add-event", component: AddEventComponent},
  {path: "testDrag", component: DragDropTestComponent},
  {path: "add-project", component: AddProjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
