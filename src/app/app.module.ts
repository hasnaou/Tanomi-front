import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FullCalendarModule } from '@fullcalendar/angular';
import daygridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskComponent } from './components/task/task.component';
import { CalendarInsideComponent } from './components/calendar-inside/calendar-inside.component';
import { EventsComponent } from './components/events/events.component';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AddProjectComponent } from './components/projects/add-project/add-project.component';
import { AddTaskComponent } from './components/task/add-task/add-task.component';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    TaskComponent,
    EventsComponent,
    CalendarInsideComponent,
    EventsComponent,
    AddEventComponent,
    ProjectsComponent,
    AddProjectComponent,
    AddTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
